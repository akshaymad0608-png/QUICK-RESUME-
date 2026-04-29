const fs = require('fs');
let templatesFile = fs.readFileSync('src/components/Templates.tsx', 'utf8');

const newTemplates = `
export const AvatarTemplate = ({
  data,
  color,
}: {
  data: ResumeData;
  color: string;
}) => (
  <div className="font-sans text-gray-800 bg-white w-full min-h-full box-border grid grid-cols-[30%_70%]">
    <div className="bg-slate-100 p-[12mm] border-r border-slate-200">
      <div className="flex flex-col items-center mb-8">
        {data.photoUrl ? (
          <img src={data.photoUrl} alt="" className="w-32 h-32 rounded-full object-cover shadow-sm mb-4 border-[4px] border-white" />
        ) : (
          <div className="w-32 h-32 rounded-full bg-slate-200 shadow-sm mb-4 flex items-center justify-center text-slate-400">Photo</div>
        )}
      </div>

      <div className="flex flex-col gap-4 text-sm break-words">
        {data.email && <div className="flex flex-col"><span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email</span><span>{data.email}</span></div>}
        {data.phone && <div className="flex flex-col"><span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Phone</span><span>{data.phone}</span></div>}
        {data.location && <div className="flex flex-col"><span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Location</span><span>{data.location}</span></div>}
        {data.linkedin && <div className="flex flex-col"><span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">LinkedIn</span><span>{data.linkedin}</span></div>}
      </div>

      {data.skills && (
        <div className="mt-10">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-slate-300 pb-2" style={{ color }}>Skills</h2>
          <div className="flex flex-col gap-2 text-sm">
            {data.skills.split(/,|\\n|\\//).map(s => s.trim()).filter(Boolean).map((skill, i) => (
              <span key={i}>{skill}</span>
            ))}
          </div>
        </div>
      )}
    </div>

    <div className="p-[12mm] flex flex-col gap-8 bg-white">
      <div>
        <h1 className="text-5xl font-black tracking-tight text-slate-900 mb-2">{data.name?.substring(0, 80) || "Your Name"}</h1>
        <h2 className="text-xl font-medium tracking-wide uppercase" style={{ color }}>{data.title?.substring(0, 150) || "Professional Title"}</h2>
      </div>

      {data.summary && (
        <div>
          <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-slate-100 pb-2 mb-4" style={{ borderColor: color }}>Profile</h2>
          <p className="text-base leading-relaxed text-slate-600">{data.summary?.substring(0, 1500)}</p>
        </div>
      )}

      {data.experience && data.experience.some(e => e.jobTitle || e.company) && (
        <div>
          <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-slate-100 pb-2 mb-6" style={{ borderColor: color }}>Experience</h2>
          <div className="flex flex-col gap-6">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-bold text-slate-900">{exp.jobTitle}</h3>
                  <span className="text-sm font-medium text-slate-500">{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="text-base font-medium mb-3" style={{ color }}>{exp.company}</div>
                <div className="text-sm leading-relaxed text-slate-600 whitespace-pre-line">
                  {exp.responsibilities}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.education && data.education.some(e => e.degree || e.institution) && (
        <div>
          <h2 className="text-lg font-bold uppercase tracking-widest border-b-2 border-slate-100 pb-2 mb-6" style={{ borderColor: color }}>Education</h2>
          <div className="grid grid-cols-2 gap-6">
            {data.education.map(edu => (
              <div key={edu.id}>
                <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                <div className="text-sm font-medium" style={{ color }}>{edu.institution}</div>
                <div className="text-sm text-slate-500">{edu.year}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

export const GeometricTemplate = ({
  data,
  color,
}: {
  data: ResumeData;
  color: string;
}) => (
  <div className="font-sans text-slate-800 bg-white w-full min-h-full box-border relative overflow-hidden p-[15mm]">
    {/* Geometric Background Element */}
    <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-bl-full opacity-10 pointer-events-none" style={{ backgroundColor: color }}></div>
    
    <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center border-b border-slate-200 pb-8 mb-8">
      {data.photoUrl && (
        <img src={data.photoUrl} alt="" className="w-36 h-36 rounded-2xl object-cover shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] border border-slate-200" style={{ boxShadow: \`8px 8px 0px 0px \${color}40\` }} />
      )}
      <div className="flex-1">
        <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-2">{data.name?.substring(0, 80) || "Your Name"}</h1>
        <h2 className="text-2xl font-bold uppercase tracking-wider mb-4" style={{ color }}>{data.title?.substring(0, 150) || "Job Title"}</h2>
        
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 font-medium mt-4">
          {data.email && <span className="flex items-center gap-1.5"><Mail size={16} style={{ color }}/> {data.email}</span>}
          {data.phone && <span className="flex items-center gap-1.5"><Phone size={16} style={{ color }}/> {data.phone}</span>}
          {data.location && <span className="flex items-center gap-1.5"><MapPin size={16} style={{ color }}/> {data.location}</span>}
          {data.linkedin && <span className="flex items-center gap-1.5"><Linkedin size={16} style={{ color }}/> {data.linkedin}</span>}
        </div>
      </div>
    </div>

    <div className="grid grid-cols-[2fr_1fr] gap-12 relative z-10">
      <div className="flex flex-col gap-10">
        {data.summary && (
          <div>
            <h2 className="text-lg font-black uppercase tracking-widest text-slate-900 mb-4 pb-2 border-b-2" style={{ borderColor: color }}>Summary</h2>
            <p className="text-base leading-relaxed text-slate-600">{data.summary?.substring(0, 1500)}</p>
          </div>
        )}

        {data.experience && data.experience.some(e => e.jobTitle || e.company) && (
          <div>
            <h2 className="text-lg font-black uppercase tracking-widest text-slate-900 mb-6 pb-2 border-b-2" style={{ borderColor: color }}>Experience</h2>
            <div className="flex flex-col gap-8">
              {data.experience.map(exp => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-slate-200">
                  <div className="absolute w-3 h-3 rounded-full -left-[7px] top-1.5 bg-white border-2" style={{ borderColor: color }}></div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-xl font-bold text-slate-900">{exp.jobTitle}</h3>
                    <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className="text-base font-bold mb-3" style={{ color }}>{exp.company}</div>
                  <div className="text-sm leading-relaxed text-slate-600 whitespace-pre-line">
                    {exp.responsibilities}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-10">
        {data.skills && (
          <div>
             <h2 className="text-lg font-black uppercase tracking-widest text-slate-900 mb-4 pb-2 border-b-2" style={{ borderColor: color }}>Skills</h2>
             <div className="flex flex-wrap gap-2">
              {data.skills.split(/,|\\n|\\//).map(s => s.trim()).filter(Boolean).map((skill, i) => (
                <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded hover:bg-slate-200 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.education && data.education.some(e => e.degree || e.institution) && (
          <div>
            <h2 className="text-lg font-black uppercase tracking-widest text-slate-900 mb-4 pb-2 border-b-2" style={{ borderColor: color }}>Education</h2>
            <div className="flex flex-col gap-5">
              {data.education.map(edu => (
                <div key={edu.id}>
                  <h3 className="font-bold text-slate-900 text-base mb-1">{edu.degree}</h3>
                  <div className="text-sm font-semibold mb-1" style={{ color }}>{edu.institution}</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{edu.year}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);
`;

templatesFile += "\\n" + newTemplates;
fs.writeFileSync('src/components/Templates.tsx', templatesFile);
console.log('Appended templates');
