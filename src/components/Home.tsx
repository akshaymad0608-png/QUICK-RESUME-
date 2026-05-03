import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "./Logo";
import { ResumeData } from "../types";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
  UploadCloud,
  Download,
  Brain,
  FileText,
  FileBadge,
  MessageSquare,
  Cloud,
  CheckCircle
} from "lucide-react";

import {
  TechTemplate,
  ExecutiveTemplate,
  DesignerTemplate,
  CleanSidebarTemplate,
  StartupTemplate,
  MinimalTemplate,
  AcademicTemplate,
  CorporateTemplate,
  AvatarTemplate,
  GeometricTemplate,
  ModernMinimalistTemplate,
} from "./Templates";

interface HomeProps {
  setCurrentView: (view: "home" | "app" | "demo") => void;
  data: ResumeData;
  setShowAIModal: (show: boolean) => void;
  setActiveTab: (tab: "resume" | "coverLetter") => void;
  setShowATSModal: (show: boolean) => void;
  setShowInterviewModal: (show: boolean) => void;
  setDemoTitle: (title: string) => void;
  onInstantBuild?: (text: string) => void;
  setCategory?: (cat: string) => void;
  setBuilderStep?: (step: any) => void;
}

import { ScaledPreview } from "./ScaledPreview";

export const Home: React.FC<HomeProps> = ({
  setCurrentView,
  data,
  setShowAIModal,
  setActiveTab,
  setShowATSModal,
  setShowInterviewModal,
  setDemoTitle,
  onInstantBuild,
  setCategory,
  setBuilderStep,
}) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [quickInput, setQuickInput] = useState("");
  const [activeAITab, setActiveAITab] = useState<"resume" | "coverLetter" | "interview">("resume");
  const [activeTemplateTab, setActiveTemplateTab] = useState<"all" | "classic" | "modern" | "creative" | "minimal">("all");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail("");
    }
  };

  const templates = [
    { id: "executive", name: "Executive", component: ExecutiveTemplate, category: "classic" },
    { id: "designer", name: "Creative", component: DesignerTemplate, category: "creative" },
    { id: "clean", name: "Clean", component: CleanSidebarTemplate, category: "minimal" },
    { id: "modern", name: "Modern", component: ModernMinimalistTemplate, category: "modern" },
    { id: "startup", name: "Startup", component: StartupTemplate, category: "creative" },
    { id: "academic", name: "Academic", component: AcademicTemplate, category: "classic" },
    { id: "tech", name: "Tech", component: TechTemplate, category: "modern" },
    { id: "minimal", name: "Minimal", component: MinimalTemplate, category: "minimal" },
    { id: "corporate", name: "Corporate", component: CorporateTemplate, category: "classic" },
    { id: "avatar", name: "Avatar", component: AvatarTemplate, category: "creative" },
    { id: "geometric", name: "Geometric", component: GeometricTemplate, category: "modern" },
  ];

  const filteredTemplates = activeTemplateTab === "all" ? templates : templates.filter(t => t.category === activeTemplateTab);

  return (
    <main className="w-full flex-1 bg-[var(--color-bg)] relative">
      <Helmet>
        <title>Free AI Resume Builder | Create ATS-Friendly Resumes Fast</title>
        <meta name="description" content="Build a professional, ATS-optimized resume in minutes with our Free AI Resume Builder. Cover letter generator included. Start creating your perfect CV now!" />
        <meta name="keywords" content="resume builder, free resume builder, AI resume builder, CV maker, free CV maker, ATS friendly resume, professional resume templates, online resume generator, smart resume maker, cover letter generator, text to resume ai, perfect resume, best resume builder 2026" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Quick Resume AI Builder",
              "description": "Free AI-powered ATS resume builder and cover letter generator."
            }
          `}
        </script>
      </Helmet>

      {/* SECTION 1 — HERO */}
      <section className="relative w-full min-h-[92vh] flex flex-col justify-center items-center py-20 sm:py-28 px-4 sm:px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-teal-500/15 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[100px] rounded-full mix-blend-screen" />
        </div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative z-10 flex flex-col items-center text-center w-full max-w-5xl mx-auto mt-auto mt-16 sm:mt-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-semibold mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            AI-Powered · ATS-Optimized · 100% Free
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-[clamp(2.5rem,8vw,5.5rem)] leading-[1.1] font-black tracking-tight mb-6">
            <span className="block text-[var(--text-main)]">Your Dream Job</span>
            <span className="relative inline-block mt-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-teal-400">Starts Here.</span>
              <span className="absolute left-0 bottom-0 w-full h-[30%] bg-emerald-500/30 blur-xl -z-10 rounded-full" />
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="max-w-2xl text-[var(--text-muted)] text-base sm:text-lg md:text-xl mb-10 leading-relaxed">
            Create a recruiter-ready resume in minutes. Let our advanced AI build the perfect, ATS-optimized layout and write impactful bullet points for you. Free forever.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16 px-4 sm:px-0">
            <button onClick={() => setCurrentView("app")} className="group relative w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-bold text-lg shadow-[0_0_40px_rgba(37,99,235,0.4)] overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]">
              <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <Sparkles size={20} />
              <span className="relative z-10">Build My Resume Free</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button onClick={() => document.getElementById("templates")?.scrollIntoView({ behavior: "smooth" })} className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-[var(--color-bg-2)] text-[var(--text-main)] rounded-2xl font-bold text-lg border border-[var(--color-border)] hover:bg-[var(--color-bg-3)] transition-colors">
              Browse Templates
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-[var(--text-muted)] font-medium">
            <div className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-blue-400" /> No signup needed</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-blue-400" /> ATS-optimized</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-blue-400" /> Export PDF & DOCX</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-blue-400" /> Gemini AI powered</div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="w-full max-w-3xl mx-auto relative z-20 mt-16 lg:mt-auto">
          <div className="absolute -inset-px bg-gradient-to-r from-blue-500/50 via-emerald-500/30 to-teal-500/50 rounded-[1.75rem] blur opacity-50" />
          <div className="relative bg-[var(--color-bg-2)] border border-[var(--color-border-hover)] rounded-[1.75rem] p-4 sm:p-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
              <span className="text-blue-400 font-bold text-sm tracking-wide flex items-center gap-2">✦ Magic Input</span>
              <span className="bg-blue-500/10 text-blue-300 text-xs px-2.5 py-1 rounded-md font-medium border border-blue-500/20">AI auto-fills everything ✨</span>
            </div>
            <textarea
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value)}
              className="w-full bg-[var(--color-bg)]/50 border border-[var(--color-border)] rounded-xl p-4 text-[var(--text-main)] font-mono text-sm leading-relaxed focus:outline-none focus:border-blue-500/50 transition-colors resize-none min-h-[100px]"
              placeholder="Paste your LinkedIn profile text, a previous resume, or a job outline..."
            />
            <button
              onClick={() => { if (quickInput.trim() && onInstantBuild) onInstantBuild(quickInput); }}
              disabled={!quickInput.trim()}
              className="mt-4 w-full bg-gradient-to-r from-blue-600 to-cyan-600 disabled:from-[var(--color-bg-3)] disabled:to-[var(--color-bg-3)] disabled:text-[var(--text-muted)] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <Sparkles size={18} />
              Generate Resume Instantly
            </button>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2 — STATS BAR */}
      <section className="bg-[var(--color-bg-2)] border-y border-[var(--color-border)] py-10 sm:py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "50,000+", label: "Resumes Built", color: "text-blue-400" },
            { value: "94%", label: "ATS Pass Rate", color: "text-teal-400" },
            { value: "3x", label: "More Interviews", color: "text-emerald-400" },
            { value: "100%", label: "Free Forever", color: "text-emerald-400" },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center text-center">
              <span className={`text-3xl sm:text-4xl md:text-5xl font-black font-mono mb-2 ${stat.color}`}>{stat.value}</span>
              <span className="text-xs sm:text-sm uppercase tracking-wide text-[var(--text-muted)] font-semibold">{stat.label}</span>
            </motion.div>
          ))}
        </div>
        <div className="border-t border-[var(--color-border)] pt-8 mt-10 overflow-hidden flex w-full">
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ ease: "linear", duration: 25, repeat: Infinity }} className="flex whitespace-nowrap gap-12 sm:gap-16 lg:gap-24 items-center opacity-30 text-[var(--text-subtle)] font-extrabold text-xl sm:text-2xl px-6">
            {["Google", "Microsoft", "Amazon", "Meta", "Apple", "Stripe", "Airbnb", "Netflix", "Figma", "Notion", "Google", "Microsoft", "Amazon", "Meta", "Apple", "Stripe", "Airbnb", "Netflix", "Figma", "Notion"].map((name, i) => (
              <span key={i}>{name}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — HOW IT WORKS */}
      <section className="bg-[var(--color-bg)] border-b border-[var(--color-border)] py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <Zap size={14} /> How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text-main)] mb-12 sm:mb-16">Three steps to your dream job.</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="relative group rounded-[24px] bg-[var(--color-bg-2)] p-6 sm:p-8 border border-blue-500/20 bg-gradient-to-b from-blue-500/20 to-transparent overflow-hidden hover:-translate-y-1 transition-transform">
              <span className="absolute -top-4 -right-2 text-[12rem] font-black leading-none text-white/[0.04] select-none pointer-events-none">01</span>
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 relative z-10 transition-transform group-hover:scale-110">
                <UploadCloud size={28} />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-main)] mb-3 relative z-10">Drop your details</h3>
              <p className="text-[var(--text-muted)] leading-relaxed relative z-10">Upload an old resume, paste your LinkedIn, or just describe your experience. Our AI organizes it instantly.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="relative group rounded-[24px] bg-[var(--color-bg-2)] p-6 sm:p-8 border border-emerald-500/20 bg-gradient-to-b from-emerald-500/20 to-transparent overflow-hidden hover:-translate-y-1 transition-transform">
              <span className="absolute -top-4 -right-2 text-[12rem] font-black leading-none text-white/[0.04] select-none pointer-events-none">02</span>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 relative z-10 transition-transform group-hover:scale-110">
                <Sparkles size={28} />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-main)] mb-3 relative z-10">Pick your template</h3>
              <p className="text-[var(--text-muted)] leading-relaxed relative z-10">Choose from battle-tested, ATS-friendly designs. We'll automatically weave your content into the perfect layout.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="relative group rounded-[24px] bg-[var(--color-bg-2)] p-6 sm:p-8 border border-teal-500/20 bg-gradient-to-b from-teal-500/20 to-transparent overflow-hidden hover:-translate-y-1 transition-transform">
              <span className="absolute -top-4 -right-2 text-[12rem] font-black leading-none text-white/[0.04] select-none pointer-events-none">03</span>
              <div className="w-14 h-14 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-6 relative z-10 transition-transform group-hover:scale-110">
                <Download size={28} />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-main)] mb-3 relative z-10">Export &amp; Apply</h3>
              <p className="text-[var(--text-muted)] leading-relaxed relative z-10">Download a pixel-perfect PDF or DOCX. Your resume is perfectly formatted to pass the bots and impress humans.</p>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mt-12 sm:mt-16 w-full sm:w-auto">
             <button onClick={() => setCurrentView("app")} className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold text-lg hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all">
                Start Building Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
             </button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 — AI FEATURES */}
      <section className="bg-[var(--color-bg-2)] border-b border-[var(--color-border)] py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left mb-12">
            <div className="inline-flex items-center gap-2 text-teal-400 bg-teal-500/10 border border-teal-500/20 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <Brain size={14} /> Powered by Gemini AI
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text-main)]">Your personal career copilot.</h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
             {/* LEFT TABS */}
             <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0 w-full lg:w-1/3 shrink-0 snap-x">
               <button onClick={() => setActiveAITab("resume")} className={`flex items-center gap-4 p-4 rounded-2xl text-left transition-all min-w-[200px] snap-start border ${activeAITab === "resume" ? "bg-blue-500/10 border-blue-500/30 text-blue-300" : "bg-[var(--color-bg)] border-[var(--color-border)] text-[var(--text-muted)] hover:border-blue-500/20"}`}>
                 <div className={`p-3 rounded-xl ${activeAITab === "resume" ? "bg-blue-500/20 text-blue-400" : "bg-[var(--color-bg-2)] text-[var(--text-subtle)]"}`}><FileText size={20} /></div>
                 <div><div className="font-bold">Resume Enhancer</div><div className="text-sm opacity-70 hidden sm:block">Automated bullet points</div></div>
               </button>

               <button onClick={() => setActiveAITab("coverLetter")} className={`flex items-center gap-4 p-4 rounded-2xl text-left transition-all min-w-[200px] snap-start border ${activeAITab === "coverLetter" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300" : "bg-[var(--color-bg)] border-[var(--color-border)] text-[var(--text-muted)] hover:border-emerald-500/20"}`}>
                 <div className={`p-3 rounded-xl ${activeAITab === "coverLetter" ? "bg-emerald-500/20 text-emerald-400" : "bg-[var(--color-bg-2)] text-[var(--text-subtle)]"}`}><FileBadge size={20} /></div>
                 <div><div className="font-bold">Cover Letter Writer</div><div className="text-sm opacity-70 hidden sm:block">Targeted storytelling</div></div>
               </button>

               <button onClick={() => setActiveAITab("interview")} className={`flex items-center gap-4 p-4 rounded-2xl text-left transition-all min-w-[200px] snap-start border ${activeAITab === "interview" ? "bg-teal-500/10 border-teal-500/30 text-teal-300" : "bg-[var(--color-bg)] border-[var(--color-border)] text-[var(--text-muted)] hover:border-teal-500/20"}`}>
                 <div className={`p-3 rounded-xl ${activeAITab === "interview" ? "bg-teal-500/20 text-teal-400" : "bg-[var(--color-bg-2)] text-[var(--text-subtle)]"}`}><MessageSquare size={20} /></div>
                 <div><div className="font-bold">Interview Prep</div><div className="text-sm opacity-70 hidden sm:block">Tailored questions</div></div>
               </button>
             </div>

             {/* RIGHT CONTENT */}
             <div className="flex-1 bg-[var(--color-bg)] rounded-[1.5rem] border border-[var(--color-border)] p-6 sm:p-8 min-h-[280px] sm:min-h-[360px] relative overflow-hidden flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {activeAITab === "resume" && (
                    <motion.div key="resume" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="w-full flex flex-col gap-4">
                       <div className="relative p-5 rounded-xl bg-[var(--color-bg-2)] border border-[var(--color-border)]">
                          <span className="text-[var(--text-subtle)] text-xs font-bold uppercase tracking-widest mb-2 block">Before</span>
                          <p className="font-mono text-sm text-[var(--text-muted)] opacity-80">I helped increase sales and managed a team of developers to build the app faster.</p>
                       </div>
                       
                       <div className="flex justify-center -my-2 relative z-10 w-10 mx-auto">
                          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white border-4 border-[var(--color-bg)] shadow-lg mx-auto"><ArrowRight size={16} className="rotate-90 md:rotate-0" /></div>
                       </div>

                       <div className="relative p-5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                          <span className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2 block">After (AI Enhanced)</span>
                          <div className="flex items-start gap-3 text-[var(--text-main)]">
                             <span className="text-blue-500 mt-1.5 text-[20px] leading-none">•</span>
                             <p className="text-sm">Spearheaded a cross-functional engineering team, accelerating application delivery timelines by 40% while driving a 25% YoY increase in core revenue metrics.</p>
                          </div>
                       </div>

                       <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[var(--color-border)]">
                          <span className="text-[11px] bg-[var(--color-bg-3)] border border-[var(--color-border-hover)] px-2 py-1 rounded text-[var(--text-muted)]">Action Verbs</span>
                          <span className="text-[11px] bg-[var(--color-bg-3)] border border-[var(--color-border-hover)] px-2 py-1 rounded text-[var(--text-muted)]">Metric Extraction</span>
                          <span className="text-[11px] bg-[var(--color-bg-3)] border border-[var(--color-border-hover)] px-2 py-1 rounded text-[var(--text-muted)]">Tone Correction</span>
                       </div>
                    </motion.div>
                  )}
                  {activeAITab === "coverLetter" && (
                    <motion.div key="coverLetter" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="w-full flex flex-col items-center text-center max-w-md mx-auto">
                       <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6"><FileBadge size={32} /></div>
                       <h3 className="text-2xl font-bold text-[var(--text-main)] mb-4">Hyper-targeted Cover Letters.</h3>
                       <p className="text-[var(--text-muted)] mb-8">Paste a job description, and Gemini constructs a compelling narrative linking your exact skills to their specific requirements.</p>
                       <button onClick={() => { setCurrentView("app"); setActiveTab("coverLetter"); }} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-colors w-full sm:w-auto">Try Cover Letter AI</button>
                    </motion.div>
                  )}
                  {activeAITab === "interview" && (
                    <motion.div key="interview" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="w-full flex flex-col items-center text-center max-w-md mx-auto">
                       <div className="w-16 h-16 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400 mb-6"><MessageSquare size={32} /></div>
                       <h3 className="text-2xl font-bold text-[var(--text-main)] mb-4">Anticipate Every Question.</h3>
                       <p className="text-[var(--text-muted)] mb-8">AI analyzes your resume against a target role to generate highly probable interview questions and suggested STAR-method answers.</p>
                       <button onClick={() => { setCurrentView("app"); setShowInterviewModal(true); }} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-bold transition-colors w-full sm:w-auto">Start Interview Prep</button>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — TOOLS GRID */}
      <section className="bg-[var(--color-bg)] border-b border-[var(--color-border)] py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text-main)] mb-12 sm:mb-16 text-center">Every tool you need.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
             {[
               { title: "Resume Builder", txt: "Draft your content flawlessly.", icon: <FileText size={20} />, color: "violet", tag: "POPULAR" },
               { title: "Upload & Enhance", txt: "Upload a PDF or DOC to parse and redesign instantly.", icon: <Cloud size={20} />, color: "cyan", tag: "FREE" },
               { title: "ATS Score Checker", txt: "Match your resume against a specific job posting.", icon: <CheckCircle size={20} />, color: "emerald", tag: "FREE" },
               { title: "Text to Resume", txt: "Paste LinkedIn text or paragraphs to auto-generate.", icon: <Sparkles size={20} />, color: "fuchsia", tag: "NEW" },
               { title: "Interview Prep Kit", txt: "AI dynamically constructs practice interviews.", icon: <Brain size={20} />, color: "amber", tag: "NEW" },
               { title: "Cover Letter Builder", txt: "Instant accompanying letters modeled off your resume.", icon: <FileBadge size={20} />, color: "indigo", tag: "" },
             ].map((tool, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`relative group rounded-[20px] bg-[var(--color-bg-2)] border border-[var(--color-border)] hover:border-${tool.color}-500/50 p-5 sm:p-6 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition-all flex flex-col`}>
                   <div className="flex justify-between items-start mb-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${tool.color}-500/10 text-${tool.color}-400 border border-${tool.color}-500/20 group-hover:scale-110 transition-transform`}>
                         {tool.icon}
                      </div>
                      {tool.tag && (
                         <span className={`text-[10px] font-bold tracking-wider px-2 py-1 rounded bg-${tool.color}-500/10 text-${tool.color}-400 uppercase`}>{tool.tag}</span>
                      )}
                   </div>
                   <h3 className="text-lg font-bold text-[var(--text-main)] mb-2 group-hover:text-white">{tool.title}</h3>
                   <p className="text-sm text-[var(--text-muted)]">{tool.txt}</p>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — TEMPLATES SHOWCASE */}
      <section id="templates" className="bg-[var(--color-bg-2)] border-b border-[var(--color-border)] py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text-main)]">Premium Templates.</h2>
            <div className="flex flex-wrap gap-2 text-sm bg-[var(--color-bg-3)] p-1.5 rounded-2xl border border-[var(--color-border)]">
              {['all', 'classic', 'modern', 'creative', 'minimal'].map(t => (
                <button
                  key={t}
                  onClick={() => setActiveTemplateTab(t as any)}
                  className={`px-4 py-2 rounded-xl font-medium capitalize transition-all ${activeTemplateTab === t ? 'bg-blue-600 text-white shadow-md' : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--color-bg)]'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
            <AnimatePresence mode="popLayout">
              {filteredTemplates.map((tmpl, idx) => {
                const TmplComponent = tmpl.component;
                const isFeatured = activeTemplateTab === "all" && idx === 0;
                return (
                  <motion.div
                    key={tmpl.id}
                    layout
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.2 }}
                    className={`group relative rounded-[20px] overflow-hidden border border-[var(--color-border-hover)] hover:border-blue-500/50 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all @container ${isFeatured ? 'sm:col-span-2 sm:row-span-2' : ''} aspect-[210/297]`}
                  >
                    <ScaledPreview>
                      <TmplComponent data={data} color="#2563eb" />
                    </ScaledPreview>

                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md z-10">{tmpl.name}</span>
                    
                    <div className="absolute inset-0 bg-[var(--color-bg)]/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center z-20">
                       <h3 className="text-xl font-bold text-white mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform">{tmpl.name}</h3>
                       <button
                         onClick={() => {
                           if (setCategory) setCategory(tmpl.id);
                           if (setBuilderStep) setBuilderStep("contact");
                           setCurrentView("app");
                         }}
                         className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform active:scale-95 text-sm sm:text-base w-full sm:w-auto overflow-hidden text-ellipsis whitespace-nowrap"
                       >
                         Use Template
                       </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECTION 7 — FOOTER */}
      <footer className="bg-[var(--color-bg-3)] relative overflow-hidden border-t border-[var(--color-border)]">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center border-b border-[var(--color-border)]">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
            <span className="text-[var(--text-main)]">Your next career move </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">starts today.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-[var(--text-muted)] text-lg mb-10 max-w-xl mx-auto">
            Join thousands of job seekers landing interviews at top companies. Built entirely on the browser, free forever.
          </motion.p>
          <motion.button initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} onClick={() => setCurrentView("app")} className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold text-lg hover:shadow-[0_0_50px_rgba(37,99,235,0.4)] transition-all hover:scale-105 active:scale-95 w-full sm:w-auto justify-center">
            <Sparkles size={20} /> Build Resume for Free
          </motion.button>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-5 gap-8 py-12 sm:py-16 px-4 sm:px-6 relative z-10">
          <div className="col-span-2">
            <div className="mb-6"><Logo className="h-10 sm:h-12 w-auto" /></div>
            <p className="text-[var(--text-muted)] text-sm mb-6 max-w-xs">The modern standard for building ATS-optimized, beautifully designed resumes in minutes. Powered by Google Gemini.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-sm">
              <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required className="flex-1 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg px-4 py-2 text-sm text-[var(--text-main)] focus:outline-none focus:border-blue-500 min-w-0" />
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors whitespace-nowrap">
                {subscribed ? "Soon!" : "Notify"}
              </button>
            </form>
          </div>
          <div>
            <h4 className="text-[var(--text-main)] font-semibold mb-4 text-sm sm:text-base">Product</h4>
            <ul className="space-y-3 text-sm text-[var(--text-subtle)] w-max">
              <li><button onClick={() => setCurrentView("app")} className="hover:text-blue-400 transition-colors">Resume Builder</button></li>
              <li><button onClick={() => { setCurrentView("app"); setActiveTab("coverLetter"); }} className="hover:text-blue-400 transition-colors">Cover Letter AI</button></li>
              <li><button onClick={() => setShowATSModal(true)} className="hover:text-blue-400 transition-colors">ATS Checker</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[var(--text-main)] font-semibold mb-4 text-sm sm:text-base">Resources</h4>
            <ul className="space-y-3 text-sm text-[var(--text-subtle)] w-max">
              <li><button onClick={() => document.getElementById("templates")?.scrollIntoView()} className="hover:text-blue-400 transition-colors">Templates</button></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-blue-400 transition-colors">Career Blog</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-blue-400 transition-colors">Example Resumes</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[var(--text-main)] font-semibold mb-4 text-sm sm:text-base">Legal</h4>
            <ul className="space-y-3 text-sm text-[var(--text-subtle)] w-max">
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-blue-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[var(--text-subtle)]">
          <p>© {new Date().getFullYear()} QuickResume. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" onClick={(e) => e.preventDefault()} aria-label="Twitter" className="hover:text-blue-400 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} aria-label="LinkedIn" className="hover:text-blue-400 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} aria-label="GitHub" className="hover:text-blue-400 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
};
