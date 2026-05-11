// === FILE: src/components/Logo.tsx ===
import React from 'react';

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ className = 'h-8', onClick }) => {
  return (
    <div 
      className={`flex items-center gap-2 cursor-pointer group ${className}`} 
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      <div className="relative flex items-center justify-center h-full aspect-square">
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="var(--color-accent)" />
              <animate 
                attributeName="x1" 
                values="0%;100%;0%" 
                dur="3s" 
                repeatCount="indefinite" 
              />
              <animate 
                attributeName="x2" 
                values="100%;0%;100%" 
                dur="3s" 
                repeatCount="indefinite" 
              />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Document Base */}
          <path 
            d="M25 15C25 9.477 29.477 5 35 5H65L85 25V85C85 90.523 80.523 95 75 95H35C29.477 95 25 90.523 25 85V15Z" 
            fill="url(#logo-gradient)"
            opacity="0.2"
            className="group-hover:opacity-30 transition-opacity duration-300"
          />
          
          {/* Document Content Lines */}
          <rect x="35" y="25" width="25" height="6" rx="3" fill="url(#logo-gradient)" />
          <rect x="35" y="40" width="35" height="6" rx="3" fill="url(#logo-gradient)" />
          <rect x="35" y="55" width="40" height="6" rx="3" fill="url(#logo-gradient)" />
          <rect x="35" y="70" width="20" height="6" rx="3" fill="url(#logo-gradient)" />
          
          {/* AI Sparkle / Lightning */}
          <path 
            d="M65 35L75 25V35H85L70 50V40H60L65 35Z" 
            fill="url(#logo-gradient)"
            filter="url(#glow)"
            className="group-hover:scale-110 origin-center transition-transform duration-500"
          />
        </svg>
      </div>
      <span className="text-xl tracking-tight text-[var(--text-main)]">
        Quick<span className="font-bold">Resume</span>
      </span>
    </div>
  );
};

export default Logo;
