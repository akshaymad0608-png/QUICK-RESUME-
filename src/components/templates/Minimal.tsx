import { FC } from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
}

const Minimal: FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects = [], certifications = [], languages = [], design } = data;
  const c = design.color || '#000000';
  const spacingMap: Record<string, string> = { compact: '1rem', normal: '1.5rem', relaxed: '2.5rem' };
  const sectionGap = spacingMap[design.spacing] || '1.5rem';

  const hf = design.headingFont || design.fontFamily || 'Inter, sans-serif';
  const bf = design.bodyFont || design.fontFamily || 'Inter, sans-serif';

  return (
    <div className="w-full flex-1 bg-white p-12 lg:p-16 flex flex-col mx-auto" style={{ fontFamily: bf, fontSize: design.fontSize || '14px' , lineHeight: design.lineHeight || '1.6', color: '#111' }}>
      
      {/* Header */}
      <div className="flex justify-between items-start gap-8" style={{ marginBottom: sectionGap }}>
        <div className="max-w-[70%] flex items-center gap-6">
          {personalInfo.photoUrl && data.design.showPhoto !== false && (
            <img src={personalInfo.photoUrl} alt="Profile" className="w-20 h-20 rounded-full object-cover shrink-0" />
          )}
          <div>
            <h1 className="text-4xl lg:text-5xl font-light tracking-tight text-indigo-600 mb-1" style={{ fontFamily: hf }}>
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <div className="text-lg text-slate-500 font-medium tracking-wide">
              {personalInfo.jobTitle}
            </div>
          </div>
        </div>
        <div className="text-right text-xs lg:text-sm text-slate-500 space-y-1">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phoneCode} {personalInfo.phone}</div>}
          {personalInfo.city && <div>{personalInfo.city}, {personalInfo.country}</div>}
          {personalInfo.linkedin && <div>{personalInfo.linkedin.replace('https://', '')}</div>}
          {personalInfo.website && <div>{personalInfo.website.replace('https://', '')}</div>}
        </div>
      </div>

      <div className="w-full h-px bg-slate-200 mb-8"></div>

      {/* Summary */}
      {summary && (
        <div className="grid grid-cols-12 gap-6" style={{ marginBottom: sectionGap }}>
          <div className="col-span-3">
             <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400" style={{ fontFamily: hf, color: c }}>Profile</h2>
          </div>
          <div className="col-span-9">
             <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">{summary}</p>
          </div>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="grid grid-cols-12 gap-6" style={{ marginBottom: sectionGap }}>
          <div className="col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400" style={{ fontFamily: hf, color: c }}>Experience</h2>
          </div>
          
          <div className="col-span-9 space-y-8">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <div className="font-bold text-indigo-600 text-[15px]">{exp.jobTitle}</div>
                  <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    {exp.startDate} — {exp.isPresent ? 'Present' : exp.endDate}
                  </div>
                </div>
                <div className="text-sm font-medium text-slate-600 mb-3">
                  {exp.company} {exp.city ? `• ${exp.city}` : ''}
                </div>
                <div className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="grid grid-cols-12 gap-6" style={{ marginBottom: sectionGap }}>
          <div className="col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400" style={{ fontFamily: hf, color: c }}>Education</h2>
          </div>
          <div className="col-span-9 space-y-6">
            {education.map(edu => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                   <div className="font-bold text-indigo-600 text-[15px]">{edu.degree} in {edu.fieldOfStudy}</div>
                   <div className="text-sm text-slate-600 font-medium mt-0.5">{edu.schoolName}</div>
                   {edu.description && <div className="text-sm text-slate-700 mt-2 whitespace-pre-wrap">{edu.description}</div>}
                </div>
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider text-right shrink-0 ml-4">
                  {edu.startYear} — {edu.endYear}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="grid grid-cols-12 gap-6" style={{ marginBottom: sectionGap }}>
          <div className="col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400" style={{ fontFamily: hf, color: c }}>Projects</h2>
          </div>
          <div className="col-span-9 space-y-8">
            {projects.map(proj => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <div className="font-bold text-indigo-600 text-[15px]">
                    {proj.title}
                    {proj.link && <span className="text-sm font-normal text-slate-400 ml-2">({proj.link.replace('https://', '')})</span>}
                  </div>
                  <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    {proj.startDate} — {proj.endDate}
                  </div>
                </div>
                {proj.subtitle && (
                  <div className="text-sm font-medium text-slate-600 mb-2">
                    {proj.subtitle}
                  </div>
                )}
                {proj.description && (
                  <div className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
                    {proj.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="grid grid-cols-12 gap-6" style={{ marginBottom: sectionGap }}>
          <div className="col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400" style={{ fontFamily: hf, color: c }}>Certifications</h2>
          </div>
          <div className="col-span-9 space-y-4">
            {certifications.map(cert => (
              <div key={cert.id} className="flex justify-between items-start">
                <div>
                   <div className="font-bold text-indigo-600 text-[14px]">{cert.name}</div>
                   {cert.issuer && <div className="text-sm text-slate-600 font-medium">{cert.issuer}</div>}
                </div>
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider text-right shrink-0 ml-4">
                  {cert.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="grid grid-cols-12 gap-6" style={{ marginBottom: sectionGap }}>
          <div className="col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400" style={{ fontFamily: hf, color: c }}>Skills</h2>
          </div>
          <div className="col-span-9">
            <p className="text-sm leading-relaxed text-slate-700 font-medium">
              {skills.join(' • ')}
            </p>
          </div>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div className="grid grid-cols-12 gap-6" style={{ marginBottom: sectionGap }}>
          <div className="col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400" style={{ fontFamily: hf, color: c }}>Languages</h2>
          </div>
          <div className="col-span-9 flex flex-wrap gap-x-6 gap-y-2">
            {languages.map(lang => (
              <div key={lang.id} className="text-sm">
                <span className="font-bold text-indigo-600">{lang.name}</span>
                <span className="text-slate-500 ml-1">({lang.proficiency})</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Minimal;
