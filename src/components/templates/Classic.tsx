import { FC } from 'react';
import { ResumeData } from '../../types';
import CustomSectionsBlock from './CustomSectionsBlock';
import { Phone, Mail, MapPin, Linkedin, Globe } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const Classic: FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects = [], certifications = [], languages = [], design } = data;
  
  const c = design.color || '#000000';
  const spacingMap: Record<string, string> = { compact: '1rem', normal: '1.5rem', relaxed: '2rem' };
  const sectionGap = spacingMap[design.spacing] || '1.5rem';
  const hf = design.headingFont || design.fontFamily || 'Inter, sans-serif';
  const bf = design.bodyFont || design.fontFamily || 'Inter, sans-serif';

  return (
    <div className="w-full flex-1 flex flex-col h-full bg-white p-12" style={{ fontFamily: bf, color: '#1E293B', fontSize: design.fontSize || '14px', lineHeight: design.lineHeight || '1.6' }}>      
      
      {/* Header (Centered) */}
      <div className="text-center flex flex-col items-center" style={{ marginBottom: sectionGap }}>
        {personalInfo.photoUrl && data.design.showPhoto !== false && (
          <img src={personalInfo.photoUrl} alt="Profile" className="w-24 h-24 rounded-full object-cover mb-4 shadow-sm border border-gray-200" />
        )}
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 uppercase" style={{ color: c, fontFamily: hf }}>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.jobTitle && (
          <div className="text-lg font-medium text-slate-500 tracking-wider uppercase mb-4" style={{ fontFamily: hf }}>
            {personalInfo.jobTitle}
          </div>
        )}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm text-slate-600 font-medium">
          {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone size={14} style={{color: c}}/> {personalInfo.phoneCode} {personalInfo.phone}</span>}
          {personalInfo.email && <span className="flex items-center gap-1.5"><Mail size={14} style={{color: c}}/> {personalInfo.email}</span>}
          {personalInfo.city && <span className="flex items-center gap-1.5"><MapPin size={14} style={{color: c}}/> {personalInfo.city}, {personalInfo.country}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1.5"><Linkedin size={14} style={{color: c}}/> {personalInfo.linkedin.replace('https://', '')}</span>}
          {personalInfo.website && <span className="flex items-center gap-1.5"><Globe size={14} style={{color: c}}/> {personalInfo.website.replace('https://', '')}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div style={{ marginBottom: sectionGap }}>
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-300 pb-2 mb-3" style={{ color: c, fontFamily: hf }}>
            Professional Summary
          </h2>
          <p className="text-[14px] leading-relaxed text-slate-700 whitespace-pre-wrap text-justify">
            {summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={{ marginBottom: sectionGap }}>
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-300 pb-2 mb-4" style={{ color: c, fontFamily: hf }}>
            Experience
          </h2>
          <div className="space-y-5">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <div className="font-bold text-slate-900 text-[15px]" style={{ fontFamily: hf }}>{exp.jobTitle}</div>
                  <div className="text-[13px] font-semibold text-slate-500 whitespace-nowrap ml-4">
                    {exp.startDate} – {exp.isPresent ? 'Present' : exp.endDate}
                  </div>
                </div>
                <div className="text-[14px] font-medium text-[color:var(--c)] mb-2" style={{ '--c': c } as React.CSSProperties}>
                  {exp.company} {exp.city && <span className="text-slate-400 font-normal">| {exp.city}</span>}
                </div>
                <div className="text-[14px] leading-relaxed text-slate-700 whitespace-pre-wrap">
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={{ marginBottom: sectionGap }}>
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-300 pb-2 mb-4" style={{ color: c, fontFamily: hf }}>
            Education
          </h2>
          <div className="space-y-4">
            {education.map(edu => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <div className="font-bold text-slate-900 text-[15px]" style={{ fontFamily: hf }}>{edu.degree} in {edu.fieldOfStudy}</div>
                  <div className="text-[13px] font-semibold text-slate-500 whitespace-nowrap ml-4">
                    {edu.startYear} – {edu.endYear}
                  </div>
                </div>
                <div className="text-[14px] font-medium text-[color:var(--c)]" style={{ '--c': c } as React.CSSProperties}>
                  {edu.schoolName} {edu.city && <span className="text-slate-400 font-normal">| {edu.city}</span>}
                </div>
                {edu.description && (
                   <p className="text-[14px] leading-relaxed text-slate-700 mt-1.5">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Projects */}
      {projects.length > 0 && (
        <div style={{ marginBottom: sectionGap }}>
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-300 pb-2 mb-4" style={{ color: c, fontFamily: hf }}>
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map(proj => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <div className="font-bold text-slate-900 text-[15px]" style={{ fontFamily: hf }}>
                    {proj.title} {proj.link && <span className="text-[12px] font-normal text-slate-500 ml-2">({proj.link.replace('https://', '')})</span>}
                  </div>
                  <div className="text-[13px] font-semibold text-slate-500 whitespace-nowrap ml-4">
                    {proj.startDate} – {proj.endDate}
                  </div>
                </div>
                {proj.subtitle && (
                  <div className="text-[14px] font-medium text-[color:var(--c)]" style={{ '--c': c } as React.CSSProperties}>
                    {proj.subtitle}
                  </div>
                )}
                {proj.description && (
                  <p className="text-[14px] leading-relaxed text-slate-700 mt-1.5 whitespace-pre-wrap">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div style={{ marginBottom: sectionGap }}>
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-300 pb-2 mb-4" style={{ color: c, fontFamily: hf }}>
            Certifications
          </h2>
          <div className="space-y-3">
            {certifications.map(cert => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-slate-900 text-[14px]" style={{ fontFamily: hf }}>{cert.name}</span>
                  {cert.issuer && <span className="text-[14px] text-slate-600"> — {cert.issuer}</span>}
                </div>
                <div className="text-[13px] font-semibold text-slate-500 whitespace-nowrap ml-4">
                  {cert.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={{ marginBottom: sectionGap }}>
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-300 pb-2 mb-3" style={{ color: c, fontFamily: hf }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {skills.map((s, i) => (
              <div key={i} className="text-[14px] text-slate-800 font-medium flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c }}></div>
                {s}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Languages */}
      {languages.length > 0 && (
        <div style={{ marginBottom: sectionGap }}>
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-300 pb-2 mb-3" style={{ color: c, fontFamily: hf }}>
            Languages
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {languages.map((lang, i) => (
              <div key={i} className="text-[14px] text-slate-800 font-medium">
                {lang.name} <span className="text-slate-500 font-normal">({lang.proficiency})</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <CustomSectionsBlock data={data} />
    </div>
  );
};

export default Classic;
