import { FC } from 'react';
import { ResumeData } from '../../types';
import CustomSectionsBlock from './CustomSectionsBlock';

interface TemplateProps {
  data: ResumeData;
}

const Sidebar: FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects = [], certifications = [], languages = [], design } = data;
  const c = design.color;
  const hf = design.headingFont || design.fontFamily;
  const bf = design.bodyFont || design.fontFamily;

  return (
    <div className="flex w-full h-full text-gray-900 bg-white" style={{ fontSize: design.fontSize, lineHeight: design.lineHeight }}>
      {/* Sidebar */}
      <div className="w-[35%] p-10 text-white flex flex-col justify-between" style={{ backgroundColor: c }}>
        <div>
          {personalInfo.photoUrl && data.design.showPhoto !== false && (
            <div className="mb-8 flex justify-center">
              <img src={personalInfo.photoUrl} alt="Profile" className="w-32 h-32 rounded-full border-4 border-white/30 object-cover" />
            </div>
          )}
          <h1 className="text-4xl font-bold uppercase leading-[1.1] mb-2" style={{ fontFamily: hf }}>
            {personalInfo.firstName} <br/> {personalInfo.lastName}
          </h1>
          <h2 className="text-lg font-medium opacity-90 mb-10 tracking-wide" style={{ fontFamily: hf }}>
            {personalInfo.jobTitle}
          </h2>

          <h3 className="text-sm font-bold uppercase tracking-widest border-b border-white/30 pb-2 mb-4">Contact</h3>
          <div className="space-y-3 opacity-90 text-[14px]" style={{ fontFamily: bf }}>
             {personalInfo.phone && <div>{personalInfo.phoneCode} {personalInfo.phone}</div>}
             {personalInfo.email && <div className="break-all">{personalInfo.email}</div>}
             {personalInfo.city && <div>{personalInfo.city}, {personalInfo.country}</div>}
             {personalInfo.linkedin && <div className="break-all">{personalInfo.linkedin}</div>}
          </div>
        </div>

        {skills.length > 0 && (
          <div className="mt-12">
            <h3 className="text-sm font-bold uppercase tracking-widest border-b border-white/30 pb-2 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <span key={i} className="bg-white/10 px-3 py-1 text-[13px] rounded-full backdrop-blur-sm border border-white/30">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-bold uppercase tracking-widest border-b border-white/30 pb-2 mb-4">Certifications</h3>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert.id} className="text-[13px]">
                  <div className="font-bold">{cert.name}</div>
                  {cert.issuer && <div className="opacity-90 text-[12px]">{cert.issuer}</div>}
                  <div className="opacity-75 text-[11px] mt-0.5">{cert.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-bold uppercase tracking-widest border-b border-white/30 pb-2 mb-4">Languages</h3>
            <div className="space-y-2">
              {languages.map((lang) => (
                <div key={lang.id} className="flex justify-between items-center text-[13px]">
                  <span className="font-bold">{lang.name}</span>
                  <span className="opacity-75 text-[12px]">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-[65%] p-12 space-y-10">
         {summary && (
            <section>
              <h3 className="text-2xl font-bold uppercase tracking-widest mb-4 inline-block border-b-4 pb-1" style={{ fontFamily: hf, borderColor: c }}>Profile</h3>
              <p className="text-[14.5px] leading-relaxed text-gray-700 whitespace-pre-wrap" style={{ fontFamily: bf }}>{summary}</p>
            </section>
          )}

          {experience.length > 0 && (
             <section>
               <h3 className="text-2xl font-bold uppercase tracking-widest mb-6 inline-block border-b-4 pb-1" style={{ fontFamily: hf, borderColor: c }}>Experience</h3>
               <div className="space-y-6">
                 {experience.map((exp) => (
                   <div key={exp.id}>
                     <div className="flex justify-between items-baseline mb-1">
                       <h4 className="font-bold text-[17px] text-gray-900" style={{ fontFamily: hf }}>{exp.jobTitle}</h4>
                       <span className="text-[13px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                         {exp.startDate} - {exp.isPresent ? 'Present' : exp.endDate}
                       </span>
                     </div>
                     <div className="text-[15px] font-semibold mb-2" style={{ color: c }}>{exp.company} {exp.city && `| ${exp.city}`}</div>
                     <p className="text-[14px] leading-relaxed text-gray-600 pl-4 border-l-2 whitespace-pre-wrap" style={{ fontFamily: bf, borderColor: c }}>
                       {exp.description}
                     </p>
                   </div>
                 ))}
               </div>
             </section>
          )}

          {projects.length > 0 && (
             <section>
               <h3 className="text-2xl font-bold uppercase tracking-widest mb-6 inline-block border-b-4 pb-1" style={{ fontFamily: hf, borderColor: c }}>Projects</h3>
               <div className="space-y-6">
                 {projects.map((proj) => (
                   <div key={proj.id}>
                     <div className="flex justify-between items-baseline mb-1">
                       <h4 className="font-bold text-[17px] text-gray-900" style={{ fontFamily: hf }}>
                         {proj.title}
                         {proj.link && <span className="text-[13px] font-normal text-gray-500 ml-2">({proj.link.replace('https://', '')})</span>}
                       </h4>
                       <span className="text-[13px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                         {proj.startDate} - {proj.endDate}
                       </span>
                     </div>
                     {proj.subtitle && (
                       <div className="text-[15px] font-semibold mb-2" style={{ color: c }}>{proj.subtitle}</div>
                     )}
                     <p className="text-[14px] leading-relaxed text-gray-600 pl-4 border-l-2 whitespace-pre-wrap" style={{ fontFamily: bf, borderColor: c }}>
                       {proj.description}
                     </p>
                   </div>
                 ))}
               </div>
             </section>
          )}

          {education.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold uppercase tracking-widest mb-6 inline-block border-b-4 pb-1" style={{ fontFamily: hf, borderColor: c }}>Education</h3>
              <div className="space-y-5">
                {education.map(edu => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline">
                       <h4 className="font-bold text-[16px] text-gray-900" style={{ fontFamily: hf }}>{edu.degree}</h4>
                       <span className="text-[13px] font-bold text-gray-500">{edu.startYear} - {edu.endYear}</span>
                    </div>
                    <div className="text-[14px] font-medium text-gray-700" style={{ color: c }}>{edu.schoolName}</div>
                    {edu.description && (
                      <p className="text-[13.5px] text-gray-600 mt-1 whitespace-pre-wrap" style={{ fontFamily: bf }}>{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
      <CustomSectionsBlock data={data} />
      </div>
    </div>
  );
};

export default Sidebar;
