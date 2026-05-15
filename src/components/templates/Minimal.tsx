import { FC } from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
}

const Minimal: FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, design } = data;
  const spacingMap: Record<string, string> = { compact: '0.5rem', normal: '1rem', relaxed: '1.75rem' };
  const sectionGap = spacingMap[design.spacing] || '1rem';

  return (
    <div className="w-full flex-1 bg-white p-12 flex flex-col mx-auto" style={{ fontFamily: design.fontFamily, fontSize: design.fontSize || '14px' }}>
      
      {/* Header */}
      <div className="flex gap-6 items-center" style={{ marginBottom: sectionGap }}>
        {personalInfo.photoUrl && (
          <img src={personalInfo.photoUrl} alt="Profile" className="w-24 h-24 rounded-full object-cover border border-gray-200 shrink-0" />
        )}
        <div>
          <h1 className="text-[42px] font-medium leading-none text-black mb-1">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <div className="text-[18px] text-gray-600 font-medium mb-4">
            {personalInfo.jobTitle}
          </div>
          
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-gray-500">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phoneCode} {personalInfo.phone}</span>}
            {personalInfo.city && <span>{personalInfo.city}, {personalInfo.country}</span>}
            {personalInfo.linkedin && <span>{personalInfo.linkedin.replace('https://', '')}</span>}
            {personalInfo.website && <span>{personalInfo.website.replace('https://', '')}</span>}
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-black mb-6"></div>

      {/* Summary */}
      {summary && (
        <div style={{ marginBottom: sectionGap }}>
            <p className="text-[13px] leading-relaxed text-black whitespace-pre-wrap">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={{ marginBottom: sectionGap }}>
          <h2 className="text-[14px] font-bold uppercase tracking-wider text-black mb-4">Experience</h2>
          
          <div className="space-y-6">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <div className="font-semibold text-black text-[14px]">{exp.company}</div>
                  <div className="text-[12px] text-gray-600">
                    {exp.startDate} — {exp.isPresent ? 'Present' : exp.endDate}
                  </div>
                </div>
                <div className="text-[13px] italic text-gray-700 mb-2">
                  {exp.jobTitle} {exp.city ? `• ${exp.city}` : ''}
                </div>
                <div className="text-[13px] leading-relaxed text-gray-800 whitespace-pre-wrap pl-4">
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
          <h2 className="text-[14px] font-bold uppercase tracking-wider text-black mb-4">Education</h2>
          <div className="space-y-4">
            {education.map(edu => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                   <div className="font-semibold text-black text-[14px]">{edu.schoolName}</div>
                   <div className="text-[13px] text-gray-800">{edu.degree}, {edu.fieldOfStudy}</div>
                </div>
                <div className="text-[12px] text-gray-600 text-right">
                  {edu.startYear} — {edu.endYear}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={{ marginBottom: sectionGap }}>
          <h2 className="text-[14px] font-bold uppercase tracking-wider text-black mb-3">Skills</h2>
          <p className="text-[13px] leading-relaxed text-gray-800">
            {skills.join(', ')}
          </p>
        </div>
      )}

    </div>
  );
};

export default Minimal;
