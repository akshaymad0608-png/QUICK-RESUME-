import { FC } from 'react';
import { ResumeData } from '../../types';
import { MapPin, Phone, Mail, Linkedin } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const Timeline: FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, design } = data;
  const c = design.color;
  const hf = design.headingFont || design.fontFamily;
  const bf = design.bodyFont || design.fontFamily;

  return (
    <div className="flex w-full h-full flex-col bg-[#f8fafc] text-gray-800" style={{ fontSize: design.fontSize, lineHeight: design.lineHeight }}>
      <header className="p-10 bg-white shadow-sm flex justify-between items-center z-10 border-t-8" style={{ borderColor: c }}>
        <div>
           <h1 className="text-4xl font-black uppercase tracking-tight mb-2 text-gray-900" style={{ fontFamily: hf }}>
             {personalInfo.firstName} {personalInfo.lastName}
           </h1>
           <h2 className="text-xl font-medium tracking-widest text-gray-500" style={{ fontFamily: hf }}>
             {personalInfo.jobTitle}
           </h2>
        </div>
        
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[13px] font-medium text-gray-600" style={{ fontFamily: bf }}>
            {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={14} style={{color: c}}/> {personalInfo.phoneCode} {personalInfo.phone}</div>}
            {personalInfo.email && <div className="flex items-center gap-2"><Mail size={14} style={{color: c}}/> {personalInfo.email}</div>}
            {personalInfo.city && <div className="flex items-center gap-2"><MapPin size={14} style={{color: c}}/> {personalInfo.city}, {personalInfo.country}</div>}
            {personalInfo.linkedin && <div className="flex items-center gap-2"><Linkedin size={14} style={{color: c}}/> {personalInfo.linkedin}</div>}
        </div>
      </header>

      <div className="flex flex-1 p-10 gap-10">
        <div className="w-[65%] space-y-10">
           {summary && (
             <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
               <h3 className="text-lg font-black uppercase mb-4 tracking-wider flex items-center gap-3" style={{ fontFamily: hf, color: c }}>
                 <span className="w-8 h-px bg-current"></span> Profile
               </h3>
               <p className="text-[14.5px] leading-relaxed text-gray-700 font-medium" style={{ fontFamily: bf }}>{summary}</p>
             </section>
           )}

           {experience.length > 0 && (
             <section>
               <h3 className="text-lg font-black uppercase mb-6 tracking-wider flex items-center gap-3" style={{ fontFamily: hf, color: c }}>
                 <span className="w-8 h-px bg-current"></span> Work Experience
               </h3>
               <div className="space-y-0 pl-4 border-l-4 ml-2" style={{ borderColor: c }}>
                 {experience.map((exp) => (
                   <div key={exp.id} className="relative pl-6 pb-8 last:pb-0">
                     <div className="absolute left-[-11px] top-0 w-4 h-4 rounded-full border-[3px] border-[#f8fafc]" style={{ backgroundColor: c }}></div>
                     <div className="bg-white p-6 md:p-7 rounded-xl shadow-sm border border-gray-100 mt-[-6px]">
                       <div className="flex justify-between items-center mb-2">
                         <h4 className="font-bold text-[16px] text-gray-900" style={{ fontFamily: hf }}>{exp.jobTitle}</h4>
                         <span className="text-[12px] font-bold tracking-wider text-gray-500 uppercase bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200">
                           {exp.startDate} - {exp.isPresent ? 'Present' : exp.endDate}
                         </span>
                       </div>
                       <div className="text-[14px] font-bold mb-3" style={{ color: c }}>{exp.company}</div>
                       <p className="text-[14px] leading-relaxed text-gray-600 border-t border-gray-50 pt-3" style={{ fontFamily: bf }}>
                         {exp.description}
                       </p>
                     </div>
                   </div>
                 ))}
               </div>
             </section>
           )}
        </div>

        <div className="w-[35%] space-y-10">
           {education.length > 0 && (
             <section>
               <h3 className="text-lg font-black uppercase mb-6 tracking-wider flex items-center gap-3" style={{ fontFamily: hf, color: c }}>
                 <span className="w-6 h-px bg-current"></span> Education
               </h3>
               <div className="space-y-4 pl-4 border-l-4 ml-2 border-gray-200">
                  {education.map(edu => (
                    <div key={edu.id} className="relative pl-6 pb-4">
                      <div className="absolute left-[-9px] top-0 w-3 h-3 rounded-full bg-gray-300"></div>
                      <div className="font-bold text-[14px] text-gray-900" style={{ fontFamily: hf }}>{edu.degree}</div>
                      <div className="text-[13px] text-gray-700 my-1 font-medium">{edu.schoolName}</div>
                      <div className="text-[12px] font-bold text-gray-500">{edu.startYear} - {edu.endYear}</div>
                      <p className="text-[13px] text-gray-600 mt-2 line-clamp-3">{edu.description}</p>
                    </div>
                  ))}
               </div>
             </section>
           )}

           {skills.length > 0 && (
             <section>
               <h3 className="text-lg font-black uppercase mb-6 tracking-wider flex items-center gap-3" style={{ fontFamily: hf, color: c }}>
                 <span className="w-6 h-px bg-current"></span> Skills
               </h3>
               <div className="flex flex-wrap gap-2.5">
                  {skills.map((s, i) => (
                    <span key={i} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[13.5px] font-semibold text-gray-700 shadow-sm" style={{ fontFamily: bf }}>
                      {s}
                    </span>
                  ))}
               </div>
             </section>
           )}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
