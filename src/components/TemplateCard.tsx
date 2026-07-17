import { FC, useState, useRef, useEffect } from 'react';
import { TemplateData } from '../data/templates';
import { ResumeData } from '../types';
import Classic from './templates/Classic';
import Modern from './templates/Modern';
import Minimal from './templates/Minimal';
import Executive from './templates/Executive';
import TwoColumn from './templates/TwoColumn';
import Sidebar from './templates/Sidebar';
import Timeline from './templates/Timeline';
import Creative from './templates/Creative';

const mockData = (color: string): ResumeData => ({
  personalInfo: {
    firstName: "Alex",
    lastName: "Morgan",
    jobTitle: "Senior Marketing Manager",
    email: "alex.morgan@email.com",
    phone: "(555) 123-4567",
    phoneCode: "+1",
    location: "New York, NY",
    city: "New York",
    country: "USA",
    linkedin: "linkedin.com/in/alex",
    portfolio: "",
    website: "alexmorgan.com",
    address: "",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
  },
  summary: "A highly motivated and results-driven Senior Marketing Manager with over 8 years of experience in leading comprehensive marketing strategies, driving brand awareness, and optimizing customer acquisition pipelines. Demonstrated success in scaling digital campaigns.",
  experience: [
    {
      id: "1",
      company: "Global Tech Inc.",
      jobTitle: "Senior Marketing Manager",
      city: "New York",
      country: "USA",
      startDate: "2019",
      endDate: "Present",
      isPresent: true,
      description: "• Led the complete overhaul of the digital marketing strategy, resulting in a 40% increase in lead generation and a 25% reduction in CPA.\n• Managed a cross-functional team of 15 members, fostering a culture of innovation.\n• Directed successful multi-channel product launches, generating over $5M in first-quarter sales."
    },
    {
      id: "2",
      company: "Creative Solutions",
      jobTitle: "Marketing Specialist",
      city: "San Francisco",
      country: "USA",
      startDate: "2015",
      endDate: "2019",
      isPresent: false,
      description: "• Developed and executed targeted social media campaigns, growing audience engagement by 150% over two years.\n• Conducted comprehensive market research to identify trends and optimize content strategy."
    }
  ],
  education: [
    {
      id: "1",
      schoolName: "University of Business Admin",
      degree: "Bachelor of Science",
      fieldOfStudy: "Marketing",
      city: "Boston",
      country: "USA",
      startYear: "2011",
      endYear: "2015",
      description: "Graduated with Honors. President of the Marketing Club."
    }
  ],
  skills: ["Digital Marketing", "SEO/SEM", "Content Strategy", "Team Leadership", "Data Analysis", "CRM (Salesforce)", "Adobe Creative Suite"],
  projects: [],
  certifications: [],
  languages: [],
  design: {
    template: "any",
    color: color,
    headingFont: "Inter, sans-serif",
    bodyFont: "Inter, sans-serif",
    fontSize: "13px",
    lineHeight: "1.6",
    spacing: "normal",
    pageStyle: "classic"
  }
});

export const ActualResume: FC<{ layout: string; color: string }> = ({ layout, color }) => {
  const data = mockData(color);

  return (
    <div style={{ width: "794px", minWidth: "794px", height: "1123px", minHeight: "1123px" }} className="bg-white overflow-hidden text-left relative pointer-events-none">
       {layout === 'modern' && <Modern data={data} />}
       {layout === 'minimal' && <Minimal data={data} />}
       {layout === 'executive' && <Executive data={data} />}
       {layout === 'two-column' && <TwoColumn data={data} />}
       {layout === 'sidebar' && <Sidebar data={data} />}
       {layout === 'timeline' && <Timeline data={data} />}
       {layout === 'creative' && <Creative data={data} />}
       {(layout === 'classic' || !['modern','minimal','executive','two-column','sidebar','timeline','creative'].includes(layout)) && <Classic data={data} />}
    </div>
  );
};

/* Accent swatches offered on every card */
const SWATCHES = ['#171D2F', '#3A4FD8', '#1D4ED8', '#B91C1C', '#7C3AED'];

const defaultColorFor = (template: TemplateData): string => {
  if (template.id.includes('blue')) return '#1D4ED8';
  if (template.id.includes('red')) return '#B91C1C';
  if (template.id.includes('green')) return '#3A4FD8';
  if (template.id.includes('black')) return '#171D2F';
  switch (template.category) {
    case 'Colorful': return '#1D4ED8';
    case 'Creative':
    case 'Designer': return '#7C3AED';
    case 'Developer': return '#3A4FD8';
    case 'Healthcare': return '#1D4ED8';
    case 'Marketing': return '#B91C1C';
    default: return '#171D2F';
  }
};

export const ResumeTemplateCard: FC<{
  template: TemplateData;
  onSelect?: (id: string, color?: string) => void;
}> = ({ template, onSelect }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.1);
  const [visible, setVisible] = useState(false); // lazy-mount heavy preview
  const [activeColor, setActiveColor] = useState(() => defaultColorFor(template));

  useEffect(() => {
    setActiveColor(defaultColorFor(template));
  }, [template]);

  /* Only mount the full resume DOM when the card scrolls near the viewport.
     Rendering 60 previews at once made the templates page crawl. */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setVisible(true)),
      { rootMargin: '400px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const obs = new ResizeObserver((entries) => {
      for (const e of entries) {
        const { width, height } = e.contentRect;
        setScale(Math.min(width / 794, height / 1123));
      }
    });
    if (wrapperRef.current) obs.observe(wrapperRef.current);
    return () => obs.disconnect();
  }, []);

  const handleSelect = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (onSelect) onSelect(template.id, activeColor);
  };

  return (
    <div className="flex flex-col group h-full rounded-2xl border border-line bg-card shadow-card hover:shadow-lift transition-shadow overflow-hidden">
      {/* Preview */}
      <div
        ref={wrapperRef}
        className="w-full bg-[#F1EFE7] p-5 sm:p-7 flex justify-center items-center h-[420px] sm:h-[500px] relative overflow-hidden cursor-pointer border-b border-line"
        onClick={handleSelect}
      >
        <div
          style={{ width: `${794 * scale}px`, height: `${1123 * scale}px` }}
          className="bg-white shadow-lg shrink-0 relative group-hover:scale-[1.02] transition-transform duration-500 origin-center overflow-hidden"
        >
          {visible ? (
            <div className="origin-top-left absolute top-0 left-0" style={{ transform: `scale(${scale})`, width: "794px", height: "1123px" }}>
              <ActualResume layout={template.layout} color={activeColor} />
            </div>
          ) : (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-white to-[#F1EFE7]" aria-hidden="true" />
          )}
        </div>

        {/* Hover action */}
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/5 transition-colors flex items-center justify-center pointer-events-none">
          <button
            className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 bg-pine hover:bg-pine-deep text-white rounded-full px-7 py-3 text-sm font-bold shadow-lift translate-y-3 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto"
            onClick={handleSelect}
          >
            Use this template
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase bg-card/95 text-pine border border-line px-2 py-1 rounded">ATS ✓</span>
          {template.badge === 'Premium' && (
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase bg-ink text-seal px-2 py-1 rounded">Pro</span>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-[17px] font-bold text-ink leading-snug">{template.name}</h3>
            <p className="text-[13px] text-mist mt-0.5 line-clamp-2">{template.description}</p>
          </div>
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-mist border border-line rounded px-2 py-1 whitespace-nowrap mt-0.5">{template.category}</span>
        </div>

        <div className="flex justify-between items-center mt-auto pt-1">
          <div className="flex gap-2" role="group" aria-label="Accent color">
            {SWATCHES.map(c => (
              <button
                key={c}
                onClick={(e) => { e.stopPropagation(); setActiveColor(c); }}
                aria-label={`Accent ${c}`}
                aria-pressed={activeColor === c}
                className={`w-5 h-5 rounded-full transition-transform ring-offset-2 ${activeColor === c ? 'ring-2 ring-ink scale-110' : 'hover:scale-110'}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-mist">PDF · DOCX</span>
        </div>
      </div>
    </div>
  );
};

export const TemplateCard = ResumeTemplateCard;
