import React from 'react';
import { Lightbulb } from 'lucide-react';

interface SectionTipProps {
  tip: string;
}

export const SectionTip: React.FC<SectionTipProps> = ({ tip }) => {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6 flex gap-3 text-sm text-amber-900 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-amber-400"></div>
      <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
      <div>
        <p className="font-medium text-amber-800 mb-1">Expert Tip</p>
        <p className="leading-relaxed">{tip}</p>
      </div>
    </div>
  );
};
