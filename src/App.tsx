import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Helmet } from "react-helmet-async";
import { GoogleGenAI, Type } from "@google/genai";
import { Toast } from "./components/Toast";
import { Moon, Sun } from "lucide-react";

const BuilderView = React.lazy(() => import("./components/BuilderView").then(module => ({ default: module.BuilderView })));
const Home = React.lazy(() => import("./components/Home").then(module => ({ default: module.Home })));
import {
  Plus,
  Trash2,
  Download,
  RefreshCw,
  FileText,
  CheckCircle2,
  XCircle,
  Sparkles,
  LayoutTemplate,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  Loader2,
  FolderGit2,
  Award,
  Crown,
  FileCode2,
  LayoutDashboard,
  FileOutput,
  ChevronDown,
  ChevronUp,
  Palette,
  Stethoscope,
  Code,
  PenTool,
  Building,
  Eye,
  Edit,
  Cloud,
  Brain,
  Mic,
  DollarSign,
  BookOpen,
  HelpCircle,
  Info,
  MessageSquare,
  Menu,
  CheckCircle,
  TrendingUp,
  Home as HomeIcon,
  Users,
  Wand2,
  UploadCloud,
  Search,
  FileBadge,
  ArrowRight,
} from "lucide-react";
import {
  TechTemplate,
  BusinessTemplate,
  HealthcareTemplate,
  CreativeTemplate,
  ModernTemplate,
  MinimalTemplate,
  AcademicTemplate,
  StartupTemplate,
  CorporateTemplate,
  FreelancerTemplate,
  CleanSidebarTemplate,
  ModernProTemplate,
  ExecutiveTemplate,
  DesignerTemplate,
  NotionTemplate,
} from "./components/Templates";
import {
  TemplateFactory,
  generatedTemplates,
} from "./components/TemplateFactory";
import {
  ResumeData,
  Experience,
  Education,
  Project,
  Certification,
  CoverLetterData,
} from "./types";

const navTools = {
  resume: [
    {
      icon: FileText,
      title: "Resume Builder",
      sub: "Build professional resumes in minutes",
      tag: "Popular",
      tagColor: "bg-emerald-600 text-white",
      tab: "resume",
    },
    {
      icon: Cloud,
      title: "Upload & Enhance",
      sub: "Improve your existing resume",
      tag: "Free",
      tagColor:
        "bg-emerald-600/20 text-emerald-600 border border-emerald-600/30",
    },
    {
      icon: CheckCircle,
      title: "ATS Score Checker",
      sub: "Check resume compatibility",
      tag: "Free",
      tagColor:
        "bg-emerald-600/20 text-emerald-600 border border-emerald-600/30",
    },
    {
      icon: Sparkles,
      title: "Text to Resume",
      sub: "Convert text to valid resume instantly",
      tag: "New",
      tagColor: "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30",
    },
    {
      icon: Brain,
      title: "Interview Prep Kit",
      sub: "20 questions with winning answers",
      tag: "New",
      tagColor: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
    },
    {
      icon: Mail,
      title: "Cover Letter Builder",
      sub: "Create compelling cover letters",
      tab: "coverLetter",
    },
  ],
  career: [],
  resources: [
    { icon: LayoutTemplate, title: "Templates" },
    { icon: Sparkles, title: "Features" },
    { icon: BookOpen, title: "Blog" },
    { icon: HelpCircle, title: "FAQs" },
    { icon: Info, title: "About Us" },
    { icon: Mail, title: "Contact" },
  ],
};

const AccordionSection = ({
  title,
  icon: Icon,
  id,
  activeId,
  setActiveId,
  children,
}: any) => {
  const isActive = activeId === id;
  return (
    <div
      className={`border rounded-2xl overflow-hidden mb-6 transition-all duration-300 ${isActive ? "border-emerald-600/30 bg-[var(--color-bg-2)]/80 shadow-[0_4px_20px_-4px_rgba(40,167,69,0.1)]" : "border-[var(--color-border)] bg-[var(--color-bg-2)]/30 hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-2)]/50"}`}
    >
      <button
        onClick={() => setActiveId(isActive ? "" : id)}
        className="w-full flex justify-between items-center p-5 outline-none"
      >
        <h2
          className={`font-semibold flex items-center gap-3 transition-colors ${isActive ? "text-[var(--text-main)] text-lg" : "text-[var(--text-main)] text-base"}`}
        >
          <div
            className={`p-2 rounded-xl transition-colors opacity-90 ${isActive ? "bg-emerald-600/20 text-emerald-600" : "bg-[var(--color-bg-2)] text-[var(--text-muted)]"}`}
          >
            <Icon
              size={isActive ? 20 : 18}
              className={isActive ? "stroke-[2]" : "stroke-[1.5]"}
            />
          </div>
          {title}
        </h2>
        <div
          className={`p-1.5 rounded-full transition-transform duration-300 ${isActive ? "bg-[var(--color-bg-2)] text-[var(--text-main)] rotate-180" : "text-[var(--text-muted)] rotate-0"}`}
        >
          <ChevronDown size={16} />
        </div>
      </button>
      {isActive && (
        <div className="px-5 pb-6 text-[var(--text-main)] animate-in slide-in-from-top-2 fade-in duration-200">
          <div className="pt-2 border-t border-[var(--color-border)]">{children}</div>
        </div>
      )}
    </div>
  );
};

const InputField = ({ label, type = "text", ...props }: any) => (
  <div>
    {label && (
      <label className="block text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1.5 pl-0.5">
        {label}
      </label>
    )}
    <input
      type={type}
      {...props}
      className={`w-full px-4 py-2.5 text-sm border border-[var(--color-border-hover)] bg-[var(--color-bg)]/50 text-[var(--text-main)] rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 outline-none transition-all shadow-inner placeholder:text-[var(--text-main)] ${props.className || ""}`}
    />
  </div>
);

const TextAreaField = ({ label, optionalRightNode, ...props }: any) => (
  <div>
    {(label || optionalRightNode) && (
      <div className="flex justify-between items-center mb-1.5 px-0.5">
        {label && (
          <label className="block text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
            {label}
          </label>
        )}
        {optionalRightNode}
      </div>
    )}
    <textarea
      {...props}
      className={`w-full px-4 py-3 text-sm border border-[var(--color-border-hover)] bg-[var(--color-bg)]/50 text-[var(--text-main)] rounded-xl focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 outline-none transition-all shadow-inner placeholder:text-[var(--text-main)] resize-y leading-relaxed scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent ${props.className || ""}`}
    />
  </div>
);

const initialData: ResumeData = {
  name: "John Doe",
  title: "Software Engineer",
  email: "john.doe@example.com",
  phone: "(555) 123-4567",
  location: "San Francisco, CA",
  linkedin: "linkedin.com/in/johndoe",
  summary:
    "Results-driven Software Engineer with 5+ years of experience developing scalable web applications. Proven track record of improving system performance and leading cross-functional teams.",
  experience: [
    {
      id: "1",
      jobTitle: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      startDate: "Jan 2020",
      endDate: "Present",
      responsibilities:
        "Led development of React-based customer portal, increased engagement by 40%.\nMentored junior developers, established code quality standards.\nOptimized performance, reduced load times by 2 seconds.",
    },
    {
      id: "2",
      jobTitle: "Junior Web Developer",
      company: "InnovateTech",
      startDate: "Jun 2018",
      endDate: "Dec 2019",
      responsibilities:
        "Developed and maintained responsive user interfaces using HTML, CSS, and JavaScript.\nCollaborated with backend teams to integrate RESTful APIs.\nParticipated in agile sprints and daily stand-ups, consistently meeting project deadlines.",
    },
  ],
  education: [
    {
      id: "1",
      degree: "B.S. Computer Science",
      institution: "University of California, Berkeley",
      year: "2018",
    },
  ],
  projects: [
    {
      id: "1",
      name: "E-commerce Analytics Dashboard",
      description:
        "A full-stack dashboard built with React, Node.js, and PostgreSQL to track real-time sales metrics and inventory.",
      link: "github.com/johndoe/ecommerce-dash",
    },
    {
      id: "2",
      name: "Task Management API",
      description:
        "RESTful API built with Express and MongoDB featuring JWT authentication and role-based access control.",
      link: "github.com/johndoe/task-api",
    },
  ],
  certifications: [
    {
      id: "1",
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      year: "2022",
    },
  ],
  skills:
    "JavaScript, TypeScript, React, Node.js, Tailwind CSS, PostgreSQL, MongoDB, AWS, Git, Agile Methodology",
  coverLetter: {
    recipientName: "Hiring Manager",
    companyName: "Tech Innovations LLC",
    jobReference: "Software Engineer Position",
    body: "I am writing to express my interest in the Software Engineer position at Tech Innovations LLC. With over 5 years of experience in full-stack development, I have a proven track record of building scalable web applications and leading cross-functional teams.\n\nIn my previous role at Tech Solutions Inc., I spearheaded the development of a React-based customer portal that increased user engagement by 40%. I am passionate about writing clean, maintainable code and mentoring junior developers to achieve their full potential.\n\nI am drawn to Tech Innovations LLC because of your commitment to cutting-edge technology and innovative solutions. I am confident that my skills in JavaScript, React, and Node.js align perfectly with your requirements.\n\nThank you for considering my application. I look forward to the opportunity to discuss how my background, skills, and certifications will be beneficial to your team.",
  },
};

const emptyData: ResumeData = {
  name: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  summary: "",
  experience: [],
  education: [],
  projects: [],
  certifications: [],
  skills: "",
  coverLetter: {
    recipientName: "",
    companyName: "",
    jobReference: "",
    body: "",
  },
};

const calculateATSScore = (data: ResumeData) => {
  let score = 0;
  const checks = {
    personal: false,
    summary: false,
    experience: false,
    skills: false,
    actionVerbs: false,
    noPlaceholder: false,
    contactFormat: false,
    metrics: false,
    education: false,
    linkedin: false,
  };

  if (data.name.trim() && data.email.trim() && data.phone.trim()) {
    score += 10;
    checks.personal = true;
  }

  if (data.summary.trim().length > 100) {
    score += 10;
    checks.summary = true;
  }

  if (
    data.experience.length > 0 &&
    data.experience.some((exp) => exp.responsibilities.trim().length > 0)
  ) {
    score += 10;
    checks.experience = true;
  }

  const skillsList = data.skills
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s);
  if (skillsList.length >= 7) {
    score += 10;
    checks.skills = true;
  }

  const actionVerbs = [
    "achieved",
    "managed",
    "developed",
    "led",
    "created",
    "improved",
    "increased",
    "implemented",
    "designed",
    "spearheaded",
    "directed",
    "resolved",
    "maximized",
    "optimized",
    "generated",
  ];
  const allText = JSON.stringify(data).toLowerCase();

  const foundVerbs = actionVerbs.filter((verb) => allText.includes(verb));
  if (foundVerbs.length >= 3) {
    score += 10;
    checks.actionVerbs = true;
  }

  if (
    !allText.includes("lorem ipsum") &&
    !allText.includes("placeholder") &&
    allText.length > 100
  ) {
    score += 10;
    checks.noPlaceholder = true;
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
  const phoneValid = data.phone.replace(/[^0-9]/g, "").length >= 7;
  if (emailValid && phoneValid) {
    score += 10;
    checks.contactFormat = true;
  }

  const hasMetrics =
    /\d+%|\$\d+|\d+x/i.test(allText) ||
    /\b(percent|dollars|revenue|increased by|decreased by)\b/i.test(allText);
  if (hasMetrics) {
    score += 15;
    checks.metrics = true;
  }

  if (
    data.education &&
    data.education.length > 0 &&
    data.education[0].institution.trim()
  ) {
    score += 10;
    checks.education = true;
  }

  if (data.linkedin && data.linkedin.trim()) {
    score += 5;
    checks.linkedin = true;
  }

  return { score, checks };
};

const resumeSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "Full name of the person. Do not include titles here." },
    title: { type: Type.STRING, description: "Professional title, e.g., 'Software Engineer'." },
    email: { type: Type.STRING },
    phone: { type: Type.STRING },
    location: { type: Type.STRING },
    linkedin: { type: Type.STRING },
    summary: { type: Type.STRING, description: "A brief professional summary. Do NOT include heading words like 'Profile' or 'Summary' in the text." },
    experience: {
      type: Type.ARRAY,
      description: "List of work experiences.",
      items: {
        type: Type.OBJECT,
        properties: {
          jobTitle: { type: Type.STRING },
          company: { type: Type.STRING },
          startDate: { type: Type.STRING },
          endDate: { type: Type.STRING },
          responsibilities: { type: Type.STRING, description: "A single string containing bullet points separated by newlines." },
        },
      },
    },
    education: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          degree: { type: Type.STRING },
          institution: { type: Type.STRING },
          year: { type: Type.STRING },
        },
      },
    },
    projects: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          link: { type: Type.STRING },
        },
      },
    },
    certifications: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          issuer: { type: Type.STRING },
          year: { type: Type.STRING },
        },
      },
    },
    skills: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Array of technical skills. Do NOT include heading words like 'Skills'."
    },
  },
};

export default function App() {
  const [data, setData] = useState<ResumeData>(() => {
    // Changed key to v4 to clear the corrupted "DISTINGUISHED" AI data
    const saved = localStorage.getItem("quickResumeDataV4");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...initialData,
          ...parsed,
          experience: parsed.experience || [],
          education: parsed.education || [],
          projects: parsed.projects || [],
          certifications: parsed.certifications || [],
        };
      } catch (e) {
        return initialData;
      }
    }
    return initialData;
  });

  const [category, setCategory] = useState<
    | "tech"
    | "business"
    | "healthcare"
    | "creative"
    | "modern"
    | "minimal"
    | "academic"
    | "startup"
    | "corporate"
    | "freelancer"
    | "clean"
    | "modern-pro"
    | string
  >("modern-pro");
  const [themeColor, setThemeColor] = useState<string>("#10b981");
  const [paperSize, setPaperSize] = useState<"a4" | "letter">("a4");
  
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    return localStorage.getItem("themeMode") === "light";
  });

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add("theme-light");
      localStorage.setItem("themeMode", "light");
    } else {
      document.body.classList.remove("theme-light");
      localStorage.setItem("themeMode", "dark");
    }
  }, [isLightMode]);

  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        handlePrint();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [expandedSection, setExpandedSection] = useState<string>("personal");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingLetter, setIsGeneratingLetter] = useState(false);
  const [atsInfo, setAtsInfo] = useState(calculateATSScore(data));
  useEffect(() => {
    const handler = setTimeout(() => {
      setAtsInfo(calculateATSScore(data));
    }, 500);
    return () => clearTimeout(handler);
  }, [data]);
  const [activeTab, setActiveTab] = useState<"resume" | "coverLetter">(
    "resume",
  );
  const [showAIModal, setShowAIModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [roleInputText, setRoleInputText] = useState("");

  const [showATSModal, setShowATSModal] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [isGeneratingInterview, setIsGeneratingInterview] = useState(false);
  const [interviewQuestions, setInterviewQuestions] = useState<any[]>([]);
  const [aiInputText, setAiInputText] = useState("");
  const [jobDescriptionText, setJobDescriptionText] = useState("");
  const [aiSuggestedSkillsList, setAiSuggestedSkillsList] = useState<{label: string, items: string[]}[] | null>(null);
  const [isGeneratingSkills, setIsGeneratingSkills] = useState(false);
  const [jobMatchResult, setJobMatchResult] = useState<{
    matchPercentage: number;
    missingKeywords: string[];
    advice: string;
    keyStrengths: string[];
  } | null>(null);
  const [isAnalyzingMatch, setIsAnalyzingMatch] = useState(false);
  const [isParsingPDF, setIsParsingPDF] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      showToast("Please upload a PDF file", "error");
      return;
    }

    try {
      setIsParsingPDF(true);
      const arrayBuffer = await file.arrayBuffer();
      
      const pdfjsLib = await import("pdfjs-dist");
      const pdfWorker = await import("pdfjs-dist/build/pdf.worker.mjs?url");
      pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker.default;

      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = "";

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(" ");
        fullText += pageText + "\n";
      }

      setAiInputText(fullText.trim());
      showToast(
        "PDF parsed successfully. You can now generate your resume.",
        "success",
      );
    } catch (err) {
      console.error("PDF Parsing error:", err);
      showToast(
        "Failed to parse PDF. Please try pasting the text instead.",
        "error",
      );
    } finally {
      setIsParsingPDF(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const [mobileView, setMobileView] = useState<"editor" | "preview">("editor");
  const [currentView, setCurrentView] = useState<"home" | "app" | "demo">(
    "home",
  );
  const [demoTitle, setDemoTitle] = useState("Coming Soon");
  const [isEnhancingSummary, setIsEnhancingSummary] = useState(false);
  const [enhancingExp, setEnhancingExp] = useState<string | null>(null);
  const [enhancingProj, setEnhancingProj] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(1);

  useEffect(() => {
    const update = () => {
      if (previewContainerRef.current) {
        const w = previewContainerRef.current.clientWidth;
        const docW = paperSize === "letter" ? 816 : 794;
        const padding = window.innerWidth < 768 ? 32 : 64;
        setPreviewScale(Math.min(1, (w - padding) / docW));
      }
    };
    update();
    const ro = new ResizeObserver(update);
    if (previewContainerRef.current) ro.observe(previewContainerRef.current);
    return () => ro.disconnect();
  }, [paperSize, activeTab]);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "loading" | "info";
  } | null>(null);

  // New stepper state for layout matching screenshots
  const [builderStep, setBuilderStep] = useState<
    | "init"
    | "templates"
    | "contact"
    | "experience"
    | "education"
    | "skills"
    | "summary"
    | "preview"
  >("init");

  const showToast = (
    message: string,
    type: "success" | "error" | "loading" | "info" = "info",
  ) => {
    setToast({ message, type });
  };

  const enhanceSummaryWithAI = async () => {
    if (!data.summary.trim()) {
      showToast(
        "Please enter some summary text first for the AI to enhance.",
        "info",
      );
      return;
    }
    const apiKey = (import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY);
    if (!apiKey) {
      showToast(
        "Gemini API key is missing. Please check your environment variables.",
        "error",
      );
      return;
    }
    try {
      setIsEnhancingSummary(true);
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are an expert resume writer. Enhance the following professional summary. Make it punchy, action-oriented, ATS-friendly, and highly professional without making up facts. Output ONLY the improved text:\n\n${data.summary}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      if (response.text) {
        setData((prev) => ({ ...prev, summary: response.text.trim() }));
        showToast("✅ AI content added! Review and edit as needed.", "success");
      }
    } catch (err) {
      console.error("Failed to enhance summary:", err);
      showToast("❌ AI generation failed. Please try again.", "error");
    } finally {
      setIsEnhancingSummary(false);
    }
  };

  const enhanceExperienceWithAI = async (
    id: string,
    jobTitle: string,
    currentText: string,
  ) => {
    if (!jobTitle) {
      showToast(
        "Please enter a Job Title first for the AI to understand the role.",
        "info",
      );
      return;
    }
    const apiKey = (import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY);
    if (!apiKey) {
      showToast("Gemini API key is missing.", "error");
      return;
    }
    try {
      setEnhancingExp(id);
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Rewrite and enhance these resume responsibilities for a ${jobTitle} role to be professional, impactful, and ATS-friendly. Use strong action verbs and highlight achievements. If the current text is empty, generate 3 standard bullet points for this role. Return ONLY the bullet points, no intro/outro.\n\nCurrent Text:\n${currentText || "Empty"}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      if (response.text) {
        handleExperienceChange(id, "responsibilities", response.text.trim());
        showToast("✅ AI content added! Review and edit as needed.", "success");
      }
    } catch (err) {
      console.error("Failed to enhance experience:", err);
      showToast("❌ AI generation failed. Please try again.", "error");
    } finally {
      setEnhancingExp(null);
    }
  };

  const enhanceProjectWithAI = async (
    id: string,
    projectName: string,
    currentText: string,
  ) => {
    if (!projectName) {
      showToast("Please enter a Project Name first.", "info");
      return;
    }
    const apiKey = (import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY);
    if (!apiKey) {
      showToast("Gemini API key is missing.", "error");
      return;
    }
    try {
      setEnhancingProj(id);
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Rewrite and enhance this project description for a resume (Project: ${projectName}). Make it professional, action-oriented, and highlight technical or business impact. If empty, generate a generic placeholder description for this project. Return ONLY the description text, no intro/outro.\n\nCurrent Text:\n${currentText || "Empty"}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      if (response.text) {
        handleProjectChange(id, "description", response.text.trim());
        showToast("✅ AI content added! Review and edit as needed.", "success");
      }
    } catch (err) {
      console.error("Failed to enhance project:", err);
      showToast("❌ AI generation failed. Please try again.", "error");
    } finally {
      setEnhancingProj(null);
    }
  };

  
  const handleShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('ref', 'quickresume');
    navigator.clipboard.writeText(url.toString());
    showToast("✅ Link copied! Share your resume layout.", "success");
  };

  const getWordCount = (text: string) => text.trim() ? text.trim().split(/\s+/).length : 0;
  
  const handleExportDocx = () => {
    const header =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML to Word Document</title></head><body>";
    const footer = "</body></html>";
    const sourceHTML =
      header + document.getElementById("preview-content")?.innerHTML + footer;

    const source =
      "data:application/vnd.ms-word;charset=utf-8," +
      encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download =
      activeTab === "resume" ? "resume.doc" : "cover-letter.doc";
    fileDownload.click();
    document.body.removeChild(fileDownload);
    showToast("✅ Resume exported as Word document!", "success");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem("quickResumeDataV4", JSON.stringify(data));
      } catch (e) {
        console.warn("Failed to save to localStorage", e);
        showToast("Auto-save failed. Storage might be full.", "error");
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [data]);

  useEffect(() => {
    setAtsInfo(calculateATSScore(data));
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoverLetterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      coverLetter: { ...prev.coverLetter, [name]: value },
    }));
  };

  // Experience Handlers
  const handleExperienceChange = (
    id: string,
    field: keyof Experience,
    value: string,
  ) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    }));
  };

  const addExperience = () => {
    setData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: crypto.randomUUID(),
          jobTitle: "",
          company: "",
          startDate: "",
          endDate: "",
          responsibilities: "",
        },
      ],
    }));
  };

  const removeExperience = (id: string) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  // Education Handlers
  const handleEducationChange = (
    id: string,
    field: keyof Education,
    value: string,
  ) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu,
      ),
    }));
  };

  const addEducation = () => {
    setData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { id: crypto.randomUUID(), degree: "", institution: "", year: "" },
      ],
    }));
  };

  const removeEducation = (id: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  // Project Handlers
  const handleProjectChange = (
    id: string,
    field: keyof Project,
    value: string,
  ) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj,
      ),
    }));
  };

  const addProject = () => {
    setData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        { id: crypto.randomUUID(), name: "", description: "", link: "" },
      ],
    }));
  };

  const removeProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }));
  };

  // Certification Handlers
  const handleCertificationChange = (
    id: string,
    field: keyof Certification,
    value: string,
  ) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert,
      ),
    }));
  };

  const addCertification = () => {
    setData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        { id: crypto.randomUUID(), name: "", issuer: "", year: "" },
      ],
    }));
  };

  const removeCertification = (id: string) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((cert) => cert.id !== id),
    }));
  };

  const generateAIResume = async (roleOverride?: string) => {
    const role = roleOverride || roleInputText;
    if (!role) return;

    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({
        apiKey: (import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY),
      });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Generate a complete sample resume for a '${role}'. Return ONLY valid JSON.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: resumeSchema,
        },
      });

      const generatedData = JSON.parse(response.text);

      if (typeof generatedData.title === "string") generatedData.title = generatedData.title.substring(0, 100);
      if (typeof generatedData.name === "string") generatedData.name = generatedData.name.substring(0, 80);
      if (typeof generatedData.summary === "string") generatedData.summary = generatedData.summary.substring(0, 1500);

      if (Array.isArray(generatedData.skills)) {
        generatedData.skills = generatedData.skills.join(", ");
      }
      if (typeof generatedData.skills === "string") {
        generatedData.skills = generatedData.skills.replace(/\s*[\/\n]+\s*/g, ", ").substring(0, 3000);
      }
      generatedData.experience = (generatedData.experience || []).map(
        (e: any) => ({
          ...e,
          id: crypto.randomUUID(),
          responsibilities: Array.isArray(e.responsibilities) 
            ? e.responsibilities.join("\n") 
            : e.responsibilities || ""
        }),
      );
      generatedData.education = (generatedData.education || []).map(
        (e: any) => ({ ...e, id: crypto.randomUUID() }),
      );
      generatedData.projects = (generatedData.projects || []).map((e: any) => ({
        ...e,
        id: crypto.randomUUID(),
      }));
      generatedData.certifications = (generatedData.certifications || []).map(
        (e: any) => ({ ...e, id: crypto.randomUUID() }),
      );

      setData({ ...emptyData, ...generatedData });
      showToast("✅ AI content added! Review and edit as needed.", "success");
    } catch (error: any) {
      console.error(error);
      showToast("❌ AI generation failed. Please try again.", "error");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateInterviewPrep = async () => {
    setIsGeneratingInterview(true);
    try {
      const ai = new GoogleGenAI({
        apiKey: (import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY),
      });
      const prompt = `You are an expert technical interviewer and recruiter. Based on the following resume data, generate 10 highly relevant behavioral and technical interview questions, along with suggested answers or tips for the candidate. Return ONLY valid JSON as an array of objects with keys: "question", "type" (Technical/Behavioral), "tips".\n\nResume Data:\n${JSON.stringify(data, null, 2)}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                question: { type: "string" },
                type: { type: "string" },
                tips: { type: "string" },
              },
              required: ["question", "type", "tips"],
            },
          },
        },
      });

      const generated = JSON.parse(response.text || "[]");
      setInterviewQuestions(generated);
      showToast("✅ AI content added! Review and edit as needed.", "success");
    } catch (err: any) {
      console.error(err);
      showToast("❌ AI generation failed. Please try again.", "error");
    } finally {
      setIsGeneratingInterview(false);
    }
  };

  const handleAIBuild = async (overrideText?: string) => {
    const textToParse =
      typeof overrideText === "string" ? overrideText : aiInputText;
    if (!textToParse.trim()) return;
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({
        apiKey: (import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY),
      });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are an expert resume writer. Parse the following text and build a professional, highly-optimized resume from it. 
        If some details are missing, infer reasonable professional defaults or leave them blank. 
        Enhance the bullet points to be action-oriented and impactful.
        Return ONLY valid JSON matching the schema.
        
        Text to parse:
        ${textToParse}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: resumeSchema,
        },
      });

      const generatedData = JSON.parse(response.text);

      if (typeof generatedData.title === "string") generatedData.title = generatedData.title.substring(0, 100);
      if (typeof generatedData.name === "string") generatedData.name = generatedData.name.substring(0, 80);
      if (typeof generatedData.summary === "string") generatedData.summary = generatedData.summary.substring(0, 1500);

      if (Array.isArray(generatedData.skills)) {
        generatedData.skills = generatedData.skills.join(", ");
      }
      if (typeof generatedData.skills === "string") {
        generatedData.skills = generatedData.skills.replace(/\s*[\/\n]+\s*/g, ", ").substring(0, 3000);
      }
      generatedData.experience = (generatedData.experience || []).map(
        (e: any) => ({
          ...e,
          id: crypto.randomUUID(),
          responsibilities: Array.isArray(e.responsibilities) 
            ? e.responsibilities.join("\n") 
            : e.responsibilities || ""
        }),
      );
      generatedData.education = (generatedData.education || []).map(
        (e: any) => ({ ...e, id: crypto.randomUUID() }),
      );
      generatedData.projects = (generatedData.projects || []).map((e: any) => ({
        ...e,
        id: crypto.randomUUID(),
      }));
      generatedData.certifications = (generatedData.certifications || []).map(
        (e: any) => ({ ...e, id: crypto.randomUUID() }),
      );

      setData({ ...emptyData, ...generatedData });
      showToast("✅ AI content added! Review and edit as needed.", "success");
      setShowAIModal(false);
      if (currentView === "home") {
        setCurrentView("app");
      }
      setAiInputText("");
    } catch (error: any) {
      console.error(error);
      showToast("❌ AI generation failed. Please try again.", "error");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateAISkills = async () => {
    setIsGeneratingSkills(true);
    try {
      const ai = new GoogleGenAI({
        apiKey: (import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY),
      });

      const prompt = `Based on the user's title "${data.title}" and summary "${data.summary}", suggest a categorized list of skills. 
      Return ONLY valid JSON in format: [{"label": "Category Name", "items": ["Skill 1", "Skill 2"]}]`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                items: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
            },
          },
        },
      });

      if (response.text) {
        const generated = JSON.parse(response.text);
        setAiSuggestedSkillsList(generated);
        showToast("✅ Skills suggested!", "success");
      }
    } catch (error) {
      console.error(error);
      showToast("❌ AI skill generation failed.", "error");
    } finally {
      setIsGeneratingSkills(false);
    }
  };

  const generateAICoverLetter = async () => {
    if (!data.coverLetter.companyName || !data.coverLetter.jobReference) {
      showToast(
        "Please enter a Company Name and Job Reference first so the AI can tailor the letter.",
        "info",
      );
      return;
    }

    setIsGeneratingLetter(true);
    try {
      const ai = new GoogleGenAI({
        apiKey: (import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY),
      });

      const prompt = `Write a professional cover letter body for a candidate named ${data.name || "a professional"} applying for the ${data.coverLetter.jobReference} position at ${data.coverLetter.companyName}. 
      
      Here is the candidate's background:
      Summary: ${data.summary}
      Experience: ${data.experience.map((e) => `${e.jobTitle} at ${e.company}`).join(", ")}
      Skills: ${data.skills}
      
      Instructions:
      - Write ONLY the body paragraphs of the cover letter.
      - DO NOT include the greeting (e.g., "Dear Hiring Manager").
      - DO NOT include the sign-off (e.g., "Sincerely, [Name]").
      - Keep it to 3-4 concise, impactful paragraphs.
      - Make it sound professional, confident, and tailored to the role.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      setData((prev) => ({
        ...prev,
        coverLetter: {
          ...prev.coverLetter,
          body: response.text?.trim() || "",
        },
      }));
      showToast("✅ AI content added! Review and edit as needed.", "success");
    } catch (error) {
      console.error(error);
      showToast("❌ AI generation failed. Please try again.", "error");
    } finally {
      setIsGeneratingLetter(false);
    }
  };

  const handlePrint = async () => {
    const element = document.getElementById("preview-content");
    if (!element) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      showToast("Please allow popups to download PDF.", "error");
      return;
    }

    const htmlContent = element.outerHTML;
    const styles = Array.from(
      document.querySelectorAll('style, link[rel="stylesheet"]'),
    )
      .map((node) => node.outerHTML)
      .join("\n");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${activeTab === "resume" ? "Resume" : "Cover Letter"}</title>
          ${styles}
          <style>
            @page {
              size: ${paperSize === "a4" ? "210mm 297mm" : "215.9mm 279.4mm"};
              margin: 0 !important;
            }
            body {
              margin: 0;
              padding: 0;
              background-color: white !important;
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            #preview-content {
              width: ${paperSize === "a4" ? "210mm" : "215.9mm"} !important;
              box-shadow: none !important;
              margin: 0 !important;
              overflow: hidden !important;
            }
          </style>
        </head>
        <body>
          ${htmlContent}
          <script>
            window.onload = () => {
              window.print();
              setTimeout(() => { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
    showToast("✅ Resume exported as PDF!", "success");
  };

  return (
    <main className="flex flex-col h-screen bg-[var(--color-bg)] overflow-hidden">
      <Helmet>
        <title>QuickResume | Free AI ATS Resume Builder & Cover Letter Generator</title>
        <meta
          name="description"
          content="Build a professional, ATS-friendly resume for free in minutes. Our AI-powered resume builder extracts your experience and formats it instantly."
        />
        <meta
          name="keywords"
          content="resume builder, AI resume, free CV maker, ATS-friendly resume, professional resume templates, quick resume, online resume generator, smart resume maker"
        />
        <meta name="author" content="QuickResume" />
        <link rel="canonical" href="https://quickresume.app" />
        <meta property="og:title" content="QuickResume | Free AI ATS Resume Builder & Cover Letter Generator" />
        <meta property="og:description" content="Build a professional, ATS-friendly resume for free in minutes. Our AI-powered resume builder extracts your experience and formats it instantly." />
        <meta property="og:url" content="https://quickresume.app" />
        <meta name="twitter:title" content="QuickResume | Free AI ATS Resume Builder & Cover Letter Generator" />
        <meta name="twitter:description" content="Build a professional, ATS-friendly resume for free in minutes." />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* ATS Score Checker Modal */}
      {showATSModal && (
        <div className="fixed inset-0 bg-[var(--color-bg)]/80 backdrop-blur-md flex items-center justify-center z-[200] p-4 animate-in fade-in duration-200">
          <div className="glass-card rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.6)] w-full max-w-xl overflow-hidden flex flex-col max-h-[85vh] border border-[var(--color-border-hover)]">
            <div className="p-6 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-border)]">
              <h2 className="text-xl font-bold text-[var(--text-main)] flex items-center gap-2">
                <CheckCircle className="text-emerald-500" /> Detailed ATS
                Analysis
              </h2>
              <button
                onClick={() => setShowATSModal(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
              >
                <XCircle size={24} />
              </button>
            </div>
            <div className="p-8 overflow-y-auto overscroll-contain flex-1 flex flex-col items-center hide-scrollbar">
              <div className="relative w-32 h-32 mb-6">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    className="text-[var(--color-border-hover)]"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={`${atsInfo.score >= 80 ? "text-emerald-500" : atsInfo.score >= 50 ? "text-amber-500" : "text-rose-500"} transition-all duration-500 ease-in-out drop-shadow-[0_0_10px_currentColor]`}
                    strokeDasharray={`${atsInfo.score}, 100`}
                    strokeWidth="4"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-[var(--text-main)]">
                    {atsInfo.score}
                  </span>
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
                    Score
                  </span>
                </div>
              </div>
              <p className="text-center text-[var(--text-muted)] mb-8 max-w-md text-[15px] leading-relaxed">
                {atsInfo.score >= 80
                  ? "Excellent! Your resume is highly compatible with ATS systems."
                  : atsInfo.score >= 50
                    ? "Good start, but your resume needs some improvements to pass ATS filters consistently."
                    : "Your resume needs significant work to be easily readable by ATS systems. Follow the tips below."}
              </p>

              <div className="w-full space-y-4">
                <h3 className="font-bold text-[var(--text-main)] flex items-center gap-2 mb-4">
                  <Menu className="text-emerald-500" size={18} /> Analysis
                  Breakdown
                </h3>

                <div className="bg-[var(--color-border)] rounded-2xl p-4 border border-[var(--color-border)] flex items-start gap-3">
                  {atsInfo.checks.personal ? (
                    <CheckCircle2
                      className="text-emerald-500 shrink-0"
                      size={20}
                    />
                  ) : (
                    <XCircle className="text-rose-500 shrink-0" size={20} />
                  )}
                  <div>
                    <h4 className="font-bold text-[var(--text-main)] text-sm mb-1">
                      Contact Information
                    </h4>
                    <p className="text-[13px] text-[var(--text-muted)]">
                      Ensure your full name, email, and phone number are
                      present.
                    </p>
                  </div>
                </div>

                <div className="bg-[var(--color-border)] rounded-2xl p-4 border border-[var(--color-border)] flex items-start gap-3">
                  {atsInfo.checks.summary ? (
                    <CheckCircle2
                      className="text-emerald-500 shrink-0"
                      size={20}
                    />
                  ) : (
                    <XCircle className="text-rose-500 shrink-0" size={20} />
                  )}
                  <div>
                    <h4 className="font-bold text-[var(--text-main)] text-sm mb-1">
                      Professional Summary
                    </h4>
                    <p className="text-[13px] text-[var(--text-muted)]">
                      A strong summary with more than 100 characters helps ATS
                      analyze your profile.
                    </p>
                  </div>
                </div>

                <div className="bg-[var(--color-border)] rounded-2xl p-4 border border-[var(--color-border)] flex items-start gap-3">
                  {atsInfo.checks.experience ? (
                    <CheckCircle2
                      className="text-emerald-500 shrink-0"
                      size={20}
                    />
                  ) : (
                    <XCircle className="text-rose-500 shrink-0" size={20} />
                  )}
                  <div>
                    <h4 className="font-bold text-[var(--text-main)] text-sm mb-1">
                      Experience Bullet Points
                    </h4>
                    <p className="text-[13px] text-[var(--text-muted)]">
                      Detailed bullet points instead of blocks of text are
                      preferred by ATS.
                    </p>
                  </div>
                </div>

                <div className="bg-[var(--color-border)] rounded-2xl p-4 border border-[var(--color-border)] flex items-start gap-3">
                  {atsInfo.checks.skills ? (
                    <CheckCircle2
                      className="text-emerald-500 shrink-0"
                      size={20}
                    />
                  ) : (
                    <XCircle className="text-rose-500 shrink-0" size={20} />
                  )}
                  <div>
                    <h4 className="font-bold text-[var(--text-main)] text-sm mb-1">
                      Keywords & Skills
                    </h4>
                    <p className="text-[13px] text-[var(--text-muted)]">
                      Including 7+ skills ensures your resume is indexed
                      correctly for searches.
                    </p>
                  </div>
                </div>

                <div className="bg-[var(--color-border)] rounded-2xl p-4 border border-[var(--color-border)] flex items-start gap-3">
                  {atsInfo.checks.metrics ? (
                    <CheckCircle2
                      className="text-emerald-500 shrink-0"
                      size={20}
                    />
                  ) : (
                    <XCircle className="text-rose-500 shrink-0" size={20} />
                  )}
                  <div>
                    <h4 className="font-bold text-[var(--text-main)] text-sm mb-1">
                      Measurable Results (Metrics)
                    </h4>
                    <p className="text-[13px] text-[var(--text-muted)]">
                      Include numbers, percentages, or dollar amounts to prove
                      your impact.
                    </p>
                  </div>
                </div>

                <div className="bg-[var(--color-border)] rounded-2xl p-4 border border-[var(--color-border)] flex items-start gap-3">
                  {atsInfo.checks.education ? (
                    <CheckCircle2
                      className="text-emerald-500 shrink-0"
                      size={20}
                    />
                  ) : (
                    <XCircle className="text-rose-500 shrink-0" size={20} />
                  )}
                  <div>
                    <h4 className="font-bold text-[var(--text-main)] text-sm mb-1">
                      Education Section
                    </h4>
                    <p className="text-[13px] text-[var(--text-muted)]">
                      ATS looks for degrees and institutions to match job
                      requirements.
                    </p>
                  </div>
                </div>

                <div className="bg-[var(--color-border)] rounded-2xl p-4 border border-[var(--color-border)] flex items-start gap-3">
                  {atsInfo.checks.linkedin ? (
                    <CheckCircle2
                      className="text-emerald-500 shrink-0"
                      size={20}
                    />
                  ) : (
                    <XCircle className="text-rose-500 shrink-0" size={20} />
                  )}
                  <div>
                    <h4 className="font-bold text-[var(--text-main)] text-sm mb-1">
                      LinkedIn Profile
                    </h4>
                    <p className="text-[13px] text-[var(--text-muted)]">
                      A LinkedIn URL improves credibility and provides a fuller
                      picture of your profile.
                    </p>
                  </div>
                </div>
              </div>

              {/* NEW Feature: Deep AI Job Matcher inside ATS Modal */}
              <div className="w-full border-t border-[var(--color-border-hover)] pt-8 mt-8">
                <h3 className="font-bold text-[var(--text-main)] flex items-center gap-2 mb-3">
                  <Brain className="text-blue-400" size={18} /> Deep AI Job
                  Matcher
                </h3>

                {!jobMatchResult ? (
                  <>
                    <p className="text-[14px] text-[var(--text-muted)] mb-4">
                      Paste a job description below to see how well your resume
                      matches the role and get tailored keyword suggestions.
                    </p>
                    <textarea
                      value={aiInputText}
                      onChange={(e) => setAiInputText(e.target.value)}
                      placeholder="Paste Job Description here..."
                      className="w-full h-32 p-4 bg-[var(--color-border)] border border-[var(--color-border-hover)] rounded-xl text-[var(--text-main)] text-[14px] focus:outline-none focus:border-blue-500 focus:bg-[var(--color-border-hover)] resize-none mb-4 placeholder:text-transparent peer hide-scrollbar"
                    ></textarea>
                    <div className="flex gap-3">
                      <button
                        onClick={async () => {
                          if (!aiInputText.trim()) {
                            showToast(
                              "Please enter a Job Description first.",
                              "info",
                            );
                            return;
                          }
                          const apiKey =
                            (import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY);
                          if (!apiKey) {
                            showToast("Gemini API key is missing.", "error");
                            return;
                          }
                          setIsAnalyzingMatch(true);
                          try {
                            const { GoogleGenAI, Type } =
                              await import("@google/genai");
                            const ai = new GoogleGenAI({ apiKey });
                            const prompt = `Analyze this resume data against the Job Description. Be accurate and critical.
                             Resume: ${JSON.stringify(data)}
                             Job Description: ${jobDescriptionText.trim()}`;

                            const response = await ai.models.generateContent({
                              model: "gemini-2.5-flash",
                              contents: prompt,
                              config: {
                                responseMimeType: "application/json",
                                responseSchema: {
                                  type: Type.OBJECT,
                                  properties: {
                                    matchPercentage: { type: Type.INTEGER },
                                    missingKeywords: {
                                      type: Type.ARRAY,
                                      items: { type: Type.STRING },
                                    },
                                    keyStrengths: {
                                      type: Type.ARRAY,
                                      items: { type: Type.STRING },
                                    },
                                    advice: { type: Type.STRING },
                                  },
                                },
                              },
                            });

                            if (response.text) {
                              const result = JSON.parse(response.text);
                              setJobMatchResult(result);
                              showToast(
                                "✅ AI content added! Review and edit as needed.",
                                "success",
                              );
                            }
                          } catch (e) {
                            console.error(e);
                            showToast(
                              "❌ AI generation failed. Please try again.",
                              "error",
                            );
                          } finally {
                            setIsAnalyzingMatch(false);
                          }
                        }}
                        disabled={isAnalyzingMatch || !aiInputText.trim()}
                        className="bg-blue-500 hover:bg-blue-400 font-bold text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all w-full disabled:opacity-50"
                      >
                        {isAnalyzingMatch ? (
                          <Loader2 className="animate-spin" size={18} />
                        ) : (
                          <Sparkles size={18} />
                        )}
                        {isAnalyzingMatch
                          ? "Analyzing Match..."
                          : "Analyze Match"}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="glass-card border border-[var(--color-border-hover)] rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none"></div>
                    <div className="flex justify-between items-start mb-6 border-b border-[var(--color-border)] pb-4">
                      <div>
                        <h4 className="font-bold text-[var(--text-main)] flex items-center gap-2">
                          Match Results
                        </h4>
                        <p className="text-xs text-[var(--text-muted)] mt-1">
                          Based on the provided Job Description
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span
                          className={`text-2xl font-black drop-shadow-[0_0_10px_currentColor] ${jobMatchResult.matchPercentage >= 75 ? "text-emerald-500" : jobMatchResult.matchPercentage >= 50 ? "text-amber-500" : "text-rose-500"}`}
                        >
                          {jobMatchResult.matchPercentage}%
                        </span>
                        <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider mt-0.5">
                          Match Score
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <h5 className="text-[13px] font-bold text-[var(--text-main)] mb-2 flex items-center gap-1.5">
                          <CheckCircle2
                            size={14}
                            className="text-emerald-500"
                          />{" "}
                          Key Strengths
                        </h5>
                        <ul className="text-[13px] text-[var(--text-muted)] space-y-1.5">
                          {jobMatchResult.keyStrengths?.map((str, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-emerald-500 mt-0.5 shrink-0">
                                •
                              </span>{" "}
                              {str}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-[13px] font-bold text-[var(--text-main)] mb-2 flex items-center gap-1.5">
                          <XCircle size={14} className="text-rose-500" />{" "}
                          Missing Keywords
                        </h5>
                        <div className="flex flex-wrap gap-1.5">
                          {jobMatchResult.missingKeywords?.map((kw, i) => (
                            <span
                              key={i}
                              className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs px-2.5 py-1 rounded-md font-medium"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-[var(--color-border)] border border-[var(--color-border-hover)] p-4 rounded-xl">
                        <h5 className="text-[13px] font-bold text-[var(--text-main)] mb-2 flex items-center gap-1.5">
                          <Sparkles size={14} className="text-blue-400" />{" "}
                          Improvement Advice
                        </h5>
                        <p className="text-[13px] text-[var(--text-main)] italic leading-relaxed">
                          "{jobMatchResult.advice}"
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setJobMatchResult(null)}
                      className="text-[13px] font-bold w-full justify-center bg-[var(--color-border)] py-2.5 rounded-lg text-[var(--text-main)] hover:text-[var(--text-main)] hover:bg-[var(--color-border-hover)] transition-colors flex items-center gap-1.5"
                    >
                      <RefreshCw size={14} /> Analyze Another Job
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="p-6 border-t border-[var(--color-border)] bg-[var(--color-border)] flex justify-end gap-3 z-10 backdrop-blur-md">
              <button
                onClick={() => setShowATSModal(false)}
                className="bg-white text-slate-900 hover:bg-slate-200 px-6 py-2.5 rounded-xl font-bold transition-colors shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interview Prep Modal */}
      {showInterviewModal && (
        <div className="fixed inset-0 bg-[var(--color-bg)]/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="glass-card rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.6)] w-full max-w-4xl overflow-hidden flex flex-col max-h-[85vh] border border-[var(--color-border-hover)]">
            <div className="p-6 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-border)] shrink-0">
              <h2 className="text-xl font-bold text-[var(--text-main)] flex items-center gap-2">
                <Brain className="text-purple-500" /> AI Interview Prep Kit
              </h2>
              <button
                onClick={() => setShowInterviewModal(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                disabled={isGeneratingInterview}
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 hide-scrollbar">
              {interviewQuestions.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto py-12">
                  <div className="w-20 h-20 bg-purple-500/10 border border-purple-500/20 flex items-center justify-center rounded-2xl text-purple-400 mb-6">
                    <MessageSquare size={40} className="stroke-[1.5]" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">
                    Generate Custom Interview Questions
                  </h3>
                  <p className="text-[var(--text-muted)] mb-8 leading-relaxed">
                    Our AI will analyze your current resume data and formulate
                    the most likely behavioral and technical questions you might
                    face, along with tips on how to answer them.
                  </p>
                  <button
                    onClick={handleGenerateInterviewPrep}
                    disabled={isGeneratingInterview}
                    className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 w-full transition-all disabled:opacity-70 shadow-lg shadow-purple-600/20"
                  >
                    {isGeneratingInterview ? (
                      <>
                        <Loader2 className="animate-spin" size={20} /> Analyzing
                        Resume...
                      </>
                    ) : (
                      <>
                        <Sparkles size={20} /> Generate Questions
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-[var(--text-main)] text-lg">
                      Your Custom Questions
                    </h3>
                    <button aria-label="Refresh"
                      onClick={handleGenerateInterviewPrep}
                      disabled={isGeneratingInterview}
                      className="text-sm text-purple-400 font-bold flex items-center gap-1.5 hover:text-purple-300 transition-colors bg-purple-400/10 px-3 py-1.5 rounded-lg border border-purple-400/20"
                    >
                      <RefreshCw
                        size={14}
                        className={isGeneratingInterview ? "animate-spin" : ""}
                      />
                      Regenerate
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {interviewQuestions.map((q, idx) => (
                      <div
                        key={idx}
                        className="bg-[var(--color-border)] border border-[var(--color-border-hover)] rounded-2xl p-5 hover:border-purple-500/50 hover:bg-[var(--color-border-hover)] transition-colors group"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${q.type.toLowerCase().includes("technical") ? "bg-blue-500/10 text-blue-400" : "bg-rose-500/10 text-rose-400"}`}
                          >
                            {q.type}
                          </span>
                        </div>
                        <h4 className="font-bold text-[var(--text-main)] text-sm mb-3 group-hover:text-purple-300 transition-colors leading-relaxed">
                          {q.question}
                        </h4>
                        <div className="bg-[var(--color-bg)]/50 border border-[var(--color-border)] text-[13px] rounded-xl p-4 text-[var(--text-main)] leading-relaxed shadow-inner">
                          <span className="font-bold text-purple-400 text-[11px] uppercase tracking-wider block mb-1">
                            Tip:
                          </span>
                          {q.tips}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {interviewQuestions.length > 0 && (
              <div className="p-6 border-t border-[var(--color-border)] bg-[var(--color-border)] flex justify-end gap-3 z-10 backdrop-blur-md">
                <button
                  onClick={() => setShowInterviewModal(false)}
                  className="bg-white text-slate-900 hover:bg-slate-200 px-6 py-2.5 rounded-xl font-bold transition-colors shadow-lg"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AI Resume Maker Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-[var(--color-bg)]/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="glass-card rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.6)] w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh] border border-[var(--color-border-hover)]">
            <div className="p-6 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-border)]">
              <h2 className="text-xl font-bold text-[var(--text-main)] flex items-center gap-2">
                <Sparkles className="text-emerald-500" /> AI Resume Architect
              </h2>
              <button
                onClick={() => setShowAIModal(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                disabled={isGenerating}
              >
                <XCircle size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 hide-scrollbar">
              <p className="text-[14px] leading-relaxed text-[var(--text-muted)] mb-6">
                Paste your existing resume, LinkedIn profile text, or a brief
                work history. Our AI will automatically structure, format, and
                enhance it into a professional resume.
              </p>

              <div className="mb-6">
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handlePdfUpload}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isParsingPDF || isGenerating}
                  className="flex items-center gap-2 bg-[var(--color-border)] hover:bg-[var(--color-border-hover)] text-[var(--text-main)] border-[var(--color-border-hover)] px-4 py-3 rounded-xl font-medium transition-colors border w-full justify-center disabled:opacity-50"
                >
                  {isParsingPDF ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Cloud className="text-emerald-500" size={18} />
                  )}
                  {isParsingPDF ? "Parsing PDF..." : "Upload Existing PDF"}
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6 opacity-60">
                <div className="h-px bg-white/20 flex-1"></div>
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">
                  OR PASTE TEXT
                </span>
                <div className="h-px bg-white/20 flex-1"></div>
              </div>

              <textarea
                value={aiInputText}
                onChange={(e) => setAiInputText(e.target.value)}
                placeholder="E.g., I worked at Google as a Software Engineer from 2020 to 2023. I led a team of 5 and improved system performance by 30%..."
                className="w-full h-64 p-4 border border-[var(--color-border-hover)] rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none bg-[var(--color-bg)]/50 text-[var(--text-main)] transition-shadow hide-scrollbar"
              />
            </div>
            <div className="p-6 border-t border-[var(--color-border)] bg-[var(--color-border)] flex justify-end gap-3 z-10 backdrop-blur-md">
              <button
                onClick={() => setShowAIModal(false)}
                className="px-6 py-2.5 text-[var(--text-main)] hover:bg-[var(--color-border-hover)] hover:text-[var(--text-main)] rounded-xl font-bold transition-colors"
                disabled={isGenerating}
              >
                Cancel
              </button>
              <button
                onClick={() => handleAIBuild()}
                disabled={
                  isGenerating || (!aiInputText.trim() && !isParsingPDF)
                }
                className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 shadow-lg shadow-emerald-500/20"
              >
                {isGenerating ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Wand2 size={18} />
                )}
                {isGenerating
                  ? "Structuring & Enhancing..."
                  : "Generate Resume"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Navigation Header */}
      {currentView !== "app" && (
        <>
          <header className="bg-[var(--color-bg-2)]/80 backdrop-blur-2xl border-b border-[var(--color-border)] px-6 h-[64px] flex justify-between items-center shrink-0 relative z-[100] transition-all">
            {/* LEFT: Logo */}
            <div
              className="flex items-center gap-2 mr-4 cursor-pointer group"
              onClick={() => setCurrentView("home")}
            >
              <div className="relative overflow-hidden flex items-center justify-center w-10 h-10 rounded-[14px] bg-[#11111f] shadow-[0_0_20px_rgba(124,58,237,0.2)] group-hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] transition-all duration-300 border border-[var(--color-border)] group-hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#7c3aed] to-[#06b6d4] opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#7c3aed] to-[#06b6d4] opacity-80 blur-xl group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <svg
                  className="relative z-10 w-5 h-5 drop-shadow-md text-[var(--text-main)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="10" cy="10" r="7" />
                  <path d="M14 14l3 3 5-7" />
                </svg>
              </div>
              <h1 className="text-2xl font-black tracking-tight hidden sm:block md:hidden xl:block text-[var(--text-main)] leading-none font-heading">
                Quick<span className="text-gradient">Resume</span>
              </h1>
            </div>

            {/* CENTER: Navigation */}
            <nav className="hidden md:flex items-center bg-[var(--color-bg-3)]/50 backdrop-blur-md border border-[var(--color-border)] rounded-full px-2 py-1.5 h-12">
              <button
                onClick={() => setCurrentView("home")}
                className={`relative px-5 py-2 font-medium text-sm transition-colors rounded-full z-10 ${currentView === "home" ? "text-white" : "text-[var(--text-muted)] hover:text-white"}`}
              >
                {currentView === "home" && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-[var(--color-border-hover)] rounded-full -z-10"
                  />
                )}
                Home
              </button>

              <div className="relative group flex items-center h-full">
                <button
                  className={`relative px-5 py-2 font-medium text-sm transition-colors rounded-full z-10 flex items-center gap-1.5 ${currentView !== "home" && currentView !== "demo" ? "text-white" : "text-[var(--text-muted)] group-hover:text-white"}`}
                >
                  <FileText size={16} className="opacity-70" /> Resume Tools
                  <ChevronDown
                    size={14}
                    className="opacity-50 group-hover:-rotate-180 transition-transform duration-300"
                  />
                </button>

                {/* Resume Tools Dropdown */}
                <div className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 bg-[var(--color-bg-3)]/95 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-[var(--color-border)] rounded-[24px] p-2 w-[540px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[200] origin-top flex gap-2 transform group-hover:translate-y-0 translate-y-4">
                  <div className="flex-1 bg-[var(--color-bg-2)] rounded-xl p-5 border border-[var(--color-border)]">
                    <h3 className="text-[11px] font-bold text-[var(--color-primary-light)] tracking-widest uppercase mb-4">
                      AI Tools
                    </h3>
                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          setCurrentView("app");
                          setActiveTab("resume");
                        }}
                        className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-[var(--color-border)] transition-colors text-left group/btn"
                      >
                        <div className="w-10 h-10 rounded-full bg-[var(--color-primary-glow)] flex items-center justify-center text-[var(--color-primary-light)] group-hover/btn:bg-[var(--color-primary)] group-hover/btn:text-[var(--color-primary-foreground)] transition-colors">
                          <Wand2 size={18} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[var(--text-main)] mb-0.5">
                            AI Resume Builder
                          </div>
                          <div className="text-xs text-[var(--text-muted)]">
                            Build from scratch completely free
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setCurrentView("app");
                          setActiveTab("resume");
                          setShowAIModal(true);
                        }}
                        className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-[var(--color-border)] transition-colors text-left group/btn"
                      >
                        <div className="w-10 h-10 rounded-full bg-[var(--color-border)] flex items-center justify-center text-[var(--text-main)] group-hover/btn:bg-[var(--color-border-hover)] group-hover/btn:text-[var(--text-main)] transition-colors">
                          <UploadCloud size={18} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[var(--text-main)] mb-0.5">
                            Upload & Enhance
                          </div>
                          <div className="text-xs text-[var(--text-muted)]">
                            Improve existing resume with AI
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setCurrentView("app");
                          setActiveTab("coverLetter");
                          setShowAIModal(true);
                        }}
                        className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-[var(--color-border)] transition-colors text-left group/btn"
                      >
                        <div className="w-10 h-10 rounded-full bg-[var(--color-border)] flex items-center justify-center text-[var(--text-main)] group-hover/btn:bg-[var(--color-border-hover)] group-hover/btn:text-[var(--text-main)] transition-colors">
                          <MessageSquare size={18} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[var(--text-main)] mb-0.5">
                            Text to Resume
                          </div>
                          <div className="text-xs text-[var(--text-muted)]">
                            Generate from a rough bio
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 bg-[var(--color-bg-2)] rounded-xl p-5 border border-[var(--color-border)]">
                    <h3 className="text-[11px] font-bold text-[var(--color-accent)] tracking-widest uppercase mb-4">
                      Analysis
                    </h3>
                    <div className="space-y-1">
                      <button
                        onClick={() => setShowATSModal(true)}
                        className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-[var(--color-border)] transition-colors text-left group/btn"
                      >
                        <div className="w-10 h-10 rounded-full bg-[var(--color-accent-glow)] flex items-center justify-center text-[var(--color-accent)] group-hover/btn:bg-[var(--color-accent)] group-hover/btn:text-[var(--text-main)] transition-colors">
                          <Search size={18} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[var(--text-main)] mb-0.5">
                            ATS Checker
                          </div>
                          <div className="text-xs text-[var(--text-muted)]">
                            Scan and score your resume
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => setShowInterviewModal(true)}
                        className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-[var(--color-border)] transition-colors text-left group/btn"
                      >
                        <div className="w-10 h-10 rounded-full bg-[var(--color-border)] flex items-center justify-center text-[var(--text-main)] group-hover/btn:bg-[var(--color-border-hover)] group-hover/btn:text-[var(--text-main)] transition-colors">
                          <MessageSquare size={18} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[var(--text-main)] mb-0.5">
                            Interview Prep
                          </div>
                          <div className="text-xs text-[var(--text-muted)]">
                            Generate tailored questions
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setCurrentView("app");
                          setActiveTab("coverLetter");
                        }}
                        className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-[var(--color-border)] transition-colors text-left group/btn"
                      >
                        <div className="w-10 h-10 rounded-full bg-[var(--color-border)] flex items-center justify-center text-[var(--text-main)] group-hover/btn:bg-[var(--color-border-hover)] group-hover/btn:text-[var(--text-main)] transition-colors">
                          <FileBadge size={18} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[var(--text-main)] mb-0.5">
                            Cover Letter
                          </div>
                          <div className="text-xs text-[var(--text-muted)]">
                            Job-specific letters
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setCurrentView("app");
                  setActiveTab("coverLetter");
                }}
                className={`relative px-5 py-2 font-medium text-sm transition-colors rounded-full z-10 flex items-center gap-1.5 text-[var(--text-muted)] hover:text-white`}
              >
                <Mail size={16} className="opacity-70" /> Cover Letter
              </button>

              <button
                onClick={() => { setDemoTitle("Templates Selection"); setCurrentView("demo"); setMobileMenuOpen(false); }}
                className="relative px-5 py-2 font-medium text-sm transition-colors rounded-full z-10 text-[var(--text-muted)] hover:text-[var(--text-main)]"
              >
                {currentView === "demo" && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-[var(--color-border-hover)] rounded-full -z-10"
                  />
                )}
                Templates
              </button>

              <button
                onClick={() => { setDemoTitle("Pricing Details"); setCurrentView("demo"); setMobileMenuOpen(false); }}
                className="relative px-5 py-2 font-medium text-sm transition-colors rounded-full z-10 text-[var(--text-muted)] hover:text-[var(--text-main)]"
              >
                Pricing
              </button>
            </nav>

            {/* RIGHT: Actions */}
            <div className="hidden md:flex items-center gap-4">
              {/* ATS Score Pill */}
              <button
                onClick={() => {
                  setCurrentView("app");
                  setActiveTab("resume");
                  setShowATSModal(true);
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-bg-3)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-all group/ats"
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black/40 relative">
                  <svg
                    viewBox="0 0 36 36"
                    className="w-6 h-6 transform -rotate-90"
                  >
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      className="stroke-white/10"
                      strokeWidth="3"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      className={`${atsInfo.score >= 80 ? "stroke-[var(--color-accent)]" : atsInfo.score >= 50 ? "stroke-amber-500" : "stroke-rose-500"} transition-all duration-1000 ease-out`}
                      strokeWidth="3"
                      strokeDasharray={`${atsInfo.score}, 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-[var(--text-main)] font-mono">
                    {atsInfo.score}
                  </span>
                </div>
                <span className="text-xs font-bold text-[var(--text-main)] pr-1 group-hover/ats:text-[var(--color-accent)] transition-colors">
                  ATS Score
                </span>
              </button>

              {/* Open Builder CTA */}
              <button
                onClick={() => {
                  setCurrentView("app");
                  setActiveTab("resume");
                }}
                className="relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full bg-[var(--color-primary)] px-6 font-medium text-[var(--color-primary-foreground)] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(124,58,237,0.3)] group/build border border-[var(--color-border-hover)]"
              >
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover/build:duration-1000 group-hover/build:[transform:skew(-12deg)_translateX(100%)]">
                  <div className="relative h-full w-8 bg-white/20" />
                </div>
                <span className="relative flex items-center gap-2 text-sm font-bold">
                  Open Builder
                  <ArrowRight
                    size={16}
                    className="group-hover/build:translate-x-1 transition-transform"
                  />
                </span>
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-[var(--text-main)] hover:text-[var(--text-main)] transition-colors relative z-50 p-2"
            >
              <Menu size={24} />
            </button>
          </header>

          {/* Mobile Navigation Panel */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 bg-[var(--color-bg)]/95 backdrop-blur-3xl z-[200] overflow-y-auto md:hidden transform-gpu transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] animate-in slide-in-from-right-full text-[var(--text-main)]">
              <div className="p-6 border-b border-[var(--color-border)] sticky top-0 bg-[var(--color-bg)] flex justify-between items-center z-10">
                <h1 className="text-[22px] font-black tracking-tight flex items-center gap-3 text-[var(--text-main)] leading-none">
                  <div className="relative overflow-hidden flex items-center justify-center w-10 h-10 rounded-[14px] bg-[#11111f] shadow-[0_0_20px_rgba(124,58,237,0.2)]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#7c3aed] to-[#06b6d4] opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#7c3aed] to-[#06b6d4] opacity-80 blur-xl" />
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                    <svg
                      className="relative z-10 w-5 h-5 drop-shadow-md text-[var(--text-main)]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="10" cy="10" r="7" />
                      <path d="M14 14l3 3 5-7" />
                    </svg>
                  </div>
                  <div>
                    Quick<span className="text-gradient">Resume</span>
                  </div>
                </h1>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[var(--text-muted)] hover:text-[var(--text-main)] p-2"
                >
                  <XCircle size={28} />
                </button>
              </div>
              <div className="p-6 flex flex-col gap-6">
                <button
                  onClick={() => {
                    setCurrentView("home");
                    setMobileMenuOpen(false);
                  }}
                  className="text-left font-black text-[var(--text-main)] hover:text-[var(--color-primary-light)] text-2xl transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    setCurrentView("app");
                    setMobileMenuOpen(false);
                  }}
                  className="text-left font-black text-[var(--color-primary-light)] text-2xl"
                >
                  Create Resume
                </button>

                <div className="flex flex-col gap-4 mt-6">
                  <div className="text-xs font-black text-[var(--text-muted)] uppercase tracking-widest mb-2 border-b border-[var(--color-border)] pb-2">
                    Resume Tools
                  </div>
                  {navTools.resume.map((item, idx) => (
                    <button
                      key={item.title}
                      className="text-left flex items-center gap-4 text-[var(--text-main)] hover:text-[var(--text-main)] font-semibold group/mob"
                      onClick={() => {
                        if (item.tab) {
                          setCurrentView("app");
                          setActiveTab(item.tab as "resume" | "coverLetter");
                        } else if (
                          item.title === "Text to Resume" ||
                          item.title === "Upload & Enhance"
                        ) {
                          setCurrentView("app");
                          setActiveTab("resume");
                          setShowAIModal(true);
                        } else if (item.title === "ATS Score Checker") {
                          setCurrentView("app");
                          setActiveTab("resume");
                          setShowATSModal(true);
                        } else if (
                          item.title === "Interview Prep Kit" ||
                          item.title === "Quick Interview Prep" ||
                          item.title === "Interview Questions"
                        ) {
                          setCurrentView("app");
                          setShowInterviewModal(true);
                        } else {
                          setDemoTitle(item.title);
                          setCurrentView("demo");
                        }
                        setMobileMenuOpen(false);
                      }}
                    >
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--color-border)] group-hover/mob:bg-[var(--color-primary)]/10 text-[var(--text-muted)] group-hover/mob:text-[var(--color-primary-light)]">
                        <item.icon size={20} />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-lg leading-tight">
                          {item.title}
                        </span>
                        <span className="text-xs text-[var(--text-muted)] font-normal">
                          {item.sub}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {currentView === "home" ? (
        <React.Suspense fallback={<div className="h-screen w-screen flex items-center justify-center bg-[var(--color-bg)]"><Loader2 className="animate-spin text-[var(--color-primary)] w-12 h-12" /></div>}>
          <Home
            setCurrentView={setCurrentView}
            data={data}
            setShowAIModal={setShowAIModal}
            setActiveTab={setActiveTab}
            setShowATSModal={setShowATSModal}
            setShowInterviewModal={setShowInterviewModal}
            setDemoTitle={setDemoTitle}
            setCategory={setCategory}
            setBuilderStep={setBuilderStep}
            onInstantBuild={(text) => {
              setAiInputText(text);
              handleAIBuild(text);
            }}
          />
        </React.Suspense>
      ) : currentView === "demo" ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-[var(--color-bg)] relative overflow-hidden">
          <div className="absolute top-0 w-full h-[600px] bg-emerald-600/5 skew-y-6 transform origin-top-left -z-10 blur-3xl"></div>
          <div className="bg-[var(--color-bg-2)] p-12 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] border border-[var(--color-border-hover)] max-w-xl w-full text-center relative z-10 mx-4">
            <div className="w-20 h-20 bg-[var(--color-bg-2)]/[0.8] text-emerald-600 border border-[var(--color-border-hover)] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
              <Sparkles size={40} />
            </div>
            <h2 className="text-3xl font-extrabold text-[var(--text-main)] tracking-tight mb-4">
              {demoTitle}
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-10 leading-relaxed">
              We're currently building out this feature to give you the most
              powerful AI-driven tools. It will be available very soon. Look out
              for updates!
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setCurrentView("app")}
                className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-[0_10px_30px_rgba(0,0,0,0.3)] shadow-emerald-600/20 hover:bg-emerald-700 hover:-translate-y-0.5 transition-all"
              >
                Go to Resume Builder
              </button>
              <button
                onClick={() => setCurrentView("home")}
                className="px-6 py-3 bg-[var(--color-bg-2)] text-[var(--text-main)] border border-[var(--color-border-hover)] rounded-xl font-bold hover:bg-[var(--color-bg-3)] hover:-translate-y-0.5 transition-all"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      ) : activeTab === "coverLetter" ? (
        <div className="flex flex-col md:flex-row flex-1 flex-grow overflow-hidden min-h-0 pb-[calc(4.5rem+env(safe-area-bottom))] md:pb-0 text-[var(--text-main)]">
          {/* Left Column - Editor */}
          <div
            className={`${mobileView === "preview" ? "hidden md:flex" : "flex"} w-full md:w-[40%] h-full overflow-y-auto border-r border-[var(--color-border-hover)] bg-[var(--color-bg)] flex-col`}
          >
            <div className="p-6 border-b border-[var(--color-border-hover)] sticky top-0 bg-[var(--color-bg)]/95 backdrop-blur z-10 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
              <div className="flex bg-[var(--color-bg-2)] border border-[var(--color-border-hover)] p-1.5 rounded-xl self-start mb-6 overflow-hidden max-w-fit shadow-inner">
                <button
                  onClick={() => setActiveTab("resume")}
                  className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all duration-300 ${(activeTab as string) === "resume" ? "bg-emerald-600 text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] shadow-emerald-600/20 scale-100" : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--color-bg-2)]/50 scale-95 hover:scale-100"}`}
                >
                  <FileText size={16} /> Resume
                </button>
                <button
                  onClick={() => setActiveTab("coverLetter")}
                  className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all duration-300 ${activeTab === "coverLetter" ? "bg-emerald-600 text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] shadow-emerald-600/20 scale-100" : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--color-bg-2)]/50 scale-95 hover:scale-100"}`}
                >
                  <Mail size={16} /> Cover Letter
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowAIModal(true)}
                  disabled={isGenerating}
                  className="flex-1 bg-[var(--color-bg)] border border-indigo-500/30 hover:border-indigo-500/70 hover:bg-indigo-950/30 text-indigo-400 font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                >
                  {isGenerating ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <FileCode2 size={18} />
                  )}
                  {isGenerating ? "Building..." : "AI Build from Text"}
                </button>
                <button
                  onClick={() => setShowRoleModal(true)}
                  disabled={isGenerating}
                  className="flex-1 bg-emerald-600/10 border border-emerald-600/30 hover:bg-emerald-600/20 text-emerald-600 font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                >
                  {isGenerating ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Sparkles size={18} />
                  )}
                  {isGenerating ? "Generating..." : "AI Generate Sample"}
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => setData(initialData)}
                    className="px-3 py-2.5 border border-[var(--color-border-hover)] bg-[var(--color-bg)]/50 rounded-xl hover:bg-[var(--color-bg-2)] text-[var(--text-main)] flex items-center justify-center gap-2 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                    title="Load Initial Data"
                  >
                    <RefreshCw size={18} />
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to clear all data?",
                        )
                      ) {
                        setData(emptyData);
                      }
                    }}
                    className="px-3 py-2.5 border border-rose-900/50 bg-[var(--color-bg)]/50 text-rose-500 rounded-xl hover:bg-rose-950/50 hover:border-rose-900 flex items-center justify-center gap-2 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                    title="Clear Form"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-8 flex-1">
                  {/* Cover Letter Editor */}
                  <section>
                    <h2 className="text-lg font-semibold text-[var(--text-main)] mb-4 flex items-center gap-2">
                      <Mail size={18} className="text-[var(--text-muted)]" /> Recipient
                      Details
                    </h2>
                    <div className="space-y-4 pb-4">
                      <InputField
                        label="Recipient Name"
                        name="recipientName"
                        value={data.coverLetter.recipientName}
                        onChange={handleCoverLetterChange}
                        placeholder="e.g. Hiring Manager"
                      />
                      <InputField
                        label="Company Name"
                        name="companyName"
                        value={data.coverLetter.companyName}
                        onChange={handleCoverLetterChange}
                      />
                      <InputField
                        label="Job Reference / Position"
                        name="jobReference"
                        value={data.coverLetter.jobReference}
                        onChange={handleCoverLetterChange}
                      />
                    </div>
                  </section>
                  <section className="pb-12 pt-6 border-t border-[var(--color-border)]">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold text-[var(--text-main)] flex items-center gap-2">
                        <FileText size={18} className="text-[var(--text-muted)]" /> Letter
                        Body
                      </h2>
                      <button
                        onClick={generateAICoverLetter}
                        disabled={isGeneratingLetter}
                        className="text-[10px] bg-[var(--color-bg-2)] text-emerald-600 border border-emerald-600/30 hover:bg-emerald-600/10 px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all disabled:opacity-50 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                      >
                        {isGeneratingLetter ? (
                          <Loader2 className="animate-spin" size={12} />
                        ) : (
                          <Sparkles size={12} />
                        )}
                        {isGeneratingLetter ? "Generating..." : "AI Generate"}
                      </button>
                    </div>
                    <div>
                      <textarea
                        name="body"
                        value={data.coverLetter.body}
                        onChange={handleCoverLetterChange}
                        rows={15}
                                              />
                      {(() => {
                        const wc = getWordCount(data.coverLetter.body);
                        let colorClass = "text-emerald-500";
                        if (wc < 150) colorClass = "text-rose-500";
                        else if (wc < 250) colorClass = "text-amber-500";
                        
                        return (
                          <div className="mt-2 text-xs text-right">
                            <span className={colorClass + " font-medium"}>{wc} words</span>
                            <span className="text-[var(--text-muted)] ml-2">· Recommended: 250–400</span>
                          </div>
                        );
                      })()}
                    </div>
                  </section>
                            </div>
          </div>

          {/* Right Column - Preview & Dashboard */}
          <div
            ref={previewContainerRef}
            className={`${mobileView === "editor" ? "hidden md:flex" : "flex"} w-full md:w-[60%] h-full overflow-y-auto overflow-x-hidden bg-[var(--color-bg)] flex-col`}
          >
            {/* Top Bar (Hidden on Print) */}
            <div className="bg-[var(--color-bg-2)] border-b border-[var(--color-border-hover)] p-4 sticky top-0 z-10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center">
              {/* ATS Score Widget */}
              <div className="flex flex-col gap-2 bg-[var(--color-bg)] p-3 rounded-xl border border-[var(--color-border-hover)] w-full xl:w-auto shadow-none">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                    <svg
                      className="w-full h-full transform -rotate-90"
                      viewBox="0 0 36 36"
                    >
                      <path
                        className="text-[var(--text-main)]"
                        strokeWidth="3"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className={`${atsInfo.score >= 80 ? "text-emerald-600" : atsInfo.score >= 50 ? "text-amber-500" : "text-rose-500"} transition-all duration-500 ease-in-out`}
                        strokeDasharray={`${atsInfo.score}, 100`}
                        strokeWidth="3"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-lg font-bold text-[var(--text-main)]">
                        {atsInfo.score}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-[var(--text-main)] mb-1">
                      ATS Score
                    </h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] text-[var(--text-muted)]">
                      <div className="flex items-center gap-1">
                        {atsInfo.checks.personal ? (
                          <CheckCircle2
                            size={12}
                            className="text-emerald-600"
                          />
                        ) : (
                          <XCircle size={12} className="text-rose-400" />
                        )}{" "}
                        Contact Info
                      </div>
                      <div className="flex items-center gap-1">
                        {atsInfo.checks.summary ? (
                          <CheckCircle2
                            size={12}
                            className="text-emerald-600"
                          />
                        ) : (
                          <XCircle size={12} className="text-rose-400" />
                        )}{" "}
                        Summary &gt;50c
                      </div>
                      <div className="flex items-center gap-1">
                        {atsInfo.checks.experience ? (
                          <CheckCircle2
                            size={12}
                            className="text-emerald-600"
                          />
                        ) : (
                          <XCircle size={12} className="text-rose-400" />
                        )}{" "}
                        Exp. Bullets
                      </div>
                      <div className="flex items-center gap-1">
                        {atsInfo.checks.skills ? (
                          <CheckCircle2
                            size={12}
                            className="text-emerald-600"
                          />
                        ) : (
                          <XCircle size={12} className="text-rose-400" />
                        )}{" "}
                        7+ Skills
                      </div>
                      <div className="flex items-center gap-1">
                        {atsInfo.checks.actionVerbs ? (
                          <CheckCircle2
                            size={12}
                            className="text-emerald-600"
                          />
                        ) : (
                          <XCircle size={12} className="text-rose-400" />
                        )}{" "}
                        Action Verbs
                      </div>
                      <div className="flex items-center gap-1">
                        {atsInfo.checks.metrics ? (
                          <CheckCircle2
                            size={12}
                            className="text-emerald-600"
                          />
                        ) : (
                          <XCircle size={12} className="text-rose-400" />
                        )}{" "}
                        Metrics (%)
                      </div>
                      <div className="flex items-center gap-1">
                        {atsInfo.checks.education ? (
                          <CheckCircle2
                            size={12}
                            className="text-emerald-600"
                          />
                        ) : (
                          <XCircle size={12} className="text-rose-400" />
                        )}{" "}
                        Education
                      </div>
                      <div className="flex items-center gap-1">
                        {atsInfo.checks.linkedin ? (
                          <CheckCircle2
                            size={12}
                            className="text-emerald-600"
                          />
                        ) : (
                          <XCircle size={12} className="text-rose-400" />
                        )}{" "}
                        LinkedIn URL
                      </div>
                      <div className="flex items-center gap-1">
                        {atsInfo.checks.noPlaceholder ? (
                          <CheckCircle2
                            size={12}
                            className="text-emerald-600"
                          />
                        ) : (
                          <XCircle size={12} className="text-rose-400" />
                        )}{" "}
                        Real Content
                      </div>
                    </div>
                  </div>
                </div>

                {Object.values(atsInfo.checks).some((v) => !v) && (
                  <details className="group mt-1 border-t border-[var(--color-border-hover)] pt-2">
                    <summary className="text-xs font-semibold text-emerald-600 cursor-pointer hover:text-emerald-600/80 flex items-center gap-1 select-none focus:outline-none">
                      How to improve
                      <ChevronDown
                        size={14}
                        className="group-open:rotate-180 transition-transform ml-auto"
                      />
                    </summary>
                    <ul className="text-[10px] text-[var(--text-muted)] mt-2 space-y-1.5 pl-1">
                      {!atsInfo.checks.personal && (
                        <li className="flex items-start gap-1.5">
                          <XCircle
                            size={10}
                            className="text-rose-400 mt-0.5 shrink-0"
                          />{" "}
                          Add full name, email, and phone.
                        </li>
                      )}
                      {!atsInfo.checks.summary && (
                        <li className="flex items-start gap-1.5">
                          <XCircle
                            size={10}
                            className="text-rose-400 mt-0.5 shrink-0"
                          />{" "}
                          Expand summary to 100+ characters.
                        </li>
                      )}
                      {!atsInfo.checks.experience && (
                        <li className="flex items-start gap-1.5">
                          <XCircle
                            size={10}
                            className="text-rose-400 mt-0.5 shrink-0"
                          />{" "}
                          Add experience with detailed responsibilities.
                        </li>
                      )}
                      {!atsInfo.checks.skills && (
                        <li className="flex items-start gap-1.5">
                          <XCircle
                            size={10}
                            className="text-rose-400 mt-0.5 shrink-0"
                          />{" "}
                          List at least 7 relevant skills.
                        </li>
                      )}
                      {!atsInfo.checks.actionVerbs && (
                        <li className="flex items-start gap-1.5">
                          <XCircle
                            size={10}
                            className="text-rose-400 mt-0.5 shrink-0"
                          />{" "}
                          Use action verbs (e.g., managed, led, developed).
                        </li>
                      )}
                      {!atsInfo.checks.metrics && (
                        <li className="flex items-start gap-1.5">
                          <XCircle
                            size={10}
                            className="text-rose-400 mt-0.5 shrink-0"
                          />{" "}
                          Include numbers, percentages, or dollar amounts to
                          quantify impact.
                        </li>
                      )}
                      {!atsInfo.checks.education && (
                        <li className="flex items-start gap-1.5">
                          <XCircle
                            size={10}
                            className="text-rose-400 mt-0.5 shrink-0"
                          />{" "}
                          Add your education details (Degree, Institution).
                        </li>
                      )}
                      {!atsInfo.checks.linkedin && (
                        <li className="flex items-start gap-1.5">
                          <XCircle
                            size={10}
                            className="text-rose-400 mt-0.5 shrink-0"
                          />{" "}
                          Add your LinkedIn profile URL.
                        </li>
                      )}
                      {!atsInfo.checks.noPlaceholder && (
                        <li className="flex items-start gap-1.5">
                          <XCircle
                            size={10}
                            className="text-rose-400 mt-0.5 shrink-0"
                          />{" "}
                          Replace placeholder text with real content.
                        </li>
                      )}
                    </ul>
                  </details>
                )}
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
                {(activeTab as string) === "resume" && (
                  <div className="flex flex-col gap-3 w-full xl:w-auto">
                    <div className="flex bg-[var(--color-bg)] p-1 rounded-lg flex-wrap gap-1 border border-[var(--color-border-hover)]">
                      {[
                        { id: "tech", label: "Tech & AI", icon: Code },
                        {
                          id: "business",
                          label: "Business & MBA",
                          icon: Building,
                        },
                        {
                          id: "healthcare",
                          label: "Healthcare & B.Sc",
                          icon: Stethoscope,
                        },
                        { id: "creative", label: "Creative", icon: Palette },
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setCategory(cat.id as any)}
                          className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 text-sm transition-colors ${category === cat.id ? "bg-[var(--color-bg-2)] shadow-[0_10px_30px_rgba(0,0,0,0.3)] font-medium text-[var(--text-main)] border border-[var(--color-border-hover)]" : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--color-bg-2)]/50"}`}
                        >
                          <cat.icon size={14} /> {cat.label}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 px-1">
                      <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
                        Theme:
                      </span>
                      {[
                        "#10b981",
                        "#0f172a",
                        "#6366f1",
                        "#14b8a6",
                        "#f43f5e",
                        "#f59e0b",
                        "#8b5cf6",
                      ].map((color) => (
                        <button
                          key={color}
                          onClick={() => setThemeColor(color)}
                          className={`w-6 h-6 rounded-full border-2 transition-transform ${themeColor === color ? "border-slate-400 scale-110 shadow-[0_10px_30px_rgba(0,0,0,0.3)]" : "border-transparent hover:scale-110 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleExportDocx}
                  className="bg-[var(--color-bg)] hover:bg-[var(--color-bg-2)] text-[var(--text-main)] border border-[var(--color-border-hover)] px-4 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                >
                  <FileOutput size={18} /> DOCX
                </button>
                <button
                  onClick={handlePrint}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-transform hover:-translate-y-0.5 shadow-[0_10px_30px_rgba(0,0,0,0.3)] shadow-emerald-600/20 ml-auto xl:ml-0"
                >
                  <Download size={18} /> Download PDF
                </button>
              </div>
            </div>

            {/* Resume Canvas */}
            <div className="p-4 md:p-8 flex-1 overflow-auto bg-[var(--color-bg)] flex justify-center w-full">
              {!data.name && !isGenerating ? (
                <div className="max-w-[210mm] min-h-[297mm] mx-auto bg-[var(--color-bg-2)] border border-[var(--color-border-hover)] flex flex-col items-center justify-center p-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                  <div className="w-24 h-24 bg-[var(--color-bg-2)] rounded-full flex items-center justify-center mb-6 text-[var(--text-muted)] shadow-inner">
                    <FileText size={48} strokeWidth={1} />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--text-main)] mb-2">
                    Your canvas is empty
                  </h3>
                  <p className="text-[var(--text-muted)] max-w-md mb-8 leading-relaxed text-center">
                    Start typing in the editor to build your resume, or load our
                    sample data to see how it looks.
                  </p>
                  <button
                    onClick={() => setData(initialData)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-all flex items-center gap-2"
                  >
                    <FileCode2 size={20} /> Load Sample Data
                  </button>
                </div>
              ) : (
                <div className="relative mx-auto flex-shrink-0"
                  style={{ width: `${previewScale * (paperSize === "letter" ? 816 : 794)}px`, height: `${previewScale * (paperSize === "letter" ? 1056 : 1123)}px` }}>
                  <div className="absolute top-0 left-0 origin-top-left"
                    style={{ width: `${paperSize === "letter" ? 816 : 794}px`, transform: `scale(${previewScale})` }}>
                    <div
                      id="preview-content"
                      className={`pb-10 print:pb-0 shadow-[0_10px_30px_rgba(0,0,0,0.3)] print:shadow-none bg-white relative shrink-0 break-words preserve-colors ${paperSize === "a4" ? "w-[210mm] min-h-[297mm]" : "w-[215.9mm] min-h-[279.4mm]"}`}
                      style={{
                        maxWidth: paperSize === "a4" ? "210mm" : "215.9mm",
                        overflowX: "hidden",
                      }}
                    >
                      {(isGenerating || isGeneratingLetter) && (
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-50 flex items-start pt-64 justify-center">
                      <div className="flex flex-col items-center gap-4 bg-[var(--color-bg-2)] p-8 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-[var(--color-border-hover)] animate-in zoom-in-95 duration-300">
                        <Loader2
                          size={40}
                          className="animate-spin text-emerald-600"
                        />
                        <span className="font-bold text-[var(--text-main)] text-lg animate-pulse">
                          Building your document...
                        </span>
                      </div>
                    </div>
                  )}
                  {(activeTab as string) === "resume" ? (
                    <>
                      {category === "tech" && (
                        <TechTemplate data={data} color={themeColor} />
                      )}
                      {category === "business" && (
                        <BusinessTemplate data={data} color={themeColor} />
                      )}
                      {category === "healthcare" && (
                        <HealthcareTemplate data={data} color={themeColor} />
                      )}
                      {category === "creative" && (
                        <CreativeTemplate data={data} color={themeColor} />
                      )}
                      {category === "modern" && (
                        <ModernTemplate data={data} color={themeColor} />
                      )}
                      {category === "minimal" && (
                        <MinimalTemplate data={data} color={themeColor} />
                      )}
                      {category === "academic" && (
                        <AcademicTemplate data={data} color={themeColor} />
                      )}
                      {category === "startup" && (
                        <StartupTemplate data={data} color={themeColor} />
                      )}
                      {category === "corporate" && (
                        <CorporateTemplate data={data} color={themeColor} />
                      )}
                      {category === "freelancer" && (
                        <FreelancerTemplate data={data} color={themeColor} />
                      )}
                      {category === "modern-pro" && (
                        <ModernProTemplate data={data} color={themeColor} />
                      )}
                      {category === "clean" && (
                        <CleanSidebarTemplate data={data} color={themeColor} />
                      )}
                      {category === "executive" && (
                        <ExecutiveTemplate data={data} color={themeColor} />
                      )}
                      {category === "designer" && (
                        <DesignerTemplate data={data} color={themeColor} />
                      )}
                      {category === "notion" && (
                        <NotionTemplate data={data} color={themeColor} />
                      )}
                      {category &&
                        category.startsWith("gen-") &&
                        generatedTemplates
                          .find((t) => t.id === category)
                          ?.component({ data, color: themeColor })}
                    </>
                  ) : (
                    <div className="w-full min-h-[297mm] mx-auto bg-white p-[20mm] text-slate-800 font-sans">
                      <div className="mb-12 border-b-2 border-slate-200 pb-6">
                        <h1 className="text-3xl font-bold text-slate-900 mb-2 uppercase tracking-wider">
                          {data.name}
                        </h1>
                        <div className="text-sm text-[var(--text-subtle)] flex flex-wrap gap-x-4 gap-y-1">
                          {data.email && <span>{data.email}</span>}
                          {data.phone && <span>• {data.phone}</span>}
                          {data.location && <span>• {data.location}</span>}
                        </div>
                      </div>

                      <div className="mb-8 text-slate-800">
                        <p className="mb-1">
                          {new Date().toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <br />
                        <p className="font-bold text-slate-900">
                          {data.coverLetter.recipientName}
                        </p>
                        <p>{data.coverLetter.companyName}</p>
                        <br />
                        <p className="font-bold text-slate-900">
                          Re: {data.coverLetter.jobReference}
                        </p>
                      </div>

                      <div className="whitespace-pre-wrap leading-relaxed text-slate-800">
                        {data.coverLetter.body}
                      </div>

                      <div className="mt-12 text-slate-800">
                        <p>Sincerely,</p>
                        <br />
                        <br />
                        <p className="font-bold text-slate-900">{data.name}</p>
                      </div>
                    </div>
                  )}
                </div>
                </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <React.Suspense fallback={<div className="h-full w-full flex items-center justify-center p-20"><Loader2 className="animate-spin text-emerald-500 w-12 h-12" /></div>}>
          <BuilderView
            handleShare={handleShare}
            data={data}
            setData={setData}
            builderStep={builderStep}
            setBuilderStep={setBuilderStep}
            category={category}
            setCategory={setCategory}
            themeColor={themeColor}
            setThemeColor={setThemeColor}
            paperSize={paperSize}
            setPaperSize={setPaperSize}
            handleExportDocx={handleExportDocx}
            handlePrint={handlePrint}
            setCurrentView={setCurrentView}
            setActiveTab={setActiveTab}
            setShowAIModal={setShowAIModal}
            mobileView={mobileView}
            setMobileView={setMobileView}
          />
        </React.Suspense>
      )}

      {currentView === "app" && (
      <>{/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-bg-2)] border-t border-[var(--color-border-hover)] flex items-center justify-around p-2 z-50" style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}>
        <button
          onClick={() => setMobileView("editor")}
          className={`flex flex-col items-center p-2 flex-1 rounded-lg transition-colors ${mobileView === "editor" ? "text-emerald-600 bg-emerald-600/10" : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--color-bg-2)]"}`}
        >
          <Edit size={20} className="mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            Editor
          </span>
        </button>
        <button
          onClick={() => setMobileView("preview")}
          className={`flex flex-col items-center p-2 flex-1 rounded-lg transition-colors ${mobileView === "preview" ? "text-emerald-600 bg-emerald-600/10" : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--color-bg-2)]"}`}
        >
          <Eye size={20} className="mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            Preview
          </span>
        </button>
      </div>
      </>)}

      {/* Site Footer */}
      {currentView !== "app" && (
        <footer className="bg-[var(--color-bg)] border-t border-[var(--color-border-hover)] mt-auto shrink-0">
          <div className="max-w-7xl mx-auto w-full px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-[var(--text-muted)]">
              &copy; {new Date().getFullYear()} QuickResume. All rights
              reserved.
            </div>
            <div className="flex gap-6 text-sm text-[var(--text-muted)]">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="hover:text-emerald-600 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="hover:text-emerald-600 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="hover:text-emerald-600 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </footer>
      )}

      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsLightMode(!isLightMode)}
        className="fixed bottom-24 right-4 z-[100] w-12 h-12 bg-[var(--color-bg-2)] text-[var(--text-main)] rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-[var(--color-border-hover)] flex items-center justify-center hover:bg-[var(--color-bg-3)] hover:scale-110 active:scale-95 transition-all md:bottom-10 md:right-10"
        aria-label="Toggle Theme"
      >
        {isLightMode ? <Moon size={22} className="text-blue-400" /> : <Sun size={22} className="text-yellow-400" />}
      </button>

      {/* Toast Notification */}
      <Toast
        visible={!!toast}
        message={toast?.message || ""}
        type={toast?.type || "success"}
        onClose={() => setToast(null)}
      />
    </main>
  );
}
