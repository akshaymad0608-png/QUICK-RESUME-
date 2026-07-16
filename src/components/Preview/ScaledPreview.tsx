import React, { useRef, useState, useEffect } from 'react';

export const ScaledPreview: React.FC<{ children: React.ReactNode, scale?: number }> = ({ children, scale: propScale }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoScale, setAutoScale] = useState(0.1);

  useEffect(() => {
    if (propScale !== undefined) return;
    
    const obs = new ResizeObserver((entries) => {
      for (const e of entries) {
        const { width } = e.contentRect;
        // The resume base width is 794
        const newScale = width / 794;
        setAutoScale(newScale);
      }
    });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [propScale]);

  const scale = propScale !== undefined ? propScale : autoScale;

  return (
    <div ref={containerRef} className="w-full flex justify-center">
      <div 
        style={{ width: 794 * scale, height: 1123 * scale }} 
        className="relative shrink-0 transition-all duration-300 overflow-hidden"
      >
        <div 
          className="absolute top-0 left-0 origin-top-left bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden"
          style={{ 
            transform: `scale(${scale})`, 
            width: '794px', 
            height: '1123px' 
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
