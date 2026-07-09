import React, { FC, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { 
  Type, Palette, Layout as LayoutIcon, FileText, Feather, Download, 
  Sparkles, ShieldCheck, History, Settings, Home, Edit3, 
  CheckCircle2, ChevronDown, 
  User, Briefcase, GraduationCap, Wrench, Loader2,
  Award, Medal, BookOpen, FlaskConical, HeartHandshake, Link as LinkIcon, Code, Flag, Users, Lightbulb
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
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

type SidebarTab = 'dashboard' | 'builder' | 'text' | 'colors' | 'layout' | 'templates' | 'ai' | 'ats' | 'history' | 'settings' | 'preview';
type BuilderSection = 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'languages' | 'add_more';

import { TemplateCard } from '../components/TemplateCard';
import { TEMPLATES } from '../data/templates';
import { optimizeWorkExperience } from '../services/geminiService';

const Build: FC = () => {
  const navigate = useNavigate();
  const { data, updateSection } = useResume();
  const [activeTab, setActiveTab] = useState<SidebarTab>('builder');
  const [expandedSection, setExpandedSection] = useState<BuilderSection | null>('personal');
  const [isDownloading, setIsDownloading] = useState(false);
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

  const handleDownloadPDF = async () => {
    const element = document.getElementById('resume-preview-container');
    if (!element) return;
    setIsDownloading(true);
    const name = data.personalInfo.firstName ? `${data.personalInfo.firstName}_${data.personalInfo.lastName}` : resumeName;
    
    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${name}_Resume.pdf`);
      
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error('Failed to generate PDF.');
    } finally {
      setIsDownloading(false);
    }
  };

  const currentScore = 86; // Example score

  return (
    <div className="flex flex-col h-[100dvh] bg-slate-50 font-sans text-slate-600 overflow-hidden selection:bg-slate-900 selection:text-white">
      <Helmet>
        <title>Resume Builder | QuickResume</title>
        <meta name="description" content="Build your professional resume for free with QuickResume's easy-to-use editor. Choose from ATS-friendly templates, expert examples, and AI-powered text generation." />
      </Helmet>

      <div className="flex flex-1 min-h-0 overflow-hidden relative">
        {/* Extreme Left Sidebar (90px) - Desktop Only */}
        <aside className="w-[90px] bg-white border-r border-slate-200 flex-col items-center py-6 shrink-0 z-20 hidden md:flex">
          <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center mb-8 cursor-pointer shadow-lg" onClick={() => navigate('/')}>
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
                    ? 'bg-slate-100 text-indigo-600 border border-slate-200 font-bold' 
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
            <div className="flex items-center gap-2 md:gap-4 flex-1">
              <input 
                type="text" 
                value={resumeName}
                onChange={(e) => setResumeName(e.target.value)}
                className="text-base md:text-lg text-slate-900 font-bold bg-transparent border-none outline-none focus:ring-1 focus:ring-indigo-600 rounded px-2 w-[140px] md:w-[200px]"
              />
              <div className="hidden md:flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Saved
              </div>
            </div>

          <div className="flex items-center justify-center flex-1">
             <div className="hidden md:flex items-center w-64">
               <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                 <div className="bg-indigo-600 h-full rounded-full" style={{ width: '75%' }}></div>
               </div>
               <span className="ml-3 text-[10px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">75% Complete</span>
             </div>
          </div>

          <div className="flex items-center gap-3 flex-1 justify-end">
             <div className="hidden lg:flex items-center gap-4 px-4 py-1.5 border border-slate-200 rounded-lg bg-white/5 text-sm font-medium text-slate-600">
               <span>Zoom</span>
               <button onClick={() => setPreviewZoom(z => Math.max(z - 25, 50))} className="text-slate-500 hover:text-slate-900">-</button>
               <span className="w-10 text-center text-slate-900">{previewZoom}%</span>
               <button onClick={() => setPreviewZoom(z => Math.min(z + 25, 150))} className="text-slate-500 hover:text-slate-900">+</button>
             </div>
            
             <button 
                onClick={handleOptimizeResume}
                disabled={isOptimizing}
                className="text-sm font-bold text-indigo-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors rounded-lg px-4 py-2 flex items-center gap-2"
              >
                {isOptimizing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span className="hidden xl:inline">AI Optimize</span>
              </button>

             <div className="relative group">
                <button 
                  onClick={handleDownloadPDF} 
                  disabled={isDownloading}
                  className="text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-lg px-5 py-2 flex items-center gap-2 shadow-lg shadow-black/10"
                >
                  {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  <span className="hidden sm:inline">Export PDF</span><span className="sm:hidden">Export</span>
                </button>
             </div>
          </div>
        </header>

        {/* Workspace */}
        <div className="flex flex-1 overflow-hidden bg-slate-50">
          
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
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${expandedSection === 'personal' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                          <User size={18} />
                        </div>
                        <h3 className="font-bold text-base text-slate-900">Personal Information</h3>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${expandedSection === 'personal' ? 'rotate-180 text-indigo-600' : ''}`} />
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
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${expandedSection === 'summary' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                          <FileText size={18} />
                        </div>
                        <h3 className="font-bold text-base text-slate-900">Professional Summary</h3>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${expandedSection === 'summary' ? 'rotate-180 text-indigo-600' : ''}`} />
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
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${expandedSection === 'experience' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                          <Briefcase size={18} />
                        </div>
                        <h3 className="font-bold text-base text-slate-900">Work Experience</h3>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${expandedSection === 'experience' ? 'rotate-180 text-indigo-600' : ''}`} />
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
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${expandedSection === 'education' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                          <GraduationCap size={18} />
                        </div>
                        <h3 className="font-bold text-base text-slate-900">Education</h3>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${expandedSection === 'education' ? 'rotate-180 text-indigo-600' : ''}`} />
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
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${expandedSection === 'skills' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                          <Wrench size={18} />
                        </div>
                        <h3 className="font-bold text-base text-slate-900">Skills</h3>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${expandedSection === 'skills' ? 'rotate-180 text-indigo-600' : ''}`} />
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
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${expandedSection === 'projects' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                            <Lightbulb size={18} />
                          </div>
                          <h3 className="font-bold text-base text-slate-900">Projects</h3>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${expandedSection === 'projects' ? 'rotate-180 text-indigo-600' : ''}`} />
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
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${expandedSection === 'certifications' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                            <Award size={18} />
                          </div>
                          <h3 className="font-bold text-base text-slate-900">Certifications</h3>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${expandedSection === 'certifications' ? 'rotate-180 text-indigo-600' : ''}`} />
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
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${expandedSection === 'languages' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                            <Flag size={18} />
                          </div>
                          <h3 className="font-bold text-base text-slate-900">Languages</h3>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${expandedSection === 'languages' ? 'rotate-180 text-indigo-600' : ''}`} />
                      </button>
                      {expandedSection === 'languages' && (
                        <div className="p-5 border-t border-slate-200 bg-white editor-dark-theme">
                          <Languages />
                        </div>
                      )}
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
                       ].map(sec => (
                         <button 
                           key={sec.label} 
                           onClick={() => {
                             if (sec.key) {
                               setExpandedSection(sec.key as BuilderSection);
                               // scroll to top of sidebar slightly
                               document.querySelector('.sidebar-content')?.scrollTo({ top: 0, behavior: 'smooth' });
                             } else {
                               toast.error(`${sec.label} section coming soon!`);
                             }
                           }}
                           className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-indigo-600 transition-colors group"
                         >
                           <sec.icon className="w-5 h-5 text-slate-500 group-hover:text-indigo-600" />
                           <span className="text-xs font-semibold text-slate-500 group-hover:text-indigo-600">{sec.label}</span>
                         </button>
                       ))}
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
                        <div className="text-[64px] font-black text-indigo-600 leading-none mb-4">{currentScore}<span className="text-3xl text-slate-400">/100</span></div>
                        <p className="text-slate-600 font-medium">Your resume is highly optimized for Applicant Tracking Systems.</p>
                     </div>

                     <div className="bg-white border text-sm border-slate-200 rounded-2xl p-6">
                        <h4 className="font-bold text-slate-900 mb-4 text-base">Score Breakdown</h4>
                        <ul className="space-y-4">
                          <li className="flex items-start gap-3 text-slate-600">
                            <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                            <div><strong className="text-slate-900">Contact Details:</strong> All required fields present.</div>
                          </li>
                          <li className="flex items-start gap-3 text-slate-600">
                            <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                            <div><strong className="text-slate-900">Keywords:</strong> High match density for target roles.</div>
                          </li>
                          <li className="flex items-start gap-3 text-slate-600">
                            <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
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
                               className={`py-3 px-4 rounded-xl border text-left font-medium outline-none ${data.design.fontFamily?.includes(f) ? 'border-indigo-600 bg-slate-50 text-indigo-600' : 'border-slate-200 bg-white hover:border-slate-300 text-slate-600'}`}
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
                           className="w-full accent-indigo-600"
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
                              className={`py-3 px-2 rounded-xl border text-center font-bold text-sm ${data.design.spacing === 'compact' ? 'border-indigo-600 bg-slate-50 text-indigo-600' : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                             Compact
                           </button>
                           <button 
                              onClick={() => updateSection('design', { ...data.design, spacing: 'normal' })}
                              className={`py-3 px-2 rounded-xl border text-center font-bold text-sm ${data.design.spacing === 'normal' || !data.design.spacing ? 'border-indigo-600 bg-slate-50 text-indigo-600' : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                             Normal
                           </button>
                           <button 
                              onClick={() => updateSection('design', { ...data.design, spacing: 'relaxed' })}
                              className={`py-3 px-2 rounded-xl border text-center font-bold text-sm ${data.design.spacing === 'relaxed' ? 'border-indigo-600 bg-slate-50 text-indigo-600' : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                             Relaxed
                           </button>
                        </div>
                      </div>
                   </div>
                 )}

                 {activeTab === 'ai' && (
                   <div className="space-y-6">
                     <div className="bg-indigo-600 border border-slate-800 rounded-3xl p-8 text-white relative overflow-hidden">
                        <Sparkles className="w-8 h-8 mb-4 text-white relative z-10" />
                        <h3 className="text-2xl font-black mb-2 relative z-10">AI Superpowers</h3>
                        <p className="text-slate-400 mb-8 leading-relaxed relative z-10 text-sm">Deploy advanced AI models to write, format, and perfect your professional narrative.</p>
                        
                        <div className="grid gap-3 relative z-10">
                           <button className="flex items-center gap-4 bg-slate-900 hover:bg-indigo-700 border border-slate-800 px-4 py-4 rounded-xl transition-all font-medium text-sm text-left">
                             <div className="p-2 bg-white text-indigo-600 rounded-lg"><Edit3 size={18} /></div>
                             Fix Grammar & Typos Across Resume
                           </button>
                           <button className="flex items-center gap-4 bg-slate-900 hover:bg-indigo-700 border border-slate-800 px-4 py-4 rounded-xl transition-all font-medium text-sm text-left">
                             <div className="p-2 bg-white text-indigo-600 rounded-lg"><Briefcase size={18} /></div>
                             Generate Better Experience Bullets
                           </button>
                           <button className="flex items-center gap-4 bg-slate-900 hover:bg-indigo-700 border border-slate-800 px-4 py-4 rounded-xl transition-all font-medium text-sm text-left">
                             <div className="p-2 bg-white text-indigo-600 rounded-lg"><FileText size={18} /></div>
                             Write Professional Summary
                           </button>
                        </div>
                     </div>
                   </div>
                 )}

                 {activeTab === 'templates' && (
                   <div className="space-y-6 pb-20">
                     <p className="text-slate-500 text-sm mb-6">Switch your template on the fly. Your data will adapt instantly.</p>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {TEMPLATES.map((tpl) => (
                         <div key={tpl.id} className="relative group cursor-pointer" onClick={() => updateSection('design', { ...data.design, template: tpl.id })}>
                           <div className={`border-2 rounded-xl overflow-hidden transition-all bg-white ${data.design.template === tpl.id ? 'border-indigo-600 shadow-[0_0_15px_-3px_rgba(0,0,0,0.2)]' : 'border-transparent hover:border-slate-300 opacity-70 hover:opacity-100'}`}>
                              <div className="pointer-events-none scale-[0.5] origin-top-left w-[200%] h-[450px]">
                                <TemplateCard template={tpl} />
                              </div>
                           </div>
                           {data.design.template === tpl.id && (
                             <div className="absolute top-2 right-2 bg-indigo-600 text-white rounded-full p-1 shadow-md">
                               <CheckCircle2 size={16} />
                             </div>
                           )}
                           <div className="mt-3 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">{tpl.name}</div>
                         </div>
                       ))}
                     </div>
                   </div>
                 )}

              </div>
            )}
          </div>

          {/* Right Column: Live Preview Area (Keep this light mode for real paper look) */}
          <div className={`${activeTab === 'preview' ? 'flex' : 'hidden'} lg:flex flex-1 bg-slate-50 overflow-y-auto overflow-x-hidden p-4 lg:p-10 relative justify-center items-start custom-scrollbar`}>
            {/* Dark background for workspace, but the resume paper stays white */}
            <div style={{ width: 794 * currentScale, height: 1123 * currentScale }} className="mx-auto shrink-0 relative">
              <div 
                className="bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] origin-top-left absolute top-0 left-0" 
                id="resume-preview-container"
                style={{ 
                  transform: `scale(${currentScale})`, 
                  width: '794px', 
                  height: '1123px', 
                  transition: 'transform 0.2s cubic-bezier(0.25,0.46,0.45,0.94)' 
                }}
              >
                 <LivePreview />
              </div>
            </div>

            {/* Floating AI Button on Preview */}
            <button className="fixed bottom-8 right-8 z-50 bg-indigo-600 text-white rounded-full p-4 shadow-xl hover:bg-indigo-700 hover:scale-105 transition-all flex items-center gap-2 group border border-slate-700">
              <Sparkles className="w-5 h-5 text-white group-hover:animate-pulse" />
              <span className="font-bold text-sm pr-2">Ask AI Assistant</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation menu */}
      <div className="md:hidden flex items-center justify-around bg-white border-t border-slate-200 h-[64px] shrink-0 px-2 space-x-1 z-50 overflow-x-auto">
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
             className={`flex flex-col items-center justify-center py-2 flex-1 min-w-[64px] rounded-lg transition-colors
               ${activeTab === item.id 
                 ? 'text-indigo-600 font-bold' 
                 : 'text-slate-500 font-medium'}`}
           >
             {item.icon && React.createElement(item.icon, { className: "w-5 h-5 mb-1" })}
             <span className="text-[10px] tracking-wide">{item.label}</span>
           </button>
         ))}
      </div>
      </div>
    </div>
  );
};

export default Build;
