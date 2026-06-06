import { FC } from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
}

const Modern: FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, design } = data;
  const c = design.color || '#10b981';
  const spacingMap: Record<string, string> = { compact: '0.5rem', normal: '1rem', relaxed: '1.75rem' };
  const sectionGap = spacingMap[design.spacing] || '1rem';

  const hf = design.headingFont || design.fontFamily;
  const bf = design.bodyFont || design.fontFamily;

  return (
    <div className="w-full flex-1 bg-white flex flex-col" style={{ fontFamily: bf, fontSize: design.fontSize || '14px' , lineHeight: design.lineHeight || '1.5' }}>
      
      {/* Header */}
      <div className="w-full py-10 px-12 text-center text-white flex flex-col items-center" style={{ backgroundColor: c, marginBottom: sectionGap }}>
        {personalInfo.photoUrl && (
          <img src={personalInfo.photoUrl} alt="Profile" className="w-28 h-28 rounded-full object-cover mb-4 shadow-md border-2 border-white/20 bg-white/10 p-1" />
        )}
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 uppercase" style={{ fontFamily: hf }}>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="text-xl font-medium opacity-90 uppercase tracking-widest">
          {personalInfo.jobTitle}
        </div>
      </div>

      <div className="flex flex-1">
        {/* Left Column */}
        <div className="w-[35%] bg-gray-50 p-8 border-r border-gray-200">
          
          <div style={{ marginBottom: sectionGap }}>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-2" style={{ fontFamily: hf,  color: c, borderColor: c }}>Contact</h2>
            <div className="space-y-3 text-[13px] text-gray-600 font-medium break-all">
              {personalInfo.email && <div>{personalInfo.email}</div>}
              {personalInfo.phone && <div>{personalInfo.phoneCode} {personalInfo.phone}</div>}
              {personalInfo.city && <div>{personalInfo.city}, {personalInfo.country}</div>}
              {personalInfo.linkedin && <div>{personalInfo.linkedin.replace('https://', '')}</div>}
              {personalInfo.website && <div>{personalInfo.website.replace('https://', '')}</div>}
            </div>
          </div>

          {skills.length > 0 && (
            <div style={{ marginBottom: sectionGap }}>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-2" style={{ fontFamily: hf,  color: c, borderColor: c }}>Skills</h2>
              <div className="flex flex-col gap-2">
                {skills.map((s, i) => (
                  <div key={i} className="text-[13px] font-semibold text-gray-700 bg-white px-3 py-1.5 rounded border border-gray-200 shadow-sm">
                    {s}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="w-[65%] p-8 pt-10">
          {/* Summary */}
          {summary && (
            <div style={{ marginBottom: sectionGap }}>
               <p className="text-[14px] leading-relaxed text-gray-700">{summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div style={{ marginBottom: sectionGap }}>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-2" style={{ fontFamily: hf,  color: c, borderColor: c }}>Experience</h2>
              <div className="space-y-6">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <div className="font-bold text-gray-900 text-[15px]" style={{ fontFamily: hf }}>{exp.jobTitle}</div>
                      <div className="text-[12px] font-bold" style={{ color: c }}>
                        {exp.startDate} – {exp.isPresent ? 'Present' : exp.endDate}
                      </div>
                    </div>
                    <div className="text-[14px] font-semibold text-gray-600 mb-2">
                      {exp.company} {exp.city ? `, ${exp.city}` : ''}
                    </div>
                    <div className="text-[13px] leading-relaxed text-gray-600 whitespace-pre-wrap">
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
               <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-2" style={{ fontFamily: hf,  color: c, borderColor: c }}>Education</h2>
               <div className="space-y-4">
                {education.map(edu => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <div className="font-bold text-gray-900 text-[15px]" style={{ fontFamily: hf }}>{edu.degree}</div>
                      <div className="text-[12px] font-bold" style={{ color: c }}>
                        {edu.startYear} – {edu.endYear}
                      </div>
                    </div>
                    <div className="text-[14px] text-gray-700 font-semibold mb-1">{edu.fieldOfStudy}</div>
                    <div className="text-[13px] text-gray-500">{edu.schoolName}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Modern;
