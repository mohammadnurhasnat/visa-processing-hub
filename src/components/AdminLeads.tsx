import { useState, useEffect } from 'react';
import { RefreshCw, Trash2, Database, Activity, X, LogOut, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AdminLogin from './AdminLogin';
import AdminLeadsList from './AdminLeadsList';

interface AdminLeadsProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

export default function AdminLeads({ isOpen: propIsOpen, onClose, onOpen }: AdminLeadsProps = {}) {
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

  const [leads, setLeads] = useState<any[]>([]);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('isAdminAuthenticated') === 'true';
    }
    return false;
  });

  const fetchLeads = async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      setLeads(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const clearLeads = async () => {
    if (!isAuthenticated) return;
    if (!confirm("Are you sure you want to clear all captured leads?")) return;
    try {
      await fetch('/api/leads/clear', { method: 'POST' });
      setLeads([]);
      setSelectedLead(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('isAdminAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAdminAuthenticated');
    setLeads([]);
    setSelectedLead(null);
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchLeads();
      const interval = setInterval(fetchLeads, 4000); // Auto-refresh every 4s while open
      return () => clearInterval(interval);
    }
  }, [isOpen, isAuthenticated]);

  return (
    <>
      {/* Portal Overlay / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-[calc(100vw-48px)] sm:w-[500px] md:w-[600px] bg-slate-950 text-slate-100 rounded-[2rem] shadow-2xl border border-slate-800 overflow-hidden flex flex-col h-[580px] z-[110]"
          >
            {/* Header */}
            <div className="bg-slate-900 p-6 border-b border-slate-800 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <Database className="text-emerald-400" size={24} />
                <div>
                  <h3 className="font-bold text-base md:text-lg text-white font-display">
                    {isAuthenticated ? 'Make.com Automation Gateway' : 'Admin Security Portal'}
                  </h3>
                  <p className="text-slate-400 text-xs flex items-center gap-1.5 mt-0.5">
                    {isAuthenticated ? (
                      <>
                        <Activity size={12} className="animate-pulse text-emerald-400" />
                        Listening for active lead reports...
                      </>
                    ) : (
                      <>
                        <Lock size={12} className="text-amber-500" />
                        Please verify your administrator credentials
                      </>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {isAuthenticated && (
                  <>
                    <button 
                      onClick={fetchLeads} 
                      className="p-2.5 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
                      title="Force Refresh"
                    >
                      <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
                    </button>
                    <button 
                      onClick={clearLeads} 
                      className="p-2.5 hover:bg-red-950 rounded-xl text-slate-400 hover:text-red-400 transition-colors"
                      title="Clear All Leads"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button 
                      onClick={handleLogout} 
                      className="p-2.5 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-amber-400 transition-colors"
                      title="Log Out Admin"
                    >
                      <LogOut size={18} />
                    </button>
                  </>
                )}
                <button 
                  onClick={handleToggle} 
                  className="p-2.5 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {!isAuthenticated ? (
                <AdminLogin onLoginSuccess={handleLoginSuccess} />
              ) : (
                <AdminLeadsList 
                  leads={leads} 
                  selectedLead={selectedLead} 
                  onSelectLead={setSelectedLead} 
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
