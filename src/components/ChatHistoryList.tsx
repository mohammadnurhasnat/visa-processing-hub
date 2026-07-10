import { MessageSquare, Loader2, UserCheck, User, Phone, Mail, CheckCircle, ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from 'motion/react';

interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
  showContactForm?: boolean;
}

interface ChatHistoryListProps {
  chatHistory: ChatMessage[];
  isLoading: boolean;
  isHandover: boolean;
  onFormSubmit?: (name: string, phone: string, email: string, service: string) => Promise<void>;
}

interface InlineContactFormProps {
  onSubmit: (name: string, phone: string, email: string, service: string) => Promise<void>;
}

function InlineContactForm({ onSubmit }: InlineContactFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Tourist Visa (ট্যুরিস্ট ভিসা)');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const options = [
    'Tourist Visa (ট্যুরিস্ট ভিসা)',
    'Medical Visa (মেডিকেল ভিসা)',
    'Business Visa (বিজনেস ভিসা)',
    'Double Entry Visa (ডাবল এন্ট্রি ভিসা)',
    'Other Support (অন্যান্য ভিসা সাহায্য)'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('অনুগ্রহ করে আপনার নাম লিখুন।');
      return;
    }
    if (!phone.trim()) {
      setError('অনুগ্রহ করে আপনার ফোন নম্বর লিখুন।');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    try {
      await onSubmit(name, phone, email, service);
      localStorage.setItem('lastContactFormSubmitted', Date.now().toString());
      setIsSubmitted(true);
    } catch (err) {
      setError('দুঃখিত, তথ্য জমা দেওয়া যায়নি। আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="mt-3 p-4 bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl flex flex-col items-center text-center gap-1.5 animate-in fade-in zoom-in-95 duration-200">
        <CheckCircle size={20} className="text-emerald-500" />
        <span className="font-bold text-xs">তথ্য সফলভাবে পাঠানো হয়েছে!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-4 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl space-y-3.5 shadow-sm text-left animate-in fade-in slide-in-from-top-2 duration-200">
      <p className="text-[10px] text-gray-500 dark:text-slate-400 font-bold uppercase tracking-wider">
        আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করবেন:
      </p>
      
      {/* 1st Index: Name */}
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wide flex items-center gap-1">
          <User size={11} className="text-blue-500 shrink-0" /> নাম <span className="text-red-500 font-bold">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="আপনার নাম লিখুন"
          disabled={isSubmitting}
          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-xs text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-semibold"
        />
      </div>

      {/* 2nd Index: Phone */}
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wide flex items-center gap-1">
          <Phone size={11} className="text-blue-500 shrink-0" /> ফোন নম্বর <span className="text-red-500 font-bold">*</span>
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="যেমন: ০১৩xxxxxxxx"
          disabled={isSubmitting}
          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-xs text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-semibold"
        />
      </div>

      {/* 3rd Index: Email */}
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wide flex items-center gap-1">
          <Mail size={11} className="text-blue-500 shrink-0" /> ইমেইল এড্রেস <span className="text-gray-400 font-normal text-[9px]">(ঐচ্ছিক)</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="যেমন: target@example.com (ঐচ্ছিক)"
          disabled={isSubmitting}
          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-xs text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-semibold"
        />
      </div>

      {/* 4th Index: Service Type */}
      <div className="space-y-1 relative">
        <label className="text-[10px] font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wide flex items-center gap-1">
          <CheckCircle size={11} className="text-blue-500 shrink-0" /> সেবার ধরন
        </label>
        
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          disabled={isSubmitting}
          className="w-full px-3 py-2 text-left rounded-xl bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-xs text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-semibold flex items-center justify-between cursor-pointer min-h-[34px] shadow-sm"
        >
          <span>{service}</span>
          <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {isDropdownOpen && (
          <>
            {/* Backdrop click to close */}
            <div className="fixed inset-0 z-[100]" onClick={() => setIsDropdownOpen(false)} />
            
            {/* Options list dropdown */}
            <div className="absolute left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl shadow-lg z-[110] animate-in fade-in slide-in-from-top-1 duration-150 py-1">
              {options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setService(opt);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-xs font-semibold transition-colors hover:bg-gray-50 dark:hover:bg-slate-900 block ${
                    service === opt 
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20' 
                      : 'text-gray-700 dark:text-slate-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {error && <p className="text-[10px] font-bold text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs hover:bg-blue-700 transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm min-h-[36px]"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={12} className="animate-spin" />
            পাঠানো হচ্ছে...
          </>
        ) : (
          'তথ্য জমা দিন'
        )}
      </button>
    </form>
  );
}

function parseTextWithBold(text: string) {
  const parts = text.split('**');
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <strong key={index} className="font-extrabold text-blue-700 dark:text-blue-300">
          {part}
        </strong>
      );
    }
    
    const subParts = part.split('*');
    return subParts.map((subPart, subIndex) => {
      if (subIndex % 2 === 1) {
        return (
          <strong key={`sub-${subIndex}`} className="font-semibold text-gray-900 dark:text-gray-100">
            {subPart}
          </strong>
        );
      }
      return subPart;
    });
  });
}

function formatMessage(content: string, isUser: boolean) {
  if (isUser) {
    return <span className="whitespace-pre-wrap">{content}</span>;
  }

  const lines = content.split('\n');
  const renderedElements: React.ReactNode[] = [];
  let currentListItems: React.ReactNode[] = [];
  
  const flushList = (key: number) => {
    if (currentListItems.length > 0) {
      renderedElements.push(
        <ul key={`list-${key}`} className="space-y-2 my-2.5 pl-5 list-disc list-outside text-gray-800 dark:text-slate-100">
          {currentListItems}
        </ul>
      );
      currentListItems = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    
    if (!trimmed) {
      flushList(index);
      renderedElements.push(<div key={`space-${index}`} className="h-1.5" />);
      return;
    }

    // Match bullets like *, -, •, or digits (e.g., 1., 2., ১., ২.)
    const bulletRegex = /^([\s]*)([\*\-•]|\d+[\.\)]|[১২৩৪৫৬৭৮৯০]+[\.\)])\s+(.*)$/;
    const match = trimmed.match(bulletRegex);
    
    if (match) {
      const contentText = match[3];
      currentListItems.push(
        <li key={`item-${index}`} className="leading-relaxed pl-1 text-sm text-gray-800 dark:text-slate-200">
          {parseTextWithBold(contentText)}
        </li>
      );
    } else {
      flushList(index);
      
      const isHeader = trimmed.endsWith(':') || (trimmed.startsWith('**') && trimmed.endsWith('**'));
      
      if (isHeader) {
        const cleanedHeader = trimmed.replace(/^\*\*|\*\*$/g, '');
        renderedElements.push(
          <h4 key={`header-${index}`} className="font-bold text-blue-700 dark:text-blue-400 text-sm mt-3 mb-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-3 bg-blue-600 dark:bg-blue-500 rounded-full shrink-0 animate-pulse" />
            {cleanedHeader}
          </h4>
        );
      } else {
        renderedElements.push(
          <p key={`p-${index}`} className="leading-relaxed text-gray-800 dark:text-slate-200 my-1 text-sm">
            {parseTextWithBold(trimmed)}
          </p>
        );
      }
    }
  });

  flushList(lines.length);

  return <div className="space-y-1">{renderedElements}</div>;
}

export default function ChatHistoryList({ chatHistory, isLoading, isHandover, onFormSubmit }: ChatHistoryListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50 dark:bg-slate-950/40">
      {chatHistory.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-blue-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100 dark:border-slate-700">
            <MessageSquare className="text-blue-600 dark:text-blue-400" size={28} />
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-gray-800 dark:text-slate-100 font-bold text-sm mb-1.5"
          >
            আসসালামু আলাইকুম!
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="text-gray-500 dark:text-slate-400 text-xs leading-relaxed max-w-[240px] mx-auto"
          >
            ভিসা প্রসেসিং হাব-এ আপনাকে স্বাগতম। ইন্ডিয়ান ভিসা সংক্রান্ত যেকোনো প্রশ্ন আমাদের করতে পারেন।
          </motion.p>
        </div>
      )}
      {chatHistory.map((chat, i) => (
        <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
            chat.role === 'user' 
              ? 'bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-600/5' 
              : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 rounded-tl-none border border-gray-100 dark:border-slate-800 shadow-sm'
          }`}>
            {formatMessage(chat.content, chat.role === 'user')}
            
            {/* Display the inline contact form inside the bot message bubble if triggered, unless submitted in last 24 hours */}
            {chat.role === 'bot' && chat.showContactForm && onFormSubmit && (() => {
              const lastSubmitted = localStorage.getItem('lastContactFormSubmitted');
              const isWithin24Hours = lastSubmitted ? (Date.now() - parseInt(lastSubmitted)) < 24 * 60 * 60 * 1000 : false;
              if (isWithin24Hours) return null;
              
              return (
                <InlineContactForm onSubmit={async (name, phone, email, service) => {
                  await onFormSubmit(name, phone, email, service);
                }} />
              );
            })()}
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-800 shadow-sm px-4 py-3 rounded-2xl rounded-tl-none flex items-center space-x-1.5 min-h-[40px]">
            <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" />
          </div>
        </div>
      )}

      {isHandover && (
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 text-amber-800 dark:text-amber-400 text-xs p-3.5 rounded-xl flex items-center gap-2">
          <UserCheck size={16} className="text-amber-600 dark:text-amber-400" />
          <span className="font-medium">একজন প্রতিনিধি দ্রুত আপনার সাথে যোগাযোগ করবেন।</span>
        </div>
      )}
    </div>
  );
}
