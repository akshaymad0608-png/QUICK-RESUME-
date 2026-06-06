import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'outline' | 'gradient';
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className = '', variant = 'primary', ...props }, ref) => {
    let variantStyles = "";
    switch (variant) {
      case 'primary':
        variantStyles = "bg-primary/10 text-primary border-primary/20";
        break;
      case 'secondary':
        variantStyles = "bg-secondary/10 text-secondary border-secondary/20";
        break;
      case 'success':
        variantStyles = "bg-success/10 text-success border-success/20";
        break;
      case 'outline':
        variantStyles = "text-main border-border";
        break;
      case 'gradient':
        variantStyles = "gradient-bg text-white border-transparent";
        break;
    }
    
    return (
      <div 
        ref={ref} 
        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${variantStyles} ${className}`} 
        {...props} 
      />
    );
  }
);
Badge.displayName = 'Badge';
