import React from "react";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
}) => {
  return (
    <svg
      viewBox="0 0 650 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <g transform="translate(10, 10)">
        {/* Yellow-Orange Pill */}
        <g transform="translate(50,50) rotate(-45) translate(-50,-50)">
          <rect x="0" y="34" width="100" height="32" rx="16" fill="url(#orange-grad)" />
          {/* Pen tip */}
          <path d="M 10 42 L -2 50 L 10 58 Z" fill="#b45309" />
          <path d="M 2 50 L 6 50" stroke="#fef3c7" strokeWidth="2" />
        </g>
        
        {/* Cyan-Blue Pill */}
        <g transform="translate(45,45) rotate(45) translate(-45,-45)">
          <rect x="0" y="29" width="100" height="32" rx="16" fill="url(#cyan-grad)" opacity="0.85" />
          {/* Pen tip */}
          <path d="M 90 37 L 102 45 L 90 53 Z" fill="#0369a1" />
          <path d="M 94 45 L 98 45" stroke="#e0f2fe" strokeWidth="2" />
        </g>

        {/* Red Circle */}
        <circle cx="38" cy="38" r="28" fill="url(#red-grad)" opacity="0.95" />

        {/* Crown - Light blue */}
        <path d="M 24 -5 L 30 8 L 38 -8 L 46 8 L 52 -5 L 48 10 L 28 10 Z" fill="#38bdf8" />

        {/* Letters container */}
        <text x="38" y="44" fill="#7f1d1d" fontSize="24" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" opacity="0.6">R</text>
        <text x="58" y="68" fill="#1e3a8a" fontSize="20" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" opacity="0.6">Q</text>
      </g>
      
      <text
        x="130"
        y="70"
        className="fill-[var(--text-main)]"
        fontSize="54"
        fontWeight="800"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
        letterSpacing="2"
      >
        QUICKRESUME
      </text>
      
      <text
        x="133"
        y="102"
        className="fill-[var(--text-muted)]"
        fontSize="24"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
        letterSpacing="0.5"
      >
        Professional Resumes, Instantly
      </text>

      <defs>
        <linearGradient id="orange-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <linearGradient id="cyan-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
        <linearGradient id="red-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
      </defs>
    </svg>
  );
};
