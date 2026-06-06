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
  skills: [],
  summary: "",
  design: {
    template: "professional-blue",
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
    const saved = localStorage.getItem("resume_data");
    return saved ? JSON.parse(saved) : defaultData;
  });

  useEffect(() => {
    localStorage.setItem("resume_data", JSON.stringify(data));
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
