import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
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
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'bot', content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHandover, setIsHandover] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setMessage('');
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage, 
          history: chatHistory 
        })
      });
      const data = await res.json();
      setChatHistory(prev => [...prev, { role: 'bot', content: data.reply }]);
      if (data.isHumanHandover) {
        setIsHandover(true);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setChatHistory(prev => [...prev, { role: 'bot', content: 'দুঃখিত, সংযোগে কিছু সমস্যা হচ্ছে। অনুগ্রহ করে আবার চেষ্টা করুন।' }]);
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
            <div className="bg-blue-600 p-6 text-white flex justify-between items-center shadow-lg shadow-blue-600/10">
              <div>
                <h3 className="font-bold text-lg font-display">Visa Hub AI Assistant</h3>
                <p className="text-blue-100 text-xs mt-0.5">সাধারণত তাৎক্ষণিক উত্তর দেয়</p>
              </div>
              <button 
                onClick={handleToggle} 
                className="hover:bg-white/10 p-2.5 rounded-xl transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <ChatHistoryList 
              chatHistory={chatHistory} 
              isLoading={isLoading} 
              isHandover={isHandover} 
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
