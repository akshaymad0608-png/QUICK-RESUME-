import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface CardProps extends HTMLMotionProps<"div"> {
  glass?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', glass = false, children, ...props }, ref) => {
    const base = "rounded-2xl border border-border bg-bg-2 shadow-sm text-main";
    const glassStyle = glass ? "glass-card" : base;
    return (
      <motion.div ref={ref} className={`${glassStyle} p-6 ${className}`} overflow="hidden" {...props}>
        {children}
      </motion.div>
    );
  }
);
Card.displayName = 'Card';
