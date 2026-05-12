// ============================================
// FILE: src/components/BuilderView.tsx
// ============================================
import React, { useRef, useState, useEffect } from 'react';
import { 
  User, Briefcase, GraduationCap, FolderGit2, Award, Wrench, FileText, 
  Download, Sparkles, LayoutTemplate, Palette, CheckCircle2, RotateCcw, 
  Trash2, FileOutput, Loader2, Maximize, Target, Edit, Lightbulb, ChevronDown
} from "lucide-react";
import { InputField, TextAreaField, AccordionSection } from "./FormFields";
import { ResumeData, Experience, Education, Project, Certification } from "../types";
import { useAutoSave } from '../hooks/useAutoSave';
import { useAI } from '../hooks/useAI';
import { calculateATSScore, getScoreLabel, getScoreColor } from '../lib/atsScore';
import { Toast, useToast } from './Toast';
import { ScaledPreview } from './ScaledPreview';
import { 
  ModernProTemplate, MinimalTemplate, TechTemplate, BusinessTemplate, 
  HealthcareTemplate, CreativeTemplate, AcademicTemplate, StartupTemplate, 
  CorporateTemplate, FreelancerTemplate, CleanSidebarTemplate, ExecutiveTemplate, 
  DesignerTemplate, NotionTemplate, ModernMinimalistTemplate, AvatarTemplate, GeometricTemplate,
  ATSClassicTemplate, ModernTemplate, TwoColumnDarkTemplate, ElegantSerifTemplate, TimelineTemplate, StudentFresherTemplate
} from './Templates';

const DEFAULT_DATA: ResumeData = {
  name: "Arjun Sharma",
  title: "Senior Full-Stack Engineer",
  email: "arjun.sharma@gmail.com",
  phone: "+91 98765 43210",
  location: "Bengaluru, Karnataka",
  linkedin: "linkedin.com/in/arjunsharma-dev",
  website: "arjunsharma.dev",
  summary: "Senior Full-Stack Engineer with 6+ years building high-traffic web applications serving 10M+ users. Expert in React, Node.js, and cloud infrastructure. Led cross-functional teams at two YC-backed startups, consistently shipping features 20% ahead of schedule. Passionate about developer experience, clean APIs, and mentoring junior engineers.",
  experience: [
    {
      id: "1",
      jobTitle: "Senior Full-Stack Engineer",
      company: "Razorpay",
      location: "Bengaluru, India",
      startDate: "Mar 2022",
      endDate: "Present",
      responsibilities: "• Architected and launched the new Payments Dashboard used by 500K+ merchants, reducing page load time by 62% through server-side rendering and edge caching.\n• Led a team of 6 engineers to rebuild the webhook delivery system, achieving 99.98% uptime and processing 8M+ events per day.\n• Designed a reusable component library adopted across 4 product teams, cutting UI development time by 35%.\n• Drove migration from monolith to microservices, reducing deployment time from 45 minutes to under 6 minutes."
    },
    {
      id: "2",
      jobTitle: "Full-Stack Engineer",
      company: "Groww",
      location: "Bengaluru, India",
      startDate: "Jun 2020",
      endDate: "Feb 2022",
      responsibilities: "• Built the Mutual Funds SIP feature end-to-end, which onboarded 200K+ investors in the first quarter post-launch.\n• Optimized database queries and introduced Redis caching, reducing average API response time from 850ms to 120ms.\n• Implemented real-time portfolio tracking using WebSockets, supporting 50K concurrent connections.\n• Mentored 4 junior developers through code reviews, pair programming, and weekly tech talks."
    },
    {
      id: "3",
      jobTitle: "Software Engineer",
      company: "Infosys",
      location: "Pune, India",
      startDate: "Jul 2018",
      endDate: "May 2020",
      responsibilities: "• Developed REST APIs for HDFC Bank handling 2M+ daily transactions using Java Spring Boot.\n• Automated regression testing suite covering 1,200+ test cases, reducing QA cycle from 5 days to 8 hours.\n• Collaborated with offshore teams across 3 time zones to deliver a $2.4M ERP integration on schedule."
    }
  ],
  education: [
    { id: "1", degree: "B.Tech in Computer Science & Engineering", institution: "National Institute of Technology, Trichy", year: "2018", location: "Tiruchirappalli, Tamil Nadu" } as any
  ],
  projects: [
    {
      id: "1",
      name: "DevPulse — Developer Analytics SaaS",
      description: "SaaS platform for engineering teams to track code quality, PR velocity, and deployment frequency. Reached ₹4L MRR within 6 months. Stack: Next.js 14, tRPC, PostgreSQL, Prisma, Vercel.",
      link: "github.com/arjun/devpulse"
    },
    {
      id: "2",
      name: "OpenBudget — Personal Finance App",
      description: "Open-source budgeting app with UPI/PDF bank statement parsing, automatic ML categorization, and visual spending insights. 2.3K GitHub stars, 800+ active users.",
      link: "github.com/arjun/openbudget"
    }
  ],
  certifications: [
    { id: "1", name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", year: "2023" },
    { id: "2", name: "Google Professional Cloud Developer", issuer: "Google Cloud", year: "2022" }
  ],
  skills: "TypeScript, React, Next.js, Node.js, Python, PostgreSQL, Redis, Docker, Kubernetes, AWS, GraphQL, tRPC, Prisma, System Design, CI/CD",
  coverLetter: {
    recipientName: "Engineering Hiring Manager",
    companyName: "Stripe",
    jobReference: "Senior Software Engineer – Payments Infrastructure",
    body: "Dear Hiring Manager,\n\nI am writing to express my strong interest in the Senior Software Engineer role on Stripe's Payments Infrastructure team. Having spent the last 6 years building financial technology products at Razorpay and Groww — processing billions of rupees in transactions daily — I believe my background aligns closely with Stripe's mission.\n\nAt Razorpay, I rebuilt our webhook delivery system from the ground up, achieving 99.98% uptime while scaling to 8M+ events per day.\n\nSincerely,\nArjun Sharma"
  }
};

const SAMPLE_RESUMES = [
  { label: "Software Engineer", emoji: "💻", data: DEFAULT_DATA },
  {
    label: "Product Manager", emoji: "🧭",
    data: {
      name: "Priya Mehta", title: "Senior Product Manager",
      email: "priya.mehta@outlook.com", phone: "+91 97654 32109",
      location: "Mumbai, Maharashtra", linkedin: "linkedin.com/in/priyamehta-pm", website: "",
      summary: "Strategic Product Manager with 7+ years driving 0-to-1 and scale products in fintech and edtech. Shipped 12 major features generating ₹80Cr+ ARR. Expert in data-driven prioritization, stakeholder alignment, and agile delivery. Former Chartered Accountant — uniquely bridging business, finance, and technology.",
      experience: [
        { id: "1", jobTitle: "Senior Product Manager", company: "CRED", location: "Bengaluru", startDate: "Jan 2022", endDate: "Present", responsibilities: "• Owned the CRED Mint lending product from concept to ₹500Cr+ loan disbursals.\n• Increased credit card bill payment DAU by 28% by redesigning the payments flow based on 40+ user research sessions.\n• Consistently achieved 85%+ OKR completion rate across 8 quarters.\n• Managed cross-functional squad of 18 across Engineering, Design, Risk, and Legal." },
        { id: "2", jobTitle: "Product Manager", company: "Byju's", location: "Bengaluru", startDate: "Aug 2019", endDate: "Dec 2021", responsibilities: "• Launched the Live Classes product used by 2M+ students daily, increasing course completion by 34%.\n• Conducted 100+ customer interviews; reduced onboarding drop-off by 41%.\n• Built personalized learning path engine with ML team, lifting 7-day retention by 22%." },
        { id: "3", jobTitle: "Associate Product Manager", company: "Paytm", location: "Noida", startDate: "Jun 2017", endDate: "Jul 2019", responsibilities: "• Supported launch of Paytm Postpaid (BNPL) — grew to 5M+ active users in 18 months.\n• Wrote PRDs and user stories for 20+ features across 2 scrum teams." }
      ],
      education: [
        { id: "1", degree: "MBA – Strategy & Finance", institution: "IIM Bangalore", year: "2017", location: "Bengaluru" } as any,
        { id: "2", degree: "B.Com (Hons) + CA Intermediate", institution: "Sydenham College of Commerce", year: "2014", location: "Mumbai" } as any
      ],
      projects: [{ id: "1", name: "PM Playbook — Newsletter", description: "Weekly PM newsletter on frameworks, case studies, and career advice. 12,000+ subscribers, 42% open rate.", link: "substack.com/priyapmplaybook" }],
      certifications: [
        { id: "1", name: "Certified Scrum Product Owner (CSPO)", issuer: "Scrum Alliance", year: "2021" },
        { id: "2", name: "Product Analytics Certification", issuer: "Reforge", year: "2023" }
      ],
      skills: "Product Strategy, Roadmapping, OKRs, User Research, A/B Testing, SQL, Mixpanel, Amplitude, Figma, Agile/Scrum, Stakeholder Management, PRD Writing, Go-to-Market",
      coverLetter: { recipientName: "", companyName: "", jobReference: "", body: "" }
    }
  },
  {
    label: "Data Scientist", emoji: "📊",
    data: {
      name: "Rahul Verma", title: "Lead Data Scientist",
      email: "rahul.verma@proton.me", phone: "+91 96543 21098",
      location: "Hyderabad, Telangana", linkedin: "linkedin.com/in/rahulverma-ds", website: "kaggle.com/rahulverma",
      summary: "Lead Data Scientist with 5+ years applying ML and statistical modeling to e-commerce and healthcare. Published 3 papers in IEEE. Models currently serve 20M+ predictions/day. Kaggle Master, top 0.3% globally. Deep expertise in NLP, recommendation systems, and MLOps.",
      experience: [
        { id: "1", jobTitle: "Lead Data Scientist", company: "Flipkart", location: "Bengaluru", startDate: "Feb 2021", endDate: "Present", responsibilities: "• Designed two-tower neural recommendation system, increasing CTR by 18% and GMV by ₹120Cr annually.\n• Built real-time fraud detection pipeline, reducing chargebacks by 67%.\n• Built LLM-powered product description generator (fine-tuned LLaMA 2) serving 4M+ SKUs, cutting content workload by 80%.\n• Established MLOps standards adopted by 8 product teams." },
        { id: "2", jobTitle: "Data Scientist", company: "Apollo Hospitals", location: "Hyderabad", startDate: "Jul 2019", endDate: "Jan 2021", responsibilities: "• Developed readmission risk model (AUC 0.89) deployed across 71 hospitals, flagging 3,200+ high-risk patients monthly.\n• Built NLP pipeline extracting structured data from 1.2M+ clinical notes using BioBERT.\n• Created patient no-show prediction model, reducing no-show rate by 24%." }
      ],
      education: [
        { id: "1", degree: "M.Tech in AI & Machine Learning", institution: "IIT Hyderabad", year: "2019", location: "Hyderabad" } as any,
        { id: "2", degree: "B.E. in Electronics & Communication", institution: "Osmania University", year: "2017", location: "Hyderabad" } as any
      ],
      projects: [
        { id: "1", name: "SkinAI — Dermatology Diagnosis App", description: "CNN classifier trained on 25K+ dermoscopy images. 94.2% accuracy on ISIC 2019. FastAPI + React Native. Featured in Analytics Vidhya.", link: "github.com/rahul/skinai" },
        { id: "2", name: "IndiaElects 2024 — Election Forecasting", description: "Bayesian ensemble aggregating 40+ polls. Predicted 487/543 Lok Sabha seats (89.7% accuracy). Covered by The Hindu and Mint.", link: "github.com/rahul/indiaelects" }
      ],
      certifications: [
        { id: "1", name: "TensorFlow Developer Certificate", issuer: "Google", year: "2022" },
        { id: "2", name: "Deep Learning Specialization", issuer: "DeepLearning.AI", year: "2020" }
      ],
      skills: "Python, PyTorch, TensorFlow, Scikit-learn, XGBoost, SQL, Spark, MLflow, Airflow, Docker, AWS SageMaker, NLP, LLMs, Statistical Modeling, A/B Testing, Tableau",
      coverLetter: { recipientName: "", companyName: "", jobReference: "", body: "" }
    }
  },
  {
    label: "UX Designer", emoji: "🎨",
    data: {
      name: "Ananya Krishnan", title: "Senior UX / Product Designer",
      email: "ananya.design@gmail.com", phone: "+91 95432 10987",
      location: "Bengaluru, Karnataka", linkedin: "linkedin.com/in/ananyakrish-design", website: "ananya.design",
      summary: "Senior UX Designer with 6 years crafting intuitive digital products for 50M+ users. Specialize in B2B SaaS and consumer fintech. CII Design Excellence Award winner. Equally fluent in research, systems design, and pixel-perfect UI. Mentor to 15+ junior designers.",
      experience: [
        { id: "1", jobTitle: "Senior Product Designer", company: "Zoho", location: "Chennai", startDate: "Apr 2021", endDate: "Present", responsibilities: "• Led redesign of Zoho CRM contact management, reducing task time by 38% and increasing NPS from 32 to 61.\n• Built Zoho's cross-product design system (Spectrum) with 280+ components adopted by 12 teams.\n• Conducted 80+ moderated usability tests and 200+ contextual interviews.\n• Mentored 6 designers; 4 promoted to senior roles." },
        { id: "2", jobTitle: "UX Designer", company: "PhonePe", location: "Bengaluru", startDate: "Jun 2019", endDate: "Mar 2021", responsibilities: "• Designed Insurance vertical from scratch — 3M+ policies sold in Year 1.\n• Ran 15+ A/B tests on payments home screen; winning variant increased conversion by 11%.\n• Improved WCAG 2.1 AA compliance from 54% to 91% via accessibility audit framework." },
        { id: "3", jobTitle: "UI/UX Designer", company: "Swiggy", location: "Bengaluru", startDate: "Aug 2018", endDate: "May 2019", responsibilities: "• Redesigned restaurant discovery page — improved add-to-cart rate by 19% and AOV by ₹42.\n• Created Lottie motion design guidelines for order tracking flow." }
      ],
      education: [{ id: "1", degree: "B.Des in Interaction Design", institution: "National Institute of Design", year: "2018", location: "Ahmedabad" } as any],
      projects: [{ id: "1", name: "Accessible India — Pro-bono Initiative", description: "Led 8 designers to redesign 5 government portals for WCAG compliance. Presented findings to NIC.", link: "accessibleindia.in" }],
      certifications: [
        { id: "1", name: "Google UX Design Professional Certificate", issuer: "Google / Coursera", year: "2021" },
        { id: "2", name: "Nielsen Norman Group UX Certification", issuer: "NN/g", year: "2022" }
      ],
      skills: "Figma, Prototyping, Design Systems, User Research, Usability Testing, Information Architecture, Interaction Design, Motion Design, Accessibility (WCAG), FigJam, Maze, Hotjar",
      coverLetter: { recipientName: "", companyName: "", jobReference: "", body: "" }
    }
  },
  {
    label: "Marketing Manager", emoji: "📣",
    data: {
      name: "Vikram Nair", title: "Growth & Performance Marketing Manager",
      email: "vikram.nair.mktg@gmail.com", phone: "+91 94321 09876",
      location: "Gurugram, Haryana", linkedin: "linkedin.com/in/vikramnair-growth", website: "",
      summary: "Performance Marketing Manager with 5+ years scaling D2C and SaaS brands from ₹10Cr to ₹200Cr+ ARR. Managed ₹15Cr+ monthly ad spend with consistent 4.2x+ ROAS. Expert in growth funnels, attribution modeling, and building high-performing in-house marketing teams.",
      experience: [
        { id: "1", jobTitle: "Growth Marketing Manager", company: "Mamaearth", location: "Gurugram", startDate: "Mar 2022", endDate: "Present", responsibilities: "• Scaled digital ad spend from ₹4Cr/month to ₹18Cr/month while improving blended ROAS from 2.8x to 4.6x.\n• Built and led a 9-person performance marketing team across paid search, social, influencer, and CRM.\n• Launched Klaviyo email/SMS program driving 22% of monthly revenue with 8x ROI.\n• Reduced CAC by 31% through creative testing framework running 200+ ad variations monthly." },
        { id: "2", jobTitle: "Digital Marketing Manager", company: "Nykaa", location: "Mumbai", startDate: "Jan 2020", endDate: "Feb 2022", responsibilities: "• Managed ₹6Cr/month Google and Meta budgets for beauty and fashion, achieving 3.9x ROAS.\n• Drove 140% YoY organic traffic growth through SEO content strategy.\n• Launched affiliate program — 5,000+ active affiliates generating ₹1.2Cr/month." },
        { id: "3", jobTitle: "Performance Marketing Executive", company: "Lenskart", location: "Noida", startDate: "Jun 2018", endDate: "Dec 2019", responsibilities: "• Managed ₹1.5Cr/month Google Shopping and Search campaigns at 3.2x ROAS.\n• Implemented dynamic remarketing campaigns recovering 18% of abandoned carts." }
      ],
      education: [
        { id: "1", degree: "MBA – Marketing & Analytics", institution: "XLRI Jamshedpur", year: "2018", location: "Jamshedpur" } as any,
        { id: "2", degree: "B.Com (Hons)", institution: "Delhi College of Economics, DU", year: "2016", location: "Delhi" } as any
      ],
      projects: [{ id: "1", name: "GrowthOps — Marketing Automation Toolkit", description: "Open-source Python toolkit for Meta Ads reporting, budget pacing, and anomaly detection. 300+ marketers. Featured in Growth.Design newsletter.", link: "github.com/vikram/growthops" }],
      certifications: [
        { id: "1", name: "Google Ads Certified – Search, Shopping & Display", issuer: "Google", year: "2023" },
        { id: "2", name: "Meta Certified Digital Marketing Associate", issuer: "Meta", year: "2023" }
      ],
      skills: "Google Ads, Meta Ads, Performance Marketing, SEO, Email Marketing (Klaviyo), Attribution Modeling, SQL, Google Analytics 4, Tableau, A/B Testing, CRO, D2C Growth, Team Leadership",
      coverLetter: { recipientName: "", companyName: "", jobReference: "", body: "" }
    }
  }
];

export default function BuilderView() {
  const [data, updateData] = useAutoSave(DEFAULT_DATA);
  const ai = useAI();
  const { toast, showToast, hideToast } = useToast();
  
  const [activeTab, setActiveTab] = useState<'editor' | 'coverletter'>('editor');
  const [activeTemplate, setActiveTemplate] = useState('ats_classic');
  const [themeColor, setThemeColor] = useState('#4F46E5');
  const [paperFormat, setPaperFormat] = useState<'a4'|'letter'>('letter');
  
  const [aiInputText, setAiInputText] = useState('');
  const [showRolePrompt, setShowRolePrompt] = useState(false);
  const [showTextPrompt, setShowTextPrompt] = useState(false);
  const [showAtsModal, setShowAtsModal] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [interviewPrep, setInterviewPrep] = useState('');
  const [showSkillsSuggest, setShowSkillsSuggest] = useState(false);
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [isMobilePreview, setIsMobilePreview] = useState(false);

  const [coverLetterData, setCoverLetterData] = useState({ recipientName: '', companyName: '', jobReference: '', body: '' });

  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if(params.get('tab') === 'templates') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const templates: Record<string, { name: string, component: any }> = {
    ats_classic: { name: 'ATS Classic (Recommended)', component: ATSClassicTemplate },
    modern_pro: { name: 'Modern Pro', component: ModernProTemplate },
    minimal: { name: 'Minimal', component: MinimalTemplate },
    executive: { name: 'Executive', component: ExecutiveTemplate },
    tech: { name: 'Tech Lead', component: TechTemplate },
    timeline: { name: 'Timeline', component: TimelineTemplate },
    dark_sidebar: { name: 'Dark Sidebar', component: TwoColumnDarkTemplate },
    elegant_serif: { name: 'Elegant Serif', component: ElegantSerifTemplate },
    student: { name: 'Student / Fresher', component: StudentFresherTemplate },
    business: { name: 'Business', component: BusinessTemplate },
    startup: { name: 'Startup', component: StartupTemplate },
    creative: { name: 'Creative', component: CreativeTemplate },
    corporate: { name: 'Corporate', component: CorporateTemplate },
    academic: { name: 'Academic', component: AcademicTemplate },
    designer: { name: 'Designer', component: DesignerTemplate }
  };

  const colors = [
    { name: 'Indigo', val: '#4F46E5' },
    { name: 'Cyan', val: '#06b6d4' },
    { name: 'Rose', val: '#e11d48' },
    { name: 'Emerald', val: '#10b981' },
    { name: 'Amber', val: '#f59e0b' },
    { name: 'Slate', val: '#475569' }
  ];

  const handleDownload = async () => {
    if (!resumeRef.current) return;
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const element = resumeRef.current;
      const opt = {
        margin: 0,
        filename: `Resume_${data.name.replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg' as const, quality: 1 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: paperFormat, orientation: 'portrait' as const }
      };
      html2pdf().set(opt).from(element).save();
      showToast('Resume downloaded successfully!', 'success');
    } catch (err: any) {
      console.error(err);
      showToast('Failed to download PDF. Please try again.', 'error');
    }
  };

  const handleAIBuildFromRole = async () => {
    if(!aiInputText) return;
    try {
      const res = await ai.generateFullResume(aiInputText);
      updateData(res);
      setShowRolePrompt(false);
      showToast('Resume generated successfully!', 'success');
    } catch (err) {
      showToast('Failed to generate resume.', 'error');
    }
  };

  const handleAIBuildFromText = async () => {
    if(!aiInputText) return;
    try {
      const res = await ai.generateFullResume(aiInputText);
      updateData(res);
      setShowTextPrompt(false);
      showToast('Resume generated successfully!', 'success');
    } catch (err) {
      showToast('Failed to generate resume.', 'error');
    }
  };

  const handleAISkillsSuggest = async () => {
    try {
      const skills = await ai.generateAISkills(data.title, data.summary);
      const list = skills.split(',').map(s=>s.trim()).filter(Boolean);
      setSuggestedSkills(list);
      setShowSkillsSuggest(true);
    } catch (err) {
      showToast('AI suggestion failed.', 'error');
    }
  };

  const handleGenerateInterviewPrep = async () => {
    setShowInterviewModal(true);
    try {
      const prep = await ai.generateInterviewPrep(JSON.stringify(data));
      setInterviewPrep(prep);
    } catch (err) {
      setInterviewPrep('Failed to generate interview prep. Please try again.');
    }
  };

  const generateCoverLetter = async () => {
    try {
      const cl = await ai.generateCoverLetter(JSON.stringify(data));
      setCoverLetterData(prev => ({...prev, body: cl}));
      showToast('Cover letter generated!', 'success');
    } catch (err) {
      showToast('Failed to generate cover letter.', 'error');
    }
  };

  const atsScore = calculateATSScore(data);
  const scoreLabel = getScoreLabel(atsScore);
  const scoreColorStr = getScoreColor(atsScore);

  const addExperience = () => {
    updateData({
      ...data,
      experience: [...data.experience, { id: crypto.randomUUID(), company: '', jobTitle: '', startDate: '', endDate: '', location: '', responsibilities: '' }]
    });
  };

  const CurrentTemplate = templates[activeTemplate].component;

  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 h-[calc(100vh-64px)] flex flex-col md:flex-row gap-6 relative">
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      
      {/* LEFT COLUMN: EDITOR */}
      <div className={`w-full md:w-[45%] lg:w-[40%] flex flex-col gap-4 h-full overflow-hidden ${isMobilePreview ? 'hidden' : 'flex'}`}>
        
        {/* Editor Top Bar */}
        <div className="flex bg-[var(--color-bg-2)] p-1 rounded-xl border border-[var(--color-border)] mb-2">
          <button 
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'editor' ? 'bg-[var(--color-primary)] text-white shadow-md' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
            onClick={() => setActiveTab('editor')}
          >
            Resume Details
          </button>
          <button 
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'coverletter' ? 'bg-[var(--color-primary)] text-white shadow-md' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
            onClick={() => setActiveTab('coverletter')}
          >
            Cover Letter
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6 pb-20">
          {activeTab === 'editor' && (
            <>
              {/* TOP AI TOOLBAR */}
              <div className="glass-card p-4 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-indigo-400">
                  <Sparkles size={16} /> Quick Build AI
                </div>
                {showRolePrompt ? (
                  <div className="flex gap-2">
                    <input autoFocus value={aiInputText} onChange={e=>setAiInputText(e.target.value)} placeholder="e.g. Senior Frontend Engineer" className="flex-1 bg-[var(--color-bg-3)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm" />
                    <button onClick={handleAIBuildFromRole} disabled={ai.isLoading} className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm">{ai.isLoading ? <Loader2 size={16} className="animate-spin" /> : 'Go'}</button>
                    <button onClick={()=>setShowRolePrompt(false)} className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm">Cancel</button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    <button onClick={()=>setShowRolePrompt(true)} className="px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"><Sparkles size={14}/> Generate from Role</button>
                    <button onClick={()=>setShowTextPrompt(true)} className="px-3 py-1.5 bg-[var(--color-bg-3)] hover:bg-gray-800 text-[var(--text-main)] border border-[var(--color-border)] rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"><FileText size={14}/> Build from Text</button>
                    <div className="relative group/samples">
                      <button className="px-3 py-1.5 bg-[var(--color-bg-3)] hover:bg-gray-800 text-[var(--text-main)] border border-[var(--color-border)] rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors">
                        <RotateCcw size={14}/> Samples <ChevronDown size={11}/>
                      </button>
                      <div className="absolute left-0 top-full pt-1.5 w-52 z-50 opacity-0 invisible group-hover/samples:opacity-100 group-hover/samples:visible transition-all duration-200">
                        <div className="bg-[var(--color-bg-2)] border border-[var(--color-border)] rounded-xl shadow-2xl overflow-hidden p-1.5">
                          <p className="text-[10px] font-bold text-[var(--text-subtle)] uppercase tracking-widest px-2 py-1.5">Load Sample Resume</p>
                          {SAMPLE_RESUMES.map((sample, si) => (
                            <button key={si}
                              onClick={() => {
                                updateData(JSON.parse(JSON.stringify(sample.data)));
                                showToast(`Loaded ${sample.label} sample!`, 'success');
                              }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[var(--color-bg-3)] text-left transition-colors"
                            >
                              <span className="text-base">{sample.emoji}</span>
                              <span className="text-xs font-semibold text-[var(--text-main)]">
                                {sample.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {showTextPrompt && (
                  <div className="pt-2 border-t border-[var(--color-border)]">
                    <textarea value={aiInputText} onChange={e=>setAiInputText(e.target.value)} placeholder="Paste raw text, old resume, or linkedin dump here..." className="w-full h-24 bg-[var(--color-bg-3)] border border-[var(--color-border)] rounded-lg p-2 text-sm mb-2 text-[var(--text-main)]" />
                    <div className="flex gap-2 justify-end">
                      <button onClick={()=>setShowTextPrompt(false)} className="text-gray-400 text-xs px-2 py-1">Cancel</button>
                      <button onClick={handleAIBuildFromText} className="bg-indigo-500 text-white text-xs px-3 py-1.5 rounded disabled:opacity-50" disabled={ai.isLoading}>Generate</button>
                    </div>
                  </div>
                )}
              </div>

              <AccordionSection title="Personal Info" icon={User}>
                <div className="grid grid-cols-2 gap-4 flex-wrap">
                  <div className="col-span-2"><InputField label="Full Name" value={data.name} onChange={v => updateData({...data, name: v})} /></div>
                  <div className="col-span-2"><InputField label="Job Title" value={data.title} onChange={v => updateData({...data, title: v})} /></div>
                  <div className="col-span-2 md:col-span-1"><InputField label="Email" type="email" value={data.email} onChange={v => updateData({...data, email: v})} /></div>
                  <div className="col-span-2 md:col-span-1"><InputField label="Phone" value={data.phone} onChange={v => updateData({...data, phone: v})} /></div>
                  <div className="col-span-2 md:col-span-1"><InputField label="Location" value={data.location} onChange={v => updateData({...data, location: v})} /></div>
                  <div className="col-span-2 md:col-span-1"><InputField label="Website" value={data.website || ''} onChange={v => updateData({...data, website: v})} /></div>
                  <div className="col-span-2"><InputField label="LinkedIn" value={data.linkedin} onChange={v => updateData({...data, linkedin: v})} /></div>
                </div>
              </AccordionSection>

              <AccordionSection title="Summary" icon={FileText}>
                <div className="relative">
                  <TextAreaField label="Professional Summary" value={data.summary} onChange={v => updateData({...data, summary: v})} rows={4} />
                  <button onClick={async () => updateData({...data, summary: await ai.enhanceSummaryWithAI(data.summary)})} disabled={ai.isLoading} className="absolute top-0 right-0 text-xs flex items-center gap-1 text-indigo-400 hover:text-indigo-300">
                    {ai.isLoading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12}/>} AI Enhance
                  </button>
                </div>
              </AccordionSection>

              <AccordionSection title="Skills" icon={Wrench}>
                <div className="relative mb-3">
                  <TextAreaField label="Skills (comma separated)" value={data.skills} onChange={v => updateData({...data, skills: v})} rows={3} />
                  <button onClick={handleAISkillsSuggest} disabled={ai.isLoading} className="mt-2 text-xs flex items-center gap-1 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 px-3 py-1.5 rounded-lg border border-indigo-500/20 font-semibold transition-colors">
                    {ai.isLoading ? <Loader2 size={12} className="animate-spin" /> : <Lightbulb size={12}/>} AI Suggest Skills
                  </button>
                </div>
                {showSkillsSuggest && (
                  <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                    <div className="flex justify-between items-center mb-2 text-xs text-indigo-300">
                      <span>Click to append:</span>
                      <button onClick={()=>setShowSkillsSuggest(false)}><Trash2 size={12}/></button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {suggestedSkills.map(s => (
                        <button key={s} onClick={()=>{
                          const prefix = data.skills.trim() ? data.skills.trim() + ', ' : '';
                          updateData({...data, skills: prefix + s});
                          setSuggestedSkills(suggestedSkills.filter(sk => sk !== s));
                        }} className="px-2 py-1 bg-[var(--color-bg-3)] hover:bg-white/10 text-[var(--text-main)] rounded text-xs border border-[var(--color-border)]">
                          + {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </AccordionSection>

              <AccordionSection title="Experience" icon={Briefcase}>
                {data.experience.map((exp, i) => (
                  <div key={exp.id} className="p-4 bg-[var(--color-bg-base)] border border-[var(--color-border)] rounded-lg mb-4 relative group">
                    <button onClick={() => updateData({...data, experience: data.experience.filter(e => e.id !== exp.id)})} className="absolute top-2 right-2 text-red-500/50 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={16} />
                    </button>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="col-span-2 md:col-span-1"><InputField label="Job Title" value={exp.jobTitle} onChange={v => {
                        const arr = [...data.experience]; arr[i].jobTitle = v; updateData({...data, experience: arr});
                      }} /></div>
                      <div className="col-span-2 md:col-span-1"><InputField label="Company" value={exp.company} onChange={v => {
                        const arr = [...data.experience]; arr[i].company = v; updateData({...data, experience: arr});
                      }} /></div>
                      <div className="col-span-2 md:col-span-1"><InputField label="Start Date" value={exp.startDate} onChange={v => {
                        const arr = [...data.experience]; arr[i].startDate = v; updateData({...data, experience: arr});
                      }} /></div>
                      <div className="col-span-2 md:col-span-1"><InputField label="End Date" value={exp.endDate} onChange={v => {
                        const arr = [...data.experience]; arr[i].endDate = v; updateData({...data, experience: arr});
                      }} /></div>
                      <div className="col-span-2">
                        <InputField label="Location (Optional)" value={exp.location || ''} onChange={v => {
                          const arr = [...data.experience]; arr[i].location = v; updateData({...data, experience: arr});
                        }} />
                      </div>
                    </div>
                    <div className="relative">
                      <TextAreaField label="Responsibilities" value={exp.responsibilities} onChange={v => {
                        const arr = [...data.experience]; arr[i].responsibilities = v; updateData({...data, experience: arr});
                      }} rows={4} />
                      <button onClick={async () => {
                        const res = await ai.enhanceExperienceWithAI(exp.responsibilities);
                        const arr = [...data.experience]; arr[i].responsibilities = res; updateData({...data, experience: arr});
                      }} disabled={ai.isLoading} className="absolute top-0 right-0 text-xs flex items-center gap-1 text-indigo-400 hover:text-indigo-300">
                         {ai.isLoading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12}/>} AI Highlight
                      </button>
                    </div>
                  </div>
                ))}
                <button onClick={addExperience} className="w-full py-2 bg-[var(--color-bg-3)] hover:bg-[var(--color-border)] text-[var(--text-main)] rounded-lg text-sm font-semibold transition-colors">
                  + Add Experience
                </button>
              </AccordionSection>

              <AccordionSection title="Education" icon={GraduationCap} defaultOpen={false}>
                {data.education.map((edu, i) => (
                  <div key={edu.id} className="p-4 bg-[var(--color-bg-base)] border border-[var(--color-border)] rounded-lg mb-4">
                    <div className="flex justify-end mb-2">
                         <button onClick={() => updateData({...data, education: data.education.filter(e => e.id !== edu.id)})} className="text-red-500/50 hover:text-red-500"><Trash2 size={16} /></button>
                      </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2"><InputField label="Degree" value={edu.degree} onChange={v => {const arr=[...data.education]; arr[i].degree=v; updateData({...data, education: arr})}} /></div>
                      <div className="col-span-2 md:col-span-1"><InputField label="Institution" value={edu.institution} onChange={v => {const arr=[...data.education]; arr[i].institution=v; updateData({...data, education: arr})}} /></div>
                      <div className="col-span-2 md:col-span-1"><InputField label="Year" value={edu.year} onChange={v => {const arr=[...data.education]; arr[i].year=v; updateData({...data, education: arr})}} /></div>
                    </div>
                  </div>
                ))}
                <button onClick={() => updateData({...data, education: [...data.education, {id:crypto.randomUUID(), degree:'', institution:'', year:''}]})} className="w-full py-2 bg-[var(--color-bg-3)] rounded-lg text-sm font-semibold">
                  + Add Education
                </button>
              </AccordionSection>

              <AccordionSection title="Projects" icon={FolderGit2} defaultOpen={false}>
                  {data.projects.map((proj, i) => (
                    <div key={proj.id} className="p-4 bg-[var(--color-bg-base)] border border-[var(--color-border)] rounded-lg mb-4">
                      <div className="flex justify-end mb-2">
                         <button onClick={() => updateData({...data, projects: data.projects.filter(p => p.id !== proj.id)})} className="text-red-500/50 hover:text-red-500"><Trash2 size={16} /></button>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="col-span-2 md:col-span-1"><InputField label="Project Name" value={proj.name} onChange={v => {const arr=[...data.projects]; arr[i].name=v; updateData({...data, projects: arr})}} /></div>
                        <div className="col-span-2 md:col-span-1"><InputField label="Link" value={proj.link || ''} onChange={v => {const arr=[...data.projects]; arr[i].link=v; updateData({...data, projects: arr})}} /></div>
                      </div>
                       <TextAreaField label="Description" value={proj.description} onChange={v => {const arr=[...data.projects]; arr[i].description=v; updateData({...data, projects: arr})}} />
                    </div>
                  ))}
                  <button onClick={() => updateData({...data, projects: [...data.projects, {id:crypto.randomUUID(), name:'', description:'', link:''}]})} className="w-full py-2 bg-[var(--color-bg-3)] rounded-lg text-sm font-semibold">
                  + Add Project
                </button>
              </AccordionSection>

              <AccordionSection title="Certifications" icon={Award} defaultOpen={false}>
                {data.certifications?.map((cert, i) => (
                    <div key={cert.id} className="p-4 bg-[var(--color-bg-base)] border border-[var(--color-border)] rounded-lg mb-4">
                      <div className="flex justify-end mb-2">
                         <button onClick={() => updateData({...data, certifications: data.certifications.filter(c => c.id !== cert.id)})} className="text-red-500/50 hover:text-red-500"><Trash2 size={16} /></button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2"><InputField label="Name" value={cert.name} onChange={v => {const arr=[...data.certifications]; arr[i].name=v; updateData({...data, certifications: arr})}} /></div>
                        <div className="col-span-2 md:col-span-1"><InputField label="Issuer" value={cert.issuer} onChange={v => {const arr=[...data.certifications]; arr[i].issuer=v; updateData({...data, certifications: arr})}} /></div>
                        <div className="col-span-2 md:col-span-1"><InputField label="Year" value={cert.year} onChange={v => {const arr=[...data.certifications]; arr[i].year=v; updateData({...data, certifications: arr})}} /></div>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => updateData({...data, certifications: [...(data.certifications || []), {id:crypto.randomUUID(), name:'', issuer:'', year:''}]})} className="w-full py-2 bg-[var(--color-bg-3)] rounded-lg text-sm font-semibold">
                    + Add Certification
                  </button>
              </AccordionSection>
            </>
          )}

          {activeTab === 'coverletter' && (
             <div className="space-y-4">
                <div className="glass-card p-4 rounded-xl mb-4 text-[var(--text-main)]">
                   <h3 className="text-sm font-semibold mb-3 text-indigo-400">Cover Letter Details</h3>
                   <div className="grid grid-cols-1 gap-3 mb-4">
                     <InputField label="Recipient Name/Title" value={coverLetterData.recipientName} onChange={v => setCoverLetterData({...coverLetterData, recipientName: v})} placeholder="e.g. Hiring Manager" />
                     <InputField label="Company Name" value={coverLetterData.companyName} onChange={v => setCoverLetterData({...coverLetterData, companyName: v})} />
                     <InputField label="Job Reference / Requisition ID" value={coverLetterData.jobReference} onChange={v => setCoverLetterData({...coverLetterData, jobReference: v})} />
                   </div>
                   <button onClick={generateCoverLetter} disabled={ai.isLoading} className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all">
                     {ai.isLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />} 
                     AI Generate Cover Letter
                   </button>
                </div>

                <div className="relative">
                   <TextAreaField label="Cover Letter Body" value={coverLetterData.body} onChange={v => setCoverLetterData({...coverLetterData, body: v})} rows={15} />
                </div>
             </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: PREVIEW */}
      <div className={`flex-1 bg-[var(--color-bg-2)] rounded-3xl border border-[var(--color-border)] overflow-hidden flex flex-col shadow-2xl relative ${isMobilePreview ? 'flex' : 'hidden md:flex'}`}>
        
        {/* Right Top Bar */}
        <div className="h-16 border-b border-[var(--color-border)] px-4 flex items-center justify-between bg-[var(--color-bg-base)]">
          <div className="flex items-center gap-4">
             {/* Template Selector */}
             <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-[var(--color-bg-3)] hover:bg-gray-800 border border-[var(--color-border)] rounded-lg text-sm font-medium">
                  <LayoutTemplate size={16} /> <span className="hidden sm:inline">{templates[activeTemplate].name}</span>
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-[var(--color-bg-2)] border border-[var(--color-border)] rounded-xl shadow-xl py-2 hidden group-hover:block z-50">
                   {Object.entries(templates).map(([key, t]) => (
                     <button key={key} onClick={()=>setActiveTemplate(key)} className={`w-full text-left px-4 py-2 text-sm hover:bg-[var(--color-bg-3)] ${activeTemplate === key ? 'text-indigo-400 font-semibold' : 'text-[var(--text-main)]'}`}>
                       {t.name}
                     </button>
                   ))}
                </div>
             </div>
             
             {/* Color Selector */}
             <div className="flex gap-1.5 hidden sm:flex">
              {colors.map(c => (
                <button key={c.name} onClick={() => setThemeColor(c.val)} className={`w-6 h-6 rounded-full border-2 transition-transform ${themeColor === c.val ? 'border-indigo-400 scale-110' : 'border-transparent hover:scale-110'}`} style={{ backgroundColor: c.val }} title={c.name} />
              ))}
             </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setShowAtsModal(true)} className="hidden lg:flex px-3 py-1.5 bg-[var(--color-bg-3)] hover:bg-gray-800 border border-[var(--color-border)] rounded-lg text-sm font-medium items-center gap-2">
               <Target size={16} className="text-emerald-400" /> ATS Check
            </button>
            <button onClick={handleGenerateInterviewPrep} disabled={ai.isLoading} className="hidden xl:flex px-3 py-1.5 bg-[var(--color-bg-3)] hover:bg-gray-800 border border-[var(--color-border)] rounded-lg text-sm font-medium items-center gap-2">
               <User size={16} className="text-cyan-400" /> Interview Prep
            </button>
            <button onClick={handleDownload} className="hidden sm:flex px-4 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-lg items-center gap-2 transition-transform hover:scale-105">
              <Download size={16} /> Download
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 overflow-auto custom-scrollbar flex items-start justify-center p-4 md:p-8 bg-[var(--color-bg-2)] relative">
           {activeTab === 'editor' ? (
              <ScaledPreview>
                 <div ref={resumeRef} className="w-full h-full min-h-[1123px] bg-white text-black relative">
                   <CurrentTemplate data={data} themeColor={themeColor} />
                 </div>
              </ScaledPreview>
           ) : (
              <ScaledPreview>
                 <div ref={resumeRef} className="w-full h-full min-h-[1123px] bg-white text-black p-12 text-[11pt]" style={{ fontFamily: 'var(--font-sans)', color: '#111827' }}>
                    <div className="mb-10 border-b-2 pb-6" style={{ borderColor: themeColor }}>
                       <h1 className="text-3xl font-bold mb-1" style={{ color: themeColor }}>{data.name}</h1>
                       <div className="text-gray-600 text-sm flex gap-4">
                         <span>{data.email}</span>
                         <span>{data.phone}</span>
                         <span>{data.location}</span>
                       </div>
                    </div>
                    {coverLetterData.recipientName && (
                      <div className="mb-8">
                        <p className="font-semibold">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                        <br/>
                        <p className="font-bold">{coverLetterData.recipientName}</p>
                        <p>{coverLetterData.companyName}</p>
                        {coverLetterData.jobReference && <p className="text-sm text-gray-500">Re: {coverLetterData.jobReference}</p>}
                      </div>
                    )}
                    <div className="whitespace-pre-wrap leading-relaxed text-gray-800">
                       {coverLetterData.body || "Your cover letter will appear here."}
                    </div>
                 </div>
              </ScaledPreview>
           )}
        </div>
      </div>

      {/* MOBILE STICKY NAV */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-bg-2)] border-t border-[var(--color-border)] p-2 z-50 flex gap-2">
         <button onClick={() => setIsMobilePreview(false)} className={`flex-1 py-3 flex justify-center rounded-lg ${!isMobilePreview ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-bg-3)]'}`}><Edit size={20}/></button>
         <button onClick={() => setIsMobilePreview(true)} className={`flex-1 py-3 flex justify-center rounded-lg ${isMobilePreview ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-bg-3)]'}`}><Maximize size={20}/></button>
         <button onClick={handleDownload} className="flex-1 py-3 flex justify-center bg-[var(--color-primary)] text-white rounded-lg shadow-lg"><Download size={20}/></button>
      </div>

      {/* MODALS */}
      {showAtsModal && (
         <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-[var(--color-bg-2)] border border-[var(--color-border)] p-6 rounded-2xl max-w-md w-full shadow-2xl">
               <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Target className="text-cyan-400"/> ATS Analysis</h2>
               
               <div className="flex flex-col items-center justify-center py-6">
                  <div className={`text-6xl font-black ${scoreColorStr} mb-2`}>{atsScore}</div>
                  <div className={`text-lg font-bold ${scoreColorStr} uppercase tracking-widest`}>{scoreLabel}</div>
               </div>

               <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center text-sm"><span className="text-[var(--text-muted)]">Core Fields</span><span className={data.summary && data.skills ? "text-emerald-400" : "text-amber-400"}>{data.summary && data.skills ? "Pass" : "Warn"}</span></div>
                  <div className="flex justify-between items-center text-sm"><span className="text-[var(--text-muted)]">Experience</span><span className={data.experience.length > 0 ? "text-emerald-400" : "text-amber-400"}>{data.experience.length > 0 ? "Pass" : "Warn"}</span></div>
                  <div className="flex justify-between items-center text-sm"><span className="text-[var(--text-muted)]">Action Verbs</span><span className="text-cyan-400">Checked</span></div>
               </div>
               
               <button onClick={()=>setShowAtsModal(false)} className="w-full py-3 bg-[var(--color-bg-3)] hover:bg-gray-800 rounded-xl font-bold">Close</button>
            </div>
         </div>
      )}

      {showInterviewModal && (
         <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-[var(--color-bg-2)] border border-[var(--color-border)] p-6 rounded-2xl max-w-2xl w-full shadow-2xl max-h-[80vh] flex flex-col">
               <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><User className="text-indigo-400"/> Prep Based on Your Resume</h2>
               
               <div className="flex-1 overflow-y-auto mb-6 pr-2 whitespace-pre-wrap text-[var(--text-main)] text-sm leading-relaxed p-4 bg-[var(--color-bg-base)] rounded-xl border border-[var(--color-border)] custom-scrollbar">
                  {interviewPrep ? interviewPrep : <div className="flex items-center justify-center p-12 text-[var(--text-muted)]"><Loader2 className="animate-spin text-indigo-500 mr-2" /> Generating personalized questions...</div>}
               </div>

               <button onClick={()=>setShowInterviewModal(false)} className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 font-bold rounded-xl text-white">Done</button>
            </div>
         </div>
      )}

    </div>
  );
};
