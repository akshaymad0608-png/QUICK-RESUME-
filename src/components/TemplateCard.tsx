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

const ActualResume: FC<{ layout: string; color: string }> = ({ layout, color }) => {
  const data = mockData(color);
  
  return (
    <div className="w-[794px] h-[1123px] bg-white overflow-hidden text-left relative pointer-events-none">
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

export const ResumeTemplateCard: FC<{
  template: TemplateData;
  onSelect?: (id: string, color?: string) => void;
}> = ({ template, onSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.4);
  const [activeColor, setActiveColor] = useState('#2563EB');
  
  const colors = ['#2563EB', '#9333EA', '#DC2626', '#D97706', '#111827'];

  useEffect(() => {
    if (template.variant === 'Simple' || template.variant === 'Executive' || template.variant === 'Elegant' || template.variant === 'Standard') setActiveColor('#111827');
    if (template.variant === 'Creative') setActiveColor('#0F172A');
    if (template.variant === 'Developer') setActiveColor('#16A34A');
    if (template.variant === 'AI') setActiveColor('#8B5CF6'); // Purple default for AI
    
    // Explicit color assignments based on specific IDs
    if (template.id.includes('blue')) setActiveColor('#2563EB');
    if (template.id.includes('black')) setActiveColor('#111827');
  }, [template.variant, template.id]);

  useEffect(() => {
    const obs = new ResizeObserver((entries) => {
      for (const e of entries) {
        setScale(e.contentRect.height / 1123);
      }
    });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const handleSelect = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (onSelect) onSelect(template.id, activeColor);
  };

  return (
    <div className="flex flex-col group h-full">
      <div className="w-full bg-[#f1f5f9] border border-gray-200 rounded-t-2xl p-6 md:p-8 flex justify-center items-center h-[520px] md:h-[640px] relative transition-all duration-300 overflow-hidden cursor-pointer" onClick={handleSelect}>
        <div 
          ref={containerRef}
          className="h-full aspect-[1/1.414] bg-white shadow-xl flex-shrink-0 relative group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] group-hover:scale-[1.03] transition-all duration-500 origin-center"
        >
          <div className="w-[794px] h-[1123px] origin-top-left absolute top-0 left-0" style={{ transform: `scale(${scale})` }}>
            <ActualResume layout={template.layout} color={activeColor} />
          </div>
        </div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-transparent group-hover:bg-gray-900/5 transition-colors duration-300 flex items-center justify-center z-10 pointer-events-none">
          <button 
            className="opacity-0 group-hover:opacity-100 bg-[#2563EB] text-white rounded-[100px] px-8 py-3.5 font-bold shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto hover:bg-[#1D4ED8]"
            onClick={handleSelect}
          >
            Use this template
          </button>
        </div>
      </div>
      
      {/* Details */}
      <div className="pt-6 pb-6 px-6 bg-white border border-t-0 border-gray-200 rounded-b-2xl shadow-sm group-hover:shadow-md transition-shadow h-full flex flex-col justify-between flex-1">
        <div>
          <div className="flex justify-between items-start mb-2 gap-2 flex-wrap">
            <h3 className="text-[20px] font-bold text-gray-900">{template.name}</h3>
            <div className="flex items-center gap-1.5 flex-wrap justify-end">
              <span className="text-[10px] font-extrabold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-[6px] uppercase tracking-wider border border-emerald-200 whitespace-nowrap">
                ✓ ATS Approved
              </span>
              {template.badge === 'Free' ? (
                <span className="text-[10px] font-extrabold bg-[#f1f5f9] text-gray-700 px-2.5 py-1 rounded-[6px] uppercase tracking-wider border border-gray-200">Free</span>
              ) : (
                <span className="text-[10px] font-extrabold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-[6px] uppercase tracking-wider border border-blue-200">Premium</span>
              )}
            </div>
          </div>
          <p className="text-[15px] text-gray-500 mb-6 line-clamp-2 min-h-[44px]">{template.description}</p>
        </div>
        
        <div className="flex justify-between items-center mt-auto">
          <div className="flex gap-2.5">
            {colors.map(c => (
              <button 
                key={c}
                onClick={(e) => { e.stopPropagation(); setActiveColor(c); }}
                className={`w-[22px] h-[22px] rounded-full border-[3px] transition-all bg-clip-padding ${activeColor === c ? 'border-gray-900 scale-110 shadow-sm' : 'border-transparent hover:scale-110'}`}
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>
          
          <div className="flex gap-2">
            <span className="text-[10px] font-extrabold bg-[#f1f5f9] text-gray-600 px-2 py-0.5 rounded-[5px] uppercase tracking-wider border border-gray-200">PDF</span>
            <span className="text-[10px] font-extrabold bg-[#f1f5f9] text-gray-600 px-2 py-0.5 rounded-[5px] uppercase tracking-wider border border-gray-200">DOCX</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TemplateCard = ResumeTemplateCard;
