import { useState, FormEvent } from 'react';
import { KeyRound, AlertCircle, RefreshCw, Shield, CheckCircle2 } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoggingIn(true);

    setTimeout(() => {
      const trimmedEmail = email.trim().toLowerCase();
      if (trimmedEmail === 'mohammadnurhasnat@gmail.com' && password === 'Turbo5max#') {
        setAuthError('');
        onLoginSuccess();
      } else {
        setAuthError('ভুল ইমেইল অথবা পাসওয়ার্ড! অনুগ্রহ করে আবার চেষ্টা করুন।');
      }
      setIsLoggingIn(false);
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto py-4 flex flex-col justify-center h-full">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-400 shadow-xl shadow-emerald-950/20">
          <KeyRound size={28} />
        </div>
        <h4 className="text-xl font-bold text-white mb-1.5">অ্যাডমিন প্রবেশদ্বার</h4>
        <p className="text-slate-400 text-xs leading-relaxed">
          অটোমেশন গেটওয়েতে প্রবেশ করতে ইমেইল এবং পাসওয়ার্ড দিয়ে লগইন করুন
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        {authError && (
          <div className="bg-red-950/35 border border-red-800/40 text-red-300 text-xs p-3.5 rounded-xl flex items-center gap-2.5">
            <AlertCircle size={16} className="text-red-400 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">ইমেইল / Email</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="mohammadnurhasnat@gmail.com" 
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-sm transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">পাসওয়ার্ড / Password</label>
          <input 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••" 
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-sm transition-all"
          />
        </div>

        <button 
          type="submit"
          disabled={isLoggingIn}
          className="w-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
        >
          {isLoggingIn ? (
            <>
              <RefreshCw size={16} className="animate-spin" />
              যাচাই করা হচ্ছে...
            </>
          ) : (
            <>
              <Shield size={16} />
              লগইন করুন / Admin Login
            </>
          )}
        </button>
      </form>

      {/* Hint Box for Testing convenience */}
      <div className="mt-6 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-xs space-y-1">
        <p className="text-slate-300 font-bold flex items-center gap-1">
          <CheckCircle2 size={12} className="text-emerald-400" />
          Test Admin Credentials (টেস্ট লগইন তথ্য):
        </p>
        <div className="text-slate-400 space-y-0.5">
          <p><span className="font-semibold text-slate-300">Email:</span> mohammadnurhasnat@gmail.com</p>
          <p><span className="font-semibold text-slate-300">Password:</span> Turbo5max#</p>
        </div>
      </div>
    </div>
  );
}
