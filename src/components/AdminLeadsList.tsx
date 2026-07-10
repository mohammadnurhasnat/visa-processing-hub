import { motion } from 'motion/react';
import { Database, ExternalLink } from 'lucide-react';

interface AdminLeadsListProps {
  leads: any[];
  selectedLead: any;
  onSelectLead: (lead: any) => void;
}

export default function AdminLeadsList({ leads, selectedLead, onSelectLead }: AdminLeadsListProps) {
  if (leads.length === 0) {
    return (
      <div className="text-center py-16 text-slate-500">
        <Database size={48} className="mx-auto mb-4 text-slate-700" />
        <p className="text-sm font-semibold mb-1 text-slate-400">No leads captured yet</p>
        <p className="text-xs max-w-xs mx-auto text-slate-500">
          Interact with the **Processing Hub Assistant** on the bottom right, state your name and ask about a visa to generate automated reports.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Captured Real-time Leads</p>
      {leads.map((lead, i) => (
        <div 
          key={lead.id || i}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            selectedLead?.id === lead.id 
              ? 'bg-slate-900 border-emerald-500/50' 
              : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
          }`}
          onClick={() => onSelectLead(selectedLead?.id === lead.id ? null : lead)}
        >
          <div className="flex justify-between items-start gap-4 mb-2">
            <div>
              <h4 className="font-bold text-white text-sm">
                {lead.CustomerName || "Unknown Guest"}
              </h4>
              <p className="text-xs text-slate-400">{lead.CoreQuery}</p>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
              lead.Status === 'Lead Captured' 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : lead.Status === 'Pending Human' 
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
            }`}>
              {lead.Status}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-500 pt-2 border-t border-slate-800/60">
            <span>Platform: {lead.Platform || "Website"}</span>
            <span>{lead.timestamp}</span>
          </div>

          {/* Expanded View with JSON Summary for Make.com Extraction */}
          {selectedLead?.id === lead.id && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t border-slate-800 space-y-3 text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <span className="text-slate-400 font-bold block mb-1">Key Information Sought</span>
                <p className="text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 leading-relaxed">
                  {lead.KeyInformationSought}
                </p>
              </div>

              <div>
                <span className="text-slate-400 font-bold block mb-1.5 flex items-center gap-1.5">
                  <ExternalLink size={12} className="text-emerald-400" />
                  Structured JSON Payload (Webhook ready)
                </span>
                <pre className="bg-slate-950 p-3 rounded-xl text-emerald-400 font-mono text-[10px] overflow-x-auto border border-slate-800/80">
                  {JSON.stringify({
                    event: "new_lead",
                    payload: {
                      name: lead.CustomerName,
                      platform: lead.Platform,
                      query: lead.CoreQuery,
                      status: lead.Status,
                      key_info: lead.KeyInformationSought,
                      extracted_at: lead.timestamp
                    }
                  }, null, 2)}
                </pre>
              </div>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}
