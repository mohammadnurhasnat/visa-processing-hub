import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ChatHistoryList from './ChatHistoryList';
import ChatInput from './ChatInput';

interface ChatWidgetProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

export default function ChatWidget({ isOpen: propIsOpen, onClose, onOpen }: ChatWidgetProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = propIsOpen !== undefined ? propIsOpen : internalIsOpen;

  const idleTimerRef = useRef<NodeJS.Timeout>();

  // Function to send webhook summary
  const sendWebhookSummary = async () => {
    const lastSubmitted = localStorage.getItem('lastContactFormSubmitted');
    if (!lastSubmitted) return; // Only send if form was submitted

    // Retrieve form details (you might need to store this in localStorage too)
    const formDetails = JSON.parse(localStorage.getItem('lastFormDetails') || '{}');
    const history = JSON.parse(localStorage.getItem('visa_hub_chat_history') || '[]');

    await fetch('/api/webhook-summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ history, formDetails })
    });
  };

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
  }, []);

  const handleToggle = () => {
    if (isOpen) {
      if (onClose) onClose();
      else setInternalIsOpen(false);
    } else {
      if (onOpen) onOpen();
      else setInternalIsOpen(true);
    }
  };

  const [message, setMessage] = useState('');
  
  // Persisted chat history state
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'bot', content: string, showContactForm?: boolean }[]>(() => {
    try {
      const saved = localStorage.getItem('visa_hub_chat_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  
  // Persisted human handover state
  const [isHandover, setIsHandover] = useState(() => {
    try {
      return localStorage.getItem('visa_hub_handover') === 'true';
    } catch {
      return false;
    }
  });

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setMessage('');
    
    const updatedWithUser = [...chatHistory, { role: 'user' as const, content: userMessage }];
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
      const data = await res.json();
      
      const updatedWithBot = [...updatedWithUser, { role: 'bot' as const, content: data.reply, showContactForm: data.showContactForm }];
      setChatHistory(updatedWithBot);
      localStorage.setItem('visa_hub_chat_history', JSON.stringify(updatedWithBot));
      
      if (data.isHumanHandover) {
        setIsHandover(true);
        localStorage.setItem('visa_hub_handover', 'true');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const updatedWithError = [...updatedWithUser, { role: 'bot' as const, content: 'দুঃখিত, সংযোগে কিছু সমস্যা হচ্ছে। অনুগ্রহ করে আবার চেষ্টা করুন।' }];
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
            className="fixed bottom-28 right-6 md:right-8 w-[calc(100vw-48px)] sm:w-[380px] bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden flex flex-col h-[520px] z-[100] transition-colors duration-300"
          >
            {/* Header */}
            <div className="bg-blue-600 py-3.5 px-5 text-white flex justify-between items-center shadow-lg shadow-blue-600/10 shrink-0">
              <div>
                <h3 className="font-bold text-base md:text-lg font-display">Visa Hub AI Assistant</h3>
                <p className="text-blue-100 text-xs mt-0.5">সাধারণত তাৎক্ষণিক উত্তর দেয়</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    if (window.confirm("আপনি কি চ্যাটের ইতিহাস মুছে ফেলতে চান?")) {
                      setChatHistory([]);
                      setIsHandover(false);
                      localStorage.removeItem('visa_hub_chat_history');
                      localStorage.removeItem('visa_hub_handover');
                      localStorage.removeItem('lastContactFormSubmitted');
                      localStorage.removeItem('lastFormDetails');
                    }
                  }}
                  title="চ্যাট ইতিহাস মুছুন"
                  className="hover:bg-white/10 p-2 rounded-xl transition-colors text-blue-100 hover:text-white"
                >
                  <Trash2 size={16} />
                </button>
                <button 
                  onClick={handleToggle} 
                  className="hover:bg-white/10 p-2 rounded-xl transition-colors"
                >
                  <X size={18} />
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

      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggle}
          className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all ${
            isOpen 
              ? 'bg-gray-900 dark:bg-slate-800 text-white shadow-gray-900/10' 
              : 'bg-blue-600 text-white shadow-blue-600/35 hover:bg-blue-700'
          }`}
          title="AI Assistant Chat"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </motion.button>
      </div>
    </>
  );
}
