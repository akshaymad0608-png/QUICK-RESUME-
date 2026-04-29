import React, { useState } from 'react';

export const LightInputField = ({ label, type = "text", required, value, placeholder, ...props }: any) => {
  const [focused, setFocused] = useState(false);
  const isActive = focused || (value !== undefined && value !== null && value !== "");

  return (
    <div className="w-full relative pt-4">
      <input 
        type={type} 
        value={value}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus && props.onFocus(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur && props.onBlur(e);
        }}
        {...props} 
        className={`w-full px-4 py-3 text-[15px] border border-[var(--color-border-hover)] bg-[var(--color-border)] text-[var(--text-main)] rounded-xl focus:border-emerald-500 focus:bg-[var(--color-border-hover)] outline-none transition-all placeholder:text-[var(--text-muted)] peer ${props.className || ''}`} 
        placeholder={focused ? placeholder : ""}
      />
      {label && (
        <label 
          className={`absolute left-4 transition-all duration-200 pointer-events-none flex items-center gap-1 ${
            isActive 
              ? '-top-1 text-xs font-bold text-emerald-400 bg-[var(--color-bg)] px-1.5 rounded' 
              : 'top-[26px] text-[15px] text-[var(--text-muted)]'
          }`}
        >
          {label} {required && <span className="text-emerald-500">*</span>}
        </label>
      )}
    </div>
  );
};

export const LightTextArea = ({ label, required, optionalRightNode, value, placeholder, ...props }: any) => {
  const [focused, setFocused] = useState(false);
  const isActive = focused || (value !== undefined && value !== null && value !== "");

  return (
    <div className="w-full relative pt-4 flex flex-col">
      {optionalRightNode && (
        <div className="absolute right-2 top-0 z-10 flex items-center h-full">
          {optionalRightNode}
        </div>
      )}
      <textarea 
        value={value}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus && props.onFocus(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur && props.onBlur(e);
        }}
        {...props} 
        className={`w-full px-4 py-4 text-[15px] border border-[var(--color-border-hover)] bg-[var(--color-border)] text-[var(--text-main)] rounded-xl focus:border-emerald-500 focus:bg-[var(--color-border-hover)] outline-none transition-all placeholder:text-[var(--text-muted)] peer resize-y leading-relaxed hide-scrollbar ${props.className || ''}`} 
        placeholder={focused ? placeholder : ""}
      />
      {label && (
        <label 
          className={`absolute left-4 transition-all duration-200 pointer-events-none flex items-center gap-1 ${
            isActive 
              ? '-top-1 text-xs font-bold text-emerald-400 bg-[var(--color-bg)] px-1.5 rounded' 
              : 'top-[30px] text-[15px] text-[var(--text-muted)]'
          }`}
        >
          {label} {required && <span className="text-emerald-500">*</span>}
        </label>
      )}
    </div>
  );
};
