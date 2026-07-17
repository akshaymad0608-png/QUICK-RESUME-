import { FC } from 'react';
import { ResumeData } from '../../types';

/**
 * Renders user-added custom sections (Awards, Publications, Research,
 * Volunteer, Portfolio, GitHub, References, …) in any template.
 * Neutral styling that inherits the template's fonts and accent color.
 */
const CustomSectionsBlock: FC<{ data: ResumeData; className?: string }> = ({ data, className = '' }) => {
  const sections = (data.customSections || []).filter(s => s.title.trim() && s.content.trim());
  if (sections.length === 0) return null;

  const c = data.design.color || '#111111';
  const hf = data.design.headingFont || data.design.fontFamily || 'inherit';

  return (
    <div className={className}>
      {sections.map(sec => (
        <div key={sec.id} style={{ marginBottom: '1.25rem' }}>
          <h2
            className="text-sm font-bold uppercase tracking-widest pb-1 mb-2"
            style={{ color: c, fontFamily: hf, borderBottom: `1.5px solid ${c}` }}
          >
            {sec.title}
          </h2>
          <div className="whitespace-pre-wrap" style={{ color: '#333' }}>
            {sec.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomSectionsBlock;
