import { FC } from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
}

const TwoColumn: FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, design } = data;
  const c = design.color;
  const hf = design.headingFont || design.fontFamily;
  const bf = design.bodyFont || design.fontFamily;

  return (
    <div className="flex w-full flex-col h-full bg-white text-gray-900 overflow-hidden" style={{ fontSize: design.fontSize, lineHeight: design.lineHeight }}>
      {/* Header */}
      <header className="p-8 pb-6 flex justify-between items-end border-b-[6px]" style={{ borderColor: c }}>
        <div>
          <h1 className="text-4xl font-extrabold uppercase tracking-tight" style={{ fontFamily: hf, color: c }}>
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <h2 className="text-xl mt-2 font-medium bg-gray-100 inline-block px-3 py-1 rounded" style={{ fontFamily: hf, color: c }}>
            {personalInfo.jobTitle}
          </h2>
        </div>
        <div className="text-right text-sm space-y-1 font-medium text-gray-600" style={{ fontFamily: bf }}>
          {personalInfo.phone && <div>{personalInfo.phoneCode} {personalInfo.phone}</div>}
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.city && <div>{personalInfo.city}, {personalInfo.country}</div>}
          {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Left Col */}
        <div className="w-1/3 bg-gray-50 p-8 border-r border-gray-200 shadow-inner space-y-8">
          {skills.length > 0 && (
            <section>
              <h3 className="text-lg font-bold uppercase tracking-widest mb-4 pb-2 border-b-2" style={{ fontFamily: hf, borderColor: c, color: c }}>Skills</h3>
              <ul className="space-y-3">
                {skills.map((s, i) => (
                  <li key={i} className="flex items-center gap-2 text-[14px]">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c }}></div>
                    <span style={{ fontFamily: bf }} className="font-semibold text-gray-700">{s}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h3 className="text-lg font-bold uppercase tracking-widest mb-4 pb-2 border-b-2" style={{ fontFamily: hf, borderColor: c, color: c }}>Education</h3>
              <div className="space-y-4">
                {education.map(edu => (
                  <div key={edu.id}>
                    <div className="font-bold text-[14px] text-gray-900">{edu.degree}</div>
                    <div className="text-[13px] text-gray-700 font-medium mb-1">{edu.schoolName}</div>
                    <div className="text-[12px] font-bold" style={{ color: c }}>{edu.startYear} - {edu.endYear}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Col */}
        <div className="w-2/3 p-8 space-y-8 bg-white">
          {summary && (
            <section>
              <h3 className="text-xl font-bold uppercase tracking-widest mb-4" style={{ fontFamily: hf, color: c }}>Summary</h3>
              <p className="text-[14px] text-gray-700 leading-relaxed font-medium" style={{ fontFamily: bf }}>{summary}</p>
            </section>
          )}

          {experience.length > 0 && (
             <section>
               <h3 className="text-xl font-bold uppercase tracking-widest mb-6" style={{ fontFamily: hf, color: c }}>Experience</h3>
               <div className="space-y-6">
                 {experience.map((exp, i) => (
                   <div key={exp.id} className="relative">
                     {/* Timeline Decor */}
                     <div className="absolute left-[-32px] top-[6px] w-3 h-3 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: c }}></div>
                     {i !== experience.length - 1 && <div className="absolute left-[-27px] top-[18px] w-0.5 h-[calc(100%+12px)] bg-gray-200"></div>}
                     
                     <div className="flex justify-between items-baseline mb-1">
                       <h4 className="font-bold text-[16px] text-gray-900" style={{ fontFamily: hf }}>{exp.jobTitle}</h4>
                       <span className="text-[13px] font-bold bg-gray-100 px-2 py-0.5 rounded" style={{ color: c }}>
                         {exp.startDate} - {exp.isPresent ? 'Present' : exp.endDate}
                       </span>
                     </div>
                     <div className="text-[14px] font-semibold text-gray-700 mb-2">{exp.company}</div>
                     <p className="text-[14px] leading-relaxed text-gray-600 whitespace-pre-wrap" style={{ fontFamily: bf }}>
                       {exp.description}
                     </p>
                   </div>
                 ))}
               </div>
             </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default TwoColumn;
