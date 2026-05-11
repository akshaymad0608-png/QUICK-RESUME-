// === FILE: src/components/ScaledPreview.tsx ===
import React, { useRef, useEffect, useState } from 'react';

interface ScaledPreviewProps {
  children: React.ReactNode;
  containerWidth?: number; // Optional override
}

export const ScaledPreview: React.FC<ScaledPreviewProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calculateScale = () => {
      if (containerRef.current && contentRef.current) {
        const containerW = containerRef.current.clientWidth;
        // The resume standard width is ~794px for A4 at 96 DPI
        const contentW = 794; 
        
        // Add some padding (e.g., 40px total)
        const paddedContainerW = containerW - 40;
        
        if (contentW > paddedContainerW) {
          setScale(paddedContainerW / contentW);
        } else {
          // You might choose to cap at scale 1, or scale up on large screens.
          setScale(Math.min(paddedContainerW / contentW, 1.2));
        }
      }
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, [children]);

  return (
    <div 
      ref={containerRef} 
      className="w-full flex items-center justify-center p-4 bg-gray-50/50"
      style={{ overflow: 'hidden' }}
    >
      <div 
        style={{ 
          transform: `scale(${scale})`, 
          transformOrigin: 'top center',
          transition: 'transform 0.15s ease-out'
        }}
      >
        <div ref={contentRef} style={{ width: '794px' }} className="shadow-lg bg-white resume-canvas">
          {children}
        </div>
      </div>
    </div>
  );
};
