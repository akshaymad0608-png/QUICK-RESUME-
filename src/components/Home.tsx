import React, { useState, useEffect } from "react";
import {
  Sparkles,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  UploadCloud,
  FileCode2,
  Zap,
  MessageSquare,
  Search,
  FileBadge,
  Check,
  ArrowRight,
  Star,
  FileText,
  Cloud,
  CheckCircle,
  Brain,
  Wand2,
  Download,
} from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
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
import { ResumeData } from "../types";

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

import { Helmet } from "react-helmet-async";

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
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail("");
    }
  };

  const [activeAITab, setActiveAITab] = useState<
    "resume" | "coverLetter" | "interview"
  >("resume");
  const [activeTemplateTab, setActiveTemplateTab] = useState<
    "all" | "classic" | "modern" | "creative" | "minimal"
  >("all");
  const [quickInput, setQuickInput] = useState("");

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const templates = [
    {
      id: "executive",
      name: "Executive",
      component: ExecutiveTemplate,
      category: "classic",
      badge: "POPULAR",
    },
    { id: "designer", name: "Designer", component: DesignerTemplate, category: "creative" },
    {
      id: "clean",
      name: "Two-Column Clean",
      component: CleanSidebarTemplate,
      category: "modern",
    },
    {
      id: "tech",
      name: "Tech Professional",
      component: TechTemplate,
      category: "modern",
      badge: "STAFF PICK",
    },
    {
      id: "startup",
      name: "Startup Creative",
      component: StartupTemplate,
      category: "creative",
    },
    {
      id: "minimal",
      name: "Modern Minimal",
      component: MinimalTemplate,
      category: "minimal",
      badge: "NEW",
    },
    {
      id: "academic",
      name: "Academic Notational",
      component: AcademicTemplate,
      category: "classic",
    },
    {
      id: "corporate",
      name: "Corporate Impact",
      component: CorporateTemplate,
      category: "classic",
    },
    {
      id: "avatar",
      name: "Profile (Photo Focus)",
      component: AvatarTemplate,
      category: "creative",
      badge: "PHOTO",
    },
    {
      id: "geometric",
      name: "Geometric Display",
      component: GeometricTemplate,
      category: "modern",
      badge: "PHOTO",
    },
    {
      id: "modern-minimal",
      name: "Modern Minimalist",
      component: ModernMinimalistTemplate,
      category: "minimal",
      badge: "PHOTO",
    },
  ];

  const filteredTemplates =
    activeTemplateTab === "all"
      ? templates
      : templates.filter((t) => t.category === activeTemplateTab);

  return (
    <main className="flex-1 overflow-y-auto min-h-0 bg-[var(--color-bg)] text-[var(--text-main)] print:hidden font-sans relative z-0 selection:bg-emerald-500/30">
      <Helmet>
        <title>Quick Resume | Best Free AI ATS Resume Builder & Cover Letter Generator</title>
        <meta
          name="description"
          content="Build an ATS-friendly, professional resume in minutes using AI. Free, fast, customizable and no sign-up required. Stand out to recruiters."
        />
        <meta name="keywords" content="free resume builder, AI resume generator, ATS friendly resume, professional cover letter maker, CV builder, online resume maker" />
        <link rel="canonical" href="https://quickresume.app" />
        <meta property="og:title" content="Quick Resume | Best Free AI ATS Resume Builder" />
        <meta property="og:description" content="Build an ATS-friendly, professional resume in minutes using AI. Free, fast, and no sign-up required." />
        <meta property="og:url" content="https://quickresume.app" />
        <meta name="twitter:title" content="Quick Resume | Best Free AI ATS Resume Builder" />
        <meta name="twitter:description" content="Build an ATS-friendly, professional resume in minutes using AI." />
        
        {/* Schema.org Structured Data specific to the Home page */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Quick Resume",
            "url": "https://quickresume.app/",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://quickresume.app/?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      {/* Animated gradient blob background */}
      <div className="absolute top-0 inset-x-0 h-[800px] overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[200px] -left-[100px] w-[600px] h-[600px] bg-[var(--color-primary)]/20 rounded-full blur-[120px] animate-blob" />
        <div
          className="absolute top-[100px] right-[0px] w-[500px] h-[500px] bg-[var(--color-accent)]/20 rounded-full blur-[120px] animate-blob"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-[0px] left-[200px] w-[400px] h-[400px] bg-[var(--color-primary-light)]/10 rounded-full blur-[100px] animate-blob"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* 1. Hero Section */}
      <section className="relative px-6 pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary-light)] text-sm font-semibold mb-8 backdrop-blur-md">
              <Sparkles size={14} /> AI-Powered ATS Resume Builder
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-black leading-[0.95] tracking-tight mb-8">
              <span className="text-gradient hover:drop-shadow-[0_0_30px_var(--color-primary-glow)] transition-all">
                Reimagined by AI
              </span>
            </h1>

            <p className="text-xl text-[var(--text-muted)] mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Stop guessing. Our AI analyzes real job descriptions and builds ATS-optimized resumes that get you to the interview table.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 justify-center lg:justify-start">
              <button
                onClick={() => setCurrentView("app")}
                className="group relative bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-[var(--color-primary-foreground)] px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto overflow-hidden shadow-[0_0_40px_var(--color-primary-glow)] hover:shadow-[0_0_60px_var(--color-primary-glow)] border border-[var(--color-border-hover)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-700 ease-in-out" />
                Build My Resume Free <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("templates")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group px-8 py-4 rounded-2xl font-bold text-lg text-[var(--text-main)] hover:text-[var(--text-main)] transition-all bg-transparent hover:bg-[var(--color-bg-3)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] w-full sm:w-auto"
              >
                See Templates
              </button>
            </div>

            {/* Social Proof Strip */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-3">
                {[
                  "bg-[#8b5cf6]",
                  "bg-[#06b6d4]",
                  "bg-[#f43f5e]",
                  "bg-[#10b981]",
                  "bg-[#f59e0b]",
                ].map((bg, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full border-2 border-[var(--color-bg)] flex items-center justify-center text-xs font-bold ${bg} text-white shadow-lg`}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div className="flex flex-col text-sm">
                <div className="flex items-center gap-1 text-[var(--color-accent)]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <span className="text-[var(--text-muted)] font-bold mt-0.5">
                  4.9/5 &middot; 50,000+ resumes built
                </span>
              </div>
            </div>

            {/* Quick Generator */}
            <div className="mt-10 glass-card p-5 sm:p-6 rounded-[24px] border-none relative overflow-hidden group/qg max-w-xl mx-auto lg:mx-0 shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
              {/* Gradient Border inside using absolute positioning */}
              <div className="absolute inset-0 rounded-[24px] rounded-bl-[24px] rounded-br-[24px] p-[1px] bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] z-0 masked-border">
                <div className="absolute inset-0 bg-[var(--color-bg-2)] rounded-[23px] h-full w-full" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 opacity-0 group-hover/qg:opacity-100 transition-opacity z-0" />
              
              <div className="relative z-10 w-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-[var(--color-accent)] flex items-center gap-1.5 uppercase tracking-widest">
                    ✦ AI Resume Magic
                  </span>
                </div>
                <div className="flex flex-col gap-3 w-full">
                  <div className="relative w-full">
                    <textarea
                      value={quickInput}
                      onChange={(e) => setQuickInput(e.target.value)}
                      className="w-full bg-[var(--color-bg)]/80 border border-[var(--color-border)] rounded-2xl px-4 py-4 text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--color-primary)]/50 transition-all resize-none min-h-[100px] hide-scrollbar font-mono z-10 relative"
                      rows={3}
                      title="Paste Your Job Description or LinkedIn Profile"
                    />
                    {!quickInput && (
                      <div className="absolute top-4 left-4 pointer-events-none z-20 text-[var(--text-subtle)] font-mono text-sm h-5 overflow-hidden">
                        <motion.div
                          animate={{ y: [0, -20, -20, -40, -40, -60, -60, -80, -80] }}
                          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                          className="flex flex-col gap-[0px]"
                        >
                          <span className="h-5 flex items-center">Paste a job description...</span>
                          <span className="h-5 flex items-center">Paste your LinkedIn about section...</span>
                          <span className="h-5 flex items-center">Type your work history...</span>
                          <span className="h-5 flex items-center">Paste a job description...</span>
                          <span className="h-5 flex items-center"></span>
                        </motion.div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      if (quickInput.trim() && onInstantBuild) {
                        onInstantBuild(quickInput);
                      }
                    }}
                    disabled={!quickInput.trim()}
                    className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] hover:to-[var(--color-primary-light)] disabled:from-[var(--color-bg-3)] disabled:to-[var(--color-bg-3)] disabled:text-[var(--text-muted)] disabled:cursor-not-allowed text-[var(--color-primary-foreground)] px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_var(--color-primary-glow)] border border-[var(--color-border-hover)]"
                  >
                    Generate Instantly ✨
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full max-w-2xl relative lg:perspective-[1000px]"
          >
            {/* Floating Badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 z-20 glass-card px-4 py-3 rounded-2xl hidden sm:flex items-center gap-3 shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
            >
              <div className="bg-[var(--color-success)]/20 p-2 rounded-full text-[var(--color-success)]">
                <Search size={18} />
              </div>
              <div>
                <div className="text-xs text-[var(--text-muted)] font-semibold mb-0.5">
                  ATS Score
                </div>
                <div className="text-lg font-black text-[var(--text-main)] font-mono">
                  94/100
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-8 -right-6 z-20 glass-card px-4 py-3 rounded-2xl hidden sm:flex items-center gap-3 shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
            >
              <div className="bg-[var(--color-primary)]/20 p-2 rounded-full text-[var(--color-primary-light)]">
                <MessageSquare size={18} />
              </div>
              <div className="text-sm font-bold text-[var(--text-main)]">
                Interview Prep Ready
              </div>
            </motion.div>

            {/* Before / After Concept */}
            <div className="relative glass-card rounded-[2rem] p-4 lg:rotate-y-[-10deg] lg:rotate-x-[5deg] transform-style-3d shadow-[20px_20px_60px_var(--color-bg)] bg-[var(--color-bg-2)]/80">
              <div className="flex gap-4 h-[500px]">
                {/* Left: Messy Text */}
                <div className="flex-1 bg-[var(--color-bg-2)] rounded-xl p-6 border border-[var(--color-border)] overflow-hidden relative shadow-inner">
                  <div className="absolute top-3 left-3 text-xs font-bold text-[var(--text-muted)] bg-[var(--color-bg)]/80 px-3 py-1.5 rounded-md border border-[var(--color-border)] shadow-sm uppercase tracking-wider backdrop-blur-sm">
                    BEFORE
                  </div>
                  <div className="mt-10 space-y-4 font-mono text-[13px] text-[var(--text-main)] leading-relaxed selection:bg-[var(--color-bg-3)]">
                    <p className="font-bold">john doe</p>
                    <p className="text-[var(--text-muted)]">software guy</p>
                    <p>
                      i worked at google from 2020-2022. i did react and node.
                      built some cool stuff that made money.
                    </p>
                    <p>
                      then i went to meta. 2022-present. senior engineer.
                      managed a team. fixed bugs.
                    </p>
                    <p className="text-[var(--text-muted)]">skills: js, ts, react, html, css, git</p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-full p-3 shadow-[0_0_30px_var(--color-primary-glow)] flex flex-col items-center justify-center border border-[var(--color-border-hover)]">
                  <ArrowRight size={24} />
                  <span className="text-[9px] font-black mt-1">MAGIC</span>
                </div>

                {/* Right: Rendered Resume */}
                <div className="flex-1 bg-white rounded-xl overflow-hidden relative shadow-2xl scale-105 z-10 border border-[var(--color-primary)]/30 preserve-colors">
                  <div className="absolute top-3 right-3 text-xs font-bold text-white bg-[var(--color-success)] px-3 py-1 rounded shadow-sm z-20">
                    AFTER
                  </div>
                  <div className="scale-[0.4] origin-top-left w-[250%] pointer-events-none mt-2 ml-2 overflow-hidden rounded-[20px]">
                    <ExecutiveTemplate
                      data={data}
                      color="var(--color-primary)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Stats Section (after hero) */}
      <section className="py-16 border-y border-[var(--color-border)] bg-[var(--color-bg)] relative overflow-hidden">
        {/* Stats Row */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 lg:divide-x divide-[var(--color-border)] text-center mb-16">
          {[
            { value: "50,000+", label: "Resumes Built" },
            { value: "94%", label: "ATS Pass Rate" },
            { value: "3x", label: "More Interviews" },
            { value: "100%", label: "Free" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-4xl md:text-5xl font-black text-[var(--color-primary-light)] font-mono mb-2">
                {stat.value}
              </div>
              <div className="text-[var(--text-muted)] font-semibold text-sm uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Marquee Animation */}
        <div className="flex w-full overflow-hidden border-t border-[var(--color-border)] pt-12 mt-12 pb-4">
          <motion.div
            className="flex whitespace-nowrap gap-16 md:gap-24 items-center px-8 text-2xl md:text-3xl font-extrabold text-[var(--text-subtle)] opacity-40"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          >
            {/* Duplicate for seamless looping */}
            {[
              "Google", "Microsoft", "Amazon", "Meta", "Apple", "Stripe", "Airbnb",
              "Google", "Microsoft", "Amazon", "Meta", "Apple", "Stripe", "Airbnb",
              "Google", "Microsoft", "Amazon", "Meta", "Apple", "Stripe", "Airbnb"
            ].map((company, i) => (
              <span key={i} className="tracking-tight font-sans">
                {company}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. How It Works - Horizontal Steps */}
      <section className="py-32 relative bg-[var(--color-bg-2)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[var(--text-main)] mb-6">
              Built for speed and impact.
            </h2>
            <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto">
              Three simple steps to generate a resume that gets you hired.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-16 relative">
            {/* Animated Connector Line */}
            <div className="hidden md:block absolute top-[60px] h-[2px] bg-[var(--color-border)] z-0 w-full left-[10%]" style={{ width: "80%" }}>
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"
                style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              />
            </div>

            {[
              {
                step: "1",
                title: "Drop your details",
                desc: "Upload an old PDF, paste raw text, or fill our smart forms. Our AI instantly structures everything perfectly.",
                visual: (
                  <div className="w-full rounded-xl bg-[var(--color-bg-2)] border border-[var(--color-border-hover)] p-3.5 h-[130px] flex flex-col gap-2">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-violet-500" />
                      <div className="h-1.5 flex-1 rounded-full bg-[var(--color-border-hover)]" />
                    </div>
                    <div className="bg-[var(--color-border)] border border-[var(--color-border-hover)] rounded-lg p-2 flex flex-col gap-1.5">
                      <div className="h-1.5 w-[40%] rounded-full bg-violet-500/50" />
                      <div className="h-1.5 w-full rounded-full bg-white/15" />
                    </div>
                    <div className="bg-[var(--color-border)] border border-[var(--color-border-hover)] rounded-lg p-2 flex flex-col gap-1.5">
                      <div className="h-1.5 w-[35%] rounded-full bg-violet-500/50" />
                      <div className="h-1.5 w-[72%] rounded-full bg-white/15" />
                    </div>
                    <div className="flex gap-2 mt-auto">
                      <div className="bg-violet-600 text-white text-[9px] font-bold px-2.5 py-1 rounded-md">Paste text</div>
                      <div className="bg-[var(--color-border)] border border-[var(--color-border-hover)] text-[var(--text-muted)] text-[9px] font-bold px-2.5 py-1 rounded-md">Upload PDF</div>
                    </div>
                  </div>
                ),
              },
              {
                step: "2",
                title: "Pick a template",
                desc: "Choose from our library of ATS-friendly designs. Customize colors, fonts, and spacing with a click.",
                visual: (
                  <div className="w-full rounded-xl bg-[var(--color-bg-2)] border border-[var(--color-border-hover)] p-3 h-[130px] flex flex-col gap-2">
                    <p className="text-[9px] text-[var(--text-muted)] font-bold uppercase tracking-wider">15 templates</p>
                    <div className="grid grid-cols-3 gap-1.5 flex-1">
                      {[
                        { color: 'bg-violet-500', sel: true },
                        { color: 'bg-cyan-500', sel: false },
                        { color: 'bg-white/20', sel: false },
                        { color: 'bg-emerald-500', sel: false },
                        { color: 'bg-amber-500', sel: false },
                        { color: 'bg-rose-500', sel: false },
                      ].map((t, i) => (
                        <div key={i} className={`rounded-md border p-1.5 flex flex-col gap-1 bg-[var(--color-border)] ${t.sel ? 'border-violet-500 shadow-[0_0_8px_rgba(124,58,237,0.4)]' : 'border-[var(--color-border-hover)]'}`}>
                          <div className={`h-1.5 w-full rounded-sm ${t.color} opacity-70`} />
                          <div className="h-1 w-[75%] rounded-sm bg-white/20" />
                          <div className="h-1 w-[55%] rounded-sm bg-[var(--color-border-hover)]" />
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              },
              {
                step: "3",
                title: "Export & Apply",
                desc: "Download a pixel-perfect PDF. Generate a matching cover letter. Prepare with customized interview questions.",
                visual: (
                  <div className="w-full rounded-xl bg-[var(--color-bg-2)] border border-[var(--color-border-hover)] p-3.5 h-[130px] flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider">ATS Score</span>
                      <span className="text-[11px] font-black text-cyan-400" style={{fontFamily:'monospace'}}>94/100</span>
                    </div>
                    <div className="w-full h-1.5 bg-[var(--color-border-hover)] rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{width:'94%'}} />
                    </div>
                    <div className="flex gap-1.5">
                      <div className="flex-1 bg-violet-600 text-white text-[9px] font-bold py-1.5 rounded-md flex items-center justify-center gap-1">
                        <Download size={8} /> PDF
                      </div>
                      <div className="flex-1 bg-[var(--color-border)] border border-[var(--color-border-hover)] text-[var(--text-muted)] text-[9px] font-bold py-1.5 rounded-md flex items-center justify-center gap-1">
                        <Download size={8} /> DOCX
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-2 py-1.5 mt-auto">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                      <span className="text-[9px] font-bold text-emerald-400">ATS Ready · Interview-Optimized</span>
                    </div>
                  </div>
                ),
              },
            ].map((s, i) => (
              <div key={i} className="relative z-10 flex flex-col glass-card p-8 rounded-[24px] border border-[var(--color-border)]">
                {/* Huge faded background number */}
                <div className="absolute top-2 right-6 text-[80px] font-black text-white/[0.03] select-none pointer-events-none font-sans overflow-hidden leading-none">
                  0{s.step}
                </div>
                
                <div className="w-12 h-12 rounded-full bg-[var(--color-bg)] border border-[var(--color-primary)]/30 flex items-center justify-center mb-8 shadow-[0_0_15px_var(--color-primary-glow)] relative z-10 text-[var(--color-primary-light)] font-bold text-lg inline-flex">
                  {s.step}
                </div>

                <div className="mb-8 relative z-10">
                  {s.visual}
                </div>

                <h3 className="text-2xl font-bold text-[var(--text-main)] mb-4 relative z-10">{s.title}</h3>
                <p className="text-[var(--text-muted)] leading-relaxed relative z-10">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AI Features Tabs */}
      <section className="py-32 bg-[var(--color-bg)] border-y border-[var(--color-border)] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="flex-1 lg:max-w-md sticky top-32">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent)] text-sm font-semibold mb-6">
                <Brain size={14} /> Powered by Gemini AI
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6 text-[var(--text-main)]">
                Your personal career copilot.
              </h2>
              <p className="text-[var(--text-muted)] mb-10 text-lg">
                Stop struggling with phrasing. Our AI understands your
                experience and translates it into the language recruiters love.
              </p>

              <div className="flex flex-col gap-3">
                {[
                  { id: "resume", label: "Resume Enhancer", icon: FileText },
                  {
                    id: "coverLetter",
                    label: "Cover Letter Writer",
                    icon: FileBadge,
                  },
                  {
                    id: "interview",
                    label: "Interview Prep",
                    icon: MessageSquare,
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveAITab(tab.id as any)}
                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all font-semibold border ${
                      activeAITab === tab.id
                        ? "bg-[var(--color-primary)]/10 text-[var(--color-primary-light)] border-[var(--color-primary)]/30 shadow-[0_0_20px_var(--color-primary-glow)]"
                        : "bg-transparent text-[var(--text-muted)] hover:bg-[var(--color-bg-3)] border-transparent"
                    }`}
                  >
                    <tab.icon size={20} /> {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 w-full glass-card rounded-[2rem] p-2 md:p-4 min-h-[300px] md:min-h-[500px] flex items-center justify-center relative overflow-hidden border-[var(--color-border)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAITab}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full bg-[var(--color-bg-2)] rounded-[1.5rem] border border-[var(--color-border)] p-8 flex flex-col shadow-inner"
                >
                  {activeAITab === "resume" && (
                    <>
                      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[var(--color-border)]">
                        <div className="p-2 bg-[var(--color-primary)]/10 text-[var(--color-primary-light)] rounded-lg">
                           <Zap size={20} />
                        </div>
                        <div>
                          <div className="font-bold text-[var(--text-main)] text-lg">
                            Auto-Structuring
                          </div>
                          <div className="text-sm text-[var(--text-subtle)]">
                            Converting raw input...
                          </div>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="bg-[var(--color-bg)] p-5 rounded-xl border border-[var(--color-border-hover)] text-[var(--text-main)] font-mono text-sm opacity-90 relative shadow-inner">
                          "I helped increase sales by making the website faster
                          in 2023"
                          <div className="absolute right-[-14px] top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-[var(--color-primary-foreground)] shadow-[0_0_15px_var(--color-primary-glow)]">
                            <ArrowRight size={14} />
                          </div>
                        </div>
                        <div className="bg-[var(--color-primary)]/10 p-5 rounded-xl border border-[var(--color-primary)]/30 text-[var(--text-main)] font-medium pl-10 relative">
                          <div className="absolute left-4 top-6 w-2 h-2 rounded-full bg-[var(--color-primary-light)] shadow-[0_0_8px_var(--color-primary-light)]" />
                          Spearheaded website performance optimization
                          initiatives, driving a 34% increase in online sales
                          conversion during Q3 2023.
                        </div>
                      </div>
                      <div className="mt-auto pt-8 flex gap-2 flex-wrap">
                        <span className="text-xs px-3 py-1.5 rounded-full border border-[var(--color-border-hover)] bg-[var(--color-bg-3)] text-[var(--text-subtle)] font-semibold">
                          Action Verbs
                        </span>
                        <span className="text-xs px-3 py-1.5 rounded-full border border-[var(--color-border-hover)] bg-[var(--color-bg-3)] text-[var(--text-subtle)] font-semibold">
                          Metric Extraction
                        </span>
                        <span className="text-xs px-3 py-1.5 rounded-full border border-[var(--color-border-hover)] bg-[var(--color-bg-3)] text-[var(--text-subtle)] font-semibold">
                          Tone Correction
                        </span>
                      </div>
                    </>
                  )}
                  {/* Additional tab content can go here smoothly */}
                  {activeAITab === "coverLetter" && (
                    <div className="flex flex-col h-full justify-center text-center">
                      <div className="w-20 h-20 bg-[var(--color-accent)]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[var(--color-accent)]/20 shadow-[0_0_30px_rgba(236,72,153,0.1)]">
                         <FileBadge
                           size={32}
                           className="text-[var(--color-accent)] opacity-80"
                         />
                      </div>
                      <h3 className="text-2xl font-bold text-[var(--text-main)] mb-3">
                        Instant Cover Letters
                      </h3>
                      <p className="text-[var(--text-muted)] max-w-sm mx-auto text-lg">
                        Generates a highly targeted cover letter based exactly
                        on your resume and the target job description.
                      </p>
                    </div>
                  )}
                  {activeAITab === "interview" && (
                    <div className="flex flex-col h-full justify-center text-center">
                      <div className="w-20 h-20 bg-[var(--color-accent)]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[var(--color-accent)]/20 shadow-[0_0_30px_var(--color-accent-glow)]">
                         <MessageSquare
                           size={32}
                           className="text-[var(--color-accent)] opacity-80"
                         />
                      </div>
                      <h3 className="text-2xl font-bold text-[var(--text-main)] mb-3">
                        Mock Interviews
                      </h3>
                      <p className="text-[var(--text-muted)] max-w-sm mx-auto text-lg">
                        Creates behavioral and technical interview questions
                        pulled directly from your stated experience.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5 Resume Tools Grid */}
      <section className="py-24 relative w-full mb-12 bg-[var(--color-bg-2)] border-b border-[var(--color-border)]">
        <div className="absolute top-0 inset-x-0 h-[100px] bg-gradient-to-b from-[var(--color-bg)] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[var(--text-main)] mb-6">
              Powerful Resume Tools
            </h2>
            <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto">
              Everything you need to boost your hiring chances, all in one
              place.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-20">
            {[
              {
                icon: FileText,
                title: "Resume Builder",
                sub: "Build professional resumes in minutes",
                tag: "POPULAR",
                tagColor: "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]",
                onClick: () => {
                  setCurrentView("app");
                  setActiveTab("resume");
                },
              },
              {
                icon: Cloud,
                title: "Upload & Enhance",
                sub: "Improve your existing resume",
                tag: "FREE",
                tagColor:
                  "bg-[var(--color-primary)]/20 text-[var(--color-primary-light)] border border-[var(--color-primary)]/30",
                onClick: () => {
                  setCurrentView("app");
                  setActiveTab("resume");
                  setShowAIModal(true);
                },
              },
              {
                icon: CheckCircle,
                title: "ATS Score Checker",
                sub: "Check resume compatibility",
                tag: "FREE",
                tagColor:
                  "bg-[var(--color-primary)]/20 text-[var(--color-primary-light)] border border-[var(--color-primary)]/30",
                onClick: () => {
                  setCurrentView("app");
                  setActiveTab("resume");
                  setShowATSModal(true);
                },
              },
              {
                icon: Sparkles,
                title: "Text to Resume",
                sub: "Convert text to valid resume instantly",
                tag: "NEW",
                tagColor:
                  "bg-[var(--color-accent)]/20 text-[var(--color-accent)] border border-[var(--color-accent)]/30",
                onClick: () => {
                  setCurrentView("app");
                  setActiveTab("resume");
                  setShowAIModal(true);
                },
              },
              {
                icon: Brain,
                title: "Interview Prep Kit",
                sub: "20 questions with winning answers",
                tag: "NEW",
                tagColor:
                  "bg-[#06b6d4]/20 text-[#06b6d4] border border-[#06b6d4]/30",
                onClick: () => {
                  setCurrentView("app");
                  setActiveTab("resume");
                  setShowInterviewModal(true);
                },
              },
              {
                icon: FileText,
                title: "Cover Letter Builder",
                sub: "Create compelling cover letters",
                tag: "",
                tagColor: "",
                onClick: () => {
                  setCurrentView("app");
                  setActiveTab("coverLetter");
                },
              },
            ].map((tool, idx) => (
              <button
                key={idx}
                onClick={tool.onClick}
                className="relative text-left p-6 rounded-[24px] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:border-[var(--color-primary)]/50 group flex flex-col h-full bg-[var(--color-bg)] border border-[var(--color-border)] overflow-hidden glass-card"
              >
                {/* Hover background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-accent)]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--color-bg-2)] border border-[var(--color-border)] flex items-center justify-center text-[var(--text-subtle)] group-hover:text-[var(--color-primary-light)] group-hover:bg-[var(--color-primary)]/10 group-hover:border-[var(--color-primary)]/40 transition-all duration-300 shadow-inner">
                    <tool.icon size={26} strokeWidth={1.5} />
                  </div>
                  {tool.tag && (
                    <span
                      className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${tool.tagColor}`}
                    >
                      {tool.tag}
                    </span>
                  )}
                </div>
                <h3 className="relative z-10 text-xl font-bold text-[var(--text-main)] mb-2 group-hover:text-[var(--color-primary-light)] transition-colors">
                  {tool.title}
                </h3>
                <p className="relative z-10 text-[var(--text-muted)] text-sm leading-relaxed">
                  {tool.sub}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Templates Showcase */}
      <section id="templates" className="py-32 relative bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-[var(--text-main)] mb-4">
                Premium Templates.
              </h2>
              <p className="text-[var(--text-muted)] text-lg">
                Designed by recruiters, optimized for parsing systems.
              </p>
            </div>

            <div className="flex bg-[var(--color-bg-3)] p-1 rounded-xl border border-[var(--color-border)] backdrop-blur overflow-x-auto no-scrollbar w-full md:w-auto">
              {["all", "classic", "modern", "creative", "minimal"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTemplateTab(tab as any)}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm capitalize transition-all whitespace-nowrap ${
                      activeTemplateTab === tab
                        ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow"
                        : "text-[var(--text-muted)] hover:text-[var(--color-primary-foreground)] hover:bg-[var(--color-bg-2)]"
                    }`}
                  >
                    {tab}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence>
              {filteredTemplates.map((tmpl, i) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  key={tmpl.name}
                  className={`group relative ${i === 0 && activeTemplateTab === "all" ? "sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2" : ""}`}
                >
                  <div
                    className={`glass-card rounded-[24px] overflow-hidden relative shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-[var(--color-border-hover)] hover:border-[var(--color-primary)]/50 ${
                      i === 0 && activeTemplateTab === "all"
                        ? "aspect-auto h-full min-h-[300px] md:min-h-[500px]"
                        : "aspect-[1/1.414]"
                    }`}
                  >
                    {tmpl.badge && (
                      <div className="absolute top-4 left-4 z-20 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full shadow-lg">
                        {tmpl.badge}
                      </div>
                    )}

                    <div
                      className="absolute inset-0 bg-white origin-top-left pointer-events-none p-8"
                      style={{
                        width:
                          i === 0 && activeTemplateTab === "all"
                            ? "120%"
                            : "200%",
                        height:
                          i === 0 && activeTemplateTab === "all"
                            ? "120%"
                            : "200%",
                        transform:
                          i === 0 && activeTemplateTab === "all"
                            ? "scale(0.833)"
                            : "scale(0.5)",
                      }}
                    >
                      <tmpl.component data={data} color="var(--color-primary)" />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[var(--color-bg)]/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-4 transition-all duration-300 p-6 text-center">
                      <h3 className="text-2xl font-bold text-[var(--color-primary-light)] mb-2">
                        {tmpl.name}
                      </h3>
                      <button
                        onClick={() => {
                          if (setCategory) setCategory(tmpl.id);
                          if (setBuilderStep) setBuilderStep("content");
                          setCurrentView("app");
                        }}
                        className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-[var(--color-primary-foreground)] px-6 py-3 rounded-xl font-bold transition-transform hover:scale-105 shadow-[0_4px_20px_var(--color-primary-glow)] w-full max-w-[200px]"
                      >
                        Use Template
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 6. Footer & Final CTA */}
      <footer className="bg-[var(--color-bg-3)] relative overflow-hidden">
        {/* Top 1px gradient line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-50" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] opacity-50 w-1/2 mx-auto" />

        {/* Glow effect at top of footer */}
        <div className="absolute top-0 inset-x-0 h-[100px] bg-gradient-to-b from-[var(--color-primary)]/5 to-transparent pointer-events-none" />

        {/* Upgrade CTA */}
        <div className="border-b border-[var(--color-border)] relative z-10">
          <div className="max-w-4xl mx-auto px-6 py-28 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-[var(--text-main)] mb-6">
              Your next career move <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-accent)]">starts here.</span>
            </h2>
            <p className="text-xl text-[var(--text-muted)] mb-10 max-w-xl mx-auto">
              Stop sending resumes into the void. Build an ATS-optimized, high-converting resume today.
            </p>
            <button
              onClick={() => setCurrentView("app")}
              className="bg-[var(--text-main)] text-[var(--color-bg)] hover:bg-[var(--color-border-hover)] px-10 py-5 rounded-2xl font-black text-lg transition-transform hover:scale-105 shadow-[0_0_40px_var(--color-primary-glow)]"
            >
              Build Resume for Free
            </button>
          </div>
        </div>

        {/* Real Footer Links */}
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 lg:grid-cols-5 gap-8 relative z-10 text-sm md:text-base">
          <div className="col-span-2 lg:col-span-2">
            <div className="text-2xl font-black tracking-tight text-[var(--text-main)] mb-4 flex items-center gap-2">
              <div className="relative overflow-hidden flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-bg-2)] shadow-[0_0_15px_var(--color-primary-glow)] border border-[var(--color-border)]">
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-accent)] opacity-20" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <svg
                  className="relative z-10 w-4 h-4 text-[var(--text-main)]"
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
              <span className="font-heading tracking-tight">Quick<span className="text-gradient">Resume</span></span>
            </div>
            <p className="text-[var(--text-muted)] text-sm max-w-xs mb-8 leading-relaxed">
              The modern standard for building ATS-optimized, beautifully
              designed resumes. Powered by AI.
            </p>

            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Get weekly tips..."
                className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm flex-1 focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-[var(--text-subtle)] min-w-0"
              />
              <button type="submit" disabled={subscribed} className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] px-5 py-3 rounded-xl text-sm font-bold hover:bg-[var(--color-primary-light)] transition-colors whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed">
                {subscribed ? "We'll add this soon!" : "Get Notified Soon"}
              </button>
            </form>

          </div>

          <div>
            <h4 className="text-[var(--text-main)] font-bold mb-6 tracking-wide text-sm uppercase">Product</h4>
            <ul className="space-y-4 text-sm text-[var(--text-muted)]">
              <li>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setCurrentView("app"); }}
                  className="hover:text-[var(--text-main)] transition-colors block"
                >
                  Resume Builder
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setCurrentView("app"); }}
                  className="hover:text-[var(--text-main)] transition-colors block"
                >
                  Cover Letter AI
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentView("app");
                    setTimeout(() => setShowATSModal(true), 100);
                  }}
                  className="hover:text-[var(--text-main)] transition-colors block"
                >
                  ATS Score Check
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--text-main)] font-bold mb-6 tracking-wide text-sm uppercase">Resources</h4>
            <ul className="space-y-4 text-sm text-[var(--text-muted)]">
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[var(--text-main)] transition-colors block">
                  Templates
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[var(--text-main)] transition-colors block">
                  Career Blog
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[var(--text-main)] transition-colors block">
                  Example Resumes
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--text-main)] font-bold mb-6 tracking-wide text-sm uppercase">Legal</h4>
            <ul className="space-y-4 text-sm text-[var(--text-muted)]">
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[var(--text-main)] transition-colors block">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[var(--text-main)] transition-colors block">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[var(--text-main)] transition-colors block">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8 border-t border-[var(--color-border)] text-sm text-[var(--text-subtle)] flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <p>
            © {new Date().getFullYear()} QuickResume <span className="mx-2 opacity-50">·</span> Built with Google Gemini AI
          </p>
          <div className="flex gap-6">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[var(--color-primary-light)] transition-colors text-[var(--text-muted)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[var(--color-primary-light)] transition-colors text-[var(--text-muted)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[var(--color-primary-light)] transition-colors text-[var(--text-muted)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
};
