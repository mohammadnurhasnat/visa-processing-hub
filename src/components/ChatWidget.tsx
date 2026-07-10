import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ChatHistoryList from './ChatHistoryList';
import ChatInput from './ChatInput';

function cleanStreamingText(text: string): string {
  let cleaned = text;
  
  // Remove completed <lead_report>...</lead_report>
  cleaned = cleaned.replace(/<lead_report>[\s\S]*?<\/lead_report>/g, "");
  
  // Remove partial <lead_report>
  const reportIndex = cleaned.indexOf("<lead_report>");
  if (reportIndex !== -1) {
    cleaned = cleaned.substring(0, reportIndex);
  }
  
  // Remove special tags
  cleaned = cleaned.replace(/\[TRIGGER_HUMAN_HANDOVER\]/gi, "");
  cleaned = cleaned.replace(/\[SHOW_CONTACT_FORM\]/gi, "");
  
  return cleaned.trim();
}

interface ChatWidgetProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

export default function ChatWidget({ isOpen: propIsOpen, onClose, onOpen }: ChatWidgetProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = propIsOpen !== undefined ? propIsOpen : internalIsOpen;

  const [message, setMessage] = useState('');
  
  // Persisted chat history state
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'bot', content: string, showContactForm?: boolean, timestamp?: string }[]>(() => {
    try {
      const saved = localStorage.getItem('visa_hub_chat_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  // Detect if running inside Google AI Studio / dev sandbox
  const isAIStudioPreview = typeof window !== 'undefined' && (
    window.location.hostname.includes('run.app') || 
    window.location.hostname.includes('localhost') || 
    window.location.hostname.includes('127.0.0.1') || 
    window.location.hostname.includes('ai.studio')
  );

  // Admin authentication check state
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      if (typeof window !== 'undefined') {
        setIsAdmin(sessionStorage.getItem('isAdminAuthenticated') === 'true');
      }
    };
    checkAdmin();
    const interval = setInterval(checkAdmin, 1500);
    return () => clearInterval(interval);
  }, []);

  // Persisted human handover state
  const [isHandover, setIsHandover] = useState(() => {
    try {
      return localStorage.getItem('visa_hub_handover') === 'true';
    } catch {
      return false;
    }
  });

  const idleTimerRef = useRef<NodeJS.Timeout>();

  // Function to send webhook summary
  const sendWebhookSummary = async () => {
    const lastSubmitted = localStorage.getItem('lastContactFormSubmitted');
    if (!lastSubmitted) return; // Only send if form was submitted

    // Retrieve form details
    const formDetails = JSON.parse(localStorage.getItem('lastFormDetails') || '{}');
    const history = JSON.parse(localStorage.getItem('visa_hub_chat_history') || '[]');

    try {
      await fetch('/api/webhook-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history, formDetails }),
        keepalive: true
      });
      // Clear after successful send
      localStorage.removeItem('lastContactFormSubmitted');
      localStorage.removeItem('lastFormDetails');
    } catch (e) {
      console.error("Webhook summary send failed:", e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const resetTimer = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(sendWebhookSummary, 10 * 60 * 1000); // 10 mins
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('beforeunload', sendWebhookSummary);

    resetTimer();

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('beforeunload', sendWebhookSummary);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [chatHistory]);

  const handleToggle = () => {
    if (isOpen) {
      if (onClose) onClose();
      else setInternalIsOpen(false);
    } else {
      if (onOpen) onOpen();
      else setInternalIsOpen(true);
    }
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setMessage('');
    
    const updatedWithUser = [...chatHistory, { role: 'user' as const, content: userMessage, timestamp: new Date().toISOString() }];
    setChatHistory(updatedWithUser);
    localStorage.setItem('visa_hub_chat_history', JSON.stringify(updatedWithUser));
    
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage, 
          history: updatedWithUser.map(h => ({ role: h.role, content: h.content }))
        })
      });

      if (!res.ok) throw new Error('Failed to fetch');

      // Check if it's a streaming response
      const contentType = res.headers.get('Content-Type');
      if (contentType && contentType.includes('text/event-stream')) {
        const reader = res.body?.getReader();
        if (!reader) throw new Error('No reader');

        let accumulatedResponse = '';

        // Add an initial empty bot message to be filled by the stream
        setChatHistory(prev => [...prev, { role: 'bot' as const, content: '', timestamp: new Date().toISOString() }]);

        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                
                if (data.chunk) {
                  accumulatedResponse += data.chunk;
                  
                  setChatHistory(prev => {
                    const last = prev[prev.length - 1];
                    if (last && last.role === 'bot') {
                      const updated = [...prev];
                      updated[updated.length - 1] = { ...last, content: cleanStreamingText(accumulatedResponse) };
                      return updated;
                    }
                    return prev;
                  });
                }

                if (data.done) {
                  // Final metadata
                  setChatHistory(prev => {
                    const last = prev[prev.length - 1];
                    if (last && last.role === 'bot') {
                      const updated = [...prev];
                      updated[updated.length - 1] = { 
                        ...last, 
                        content: data.reply, // Use the cleaned full text from server
                        showContactForm: data.showContactForm,
                        timestamp: last.timestamp || new Date().toISOString()
                      };
                      localStorage.setItem('visa_hub_chat_history', JSON.stringify(updated));
                      return updated;
                    }
                    return prev;
                  });

                  if (data.isHumanHandover) {
                    setIsHandover(true);
                    localStorage.setItem('visa_hub_handover', 'true');
                  }
                }
              } catch (e) {
                console.error("Error parsing SSE chunk:", e);
              }
            }
          }
        }
      } else {
        // Fallback for non-streaming response
        const data = await res.json();
        const updatedWithBot = [...updatedWithUser, { role: 'bot' as const, content: data.reply, showContactForm: data.showContactForm, timestamp: new Date().toISOString() }];
        setChatHistory(updatedWithBot);
        localStorage.setItem('visa_hub_chat_history', JSON.stringify(updatedWithBot));
        
        if (data.isHumanHandover) {
          setIsHandover(true);
          localStorage.setItem('visa_hub_handover', 'true');
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      const updatedWithError = [...chatHistory, 
        { role: 'user' as const, content: userMessage, timestamp: new Date().toISOString() }, 
        { role: 'bot' as const, content: 'দুঃখিত, সংযোগে কিছু সমস্যা হচ্ছে। অনুগ্রহ করে আবার চেষ্টা করুন।', timestamp: new Date().toISOString() }
      ];
      setChatHistory(updatedWithError);
      localStorage.setItem('visa_hub_chat_history', JSON.stringify(updatedWithError));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="fixed bottom-6 right-6 md:bottom-24 md:right-8 w-[calc(100vw-48px)] sm:w-[400px] bg-white dark:bg-slate-900 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden flex flex-col h-[calc(100vh-100px)] max-h-[600px] z-[100] transition-colors duration-300"
          >
            {/* Header */}
            <div className="bg-blue-600 py-4 px-5 text-white flex justify-between items-center shadow-lg shadow-blue-600/10 shrink-0">
              <div>
                <h3 className="font-bold text-base md:text-lg font-display">Processing Hub Assistant</h3>
              </div>
              <div className="flex items-center gap-1.5">
                {(isAdmin || isAIStudioPreview) && (
                  <button
                    onClick={() => {
                      setChatHistory([]);
                      setIsHandover(false);
                      localStorage.removeItem('visa_hub_chat_history');
                      localStorage.removeItem('visa_hub_handover');
                      localStorage.removeItem('lastContactFormSubmitted');
                      localStorage.removeItem('lastFormDetails');
                    }}
                    title="চ্যাট ইতিহাস মুছুন"
                    className="hover:bg-red-500/20 p-2 rounded-lg border border-white/20 hover:border-red-400/40 text-red-100 hover:text-red-400 transition-all active:scale-95 flex items-center justify-center shadow-sm"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
                <button 
                  onClick={handleToggle} 
                  className="hover:bg-white/20 p-2 rounded-lg border border-white/20 transition-all active:scale-95 flex items-center justify-center shadow-sm"
                  aria-label="Close chat"
                >
                  <X size={18} className="text-white" />
                </button>
              </div>
            </div>

            <ChatHistoryList 
              chatHistory={chatHistory} 
              isLoading={isLoading} 
              isHandover={isHandover} 
              onFormSubmit={async (name, phone, email, service) => {
                try {
                  const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      name,
                      phone,
                      email,
                      service,
                      message: `Captured directly via inline chat form.`
                    })
                  });
                  await res.json();
                  
                  // Save form details for webhook summary
                  localStorage.setItem('lastFormDetails', JSON.stringify({ name, phone, email, service }));
                  localStorage.setItem('lastContactFormSubmitted', 'true');
                  
                  // Append a success message from AI explaining lead has been logged
                  const successMessage = {
                    role: 'bot' as const,
                    content: `ধন্যবাদ **${name}** ভাই/আপু! আপনার যোগাযোগের তথ্য সফলভাবে আমার কাছে জমা হয়েছে।\n\n**সংগৃহীত বিবরণী:**\n* **নাম:** ${name}\n* **ফোন নম্বর:** ${phone}\n* **ইমেইল:** ${email || "(প্রদান করা হয়নি)"}\n* **সেবার ধরন:** ${service}\n\nআমাদের একজন ভিসা প্রসেসিং বিশেষজ্ঞ অতি দ্রুত আপনার সাথে যোগাযোগ করবেন!`
                  };

                  setChatHistory(prev => {
                    const updated = [...prev, successMessage];
                    localStorage.setItem('visa_hub_chat_history', JSON.stringify(updated));
                    return updated;
                  });
                } catch (e) {
                  console.error("Form submit error:", e);
                }
              }}
            />

            <ChatInput 
              message={message} 
              setMessage={setMessage} 
              onSend={handleSend} 
              isLoading={isLoading} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100]">
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleToggle}
            className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl bg-blue-600 text-white shadow-blue-600/35 hover:bg-blue-700 transition-all"
            title="AI Assistant Chat"
          >
            <MessageSquare size={24} />
          </motion.button>
        </div>
      )}
    </>
  );
}
