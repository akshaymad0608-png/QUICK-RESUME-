import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, CheckCircle2, XCircle, X, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'loading' | 'info';
  visible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, visible, onClose }) => {
  useEffect(() => {
    if (visible && type !== 'loading') {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, type, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:-translate-x-0 md:right-6 md:bottom-6 z-[200]"
        >
          <div className={`p-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] border max-w-sm flex items-start gap-3 w-[90vw] md:w-auto backdrop-blur-xl ${
            type === 'success' 
              ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-400'
              : type === 'error'
              ? 'bg-rose-950/80 border-rose-500/30 text-rose-400'
              : 'bg-[var(--color-bg-2)] border-[var(--color-border-hover)] text-[var(--text-main)]'
          }`}>
            <div className="shrink-0 mt-0.5">
              {type === 'success' && <CheckCircle2 size={20} className="text-emerald-500" />}
              {type === 'error' && <XCircle size={20} className="text-rose-500" />}
              {type === 'loading' && <Loader2 size={20} className="text-[var(--text-muted)] animate-spin" />}
              {type === 'info' && <Info size={20} className="text-[var(--text-muted)]" />}
            </div>
            
            <div className="text-sm font-medium leading-tight flex-1 pt-0.5">
              {message}
            </div>

            {(type === 'success' || type === 'error' || type === 'info') && (
              <button 
                onClick={onClose}
                className="shrink-0 ml-2 opacity-50 hover:opacity-100 transition-opacity focus:outline-none"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
