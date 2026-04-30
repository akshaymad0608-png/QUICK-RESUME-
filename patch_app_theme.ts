import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Remove floating toggle
const toggleRegex = /\{\/\* Theme Toggle Button \*\/\}\s*<button[\s\S]*?<\/button>/;
content = content.replace(toggleRegex, '');

// 2. Add to Header
const headerRightRegex = /\{\/\* RIGHT: Actions \*\/\}\s*<div className="hidden md:flex items-center gap-4">/;
const newHeaderRight = `{/* RIGHT: Actions */}
            <div className="hidden md:flex items-center gap-2 lg:gap-4">
              <button
                onClick={() => setIsLightMode(!isLightMode)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--color-bg-3)] transition-colors border border-transparent hover:border-[var(--color-border-hover)]"
                aria-label="Toggle Theme"
              >
                {isLightMode ? (
                  <Moon size={20} className="text-[var(--text-main)]" />
                ) : (
                  <Sun size={20} className="text-[var(--text-main)]" />
                )}
              </button>`;
content = content.replace(headerRightRegex, newHeaderRight);

// Need to do this for mobile view as well? Yes, actually let's put it next to the menu button for mobile.
const mobileBtnRegex = /<button\s*className="md:hidden text-\[var\(--text-main\)\] p-2"/;
const newMobileBtn = `<button
                onClick={() => setIsLightMode(!isLightMode)}
                className="md:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--color-bg-3)] transition-colors"
                aria-label="Toggle Theme"
              >
                {isLightMode ? <Moon size={20} className="text-[var(--text-main)]" /> : <Sun size={20} className="text-[var(--text-main)]" />}
              </button>\n              <button\n                className="md:hidden text-[var(--text-main)] p-2"`;
content = content.replace(mobileBtnRegex, newMobileBtn);

// Also need to fix the logo
fs.writeFileSync('src/App.tsx', content);

let logoContent = fs.readFileSync('src/components/Logo.tsx', 'utf8');
logoContent = `import React from "react";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
}) => {
  return (
    <svg
      viewBox="0 0 540 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M20 20 L500 20 C516.569 20 530 33.431 530 50 L530 90 C530 106.569 516.569 120 500 120 L20 120 L20 20 Z"
        fill="#212C7C"
      />
      <path
        d="M28 28 L496 28 C509.255 28 520 38.745 520 52 L520 88 C520 101.255 509.255 112 496 112 L28 112 L28 28 Z"
        stroke="white"
        strokeWidth="3.5"
      />
      
      <text
        x="275"
        y="80"
        fill="white"
        fontSize="64"
        fontWeight="900"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
        textAnchor="middle"
        letterSpacing="2"
      >
        QUICKRESUME
      </text>
      
      <text
        x="275"
        y="102"
        fill="white"
        fontSize="14"
        fontWeight="500"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
        textAnchor="middle"
        letterSpacing="2.5"
      >
        FAST. FREE. PROFESSIONAL.
      </text>
    </svg>
  );
};
`;
fs.writeFileSync('src/components/Logo.tsx', logoContent);

console.log("Patched");
