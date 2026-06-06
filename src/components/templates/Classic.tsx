import { FC } from 'react';
import { ResumeData } from '../../types';
import { Phone, Mail, MapPin, Linkedin, Globe } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const Classic: FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, design } = data;
  const c = design.color;
  const spacingMap: Record<string, string> = { compact: '0.5rem', normal: '1rem', relaxed: '1.75rem' };
  const sectionGap = spacingMap[design.spacing] || '1rem';

  const hf = design.headingFont || design.fontFamily;
  const bf = design.bodyFont || design.fontFamily;

  return (
    <div className="w-full flex-1 flex h-full" style={{ fontFamily: bf, color: '#333', fontSize: design.fontSize || '14px', lineHeight: design.lineHeight || '1.5' }}>
      
      {/* Sidebar */}
      <div className="w-1/3 bg-gray-50 flex flex-col p-8 border-r border-gray-200 h-full" style={{ backgroundColor: '#f8fafc' }}>
         <div className="text-center flex flex-col items-center" style={{ marginBottom: sectionGap }}>
            {personalInfo.photoUrl && (
              <img src={personalInfo.photoUrl} alt="Profile" className="w-32 h-32 rounded-full object-cover mb-4 border-4" style={{ borderColor: c }} />
            )}
            <h1 className="text-3xl font-bold uppercase tracking-wider mb-2 text-gray-900 text-left w-full" style={{ color: c, fontFamily: hf }}>
              {personalInfo.firstName} <br/> {personalInfo.lastName}
            </h1>
            <div className="text-lg font-medium text-gray-600 tracking-wide uppercase text-left w-full" style={{ fontFamily: hf }}>
              {personalInfo.jobTitle}
            </div>
         </div>

         {/* Contacts */}
         <div className="space-y-3 test-sm text-gray-600" style={{ marginBottom: sectionGap, fontFamily: bf }}>
            {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={14}/> {personalInfo.phoneCode} {personalInfo.phone}</div>}
            {personalInfo.email && <div className="flex items-center gap-2 break-all"><Mail size={14}/> {personalInfo.email}</div>}
            {personalInfo.city && <div className="flex items-center gap-2"><MapPin size={14}/> {personalInfo.city}, {personalInfo.country}</div>}
            {personalInfo.linkedin && <div className="flex items-center gap-2 break-all"><Linkedin size={14}/> {personalInfo.linkedin.replace('https://', '')}</div>}
            {personalInfo.website && <div className="flex items-center gap-2 break-all"><Globe size={14}/> {personalInfo.website.replace('https://', '')}</div>}
         </div>

         {/* Skills */}
         {skills.length > 0 && (
           <div style={{ marginBottom: sectionGap }}>
              <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 pb-2 mb-4" style={{ borderColor: c, color: c, fontFamily: hf }}>Skills</h2>
             <ul className="space-y-2">
               {skills.map((s, i) => (
                 <li key={i} className="text-sm text-gray-700 font-medium">• {s}</li>
               ))}
             </ul>
           </div>
         )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8 bg-white">
          
          {/* Summary */}
          {summary && (
            <div style={{ marginBottom: sectionGap }}>
              <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 pb-2 mb-4" style={{ borderColor: c, color: c, fontFamily: hf }}>Profile</h2>
              <p className="text-[13px] leading-relaxed text-gray-700 whitespace-pre-wrap">{summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div style={{ marginBottom: sectionGap }}>
              <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 pb-2 mb-4" style={{ borderColor: c, color: c, fontFamily: hf }}>Experience</h2>
              <div className="space-y-6">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <div className="font-bold text-gray-900 text-[15px]" style={{ fontFamily: hf }}>{exp.jobTitle}</div>
                      <div className="text-[12px] font-semibold text-[color:var(--c)]" style={{ '--c': c } as React.CSSProperties}>
                        {exp.startDate} – {exp.isPresent ? 'Present' : exp.endDate}
                      </div>
                    </div>
                    <div className="text-[13px] font-medium text-gray-700 mb-2">
                      {exp.company} {exp.city && `| ${exp.city}`}
                    </div>
                    <div className="text-[13px] leading-relaxed text-gray-600 whitespace-pre-wrap pl-3 border-l-2 border-gray-200">
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
              <h2 className="text-sm font-bold uppercase tracking-widest border-b-2 pb-2 mb-4" style={{ borderColor: c, color: c, fontFamily: hf }}>Education</h2>
              <div className="space-y-4">
                {education.map(edu => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <div className="font-bold text-gray-900 text-[14px]" style={{ fontFamily: hf }}>{edu.degree} in {edu.fieldOfStudy}</div>
                      <div className="text-[12px] font-semibold text-[color:var(--c)]" style={{ '--c': c } as React.CSSProperties}>
                        {edu.startYear} – {edu.endYear}
                      </div>
                    </div>
                    <div className="text-[13px] text-gray-700">
                      {edu.schoolName} {edu.city && `| ${edu.city}`}
                    </div>
                    {edu.description && (
                       <p className="text-[13px] leading-relaxed text-gray-600 mt-1">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>

    </div>
  );
};

export default Classic;
