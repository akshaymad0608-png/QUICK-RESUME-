import { FC } from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
}

const Executive: FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects = [], certifications = [], languages = [], design } = data;
  const c = design.color || '#000000';
  const spacingMap: Record<string, string> = { compact: '1rem', normal: '1.5rem', relaxed: '2rem' };
  const sectionGap = spacingMap[design.spacing] || '1.5rem';

  const hf = design.headingFont || design.fontFamily || 'Inter, sans-serif';
  const bf = design.bodyFont || design.fontFamily || 'Inter, sans-serif';

  return (
    <div className="w-full flex-1 flex flex-col bg-white p-12 lg:p-16 mx-auto" style={{ fontFamily: bf, fontSize: design.fontSize || '14px' , lineHeight: design.lineHeight || '1.6', color: '#111' }}>
      
      {/* Header */}
      <div className="flex flex-col items-center text-center border-b-2 border-indigo-600 pb-8" style={{ marginBottom: sectionGap }}>
        {personalInfo.photoUrl && data.design.showPhoto !== false && (
          <img src={personalInfo.photoUrl} alt="Profile" className="w-24 h-24 rounded-full object-cover mb-4 shadow-sm border border-gray-200" />
        )}
        <h1 className="text-4xl lg:text-5xl font-bold uppercase tracking-wider mb-2" style={{ fontFamily: hf }}>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.jobTitle && (
          <div className="text-lg lg:text-xl font-medium tracking-widest uppercase mb-4" style={{ fontFamily: hf, color: c }}>
            {personalInfo.jobTitle}
          </div>
        )}

        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm text-slate-800 font-medium">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.email && personalInfo.phone && <span className="text-slate-300">|</span>}
          {personalInfo.phone && <span>{personalInfo.phoneCode} {personalInfo.phone}</span>}
          {personalInfo.phone && personalInfo.city && <span className="text-slate-300">|</span>}
          {personalInfo.city && <span>{personalInfo.city}, {personalInfo.country}</span>}
          {personalInfo.city && personalInfo.linkedin && <span className="text-slate-300">|</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin.replace('https://', '')}</span>}
          {personalInfo.linkedin && personalInfo.website && <span className="text-slate-300">|</span>}
          {personalInfo.website && <span>{personalInfo.website.replace('https://', '')}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div style={{ marginBottom: sectionGap }}>
          <h2 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ fontFamily: hf, color: c }}>Professional Summary</h2>
          <p className="text-[14px] leading-relaxed text-slate-800 whitespace-pre-wrap text-justify">
            {summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={{ marginBottom: sectionGap }}>
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-indigo-600 pb-2 mb-4" style={{ fontFamily: hf, color: c }}>
            Professional Experience
          </h2>
          <div className="space-y-6">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <div className="font-bold text-indigo-600 text-[15px]">{exp.company} {exp.city && <span className="font-normal text-slate-600">, {exp.city}</span>}</div>
                  <div className="text-[13px] font-bold text-slate-600">
                    {exp.startDate} – {exp.isPresent ? 'Present' : exp.endDate}
                  </div>
                </div>
                <div className="text-[14px] font-medium text-slate-800 italic mb-2">
                  {exp.jobTitle}
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
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-indigo-600 pb-2 mb-4" style={{ fontFamily: hf, color: c }}>
            Education & Credentials
          </h2>
          <div className="space-y-4">
            {education.map(edu => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <div className="font-bold text-indigo-600 text-[15px]">{edu.schoolName} {edu.city && <span className="font-normal text-slate-600">, {edu.city}</span>}</div>
                  <div className="text-[13px] font-bold text-slate-600">
                    {edu.startYear} – {edu.endYear}
                  </div>
                </div>
                <div className="text-[14px] font-medium text-slate-800 italic mb-1">
                  {edu.degree} in {edu.fieldOfStudy}
                </div>
                {edu.description && (
                   <p className="text-[14px] leading-relaxed text-slate-700 mt-1.5 whitespace-pre-wrap">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div style={{ marginBottom: sectionGap }}>
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-indigo-600 pb-2 mb-4" style={{ fontFamily: hf, color: c }}>
            Notable Projects
          </h2>
          <div className="space-y-4">
            {projects.map(proj => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <div className="font-bold text-indigo-600 text-[15px]">
                    {proj.title}
                    {proj.link && <span className="text-[13px] font-normal text-slate-500 ml-2">({proj.link.replace('https://', '')})</span>}
                  </div>
                  <div className="text-[13px] font-bold text-slate-600">
                    {proj.startDate} – {proj.endDate}
                  </div>
                </div>
                {proj.subtitle && (
                  <div className="text-[14px] font-medium text-slate-800 italic mb-1">
                    {proj.subtitle}
                  </div>
                )}
                {proj.description && (
                  <div className="text-[14px] leading-relaxed text-slate-700 whitespace-pre-wrap">
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
        <div style={{ marginBottom: sectionGap }}>
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-indigo-600 pb-2 mb-4" style={{ fontFamily: hf, color: c }}>
            Certifications
          </h2>
          <div className="space-y-3">
            {certifications.map(cert => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-indigo-600 text-[15px]">{cert.name}</span>
                  {cert.issuer && <span className="text-[14px] text-slate-700 ml-1">— {cert.issuer}</span>}
                </div>
                <div className="text-[13px] font-bold text-slate-600 ml-4 whitespace-nowrap">
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
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-indigo-600 pb-2 mb-4" style={{ fontFamily: hf, color: c }}>
            Core Competencies
          </h2>
          <div className="flex flex-wrap gap-x-2 gap-y-2">
            {skills.map((s, i) => (
              <div key={i} className="text-[14px] text-slate-800 font-medium">
                {s}{i < skills.length - 1 && <span className="text-slate-400 mx-2">|</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div style={{ marginBottom: sectionGap }}>
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-indigo-600 pb-2 mb-4" style={{ fontFamily: hf, color: c }}>
            Languages
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {languages.map(lang => (
              <div key={lang.id} className="text-[14px] text-slate-800">
                <span className="font-bold">{lang.name}</span>
                <span className="text-slate-600 ml-1">({lang.proficiency})</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Executive;
