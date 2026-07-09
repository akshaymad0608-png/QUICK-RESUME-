import { FC } from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Linkedin, Globe } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const Modern: FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects = [], certifications = [], languages = [], design } = data;
  const c = design.color || '#000000';
  const spacingMap: Record<string, string> = { compact: '1rem', normal: '1.5rem', relaxed: '2rem' };
  const sectionGap = spacingMap[design.spacing] || '1.5rem';

  const hf = design.headingFont || design.fontFamily || 'Inter, sans-serif';
  const bf = design.bodyFont || design.fontFamily || 'Inter, sans-serif';

  return (
    <div className="w-full flex-1 bg-white flex flex-col relative" style={{ fontFamily: bf, fontSize: design.fontSize || '14px' , lineHeight: design.lineHeight || '1.6', color: '#1E293B' }}>
      
      {/* Top Accent Border */}
      <div className="h-4 w-full absolute top-0 left-0" style={{ backgroundColor: c }}></div>

      <div className="px-10 lg:px-14 pt-16 pb-12 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-end border-b-2 pb-6" style={{ borderColor: c, marginBottom: sectionGap }}>
          <div className="max-w-2xl">
            <h1 className="text-5xl font-black tracking-tighter mb-2" style={{ fontFamily: hf, color: c }}>
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <div className="text-xl font-medium text-slate-500 uppercase tracking-widest" style={{ fontFamily: hf }}>
              {personalInfo.jobTitle}
            </div>
          </div>
          
          {personalInfo.photoUrl && data.design.showPhoto !== false && (
            <img src={personalInfo.photoUrl} alt="Profile" className="w-24 h-24 rounded-lg object-cover shadow-sm border border-slate-200 ml-4" />
          )}
        </div>

        <div className="flex flex-1 gap-12">
          {/* Left Column - Main Content */}
          <div className="w-[65%]">
            {/* Summary */}
            {summary && (
              <div style={{ marginBottom: sectionGap }}>
                 <p className="text-[14px] leading-relaxed text-slate-700 whitespace-pre-wrap">{summary}</p>
              </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <div style={{ marginBottom: sectionGap }}>
                <h2 className="text-lg font-black uppercase tracking-widest mb-4 flex items-center gap-4" style={{ fontFamily: hf, color: c }}>
                  Experience
                  <div className="h-px bg-slate-200 flex-1"></div>
                </h2>
                <div className="space-y-6">
                  {experience.map(exp => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <div className="font-bold text-slate-900 text-[16px]" style={{ fontFamily: hf }}>{exp.jobTitle}</div>
                        <div className="text-[13px] font-bold text-slate-500 whitespace-nowrap">
                          {exp.startDate} – {exp.isPresent ? 'Present' : exp.endDate}
                        </div>
                      </div>
                      <div className="text-[14px] font-bold text-slate-700 mb-2">
                        {exp.company} {exp.city ? <span className="font-normal text-slate-500">| {exp.city}</span> : ''}
                      </div>
                      <div className="text-[14px] leading-relaxed text-slate-600 whitespace-pre-wrap">
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
                 <h2 className="text-lg font-black uppercase tracking-widest mb-4 flex items-center gap-4" style={{ fontFamily: hf, color: c }}>
                   Education
                   <div className="h-px bg-slate-200 flex-1"></div>
                 </h2>
                 <div className="space-y-4">
                  {education.map(edu => (
                    <div key={edu.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <div className="font-bold text-slate-900 text-[15px]" style={{ fontFamily: hf }}>{edu.degree} in {edu.fieldOfStudy}</div>
                        <div className="text-[13px] font-bold text-slate-500 whitespace-nowrap">
                          {edu.startYear} – {edu.endYear}
                        </div>
                      </div>
                      <div className="text-[14px] text-slate-700 font-bold mb-1">{edu.schoolName} {edu.city ? <span className="font-normal text-slate-500">| {edu.city}</span> : ''}</div>
                      {edu.description && (
                        <p className="text-[14px] leading-relaxed text-slate-600 mt-1">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div style={{ marginBottom: sectionGap }}>
                <h2 className="text-lg font-black uppercase tracking-widest mb-4 flex items-center gap-4" style={{ fontFamily: hf, color: c }}>
                  Projects
                  <div className="h-px bg-slate-200 flex-1"></div>
                </h2>
                <div className="space-y-5">
                  {projects.map(proj => (
                    <div key={proj.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <div className="font-bold text-slate-900 text-[15px]" style={{ fontFamily: hf }}>
                          {proj.title} {proj.link && <span className="text-[12px] font-normal text-slate-500 ml-2">({proj.link.replace('https://', '')})</span>}
                        </div>
                        <div className="text-[13px] font-bold text-slate-500 whitespace-nowrap">
                          {proj.startDate} – {proj.endDate}
                        </div>
                      </div>
                      {proj.subtitle && (
                        <div className="text-[14px] font-bold text-slate-700 mb-2">
                          {proj.subtitle}
                        </div>
                      )}
                      {proj.description && (
                        <div className="text-[14px] leading-relaxed text-slate-600 whitespace-pre-wrap">
                          {proj.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar info */}
          <div className="w-[35%] flex flex-col gap-8">
            <div>
              <h2 className="text-sm font-black uppercase tracking-widest mb-4" style={{ fontFamily: hf, color: c }}>Details</h2>
              <div className="space-y-3 text-[14px] text-slate-600 font-medium break-all">
                {personalInfo.email && <div className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5 shrink-0" style={{color: c}}/><span>{personalInfo.email}</span></div>}
                {personalInfo.phone && <div className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 shrink-0" style={{color: c}}/><span>{personalInfo.phoneCode} {personalInfo.phone}</span></div>}
                {personalInfo.city && <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{color: c}}/><span>{personalInfo.city}, {personalInfo.country}</span></div>}
                {personalInfo.linkedin && <div className="flex items-start gap-2"><Linkedin className="w-4 h-4 mt-0.5 shrink-0" style={{color: c}}/><span>{personalInfo.linkedin.replace('https://', '')}</span></div>}
                {personalInfo.website && <div className="flex items-start gap-2"><Globe className="w-4 h-4 mt-0.5 shrink-0" style={{color: c}}/><span>{personalInfo.website.replace('https://', '')}</span></div>}
              </div>
            </div>

            {skills.length > 0 && (
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest mb-4" style={{ fontFamily: hf, color: c }}>Skills</h2>
                <div className="flex flex-col gap-2">
                  {skills.map((s, i) => (
                    <div key={i} className="text-[14px] font-bold text-slate-700 pb-2 border-b border-slate-100 last:border-0">
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {certifications.length > 0 && (
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest mb-4" style={{ fontFamily: hf, color: c }}>Certifications</h2>
                <div className="flex flex-col gap-3">
                  {certifications.map(cert => (
                    <div key={cert.id} className="pb-3 border-b border-slate-100 last:border-0">
                      <div className="text-[14px] font-bold text-slate-700">{cert.name}</div>
                      {cert.issuer && <div className="text-[13px] text-slate-500 mt-0.5">{cert.issuer}</div>}
                      <div className="text-[12px] font-medium text-slate-400 mt-1">{cert.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {languages.length > 0 && (
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest mb-4" style={{ fontFamily: hf, color: c }}>Languages</h2>
                <div className="flex flex-col gap-2">
                  {languages.map(lang => (
                    <div key={lang.id} className="text-[14px] text-slate-700 flex justify-between items-center pb-2 border-b border-slate-100 last:border-0">
                      <span className="font-bold">{lang.name}</span>
                      <span className="text-[12px] text-slate-500">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modern;
