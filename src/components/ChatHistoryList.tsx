import { MessageSquare, Loader2, UserCheck } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
}

interface ChatHistoryListProps {
  chatHistory: ChatMessage[];
  isLoading: boolean;
  isHandover: boolean;
}

export default function ChatHistoryList({ chatHistory, isLoading, isHandover }: ChatHistoryListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50 dark:bg-slate-950/40">
      {chatHistory.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-blue-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100 dark:border-slate-700">
            <MessageSquare className="text-blue-600 dark:text-blue-400" size={28} />
          </div>
          <p className="text-gray-800 dark:text-slate-100 font-bold text-sm mb-1.5">আসসালামু আলাইকুম!</p>
          <p className="text-gray-500 dark:text-slate-400 text-xs leading-relaxed max-w-[240px] mx-auto">
            ভিসা প্রসেসিং হাব-এ আপনাকে স্বাগতম। ইন্ডিয়ান ভিসা সংক্রান্ত যেকোনো প্রশ্ন আমাদের করতে পারেন।
          </p>
        </div>
      )}
      {chatHistory.map((chat, i) => (
        <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
            chat.role === 'user' 
            ? 'bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-600/5' 
            : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 rounded-tl-none border border-gray-100 dark:border-slate-800 shadow-sm'
          }`}>
            {chat.content}
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-800 shadow-sm p-4 rounded-2xl rounded-tl-none">
            <Loader2 className="animate-spin text-blue-600 dark:text-blue-400" size={18} />
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
