import React, { useRef, useState, useEffect } from 'react';

/**
 * Scales an A4 resume (794px wide) to fit its container.
 * The wrapper height now tracks the REAL content height, so resumes
 * longer than one page grow — and the preview pane can scroll.
 */
export const ScaledPreview: React.FC<{ children: React.ReactNode, scale?: number }> = ({ children, scale: propScale }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [autoScale, setAutoScale] = useState(0.1);
  const [contentH, setContentH] = useState(1123);

  useEffect(() => {
    if (propScale !== undefined) return;
    const obs = new ResizeObserver((entries) => {
      for (const e of entries) {
        setAutoScale(e.contentRect.width / 794); // A4 base width
      }
    });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [propScale]);

  // Track the natural height of the resume content (multi-page support).
  useEffect(() => {
    const node = contentRef.current;
    if (!node) return;
    const measure = () => setContentH(Math.max(1123, node.scrollHeight));
    measure();
    const obs = new ResizeObserver(measure);
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const scale = propScale !== undefined ? propScale : autoScale;

  return (
    <div ref={containerRef} className="w-full flex justify-center">
      <div
        style={{ width: 794 * scale, height: contentH * scale }}
        className="relative shrink-0 transition-all duration-300"
      >
        <div
          className="absolute top-0 left-0 origin-top-left bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-300"
          style={{
            transform: `scale(${scale})`,
            width: '794px',
            minHeight: '1123px',
          }}
        >
          <div ref={contentRef} style={{ width: '794px', minHeight: '1123px' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
