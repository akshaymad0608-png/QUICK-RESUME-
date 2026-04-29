import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Lightbulb,
  Eye,
  LayoutTemplate,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Loader2,
  Search,
  Plus,
  Trash2,
  Edit,
  Home,
  Mail,
  Sparkles,
  Wand2,
  Download,
  CheckCircle2,
  GripVertical,
  ChevronDown,
  ChevronUp,
  Share2,
  MonitorSmartphone,
  UploadCloud,
  XCircle,
  Palette,
} from "lucide-react";
import { ResumeData, Experience, Education } from "../types";
import { LightInputField, LightTextArea } from "./LightInputs";
import { motion, AnimatePresence } from "motion/react";
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
  ModernMinimalistTemplate,
  AvatarTemplate,
  GeometricTemplate,
} from "./Templates";
import { generatedTemplates } from "./TemplateFactory";
import { exampleProfiles } from "../examples";

interface BuilderViewProps {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
  builderStep: string;
  setBuilderStep: (step: any) => void;
  category: string;
  setCategory: (cat: any) => void;
  themeColor: string;
  setThemeColor: (color: string) => void;
  paperSize: "a4" | "letter";
  setPaperSize: (size: "a4" | "letter") => void;
  handleExportDocx: () => void;
  handlePrint: () => void;
  handleShare?: () => void;
  setCurrentView?: (view: "home" | "app" | "demo") => void;
  setActiveTab?: (tab: "resume" | "coverLetter") => void;
  setShowAIModal?: (show: boolean) => void;
  mobileView?: "editor" | "preview";
  setMobileView?: (view: "editor" | "preview") => void;
}


class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: any) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { 
    if (this.state.hasError) return <div className="p-8 text-center text-red-500 bg-white min-h-[297mm]"><h1>Something went wrong rendering the document.</h1><button onClick={() => this.setState({hasError:false})} className="mt-4 px-4 py-2 bg-red-100 rounded">Try Again</button></div>; 
    return this.props.children; 
  }
}

export const BuilderView = ({
  data,
  setData,
  builderStep,
  setBuilderStep,
  category,
  setCategory,
  themeColor,
  setThemeColor,
  paperSize,
  setPaperSize,
  handleExportDocx,
  handlePrint,
  handleShare,
  setCurrentView,
  setActiveTab,
  setShowAIModal,
  mobileView = "editor",
  setMobileView,
}: BuilderViewProps) => {
  const [templateFilter, setTemplateFilter] = useState<
    "all" | "classic" | "modern" | "creative" | "minimal"
  >("all");
  const [skillsMode, setSkillsMode] = useState<"bullet" | "classic">("bullet");
  const [isGeneratingExp, setIsGeneratingExp] = useState<string | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [expandedExpId, setExpandedExpId] = useState<string | null>(null);
  const [expandedEduId, setExpandedEduId] = useState<string | null>(null);
  const [skillInput, setSkillInput] = useState("");
  const [showSaveIndicator, setShowSaveIndicator] = useState(false);

  // Auto-save feedback
  useEffect(() => {
    setShowSaveIndicator(true);
    const timeout = setTimeout(() => setShowSaveIndicator(false), 2000);
    return () => clearTimeout(timeout);
  }, [data]);

  const steps = [
    {
      id: "templates",
      label: "Template",
      icon: LayoutTemplate,
      desc: "Choose layout",
    },
    { id: "contact", label: "Contact", icon: User, desc: "Basic details" },
    {
      id: "experience",
      label: "Experience",
      icon: Briefcase,
      desc: "Work history",
    },
    {
      id: "education",
      label: "Education",
      icon: GraduationCap,
      desc: "Academic details",
    },
    {
      id: "skills",
      label: "Skills",
      icon: Lightbulb,
      desc: "Core competencies",
    },
    {
      id: "summary",
      label: "Summary",
      icon: FileText,
      desc: "Professional intro",
    },
  ];

  const handleNext = () => {
    const currentIndex = steps.findIndex((s) => s.id === builderStep);
    if (currentIndex < steps.length - 1) {
      setBuilderStep(steps[currentIndex + 1].id);
    }
  };

  const handlePrev = () => {
    const currentIndex = steps.findIndex((s) => s.id === builderStep);
    if (currentIndex > 0) {
      setBuilderStep(steps[currentIndex - 1].id);
    } else if (currentIndex === 0) {
      setBuilderStep("templates");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Generic handle changes for arrays
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

  // Add items
  const addExperience = () => {
    const newId = Date.now().toString();
    setData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: newId,
          jobTitle: "",
          company: "",
          startDate: "",
          endDate: "",
          responsibilities: "",
        },
      ],
    }));
    setExpandedExpId(newId);
  };

  const addEducation = () => {
    const newId = Date.now().toString();
    setData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { id: newId, degree: "", institution: "", year: "", description: "" },
      ],
    }));
    setExpandedEduId(newId);
  };

  // Remove items
  const removeExperience = (id: string) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };
  const removeEducation = (id: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  // Handle skills array
  const addSkillValue = (skillValue: string) => {
    if (!skillValue.trim()) return;
    
    setData((prev) => {
      const currentSkills = prev.skills
        .split(/,|\n|\//)
        .map((s) => s.trim())
        .filter(Boolean);
        
      if (!currentSkills.includes(skillValue.trim())) {
        return {
          ...prev,
          skills: [...currentSkills, skillValue.trim()].join(", "),
        };
      }
      return prev;
    });
  };

  const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      addSkillValue(skillInput);
      setSkillInput("");
    }
  };
  const removeSkill = (indexToRemove: number) => {
    setData((prev) => {
      const currentSkills = prev.skills
        .split(/,|\n|\//)
        .map((s) => s.trim())
        .filter(Boolean);
      
      currentSkills.splice(indexToRemove, 1);
      
      return {
        ...prev,
        skills: currentSkills.join(", "),
      };
    });
  };

  const renderTemplatePreview = () => {
    const props = { data, color: themeColor };
    switch (category) {
      case "tech":
        return <TechTemplate {...props} />;
      case "business":
        return <BusinessTemplate {...props} />;
      case "healthcare":
        return <HealthcareTemplate {...props} />;
      case "creative":
        return <CreativeTemplate {...props} />;
      case "modern":
        return <ModernTemplate {...props} />;
      case "minimal":
        return <MinimalTemplate {...props} />;
      case "academic":
        return <AcademicTemplate {...props} />;
      case "startup":
        return <StartupTemplate {...props} />;
      case "corporate":
        return <CorporateTemplate {...props} />;
      case "freelancer":
        return <FreelancerTemplate {...props} />;
      case "modern-pro":
        return <ModernProTemplate {...props} />;
      case "clean":
        return <CleanSidebarTemplate {...props} />;
      case "executive":
        return <ExecutiveTemplate {...props} />;
      case "designer":
        return <DesignerTemplate {...props} />;
      case "notion":
        return <NotionTemplate {...props} />;
      case "modern-minimal":
        return <ModernMinimalistTemplate {...props} />;
      case "avatar":
        return <AvatarTemplate {...props} />;
      case "geometric":
        return <GeometricTemplate {...props} />;
      default:
        if (category.startsWith("gen-")) {
          const gen = generatedTemplates.find((t) => t.id === category);
          if (gen) return gen.component({ ...props });
        }
        return <ModernProTemplate {...props} />;
    }
  };

  const templatesList = [
    {
      id: "business",
      name: "Executive",
      component: BusinessTemplate,
      type: "classic",
    },
    {
      id: "tech",
      name: "Tech Professional",
      component: TechTemplate,
      type: "modern",
    },
    {
      id: "creative",
      name: "Designer",
      component: CreativeTemplate,
      type: "creative",
    },
    {
      id: "minimal",
      name: "Modern Minimal",
      component: MinimalTemplate,
      type: "minimal",
    },
    {
      id: "startup",
      name: "Startup Creative",
      component: StartupTemplate,
      type: "creative",
    },
    {
      id: "modern",
      name: "Data Scientist",
      component: ModernTemplate,
      type: "modern",
    },
    {
      id: "academic",
      name: "Academic Notational",
      component: AcademicTemplate,
      type: "classic",
    },
    {
      id: "corporate",
      name: "Corporate Impact",
      component: CorporateTemplate,
      type: "classic",
    },
    {
      id: "freelancer",
      name: "Freelancer Focus",
      component: FreelancerTemplate,
      type: "modern",
    },
    {
      id: "clean",
      name: "Two-Column Clean",
      component: CleanSidebarTemplate,
      type: "modern",
    },
    {
      id: "modern-pro",
      name: "Modern Professional",
      component: ModernProTemplate,
      type: "modern",
    },
    {
      id: "executive",
      name: "Executive Suite",
      component: ExecutiveTemplate,
      type: "classic",
    },
    {
      id: "designer",
      name: "Agency Designer",
      component: DesignerTemplate,
      type: "creative",
    },
    {
      id: "notion",
      name: "Notion Style",
      component: NotionTemplate,
      type: "minimal",
    },
    {
      id: "modern-minimal",
      name: "Modern Minimalist",
      component: ModernMinimalistTemplate,
      type: "minimal",
    },
    {
      id: "avatar",
      name: "Profile (Photo Focus)",
      component: AvatarTemplate,
      type: "creative",
    },
    {
      id: "geometric",
      name: "Geometric Display",
      component: GeometricTemplate,
      type: "modern",
    },
  ].filter((t) =>
    templateFilter === "all" ? true : t.type === templateFilter,
  );

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        // 210mm in CSS is exactly 793.7px (210 / 25.4 * 96)
        // US Letter 8.5in is 816px
        const docWidthPx = paperSize === 'letter' ? 816 : 794; 
        const padding = window.innerWidth < 768 ? 32 : 64;
        const available = containerWidth - padding;
        const newScale = Math.min(1, available / docWidthPx);
        setScale(newScale);
      }
    };

    updateScale();

    const observer = new ResizeObserver(() => {
      updateScale();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [builderStep, paperSize]);

  if (builderStep === "init") {
    return (
      <div className="flex-1 bg-[var(--color-bg)] flex flex-col font-sans min-h-0 relative overflow-y-auto">
        {setCurrentView && (
          <button
            onClick={() => setCurrentView("home")}
            className="absolute top-6 left-6 z-50 flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors bg-[var(--color-border)] hover:bg-[var(--color-border-hover)] px-4 py-2 rounded-xl"
          >
            <Home size={18} />
            <span className="font-bold text-sm">Back to Home</span>
          </button>
        )}
        <div className="fixed inset-0 bg-gradient-to-b from-emerald-900/10 to-[var(--color-bg)] pointer-events-none" />
        <div className="w-full max-w-4xl px-6 relative z-10 text-center m-auto py-20">
          <div className="inline-block p-4 bg-emerald-500/10 rounded-full text-emerald-500 mb-8 border border-emerald-500/20">
            <LayoutTemplate size={48} strokeWidth={1} />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--text-main)] mb-6 font-heading tracking-tight">
            How would you like to start?
          </h2>
          <p className="text-xl text-[var(--text-muted)] mb-12 max-w-2xl mx-auto">
            Choose an option below to begin crafting your next winning resume.
          </p>

          <div className="grid md:grid-cols-3 gap-6 w-full">
            <button
              className="glass-card p-10 rounded-3xl flex flex-col items-center text-center group cursor-pointer"
              onClick={() => {
                if (setShowAIModal) setShowAIModal(true);
                setBuilderStep("templates");
              }}
            >
              <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-[0_0_20px_rgba(16,185,129,0)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <UploadCloud size={32} />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">
                Upload PDF
              </h3>
              <p className="text-[var(--text-muted)] text-[14px]">
                Our AI will extract your details and magically enhance your phrasing.
              </p>
            </button>
            <button
              className="glass-card p-10 rounded-3xl flex flex-col items-center text-center group cursor-pointer"
              onClick={() => setBuilderStep("templates")}
            >
              <div className="w-20 h-20 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-[0_0_20px_rgba(59,130,246,0)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                <Edit size={32} />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">
                From Scratch
              </h3>
              <p className="text-[var(--text-muted)] text-[14px]">
                Pick a beautiful template and fill in your details manually.
              </p>
            </button>
            <div className="glass-card p-10 rounded-3xl flex flex-col items-center text-center group relative overflow-visible">
              <div className="w-20 h-20 bg-violet-500/10 text-violet-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-violet-500 group-hover:text-white transition-all shadow-[0_0_20px_rgba(139,92,246,0)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                <FileText size={32} />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">
                Load Example
              </h3>
              <p className="text-[var(--text-muted)] text-[14px] mb-4">
                Start with a pre-written, highly optimized professional profile.
              </p>
              
              <div className="mt-auto w-full relative">
                <div className="w-full flex flex-col gap-2 relative z-50">
                  {exampleProfiles.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setData(p.data);
                        setBuilderStep("templates");
                      }}
                      className="w-full py-2 px-3 text-sm font-semibold rounded-xl bg-violet-500/10 text-violet-300 hover:bg-violet-500 hover:text-white transition-colors border border-violet-500/20 text-left flex items-center justify-between group/btn"
                    >
                      {p.name}
                      <ChevronRight size={14} className="opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row flex-1 overflow-hidden min-h-0 bg-[var(--color-bg)] text-[var(--text-main)] font-sans selection:bg-[var(--color-primary)]/30 pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
      {/* LEFT PANEL - VERTICAL STEPPER (Desktop) */}
      <div className="hidden md:flex flex-col lg:w-[260px] md:w-[200px] border-r border-[var(--color-border)] bg-[var(--color-bg-2)] py-8 px-4 lg:px-6 z-10 shrink-0 shadow-lg">
        {setCurrentView && (
          <button
            onClick={() => setCurrentView("home")}
            className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors mb-10 w-fit cursor-pointer"
            title="Back to Dashboard"
          >
            <Home size={18} />
            <span className="font-bold text-sm tracking-wide">DASHBOARD</span>
          </button>
        )}
        
        <div className="flex flex-col space-y-2 flex-1">
          {steps.map((s, index) => {
            const currentIndex = steps.findIndex(x => x.id === builderStep);
            const stepIndex = index;
            const isPast = stepIndex < currentIndex;
            const isActive = stepIndex === currentIndex;

            return (
              <button
                key={s.id}
                onClick={() => setBuilderStep(s.id)}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all text-left ${isActive ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary-light)] ring-1 ring-[var(--color-primary)]/30' : 'text-[var(--text-muted)] hover:bg-[var(--color-border)] hover:text-[var(--text-main)]'}`}
              >
                <div className={`flex items-center justify-center shrink-0 rounded-full text-xs font-black transition-all ${isActive ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] w-8 h-8 shadow-[0_0_15px_var(--color-primary-glow)]' : isPast ? 'w-8 h-8 bg-emerald-500/10 border-emerald-500/30 border text-emerald-500' : 'w-8 h-8 border border-[var(--color-border-hover)] text-[var(--text-muted)]'}`}>
                  {isPast ? <CheckCircle2 size={16} strokeWidth={3} /> : (index + 1)}
                </div>
                <div>
                  <div className={`text-sm font-bold uppercase tracking-wider ${isActive ? 'text-[var(--color-primary-light)]' : isPast ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)]'}`}>{s.label}</div>
                  <div className={`text-[11px] mt-0.5 max-w-[120px] leading-tight truncate ${isActive ? 'text-[var(--color-primary-light)]/70' : 'text-[var(--text-muted)]/70'}`}>{s.desc}</div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* CENTER PANEL - FORM */}
      <div
        className={`w-full md:flex-1 xl:w-[45%] flex flex-col md:border-r border-[var(--color-border)] bg-[var(--color-bg-2)] relative ${mobileView === "preview" ? "hidden md:flex" : "flex"}`}
      >
        <Helmet>
          <title>Free AI Resume Builder Editor | Quick Resume</title>
          <meta name="description" content="Edit your ATS-friendly resume or cover letter. Add your experience, education, skills, and preview your changes instantly." />
          <meta name="robots" content="noindex, follow" />
        </Helmet>

        {/* Mobile / Tablet Horizontal Progress Bar */}
        <div className="md:hidden px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-bg-3)] flex items-center justify-between sticky top-0 z-10 backdrop-blur-xl gap-2 md:gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            {setCurrentView && (
              <button
                onClick={() => setCurrentView("home")}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-white/20 transition-all mr-2"
                title="Back to Home"
              >
                <Home size={14} />
              </button>
            )}
            {steps.map((s, index) => {
              const currentIndex = steps.findIndex(x => x.id === builderStep);
              const stepIndex = index;
              const isPast = stepIndex < currentIndex;
              const isActive = stepIndex === currentIndex;

              return (
                <React.Fragment key={s.id}>
                  <div 
                    onClick={() => setBuilderStep(s.id)}
                    className={`cursor-pointer flex items-center justify-center rounded-full text-xs font-bold transition-all ${isActive ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] px-3 py-1.5' : isPast ? 'w-6 h-6 bg-[var(--color-accent)]/20 text-[var(--color-accent)]' : 'w-6 h-6 border border-[var(--color-border)] text-[var(--text-muted)]'}`}
                  >
                    {isPast ? <CheckCircle2 size={12} strokeWidth={3} /> : isActive ? <span className="hidden xs:inline">{s.label}</span> : (index + 1)}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-4 h-[2px] rounded-full mx-1 bg-[var(--color-border)]" />
                  )}
                </React.Fragment>
              )
            })}
          </div>
          {showSaveIndicator && (
            <span className="shrink-0 bg-[var(--color-bg)]/50 text-[var(--color-primary-light)] border border-[var(--color-primary)]/20 text-[10px] px-2 py-0.5 rounded font-medium flex items-center gap-1">
              <CheckCircle2 size={10} /> Saved
            </span>
          )}
        </div>
        
        {/* Desktop Header for Save Indicator */}
        <div className="hidden md:flex h-16 px-8 border-b border-[var(--color-border)] items-center justify-between sticky top-0 z-10 bg-[var(--color-bg-2)]/90 backdrop-blur">
          <h2 className="text-xl font-bold text-[var(--text-main)] font-heading tracking-tight">
            {steps.find((s) => s.id === builderStep)?.label}
          </h2>
          {showSaveIndicator && (
            <span className="shrink-0 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
              <CheckCircle2 size={12} /> Auto-Saved
            </span>
          )}
        </div>

        {/* Form Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 no-scrollbar relative min-h-0 flex justify-center">
          <div className="w-full max-w-2xl h-max pb-24">
            <div className="md:hidden mb-8">
              <h2 className="text-3xl font-black text-[var(--text-main)] mb-2 font-heading tracking-tight">
                {steps.find((s) => s.id === builderStep)?.label}
              </h2>
              <p className="text-[var(--text-muted)]">
                {steps.find((s) => s.id === builderStep)?.desc}
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={builderStep}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
              {/* STEP: TEMPLATES */}
              {builderStep === "templates" && (
                <div className="space-y-6">
                  <div className="flex gap-2 p-1 bg-[var(--color-border)] rounded-xl border border-[var(--color-border-hover)] overflow-x-auto no-scrollbar snap-x snap-mandatory">
                    {["all", "classic", "modern", "creative", "minimal"].map(
                      (f) => (
                        <button
                          key={f}
                          onClick={() => setTemplateFilter(f as any)}
                          className={`snap-start px-4 py-2 text-sm font-semibold rounded-lg capitalize whitespace-nowrap transition-colors ${templateFilter === f ? "bg-emerald-500 text-white shadow-md" : "text-[var(--text-muted)] hover:text-white"}`}
                        >
                          {f}
                        </button>
                      ),
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {templatesList.map((tmpl) => (
                      <div
                        key={tmpl.id}
                        onClick={() => setCategory(tmpl.id)}
                        className={`cursor-pointer group relative rounded-2xl overflow-hidden aspect-[1/1.414] border-2 transition-all ${
                          category === tmpl.id
                            ? 'border-violet-500 shadow-[0_0_20px_rgba(124,58,237,0.4)]'
                            : 'border-[var(--color-border-hover)] hover:border-violet-500/50'
                        }`}
                      >
                        {category === tmpl.id && (
                          <div className="absolute top-2 right-2 z-20 bg-violet-500 text-white p-1 rounded-full">
                            <CheckCircle2 size={14} />
                          </div>
                        )}
                        
                        {/* White background thumbnail */}
                        <div className="absolute inset-0 bg-white overflow-hidden">
                          <div
                            className="absolute top-0 left-0 pointer-events-none"
                            style={{
                              width: '210mm',
                              height: '297mm',
                              transform: 'scale(0.22)',
                              transformOrigin: 'top left',
                            }}
                          >
                            <tmpl.component data={data} color={themeColor} />
                          </div>
                        </div>

                        {/* Name label at bottom */}
                        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent z-10">
                          <p className="text-xs font-bold text-white truncate">{tmpl.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP: CONTACT INFO */}
              {builderStep === "contact" && (
                <div className="space-y-4">
                  <div className="glass-card p-6 rounded-2xl space-y-4">
                    <LightInputField
                      label="Full Name"
                      name="name"
                      value={data.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Rahul Sharma"
                    />
                    <LightInputField
                      label="Professional Title"
                      name="title"
                      value={data.title}
                      onChange={handleChange}
                      placeholder="e.g. Senior Software Engineer"
                    />
                  </div>
                  <div className="glass-card p-6 rounded-2xl space-y-4">
                    <LightInputField
                      label="Email Address"
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                      required
                      placeholder="e.g. rahul@example.com"
                    />
                    <LightInputField
                      label="Phone Number"
                      name="phone"
                      value={data.phone}
                      onChange={handleChange}
                      placeholder="e.g. +1 234 567 8900"
                    />
                    <LightInputField
                      label="Location (City, State)"
                      name="location"
                      value={data.location}
                      onChange={handleChange}
                      placeholder="e.g. San Francisco, CA"
                    />
                  </div>
                  <div className="glass-card p-6 rounded-2xl space-y-4">
                    <LightInputField
                      label="LinkedIn URL"
                      name="linkedin"
                      value={data.linkedin}
                      onChange={handleChange}
                      placeholder="e.g. linkedin.com/in/rahulsharma"
                    />
                    <LightInputField
                      label="Profile Photo URL"
                      name="photoUrl"
                      value={data.photoUrl || ""}
                      onChange={handleChange}
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                </div>
              )}

              {/* STEP: EXPERIENCE */}
              {builderStep === "experience" && (
                <div className="space-y-4">
                  {data.experience.map((exp, index) => (
                    <div
                      key={exp.id}
                      className="glass-card rounded-2xl border border-[var(--color-border-hover)] overflow-hidden transition-all group/card"
                    >
                      <div
                        className={`p-5 flex items-center justify-between cursor-pointer ${expandedExpId === exp.id ? "bg-[var(--color-border)] border-b border-[var(--color-border)]" : "hover:bg-[var(--color-border)]"}`}
                        onClick={() =>
                          setExpandedExpId(
                            expandedExpId === exp.id ? null : exp.id,
                          )
                        }
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 cursor-grab text-[var(--text-subtle)] hover:text-[var(--text-main)] transition-colors">
                            <GripVertical size={18} />
                          </div>
                          <div>
                            <h4 className="font-bold text-[var(--text-main)] text-[15px]">
                              {exp.jobTitle || "(Not Specified)"}
                            </h4>
                            <p className="text-xs text-[var(--text-muted)]">
                              {exp.company
                                ? `${exp.company} • ${exp.startDate || "Start"} - ${exp.endDate || "End"}`
                                : "Click to edit"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeExperience(exp.id);
                            }}
                            className="p-2 text-rose-500/50 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                          <div className="p-2 text-[var(--text-muted)]">
                            {expandedExpId === exp.id ? (
                              <ChevronUp size={20} />
                            ) : (
                              <ChevronDown size={20} />
                            )}
                          </div>
                        </div>
                      </div>

                      <AnimatePresence>
                        {expandedExpId === exp.id && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <LightInputField
                                  label="Job Title"
                                  value={exp.jobTitle}
                                  onChange={(e: any) =>
                                    handleExperienceChange(
                                      exp.id,
                                      "jobTitle",
                                      e.target.value,
                                    )
                                  }
                                  required
                                  placeholder="e.g. Frontend Developer"
                                />
                                <LightInputField
                                  label="Company Name"
                                  value={exp.company}
                                  onChange={(e: any) =>
                                    handleExperienceChange(
                                      exp.id,
                                      "company",
                                      e.target.value,
                                    )
                                  }
                                  required
                                  placeholder="e.g. ACME Corp"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <LightInputField
                                  label="Start Date"
                                  placeholder="MM/YYYY"
                                  value={exp.startDate}
                                  onChange={(e: any) =>
                                    handleExperienceChange(
                                      exp.id,
                                      "startDate",
                                      e.target.value,
                                    )
                                  }
                                />
                                <LightInputField
                                  label="End Date"
                                  placeholder="Present"
                                  value={exp.endDate}
                                  onChange={(e: any) =>
                                    handleExperienceChange(
                                      exp.id,
                                      "endDate",
                                      e.target.value,
                                    )
                                  }
                                />
                              </div>
                              <LightTextArea
                                label="Responsibilities & Achievements"
                                value={exp.responsibilities}
                                onChange={(e: any) =>
                                  handleExperienceChange(
                                    exp.id,
                                    "responsibilities",
                                    e.target.value,
                                  )
                                }
                                rows={5}
                                placeholder="Describe what you built, how you built it, and the impact it had..."
                                optionalRightNode={
                                  <button
                                    onClick={() => {
                                      if (setShowAIModal) setShowAIModal(true); // Placeholder for AI integration
                                    }}
                                    className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 px-2 py-1 rounded transition-colors shadow-sm"
                                  >
                                    <Wand2 size={12} /> ✨ Improve This Bullet
                                    with AI
                                  </button>
                                }
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                  <button
                    onClick={addExperience}
                    className="w-full py-4 border-2 border-dashed border-[var(--color-border-hover)] hover:border-emerald-500/50 text-emerald-500 font-bold rounded-2xl flex justify-center items-center gap-2 hover:bg-emerald-500/5 transition-all"
                  >
                    <Plus size={18} /> Add Experience
                  </button>
                </div>
              )}

              {/* STEP: EDUCATION */}
              {builderStep === "education" && (
                <div className="space-y-4">
                  {data.education.map((edu) => (
                    <div
                      key={edu.id}
                      className="glass-card rounded-2xl border border-[var(--color-border-hover)] overflow-hidden transition-all group/card"
                    >
                      <div
                        className={`p-5 flex items-center justify-between cursor-pointer ${expandedEduId === edu.id ? "bg-[var(--color-border)] border-b border-[var(--color-border)]" : "hover:bg-[var(--color-border)]"}`}
                        onClick={() =>
                          setExpandedEduId(
                            expandedEduId === edu.id ? null : edu.id,
                          )
                        }
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 cursor-grab text-[var(--text-subtle)] hover:text-[var(--text-main)] transition-colors">
                            <GripVertical size={18} />
                          </div>
                          <div>
                            <h4 className="font-bold text-[var(--text-main)] text-[15px]">
                              {edu.degree || "(Not Specified)"}
                            </h4>
                            <p className="text-xs text-[var(--text-muted)]">
                              {edu.institution
                                ? `${edu.institution}`
                                : "Click to edit"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeEducation(edu.id);
                            }}
                            className="p-2 text-rose-500/50 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                          <div className="p-2 text-[var(--text-muted)]">
                            {expandedEduId === edu.id ? (
                              <ChevronUp size={20} />
                            ) : (
                              <ChevronDown size={20} />
                            )}
                          </div>
                        </div>
                      </div>

                      <AnimatePresence>
                        {expandedEduId === edu.id && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <LightInputField
                                  label="Degree / Program"
                                  value={edu.degree}
                                  onChange={(e: any) =>
                                    handleEducationChange(
                                      edu.id,
                                      "degree",
                                      e.target.value,
                                    )
                                  }
                                  required
                                  placeholder="e.g. B.S. Computer Science"
                                />
                                <LightInputField
                                  label="Institution Name"
                                  value={edu.institution}
                                  onChange={(e: any) =>
                                    handleEducationChange(
                                      edu.id,
                                      "institution",
                                      e.target.value,
                                    )
                                  }
                                  required
                                  placeholder="e.g. Stanford University"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <LightInputField
                                  label="Year / Date Range"
                                  value={edu.year}
                                  onChange={(e: any) =>
                                    handleEducationChange(
                                      edu.id,
                                      "year",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="e.g. 2018 - 2022"
                                />
                                <LightInputField
                                  label="Description (Optional)"
                                  value={edu.description}
                                  onChange={(e: any) =>
                                    handleEducationChange(
                                      edu.id,
                                      "description",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="e.g. Graduated with Honors"
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                  <button
                    onClick={addEducation}
                    className="w-full py-4 border-2 border-dashed border-[var(--color-border-hover)] hover:border-emerald-500/50 text-emerald-500 font-bold rounded-2xl flex justify-center items-center gap-2 hover:bg-emerald-500/5 transition-all"
                  >
                    <Plus size={18} /> Add Education
                  </button>
                </div>
              )}

              {/* STEP: SKILLS */}
              {builderStep === "skills" && (
                <div className="space-y-6">
                  <div className="glass-card p-6 rounded-2xl">
                    <div className="relative">
                      <Search
                        className="absolute left-4 top-3.5 text-[var(--text-muted)]"
                        size={18}
                      />
                      <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={addSkill}
                        placeholder="Type a skill and press Enter (e.g. React, Project Management)"
                        className="w-full pl-11 pr-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border-hover)] rounded-xl focus:border-emerald-500 outline-none text-[var(--text-main)] focus:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all"
                      />
                    </div>
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-[var(--text-muted)]">
                          Your Skills ({
                            data.skills.split(/,|\n|\//).filter(s => s.trim()).length
                          })
                        </span>
                        {data.skills.trim() !== "" && (
                          <button
                            type="button"
                            onClick={() => setData(prev => ({ ...prev, skills: "" }))}
                            className="flex items-center gap-1.5 text-xs bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 font-bold px-3 py-1.5 rounded-lg transition-colors border border-rose-500/20"
                          >
                            <Trash2 size={14} /> Clear All
                          </button>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {data.skills
                          .split(/,|\n|\//)
                          .map((s) => s.trim())
                          .filter(Boolean)
                          .slice(0, 80) // Max 80 to prevent lag
                          .map((skill, index) => (
                            <span
                              key={`${skill}-${index}`}
                              className="inline-flex items-start max-w-full gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-lg text-sm font-semibold group/skill"
                            >
                              <span className="flex-1 break-words whitespace-normal text-left max-h-32 overflow-y-auto min-w-0">
                                {skill.substring(0, 50)}{skill.length > 50 ? "..." : ""}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeSkill(index)}
                                className="text-emerald-500/50 hover:text-emerald-400 shrink-0 mt-0.5 p-1 -mr-1"
                                title="Remove skill"
                              >
                                <XCircle size={16} />
                              </button>
                            </span>
                          ))}
                        {data.skills.trim() === "" && (
                          <div className="text-sm text-[var(--text-muted)] italic p-4 border-2 border-dashed border-[var(--color-border)] rounded-lg w-full text-center">
                            No skills added yet.
                          </div>
                        )}
                        {data.skills.split(/,|\n|\//).map(s => s.trim()).filter(Boolean).length > 80 && (
                          <div className="text-xs text-rose-400 w-full text-center mt-2 font-bold p-2 bg-rose-500/10 rounded-lg">
                            + {data.skills.split(/,|\n|\//).map(s => s.trim()).filter(Boolean).length - 80} more skills not shown. Please clear the list.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="glass-card p-6 rounded-2xl">
                    <h4 className="font-bold text-[var(--text-main)] mb-4 flex items-center gap-2">
                      <Lightbulb size={16} className="text-emerald-500" />{" "}
                      Suggested Skills for {data.title || "your role"}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "JavaScript",
                        "TypeScript",
                        "React",
                        "Node.js",
                        "Python",
                        "AWS",
                        "Agile",
                        "SQL",
                      ].map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            addSkillValue(s);
                          }}
                          className="text-xs bg-[var(--color-border)] hover:bg-[var(--color-border-hover)] text-[var(--text-main)] px-3 py-1.5 rounded-full transition-colors border border-[var(--color-border)] hover:border-white/20"
                        >
                          + {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP: SUMMARY */}
              {builderStep === "summary" && (
                <div className="space-y-4">
                  <div className="glass-card p-1 rounded-2xl overflow-hidden relative">
                    <div className="absolute top-4 right-4 z-10">
                      <button
                        onClick={() => {
                          if (setShowAIModal) setShowAIModal(true);
                        }}
                        className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-2 rounded-lg transition-colors border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                      >
                        <Wand2 size={14} /> ✨ Write My Summary with AI
                      </button>
                    </div>
                    <textarea
                      name="summary"
                      value={data.summary}
                      onChange={handleChange}
                      rows={10}
                      className="w-full p-6 bg-transparent text-[var(--text-main)] outline-none resize-none leading-relaxed text-[15px] placeholder:text-[var(--text-subtle)]"
                      placeholder="Write a brief professional summary highlighting your key achievements and core competencies..."
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          </div>
        </div>

        {/* Action Bottom Bar */}
        <div className="p-4 md:p-6 lg:px-10 border-t border-[var(--color-border)] bg-[var(--color-bg-2)] sticky bottom-0 z-10 shrink-0 flex items-center justify-between gap-4 shadow-[0_-10px_30px_rgba(0,0,0,0.2)]">
          <button
            onClick={handlePrev}
            disabled={builderStep === "templates"}
            className={`flex items-center justify-center gap-2 text-sm font-semibold transition-all px-6 py-3 rounded-xl border-2 ${builderStep === "templates" ? "border-transparent text-transparent pointer-events-none" : "border-[var(--color-border-hover)] text-[var(--text-main)] hover:border-slate-500 hover:text-white"}`}
          >
            <ChevronLeft size={16} /> <span className="uppercase tracking-widest text-xs">Back</span>
          </button>

          <div className="hidden sm:flex items-center justify-center px-4 py-1.5 rounded-full bg-[var(--color-bg-3)] border border-[var(--color-border)] text-[11px] font-bold text-[var(--text-muted)] tracking-widest uppercase">
            {steps.find((s) => s.id === builderStep)?.label}
          </div>

          {builderStep !== "summary" ? (
            <button
              onClick={handleNext}
              className="flex items-center justify-center bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-[var(--color-primary-foreground)] px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 text-sm gap-2"
            >
              <span className="uppercase tracking-widest text-xs">Next</span> <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={() => {
                if (window.innerWidth < 1024) {
                  if (setMobileView) setMobileView("preview");
                } else {
                   handlePrint();
                }
              }}
              className="flex items-center justify-center bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] hover:to-[var(--color-accent)] text-[var(--color-primary-foreground)] px-8 py-3 rounded-xl font-bold shadow-[0_4px_20px_var(--color-primary-glow)] transition-all hover:scale-105 active:scale-95 text-sm gap-2 relative overflow-hidden"
            >
              <div className="relative z-10 flex items-center gap-2 text-[var(--text-main)] shadow-sm">
                 <span className="uppercase tracking-widest text-xs hidden sm:inline">Preview / Download</span>
                 <span className="uppercase tracking-widest text-xs sm:hidden">Download</span>
                 <Download size={16} />
              </div>
            </button>
          )}
        </div>
      </div>

      {/* RIGHT PANEL - LIVE PREVIEW */}
      <div
        className={`flex-1 flex flex-col h-full bg-[var(--color-bg)] relative ${mobileView === "editor" ? "hidden md:flex" : "flex"}`}
        style={{ backgroundImage: 'radial-gradient(var(--text-subtle) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      >
        {/* Preview Top Bar */}
        <div className="px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-bg-2)]/90 backdrop-blur-xl flex items-center justify-between shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-main)]">
              <Palette
                size={16}
                className="text-[var(--color-primary-light)]"
              />{" "}
              <span className="hidden md:inline">Theme Color</span>
            </div>
            <div className="flex gap-1.5 p-1.5 bg-[var(--color-border)] rounded-full border border-[var(--color-border-hover)]">
              {[
                "#7c3aed",
                "#06b6d4",
                "#f43f5e",
                "#10b981",
                "#f59e0b",
                "#000000",
              ].map((color) => (
                <button
                  key={color}
                  onClick={() => setThemeColor(color)}
                  className={`w-5 h-5 md:w-6 md:h-6 rounded-full transition-all ${themeColor === color ? "scale-125 border-2 border-white shadow-[0_0_10px_currentColor]" : "hover:scale-110 border border-white/20"}`}
                  style={{ backgroundColor: color, color: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>

          <div className="flex bg-[var(--color-bg-3)] p-1 rounded-lg border border-[var(--color-border)]">
            <button
              onClick={() => setPaperSize("a4")}
              className={`px-3 py-1 md:py-1.5 text-xs font-bold rounded shadow-sm transition-colors ${paperSize === "a4" ? "bg-[var(--color-bg-2)] text-[var(--color-primary-light)] border border-[var(--color-border)]" : "text-[var(--text-muted)] hover:text-white"}`}
            >
              A4
            </button>
            <button
              onClick={() => setPaperSize("letter")}
              className={`px-3 py-1 md:py-1.5 text-xs font-bold rounded shadow-sm transition-colors ${paperSize === "letter" ? "bg-[var(--color-bg-2)] text-[var(--color-primary-light)] border border-[var(--color-border)]" : "text-[var(--text-muted)] hover:text-white"}`}
            >
              US Letter
            </button>
          </div>
        </div>

        {/* Document Area */}
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto w-full p-4 md:p-8 flex justify-center relative hide-scrollbar pb-32"
        >
          {(!data.name) ? (
            
            <div className="max-w-[210mm] min-h-[297mm] mx-auto bg-[var(--color-bg-2)] border border-[var(--color-border-hover)] flex flex-col items-center justify-center p-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                  <div className="w-24 h-24 bg-[var(--color-bg-2)] rounded-full flex items-center justify-center mb-6 text-[var(--text-muted)] shadow-inner">
                    <FileText size={48} strokeWidth={1} />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--text-main)] mb-2">
                    Your canvas is empty
                  </h3>
                  <p className="text-[var(--text-muted)] max-w-md mb-8 leading-relaxed text-center">
                    Start typing in the editor to build your resume.
                  </p>
                </div>

              
          ) : (
            <div 
              className="relative transition-all mx-auto flex-shrink-0"
              style={{
                width: `${scale * (paperSize === 'a4' ? 794 : 816)}px`,
                height: `${scale * (paperSize === 'a4' ? 1123 : 1056)}px`,
              }}
            >
              <div
                className="absolute top-0 left-0 origin-top-left transform-gpu transition-transform"
                style={{
                  width: `${paperSize === 'a4' ? 794 : 816}px`,
                  minHeight: `${paperSize === 'a4' ? 1123 : 1056}px`,
                  transform: `scale(${scale})`,
                }}
              >
                <div
                  id="preview-content"
                  className="bg-white text-slate-900 shadow-[0_20px_60px_rgba(0,0,0,0.6)] print:shadow-none print:border-none preserve-colors"
                  style={{
                    width: `${paperSize === 'a4' ? 794 : 816}px`,
                    minHeight: `${paperSize === 'a4' ? 1123 : 1056}px`,
                    fontFamily: 'inherit',
                  }}
                >
                  <ErrorBoundary>{renderTemplatePreview()}</ErrorBoundary>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Floating Action Bar */}
        <div className="fixed md:absolute bottom-[5rem] md:bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-8 bg-[var(--color-bg-2)]/95 backdrop-blur-xl px-2 py-2 rounded-full flex gap-2 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-[var(--color-border)] z-[100] transform transition-transform duration-500 ease-out slide-in-from-bottom-24">
          <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 px-3 py-2 md:px-5 md:py-2.5 rounded-full font-bold text-xs md:text-sm text-[var(--color-primary-foreground)] bg-gradient-to-r from-blue-500 to-indigo-500 hover:scale-105 transition-transform"
            >
              <Share2 size={16} /> Share
            </button>
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 px-3 py-2 md:px-5 md:py-2.5 rounded-full font-bold text-xs md:text-sm text-[var(--color-primary-foreground)] bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] hover:scale-105 transition-transform"
          >
            <Download size={16} /> Export PDF
          </button>
          <button
            onClick={handleExportDocx}
            className="flex items-center justify-center gap-2 px-3 py-2 md:px-5 md:py-2.5 rounded-full font-bold text-xs md:text-sm text-[var(--text-main)] bg-[var(--color-bg-3)] hover:bg-slate-700 transition-colors border border-[var(--color-border-hover)]"
          >
            <FileText size={16} /> Export DOCX
          </button>
        </div>
      </div>
    </div>
  );
};
