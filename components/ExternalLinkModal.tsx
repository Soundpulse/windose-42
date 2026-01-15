import React from 'react';
import { AlertTriangle, ExternalLink, X } from 'lucide-react';

interface ExternalLinkModalProps {
  url: string | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const ExternalLinkModal: React.FC<ExternalLinkModalProps> = ({ url, onConfirm, onCancel }) => {
  if (!url) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-black border border-gray-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between bg-white px-4 py-2">
          <div className="flex items-center gap-2 text-black font-mono font-bold text-[10px] tracking-widest">
            <AlertTriangle size={14} />
            EXTERNAL_SIGNAL_WARNING
          </div>
          <button 
            onClick={onCancel}
            className="text-black hover:bg-gray-200 p-0.5 transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 font-mono">
          <div className="text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-4 border-b border-gray-900 pb-2">
            Outgoing Request Detected
          </div>
          
          <p className="text-white text-xs leading-relaxed mb-6">
            You are about to leave <span className="text-cyan-500">WINDOSE_42</span> and establish a connection to an external entity:
          </p>

          <div className="bg-[#0a0a0a] border border-gray-900 p-3 mb-6 flex items-center gap-3 group">
            <ExternalLink size={16} className="text-gray-600 group-hover:text-white transition-colors" />
            <span className="text-[11px] text-gray-300 truncate font-light tracking-tight">
              {url}
            </span>
          </div>

          <p className="text-[9px] text-gray-600 italic mb-8">
            * Connection integrity cannot be guaranteed beyond this point. Proceeed with caution.
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <button 
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-800 text-gray-400 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all"
            >
              ABORT
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:invert transition-all"
            >
              PROCEED
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExternalLinkModal;
