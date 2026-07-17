import React, { createContext, useContext, useState, useEffect } from "react";
import { ResumeData } from "../types";

interface ResumeContextType {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
  updateSection: <K extends keyof ResumeData>(section: K, payload: ResumeData[K]) => void;
}

const defaultData: ResumeData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    phone: "",
    phoneCode: "+1",
    location: "",
    city: "",
    country: "",
    linkedin: "",
    portfolio: "",
    website: "",
    address: "",
  },
  experience: [],
  education: [],
  projects: [],
  certifications: [],
  languages: [],
  customSections: [],
  skills: [],
  summary: "",
  design: {
    template: "pro-classic",
    color: "#2563EB",
    headingFont: "Inter",
    bodyFont: "Inter",
    fontSize: "14px",
    lineHeight: "1.5",
    spacing: "normal",
    pageStyle: "classic",
  }
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem("resume_data");
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultData,
          ...parsed,
          personalInfo: { ...defaultData.personalInfo, ...(parsed.personalInfo || {}) },
          design: { ...defaultData.design, ...(parsed.design || {}) },
          experience: Array.isArray(parsed.experience) ? parsed.experience : [],
          education: Array.isArray(parsed.education) ? parsed.education : [],
          skills: Array.isArray(parsed.skills) ? parsed.skills : [],
          projects: Array.isArray(parsed.projects) ? parsed.projects : [],
          certifications: Array.isArray(parsed.certifications) ? parsed.certifications : [],
          languages: Array.isArray(parsed.languages) ? parsed.languages : [],
          customSections: Array.isArray(parsed.customSections) ? parsed.customSections : [],
        };
      }
    } catch {
      // Corrupt saved data must never crash the app — start fresh instead.
      localStorage.removeItem("resume_data");
    }
    return defaultData;
  });

  useEffect(() => {
    try {
      localStorage.setItem("resume_data", JSON.stringify(data));
    } catch { /* storage full/unavailable — keep the app running */ }
  }, [data]);

  const updateSection = <K extends keyof ResumeData>(section: K, payload: ResumeData[K]) => {
    setData((prev) => ({
      ...prev,
      [section]: payload,
    }));
  };

  return (
    <ResumeContext.Provider value={{ data, setData, updateSection }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) throw new Error("useResume must be used within ResumeProvider");
  return context;
};
