import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 sm:top-24 sm:bottom-auto z-50 flex items-center gap-3 px-4 py-3 bg-[var(--color-bg-2)] border border-[var(--color-border)] rounded-xl shadow-2xl animate-fade-in-up">
      {type === 'success' ? (
        <CheckCircle2 size={20} className="text-emerald-400" />
      ) : (
        <XCircle size={20} className="text-rose-400" />
      )}
      <span className="text-sm font-medium text-[var(--text-main)]">{message}</span>
      <button onClick={onClose} className="ml-2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors">
        <X size={16} />
      </button>
    </div>
  );
};

export const useToast = () => {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  return { toast, showToast, hideToast };
};
