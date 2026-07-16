import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "variant" | "size"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center rounded-full font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 disabled:pointer-events-none disabled:opacity-50";
    
    let variantStyles = "";
    switch (variant) {
      case 'primary':
        variantStyles = "bg-ink text-paper shadow-sm hover:bg-brand-deep";
        break;
      case 'secondary':
        variantStyles = "bg-brand text-white shadow-sm hover:bg-brand-deep";
        break;
      case 'outline':
        variantStyles = "border border-line bg-surface hover:border-ink text-ink";
        break;
      case 'ghost':
        variantStyles = "hover:bg-brand-soft text-ink";
        break;
      case 'gradient':
        variantStyles = "bg-brand text-white shadow-md hover:bg-brand-deep";
        break;
    }

    let sizeStyles = "";
    switch (size) {
      case 'sm':
        sizeStyles = "h-8 px-3 text-xs";
        break;
      case 'md':
        sizeStyles = "h-10 px-4 py-2 text-sm";
        break;
      case 'lg':
        sizeStyles = "h-12 px-8 text-base";
        break;
      case 'icon':
        sizeStyles = "h-10 w-10";
        break;
    }

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg className="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';
