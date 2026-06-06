import { FC } from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
}

const Creative: FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, design } = data;
  const c = design.color;
  const hf = design.headingFont || design.fontFamily;
  const bf = design.bodyFont || design.fontFamily;

  return (
    <div className="flex flex-col w-full h-full bg-white text-gray-800" style={{ fontSize: design.fontSize, lineHeight: design.lineHeight }}>
      {/* Abstract Header Shape */}
      <div className="relative overflow-hidden" style={{ minHeight: '300px' }}>
        <div className="absolute inset-0" style={{ backgroundColor: c, opacity: 0.1 }}></div>
        <div className="absolute top-0 right-0 w-3/4 h-[400px] rounded-bl-full" style={{ backgroundColor: c, mixBlendMode: 'multiply' }}></div>
        
        <div className="relative z-10 px-12 pt-16 pb-12 text-white">
          <div className="w-[85%]">
            <h1 className="text-6xl font-black uppercase mb-4 tracking-tighter mix-blend-difference" style={{ fontFamily: hf }}>
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <h2 className="text-3xl font-light mb-8 opacity-90 mix-blend-difference" style={{ fontFamily: hf }}>
              {personalInfo.jobTitle}
            </h2>
          </div>
        </div>
      </div>

      <div className="flex px-12 -mt-12 relative z-20 gap-12 flex-1 pb-12">
        <div className="w-[38%] space-y-10">
           {/* Contact Card */}
           <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-2xl">
             <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-5">Details</h3>
             <div className="space-y-4 text-[14px]" style={{ fontFamily: bf }}>
               {personalInfo.email && <div><div className="text-gray-500 mb-1 text-[11px] uppercase tracking-wider font-bold">Email</div> {personalInfo.email}</div>}
               {personalInfo.phone && <div><div className="text-gray-500 mb-1 text-[11px] uppercase tracking-wider font-bold">Phone</div> {personalInfo.phoneCode} {personalInfo.phone}</div>}
               {personalInfo.city && <div><div className="text-gray-500 mb-1 text-[11px] uppercase tracking-wider font-bold">Location</div> {personalInfo.city}, {personalInfo.country}</div>}
               {personalInfo.linkedin && <div><div className="text-gray-500 mb-1 text-[11px] uppercase tracking-wider font-bold">LinkedIn</div> {personalInfo.linkedin}</div>}
               {personalInfo.website && <div><div className="text-gray-500 mb-1 text-[11px] uppercase tracking-wider font-bold">Portfolio / Web</div> {personalInfo.website}</div>}
             </div>
           </div>

           {skills.length > 0 && (
             <div className="p-4">
               <h3 className="text-lg font-black uppercase mb-5" style={{ fontFamily: hf, color: c }}>Capabilities</h3>
               <div className="flex flex-col gap-3">
                 {skills.map((s, i) => (
                   <div key={i}>
                     <div className="text-[13px] font-bold text-gray-700 uppercase tracking-wider mb-1" style={{ fontFamily: hf }}>{s}</div>
                     <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                       <div className="h-full rounded-full" style={{ backgroundColor: c, width: `${Math.max(60, 100 - i * 5)}%` }}></div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           )}
        </div>

        <div className="w-[62%] pt-16 space-y-12">
          {summary && (
            <section>
              <h3 className="text-xl font-black uppercase mb-4 tracking-wide" style={{ fontFamily: hf, color: c }}>About Me</h3>
              <p className="text-[15px] leading-[1.8] text-gray-600 font-medium" style={{ fontFamily: bf }}>{summary}</p>
            </section>
          )}

          {experience.length > 0 && (
             <section>
               <h3 className="text-xl font-black uppercase mb-6 tracking-wide" style={{ fontFamily: hf, color: c }}>Experience</h3>
               <div className="space-y-8">
                 {experience.map((exp) => (
                   <div key={exp.id}>
                     <div className="flex justify-between items-end mb-1">
                       <h4 className="font-bold text-[18px] text-gray-900 leading-none" style={{ fontFamily: hf }}>{exp.jobTitle}</h4>
                       <span className="text-[12px] font-bold text-gray-500 tracking-wider">
                         {exp.startDate} - {exp.isPresent ? 'Present' : exp.endDate}
                       </span>
                     </div>
                     <div className="text-[14px] font-bold uppercase tracking-widest mb-3" style={{ color: c }}>{exp.company}</div>
                     <p className="text-[14.5px] leading-relaxed text-gray-600" style={{ fontFamily: bf }}>
                       {exp.description}
                     </p>
                   </div>
                 ))}
               </div>
             </section>
          )}

          {education.length > 0 && (
             <section>
               <h3 className="text-xl font-black uppercase mb-6 tracking-wide" style={{ fontFamily: hf, color: c }}>Education</h3>
               <div className="space-y-6">
                 {education.map(edu => (
                   <div key={edu.id}>
                      <h4 className="font-bold text-[16px] text-gray-900 leading-none mb-1" style={{ fontFamily: hf }}>{edu.degree}</h4>
                      <div className="text-[14px] font-medium text-gray-700">{edu.schoolName} <span className="mx-2 text-gray-300">|</span> <span className="text-gray-500 text-[13px]">{edu.startYear} - {edu.endYear}</span></div>
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

export default Creative;
