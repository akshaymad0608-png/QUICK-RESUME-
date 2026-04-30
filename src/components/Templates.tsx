import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  Globe,
} from "lucide-react";
import { ResumeData } from "../types";

export const AcademicTemplate = ({
  data,
  color,
}: {
  data: ResumeData;
  color: string;
}) => (
  <div className="font-serif text-gray-900 bg-white w-full min-h-full box-border p-[12mm] leading-relaxed text-sm">
    <div className="text-center mb-8">
      {data.photoUrl && (
        <img src={data.photoUrl} alt="Resume Profile" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2" style={{ borderColor: color }} />
      )}
      <h1 className="text-3xl font-bold mb-2 uppercase tracking-wider">
        {data.name?.substring(0, 80) || "Your Name"}
      </h1>
      <p className="text-lg italic text-gray-700">
        {data.title?.substring(0, 150) || "Academic Title"}
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs text-gray-600">
        {data.email && <span>{data.email}</span>}
        {data.phone && <span>• {data.phone}</span>}
        {data.location && <span>• {data.location}</span>}
        {data.linkedin && <span>• {data.linkedin}</span>}
        {data.website && <span>• {data.website}</span>}
        {data.website && <span>• {data.website}</span>}
      </div>
    </div>

    {data.summary && (
      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-gray-900 mb-3 pb-1">
          Profile
        </h2>
        <p className="text-justify">{data.summary?.substring(0, 1500)}</p>
      </div>
    )}

    {data.education && data.education?.some(e => e.degree || e.institution) && (
      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-gray-900 mb-3 pb-1">
          Education
        </h2>
        <div className="space-y-4">
          {data.education.map((edu) => (
            <div key={edu.id}>
              <div className="flex justify-between items-start">
                <h3 className="font-bold">{edu.institution}</h3>
                <span className="text-gray-600">{edu.year}</span>
              </div>
              <p className="italic">{edu.degree}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    {data.experience && data.experience?.some(e => e.jobTitle || e.company) && (
      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-gray-900 mb-3 pb-1">
          Academic & Professional Experience
        </h2>
        <div className="space-y-5">
          {data.experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold">{exp.jobTitle}</h3>
                <span className="text-gray-600 text-xs">
                  {exp.startDate} – {exp.endDate}
                </span>
              </div>
              <p className="italic mb-2">{exp.company}</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-800">
                {exp.responsibilities
                  .split("\n")
                  .map((line, i) =>
                    line.trim() ? <li key={i}>{line}</li> : null,
                  )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )}

    {(data.projects?.some(p => p.name || p.description) || data.certifications?.some(c => c.name || c.issuer)) && (
      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-gray-900 mb-3 pb-1">
          Publications & Research
        </h2>
        <div className="space-y-4">
          {data.projects?.map((proj) => (
            <div
              key={proj.id}
              className="pl-4 border-l-4"
              style={{ borderColor: color }}
            >
              <span className="font-bold">{proj.name}.</span> {proj.description}{" "}
              {proj.link && (
                <a href={proj.link} className="text-blue-600 hover:underline">
                  [{proj.link}]
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

export const StartupTemplate = ({
  data,
  color,
}: {
  data: ResumeData;
  color: string;
}) => (
  <div className="font-sans bg-[#fafafa] text-gray-800 w-full min-h-full box-border ">
    <div
      className="p-[12mm] text-white rounded-b-[40px] mb-8"
      style={{ backgroundColor: color }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-6 text-left">
          {data.photoUrl && (
            <img src={data.photoUrl} alt="Resume Profile" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md shrink-0" />
          )}
          <div>
            <h1 className="text-5xl font-black tracking-tight mb-2 text-white">
              {data.name?.substring(0, 80) || "Your Name"}
            </h1>
            <p className="text-2xl font-medium opacity-90 text-white">
              {data.title?.substring(0, 150) || "The Innovator"}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-sm text-right opacity-90 font-medium">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>{data.location}</span>}
        </div>
      </div>
    </div>

    <div className="px-10 pb-10">
      {data.summary && (
        <div
          className="bg-white p-6 rounded-2xl shadow-sm mb-8 relative border"
          style={{ borderLeftColor: color, borderLeftWidth: "4px" }}
        >
          <p className="text-gray-700 leading-relaxed font-medium">
            {data.summary?.substring(0, 1500)}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {data.experience && data.experience?.some(e => e.jobTitle || e.company) && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: color }}
                >
                  💼
                </div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Experience
                </h2>
              </div>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                {data.experience.map((exp, i) => (
                  <div
                    key={exp.id}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                  >
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-200 text-slate-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10"
                      style={{ backgroundColor: color }}
                    ></div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                      <div className="flex items-center justify-between space-x-2 mb-1">
                        <div className="font-bold text-slate-900">
                          {exp.jobTitle}
                        </div>
                        <time className="font-mono text-xs text-slate-500">
                          {exp.startDate} - {exp.endDate}
                        </time>
                      </div>
                      <div
                        className="text-sm font-medium mb-3"
                        style={{ color }}
                      >
                        {exp.company}
                      </div>
                      <ul className="text-sm text-slate-600 space-y-1 list-none">
                        {exp.responsibilities.split("\n").map((line, j) =>
                          line.trim() ? (
                            <li key={j} className="flex gap-2">
                              <span style={{ color }}>▹</span>
                              <span>{line}</span>
                            </li>
                          ) : null,
                        )}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-8">
          {data.skills && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: color }}
                >
                  ⚡
                </div>
                <h2 className="text-xl font-bold tracking-tight">Skills</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.skills
                  .split(/,|\n|\//).slice(0, 50)
                  .map((s) => s.trim())
                  .filter(Boolean)
                  .map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-white text-gray-700 text-xs font-bold rounded-lg shadow-sm border border-gray-100"
                    ><span className="break-words whitespace-normal max-w-full">{skill}</span></span>
                  ))}
              </div>
            </div>
          )}

          {data.education && data.education?.some(e => e.degree || e.institution) && (
            <div>
              <div className="flex items-center gap-3 mb-4 mt-8">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: color }}
                >
                  🎓
                </div>
                <h2 className="text-xl font-bold tracking-tight">Education</h2>
              </div>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div
                    key={edu.id}
                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                  >
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {edu.institution}
                    </p>
                    <p className="text-xs font-bold text-gray-400 mt-2">
                      {edu.year}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export const CorporateTemplate = ({
  data,
  color,
}: {
  data: ResumeData;
  color: string;
}) => (
  <div className="font-sans text-gray-800 bg-white w-full min-h-full box-border relative p-[12mm]">
    <div
      className="absolute top-0 left-0 w-full h-4"
      style={{ backgroundColor: color }}
    ></div>
    <div className="flex flex-col md:flex-row items-center gap-8 mb-8 mt-4 border-b pb-8">
      {data.photoUrl && (
        <img src={data.photoUrl} alt="Resume Profile" className="w-28 h-28 rounded object-cover shadow-sm shrink-0" />
      )}
      <div className="flex-1">
        <h1 className="text-4xl font-light text-gray-900 mb-2">
          {data.name?.substring(0, 80)?.toUpperCase() || "YOUR NAME"}
        </h1>
        <h2 className="text-xl font-medium tracking-wide" style={{ color }}>
          {data.title?.substring(0, 150)?.toUpperCase() || "PROFESSIONAL TITLE"}
        </h2>
      </div>
      <div
        className="text-sm text-gray-600 space-y-1 text-right border-l-2 pl-6"
        style={{ borderColor: color }}
      >
        {data.email && (
          <div className="flex items-center justify-end gap-2">
            <span>{data.email}</span>
            <span style={{ color }}>✉</span>
          </div>
        )}
        {data.phone && (
          <div className="flex items-center justify-end gap-2">
            <span>{data.phone}</span>
            <span style={{ color }}>☏</span>
          </div>
        )}
        {data.linkedin && (
          <div className="flex items-center justify-end gap-2">
            <span>{data.linkedin}</span>
            <span style={{ color }}>in</span>
          </div>
        )}
        {data.website && (
          <div className="flex items-center justify-end gap-2">
            <span>{data.website}</span>
            <span style={{ color }}>w</span>
          </div>
        )}
        {data.website && (
          <div className="flex items-center justify-end gap-2">
            <span>{data.website}</span>
            <span style={{ color }}>w</span>
          </div>
        )}
        {data.location && (
          <div className="flex items-center justify-end gap-2">
            <span>{data.location}</span>
            <span style={{ color }}>📍</span>
          </div>
        )}
      </div>
    </div>

    <div className="grid grid-cols-3 gap-10">
      <div className="col-span-2 space-y-8">
        {data.summary && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-3">
              Professional Summary
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {data.summary?.substring(0, 1500)}
            </p>
          </div>
        )}

        {data.experience && data.experience?.some(e => e.jobTitle || e.company) && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-4">
              Work Experience
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-gray-900 text-base">
                      {exp.jobTitle}
                    </h4>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <div
                    className="text-sm font-bold uppercase tracking-wider mb-3"
                    style={{ color }}
                  >
                    {exp.company}
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1.5 list-disc pl-5 marker:text-gray-400">
                    {exp.responsibilities
                      .split("\n")
                      .map((line, i) =>
                        line.trim() ? <li key={i}>{line}</li> : null,
                      )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-8">
        {data.skills && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-4">
              Core Competencies
            </h3>
            <div className="flex flex-col gap-2">
              {data.skills
                .split(/,|\n|\//).slice(0, 50)
                .map((s) => s.trim())
                .filter(Boolean)
                .map((skill, i) => (
                  <div
                    key={i}
                    className="text-sm text-gray-700 font-medium border-b border-gray-100 pb-2"
                  ><span className="break-words whitespace-normal max-w-full">{skill}</span></div>
                ))}
            </div>
          </div>
        )}

        {data.education && data.education?.some(e => e.degree || e.institution) && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-4 mt-8">
              Education
            </h3>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <h4 className="font-bold text-gray-900 text-sm">
                    {edu.degree}
                  </h4>
                  <div className="text-sm text-gray-600 mt-1">
                    {edu.institution}
                  </div>
                  <div className="text-xs font-bold mt-1" style={{ color }}>
                    {edu.year}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

export const FreelancerTemplate = ({
  data,
  color,
}: {
  data: ResumeData;
  color: string;
}) => (
  <div className="font-mono text-gray-800 bg-white w-full min-h-full box-border  p-[12mm]">
    <div className="border-4 p-[12mm]" style={{ borderColor: color }}>
      <div className="text-center mb-10">
        <h1
          className="text-4xl md:text-5xl font-bold uppercase tracking-widest mb-6"
          style={{ color }}
        >
          {data.name?.substring(0, 80) || "YOUR NAME"}
        </h1>
        <div className="bg-gray-800 text-white inline-block px-6 py-2 text-sm font-bold uppercase tracking-widest rounded-sm">
          {data.title?.substring(0, 150) || "FREELANCER"}
        </div>
      </div>

      <div
        className="flex flex-row justify-between w-full gap-8 mb-12 border-b-4 pb-12"
        style={{ borderColor: color }}
      >
        {data.summary && (
          <div className="text-sm leading-relaxed text-justify w-[60%]">
            <span
              className="font-extrabold text-lg mr-[2px]"
              style={{ color }}
            >
              {data.summary.charAt(0)}
            </span>
            {data.summary.substring(1)}
          </div>
        )}
        <div className="text-xs space-y-2 font-bold uppercase tracking-widest w-[35%] shrink-0">
          {data.email && (
            <div className="flex border-b border-gray-200 pb-1">
              <span className="w-24 text-gray-400">EMAIL:</span>{" "}
              <span>{data.email}</span>
            </div>
          )}
          {data.location && (
            <div className="flex border-b border-gray-200 pb-1">
              <span className="w-24 text-gray-400">BASE:</span>{" "}
              <span>{data.location}</span>
            </div>
          )}
          {data.phone && (
            <div className="flex border-b border-gray-200 pb-1">
              <span className="w-24 text-gray-400">TEL:</span>{" "}
              <span>{data.phone}</span>
            </div>
          )}
          {data.linkedin && (
            <div className="flex border-b border-gray-200 pb-1">
              <span className="w-24 text-gray-400">LINK:</span>{" "}
              <span>{data.linkedin}</span>
            </div>
          )}
          {data.website && (
            <div className="flex border-b border-gray-200 pb-1">
              <span className="w-24 text-gray-400">WEB:</span>{" "}
              <span>{data.website}</span>
            </div>
          )}
          {data.website && (
            <div className="flex border-b border-gray-200 pb-1">
              <span className="w-24 text-gray-400">WEB:</span>{" "}
              <span>{data.website}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold uppercase tracking-widest mb-8 bg-gray-800 text-white inline-block px-4 py-2 rounded-sm">
          Experience
        </h2>
        <div className="flex flex-wrap justify-between gap-y-6">
          {data.experience?.map((exp, i) => (
            <div
              key={exp.id}
              className={i === 0 ? "w-full border-b-2 pb-6 mb-2" : "w-[47%]"}
              style={i === 0 ? { borderColor: color } : {}}
            >
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="font-bold text-lg leading-tight uppercase">
                  {exp.jobTitle}
                </h3>
                <span className="text-xs font-bold bg-gray-100 px-2 py-0.5">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <div className="text-sm font-bold mb-3" style={{ color }}>
                {exp.company}
              </div>
              <ul className="text-xs leading-relaxed text-gray-700 list-disc pl-4 space-y-1">
                {exp.responsibilities.split("\n").filter(Boolean).map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-row justify-between w-full gap-8">
        {data.skills && (
          <div className="w-[47%]">
            <h2
              className="text-xl font-bold uppercase tracking-widest mb-6 border-b-2 pb-3"
              style={{ borderColor: color }}
            >
              Toolkit
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills
                .split(/,|\n|\//).slice(0, 50)
                .map((s) => s.trim())
                .filter(Boolean)
                .map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs font-bold uppercase bg-gray-100 px-3 py-1.5 rounded-sm"
                  ><span className="break-words whitespace-normal max-w-full">{skill}</span></span>
                ))}
            </div>
          </div>
        )}

        {data.education && data.education?.some(e => e.degree || e.institution) && (
          <div className="w-[47%]">
            <h2
              className="text-xl font-bold uppercase tracking-widest mb-6 border-b-2 pb-3"
              style={{ borderColor: color }}
            >
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-sm uppercase">{edu.degree}</h3>
                  <div className="text-xs mt-1 text-gray-600">
                    {edu.institution}
                  </div>
                  <div className="text-xs font-bold mt-1" style={{ color }}>
                    {edu.year}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

export const TechTemplate = ({
  data,
  color,
}: {
  data: ResumeData;
  color: string;
}) => (
  <div className="font-sans text-gray-800 bg-white p-[12mm] w-full min-h-full box-border">
    <div className="border-l-4 pl-6 mb-8 flex justify-between items-center" style={{ borderColor: color }}>
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-1">
          {data.name?.substring(0, 80) || "Your Name"}
        </h1>
        <p className="text-xl font-medium" style={{ color }}>
          {data.title?.substring(0, 150) || "Professional Title"}
        </p>
        <div className="text-sm flex flex-wrap gap-4 text-gray-600 mt-3 font-mono">
          {data.email && (
            <span className="flex items-center gap-1">
              <Mail size={14} /> {data.email}
            </span>
          )}
          {data.phone && (
            <span className="flex items-center gap-1">
              <Phone size={14} /> {data.phone}
            </span>
          )}
          {data.location && (
            <span className="flex items-center gap-1">
              <MapPin size={14} /> {data.location}
            </span>
          )}
          {data.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin size={14} /> {data.linkedin}
            </span>
          )}
          {data.website && (
            <span className="flex items-center gap-1">
              <Globe size={14} /> {data.website}
            </span>
          )}
          {data.website && (
            <span className="flex items-center gap-1">
              <Globe size={14} /> {data.website}
            </span>
          )}
        </div>
      </div>
      {data.photoUrl && (
        <img src={data.photoUrl} alt="Resume Profile" className="w-24 h-24 rounded shadow-sm object-cover ml-4" />
      )}
    </div>

    {data.summary && (
      <div className="mb-6">
        <h2
          className="text-lg font-bold uppercase tracking-wider mb-2 flex items-center gap-2"
          style={{ color }}
        >
          <User size={18} /> Summary
        </h2>
        <p className="text-sm leading-relaxed">{data.summary?.substring(0, 1500)}</p>
      </div>
    )}

    {data.skills && (
      <div className="mb-6">
        <h2
          className="text-lg font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
          style={{ color }}
        >
          <Wrench size={18} /> Technical Skills
        </h2>
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {data.skills
            .split(/,|\n|\//).slice(0, 50)
            .map((s) => s.trim())
            .filter((s) => s)
            .map((skill, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-gray-100 text-gray-800 rounded border border-gray-200"
              ><span className="break-words whitespace-normal max-w-full">{skill}</span></span>
            ))}
        </div>
      </div>
    )}

    {data.experience?.some(e => e.jobTitle || e.company) && (
      <div className="mb-6">
        <h2
          className="text-lg font-bold uppercase tracking-wider mb-4 flex items-center gap-2"
          style={{ color }}
        >
          <Briefcase size={18} /> Experience
        </h2>
        <div className="space-y-5">
          {data.experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-md text-gray-900">
                  {exp.jobTitle}
                </h3>
                <span className="text-sm font-mono" style={{ color }}>
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <div className="text-sm font-medium text-gray-700 mb-2">
                {exp.company}
              </div>
              <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                {exp.responsibilities
                  .split("\n")
                  .map((line, i) =>
                    line.trim() ? <li key={i}>{line}</li> : null,
                  )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )}

    {data.projects?.some(p => p.name || p.description) && (
      <div className="mb-6">
        <h2
          className="text-lg font-bold uppercase tracking-wider mb-4 flex items-center gap-2"
          style={{ color }}
        >
          <FolderGit2 size={18} /> Projects
        </h2>
        <div className="space-y-4">
          {data.projects.map((proj) => (
            <div key={proj.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-md text-gray-900">{proj.name}</h3>
                {proj.link && (
                  <span className="text-xs font-mono text-blue-600">
                    {proj.link}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {proj.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    )}

    <div className="grid grid-cols-2 gap-6">
      {data.education?.some(e => e.degree || e.institution) && (
        <div>
          <h2
            className="text-lg font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
            style={{ color }}
          >
            <GraduationCap size={18} /> Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-bold text-sm text-gray-900">
                  {edu.degree}
                </h3>
                <div className="text-sm text-gray-700">{edu.institution}</div>
                <div className="text-xs font-mono mt-1" style={{ color }}>
                  {edu.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.certifications?.some(c => c.name || c.issuer) && (
        <div>
          <h2
            className="text-lg font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
            style={{ color }}
          >
            <Award size={18} /> Certifications
          </h2>
          <div className="space-y-3">
            {data.certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="font-bold text-sm text-gray-900">{cert.name}</h3>
                <div className="text-sm text-gray-700">{cert.issuer}</div>
                <div className="text-xs font-mono mt-1" style={{ color }}>
                  {cert.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

export const BusinessTemplate = ({
  data,
  color,
}: {
  data: ResumeData;
  color: string;
}) => (
  <div className="font-serif text-gray-900 bg-white p-[12mm] w-full min-h-full box-border">
    <div
      className="text-center border-b-2 pb-6 mb-6"
      style={{ borderColor: color }}
    >
      {data.photoUrl && (
        <img src={data.photoUrl} alt="Resume Profile" className="w-24 h-24 object-cover mx-auto mb-4 border border-gray-300 p-1" />
      )}
      <h1
        className="text-4xl font-bold uppercase tracking-widest mb-2"
        style={{ color }}
      >
        {data.name?.substring(0, 80) || "Your Name"}
      </h1>
      <p className="text-lg uppercase tracking-wider text-gray-600 mb-4">
        {data.title?.substring(0, 150) || "Professional Title"}
      </p>
      <div className="text-sm flex flex-wrap justify-center gap-4 text-gray-600 font-sans">
        {data.email && <span>{data.email}</span>}
        {data.phone && <span>• {data.phone}</span>}
        {data.location && <span>• {data.location}</span>}
        {data.linkedin && <span>• {data.linkedin}</span>}
        {data.website && <span>• {data.website}</span>}
        {data.website && <span>• {data.website}</span>}
      </div>
    </div>

    {data.summary && (
      <div className="mb-6">
        <p className="text-sm leading-relaxed text-justify">{data.summary?.substring(0, 1500)}</p>
      </div>
    )}

    {data.experience?.some(e => e.jobTitle || e.company) && (
      <div className="mb-6">
        <h2
          className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 mb-4 pb-1"
          style={{ color }}
        >
          Professional Experience
        </h2>
        <div className="space-y-5">
          {data.experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-md">{exp.jobTitle}</h3>
                <span className="text-sm italic text-gray-600">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <div className="text-sm font-semibold text-gray-800 mb-2">
                {exp.company}
              </div>
              <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1 font-sans">
                {exp.responsibilities
                  .split("\n")
                  .map((line, i) =>
                    line.trim() ? <li key={i}>{line}</li> : null,
                  )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )}

    {data.education?.some(e => e.degree || e.institution) && (
      <div className="mb-6">
        <h2
          className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 mb-4 pb-1"
          style={{ color }}
        >
          Education
        </h2>
        <div className="space-y-3">
          {data.education.map((edu) => (
            <div key={edu.id} className="flex justify-between items-baseline">
              <div>
                <h3 className="font-bold text-md">{edu.degree}</h3>
                <div className="text-sm text-gray-700 font-sans">
                  {edu.institution}
                </div>
              </div>
              <span className="text-sm italic text-gray-600">{edu.year}</span>
            </div>
          ))}
        </div>
      </div>
    )}

    {data.skills && (
      <div className="mb-6">
        <h2
          className="text-lg font-bold uppercase tracking-widest border-b border-gray-300 mb-4 pb-1"
          style={{ color }}
        >
          Core Competencies
        </h2>
        <p className="text-sm leading-relaxed font-sans text-gray-700">
          {data.skills
            .split(/,|\n|\//).slice(0, 50)
            .map((s) => s.trim())
            .filter((s) => s)
            .join(" • ")}
        </p>
      </div>
    )}
  </div>
);

export const HealthcareTemplate = ({
  data,
  color,
}: {
  data: ResumeData;
  color: string;
}) => (
  <div className="font-sans text-gray-800 bg-white p-[12mm] w-full min-h-full box-border">
    <div
      className="flex justify-between items-end border-b-4 pb-4 mb-6"
      style={{ borderColor: color }}
    >
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-1">
          {data.name?.substring(0, 80) || "Your Name"}
        </h1>
        <p className="text-xl font-medium" style={{ color }}>
          {data.title?.substring(0, 150) || "Professional Title"}
        </p>
      </div>
      <div className="text-right text-sm text-gray-600 space-y-1">
        {data.email && <div>{data.email}</div>}
        {data.phone && <div>{data.phone}</div>}
        {data.location && <div>{data.location}</div>}
      </div>
    </div>

    {data.summary && (
      <div
        className="mb-6 bg-gray-50 p-4 rounded-lg border-l-4"
        style={{ borderColor: color }}
      >
        <p className="text-sm leading-relaxed">{data.summary?.substring(0, 1500)}</p>
      </div>
    )}

    <div className="grid grid-cols-3 gap-6 mb-6">
      <div className="col-span-1 border-r border-gray-200 pr-6">
        {data.education?.some(e => e.degree || e.institution) && (
          <div className="mb-6">
            <h2 className="text-md font-bold uppercase mb-3" style={{ color }}>
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-sm text-gray-900">
                    {edu.degree}
                  </h3>
                  <div className="text-sm text-gray-700">{edu.institution}</div>
                  <div className="text-xs text-gray-500 mt-1">{edu.year}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.certifications?.some(c => c.name || c.issuer) && (
          <div className="mb-6">
            <h2 className="text-md font-bold uppercase mb-3" style={{ color }}>
              Licenses & Certs
            </h2>
            <div className="space-y-3">
              {data.certifications.map((cert) => (
                <div key={cert.id}>
                  <h3 className="font-bold text-sm text-gray-900">
                    {cert.name}
                  </h3>
                  <div className="text-sm text-gray-700">{cert.issuer}</div>
                  <div className="text-xs text-gray-500 mt-1">{cert.year}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.skills && (
          <div>
            <h2 className="text-md font-bold uppercase mb-3" style={{ color }}>
              Clinical Skills
            </h2>
            <ul className="list-disc pl-4 text-sm text-gray-700 space-y-1">
              {data.skills
                .split(/,|\n|\//).slice(0, 50)
                .map((s) => s.trim())
                .filter((s) => s)
                .map((skill, i) => (
                  <li key={i}><span className="break-words whitespace-normal max-w-full">{skill}</span></li>
                ))}
            </ul>
          </div>
        )}
      </div>

      <div className="col-span-2">
        {data.experience?.some(e => e.jobTitle || e.company) && (
          <div className="mb-6">
            <h2
              className="text-lg font-bold uppercase mb-4 border-b border-gray-200 pb-2"
              style={{ color }}
            >
              Clinical Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-md text-gray-900">
                      {exp.jobTitle}
                    </h3>
                    <span className="text-sm font-medium" style={{ color }}>
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    {exp.company}
                  </div>
                  <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                    {exp.responsibilities
                      .split("\n")
                      .map((line, i) =>
                        line.trim() ? <li key={i}>{line}</li> : null,
                      )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

export const CreativeTemplate = ({
  data,
  color,
}: {
  data: ResumeData;
  color: string;
}) => (
  <div className="font-sans text-gray-800 bg-white w-full min-h-full box-border flex ">
    {/* Left Sidebar */}
    <div className="w-1/3 p-[12mm] text-white" style={{ backgroundColor: color }}>
      <h1 className="text-3xl font-bold mb-2 leading-tight">
        {data.name?.substring(0, 80) || "Your Name"}
      </h1>
      <p className="text-lg opacity-90 mb-8 font-medium">
        {data.title?.substring(0, 150) || "Professional Title"}
      </p>

      <div className="space-y-4 text-sm opacity-90 mb-10">
        {data.email && (
          <div className="flex items-center gap-2">
            <Mail size={16} /> {data.email}
          </div>
        )}
        {data.phone && (
          <div className="flex items-center gap-2">
            <Phone size={16} /> {data.phone}
          </div>
        )}
        {data.location && (
          <div className="flex items-center gap-2">
            <MapPin size={16} /> {data.location}
          </div>
        )}
        {data.linkedin && (
          <div className="flex items-center gap-2">
            <Linkedin size={16} /> {data.linkedin}
          </div>
        )}
        {data.website && (
          <div className="flex items-center gap-2">
            <Globe size={16} /> {data.website}
          </div>
        )}
        {data.website && (
          <div className="flex items-center gap-2">
            <Globe size={16} /> {data.website}
          </div>
        )}
      </div>

      {data.skills && (
        <div className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-4 opacity-80 border-b border-white/30 pb-2">
            Expertise
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills
              .split(/,|\n|\//).slice(0, 50)
              .map((s) => s.trim())
              .filter((s) => s)
              .map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium"
                ><span className="break-words whitespace-normal max-w-full">{skill}</span></span>
              ))}
          </div>
        </div>
      )}

      {data.education?.some(e => e.degree || e.institution) && (
        <div className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-4 opacity-80 border-b border-white/30 pb-2">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-bold text-sm">{edu.degree}</h3>
                <div className="text-sm opacity-90">{edu.institution}</div>
                <div className="text-xs opacity-75 mt-1">{edu.year}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* Right Content */}
    <div className="w-2/3 p-[12mm] bg-white">
      {data.summary && (
        <div className="mb-8">
          <h2
            className="text-xl font-bold mb-3 text-gray-900"
            style={{ color }}
          >
            Profile
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            {data.summary?.substring(0, 1500)}
          </p>
        </div>
      )}

      {data.experience?.some(e => e.jobTitle || e.company) && (
        <div className="mb-8">
          <h2
            className="text-xl font-bold mb-4 text-gray-900"
            style={{ color }}
          >
            Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div
                key={exp.id}
                className="relative pl-4 border-l-2 border-gray-200"
              >
                <div
                  className="absolute w-3 h-3 rounded-full -left-[7px] top-1.5"
                  style={{ backgroundColor: color }}
                ></div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-md text-gray-900">
                    {exp.jobTitle}
                  </h3>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <div className="text-sm font-medium text-gray-700 mb-2">
                  {exp.company}
                </div>
                <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                  {exp.responsibilities
                    .split("\n")
                    .map((line, i) =>
                      line.trim() ? <li key={i}>{line}</li> : null,
                    )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.projects?.some(p => p.name || p.description) && (
        <div className="mb-8">
          <h2
            className="text-xl font-bold mb-4 text-gray-900"
            style={{ color }}
          >
            Projects
          </h2>
          <div className="space-y-5">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-md text-gray-900">
                    {proj.name}
                  </h3>
                  {proj.link && (
                    <span className="text-xs text-blue-600">{proj.link}</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

export const ModernTemplate = ({
  data,
  color,
}: {
  data: ResumeData;
  color: string;
}) => (
  <div className="font-sans text-gray-800 bg-white w-full min-h-full box-border p-[12mm] flex flex-col items-stretch text-left">
    <div className="border-b-4 pb-6 mb-8" style={{ borderColor: color }}>
      <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-2 uppercase">
        {data.name?.substring(0, 80) || "Your Name"}
      </h1>
      <p className="text-xl font-medium tracking-wide text-gray-600 mb-4">
        {data.title?.substring(0, 150) || "Professional Title"}
      </p>

      <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
        {data.email && <span>{data.email}</span>}
        {data.phone && <span>• {data.phone}</span>}
        {data.location && <span>• {data.location}</span>}
        {data.linkedin && <span>• {data.linkedin}</span>}
        {data.website && <span>• {data.website}</span>}
        {data.website && <span>• {data.website}</span>}
      </div>
    </div>

    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        {data.summary && (
          <div className="mb-8">
            <h2 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">
              Summary
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              {data.summary?.substring(0, 1500)}
            </p>
          </div>
        )}

        {data.experience?.some(e => e.jobTitle || e.company) && (
          <div className="mb-8">
            <h2 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">
              Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <h3 className="text-md font-bold text-gray-900">
                    {exp.jobTitle}
                  </h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium" style={{ color }}>
                      {exp.company}
                    </span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 pl-4 list-disc">
                    {exp.responsibilities
                      .split("\n")
                      .map((line, i) =>
                        line.trim() ? <li key={i}>{line}</li> : null,
                      )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-full md:w-1/3 space-y-8">
        {data.skills && (
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills
                .split(/,|\n|\//).slice(0, 50)
                .map((s) => s.trim())
                .filter(Boolean)
                .map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-sm"
                  ><span className="break-words whitespace-normal max-w-full">{skill}</span></span>
                ))}
            </div>
          </div>
        )}

        {data.education && data.education?.some(e => e.degree || e.institution) && (
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-sm text-gray-900 leading-tight">
                    {edu.degree}
                  </h3>
                  <div className="text-sm text-gray-600 my-1">
                    {edu.institution}
                  </div>
                  <div className="text-xs font-bold text-gray-400">
                    {edu.year}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.certifications && data.certifications?.some(c => c.name || c.issuer) && (
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4 mt-8">
              Certifications
            </h2>
            <div className="space-y-4">
              {data.certifications.map((cert) => (
                <div key={cert.id}>
                  <h3 className="font-bold text-sm text-gray-900 leading-tight">
                    {cert.name}
                  </h3>
                  <div className="text-sm text-gray-600 my-1">
                    {cert.issuer}
                  </div>
                  <div className="text-xs font-bold text-gray-400">
                    {cert.year}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>

    {data.projects && data.projects?.some(p => p.name || p.description) && (
      <div className="mt-8">
        <h2 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.projects.map((proj) => (
            <div key={proj.id} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-1">{proj.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{proj.description}</p>
              {proj.link && (
                <a
                  href={proj.link}
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color }}
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

export const MinimalTemplate = ({
  data,
  color,
}: {
  data: ResumeData;
  color: string;
}) => (
  <div className="font-serif text-gray-900 bg-white w-full min-h-full box-border p-[12mm]">
    <div className="text-center border-b border-gray-300 pb-6 mb-6">
      <h1 className="text-4xl font-normal tracking-wide mb-2 uppercase">
        {data.name?.substring(0, 80) || "Your Name"}
      </h1>
      <div className="text-sm space-x-2 text-gray-600">
        {data.email && <span>{data.email}</span>}
        {data.email && data.phone && <span>|</span>}
        {data.phone && <span>{data.phone}</span>}
        {(data.email || data.phone) && data.location && <span>|</span>}
        {data.location && <span>{data.location}</span>}
      </div>
    </div>

    {data.summary && (
      <div className="mb-6 text-center max-w-2xl mx-auto">
        <p className="text-sm leading-relaxed">{data.summary?.substring(0, 1500)}</p>
      </div>
    )}

    {data.experience?.some(e => e.jobTitle || e.company) && (
      <div className="mb-6">
        <h2 className="text-lg font-semibold uppercase text-center border-b border-gray-200 pb-1 mb-4 tracking-widest">
          Experience
        </h2>
        <div className="space-y-4">
          {data.experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-center">
                <span className="font-bold text-md">{exp.jobTitle}</span>
                <span className="italic text-sm">
                  {exp.startDate} – {exp.endDate}
                </span>
              </div>
              <div className="text-md italic mb-1">{exp.company}</div>
              <ul className="text-sm list-disc pl-5 space-y-1">
                {exp.responsibilities
                  .split("\n")
                  .map((line, i) =>
                    line.trim() ? <li key={i}>{line}</li> : null,
                  )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )}

    {data.education?.some(e => e.degree || e.institution) && (
      <div className="mb-6">
        <h2 className="text-lg font-semibold uppercase text-center border-b border-gray-200 pb-1 mb-4 tracking-widest">
          Education
        </h2>
        <div className="space-y-2">
          {data.education.map((edu) => (
            <div key={edu.id} className="flex justify-between items-baseline">
              <div>
                <span className="font-bold">{edu.institution}</span> —{" "}
                <span>{edu.degree}</span>
              </div>
              <span className="italic text-sm">{edu.year}</span>
            </div>
          ))}
        </div>
      </div>
    )}

    {data.projects && data.projects?.some(p => p.name || p.description) && (
      <div className="mb-6">
        <h2 className="text-lg font-semibold uppercase text-center border-b border-gray-200 pb-1 mb-4 tracking-widest">
          Projects
        </h2>
        <div className="space-y-4">
          {data.projects.map((proj) => (
            <div key={proj.id}>
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-md">{proj.name}</span>
                {proj.link && (
                  <span className="italic text-sm text-gray-500">
                    {proj.link}
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed">{proj.description}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    {data.certifications && data.certifications?.some(c => c.name || c.issuer) && (
      <div className="mb-6">
        <h2 className="text-lg font-semibold uppercase text-center border-b border-gray-200 pb-1 mb-4 tracking-widest">
          Certifications
        </h2>
        <div className="space-y-2">
          {data.certifications.map((cert) => (
            <div key={cert.id} className="flex justify-between items-baseline">
              <div>
                <span className="font-bold">{cert.name}</span> —{" "}
                <span>{cert.issuer}</span>
              </div>
              <span className="italic text-sm">{cert.year}</span>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

export const CleanSidebarTemplate = ({
  data,
  color,
}: {
  data: ResumeData;
  color: string;
}) => (
  <div className="font-sans text-gray-800 bg-white w-full min-h-full box-border flex flex-row">
    {/* Sidebar */}
    <div className="w-[35%] bg-slate-50 p-[12mm] border-r border-slate-200 shrink-0 flex flex-col gap-8">
      {data.photoUrl && (
        <div className="flex justify-center">
          <img
            src={data.photoUrl}
            alt="Resume Profile"
            className="w-40 h-40 rounded-full object-cover border-4 shadow-sm"
            style={{ borderColor: color }}
          />
        </div>
      )}

      {/* Contact Info */}
      <div className="text-[13px] flex flex-col gap-3.5 font-medium text-slate-700">
        {data.email && (
          <span className="flex items-center gap-3">
            <Mail size={16} className="shrink-0" style={{ color }} /> <span className="break-all leading-tight">{data.email}</span>
          </span>
        )}
        {data.phone && (
          <span className="flex items-center gap-3">
            <Phone size={16} className="shrink-0" style={{ color }} /> <span>{data.phone}</span>
          </span>
        )}
        {data.location && (
          <span className="flex items-center gap-3">
            <MapPin size={16} className="shrink-0" style={{ color }} /> <span className="leading-tight">{data.location}</span>
          </span>
        )}
        {data.linkedin && (
          <span className="flex items-center gap-3">
            <Linkedin size={16} className="shrink-0" style={{ color }} /> <span className="break-all leading-tight">{data.linkedin}</span>
          </span>
        )}
        {data.website && (
          <span className="flex items-center gap-3">
            <Globe size={16} className="shrink-0" style={{ color }} /> <span className="break-all leading-tight">{data.website}</span>
          </span>
        )}
        {data.website && (
          <span className="flex items-center gap-3">
            <Globe size={16} className="shrink-0" style={{ color }} /> <span className="break-all leading-tight">{data.website}</span>
          </span>
        )}
      </div>

      {/* Skills */}
      {data.skills && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-slate-900 border-b-2 pb-2" style={{ borderBottomColor: color }}>
            Technical Skills
          </h2>
          <div className="flex flex-col gap-2.5 text-[13.5px] text-slate-700 font-medium">
            {data.skills.split(/,|\n|\//).slice(0, 50).map(s => s.trim()).filter(Boolean).map((skill, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }}></div>
                <span className="leading-snug"><span className="break-words whitespace-normal max-w-full">{skill}</span></span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education?.some((e) => e.degree || e.institution) && (
        <div>
           <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-slate-900 border-b-2 pb-2" style={{ borderBottomColor: color }}>
            Education
          </h2>
          <div className="flex flex-col gap-5">
            {data.education.map(edu => (
               <div key={edu.id}>
                 <div className="text-slate-900 font-bold text-[14px] leading-snug">{edu.degree}</div>
                 <div className="text-slate-600 text-[13px] mt-1 font-medium">{edu.institution}</div>
                 <div className="font-bold text-[11px] mt-1.5 uppercase tracking-wider" style={{ color }}>{edu.year}</div>
               </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications?.some((c) => c.name || c.issuer) && (
        <div>
           <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-slate-900 border-b-2 pb-2" style={{ borderBottomColor: color }}>
            Certifications
          </h2>
          <div className="flex flex-col gap-4">
            {data.certifications.map(cert => (
               <div key={cert.id}>
                 <div className="text-slate-900 font-bold text-[14px] leading-snug">{cert.name}</div>
                 <div className="text-slate-600 text-[13px] mt-1 font-medium">{cert.issuer}</div>
                 <div className="font-bold text-[11px] mt-1.5 uppercase tracking-wider" style={{ color }}>{cert.year}</div>
               </div>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* Main Content */}
    <div className="w-[65%] p-[12mm]">
      <div className="mb-10">
        <h1 className="text-[42px] leading-[1.1] font-black tracking-tight text-slate-900 mb-2.5 uppercase">
          {data.name?.substring(0, 80) || "Your Name"}
        </h1>
        <div className="text-xl font-bold tracking-tight" style={{ color }}>
          {data.title?.substring(0, 150) || "Professional Title"}
        </div>
      </div>

      {data.summary && (
        <div className="mb-10">
          <h2 className="text-[17px] font-bold uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-2.5">
            <User size={22} style={{ color }} /> Summary
          </h2>
          <p className="text-slate-700 leading-[1.7] text-[14px] text-justify">
            {data.summary?.substring(0, 1500)}
          </p>
        </div>
      )}

      {data.experience && data.experience?.some((e) => e.jobTitle || e.company) && (
        <div className="mb-10">
          <h2 className="text-[17px] font-bold uppercase tracking-widest text-slate-900 mb-6 flex items-center gap-2.5">
            <Briefcase size={22} style={{ color }} /> Experience
          </h2>
          <div className="flex flex-col gap-8">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1.5">
                  <h3 className="font-bold text-slate-900 text-[16px] leading-tight pr-4">{exp.jobTitle}</h3>
                  <div className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 bg-slate-100 rounded text-slate-600 whitespace-nowrap shrink-0 mt-0.5">
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>
                <div className="text-[14.5px] font-bold mb-3.5" style={{ color }}>{exp.company}</div>
                <ul className="list-disc pl-5 space-y-2.5 text-slate-700 text-[13.5px] marker:text-slate-300 leading-relaxed">
                  {exp.responsibilities.split('\n').map((line, i) => line.trim() ? <li key={i}>{line}</li> : null)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.projects && data.projects?.some((p) => p.name || p.description) && (
        <div className="mb-8">
          <h2 className="text-[17px] font-bold uppercase tracking-widest text-slate-900 mb-6 flex items-center gap-2.5">
            <FolderGit2 size={22} style={{ color }} /> Projects
          </h2>
          <div className="flex flex-col gap-6">
            {data.projects.map(proj => (
              <div key={proj.id}>
                 <div className="flex justify-between items-baseline mb-1.5">
                    <h3 className="font-bold text-slate-900 text-[15px]">{proj.name}</h3>
                    {proj.link && (
                      <span className="text-[12px] font-mono text-slate-500 bg-slate-50 px-2 py-0.5 border border-slate-100 rounded">{proj.link}</span>
                    )}
                 </div>
                 <p className="text-slate-700 leading-relaxed text-[13.5px]">
                   {proj.description}
                 </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

export const ModernProTemplate = ({
  data,
  color,
}: {
  data: ResumeData;
  color: string;
}) => (
  <div className="font-dm-sans text-[#555] bg-white w-full min-h-full box-border flex flex-col justify-start items-stretch text-left break-inside-avoid">
    {/* Header */}
    <div className="flex flex-col-reverse md:grid md:grid-cols-[1fr_100px] gap-6 items-start py-8 px-10 md:py-9 md:px-11 border-b border-[#ebebeb]">
      <div>
        <h1 className="font-serif text-[28px] md:text-[34px] font-normal text-[#1a1a1a] tracking-tight mb-1.5 leading-tight">
          {data.name?.substring(0, 80) || "Your Name"}
        </h1>
        <span 
          className="inline-block text-[11px] font-medium tracking-[0.1em] uppercase px-3.5 py-1 rounded-full mb-4.5"
          style={{ color: color, backgroundColor: color + '20' }}
        >
          {data.title?.substring(0, 150) || "Professional Title"}
        </span>
        <div className="flex flex-wrap gap-x-4.5 gap-y-2 mt-4">
          {data.email && (
            <span className="text-[12px] flex items-center gap-1.5 text-[#666]">
              <Mail size={12} className="text-[#888] shrink-0" />
              {data.email}
            </span>
          )}
          {data.phone && (
            <span className="text-[12px] flex items-center gap-1.5 text-[#666]">
              <Phone size={12} className="text-[#888] shrink-0" />
              {data.phone}
            </span>
          )}
          {data.location && (
            <span className="text-[12px] flex items-center gap-1.5 text-[#666]">
              <MapPin size={12} className="text-[#888] shrink-0" />
              {data.location}
            </span>
          )}
          {data.linkedin && (
            <span className="text-[12px] flex items-center gap-1.5 text-[#666]">
              <Linkedin size={12} className="text-[#888] shrink-0" />
              {data.linkedin}
            </span>
          )}
          {data.website && (
            <span className="text-[12px] flex items-center gap-1.5 text-[#666]">
              <Globe size={12} className="text-[#888] shrink-0" />
              {data.website}
            </span>
          )}
          {data.website && (
            <span className="text-[12px] flex items-center gap-1.5 text-[#666]">
              <Globe size={12} className="text-[#888] shrink-0" />
              {data.website}
            </span>
          )}
        </div>
      </div>
      <div className="w-[90px] h-[90px] rounded-xl bg-[#e9e8e3] border border-[#e0dfd9] flex items-center justify-center font-serif text-[28px] text-[#888] overflow-hidden">
        {data.photoUrl ? (
          <img src={data.photoUrl} alt="Resume Profile" className="w-full h-full object-cover" />
        ) : (
          data.name ? data.name.substring(0, 2).toUpperCase() : "AM"
        )}
      </div>
    </div>

    {/* Body */}
    <div className="flex flex-col md:grid md:grid-cols-[1fr_240px]">
      {/* Main Column */}
      <div className="py-8 px-10 md:py-[30px] md:pr-[40px] md:pl-[44px] border-b md:border-b-0 md:border-r border-[#ebebeb]">
          {data.summary && (
            <div className="mb-7">
              <p className="text-[10px] font-medium tracking-[0.13em] uppercase text-[#aaa] mb-3.5 pb-2 border-b border-[#ebebeb]">
                Summary
              </p>
              <p className="text-[13px] leading-[1.8] text-[#555] text-justify">
                {data.summary?.substring(0, 1500)}
              </p>
            </div>
          )}

          {data.experience?.some(e => e.jobTitle || e.company) && (
            <div className="mb-7">
              <p className="text-[10px] font-medium tracking-[0.13em] uppercase text-[#aaa] mb-3.5 pb-2 border-b border-[#ebebeb]">
                Experience
              </p>
              {data.experience.map(exp => (
                <div key={exp.id} className="mb-[22px]">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-1 md:mb-[2px] gap-1">
                    <span className="text-[14px] font-medium text-[#1a1a1a]">{exp.jobTitle}</span>
                    <span className="text-[11px] text-[#aaa] whitespace-nowrap">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <p className="text-[12px] mb-[10px]" style={{ color }}>{exp.company}</p>
                  <ul className="list-none p-0 m-0">
                    {exp.responsibilities.split('\n').map((line, i) => line.trim() ? (
                      <li key={i} className="text-[12.5px] leading-[1.7] text-[#555] pl-[14px] relative mb-[5px] before:content-[''] before:absolute before:left-0 before:top-[8px] before:w-[4px] before:h-[4px] before:rounded-full before:bg-[#ccc]">
                        {line}
                      </li>
                    ) : null)}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {data.projects?.some(p => p.name || p.description) && (
            <div className="mb-7">
              <p className="text-[10px] font-medium tracking-[0.13em] uppercase text-[#aaa] mb-3.5 pb-2 border-b border-[#ebebeb]">
                Projects
              </p>
              {data.projects.map(proj => (
                <div key={proj.id} className="bg-[#f8f7f4] border border-[#ebebeb] rounded-[10px] py-[14px] px-[16px] mb-[10px]">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-[6px] gap-1 sm:gap-3">
                    <span className="text-[13px] font-medium text-[#1a1a1a]">{proj.name}</span>
                    {proj.link && (
                      <span className="text-[11px] whitespace-nowrap" style={{ color }}>{proj.link.replace(/^https?:\/\//i, '')}</span>
                    )}
                  </div>
                  <p className="text-[12px] leading-[1.65] text-[#666]">{proj.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Side Column */}
        <div className="py-8 px-8 md:py-[30px] md:pr-[26px] md:pl-[26px] print:py-8 print:px-6">
          {data.skills && (
            <div className="mb-7">
              <p className="text-[10px] font-medium tracking-[0.13em] uppercase text-[#aaa] mb-3.5 pb-2 border-b border-[#ebebeb]">
                Skills
              </p>
              <div className="mb-4">
                <div className="flex flex-wrap gap-[5px]">
                  {data.skills.split(/,|\n|\//).slice(0, 50).map(s => s.trim()).filter(Boolean).map((skill, i) => (
                    <span key={i} className="text-[11px] py-1 px-[10px] rounded-full border border-[#e0dfd9] text-[#555] bg-white"><span className="break-words whitespace-normal max-w-full">{skill}</span></span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {data.education?.some(e => e.degree || e.institution) && (
            <div className="mb-7">
              <p className="text-[10px] font-medium tracking-[0.13em] uppercase text-[#aaa] mb-3.5 pb-2 border-b border-[#ebebeb]">
                Education
              </p>
              {data.education.map(edu => (
                <div key={edu.id} className="mb-4">
                  <p className="text-[13px] font-medium text-[#1a1a1a] mb-[2px]">{edu.degree}</p>
                  <p className="text-[12px] text-[#666] mb-[1px]">{edu.institution}</p>
                  <p className="text-[11px] text-[#aaa]">{edu.year}</p>
                </div>
              ))}
            </div>
          )}

          {data.certifications?.some(c => c.name || c.issuer) && (
            <div className="mb-7">
              <p className="text-[10px] font-medium tracking-[0.13em] uppercase text-[#aaa] mb-3.5 pb-2 border-b border-[#ebebeb]">
                Certifications
              </p>
              {data.certifications.map(cert => (
                <div key={cert.id} className="flex items-start gap-2 mb-[10px]">
                  <div className="w-[6px] h-[6px] rounded-full mt-[5px] shrink-0" style={{ backgroundColor: color }}></div>
                  <div className="flex-1">
                    <span className="text-[12px] text-[#555] leading-[1.5] block">{cert.name}</span>
                    {cert.issuer && <span className="text-[10px] text-[#aaa] block mt-0.5">{cert.issuer} {cert.year}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
  </div>
);

export const ExecutiveTemplate = ({ data, color }: { data: ResumeData; color: string }) => (
  <div className="font-serif bg-white text-gray-900 w-full min-h-full p-[15mm] box-border">
    <div className="border-b-4 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6" style={{ borderColor: color }}>
      <div className="flex items-center gap-6">
        {data.photoUrl && (
          <img src={data.photoUrl} alt="Resume Profile" className="w-20 h-20 rounded-full object-cover shadow-sm" />
        )}
        <div>
          <h1 className="text-4xl font-light tracking-wide uppercase mb-2">{data.name?.substring(0, 80) || "Executive Name"}</h1>
          <h2 className="text-xl text-gray-600 tracking-widest uppercase">{data.title?.substring(0, 150) || "Executive Role"}</h2>
        </div>
      </div>
      <div className="text-right text-sm font-sans text-gray-500">
        {data.email && <div>{data.email}</div>}
        {data.phone && <div>{data.phone}</div>}
        {data.location && <div>{data.location}</div>}
        {data.linkedin && <div>{data.linkedin}</div>}
        {data.website && <div>{data.website}</div>}
        {data.website && <div>{data.website}</div>}
      </div>
    </div>

    {data.summary && (
      <div className="mb-8">
        <p className="text-lg leading-relaxed">{data.summary?.substring(0, 1500)}</p>
      </div>
    )}

    {data.experience && data.experience.length > 0 && (
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-4">
          <span className="uppercase tracking-widest text-sm text-gray-500">Professional Experience</span>
          <div className="h-px w-full bg-gray-200"></div>
        </h3>
        <div className="space-y-8">
          {data.experience.map(exp => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="text-xl font-medium" style={{ color }}>{exp.jobTitle}</h4>
                <span className="text-sm text-gray-500 font-sans tracking-wider">{exp.startDate} – {exp.endDate}</span>
              </div>
              <div className="text-lg text-gray-700 italic mb-3">{exp.company}</div>
              <ul className="list-none space-y-2 font-sans text-gray-700">
                {exp.responsibilities.split("\n").filter(Boolean).map((line, i) => (
                  <li key={i} className="flex gap-3">
                    <span style={{ color }}>&#x2022;</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )}

    <div className="grid grid-cols-2 gap-8 mb-8">
      {data.education && data.education.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-4">
            <span className="uppercase tracking-widest text-sm text-gray-500">Education</span>
            <div className="h-px w-full bg-gray-200"></div>
          </h3>
          <div className="space-y-4">
            {data.education.map(edu => (
              <div key={edu.id}>
                <h4 className="text-lg font-medium" style={{ color }}>{edu.institution}</h4>
                <p className="text-gray-700">{edu.degree}</p>
                <p className="text-sm font-sans text-gray-500">{edu.year}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {data.skills && (
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-6 flex items-center gap-4">
            <span className="uppercase tracking-widest text-sm text-gray-500">Skills</span>
            <div className="h-px w-full bg-gray-200"></div>
          </h3>
          <p className="font-sans text-gray-700 leading-relaxed break-words whitespace-normal">{data.skills.split(/,|\n|\//).slice(0, 50).join(' • ')}</p>
        </div>
      )}
    </div>
  </div>
);

export const DesignerTemplate = ({ data, color }: { data: ResumeData; color: string }) => (
  <div className="font-sans bg-[#F9F9F9] text-gray-800 w-full min-h-full p-[15mm]">
    <div className="flex gap-8 mb-12">
      <div className="flex-1">
        <h1 className="text-5xl font-extrabold tracking-tighter mb-4" style={{ color }}>{data.name?.substring(0, 80) || "Creative Name"}</h1>
        <h2 className="text-2xl font-medium text-gray-500 mb-6">{data.title?.substring(0, 150) || "Creative Role"}</h2>
        {data.summary && <p className="text-gray-600 leading-relaxed text-lg max-w-xl">{data.summary?.substring(0, 1500)}</p>}
      </div>
      {data.photoUrl && (
        <div className="w-[150px] shrink-0">
          <img src={data.photoUrl} alt="Resume Profile" className="w-full aspect-square object-cover rounded-2xl grayscale" />
        </div>
      )}
    </div>

    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-4 space-y-10">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Contact</h3>
          <ul className="space-y-3 text-sm text-gray-700">
            {data.email && <li className="break-all">{data.email}</li>}
            {data.phone && <li>{data.phone}</li>}
            {data.location && <li>{data.location}</li>}
            {data.linkedin && <li className="break-all">{data.linkedin}</li>}
            {data.website && <li className="break-all">{data.website}</li>}
            {data.website && <li className="break-all">{data.website}</li>}
          </ul>
        </div>
        
        {data.skills && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.split(/,|\n|\//).slice(0, 50).filter(Boolean).map((skill, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: color }}><span className="break-words whitespace-normal max-w-full">{skill.trim()}</span></span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="col-span-8 space-y-12">
        {data.experience && data.experience.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 pb-2 border-b-2" style={{ borderColor: color }}>Experience</h3>
            <div className="space-y-8">
              {data.experience.map(exp => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-gray-200">
                  <div className="absolute w-3 h-3 rounded-full -left-[7px] top-1" style={{ backgroundColor: color }}></div>
                  <h4 className="text-xl font-bold text-gray-900">{exp.jobTitle}</h4>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium" style={{ color }}>{exp.company}</span>
                    <span className="text-sm text-gray-500 font-mono">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <ul className="list-none space-y-2 text-gray-600">
                    {exp.responsibilities.split("\n").filter(Boolean).map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

export const NotionTemplate = ({ data, color }: { data: ResumeData; color: string }) => (
  <div className="font-sans bg-white text-[#37352f] w-full min-h-full p-[15mm]">
    <div className="max-w-3xl mx-auto">
      {data.photoUrl ? (
        <img src={data.photoUrl} alt="Resume Profile" className="w-32 h-32 rounded-xl object-cover mb-8" />
      ) : (
        <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-4xl mb-8">📄</div>
      )}
      
      <h1 className="text-4xl font-bold mb-4">{data.name?.substring(0, 80) || "Your Name"}</h1>
      
      <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-6">
        <div className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded text-sm text-gray-500">
          💼 <span className="font-medium text-[#37352f]">{data.title?.substring(0, 150) || "Your Role"}</span>
        </div>
        {data.email && (
          <div className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded text-sm text-gray-500">
            ✉️ {data.email}
          </div>
        )}
        {data.location && (
          <div className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded text-sm text-gray-500">
            📍 {data.location}
          </div>
        )}
        {data.phone && (
          <div className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded text-sm text-gray-500">
            📱 {data.phone}
          </div>
        )}
      </div>

      {data.summary && (
        <div className="mb-8">
          <p className="text-[#37352f] text-lg leading-relaxed">{data.summary?.substring(0, 1500)}</p>
        </div>
      )}

      {data.experience && data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
            <span className="p-1 rounded bg-gray-100 text-sm">🛠️</span> Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id} className="p-4 rounded-lg bg-[#fbfbfa] border border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{exp.jobTitle}</h3>
                    <div className="text-gray-500 text-sm">{exp.company}</div>
                  </div>
                  <div className="text-xs font-mono text-gray-500 bg-gray-200 px-2 py-1 rounded">
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>
                <div className="pl-4 border-l-2 border-gray-200 mt-3 space-y-2">
                  {exp.responsibilities.split("\n").filter(Boolean).map((line, i) => (
                    <p key={i} className="text-[#37352f] leading-normal">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-8 mb-8">
        {data.education && data.education.length > 0 && (
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <span className="p-1 rounded bg-gray-100 text-sm">🎓</span> Education
            </h2>
            <div className="space-y-4">
              {data.education.map(edu => (
                <div key={edu.id}>
                  <h3 className="font-bold">{edu.degree}</h3>
                  <div className="text-sm text-gray-500">{edu.institution} • {edu.year}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {data.skills && (
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <span className="p-1 rounded bg-gray-100 text-sm">⚡</span> Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.split(/,|\n|\//).slice(0, 50).filter(Boolean).map((skill, i) => (
                <span key={i} className="px-2 py-1 bg-[#f1f1ef] text-[#37352f] text-sm rounded"><span className="break-words whitespace-normal max-w-full">{skill.trim()}</span></span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

export const ModernMinimalistTemplate = ({
  data,
  color,
}: {
  data: ResumeData;
  color: string;
}) => (
  <div className="font-sans text-slate-800 bg-white w-full min-h-full box-border p-[14mm] grid grid-cols-[1fr_2fr] gap-10">
    <div className="flex flex-col gap-10">
      <div>
        {data.photoUrl && (
          <img src={data.photoUrl} alt="Resume Profile" className="w-24 h-24 rounded-full object-cover mb-6 border-[3px]" style={{ borderColor: color }} />
        )}
        <h1 className="text-4xl font-extrabold tracking-tighter text-slate-900 leading-none mb-3">
          {data.name?.substring(0, 80) || "Your Name"}
        </h1>
        <p className="text-lg font-medium text-slate-500 uppercase tracking-widest text-[11px]" style={{ color }}>
          {data.title?.substring(0, 150) || "Job Title"}
        </p>
      </div>

      <div className="flex flex-col gap-3 text-[13px] text-slate-500">
        {data.email && <span className="flex items-center gap-2"><Mail size={14}/> {data.email}</span>}
        {data.phone && <span className="flex items-center gap-2"><Phone size={14}/> {data.phone}</span>}
        {data.location && <span className="flex items-center gap-2"><MapPin size={14}/> {data.location}</span>}
        {data.linkedin && <span className="flex items-center gap-2"><Linkedin size={14}/> {data.linkedin}</span>}
        {data.website && <span className="flex items-center gap-2"><Globe size={14}/> {data.website}</span>}
        {data.website && <span className="flex items-center gap-2"><Globe size={14}/> {data.website}</span>}
      </div>

      {data.skills && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 pb-2 border-b border-slate-200">Skills</h2>
          <div className="flex flex-col gap-2 text-[13px] text-slate-600">
            {data.skills.split(/,|\n|\//).slice(0, 50).map(s => s.trim()).filter(Boolean).map((skill, i) => (
              <span key={i} className="font-medium"><span className="break-words whitespace-normal max-w-full">{skill}</span></span>
            ))}
          </div>
        </div>
      )}

      {data.education && data.education.some(e => e.degree || e.institution) && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 pb-2 border-b border-slate-200">Education</h2>
          <div className="flex flex-col gap-5">
            {data.education.map(edu => (
              <div key={edu.id}>
                <div className="font-bold text-[13px] text-slate-800 leading-tight mb-1">{edu.degree}</div>
                <div className="text-[12px] text-slate-500 mb-1">{edu.institution}</div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{edu.year}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

    <div className="flex flex-col gap-10">
      {data.summary && (
        <div>
           <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 pb-2 border-b border-slate-200">Profile</h2>
           <p className="text-[14px] leading-relaxed text-slate-600">{data.summary?.substring(0, 1500)}</p>
        </div>
      )}

      {data.experience && data.experience.some(e => e.jobTitle || e.company) && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 pb-2 border-b border-slate-200">Experience</h2>
          <div className="flex flex-col gap-8">
            {data.experience.map(exp => (
              <div key={exp.id} className="relative">
                <div className="absolute -left-[27px] top-[6px] w-[6px] h-[6px] rounded-full" style={{ backgroundColor: color }} />
                <div className="flex justify-between items-baseline mb-2">
                  <div>
                    <h3 className="font-bold text-[15px] text-slate-900 leading-tight">{exp.jobTitle}</h3>
                    <div className="text-[14px] font-medium mt-1" style={{ color }}>{exp.company}</div>
                  </div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">
                    {exp.startDate} – {exp.endDate}
                  </div>
                </div>
                <ul className="text-[13px] text-slate-600 space-y-1.5 pl-4 list-disc marker:text-slate-300">
                  {exp.responsibilities.split("\n").map((line, i) => line.trim() ? <li key={i} className="pl-1">{line}</li> : null)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

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
          <img src={data.photoUrl} alt="Resume Profile" className="w-32 h-32 rounded-full object-cover shadow-sm mb-4 border-[4px] border-white" />
        ) : (
          <div className="w-32 h-32 rounded-full bg-slate-200 shadow-sm mb-4 flex items-center justify-center text-slate-400">Photo</div>
        )}
      </div>

      <div className="flex flex-col gap-4 text-sm break-words">
        {data.email && <div className="flex flex-col"><span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email</span><span>{data.email}</span></div>}
        {data.phone && <div className="flex flex-col"><span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Phone</span><span>{data.phone}</span></div>}
        {data.location && <div className="flex flex-col"><span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Location</span><span>{data.location}</span></div>}
        {data.linkedin && <div className="flex flex-col"><span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">LinkedIn</span><span>{data.linkedin}</span></div>}
        {data.website && <div className="flex flex-col"><span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Website</span><span>{data.website}</span></div>}
        {data.website && <div className="flex flex-col"><span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Website</span><span>{data.website}</span></div>}
      </div>

      {data.skills && (
        <div className="mt-10">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-slate-300 pb-2" style={{ color }}>Skills</h2>
          <div className="flex flex-col gap-2 text-sm">
            {data.skills.split(/,|\n|\//).slice(0, 50).map(s => s.trim()).filter(Boolean).map((skill, i) => (
              <span key={i}><span className="break-words whitespace-normal max-w-full">{skill}</span></span>
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
        <img src={data.photoUrl} alt="Resume Profile" className="w-36 h-36 rounded-2xl object-cover shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] border border-slate-200" style={{ boxShadow: `8px 8px 0px 0px ${color}40` }} />
      )}
      <div className="flex-1">
        <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-2">{data.name?.substring(0, 80) || "Your Name"}</h1>
        <h2 className="text-2xl font-bold uppercase tracking-wider mb-4" style={{ color }}>{data.title?.substring(0, 150) || "Job Title"}</h2>
        
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 font-medium mt-4">
          {data.email && <span className="flex items-center gap-1.5"><Mail size={16} style={{ color }}/> {data.email}</span>}
          {data.phone && <span className="flex items-center gap-1.5"><Phone size={16} style={{ color }}/> {data.phone}</span>}
          {data.location && <span className="flex items-center gap-1.5"><MapPin size={16} style={{ color }}/> {data.location}</span>}
          {data.linkedin && <span className="flex items-center gap-1.5"><Linkedin size={16} style={{ color }}/> {data.linkedin}</span>}
          {data.website && <span className="flex items-center gap-1.5"><Globe size={16} style={{ color }}/> {data.website}</span>}
          {data.website && <span className="flex items-center gap-1.5"><Globe size={16} style={{ color }}/> {data.website}</span>}
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
              {data.skills.split(/,|\n|\//).slice(0, 50).map(s => s.trim()).filter(Boolean).map((skill, i) => (
                <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded hover:bg-slate-200 transition-colors"><span className="break-words whitespace-normal max-w-full">{skill}</span></span>
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
