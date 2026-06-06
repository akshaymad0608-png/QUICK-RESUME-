export type TemplateVariant = 'Professional' | 'Modern' | 'Minimal' | 'Creative' | 'Colorful' | 'Executive' | 'Corporate' | 'Fresher' | 'Student' | 'Developer' | 'Designer' | 'Marketing' | 'Healthcare' | 'Finance' | 'Teacher' | 'Engineering' | 'ATS Friendly' | 'Two Column' | 'Infographic' | 'Google Docs Style';

export interface TemplateData {
  id: string;
  name: string;
  description: string;
  badge: 'Free' | 'Premium';
  variant: TemplateVariant;
  category: string;
  layout: 'classic' | 'modern' | 'minimal' | 'executive' | 'two-column' | 'sidebar' | 'timeline' | 'creative';
}

export const TEMPLATES: TemplateData[] = [
  { id: 'pro-classic', name: 'Classic Professional', description: 'Timeless layout for all industries.', badge: 'Free', variant: 'Professional', category: 'Professional' , layout: 'executive' },
  { id: 'pro-blue', name: 'Professional Blue', description: 'Classic resume with blue accents.', badge: 'Free', variant: 'Professional', category: 'Professional' , layout: 'classic' },
  { id: 'pro-corporate', name: 'Corporate Standard', description: 'Clean and structured.', badge: 'Premium', variant: 'Corporate', category: 'Corporate' , layout: 'classic' },
  { id: 'pro-executive', name: 'Executive Leader', description: 'Impactful layout for leaders.', badge: 'Premium', variant: 'Executive', category: 'Executive' , layout: 'executive' },
  { id: 'pro-finance', name: 'Finance Pro', description: 'Tailored for banking & finance.', badge: 'Free', variant: 'Finance', category: 'Finance' , layout: 'executive' },
  
  { id: 'modern-minimal', name: 'Modern Minimal', description: 'Clean heading and modern spacing.', badge: 'Free', variant: 'Modern', category: 'Modern' , layout: 'minimal' },
  { id: 'modern-crisp', name: 'Modern Crisp', description: 'Crisp and highly scannable.', badge: 'Free', variant: 'Modern', category: 'Modern' , layout: 'modern' },
  { id: 'modern-startup', name: 'Startup Ready', description: 'Dynamic layout for startups.', badge: 'Free', variant: 'Modern', category: 'Modern' , layout: 'modern' },
  { id: 'modern-orange', name: 'Modern Orange', description: 'Warm orange accents.', badge: 'Premium', variant: 'Colorful', category: 'Colorful' , layout: 'modern' },
  
  { id: 'minimal-black', name: 'Simple Black', description: 'Minimalist black and white.', badge: 'Free', variant: 'Minimal', category: 'Minimal' , layout: 'minimal' },
  { id: 'minimal-elegant', name: 'Elegant Clean', description: 'Elegant simplicity.', badge: 'Free', variant: 'Minimal', category: 'Minimal' , layout: 'minimal' },
  { id: 'minimal-lite', name: 'Extremely Lite', description: 'Extremely lightweight format.', badge: 'Free', variant: 'Minimal', category: 'Minimal' , layout: 'minimal' },
  { id: 'sky-blue-minimal', name: 'Sky Blue Minimal', description: 'Soft subtle blue layout.', badge: 'Free', variant: 'Colorful', category: 'Colorful' , layout: 'minimal' },
  
  { id: 'creative-sidebar', name: 'Color Sidebar', description: 'Left sidebar with accent color.', badge: 'Premium', variant: 'Two Column', category: 'Creative' , layout: 'creative' },
  { id: 'creative-red', name: 'Creative Red', description: 'Bold red accents for creative roles.', badge: 'Free', variant: 'Colorful', category: 'Colorful' , layout: 'creative' },
  { id: 'creative-pink', name: 'Pink Creative', description: 'Vibrant pink accents.', badge: 'Premium', variant: 'Colorful', category: 'Colorful' , layout: 'creative' },
  { id: 'creative-portfolio', name: 'Portfolio Display', description: 'Highlight visual projects.', badge: 'Premium', variant: 'Creative', category: 'Creative' , layout: 'creative' },
  
  { id: 'colorful-teal', name: 'Teal Corporate', description: 'Modern teal coloring.', badge: 'Premium', variant: 'Corporate', category: 'Colorful' , layout: 'classic' },
  { id: 'colorful-emerald', name: 'Emerald Green', description: 'Fresh green elegant layout.', badge: 'Free', variant: 'Modern', category: 'Colorful' , layout: 'classic' },
  { id: 'colorful-purple', name: 'Royal Purple', description: 'Luxury purple executive template.', badge: 'Premium', variant: 'Executive', category: 'Colorful' , layout: 'classic' },
  { id: 'colorful-navy', name: 'Navy Executive', description: 'Dark navy professional layout.', badge: 'Premium', variant: 'Executive', category: 'Colorful' , layout: 'classic' },
  { id: 'colorful-gold', name: 'Gold Executive', description: 'Premium gold accents.', badge: 'Premium', variant: 'Executive', category: 'Colorful' , layout: 'classic' },
  
  { id: 'exec-premium', name: 'Black Premium', description: 'Premium clean corporate layout.', badge: 'Premium', variant: 'Executive', category: 'Executive' , layout: 'executive' },
  { id: 'exec-formal', name: 'Executive Formal', description: 'Formal styling for senior roles.', badge: 'Free', variant: 'Executive', category: 'Executive' , layout: 'executive' },
  { id: 'exec-vp', name: 'VP Metrics Format', description: 'Focus on scaling metrics.', badge: 'Premium', variant: 'Executive', category: 'Executive' , layout: 'executive' },
  { id: 'exec-csuite', name: 'C-Suite Ultimate', description: 'Highest level clean design.', badge: 'Premium', variant: 'Executive', category: 'Executive' , layout: 'executive' },
  
  { id: 'corp-standard', name: 'Corporate Classic', description: 'Safe corporate standard.', badge: 'Free', variant: 'Corporate', category: 'Corporate' , layout: 'classic' },
  { id: 'corp-modern', name: 'Corporate Modern', description: 'Soft modern corporate look.', badge: 'Free', variant: 'Corporate', category: 'Corporate' , layout: 'modern' },
  { id: 'corp-structured', name: 'Structured Data', description: 'Data heavy corporate structure.', badge: 'Premium', variant: 'Corporate', category: 'Corporate' , layout: 'sidebar' },
  
  { id: 'fresher-basic', name: 'Fresher Basic', description: 'Perfect structure for freshers.', badge: 'Free', variant: 'Fresher', category: 'Fresher' , layout: 'modern' },
  { id: 'fresher-modern', name: 'Fresher Modern', description: 'Modern twist on fresher format.', badge: 'Free', variant: 'Fresher', category: 'Fresher' , layout: 'modern' },
  { id: 'fresher-skills', name: 'Fresher Skills Focus', description: 'Focus on projects and skills.', badge: 'Premium', variant: 'Fresher', category: 'Fresher' , layout: 'modern' },
  
  { id: 'student-intern', name: 'Internship Ready', description: 'Optimized for internships.', badge: 'Free', variant: 'Student', category: 'Student' , layout: 'modern' },
  { id: 'student-scholar', name: 'Academic Scholar', description: 'Focus on research and GPA.', badge: 'Premium', variant: 'Student', category: 'Student' , layout: 'modern' },
  { id: 'student-uni', name: 'University Classic', description: 'Standard university layout.', badge: 'Free', variant: 'Student', category: 'Student' , layout: 'modern' },
  
  { id: 'dev-software', name: 'Software Engineer', description: 'Clean structure for tech stack.', badge: 'Free', variant: 'Developer', category: 'Developer' , layout: 'classic' },
  { id: 'dev-frontend', name: 'Frontend Dev', description: 'Highlighting UI projects.', badge: 'Free', variant: 'Developer', category: 'Developer' , layout: 'classic' },
  { id: 'dev-backend', name: 'Backend System', description: 'Focus on architectures.', badge: 'Premium', variant: 'Developer', category: 'Developer' , layout: 'classic' },
  { id: 'dev-ai', name: 'AI Engineer', description: 'Tech-forward AI styling.', badge: 'Premium', variant: 'Developer', category: 'Developer' , layout: 'classic' },
  { id: 'dev-data', name: 'Data Analyst', description: 'Clean data-focused layout.', badge: 'Free', variant: 'Developer', category: 'Developer' , layout: 'classic' },
  
  { id: 'designer-ui', name: 'UI/UX Designer', description: 'Clean minimalist designer base.', badge: 'Free', variant: 'Designer', category: 'Designer' , layout: 'creative' },
  { id: 'designer-graphic', name: 'Graphic Designer', description: 'Bold and creative block layout.', badge: 'Premium', variant: 'Designer', category: 'Designer' , layout: 'creative' },
  { id: 'designer-product', name: 'Product Manager', description: 'Balanced UI and logic format.', badge: 'Premium', variant: 'Designer', category: 'Designer' , layout: 'creative' },
  
  { id: 'marketing-digital', name: 'Digital Marketing', description: 'Focus on reach and funnels.', badge: 'Free', variant: 'Marketing', category: 'Marketing' , layout: 'classic' },
  { id: 'marketing-sales', name: 'Sales Professional', description: 'Highlighting quota metrics.', badge: 'Free', variant: 'Marketing', category: 'Marketing' , layout: 'classic' },
  { id: 'marketing-hr', name: 'HR Manager', description: 'Structured human resources look.', badge: 'Premium', variant: 'Marketing', category: 'Marketing' , layout: 'classic' },
  
  { id: 'health-nurse', name: 'Registered Nurse', description: 'Healthcare standard layout.', badge: 'Free', variant: 'Healthcare', category: 'Healthcare' , layout: 'two-column' },
  { id: 'health-doctor', name: 'Medical Doctor', description: 'Clean clinical formatting.', badge: 'Premium', variant: 'Healthcare', category: 'Healthcare' , layout: 'two-column' },
  
  { id: 'finance-accountant', name: 'Accountant Check', description: 'Strict table-like details.', badge: 'Free', variant: 'Finance', category: 'Finance' , layout: 'executive' },
  
  { id: 'teacher-edu', name: 'Educator Pro', description: 'Academic focused structure.', badge: 'Free', variant: 'Teacher', category: 'Teacher' , layout: 'classic' },
  { id: 'teacher-tutor', name: 'Tutor Format', description: 'Friendly soft layout.', badge: 'Premium', variant: 'Teacher', category: 'Teacher' , layout: 'classic' },
  
  { id: 'eng-mechanical', name: 'Mechanical Engineer', description: 'Structured and bold.', badge: 'Free', variant: 'Engineering', category: 'Engineering' , layout: 'classic' },
  { id: 'eng-civil', name: 'Civil Engineer', description: 'Project portfolio focus.', badge: 'Premium', variant: 'Engineering', category: 'Engineering' , layout: 'classic' },
  
  { id: 'ats-friendly', name: 'ATS Optimized', description: 'Safest layout for ATS parsers.', badge: 'Free', variant: 'ATS Friendly', category: 'ATS Friendly' , layout: 'minimal' },
  { id: 'ats-modern', name: 'ATS Modernized', description: 'Modern but fully readable.', badge: 'Premium', variant: 'ATS Friendly', category: 'ATS Friendly' , layout: 'minimal' },
  
  { id: 'twocol-modern', name: 'Split Canvas', description: 'Modern two-column design.', badge: 'Free', variant: 'Two Column', category: 'Two Column' , layout: 'two-column' },
  { id: 'twocol-dark', name: 'Dark Sidebar', description: 'Dark contrasting sidebar.', badge: 'Premium', variant: 'Two Column', category: 'Two Column' , layout: 'sidebar' },
  
  { id: 'info-timeline', name: 'Timeline Experience', description: 'Graphic timeline experience.', badge: 'Premium', variant: 'Infographic', category: 'Infographic' , layout: 'timeline' },
  { id: 'info-skills', name: 'Skill Bar Design', description: 'Visual skill bars.', badge: 'Free', variant: 'Infographic', category: 'Infographic' , layout: 'creative' },
  
  { id: 'gdocs-classic', name: 'Docs Classic', description: 'Looks like Google Docs.', badge: 'Free', variant: 'Google Docs Style', category: 'Google Docs Style' , layout: 'executive' },
  { id: 'gdocs-serif', name: 'Docs Serif', description: 'Serif document format.', badge: 'Premium', variant: 'Google Docs Style', category: 'Google Docs Style' , layout: 'executive' },
  
  { id: 'layout-photo', name: 'Photo Profile', description: 'Includes a profile photo block.', badge: 'Premium', variant: 'Modern', category: 'Creative' , layout: 'classic' },
  { id: 'layout-nophoto', name: 'No Photo Clean', description: 'Strict text architecture.', badge: 'Free', variant: 'Minimal', category: 'Minimal' , layout: 'minimal' },
  { id: 'layout-darkhead', name: 'Dark Header Panel', description: 'Heavy dark top header.', badge: 'Premium', variant: 'Corporate', category: 'Colorful' , layout: 'classic' },
  { id: 'layout-gradient', name: 'Soft Gradient', description: 'Subtle gradient header.', badge: 'Premium', variant: 'Colorful', category: 'Colorful' , layout: 'classic' },
  { id: 'layout-cards', name: 'Modern Cards', description: 'Cards based structure.', badge: 'Premium', variant: 'Infographic', category: 'Creative' , layout: 'creative' },
  { id: 'general-grey', name: 'Grey Classic', description: 'Mid-grey calm design.', badge: 'Free', variant: 'Minimal', category: 'Colorful' , layout: 'minimal' }
];
