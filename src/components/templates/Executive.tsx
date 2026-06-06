import { FC } from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
}

const Executive: FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, design } = data;
  const c = design.color || '#3b4db8';
  const spacingMap: Record<string, string> = { compact: '0.5rem', normal: '1rem', relaxed: '1.75rem' };
  const sectionGap = spacingMap[design.spacing] || '1rem';

  const hf = design.headingFont || design.fontFamily;
  const bf = design.bodyFont || design.fontFamily;

  return (
    <div className="w-full flex-1 flex bg-white" style={{ fontFamily: bf, fontSize: design.fontSize || '14px' , lineHeight: design.lineHeight || '1.5' }}>
      
      {/* Sidebar */}
      <div className="w-[35%] flex flex-col p-8 border-r" style={{ backgroundColor: c, color: 'white' }}>
         <div className="mt-4" style={{ marginBottom: sectionGap }}>
            {personalInfo.photoUrl && (
              <img src={personalInfo.photoUrl} alt="Profile" className="w-32 h-32 rounded-lg object-cover mb-6 shadow-md border border-white/20" />
            )}
            <h1 className="text-[32px] font-bold uppercase tracking-widest leading-tight mb-2">
              {personalInfo.firstName} <br/> {personalInfo.lastName}
            </h1>
            <div className="text-[14px] font-medium tracking-widest uppercase opacity-80">
              {personalInfo.jobTitle}
            </div>
         </div>

         {/* Contacts */}
         <div className="space-y-4 text-[12px] opacity-90" style={{ marginBottom: sectionGap }}>
            {personalInfo.email && <div>
                <div className="uppercase font-bold text-[10px] tracking-widest opacity-70 mb-1">Email</div>
                <div>{personalInfo.email}</div>
            </div>}
            {personalInfo.phone && <div>
                <div className="uppercase font-bold text-[10px] tracking-widest opacity-70 mb-1">Phone</div>
                <div>{personalInfo.phoneCode} {personalInfo.phone}</div>
            </div>}
            {(personalInfo.city || personalInfo.country) && <div>
                <div className="uppercase font-bold text-[10px] tracking-widest opacity-70 mb-1">Location</div>
                <div>{personalInfo.city}, {personalInfo.country}</div>
            </div>}
            {personalInfo.linkedin && <div>
                <div className="uppercase font-bold text-[10px] tracking-widest opacity-70 mb-1">LinkedIn</div>
                <div>{personalInfo.linkedin.replace('https://', '')}</div>
            </div>}
            {personalInfo.website && <div>
                <div className="uppercase font-bold text-[10px] tracking-widest opacity-70 mb-1">Website</div>
                <div>{personalInfo.website.replace('https://', '')}</div>
            </div>}
         </div>

         {/* Skills */}
         {skills.length > 0 && (
           <div style={{ marginBottom: sectionGap }}>
             <div className="uppercase font-bold text-[13px] tracking-widest mb-4 pb-2 border-b border-white/20">Skills</div>
             <div className="flex flex-col gap-2">
               {skills.map((s, i) => (
                 <div key={i} className="text-[12px] font-medium opacity-90">{s}</div>
               ))}
             </div>
           </div>
         )}
      </div>

      {/* Main Content */}
      <div className="w-[65%] p-10 flex flex-col text-gray-800">
          
          {/* Summary */}
          {summary && (
            <div style={{ marginBottom: sectionGap }}>
              <h2 className="text-[16px] font-bold uppercase tracking-widest border-b-2 pb-2 mb-4" style={{ fontFamily: hf,  borderColor: c, color: c }}>Professional Profile</h2>
              <p className="text-[13px] leading-relaxed text-gray-700 whitespace-pre-wrap">{summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div style={{ marginBottom: sectionGap }}>
              <h2 className="text-[16px] font-bold uppercase tracking-widest border-b-2 pb-2 mb-5" style={{ fontFamily: hf,  borderColor: c, color: c }}>Work Experience</h2>
              <div className="space-y-6">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <div className="font-bold text-gray-900 text-[15px]" style={{ fontFamily: hf }}>{exp.jobTitle}</div>
                      <div className="text-[12px] font-bold text-gray-500">
                        {exp.startDate} – {exp.isPresent ? 'Present' : exp.endDate}
                      </div>
                    </div>
                    <div className="text-[13px] font-bold text-gray-600 mb-2 italic">
                      {exp.company} {exp.city && `| ${exp.city}`}
                    </div>
                    <div className="text-[13px] leading-relaxed text-gray-700 whitespace-pre-wrap">
                      {exp.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mt-auto" style={{ marginBottom: sectionGap }}>
              <h2 className="text-[16px] font-bold uppercase tracking-widest border-b-2 pb-2 mb-5" style={{ fontFamily: hf,  borderColor: c, color: c }}>Education</h2>
              <div className="space-y-4">
                {education.map(edu => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <div className="font-bold text-gray-900 text-[15px]" style={{ fontFamily: hf }}>{edu.degree} in {edu.fieldOfStudy}</div>
                      <div className="text-[12px] font-bold text-gray-500">
                        {edu.startYear} – {edu.endYear}
                      </div>
                    </div>
                    <div className="text-[13px] text-gray-700 font-medium">
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

export default Executive;
