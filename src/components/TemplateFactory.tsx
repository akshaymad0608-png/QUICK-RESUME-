import React from "react";
import { Mail, Phone, MapPin, Globe, Linkedin, User } from "lucide-react";
import { ResumeData } from "../types";

export const layouts = [
  "classic",
  "sidebar",
  "centered",
  "split",
  "minimalist",
] as const;
export const fonts = ["sans", "serif", "mono", "modern"] as const;
export const accents = ["none", "bg", "border", "text", "subtle"] as const;

export const generatedTemplates = layouts.flatMap((layout) =>
  fonts.flatMap((font) =>
    accents.map((accent) => ({
      id: `gen-${layout}-${font}-${accent}`,
      name: `${layout.charAt(0).toUpperCase() + layout.slice(1)} ${font} (${accent})`,
      component: (props: any) => (
        <TemplateFactory
          {...props}
          layout={layout}
          font={font}
          accent={accent}
        />
      ),
      type:
        layout === "classic" || layout === "minimalist" || font === "serif"
          ? "classic"
          : "modern",
    })),
  ),
);

export const TemplateFactory = ({
  data,
  color,
  layout = "classic",
  font = "sans",
  accent = "border",
}: {
  data: ResumeData;
  color: string;
  layout: "classic" | "sidebar" | "centered" | "split" | "minimalist";
  font: "sans" | "serif" | "mono" | "modern";
  accent: "none" | "bg" | "border" | "text" | "subtle";
}) => {
  const fontClasses = {
    sans: "font-sans",
    serif: "font-serif",
    mono: "font-mono",
    modern: "font-sans tracking-tight",
  };

  const currentFont = fontClasses[font] || "font-sans";

  const renderHeader = () => {
    switch (layout) {
      case "centered":
        return (
          <div
            className={`text-center mb-8 pb-6 ${accent === "border" ? "border-b-4" : ""} ${accent === "bg" ? "p-[12mm] text-white rounded-b-xl" : ""}`}
            style={{
              borderColor: color,
              backgroundColor: accent === "bg" ? color : "transparent",
            }}
          >
            {data.photoUrl && (
              <img
                src={data.photoUrl}
                alt="Resume Profile"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2"
                style={{ borderColor: accent !== "bg" ? color : "white" }}
              />
            )}
            <h1
              className={`text-4xl font-bold uppercase ${accent === "text" ? "" : accent === "bg" ? "text-white" : "text-slate-900"}`}
              style={{ color: accent === "text" ? color : undefined }}
            >
              {data.name || "Your Name"}
            </h1>
            <p
              className={`text-xl mt-2 ${accent === "bg" ? "text-white/90" : "text-slate-600"}`}
              style={{
                color:
                  accent === "text" && layout !== "centered"
                    ? color
                    : undefined,
              }}
            >
              {data.title || "Professional Title"}
            </p>
            <div
              className={`mt-4 flex flex-wrap justify-center gap-4 text-sm ${accent === "bg" ? "text-white/80" : "text-slate-500"}`}
            >
              {data.email && <span>{data.email}</span>}
              {data.phone && <span>{data.phone}</span>}
              {data.location && <span>{data.location}</span>}
            </div>
          </div>
        );
      case "sidebar":
      case "split":
        return (
          <div
            className={`mb-8 ${accent === "bg" ? "p-[12mm] text-white" : ""}`}
            style={{ backgroundColor: accent === "bg" ? color : "transparent" }}
          >
            <div className="flex items-center gap-6">
              {data.photoUrl && (
                <img
                  src={data.photoUrl}
                  alt="Resume Profile"
                  className="w-28 h-28 rounded-full object-cover shadow-sm"
                />
              )}
              <div>
                <h1
                  className={`text-5xl font-black uppercase ${accent === "text" ? "" : accent === "bg" ? "text-white" : "text-slate-900"}`}
                  style={{ color: accent === "text" ? color : undefined }}
                >
                  {data.name || "Your Name"}
                </h1>
                <p
                  className={`text-2xl mt-2 ${accent === "bg" ? "text-white/90" : "text-slate-600"}`}
                  style={{ color: accent === "text" ? color : undefined }}
                >
                  {data.title || "Professional Title"}
                </p>
              </div>
            </div>
          </div>
        );
      case "minimalist":
        return (
          <div className="flex justify-between items-end mb-10 border-b pb-4">
            <div>
              <h1 className="text-3xl font-light text-slate-800">
                {data.name || "Your Name"}
              </h1>
              <p className="text-lg font-bold mt-1" style={{ color }}>
                {data.title || "Professional Title"}
              </p>
            </div>
            <div className="text-right text-xs text-slate-500 space-y-1">
              {data.email && <div>{data.email}</div>}
              {data.phone && <div>{data.phone}</div>}
              {data.location && <div>{data.location}</div>}
            </div>
          </div>
        );
      default: // classic
        return (
          <div
            className={`mb-8 pb-6 flex justify-between ${accent === "border" ? "border-b-2" : ""}`}
            style={{ borderColor: color }}
          >
            <div>
              <h1
                className="text-4xl font-bold text-slate-900 uppercase tracking-wider"
                style={{ color: accent === "text" ? color : undefined }}
              >
                {data.name || "Your Name"}
              </h1>
              <p className="text-xl mt-1 text-slate-600">
                {data.title || "Professional Title"}
              </p>
            </div>
            <div className="text-right text-sm text-slate-500 pt-2 space-y-1">
              {data.email && (
                <div className="flex items-center justify-end gap-2">
                  <span>{data.email}</span>
                  <Mail size={14} style={{ color }} />
                </div>
              )}
              {data.phone && (
                <div className="flex items-center justify-end gap-2">
                  <span>{data.phone}</span>
                  <Phone size={14} style={{ color }} />
                </div>
              )}
              {data.location && (
                <div className="flex items-center justify-end gap-2">
                  <span>{data.location}</span>
                  <MapPin size={14} style={{ color }} />
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  const renderSectionHeading = (title: string) => {
    switch (accent) {
      case "bg":
        return (
          <h2
            className="text-lg font-bold text-white px-3 py-1 mb-4 inline-block rounded"
            style={{ backgroundColor: color }}
          >
            {title}
          </h2>
        );
      case "border":
        return (
          <h2
            className="text-lg font-bold text-slate-900 border-l-4 pl-3 mb-4 uppercase tracking-wider"
            style={{ borderColor: color }}
          >
            {title}
          </h2>
        );
      case "text":
        return (
          <h2
            className="text-xl font-bold mb-4 uppercase tracking-wider"
            style={{ color }}
          >
            {title}
          </h2>
        );
      case "subtle":
        return (
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-200 pb-2">
            {title}
          </h2>
        );
      default:
        return (
          <h2
            className="text-lg font-bold text-slate-900 mb-4 uppercase border-b-2 pb-1"
            style={{ borderColor: color }}
          >
            {title}
          </h2>
        );
    }
  };

  return (
    <div
      className={`bg-white w-full h-full box-border ${currentFont} text-slate-800 text-sm leading-relaxed p-[12mm]`}
      style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
    >
      {/* Template content container */}
      {layout === "sidebar" ? (
        <div className="flex gap-8 h-full">
          <div
            className="w-1/3 space-y-8 border-r pr-8"
            style={{ borderColor: accent === "border" ? color : "#e2e8f0" }}
          >
            {data.photoUrl && !["bg"].includes(accent) && (
              <div className="mb-6">
                <img
                  src={data.photoUrl}
                  alt="Resume Profile"
                  className="w-full aspect-square object-cover rounded-xl shadow-sm"
                />
              </div>
            )}
            <div>
              <h1
                className="text-3xl font-bold leading-tight"
                style={{ color: accent === "text" ? color : undefined }}
              >
                {data.name || "YOUR NAME"}
              </h1>
              <p className="text-lg font-medium text-slate-500 mt-2">
                {data.title || "TITLE"}
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-600 break-words">
              {data.email && (
                <div className="flex items-center gap-2 mt-4">
                  <Mail size={14} style={{ color }} /> <span>{data.email}</span>
                </div>
              )}
              {data.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={14} style={{ color }} />{" "}
                  <span>{data.phone}</span>
                </div>
              )}
              {data.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} style={{ color }} />{" "}
                  <span>{data.location}</span>
                </div>
              )}
              {data.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin size={14} style={{ color }} />{" "}
                  <span>{data.linkedin}</span>
                </div>
              )}
              {/* website removed */}
            </div>

            {data.skills && (
              <div className="mt-8">
                {renderSectionHeading("Skills")}
                <div className="flex flex-col gap-2">
                  {data.skills
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .map((skill, i) => (
                      <span
                        key={i}
                        className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-md text-xs font-medium border-l-2"
                        style={{ borderColor: color }}
                      >
                        {skill}
                      </span>
                    ))}
                </div>
              </div>
            )}

            {data.education && data.education?.some(e => e.degree || e.institution) && (
              <div className="mt-8">
                {renderSectionHeading("Education")}
                <div className="space-y-4">
                  {data.education.map((edu) => (
                    <div key={edu.id}>
                      <div className="font-bold text-slate-900">
                        {edu.degree}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
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

          <div className="w-2/3 space-y-8">
            {data.summary && (
              <div>
                {renderSectionHeading("Profile")}
                <p className="text-slate-600 text-sm leading-relaxed">
                  {data.summary}
                </p>
              </div>
            )}

            {data.experience && data.experience?.some(e => e.jobTitle || e.company) && (
              <div>
                {renderSectionHeading("Experience")}
                <div className="space-y-6">
                  {data.experience.map((exp) => (
                    <div
                      key={exp.id}
                      className="relative pl-4 border-l select-none"
                      style={{
                        borderColor: accent === "subtle" ? "#e2e8f0" : color,
                      }}
                    >
                      <div
                        className="absolute w-2 h-2 rounded-full -left-[4.5px] top-1.5 bg-white border-2"
                        style={{ borderColor: color }}
                      ></div>
                      <h3 className="font-bold text-lg text-slate-900">
                        {exp.jobTitle}
                      </h3>
                      <div className="flex justify-between items-center text-sm font-medium mt-1 mb-2">
                        <span style={{ color }}>{exp.company}</span>
                        <span className="text-slate-400 text-xs bg-slate-50 px-2 py-0.5 rounded-full">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <ul className="text-sm text-slate-600 space-y-1.5 list-disc pl-4 marker:text-slate-300">
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
      ) : (
        // Other layouts
        <div>
          {renderHeader()}

          {layout === "split" || layout === "centered" ? (
            <div className="flex gap-8">
              <div className="w-2/3 space-y-8">
                {data.summary && (
                  <div>
                    {renderSectionHeading("About Me")}
                    <p className="text-slate-600 text-justify">
                      {data.summary}
                    </p>
                  </div>
                )}

                {data.experience && data.experience?.some(e => e.jobTitle || e.company) && (
                  <div>
                    {renderSectionHeading("Experience")}
                    <div className="space-y-6">
                      {data.experience.map((exp) => (
                        <div key={exp.id}>
                          <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-slate-900 text-lg">
                              {exp.jobTitle}
                            </h3>
                            <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded">
                              {exp.startDate} - {exp.endDate}
                            </span>
                          </div>
                          <div
                            className="font-medium mb-3 mt-1"
                            style={{
                              color: accent === "text" ? color : undefined,
                            }}
                          >
                            {exp.company}
                          </div>
                          <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                            {exp.responsibilities}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="w-1/3 space-y-8">
                {data.skills && (
                  <div>
                    {renderSectionHeading("Expertise")}
                    <div className="flex flex-wrap gap-2">
                      {data.skills
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean)
                        .map((skill, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs border rounded-sm font-medium"
                            style={{ borderColor: color, color }}
                          >
                            {skill}
                          </span>
                        ))}
                    </div>
                  </div>
                )}

                {data.education && data.education?.some(e => e.degree || e.institution) && (
                  <div>
                    {renderSectionHeading("Education")}
                    <div className="space-y-4">
                      {data.education.map((edu) => (
                        <div
                          key={edu.id}
                          className="bg-slate-50 p-4 rounded-lg border border-slate-100"
                        >
                          <div className="font-bold text-slate-900">
                            {edu.degree}
                          </div>
                          <div className="text-xs text-slate-600 mt-1">
                            {edu.institution}
                          </div>
                          <div
                            className="text-xs font-bold mt-2"
                            style={{ color }}
                          >
                            {edu.year}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Classic and Minimalist Single Column
            <div className="space-y-8">
              {data.summary && (
                <div>
                  {renderSectionHeading("Summary")}
                  <p className="text-slate-600 leading-relaxed">
                    {data.summary}
                  </p>
                </div>
              )}

              {data.experience && data.experience?.some(e => e.jobTitle || e.company) && (
                <div>
                  {renderSectionHeading("Experience")}
                  <div className="space-y-6">
                    {data.experience.map((exp, expIdx) => (
                      <div
                        key={exp.id}
                        className={
                          expIdx !== data.experience.length - 1
                            ? "border-b border-slate-100 pb-6"
                            : ""
                        }
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold text-lg text-slate-900">
                              {exp.jobTitle}
                            </h3>
                            <div className="font-medium" style={{ color }}>
                              {exp.company}
                            </div>
                          </div>
                          <span className="text-sm font-bold text-slate-400">
                            {exp.startDate} - {exp.endDate}
                          </span>
                        </div>
                        <ul className="text-slate-600 space-y-1.5 list-disc pl-5 mt-3 marker:text-slate-300">
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

              <div className="grid grid-cols-2 gap-8">
                {data.education && data.education?.some(e => e.degree || e.institution) && (
                  <div>
                    {renderSectionHeading("Education")}
                    <div className="space-y-4">
                      {data.education.map((edu) => (
                        <div key={edu.id}>
                          <div className="font-bold text-slate-900">
                            {edu.degree}
                          </div>
                          <div className="text-sm text-slate-600 my-1">
                            {edu.institution}
                          </div>
                          <div className="text-xs font-bold" style={{ color }}>
                            {edu.year}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {data.skills && (
                  <div>
                    {renderSectionHeading("Skills")}
                    <div className="flex flex-wrap gap-2">
                      {data.skills
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean)
                        .map((skill, i) => (
                          <span
                            key={i}
                            className="text-sm text-slate-700 bg-slate-50 px-3 py-1 rounded border border-slate-200"
                          >
                            {skill}
                          </span>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
