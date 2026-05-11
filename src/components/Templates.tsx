// ============================================
// FILE: src/components/Templates.tsx
// ============================================
import React from 'react';
import { ResumeData } from '../types';

export interface TemplateProps {
  data: ResumeData;
  themeColor?: string;
}

const FooterMark = () => (
  <div className="text-center w-full pt-4 mt-8" style={{ fontSize: '6pt', color: '#9ca3af' }}>
    Built with QuickResume.app
  </div>
);

const Bullets = ({ text, color }: { text: string, color?: string }) => {
  if (!text) return null;
  const items = text.split('\n').filter(t => t.trim().length > 0);
  return (
    <ul className="list-none pl-4 mt-1 space-y-0.5" style={{ color: '#374151' }}>
      {items.map((bullet, i) => (
        <li key={i} className="relative pl-3">
          <span className="absolute left-0 top-[6px] w-[3px] h-[3px] rounded-full" style={{ backgroundColor: color || '#9ca3af' }} />
          <span style={{ color: '#111827' }}>{bullet.replace(/^-\s*/, '')}</span>
        </li>
      ))}
    </ul>
  );
};

const SkillsChips = ({ skills, color }: { skills: string, color: string }) => {
  if (!skills) return null;
  const items = skills.split(',').map(s => s.trim()).filter(Boolean);
  return (
    <div className="flex flex-wrap gap-1.5 mt-1">
      {items.map((s, i) => (
        <span key={i} style={{ backgroundColor: `${color}10`, color: color, padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 600, border: `1px solid ${color}30` }}>
          {s}
        </span>
      ))}
    </div>
  );
};

// ==========================================
// 1. ModernProTemplate (Requested Default)
// ==========================================
export const ModernProTemplate: React.FC<TemplateProps> = ({ data, themeColor = '#4F46E5' }) => (
  <div className="flex w-full h-full bg-white relative" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
    {/* Left Sidebar 33% */}
    <div style={{ width: '31%', backgroundColor: `${themeColor}09`, borderRight: `1px solid ${themeColor}20`, padding: '36px 28px' }}>
      <div className="mb-8">
        <h2 style={{ fontSize: '11.5pt', fontWeight: 800, color: themeColor, fontVariant: 'small-caps', letterSpacing: '1px', marginBottom: '10px' }}>Contact</h2>
        <div className="space-y-1.5" style={{ fontSize: '9.5pt', color: '#374151', lineHeight: '1.5' }}>
          {data.email && <div className="break-all">{data.email}</div>}
          {data.phone && <div className="break-all">{data.phone}</div>}
          {data.location && <div className="break-words">{data.location}</div>}
          {data.linkedin && <div className="break-all">{data.linkedin}</div>}
          {data.website && <div className="break-all">{data.website}</div>}
        </div>
      </div>

      {data.skills && (
        <div className="mb-8">
          <h2 style={{ fontSize: '11.5pt', fontWeight: 800, color: themeColor, fontVariant: 'small-caps', letterSpacing: '1px', marginBottom: '10px' }}>Skills</h2>
          <div className="flex flex-col gap-1 mt-1" style={{ fontSize: '9.5pt', color: '#374151' }}>
            {data.skills.split(',').map((s, i) => (
              <div key={i} className="font-medium">• {s.trim()}</div>
            ))}
          </div>
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 style={{ fontSize: '11.5pt', fontWeight: 800, color: themeColor, fontVariant: 'small-caps', letterSpacing: '1px', marginBottom: '12px' }}>Education</h2>
          {data.education.map(edu => (
            <div key={edu.id} className="mb-3.5">
              <div style={{ fontSize: '10pt', fontWeight: 700, color: '#111827', lineHeight: '1.3' }}>{edu.degree}</div>
              <div style={{ fontSize: '9pt', color: '#4B5563', marginTop: '2px' }}>{edu.institution}</div>
              <div style={{ fontSize: '8.5pt', color: themeColor, fontWeight: 600, marginTop: '2px' }}>{edu.year}</div>
            </div>
          ))}
        </div>
      )}
      
      {data.certifications.length > 0 && (
        <div className="mb-8">
          <h2 style={{ fontSize: '11.5pt', fontWeight: 800, color: themeColor, fontVariant: 'small-caps', letterSpacing: '1px', marginBottom: '12px' }}>Certifications</h2>
          {data.certifications.map(cert => (
            <div key={cert.id} className="mb-3">
              <div style={{ fontSize: '9.5pt', fontWeight: 700, color: '#111827', lineHeight: '1.3' }}>{cert.name}</div>
              <div style={{ fontSize: '8.5pt', color: '#4B5563', marginTop: '2px' }}>{cert.issuer}</div>
              <div style={{ fontSize: '8.5pt', color: themeColor, fontWeight: 600, marginTop: '2px' }}>{cert.year}</div>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Right Content 69% */}
    <div style={{ width: '69%', padding: '36px 40px', display: 'flex', flexDirection: 'column' }}>
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h1 style={{ fontSize: '32pt', fontWeight: 900, color: '#111827', lineHeight: '1', letterSpacing: '-1px' }}>{data.name}</h1>
        <div style={{ fontSize: '13pt', fontWeight: 700, color: themeColor, marginTop: '8px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{data.title}</div>
      </div>

      {data.summary && (
        <div className="mb-8 text-justify" style={{ fontSize: '10pt', color: '#374151', lineHeight: '1.6' }}>
          {data.summary}
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-7">
          <h2 style={{ fontSize: '14pt', fontWeight: 800, color: '#111827', fontVariant: 'small-caps', borderBottom: `2px solid ${themeColor}40`, paddingBottom: '6px', marginBottom: '16px' }}>Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp: any) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <div style={{ fontSize: '12pt', fontWeight: 800, color: '#111827' }}>{exp.jobTitle}</div>
                  <div style={{ fontSize: '9.5pt', fontWeight: 700, color: themeColor }}>{exp.startDate} - {exp.endDate}</div>
                </div>
                <div style={{ fontSize: '10.5pt', fontWeight: 600, color: '#4B5563', marginBottom: '6px' }}>
                  {exp.company}{exp.location ? ` • ${exp.location}` : ''}
                </div>
                <div style={{ fontSize: '9.5pt' }}>
                  <Bullets text={exp.responsibilities} color={themeColor} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 style={{ fontSize: '14pt', fontWeight: 800, color: '#111827', fontVariant: 'small-caps', borderBottom: `2px solid ${themeColor}40`, paddingBottom: '6px', marginBottom: '16px' }}>Projects</h2>
          <div className="space-y-4">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1 mt-2">
                  <div style={{ fontSize: '11.5pt', fontWeight: 800, color: '#111827' }}>{proj.name}</div>
                  {proj.link && <div style={{ fontSize: '9pt', color: themeColor, fontWeight: 500 }}>{proj.link}</div>}
                </div>
                <div style={{ fontSize: '10pt', color: '#374151', lineHeight: '1.5' }}>{proj.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto">
        <FooterMark />
      </div>
    </div>
  </div>
);

// ==========================================
// 2. TechTemplate (New)
// ==========================================
export const TechTemplate: React.FC<TemplateProps> = ({ data, themeColor = '#06b6d4' }) => (
  <div className="w-full h-full bg-white flex flex-col" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
    <div style={{ backgroundColor: themeColor, padding: '28px 36px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-1">{data.name}</h1>
        <div className="text-sm font-semibold opacity-90">{data.title}</div>
      </div>
      <div className="text-right text-xs font-medium opacity-90 space-y-0.5 mt-1">
        {data.email && <div>{data.email}</div>}
        {data.phone && <div>{data.phone}</div>}
        {data.location && <div>{data.location}</div>}
        {data.linkedin && <div>{data.linkedin}</div>}
        {data.website && <div>{data.website}</div>}
      </div>
    </div>

    <div className="p-9 flex flex-col flex-1">
      {data.summary && (
        <div className="mb-6">
          <div style={{ fontSize: '10pt', color: '#374151', lineHeight: '1.6' }}>{data.summary}</div>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-[13pt] font-black uppercase tracking-wider mb-3 pb-1" style={{ color: '#111827', borderBottom: `2px solid ${themeColor}` }}>Experience</h2>
          <div className="space-y-5">
            {data.experience.map((exp: any) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <div className="font-bold text-gray-900 text-[11.5pt]">{exp.jobTitle}</div>
                  <div className="text-[10pt] font-bold" style={{ color: themeColor }}>{exp.startDate} - {exp.endDate}</div>
                </div>
                <div className="text-[10.5pt] text-gray-700 mb-1.5 font-medium italic">{exp.company} {exp.location ? `• ${exp.location}` : ''}</div>
                <div className="text-[10pt] text-gray-700">
                  <Bullets text={exp.responsibilities} color={themeColor} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-[13pt] font-black uppercase tracking-wider mb-3 pb-1" style={{ color: '#111827', borderBottom: `2px solid ${themeColor}` }}>Selected Projects</h2>
          <div className="space-y-4">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <div className="font-bold text-gray-900 text-[11pt]">{proj.name}</div>
                  {proj.link && <div className="text-[9.5pt]" style={{ color: themeColor }}>{proj.link}</div>}
                </div>
                <div className="text-[10pt] text-gray-700 leading-relaxed mt-1">{proj.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-[13pt] font-black uppercase tracking-wider mb-3 pb-1" style={{ color: '#111827', borderBottom: `2px solid ${themeColor}` }}>Education</h2>
          <div className="space-y-3">
            {data.education.map(edu => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <div className="font-bold text-gray-900 text-[11pt]">{edu.degree}</div>
                  <div className="text-gray-600 text-[10pt]">{edu.institution}</div>
                </div>
                <div className="text-[10pt] font-semibold" style={{ color: themeColor }}>{edu.year}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.skills && (
        <div className="mb-4">
          <h2 className="text-[13pt] font-black uppercase tracking-wider mb-3 pb-1" style={{ color: '#111827', borderBottom: `2px solid ${themeColor}` }}>Skills</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {data.skills.split(',').map((s,i) => s.trim() && (
               <span key={i} className="px-2.5 py-1 bg-gray-100 text-gray-800 rounded font-medium text-[10pt] border border-gray-200">
                 {s.trim()}
               </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto">
        <FooterMark />
      </div>
    </div>
  </div>
);

// ==========================================
// 3. MinimalTemplate (New)
// ==========================================
export const MinimalTemplate: React.FC<TemplateProps> = ({ data, themeColor = '#000000' }) => (
  <div className="p-12 w-full h-full bg-white flex flex-col" style={{ fontFamily: 'Georgia, serif' }}>
    <div className="text-center mb-8 border-b pb-6" style={{ borderColor: '#e5e7eb' }}>
      <h1 className="text-4xl font-normal text-gray-900 mb-2">{data.name}</h1>
      <div className="text-[11.5pt] text-gray-600 uppercase tracking-widest mb-4 font-sans">{data.title}</div>
      <div className="flex flex-wrap justify-center gap-3 text-[9.5pt] text-gray-500 font-sans">
        {data.email && <span>{data.email}</span>}
        {data.phone && <span>• {data.phone}</span>}
        {data.location && <span>• {data.location}</span>}
        {data.linkedin && <span>• {data.linkedin}</span>}
        {data.website && <span>• {data.website}</span>}
      </div>
    </div>

    {data.summary && (
      <div className="mb-8 px-2">
        <p className="text-[10pt] text-gray-800 leading-relaxed font-sans">{data.summary}</p>
      </div>
    )}

    {data.experience.length > 0 && (
      <div className="mb-8">
        <h2 className="text-[11.5pt] uppercase tracking-widest mb-4 font-bold border-b pb-1" style={{ color: themeColor, borderColor: '#e5e7eb' }}>Professional Experience</h2>
        <div className="space-y-6">
          {data.experience.map((exp: any) => (
            <div key={exp.id}>
              <div className="flex justify-between items-end mb-1">
                <div className="text-[11.5pt] font-semibold text-gray-900">{exp.jobTitle}</div>
                <div className="text-[10pt] text-gray-500 font-sans tracking-wide">{exp.startDate} - {exp.endDate}</div>
              </div>
              <div className="text-[10pt] text-gray-600 font-sans font-medium mb-2">{exp.company}{exp.location ? ` — ${exp.location}` : ''}</div>
              <div className="text-[10pt] font-sans text-gray-700">
                <Bullets text={exp.responsibilities} color={themeColor} />
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {data.projects.length > 0 && (
      <div className="mb-8">
         <h2 className="text-[11.5pt] uppercase tracking-widest mb-4 font-bold border-b pb-1" style={{ color: themeColor, borderColor: '#e5e7eb' }}>Selected Projects</h2>
         <div className="space-y-4">
            {data.projects.map(proj => (
               <div key={proj.id}>
                  <div className="flex justify-between items-baseline mb-0.5">
                     <div className="text-[11pt] font-semibold text-gray-900">{proj.name}</div>
                     <div className="text-[9pt] font-sans text-gray-500">{proj.link}</div>
                  </div>
                  <div className="text-[10pt] font-sans text-gray-700 leading-relaxed">{proj.description}</div>
               </div>
            ))}
         </div>
      </div>
    )}

    {data.education.length > 0 && (
      <div className="mb-8">
        <h2 className="text-[11.5pt] uppercase tracking-widest mb-4 font-bold border-b pb-1" style={{ color: themeColor, borderColor: '#e5e7eb' }}>Education</h2>
        <div className="space-y-3">
          {data.education.map(edu => (
             <div key={edu.id} className="flex flex-row justify-between items-start">
                <div>
                   <div className="text-[11pt] font-semibold text-gray-900">{edu.degree}</div>
                   <div className="text-[10pt] text-gray-700 font-sans">{edu.institution}</div>
                </div>
                <div className="text-[10pt] text-gray-500 font-sans">{edu.year}</div>
             </div>
          ))}
        </div>
      </div>
    )}

    {data.skills && (
      <div className="mb-6">
        <h2 className="text-[11.5pt] uppercase tracking-widest mb-3 font-bold border-b pb-1" style={{ color: themeColor, borderColor: '#e5e7eb' }}>Skills</h2>
        <div className="text-[10pt] text-gray-800 font-sans leading-relaxed">
          {data.skills.split(',').map(s=>s.trim()).filter(Boolean).join(' • ')}
        </div>
      </div>
    )}

    <div className="mt-auto">
      <FooterMark />
    </div>
  </div>
);

// ==========================================
// Generic Template for Remaining
// ==========================================
const GenericTemplate = ({ data, themeColor, headerAlign, headerBorder }: any) => (
  <div className="p-12 w-full h-full bg-white flex flex-col" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
    <div style={{ textAlign: headerAlign, marginBottom: '24px', borderBottom: headerBorder ? `2px solid ${themeColor}` : 'none', paddingBottom: '16px' }}>
      <h1 style={{ fontSize: '28pt', fontWeight: 800, color: '#111827', margin: 0, letterSpacing: '-0.5px' }}>{data.name}</h1>
      <div style={{ fontSize: '13pt', color: themeColor, fontWeight: 600, marginTop: '4px' }}>{data.title}</div>
      <div style={{ fontSize: '9.5pt', color: '#4B5563', marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: headerAlign === 'center' ? 'center' : 'flex-start' }}>
        {data.email && <span>{data.email}</span>}
        {data.phone && <span>• {data.phone}</span>}
        {data.location && <span>• {data.location}</span>}
        {data.linkedin && <span>• {data.linkedin}</span>}
        {data.website && <span>• {data.website}</span>}
      </div>
    </div>

    {data.summary && (
      <div className="mb-6">
        <div style={{ fontSize: '10.5pt', color: '#374151', lineHeight: '1.6' }}>{data.summary}</div>
      </div>
    )}

    {data.experience.length > 0 && (
      <div className="mb-6">
        <h2 style={{ fontSize: '13pt', fontWeight: 800, color: themeColor, textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>Professional Experience</h2>
        <div className="space-y-5">
          {data.experience.map((exp: any) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-0.5">
                <div style={{ fontSize: '11.5pt', fontWeight: 700, color: '#111827' }}>{exp.jobTitle}</div>
                <div style={{ fontSize: '10pt', fontWeight: 600, color: '#4B5563' }}>{exp.startDate} - {exp.endDate}</div>
              </div>
              <div style={{ fontSize: '10.5pt', fontStyle: 'italic', fontWeight: 500, color: themeColor, marginBottom: '4px' }}>{exp.company} {exp.location ? `- ${exp.location}` : ''}</div>
              <div style={{ fontSize: '10pt', color: '#374151' }}>
                <Bullets text={exp.responsibilities} color={themeColor} />
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {data.projects.length > 0 && (
      <div className="mb-6">
        <h2 style={{ fontSize: '13pt', fontWeight: 800, color: themeColor, textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>Selected Projects</h2>
        <div className="space-y-4">
          {data.projects.map((proj: any) => (
            <div key={proj.id}>
              <div className="flex justify-between items-baseline mb-0.5">
                 <div style={{ fontSize: '11.5pt', fontWeight: 700, color: '#111827' }}>{proj.name}</div>
                 <div style={{ fontSize: '9.5pt', color: themeColor }}>{proj.link}</div>
              </div>
              <div style={{ fontSize: '10pt', color: '#374151', lineHeight: '1.5' }}>{proj.description}</div>
            </div>
          ))}
        </div>
      </div>
    )}

    {data.education.length > 0 && (
      <div className="mb-6">
        <h2 style={{ fontSize: '13pt', fontWeight: 800, color: themeColor, textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>Education</h2>
        <div className="space-y-3">
          {data.education.map((edu: any) => (
            <div key={edu.id} className="flex justify-between items-baseline">
              <div>
                <div style={{ fontSize: '11pt', fontWeight: 700, color: '#111827' }}>{edu.degree}</div>
                <div style={{ fontSize: '10pt', color: '#4B5563' }}>{edu.institution}</div>
              </div>
              <div style={{ fontSize: '10pt', color: themeColor, fontWeight: 500 }}>{edu.year}</div>
            </div>
          ))}
        </div>
      </div>
    )}

    {data.skills && (
      <div className="mb-4">
        <h2 style={{ fontSize: '13pt', fontWeight: 800, color: themeColor, textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.5px' }}>Skills</h2>
        <div style={{ fontSize: '10pt', color: '#374151', lineHeight: '1.6' }}>
           {data.skills.split(',').map((s: string) => s.trim()).filter(Boolean).join(' • ')}
        </div>
      </div>
    )}

    <div className="mt-auto">
      <FooterMark />
    </div>
  </div>
);

// ==========================================
// ATS Classic Template (High ATS Score)
// ==========================================
export const ATSClassicTemplate: React.FC<TemplateProps> = ({ data, themeColor = '#000000' }) => (
  <div className="p-12 w-full h-full bg-white flex flex-col" style={{ fontFamily: 'Times New Roman, Times, serif', color: '#000000' }}>
    <div className="text-center mb-6">
      <h1 style={{ fontSize: '24pt', fontWeight: 'bold', margin: '0 0 4px 0', textTransform: 'uppercase' }}>{data.name}</h1>
      <div style={{ fontSize: '11pt', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
        {data.email && <a href={`mailto:${data.email}`} style={{ color: '#000000', textDecoration: 'none' }}>{data.email}</a>}
        {data.phone && <span>| {data.phone}</span>}
        {data.location && <span>| {data.location}</span>}
        {data.linkedin && <a href={data.linkedin} style={{ color: '#000000', textDecoration: 'none' }}>| LinkedIn</a>}
        {data.website && <a href={data.website} style={{ color: '#000000', textDecoration: 'none' }}>| Portfolio</a>}
      </div>
    </div>

    {data.summary && (
      <div className="mb-4">
        <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '6px' }}>Summary</h2>
        <div style={{ fontSize: '11pt', lineHeight: '1.5' }}>{data.summary}</div>
      </div>
    )}

    {data.experience.length > 0 && (
      <div className="mb-4">
        <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '8px' }}>Professional Experience</h2>
        <div className="space-y-4">
          {data.experience.map((exp: any) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline">
                <div style={{ fontSize: '11pt', fontWeight: 'bold' }}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</div>
                <div style={{ fontSize: '11pt', fontWeight: 'bold' }}>{exp.startDate} - {exp.endDate}</div>
              </div>
              <div style={{ fontSize: '11pt', fontStyle: 'italic', marginBottom: '4px' }}>{exp.jobTitle}</div>
              <div style={{ fontSize: '11pt', lineHeight: '1.4' }}>
                <Bullets text={exp.responsibilities} color="#000000" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {data.projects.length > 0 && (
      <div className="mb-4">
        <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '8px' }}>Technical Projects</h2>
        <div className="space-y-4">
          {data.projects.map((proj: any) => (
            <div key={proj.id}>
              <div className="flex justify-between items-baseline">
                 <div style={{ fontSize: '11pt', fontWeight: 'bold' }}>{proj.name}</div>
                 <div style={{ fontSize: '11pt', fontStyle: 'italic' }}>{proj.link}</div>
              </div>
              <div style={{ fontSize: '11pt', lineHeight: '1.4', marginTop: '4px' }}>{proj.description}</div>
            </div>
          ))}
        </div>
      </div>
    )}

    {data.education.length > 0 && (
      <div className="mb-4">
        <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '8px' }}>Education</h2>
        <div className="space-y-2">
          {data.education.map((edu: any) => (
            <div key={edu.id} className="flex justify-between items-baseline">
              <div>
                <span style={{ fontSize: '11pt', fontWeight: 'bold' }}>{edu.institution}</span>
                <span style={{ fontSize: '11pt' }}>, {edu.degree}</span>
              </div>
              <div style={{ fontSize: '11pt' }}>{edu.year}</div>
            </div>
          ))}
        </div>
      </div>
    )}

    {data.skills && (
      <div className="mb-4">
        <h2 style={{ fontSize: '12pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '6px' }}>Skills</h2>
        <div style={{ fontSize: '11pt', lineHeight: '1.5' }}>
           {data.skills.split(',').map((s: string) => s.trim()).filter(Boolean).join(', ')}
        </div>
      </div>
    )}

    <div className="mt-auto">
      <FooterMark />
    </div>
  </div>
);

// ==========================================
// Executive Template
// ==========================================
export const ExecutiveTemplate: React.FC<TemplateProps> = ({ data, themeColor = '#1e3a8a' }) => (
  <div className="p-12 w-full h-full bg-white flex flex-col" style={{ fontFamily: 'Georgia, serif' }}>
    <div className="text-center mb-6">
      <h1 style={{ fontSize: '26pt', fontWeight: 'normal', color: themeColor, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>{data.name}</h1>
      <div style={{ fontSize: '12pt', color: '#4B5563', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>{data.title}</div>
      <div className="flex justify-center gap-4 text-[9.5pt] text-gray-500 font-sans" style={{ color: '#6B7280' }}>
        {data.email && <span>{data.email}</span>}
        {data.phone && <span>• {data.phone}</span>}
        {data.location && <span>• {data.location}</span>}
        {data.linkedin && <span>• LinkedIn</span>}
      </div>
    </div>

    {data.summary && (
      <div className="mb-8 px-4 text-center">
        <p style={{ fontSize: '11pt', lineHeight: '1.7', color: '#374151', fontStyle: 'italic' }}>"{data.summary}"</p>
      </div>
    )}

    {data.experience.length > 0 && (
      <div className="mb-6">
        <div className="flex items-center mb-6">
           <h2 style={{ fontSize: '12pt', fontWeight: 'bold', color: themeColor, textTransform: 'uppercase', letterSpacing: '1px', margin: 0, paddingRight: '16px', whiteSpace: 'nowrap' }}>Professional Experience</h2>
           <div style={{ flexGrow: 1, height: '1px', backgroundColor: '#E5E7EB' }}></div>
        </div>
        <div className="space-y-6">
          {data.experience.map((exp: any) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-1">
                <div style={{ fontSize: '12pt', fontWeight: 'bold', color: '#111827' }}>{exp.jobTitle}</div>
                <div style={{ fontSize: '10pt', fontFamily: 'Inter, sans-serif', color: '#6B7280', fontWeight: 500 }}>{exp.startDate} – {exp.endDate}</div>
              </div>
              <div style={{ fontSize: '11pt', color: themeColor, fontWeight: 'bold', marginBottom: '6px' }}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</div>
              <div style={{ fontSize: '10.5pt', color: '#374151', lineHeight: '1.5' }}>
                <Bullets text={exp.responsibilities} color={themeColor} />
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    <div className="grid grid-cols-2 gap-8 mb-6">
      <div>
        {data.education.length > 0 && (
          <div>
            <div className="flex items-center mb-4">
               <h2 style={{ fontSize: '12pt', fontWeight: 'bold', color: themeColor, textTransform: 'uppercase', letterSpacing: '1px', margin: 0, paddingRight: '16px', whiteSpace: 'nowrap' }}>Education</h2>
               <div style={{ flexGrow: 1, height: '1px', backgroundColor: '#E5E7EB' }}></div>
            </div>
            <div className="space-y-4">
              {data.education.map((edu: any) => (
                <div key={edu.id}>
                   <div style={{ fontSize: '11pt', fontWeight: 'bold', color: '#111827' }}>{edu.degree}</div>
                   <div style={{ fontSize: '10.5pt', color: '#4B5563', margin: '2px 0' }}>{edu.institution}</div>
                   <div style={{ fontSize: '10pt', color: '#6B7280', fontStyle: 'italic' }}>{edu.year}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        {data.skills && (
          <div>
            <div className="flex items-center mb-4">
               <h2 style={{ fontSize: '12pt', fontWeight: 'bold', color: themeColor, textTransform: 'uppercase', letterSpacing: '1px', margin: 0, paddingRight: '16px', whiteSpace: 'nowrap' }}>Core Competencies</h2>
               <div style={{ flexGrow: 1, height: '1px', backgroundColor: '#E5E7EB' }}></div>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.skills.split(',').map((s: string, i: number) => (
                <span key={i} style={{ fontSize: '10pt', color: '#374151', backgroundColor: '#F3F4F6', padding: '4px 10px', borderRadius: '4px' }}>{s.trim()}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>

    <div className="mt-auto">
      <FooterMark />
    </div>
  </div>
);

// Map remaining logically
export const ModernTemplate: React.FC<TemplateProps> = (p) => <GenericTemplate {...p} headerAlign="left" headerBorder={true} />;
export const BusinessTemplate: React.FC<TemplateProps> = (p) => <GenericTemplate {...p} headerAlign="center" headerBorder={false} />;
export const HealthcareTemplate: React.FC<TemplateProps> = (p) => <GenericTemplate {...p} headerAlign="left" headerBorder={false} />;
export const CreativeTemplate: React.FC<TemplateProps> = (p) => <GenericTemplate {...p} headerAlign="left" headerBorder={true} />;
export const AcademicTemplate: React.FC<TemplateProps> = (p) => <GenericTemplate {...p} headerAlign="center" headerBorder={false} />;
export const StartupTemplate: React.FC<TemplateProps> = (p) => <GenericTemplate {...p} headerAlign="left" headerBorder={true} />;
export const CorporateTemplate: React.FC<TemplateProps> = (p) => <GenericTemplate {...p} headerAlign="center" headerBorder={false} />;
export const FreelancerTemplate: React.FC<TemplateProps> = (p) => <GenericTemplate {...p} headerAlign="left" headerBorder={true} />;
export const CleanSidebarTemplate: React.FC<TemplateProps> = (p) => <ModernProTemplate {...p} />; 
export const DesignerTemplate: React.FC<TemplateProps> = (p) => <TechTemplate {...p} />;
export const NotionTemplate: React.FC<TemplateProps> = (p) => <GenericTemplate {...p} headerAlign="left" headerBorder={false} />;
export const ModernMinimalistTemplate: React.FC<TemplateProps> = (p) => <MinimalTemplate {...p} />;
export const AvatarTemplate: React.FC<TemplateProps> = (p) => <ModernProTemplate {...p} />;
export const GeometricTemplate: React.FC<TemplateProps> = (p) => <TechTemplate {...p} />;
