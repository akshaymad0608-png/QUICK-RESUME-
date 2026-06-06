import { FC, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { 
  Type, Palette, Layout as LayoutIcon, FileText, Download, 
  Sparkles, ShieldCheck, History, Settings, Home, Edit3, 
  CheckCircle2, ChevronDown, 
  User, Briefcase, GraduationCap, Wrench, Printer, Loader2
} from 'lucide-react';
import html2pdf from 'html2pdf.js';
import toast from 'react-hot-toast';
import Contacts from '../components/steps/Contacts';
import Experience from '../components/steps/Experience';
import Education from '../components/steps/Education';
import Skills from '../components/steps/Skills';
import Summary from '../components/steps/Summary';
import LivePreview from '../components/Preview/LivePreview';

type SidebarTab = 'dashboard' | 'builder' | 'text' | 'colors' | 'layout' | 'templates' | 'ai' | 'ats' | 'history' | 'settings' | 'preview';
type BuilderSection = 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'add_more';

import { TemplateCard } from '../components/TemplateCard';
import { TEMPLATES } from '../data/templates';

const Build: FC = () => {
  const navigate = useNavigate();
  const { data, updateSection } = useResume();
  const [activeTab, setActiveTab] = useState<SidebarTab>('builder');
  const [expandedSection, setExpandedSection] = useState<BuilderSection | null>('personal');
  const [isDownloading, setIsDownloading] = useState(false);
  const [resumeName, setResumeName] = useState('Untitled Resume');
  const [previewZoom, setPreviewZoom] = useState(100);

  const handleDownloadPDF = () => {
    const element = document.getElementById('resume-preview-container');
    if (!element) return;
    setIsDownloading(true);
    const name = data.personalInfo.firstName ? `${data.personalInfo.firstName}_${data.personalInfo.lastName}` : resumeName;
    html2pdf().set({ 
      margin: 0, 
      filename: `${name}_Resume.pdf`, 
      image: { type: 'jpeg', quality: 0.98 }, 
      html2canvas: { scale: 2, useCORS: true }, 
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } 
    }).from(element).save().then(() => { 
      setIsDownloading(false); 
      toast.success('PDF downloaded successfully!'); 
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const currentScore = 86; // Example score

  return (
    <div className="flex flex-col h-[100dvh] bg-[#F8FAFC] font-sans text-gray-900 overflow-hidden">
      <Helmet>
        <title>Resume Builder | QuickResume</title>
        <meta name="description" content="Build your professional resume for free with QuickResume's easy-to-use editor. Choose from ATS-friendly templates, expert examples, and AI-powered text generation." />
        <meta property="og:title" content="Free Online Resume Builder | QuickResume" />
        <meta property="og:description" content="Create a job-winning resume in minutes with our drag-and-drop builder." />
      </Helmet>

      <div className="flex flex-1 min-h-0 overflow-hidden relative">
        {/* Extreme Left Sidebar (90px) - Desktop Only */}
        <aside className="w-[90px] bg-[#222222] text-white flex-col items-center py-6 shrink-0 z-20 hidden md:flex">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mb-8 cursor-pointer" onClick={() => navigate('/')}>
            <i className="ti ti-file-description text-white text-2xl"></i>
          </div>

          <div className="flex flex-col gap-2 w-full px-2 mt-2">
            {[
              { id: 'dashboard', icon: Home, label: 'Dashboard' },
              { id: 'builder', icon: Edit3, label: 'Builder' },
              { id: 'text', icon: Type, label: 'Text' },
              { id: 'colors', icon: Palette, label: 'Colors' },
              { id: 'layout', icon: LayoutIcon, label: 'Layout' },
              { id: 'templates', icon: FileText, label: 'Templates' },
              { id: 'div1', divider: true },
              { id: 'ai', icon: Sparkles, label: 'AI Tools' },
              { id: 'ats', icon: ShieldCheck, label: 'ATS' },
              { id: 'div2', divider: true },
              { id: 'history', icon: History, label: 'History' },
              { id: 'settings', icon: Settings, label: 'Settings' }
            ].map((item) => item.divider ? (
              <div key={item.id} className="w-8 h-px bg-white/10 mx-auto my-2" />
            ) : (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as SidebarTab)}
                className={`flex flex-col items-center justify-center py-3 rounded-xl transition-all w-full
                  ${activeTab === item.id 
                    ? 'bg-blue-600/20 text-blue-400' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
              >
                <item.icon className="w-5 h-5 mb-1.5" />
                <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          
          {/* Top Navbar */}
          <header className="h-[64px] bg-white border-b border-[#E5E7EB] flex items-center justify-between px-4 md:px-6 shrink-0 z-10">
            <div className="flex items-center gap-2 md:gap-4 flex-1">
              <input 
                type="text" 
                value={resumeName}
                onChange={(e) => setResumeName(e.target.value)}
                className="text-base md:text-lg text-gray-900 font-semibold bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-100 rounded px-1 md:px-2 w-[140px] md:w-[200px]"
              />
              <div className="hidden md:flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Saved
              </div>
            </div>

          <div className="flex items-center justify-center flex-1">
             <div className="hidden md:flex items-center w-64">
               <div className="w-full bg-gray-100 rounded-full h-2">
                 <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
               </div>
               <span className="ml-3 text-xs font-bold text-gray-600 uppercase tracking-widest whitespace-nowrap">75% Complete</span>
             </div>
          </div>

          <div className="flex items-center gap-3 flex-1 justify-end">
             <div className="hidden lg:flex items-center gap-4 px-4 py-1.5 border border-gray-200 rounded-lg bg-gray-50 text-sm font-medium">
               <span>Zoom</span>
               <button onClick={() => setPreviewZoom(z => Math.max(z - 25, 50))} className="text-gray-500 hover:text-black">-</button>
               <span className="w-10 text-center">{previewZoom}%</span>
               <button onClick={() => setPreviewZoom(z => Math.min(z + 25, 150))} className="text-gray-500 hover:text-black">+</button>
             </div>
            
             <button 
                onClick={handlePrint}
                className="text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors rounded-lg px-4 py-2 flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden xl:inline">Print</span>
              </button>

             <div className="relative group">
                <button 
                  onClick={handleDownloadPDF} 
                  disabled={isDownloading}
                  className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm"
                >
                  {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  Download PDF
                </button>
             </div>
          </div>
        </header>

        {/* Workspace */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* Middle Column: Editor Tools */}
          <div className={`${activeTab === 'preview' ? 'hidden' : 'flex'} w-full lg:flex lg:w-[600px] xl:w-[750px] shrink-0 bg-white border-r border-[#E5E7EB] overflow-y-auto custom-scrollbar flex-col relative z-0`}>
            {activeTab === 'builder' && (
              <div className="p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-gray-900 mb-2">Resume Details</h2>
                  <p className="text-gray-500">Fill in your information to build your professional resume.</p>
                </div>
                
                <div className="space-y-4">
                  {/* Personal Information Accordion */}
                  <div className={`border rounded-xl bg-white transition-all overflow-hidden ${expandedSection === 'personal' ? 'border-blue-200 shadow-[0_4px_20px_-4px_rgba(37,99,235,0.1)]' : 'border-gray-200 hover:border-blue-200'}`}>
                    <button 
                      onClick={() => setExpandedSection(expandedSection === 'personal' ? null : 'personal')}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${expandedSection === 'personal' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                          <User size={20} className={expandedSection === 'personal' ? 'fill-blue-100' : ''} />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900">Personal Information</h3>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'personal' ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSection === 'personal' && (
                      <div className="p-5 border-t border-gray-100 bg-gray-50/50">
                        <Contacts />
                      </div>
                    )}
                  </div>

                  {/* Summary Accordion */}
                  <div className={`border rounded-xl bg-white transition-all overflow-hidden ${expandedSection === 'summary' ? 'border-blue-200 shadow-[0_4px_20px_-4px_rgba(37,99,235,0.1)]' : 'border-gray-200 hover:border-blue-200'}`}>
                    <button 
                      onClick={() => setExpandedSection(expandedSection === 'summary' ? null : 'summary')}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${expandedSection === 'summary' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                          <FileText size={20} className={expandedSection === 'summary' ? 'fill-blue-100' : ''} />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900">Professional Summary</h3>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'summary' ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSection === 'summary' && (
                      <div className="p-5 border-t border-gray-100 bg-gray-50/50">
                        <Summary />
                      </div>
                    )}
                  </div>

                  {/* Experience Accordion */}
                  <div className={`border rounded-xl bg-white transition-all overflow-hidden ${expandedSection === 'experience' ? 'border-blue-200 shadow-[0_4px_20px_-4px_rgba(37,99,235,0.1)]' : 'border-gray-200 hover:border-blue-200'}`}>
                    <button 
                      onClick={() => setExpandedSection(expandedSection === 'experience' ? null : 'experience')}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${expandedSection === 'experience' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                          <Briefcase size={20} className={expandedSection === 'experience' ? 'fill-blue-100' : ''} />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900">Work Experience</h3>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'experience' ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSection === 'experience' && (
                      <div className="p-5 border-t border-gray-100 bg-gray-50/50">
                        <Experience />
                      </div>
                    )}
                  </div>

                  {/* Education Accordion */}
                  <div className={`border rounded-xl bg-white transition-all overflow-hidden ${expandedSection === 'education' ? 'border-blue-200 shadow-[0_4px_20px_-4px_rgba(37,99,235,0.1)]' : 'border-gray-200 hover:border-blue-200'}`}>
                    <button 
                      onClick={() => setExpandedSection(expandedSection === 'education' ? null : 'education')}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${expandedSection === 'education' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                          <GraduationCap size={20} className={expandedSection === 'education' ? 'fill-blue-100' : ''} />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900">Education</h3>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'education' ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSection === 'education' && (
                      <div className="p-5 border-t border-gray-100 bg-gray-50/50">
                        <Education />
                      </div>
                    )}
                  </div>

                  {/* Skills Accordion */}
                  <div className={`border rounded-xl bg-white transition-all overflow-hidden ${expandedSection === 'skills' ? 'border-blue-200 shadow-[0_4px_20px_-4px_rgba(37,99,235,0.1)]' : 'border-gray-200 hover:border-blue-200'}`}>
                    <button 
                      onClick={() => setExpandedSection(expandedSection === 'skills' ? null : 'skills')}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${expandedSection === 'skills' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                          <Wrench size={20} className={expandedSection === 'skills' ? 'fill-blue-100' : ''} />
                        </div>
                        <h3 className="font-bold text-lg text-gray-900">Skills</h3>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'skills' ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSection === 'skills' && (
                      <div className="p-5 border-t border-gray-100 bg-gray-50/50">
                        <Skills />
                      </div>
                    )}
                  </div>

                  {/* Add More Section */}
                  <div className="pt-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 px-2">Add More Sections</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                       {[
                         { icon: "ti-certificate", label: "Certifications" },
                         { icon: "ti-medal", label: "Awards" },
                         { icon: "ti-book", label: "Publications" },
                         { icon: "ti-flask", label: "Research" },
                         { icon: "ti-heart-handshake", label: "Volunteer" },
                         { icon: "ti-link", label: "Portfolio" },
                         { icon: "ti-code", label: "GitHub" },
                         { icon: "ti-flag", label: "Languages" },
                         { icon: "ti-users", label: "References" },
                         { icon: "ti-bulb", label: "Projects" },
                       ].map(sec => (
                         <button key={sec.label} className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-blue-200 hover:text-blue-600 transition-colors group">
                           <i className={`ti ${sec.icon} text-2xl text-gray-400 group-hover:text-blue-500`}></i>
                           <span className="text-xs font-semibold text-gray-600 group-hover:text-blue-600">{sec.label}</span>
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
                 <h2 className="text-3xl font-black text-gray-900 mb-8 capitalize">{activeTab} Settings</h2>
                 
                 {activeTab === 'ats' && (
                   <div className="space-y-6">
                     <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center flex flex-col items-center">
                        <h3 className="text-lg font-bold text-emerald-900 mb-2">Resume ATS Score</h3>
                        <div className="text-[64px] font-black text-emerald-600 leading-none mb-4">{currentScore}<span className="text-3xl text-emerald-400">/100</span></div>
                        <p className="text-emerald-700 font-medium">Your resume is highly optimized for Applicant Tracking Systems.</p>
                     </div>

                     <div className="bg-white border text-sm border-gray-200 rounded-2xl p-6">
                        <h4 className="font-bold text-gray-900 mb-4 text-base">Score Breakdown</h4>
                        <ul className="space-y-4">
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                            <div><strong className="text-gray-900">Contact Details:</strong> All required fields present.</div>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                            <div><strong className="text-gray-900">Keywords:</strong> High match density for target roles.</div>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                            <div><strong className="text-gray-900">Experience Length:</strong> Sufficient details and dates.</div>
                          </li>
                        </ul>
                     </div>

                     <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 text-sm">
                       <h4 className="font-bold text-orange-900 mb-2 text-base">Suggestions for 100%</h4>
                       <ul className="list-disc pl-5 text-orange-800 space-y-1">
                         <li>Add more measurable achievements (metrics, numbers).</li>
                         <li>Include links to live portfolio projects.</li>
                       </ul>
                     </div>
                   </div>
                 )}

                 {activeTab === 'text' && (
                    <div className="space-y-8">
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-3">Font Family</label>
                        <div className="grid grid-cols-2 gap-3">
                           {['Inter', 'Roboto', 'Arial', 'Times New Roman', 'Georgia', 'Space Grotesk'].map(f => (
                             <button 
                               key={f}
                               onClick={() => updateSection('design', { ...data.design, fontFamily: `"${f}", sans-serif` })}
                               className={`py-3 px-4 rounded-xl border text-left font-medium outline-none ${data.design.fontFamily?.includes(f) ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600' : 'border-gray-200 hover:border-gray-300'}`}
                               style={{ fontFamily: `"${f}", sans-serif` }}
                             >
                               {f}
                             </button>
                           ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-3">Font Size</label>
                        <input 
                           type="range" min="11" max="18" value={parseInt(data.design.fontSize || '14')} 
                           onChange={(e) => updateSection('design', { ...data.design, fontSize: `${e.target.value}px` })}
                           className="w-full accent-blue-600"
                        />
                        <div className="flex justify-between text-xs font-bold text-gray-400 mt-2 uppercase">
                          <span>Small (11px)</span>
                          <span>{parseInt(data.design.fontSize || '14')}px</span>
                          <span>Large (18px)</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-3">Line Height</label>
                        <div className="flex bg-gray-100 p-1 rounded-lg">
                           <button className="flex-1 py-1.5 rounded-md font-medium text-sm bg-white shadow-sm text-gray-900">Normal</button>
                           <button className="flex-1 py-1.5 rounded-md font-medium text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50">Relaxed</button>
                           <button className="flex-1 py-1.5 rounded-md font-medium text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50">Loose</button>
                        </div>
                      </div>
                    </div>
                 )}

                 {activeTab === 'colors' && (
                   <div className="space-y-8">
                     <div>
                       <label className="block text-sm font-bold text-gray-900 mb-4">Professional Palettes</label>
                       <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                         {[
                           '#000000', '#1F2937', '#2563EB', '#1D4ED8', '#0284C7',
                           '#0F766E', '#16A34A', '#65A30D', '#CA8A04', '#D97706',
                           '#EA580C', '#DC2626', '#E11D48', '#C026D3', '#9333EA', '#7C3AED'
                         ].map(color => (
                           <button 
                             key={color}
                             onClick={() => updateSection('design', { ...data.design, color })}
                             className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${data.design.color === color ? 'bg-white ring-4 ring-offset-2 ring-gray-900 shadow-md scale-110' : 'hover:scale-110 shadow-sm'}`}
                             style={{ backgroundColor: color }}
                           >
                             {data.design.color === color && <CheckCircle2 className="text-white w-6 h-6" />}
                           </button>
                         ))}
                       </div>
                     </div>
                     <div>
                       <label className="block text-sm font-bold text-gray-900 mb-3">Custom Color</label>
                       <div className="flex items-center gap-4">
                         <input 
                           type="color" 
                           value={data.design.color || '#2563EB'} 
                           onChange={(e) => updateSection('design', { ...data.design, color: e.target.value })}
                           className="w-16 h-16 rounded cursor-pointer border-0 p-0"
                         />
                         <input 
                           type="text" 
                           value={data.design.color || '#2563EB'}
                           onChange={(e) => updateSection('design', { ...data.design, color: e.target.value })}
                           className="border border-gray-200 rounded-lg px-4 py-3 font-mono text-sm w-32"
                         />
                       </div>
                     </div>
                   </div>
                 )}

                 {activeTab === 'layout' && (
                   <div className="space-y-8">
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-3">Margins & Spacing</label>
                        <div className="grid grid-cols-3 gap-3 mb-6">
                           <button 
                              onClick={() => updateSection('design', { ...data.design, spacing: 'compact' })}
                              className={`py-3 px-2 rounded-xl border text-center font-bold text-sm ${data.design.spacing === 'compact' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:bg-gray-50'}`}>
                             Compact
                           </button>
                           <button 
                              onClick={() => updateSection('design', { ...data.design, spacing: 'normal' })}
                              className={`py-3 px-2 rounded-xl border text-center font-bold text-sm ${data.design.spacing === 'normal' || !data.design.spacing ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:bg-gray-50'}`}>
                             Normal
                           </button>
                           <button 
                              onClick={() => updateSection('design', { ...data.design, spacing: 'relaxed' })}
                              className={`py-3 px-2 rounded-xl border text-center font-bold text-sm ${data.design.spacing === 'relaxed' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:bg-gray-50'}`}>
                             Relaxed
                           </button>
                        </div>
                      </div>

                      <div>
                         <label className="block text-sm font-bold text-gray-900 mb-3">Arrangement Format</label>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-[1/1.2] border-2 border-gray-900 rounded-xl bg-gray-50 flex overflow-hidden cursor-pointer relative">
                               <div className="absolute top-2 left-2 bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded">Selected</div>
                               <div className="w-full p-4 flex flex-col gap-2">
                                 <div className="w-2/3 h-4 bg-gray-300 rounded mb-2"></div>
                                 <div className="w-full h-2 bg-gray-200 rounded"></div>
                                 <div className="w-5/6 h-2 bg-gray-200 rounded"></div>
                                 <div className="w-4/5 h-2 bg-gray-200 rounded"></div>
                               </div>
                            </div>
                            <div className="aspect-[1/1.2] border-2 border-transparent hover:border-gray-300 rounded-xl bg-gray-100 flex overflow-hidden cursor-pointer">
                               <div className="w-1/3 bg-gray-200 p-2 border-r border-gray-300"></div>
                               <div className="w-2/3 p-4 flex flex-col gap-2">
                                 <div className="w-2/3 h-4 bg-gray-300 rounded mb-2"></div>
                                 <div className="w-full h-2 bg-gray-200 rounded"></div>
                                 <div className="w-5/6 h-2 bg-gray-200 rounded"></div>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                 )}

                 {activeTab === 'ai' && (
                   <div className="space-y-6">
                     <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
                        <Sparkles className="w-8 h-8 mb-4 text-purple-200" />
                        <h3 className="text-2xl font-black mb-2">AI Resume Assistant</h3>
                        <p className="text-purple-100 mb-6 leading-relaxed">Let artificial intelligence perfect your resume. Select a section to rewrite, generate bullet points, or correct grammar issues.</p>
                        
                        <div className="grid gap-3">
                           <button className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-colors font-medium text-sm text-left">
                             <div className="p-2 bg-white/10 rounded-lg"><Edit3 size={16} /></div>
                             Fix Grammar & Typos Across Resume
                           </button>
                           <button className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-colors font-medium text-sm text-left">
                             <div className="p-2 bg-white/10 rounded-lg"><Briefcase size={16} /></div>
                             Generate Better Experience Bullets
                           </button>
                           <button className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-colors font-medium text-sm text-left">
                             <div className="p-2 bg-white/10 rounded-lg"><FileText size={16} /></div>
                             Write Professional Summary
                           </button>
                           <button className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-colors font-medium text-sm text-left">
                             <div className="p-2 bg-white/10 rounded-lg"><Wrench size={16} /></div>
                             Suggest Missing Industry Skills
                           </button>
                        </div>
                     </div>
                   </div>
                 )}

                 {activeTab === 'templates' && (
                   <div className="space-y-6 pb-20">
                     <p className="text-gray-500 mb-6">Switch your template on the fly without losing any data.</p>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {TEMPLATES.map((tpl) => (
                         <div key={tpl.id} className="relative group cursor-pointer" onClick={() => updateSection('design', { ...data.design, template: tpl.id })}>
                           <div className={`border-2 rounded-xl overflow-hidden transition-all ${data.design.template === tpl.id ? 'border-blue-600 ring-2 ring-blue-100 shadow-md' : 'border-gray-200 hover:border-gray-400'}`}>
                              <div className="pointer-events-none scale-[0.5] origin-top-left w-[200%] h-[450px]">
                                <TemplateCard template={tpl} />
                              </div>
                           </div>
                           {data.design.template === tpl.id && (
                             <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1 shadow-md">
                               <CheckCircle2 size={16} />
                             </div>
                           )}
                           <div className="mt-2 text-center text-xs font-bold text-gray-700">{tpl.name}</div>
                         </div>
                       ))}
                     </div>
                   </div>
                 )}

              </div>
            )}
          </div>

          {/* Right Column: Live Preview Area */}
          <div className={`${activeTab === 'preview' ? 'flex' : 'hidden'} lg:flex flex-1 bg-gray-300 overflow-y-auto overflow-x-hidden p-4 lg:p-10 relative justify-center items-start custom-scrollbar`}>
            <div 
              className="bg-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] origin-top mx-auto" 
              id="resume-preview-container"
              style={{ 
                transform: `scale(${typeof window !== 'undefined' && window.innerWidth < 1024 ? (window.innerWidth / 850) : (previewZoom / 100)})`, 
                width: '794px', 
                height: '1123px', 
                transition: 'transform 0.2s cubic-bezier(0.25,0.46,0.45,0.94)' 
              }}
            >
               <LivePreview />
            </div>

            {/* Floating AI Button on Preview */}
            <button className="fixed bottom-8 right-8 z-50 bg-gray-900 text-white rounded-full p-4 shadow-2xl hover:bg-gray-800 transition-colors flex items-center gap-2 group">
              <Sparkles className="w-5 h-5 text-purple-400 group-hover:animate-pulse" />
              <span className="font-bold text-sm pr-2">Ask AI Assistant</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation menu */}
      <div className="md:hidden flex items-center justify-around bg-white border-t border-gray-200 h-[64px] shrink-0 px-2 space-x-1 z-50 overflow-x-auto">
         {[
           { id: 'builder', icon: Edit3, label: 'Builder' },
           { id: 'templates', icon: FileText, label: 'Templates' },
           { id: 'colors', icon: Palette, label: 'Design' },
           { id: 'ai', icon: Sparkles, label: 'AI Tools' },
           { id: 'preview', icon: CheckCircle2, label: 'Preview' },
         ].map((item) => (
           <button
             key={item.id}
             onClick={() => setActiveTab(item.id as SidebarTab)}
             className={`flex flex-col items-center justify-center py-2 flex-1 min-w-[64px] rounded-lg transition-colors
               ${activeTab === item.id 
                 ? 'text-blue-600 font-bold' 
                 : 'text-gray-500 font-medium'}`}
           >
             <item.icon className="w-5 h-5 mb-1" />
             <span className="text-[10px] tracking-wide">{item.label}</span>
           </button>
         ))}
      </div>
      </div>
    </div>
  );
};

export default Build;

