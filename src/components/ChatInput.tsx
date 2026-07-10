import { Send } from 'lucide-react';

interface ChatInputProps {
  message: string;
  setMessage: (val: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export default function ChatInput({ message, setMessage, onSend, isLoading }: ChatInputProps) {
  return (
    <div className="p-4 border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSend()}
          placeholder="ভিসা বা ডকুমেন্টস নিয়ে জিজ্ঞাসা করুন..."
          className="flex-1 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 outline-none text-sm transition-all dark:text-white"
        />
        <button 
          onClick={onSend}
          disabled={isLoading}
          className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 shadow-md shadow-blue-600/10 flex items-center justify-center"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
