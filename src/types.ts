export type Experience = {
  id: string;
  jobTitle: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
};

export type Education = {
  id: string;
  degree: string;
  institution: string;
  school?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  year: string;
  description?: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  link: string;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  year: string;
};

export type CoverLetterData = {
  recipientName: string;
  companyName: string;
  jobReference: string;
  body: string;
};

export type ResumeData = {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website?: string;
  summary: string;
  photoUrl?: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  skills: string;
  coverLetter: CoverLetterData;
};
