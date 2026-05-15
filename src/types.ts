export type TemplateType = string;

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  phoneCode: string;
  location: string;
  city: string;
  country: string;
  linkedin: string;
  portfolio: string;
  website: string;
  address: string;
  photoUrl?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  jobTitle: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  isPresent: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  fieldOfStudy: string;
  schoolName: string;
  city: string;
  country: string;
  startYear: string;
  endYear: string;
  description: string;
}

export interface DesignConfig {
  template: TemplateType;
  color: string;
  fontFamily: string;
  fontSize: string;
  spacing: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: WorkExperience[];
  education: Education[];
  skills: string[];
  summary: string;
  design: DesignConfig;
}

