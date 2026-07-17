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

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  link: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
}

export interface DesignConfig {
  template: TemplateType;
  color: string;
  fontFamily?: string;
  headingFont: string;
  bodyFont: string;
  fontSize: string;
  lineHeight: string;
  spacing: string;
  pageStyle: string;
  showPhoto?: boolean;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: WorkExperience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  customSections?: CustomSection[];
  skills: string[];
  summary: string;
  design: DesignConfig;
}
