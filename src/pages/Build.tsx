import React, { FC, useState, useEffect, useRef } from 'react';
import { exportElementToPdf } from '../utils/exportPdf';
import { exportResumeToExcel } from '../utils/exportExcel';
import { Seo } from '../components/Seo';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { 
  Type, Palette, Layout as LayoutIcon, FileText, FileSpreadsheet, Feather, Download, 
  Sparkles, ShieldCheck, History, Settings, Home, Edit3, 
  CheckCircle2, ChevronDown, Trash2, 
  User, Briefcase, GraduationCap, Wrench, Loader2,
  Search, Award, Medal, BookOpen, FlaskConical, HeartHandshake, Link as LinkIcon, Code, Flag, Users, Lightbulb, Eye
} from 'lucide-react';
import toast from 'react-hot-toast';
import Contacts from '../components/steps/Contacts';
import Experience from '../components/steps/Experience';
import Education from '../components/steps/Education';
import Skills from '../components/steps/Skills';
import Summary from '../components/steps/Summary';
import Projects from '../components/steps/Projects';
import Certifications from '../components/steps/Certifications';
import Languages from '../components/steps/Languages';
import LivePreview from '../components/Preview/LivePreview';
import { ChatAssistant } from '../components/ChatAssistant';

type SidebarTab = 'dashboard' | 'builder' | 'text' | 'colors' | 'layout' | 'templates' | 'ai' | 'ats' | 'history' | 'settings' | 'preview';
export type BuilderSection = 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'languages' | 'add_more';

import { ActualResume } from '../components/TemplateCard';
import { ScaledPreview } from '../components/Preview/ScaledPreview';
import { TEMPLATES } from '../data/templates';
import { optimizeWorkExperience, enhanceBulletPoints, generateSummary } from '../services/geminiService';

const customSectionPlaceholder = (title: string): string => {
  const t = title.toLowerCase();
  if (t.includes('award')) return 'Best Employee of the Year — Acme Corp (2024)\nHackathon Winner — DevFest (2023)';
  if (t.includes('publication')) return '"Paper title" — Journal / Conference, Year';
  if (t.includes('research')) return 'Research topic — institution, year. One line on findings.';
  if (t.includes('volunteer')) return 'Role — Organization (2023–Present). What you did and impact.';
  if (t.includes('portfolio')) return 'yourportfolio.com — short note on what it showcases';
  if (t.includes('github')) return 'github.com/username — highlight 1–2 key repositories';
  if (t.includes('reference')) return 'Available on request — or list name, title, contact.';
  return 'Add one point per line…';
};

const Build: FC = () => {
  const navigate = useNavigate();
  const { data, updateSection } = useResume();
  const [activeTab, setActiveTab] = useState<SidebarTab>('builder');
  const [templateCategory, setTemplateCategory] = useState('All');
  const [expandedSection, setExpandedSection] = useState<BuilderSection | null>('personal');
  const [isDownloading, setIsDownloading] = useState(false);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [resumeName, setResumeName] = useState('Untitled Resume');
  const [previewZoom, setPreviewZoom] = useState(100);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentScale = windowWidth < 1024 ? (windowWidth - 32) / 794 : previewZoom / 100;

  // Section completion — drives the progress bar, header ticks,
  // and which section opens first for the user.
  const sectionDone = {
    personal: Boolean(data.personalInfo.firstName && data.personalInfo.email),
    summary: Boolean(data.summary && data.summary.trim().length > 20),
    experience: data.experience.length > 0,
    education: data.education.length > 0,
    skills: data.skills.length >= 3,
  };
  const completion = Math.round(
    (Object.values(sectionDone).filter(Boolean).length / Object.keys(sectionDone).length) * 100
  );

  // On first load, open the first section that still needs attention.
  useEffect(() => {
    const order: BuilderSection[] = ['personal', 'summary', 'experience', 'education', 'skills'];
    const firstIncomplete = order.find(k => !sectionDone[k as keyof typeof sectionDone]);
    if (firstIncomplete) setExpandedSection(firstIncomplete);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOptimizeResume = async () => {
    if (data.experience.length === 0) {
      toast.error('Add some work experience first!');
      return;
    }
    setIsOptimizing(true);
    const toastId = toast.loading('Optimizing work experience with AI...');
    try {
      const optimizedExperience = await optimizeWorkExperience(data.experience);
      updateSection('experience', optimizedExperience);
      toast.success('Resume optimized successfully!', { id: toastId });
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Failed to optimize resume.', { id: toastId });
    } finally {
      setIsOptimizing(false);
    }
  };

  const [aiAction, setAiAction] = useState<'grammar' | 'summary' | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [templateSearch, setTemplateSearch] = useState('');

  const filteredBuilderTemplates = TEMPLATES.filter(t => {
    const matchesCategory = templateCategory === 'All' || t.category === templateCategory;
    const q = templateSearch.trim().toLowerCase();
    const matchesSearch = !q || t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const handleFixGrammar = async () => {
    const bulletsBySection = data.experience.map(e => (e.description || '').split('\n').filter(Boolean));
    const allBullets = bulletsBySection.flat();
    if (allBullets.length === 0 && !data.summary) {
      toast.error('Add a summary or some experience bullets first!');
      return;
    }
    setAiAction('grammar');
    const toastId = toast.loading('Fixing grammar across your resume…');
    try {
      if (allBullets.length > 0) {
        const fixed = await enhanceBulletPoints(allBullets, 'grammar');
        let cursor = 0;
        const updated = data.experience.map((e, i) => {
          const count = bulletsBySection[i].length;
          const mine = fixed.slice(cursor, cursor + count);
          cursor += count;
          return count > 0 ? { ...e, description: mine.join('\n') } : e;
        });
        updateSection('experience', updated);
      }
      if (data.summary) {
        const [fixedSummary] = await enhanceBulletPoints([data.summary], 'grammar');
        if (fixedSummary) updateSection('summary', fixedSummary);
      }
      toast.success('Grammar and typos fixed!', { id: toastId });
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Grammar fix failed. Please try again.', { id: toastId });
    } finally {
      setAiAction(null);
    }
  };

  const handleWriteSummary = async () => {
    if (!data.personalInfo.jobTitle && data.experience.length === 0) {
      toast.error('Add your job title or some experience first!');
      return;
    }
    setAiAction('summary');
    const toastId = toast.loading('Writing your professional summary…');
    try {
      const summary = await generateSummary(data as unknown as Record<string, unknown>);
      updateSection('summary', summary.trim());
      toast.success('Summary written! Review it in the Builder tab.', { id: toastId });
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Could not write summary. Please try again.', { id: toastId });
    } finally {
      setAiAction(null);
    }
  };

  const handlePreviewPdf = async () => {
    const element = printRef.current;
    if (!element) {
      toast.error('Preview not ready yet — please try again in a second.');
      return;
    }
    const toastId = toast.loading('Generating PDF preview…');
    try {
      const url = await exportElementToPdf(element, 'preview.pdf', true);
      if (typeof url === 'string') {
        if (pdfPreviewUrl) URL.revokeObjectURL(pdfPreviewUrl);
        setPdfPreviewUrl(url);
        setShowPdfPreview(true);
      }
      toast.dismiss(toastId);
    } catch (error) {
      console.error('Error generating PDF preview:', error);
      toast.error('Failed to generate PDF preview.', { id: toastId });
    }
  };

  const handleDownloadPDF = async () => {
    const element = printRef.current;
    if (!element) {
      toast.error('Preview not ready yet — please try again in a second.');
      return;
    }

    setIsDownloading(true);
    const toastId = toast.loading('Preparing your PDF…');
    const name = data.personalInfo.firstName ? `${data.personalInfo.firstName}_${data.personalInfo.lastName}` : resumeName;

    try {
      // The exporter captures a clean off-screen clone, so no tab
      // switching or transform overrides are needed here.
      const result = await exportElementToPdf(element, `${name}_Resume.pdf`);
      if (result === 'print-dialog') {
        toast.success("Print dialog opened — choose 'Save as PDF' as the destination.", { id: toastId, duration: 6000 });
      } else {
        toast.success('PDF downloaded!', { id: toastId });
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate PDF.', { id: toastId });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadExcel = () => {
    try {
      exportResumeToExcel(data);
      toast.success('Excel (.xlsx) downloaded!');
    } catch (error) {
      console.error("Error generating Excel:", error);
      toast.error('Failed to generate Excel.');
    }
  };

  const currentScore = 86; // Example score

  return (
    <div className="flex flex-col h-screen h-[100dvh] bg-slate-50 font-sans text-slate-600 overflow-hidden selection:bg-slate-900 selection:text-white">
      <Seo
        path="/build"
        title="Resume Builder | QuickResume"
        description="Build your professional resume with QuickResume's editor — ATS-friendly templates, examples and AI text generation."
        noindex
      />

      <div className="flex flex-1 min-h-0 overflow-hidden relative">
        {/* Extreme Left Sidebar (90px) - Desktop Only */}
        <aside className="w-[90px] bg-white border-r border-slate-200 flex-col items-center py-6 shrink-0 z-20 hidden md:flex">
          <div className="w-10 h-10 bg-pine text-white rounded-xl flex items-center justify-center mb-8 cursor-pointer shadow-lg" onClick={() => navigate('/')}>
            <FileText className="w-5 h-5" />
          </div>

          <div className="flex flex-col gap-2 w-full px-2 mt-2">
            {[
              { id: 'dashboard', icon: Home, label: 'Dashboard' },
              { id: 'builder', icon: Edit3, label: 'Builder' },
              { id: 'text', icon: Type, label: 'Text' },
              { id: 'colors', icon: Palette, label: 'Colors' },
              { id: 'layout', icon: LayoutIcon, label: 'Layout' },
              { id: 'templates', icon: Feather, label: 'Templates' },
              { id: 'div1', divider: true },
              { id: 'ai', icon: Sparkles, label: 'AI Tools' },
              { id: 'ats', icon: ShieldCheck, label: 'ATS' },
              { id: 'div2', divider: true },
              { id: 'history', icon: History, label: 'History' },
              { id: 'settings', icon: Settings, label: 'Settings' }
            ].map((item) => item.divider ? (
              <div key={item.id} className="w-6 h-px bg-white/5 mx-auto my-2" />
            ) : (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as SidebarTab)}
                className={`flex flex-col items-center justify-center py-3 rounded-xl transition-all w-full
                  ${activeTab === item.id 
                    ? 'bg-slate-100 text-pine border border-slate-200 font-bold' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent font-medium'}`}
              >
                {item.icon && React.createElement(item.icon, { className: "w-5 h-5 mb-1.5" })}
                <span className="text-[10px] tracking-wide">{item.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          
          {/* Top Navbar */}
          <header className="h-[64px] bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 shrink-0 z-10">
            <div className="flex items-center gap-2 md:gap-4">
              <input 
                type="text" 
                value={resumeName}
                onChange={(e) => setResumeName(e.target.value)}
                className="text-base md:text-lg text-slate-900 font-bold bg-transparent border-none outline-none focus:ring-1 focus:ring-pine rounded px-2 w-[140px] md:w-[200px]"
              />
              <div className="hidden md:flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Saved
              </div>
            </div>

          <div className="flex items-center justify-center">
             <div className="hidden md:flex items-center w-64">
               <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                 <div className="bg-pine h-full rounded-full transition-all duration-500" style={{ width: `${completion}%` }}></div>
               </div>
               <span className="ml-3 text-[10px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">{completion}% Complete</span>
             </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3 justify-end">
             <div className="hidden lg:flex items-center gap-4 px-4 py-1.5 border border-slate-200 rounded-lg bg-white/5 text-sm font-medium text-slate-600">
               <span>Zoom</span>
               <button onClick={() => setPreviewZoom(z => Math.max(z - 25, 50))} className="text-slate-500 hover:text-slate-900">-</button>
               <span className="w-10 text-center text-slate-900">{previewZoom}%</span>
               <button onClick={() => setPreviewZoom(z => Math.min(z + 25, 150))} className="text-slate-500 hover:text-slate-900">+</button>
             </div>

             <button
                onClick={handlePreviewPdf}
                className="text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors rounded-lg px-4 py-2 flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden xl:inline">Preview PDF</span>
              </button>
            
             <button 
                onClick={handleOptimizeResume}
                disabled={isOptimizing}
                className="text-sm font-bold text-pine bg-white border border-slate-200 hover:bg-slate-50 transition-colors rounded-lg px-4 py-2 flex items-center gap-2"
              >
                {isOptimizing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span className="hidden xl:inline">AI Optimize</span>
              </button>

             <div className="relative group">
                <button 
                  onClick={handleDownloadPDF} 
                  disabled={isDownloading}
                  className="text-sm font-bold text-white bg-pine hover:bg-pine-deep transition-colors rounded-lg px-5 py-2 flex items-center gap-2 shadow-lg shadow-black/10"
                >
                  {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  <span className="hidden sm:inline">Export PDF</span><span className="sm:hidden">Export</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                </button>
                <div className="absolute right-0 top-full pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-30">
                  <div className="bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
                    <button onClick={handleDownloadPDF} disabled={isDownloading}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-pine-tint hover:text-pine-deep transition-colors">
                      <Download className="w-4 h-4" /> Download PDF
                    </button>
                    <button onClick={handleDownloadExcel}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors border-t border-slate-100">
                      <FileSpreadsheet className="w-4 h-4" /> Download Excel
                    </button>
                  </div>
                </div>
             </div>
          </div>
        </header>

        {/* Workspace */}
        <div className="flex flex-1 overflow-hidden min-h-0 bg-slate-50">
          
          {/* Middle Column: Editor Tools */}
          <div className={`${activeTab === 'preview' ? 'hidden' : 'flex'} w-full lg:flex lg:w-[500px] xl:w-[650px] shrink-0 bg-white border-r border-slate-200 overflow-y-auto custom-scrollbar flex-col relative z-0`}>
            {activeTab === 'builder' && (
              <div className="p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Editor Workspace</h2>
                  <p className="text-slate-500 text-sm">Fill in your information to build your professional resume.</p>
                </div>
                
                <div className="space-y-4">
                  {/* Personal Information Accordion */}
                  <div className={`border rounded-xl transition-all overflow-hidden ${expandedSection === 'personal' ? 'border-slate-400 bg-slate-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                    <button 
                      onClick={() => setExpandedSection(expandedSection === 'personal' ? null : 'personal')}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${expandedSection === 'personal' ? 'bg-pine text-white' : 'bg-slate-100 text-slate-500'}`}>
                          <User size={18} />
                        </div>
                        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">Personal Information{sectionDone.personal && <CheckCircle2 size={16} className="text-pine" />}</h3>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${expandedSection === 'personal' ? 'rotate-180 text-pine' : ''}`} />
                    </button>
                    {expandedSection === 'personal' && (
                      <div className="p-5 border-t border-slate-200 bg-white editor-dark-theme">
                        <Contacts />
                      </div>
                    )}
                  </div>

                  {/* Summary Accordion */}
                  <div className={`border rounded-xl transition-all overflow-hidden ${expandedSection === 'summary' ? 'border-slate-400 bg-slate-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                    <button 
                      onClick={() => setExpandedSection(expandedSection === 'summary' ? null : 'summary')}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${expandedSection === 'summary' ? 'bg-pine text-white' : 'bg-slate-100 text-slate-500'}`}>
                          <FileText size={18} />
                        </div>
                        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">Professional Summary{sectionDone.summary && <CheckCircle2 size={16} className="text-pine" />}</h3>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${expandedSection === 'summary' ? 'rotate-180 text-pine' : ''}`} />
                    </button>
                    {expandedSection === 'summary' && (
                      <div className="p-5 border-t border-slate-200 bg-white editor-dark-theme">
                        <Summary />
                      </div>
                    )}
                  </div>

                  {/* Experience Accordion */}
                  <div className={`border rounded-xl transition-all overflow-hidden ${expandedSection === 'experience' ? 'border-slate-400 bg-slate-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                    <button 
                      onClick={() => setExpandedSection(expandedSection === 'experience' ? null : 'experience')}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${expandedSection === 'experience' ? 'bg-pine text-white' : 'bg-slate-100 text-slate-500'}`}>
                          <Briefcase size={18} />
                        </div>
                        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">Work Experience{sectionDone.experience && <CheckCircle2 size={16} className="text-pine" />}</h3>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${expandedSection === 'experience' ? 'rotate-180 text-pine' : ''}`} />
                    </button>
                    {expandedSection === 'experience' && (
                      <div className="p-5 border-t border-slate-200 bg-white editor-dark-theme">
                        <Experience />
                      </div>
                    )}
                  </div>

                  {/* Education Accordion */}
                  <div className={`border rounded-xl transition-all overflow-hidden ${expandedSection === 'education' ? 'border-slate-400 bg-slate-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                    <button 
                      onClick={() => setExpandedSection(expandedSection === 'education' ? null : 'education')}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${expandedSection === 'education' ? 'bg-pine text-white' : 'bg-slate-100 text-slate-500'}`}>
                          <GraduationCap size={18} />
                        </div>
                        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">Education{sectionDone.education && <CheckCircle2 size={16} className="text-pine" />}</h3>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${expandedSection === 'education' ? 'rotate-180 text-pine' : ''}`} />
                    </button>
                    {expandedSection === 'education' && (
                      <div className="p-5 border-t border-slate-200 bg-white editor-dark-theme">
                        <Education />
                      </div>
                    )}
                  </div>

                  {/* Skills Accordion */}
                  <div className={`border rounded-xl transition-all overflow-hidden ${expandedSection === 'skills' ? 'border-slate-400 bg-slate-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                    <button 
                      onClick={() => setExpandedSection(expandedSection === 'skills' ? null : 'skills')}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${expandedSection === 'skills' ? 'bg-pine text-white' : 'bg-slate-100 text-slate-500'}`}>
                          <Wrench size={18} />
                        </div>
                        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">Skills{sectionDone.skills && <CheckCircle2 size={16} className="text-pine" />}</h3>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${expandedSection === 'skills' ? 'rotate-180 text-pine' : ''}`} />
                    </button>
                    {expandedSection === 'skills' && (
                      <div className="p-5 border-t border-slate-200 bg-white editor-dark-theme">
                        <Skills />
                      </div>
                    )}
                  </div>

                  {(data.projects?.length > 0 || expandedSection === 'projects') && (
                    <div className={`border rounded-xl transition-all overflow-hidden ${expandedSection === 'projects' ? 'border-slate-400 bg-slate-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                      <button 
                        onClick={() => setExpandedSection(expandedSection === 'projects' ? null : 'projects')}
                        className="w-full flex items-center justify-between p-5 text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${expandedSection === 'projects' ? 'bg-pine text-white' : 'bg-slate-100 text-slate-500'}`}>
                            <Lightbulb size={18} />
                          </div>
                          <h3 className="font-bold text-base text-slate-900">Projects</h3>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${expandedSection === 'projects' ? 'rotate-180 text-pine' : ''}`} />
                      </button>
                      {expandedSection === 'projects' && (
                        <div className="p-5 border-t border-slate-200 bg-white editor-dark-theme">
                          <Projects />
                        </div>
                      )}
                    </div>
                  )}

                  {(data.certifications?.length > 0 || expandedSection === 'certifications') && (
                    <div className={`border rounded-xl transition-all overflow-hidden ${expandedSection === 'certifications' ? 'border-slate-400 bg-slate-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                      <button 
                        onClick={() => setExpandedSection(expandedSection === 'certifications' ? null : 'certifications')}
                        className="w-full flex items-center justify-between p-5 text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${expandedSection === 'certifications' ? 'bg-pine text-white' : 'bg-slate-100 text-slate-500'}`}>
                            <Award size={18} />
                          </div>
                          <h3 className="font-bold text-base text-slate-900">Certifications</h3>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${expandedSection === 'certifications' ? 'rotate-180 text-pine' : ''}`} />
                      </button>
                      {expandedSection === 'certifications' && (
                        <div className="p-5 border-t border-slate-200 bg-white editor-dark-theme">
                          <Certifications />
                        </div>
                      )}
                    </div>
                  )}

                  {(data.languages?.length > 0 || expandedSection === 'languages') && (
                    <div className={`border rounded-xl transition-all overflow-hidden ${expandedSection === 'languages' ? 'border-slate-400 bg-slate-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                      <button 
                        onClick={() => setExpandedSection(expandedSection === 'languages' ? null : 'languages')}
                        className="w-full flex items-center justify-between p-5 text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${expandedSection === 'languages' ? 'bg-pine text-white' : 'bg-slate-100 text-slate-500'}`}>
                            <Flag size={18} />
                          </div>
                          <h3 className="font-bold text-base text-slate-900">Languages</h3>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${expandedSection === 'languages' ? 'rotate-180 text-pine' : ''}`} />
                      </button>
                      {expandedSection === 'languages' && (
                        <div className="p-5 border-t border-slate-200 bg-white editor-dark-theme">
                          <Languages />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Custom Sections Editor */}
                  {(data.customSections || []).length > 0 && (
                    <div className="pt-2 space-y-4">
                      {(data.customSections || []).map(sec => (
                        <div key={sec.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm group relative">
                          <button
                            onClick={() => updateSection('customSections', (data.customSections || []).filter(x => x.id !== sec.id))}
                            className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50"
                            title={`Remove ${sec.title}`}
                            aria-label={`Remove ${sec.title} section`}
                          >
                            <Trash2 size={16} />
                          </button>
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Section title</label>
                          <input
                            type="text"
                            value={sec.title}
                            onChange={e => updateSection('customSections', (data.customSections || []).map(x => x.id === sec.id ? { ...x, title: e.target.value } : x))}
                            className="w-full mb-3 px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 outline-none focus:border-pine transition-colors pr-10"
                          />
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Content</label>
                          <textarea
                            value={sec.content}
                            onChange={e => updateSection('customSections', (data.customSections || []).map(x => x.id === sec.id ? { ...x, content: e.target.value } : x))}
                            rows={4}
                            placeholder={customSectionPlaceholder(sec.title)}
                            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-pine transition-colors resize-y"
                          />
                          <p className="text-[11px] text-slate-400 mt-1.5">Shows on your resume as soon as you type. Use a new line for each point.</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add More Section */}
                  <div className="pt-6">
                    <h3 className="text-sm font-bold text-slate-900 mb-4 px-2 uppercase tracking-widest text-slate-500">Add Custom Sections</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                       {[
                         { icon: Lightbulb, label: "Projects", key: 'projects' },
                         { icon: Award, label: "Certifications", key: 'certifications' },
                         { icon: Flag, label: "Languages", key: 'languages' },
                         { icon: Medal, label: "Awards" },
                         { icon: BookOpen, label: "Publications" },
                         { icon: FlaskConical, label: "Research" },
                         { icon: HeartHandshake, label: "Volunteer" },
                         { icon: LinkIcon, label: "Portfolio" },
                         { icon: Code, label: "GitHub" },
                         { icon: Users, label: "References" },
                       ].map(sec => {
                         const alreadyAdded = !sec.key && (data.customSections || []).some(x => x.title === sec.label);
                         return (
                         <button 
                           key={sec.label} 
                           onClick={() => {
                             if (sec.key) {
                               setExpandedSection(sec.key as BuilderSection);
                               document.querySelector('.sidebar-content')?.scrollTo({ top: 0, behavior: 'smooth' });
                             } else if (alreadyAdded) {
                               toast(`${sec.label} section is already added — edit it above.`);
                             } else {
                               const newSection = { id: crypto.randomUUID(), title: sec.label, content: '' };
                               updateSection('customSections', [...(data.customSections || []), newSection]);
                               toast.success(`${sec.label} section added! Fill it in above.`);
                             }
                           }}
                           className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-colors group ${alreadyAdded ? 'border-pine bg-pine-tint' : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-pine'}`}
                         >
                           <sec.icon className={`w-5 h-5 ${alreadyAdded ? 'text-pine' : 'text-slate-500 group-hover:text-pine'}`} />
                           <span className={`text-xs font-semibold ${alreadyAdded ? 'text-pine' : 'text-slate-500 group-hover:text-pine'}`}>{sec.label}</span>
                         </button>
                       );})}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* Render Other Sidebar Customizers Here */}
            {activeTab !== 'builder' && (
              <div className="p-8">
                 <h2 className="text-2xl font-black text-slate-900 mb-8 capitalize">{activeTab} Settings</h2>
                 
                 {activeTab === 'ats' && (
                   <div className="space-y-6">
                     <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center flex flex-col items-center">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Resume ATS Score</h3>
                        <div className="text-[64px] font-black text-pine leading-none mb-4">{currentScore}<span className="text-3xl text-slate-400">/100</span></div>
                        <p className="text-slate-600 font-medium">Your resume is highly optimized for Applicant Tracking Systems.</p>
                     </div>

                     <div className="bg-white border text-sm border-slate-200 rounded-2xl p-6">
                        <h4 className="font-bold text-slate-900 mb-4 text-base">Score Breakdown</h4>
                        <ul className="space-y-4">
                          <li className="flex items-start gap-3 text-slate-600">
                            <CheckCircle2 className="w-5 h-5 text-pine shrink-0" />
                            <div><strong className="text-slate-900">Contact Details:</strong> All required fields present.</div>
                          </li>
                          <li className="flex items-start gap-3 text-slate-600">
                            <CheckCircle2 className="w-5 h-5 text-pine shrink-0" />
                            <div><strong className="text-slate-900">Keywords:</strong> High match density for target roles.</div>
                          </li>
                          <li className="flex items-start gap-3 text-slate-600">
                            <CheckCircle2 className="w-5 h-5 text-pine shrink-0" />
                            <div><strong className="text-slate-900">Experience Length:</strong> Sufficient details and dates.</div>
                          </li>
                        </ul>
                     </div>
                   </div>
                 )}

                 {activeTab === 'text' && (
                    <div className="space-y-8">
                      <div>
                        <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Font Family</label>
                        <div className="grid grid-cols-2 gap-3">
                           {['Inter', 'Roboto', 'Arial', 'Times New Roman', 'Georgia', 'Space Grotesk'].map(f => (
                             <button 
                               key={f}
                               onClick={() => updateSection('design', { ...data.design, fontFamily: `"${f}", sans-serif` })}
                               className={`py-3 px-4 rounded-xl border text-left font-medium outline-none ${data.design.fontFamily?.includes(f) ? 'border-pine bg-slate-50 text-pine' : 'border-slate-200 bg-white hover:border-slate-300 text-slate-600'}`}
                               style={{ fontFamily: `"${f}", sans-serif` }}
                             >
                               {f}
                             </button>
                           ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Font Size</label>
                        <input 
                           type="range" min="11" max="18" value={parseInt(data.design.fontSize || '14')} 
                           onChange={(e) => updateSection('design', { ...data.design, fontSize: `${e.target.value}px` })}
                           className="w-full accent-teal-600"
                        />
                        <div className="flex justify-between text-xs font-bold text-slate-500 mt-2 uppercase tracking-widest">
                          <span>Small (11px)</span>
                          <span className="text-slate-900">{parseInt(data.design.fontSize || '14')}px</span>
                          <span>Large (18px)</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Line Height</label>
                        <div className="flex bg-white p-1 rounded-lg border border-slate-200">
                           <button className="flex-1 py-1.5 rounded-md font-medium text-sm bg-white/10 text-slate-900 shadow-sm">Normal</button>
                           <button className="flex-1 py-1.5 rounded-md font-medium text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-50">Relaxed</button>
                           <button className="flex-1 py-1.5 rounded-md font-medium text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-50">Loose</button>
                        </div>
                      </div>
                    </div>
                 )}

                 {activeTab === 'colors' && (
                   <div className="space-y-8">
                     <div>
                       <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Professional Palettes</label>
                       <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                         {[
                           '#000000', '#1F2937', '#475569', '#78716C', '#2563EB', '#1D4ED8', '#4F46E5', '#0284C7',
                           '#0891B2', '#14B8A6', '#0F766E', '#059669', '#16A34A', '#65A30D', '#84CC16', '#CA8A04',
                           '#D97706', '#EA580C', '#DC2626', '#E11D48', '#F43F5E', '#C026D3', '#D946EF', '#9333EA', '#8B5CF6', '#7C3AED'
                         ].map(color => (
                           <button 
                             key={color}
                             onClick={() => updateSection('design', { ...data.design, color })}
                             className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${data.design.color === color ? 'ring-2 ring-offset-2 ring-offset-[#0F0F12] ring-slate-400 shadow-lg scale-110' : 'hover:scale-110 opacity-80 hover:opacity-100 shadow-sm'}`}
                             style={{ backgroundColor: color }}
                           >
                             {data.design.color === color && <CheckCircle2 className="text-white w-5 h-5 drop-shadow-md" />}
                           </button>
                         ))}
                       </div>
                     </div>
                     <div>
                       <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Custom Color HEX</label>
                       <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-2">
                         <input 
                           type="color" 
                           value={data.design.color || '#2563EB'} 
                           onChange={(e) => updateSection('design', { ...data.design, color: e.target.value })}
                           className="w-10 h-10 rounded cursor-pointer border-0 p-0 bg-transparent"
                         />
                         <input 
                           type="text" 
                           value={data.design.color || '#2563EB'}
                           onChange={(e) => updateSection('design', { ...data.design, color: e.target.value })}
                           className="bg-transparent border-none text-slate-900 font-mono text-sm w-full outline-none px-2"
                         />
                       </div>
                     </div>
                   </div>
                 )}

                 {activeTab === 'layout' && (
                   <div className="space-y-8">
                      <div>
                        <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Margins & Spacing</label>
                         <div className="grid grid-cols-3 gap-3 mb-6">
                           <button 
                              onClick={() => updateSection('design', { ...data.design, spacing: 'compact' })}
                              className={`py-3 px-2 rounded-xl border text-center font-bold text-sm ${data.design.spacing === 'compact' ? 'border-pine bg-slate-50 text-pine' : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                             Compact
                           </button>
                           <button 
                              onClick={() => updateSection('design', { ...data.design, spacing: 'normal' })}
                              className={`py-3 px-2 rounded-xl border text-center font-bold text-sm ${data.design.spacing === 'normal' || !data.design.spacing ? 'border-pine bg-slate-50 text-pine' : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                             Normal
                           </button>
                           <button 
                              onClick={() => updateSection('design', { ...data.design, spacing: 'relaxed' })}
                              className={`py-3 px-2 rounded-xl border text-center font-bold text-sm ${data.design.spacing === 'relaxed' ? 'border-pine bg-slate-50 text-pine' : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                             Relaxed
                           </button>
                        </div>
                      </div>
                   </div>
                 )}

                 {activeTab === 'ai' && (
                   <div className="space-y-6">
                     <div className="bg-pine border border-slate-800 rounded-3xl p-8 text-white relative overflow-hidden">
                        <Sparkles className="w-8 h-8 mb-4 text-white relative z-10" />
                        <h3 className="text-2xl font-black mb-2 relative z-10">AI Superpowers</h3>
                        <p className="text-slate-400 mb-8 leading-relaxed relative z-10 text-sm">Deploy advanced AI models to write, format, and perfect your professional narrative.</p>
                        
                        <div className="grid gap-3 relative z-10">
                           <button
                             onClick={handleFixGrammar}
                             disabled={aiAction !== null}
                             className="flex items-center gap-4 bg-slate-900 hover:bg-pine-deep border border-slate-800 px-4 py-4 rounded-xl transition-all font-medium text-sm text-left disabled:opacity-60"
                           >
                             <div className="p-2 bg-white text-pine rounded-lg">
                               {aiAction === 'grammar' ? <Loader2 size={18} className="animate-spin" /> : <Edit3 size={18} />}
                             </div>
                             Fix Grammar & Typos Across Resume
                           </button>
                           <button
                             onClick={handleOptimizeResume}
                             disabled={aiAction !== null || isOptimizing}
                             className="flex items-center gap-4 bg-slate-900 hover:bg-pine-deep border border-slate-800 px-4 py-4 rounded-xl transition-all font-medium text-sm text-left disabled:opacity-60"
                           >
                             <div className="p-2 bg-white text-pine rounded-lg">
                               {isOptimizing ? <Loader2 size={18} className="animate-spin" /> : <Briefcase size={18} />}
                             </div>
                             Generate Better Experience Bullets
                           </button>
                           <button
                             onClick={handleWriteSummary}
                             disabled={aiAction !== null}
                             className="flex items-center gap-4 bg-slate-900 hover:bg-pine-deep border border-slate-800 px-4 py-4 rounded-xl transition-all font-medium text-sm text-left disabled:opacity-60"
                           >
                             <div className="p-2 bg-white text-pine rounded-lg">
                               {aiAction === 'summary' ? <Loader2 size={18} className="animate-spin" /> : <FileText size={18} />}
                             </div>
                             Write Professional Summary
                           </button>
                        </div>
                     </div>
                   </div>
                 )}

                 {activeTab === 'templates' && (
                   <div className="space-y-5 pb-20">
                     <div>
                       <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1">Templates</h2>
                       <p className="text-slate-500 text-sm">Switch anytime — your data adapts instantly. Colors follow your Colors tab choice.</p>
                     </div>

                     <div className="relative">
                       <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                       <input
                         type="text"
                         value={templateSearch}
                         onChange={e => setTemplateSearch(e.target.value)}
                         placeholder="Search templates (e.g. fresher, developer, ATS)…"
                         className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-pine transition-colors"
                       />
                     </div>

                     <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1 sticky top-0 bg-white z-10 py-2">
                       {['All', 'ATS Friendly', 'Professional', 'Modern', 'Minimal', 'Fresher', 'Student', 'Developer', 'Designer', 'Executive', 'Corporate', 'Creative', 'Colorful', 'Marketing', 'Healthcare', 'Finance', 'Teacher', 'Engineering', 'Two Column', 'Infographic', 'Google Docs Style'].map(cat => (
                         <button
                           key={cat}
                           onClick={() => setTemplateCategory(cat)}
                           className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                             templateCategory === cat
                               ? 'bg-ink text-white border-ink'
                               : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                           }`}
                         >
                           {cat}
                         </button>
                       ))}
                     </div>

                     <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                       {filteredBuilderTemplates.length} template{filteredBuilderTemplates.length === 1 ? '' : 's'}
                     </p>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {filteredBuilderTemplates.map((tpl) => (
                         <div
                           key={tpl.id}
                           className="relative group cursor-pointer"
                           style={{ contentVisibility: 'auto', containIntrinsicSize: '340px' } as React.CSSProperties}
                           onClick={() => {
                             updateSection('design', { ...data.design, template: tpl.id });
                             toast.success(`Template switched to ${tpl.name}`);
                           }}
                         >
                           <div className={`border-2 rounded-xl overflow-hidden transition-all bg-white ${data.design.template === tpl.id ? 'border-pine shadow-[0_0_15px_-3px_rgba(0,0,0,0.2)]' : 'border-transparent hover:border-slate-300 opacity-80 hover:opacity-100'}`}>
                              <ScaledPreview>
                                <ActualResume layout={tpl.layout} color={data.design.color || '#3A4FD8'} />
                              </ScaledPreview>
                           </div>
                           {data.design.template === tpl.id && (
                             <div className="absolute top-2 right-2 bg-pine text-white rounded-full p-1 shadow-md">
                               <CheckCircle2 size={16} />
                             </div>
                           )}
                           <div className="mt-2 flex items-center justify-center gap-2">
                             <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{tpl.name}</span>
                             {tpl.category === 'ATS Friendly' && (
                               <span className="text-[9px] font-bold bg-pine-tint text-pine px-1.5 py-0.5 rounded uppercase tracking-wider">ATS</span>
                             )}
                           </div>
                         </div>
                       ))}
                     </div>

                     {filteredBuilderTemplates.length === 0 && (
                       <div className="text-center py-16 text-slate-500 text-sm">
                         No templates match "{templateSearch}". <button className="text-pine font-bold" onClick={() => { setTemplateSearch(''); setTemplateCategory('All'); }}>Clear filters</button>
                       </div>
                     )}
                   </div>
                 )}

              </div>
            )}
          </div>

          {/* Right Column: Live Preview Area (Keep this light mode for real paper look) */}
          <div className={`${activeTab === 'preview' ? 'flex' : 'hidden'} lg:flex flex-1 bg-slate-50 overflow-y-auto overflow-x-hidden p-4 lg:p-10 relative justify-center items-start custom-scrollbar`}>
            {/* Dark background for workspace, but the resume paper stays white */}
                        <div className="w-full h-full flex justify-center items-start">
               <ScaledPreview scale={currentScale}>
                  <div id="resume-preview-container" className="w-full h-full bg-white" style={{ minWidth: "794px", minHeight: "1123px" }}>
                     <LivePreview />
                  </div>
               </ScaledPreview>
            </div>

            {/* Hidden natural-size print node — the PDF exporter captures THIS
                (no transforms, no clipping), so exports can never come out blank. */}
            <div
              aria-hidden="true"
              style={{ position: 'fixed', top: 0, left: '-20000px', width: '794px', background: '#ffffff', zIndex: -1, pointerEvents: 'none', overflow: 'visible' }}
            >
              <div ref={printRef} className="bg-white" style={{ width: '794px', minHeight: '1123px' }}>
                <LivePreview />
              </div>
            </div>

            {/* Floating AI Button on Preview */}
            <button
              onClick={() => setShowChat(true)}
              aria-label="Ask AI Assistant"
              className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-50 bg-pine text-white rounded-full p-4 shadow-xl hover:bg-pine-deep hover:scale-105 transition-all flex items-center gap-2 group border border-slate-700"
            >
              <Sparkles className="w-5 h-5 text-white group-hover:animate-pulse" />
              <span className="font-bold text-sm pr-2 hidden md:inline">Ask AI Assistant</span>
            </button>

            {/* Slide-in AI chat panel */}
            {showChat && (
              <div className="fixed inset-0 z-[60] flex justify-end" role="dialog" aria-label="AI assistant">
                <div className="absolute inset-0 bg-black/30" onClick={() => setShowChat(false)} />
                <div className="relative w-full sm:w-[420px] h-full bg-white shadow-2xl flex flex-col p-4 animate-[slideIn_.2s_ease-out]">
                  <div className="flex items-center justify-between pb-3">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2"><Sparkles className="w-4 h-4 text-pine" /> AI Assistant</h3>
                    <button onClick={() => setShowChat(false)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500" aria-label="Close assistant">✕</button>
                  </div>
                  <div className="flex-1 min-h-0">
                    <ChatAssistant />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      </div>
{/* Mobile Bottom Navigation menu */}
      <div className="md:hidden w-full flex items-center justify-between bg-white border-t border-slate-200 h-[64px] shrink-0 px-2 z-50">
         {[
           { id: 'builder', icon: Edit3, label: 'Builder' },
           { id: 'templates', icon: Feather, label: 'Templates' },
           { id: 'colors', icon: Palette, label: 'Design' },
           { id: 'ai', icon: Sparkles, label: 'AI Tools' },
           { id: 'preview', icon: CheckCircle2, label: 'Preview' },
         ].map((item) => (
           <button
             key={item.id}
             onClick={() => setActiveTab(item.id as SidebarTab)}
             className={`flex flex-col items-center justify-center py-2 flex-1 min-w-[50px] rounded-lg transition-colors
               ${activeTab === item.id 
                 ? 'text-pine font-bold' 
                 : 'text-slate-500 font-medium'}`}
           >
             {item.icon && React.createElement(item.icon, { className: "w-5 h-5 mb-1" })}
             <span className="text-[10px] tracking-wide">{item.label}</span>
           </button>
         ))}
      </div>

      {showPdfPreview && pdfPreviewUrl && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex flex-col backdrop-blur-sm">
          <div className="flex items-center justify-between p-4 bg-white border-b border-slate-200">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-pine" />
              PDF Preview
            </h3>
            <div className="flex items-center gap-2">
              <a 
                href={pdfPreviewUrl} 
                download={`${resumeName || 'Resume'}.pdf`}
                className="flex items-center gap-2 px-4 py-2 bg-pine text-white font-bold text-sm rounded-lg hover:bg-pine-deep transition-colors"
              >
                <Download className="w-4 h-4" /> Download
              </a>
              <button 
                onClick={() => { 
                  setShowPdfPreview(false); 
                  if (pdfPreviewUrl) URL.revokeObjectURL(pdfPreviewUrl);
                  setPdfPreviewUrl(null); 
                }} 
                className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors"
                aria-label="Close Preview"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="flex-1 min-h-0 w-full bg-slate-200 p-4 sm:p-8 flex justify-center overflow-auto custom-scrollbar">
            <object 
              data={`${pdfPreviewUrl}#view=FitH`} 
              type="application/pdf" 
              className="w-full max-w-5xl h-[calc(100vh-100px)] rounded shadow-2xl bg-white"
            >
              <div className="flex items-center justify-center h-full bg-slate-50 text-slate-500 text-sm">
                Your browser does not support embedded PDFs. 
                <a href={pdfPreviewUrl} target="_blank" rel="noreferrer" className="text-pine ml-1 hover:underline">Click here to view it</a>
              </div>
            </object>
          </div>
        </div>
      )}
      </div>
  );
};

export default Build;
