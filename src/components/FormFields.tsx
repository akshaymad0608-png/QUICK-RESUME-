// === FILE: src/components/FormFields.tsx ===
import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const InputField = ({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
}: {
  icon?: React.ElementType;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) => (
  <div>
    <label className="block text-xs font-semibold text-[var(--text-subtle)] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
      {Icon && <Icon size={14} className="text-[var(--color-primary)]" />} {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-[14px] text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
    />
  </div>
);

export const TextAreaField = ({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder = "",
  rows = 4,
}: {
  icon?: React.ElementType;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) => (
  <div>
    <label className="block text-xs font-semibold text-[var(--text-subtle)] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
      {Icon && <Icon size={14} className="text-[var(--color-primary)]" />} {label}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg px-3 py-2.5 text-[14px] text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all resize-none"
    />
  </div>
);

export const AccordionSection = ({
  icon: Icon,
  title,
  subtitle,
  defaultOpen = true,
  badgeCount,
  children,
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  badgeCount?: number;
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="bg-[var(--color-bg-2)] rounded-xl border border-[var(--color-border)] overflow-hidden mb-3 transition-colors hover:border-[var(--color-border-hover)] shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between bg-transparent hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        aria-label={isOpen ? `Collapse ${title}` : `Expand ${title}`}
      >
        <div className="flex items-center gap-3">
          <div className={`${isOpen ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20' : 'bg-[var(--color-bg-3)] text-[var(--color-primary)]'} p-2 rounded-lg transition-all duration-300`}>
            <Icon size={18} />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-[15px] text-[var(--text-main)] flex items-center gap-2">
              {title}
              {badgeCount !== undefined && badgeCount > 0 && (
                <span className="bg-[var(--color-bg-3)] text-[var(--color-primary)] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {badgeCount}
                </span>
              )}
            </h3>
            {subtitle && (
              <p className="text-[12px] text-[var(--text-muted)] leading-tight mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
        <div className="text-[var(--text-subtle)]">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: { ease: "circOut", duration: 0.3 } }}
            exit={{ height: 0, opacity: 0, transition: { ease: "circIn", duration: 0.2 } }}
            className="overflow-hidden"
          >
            <div className="p-5 border-t border-[var(--color-border)] bg-[var(--color-bg)]/30 backdrop-blur-sm">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
