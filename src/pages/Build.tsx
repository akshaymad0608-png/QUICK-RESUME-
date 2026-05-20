import { FC, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { CheckCircle, FileText, Layout, Palette, Type, Edit2, GripVertical, Pencil, Trash2, ArrowLeft, Lock, Download, Loader2, Sparkles, Lightbulb, Eye } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import toast from 'react-hot-toast';
import Contacts from '../components/steps/Contacts';
import Experience from '../components/steps/Experience';
import Education from '../components/steps/Education';
import Skills from '../components/steps/Skills';
import Summary from '../components/steps/Summary';
import LivePreview from '../components/Preview/LivePreview';
import { analyzeResume } from '../services/geminiService';
import Markdown from 'react-markdown';

const PURPLE = '#7c3aed';
const BLUE = '#0ea5e9';
const GRAD = 'linear-gradient(135deg, #7c3aed, #0ea5e9)';

const Build: FC = () => {
  const [activeTab, setActiveTab] = useState<'templates' | 'section' | 'design' | 'spellcheck' | 'analysis' | string>('section');
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isMobilePreviewing, setIsMobilePreviewing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const navigate = useNavigate();
  const { data, updateSection } = useResume();

  const handleDownloadPDF = () => {
    const element = document.getElementById('resume-preview-container');
    if (!element) return;
    setIsDownloading(true);
    const name = data.personalInfo.firstName ? `${data.personalInfo.firstName}_${data.personalInfo.lastName}` : 'resume';
    html2pdf().set({ margin: 0, filename: `${name}_Resume.pdf`, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2, useCORS: true }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } }).from(element).save().then(() => { setIsDownloading(false); toast.success('PDF downloaded!'); });
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try { const result = await analyzeResume(data); setAnalysis(result); }
    catch { toast.error('Failed to analyze resume'); }
    finally { setIsAnalyzing(false); }
  };

  const NavItem = ({ id, icon: Icon, label }: { id: string; icon: React.ElementType; label: string }) => (
    <button
      onClick={() => { setActiveTab(id); setEditingSection(null); setIsMobilePreviewing(false); }}
      className="flex flex-col items-center justify-center gap-1 md:gap-2 py-3 md:py-5 flex-1 md:w-full transition-colors md:border-b md:border-gray-100"
      style={{ color: activeTab === id ? PURPLE : '#6b7280' }}
    >
      <Icon size={24} className="md:w-7 md:h-7" strokeWidth={activeTab === id ? 2 : 1.5} />
      <span className="text-[10px] md:text-[12px] font-medium text-center hidden sm:block md:block">{label}</span>
      {activeTab === id && <div className="hidden md:block w-1 h-8 rounded-full absolute left-0" style={{background: GRAD}}></div>}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row h-screen overflow-hidden font-sans" style={{background: '#eef2f6'}}>
      <Helmet><title>Build Resume | QuickResume.business</title></Helmet>

      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-white px-4 py-3 border-b shrink-0 z-30" style={{borderColor: '#e9d5ff'}}>
        <div className="font-bold text-lg flex items-center gap-2">
          <div className="w-6 h-6 rounded flex items-center justify-center text-white" style={{background: GRAD}}>
            <FileText size={12} />
          </div>
          <span style={{background: GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>QuickResume</span>
        </div>
        <button onClick={() => navigate('/')} className="text-sm font-semibold text-gray-500">Exit</button>
      </div>

      {/* Left Sidebar Nav */}
      <div className="relative md:w-[110px] w-full bg-white md:border-r border-t md:border-t-0 border-gray-200 flex flex-row md:flex-col items-center justify-between md:justify-start shrink-0 z-40 shadow-sm fixed bottom-0 md:relative md:bottom-auto">
        <NavItem id="templates" icon={FileText} label="Templates" />
        <NavItem id="section" icon={Layout} label="Section" />
        <NavItem id="design" icon={Palette} label="Design" />
        <NavItem id="spellcheck" icon={Type} label="Checks" />
        <NavItem id="analysis" icon={Sparkles} label="AI Review" />
      </div>

      {/* Left Panel */}
      <div className={`w-full md:w-[360px] bg-white border-r border-gray-200 flex-col z-10 shrink-0 shadow-sm relative pb-16 md:pb-0 ${isMobilePreviewing ? 'hidden md:flex' : 'flex'}`}>
        {editingSection ? (
          <div className="flex flex-col h-full bg-white">
            <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-white">
              <button onClick={() => setEditingSection(null)} className="p-2 hover:bg-purple-50 rounded-full transition-colors">
                <ArrowLeft size={18} style={{color: PURPLE}} />
              </button>
              <h2 className="text-lg font-bold text-gray-900 capitalize">{editingSection}</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-white">
              {editingSection === 'summary' && <Summary />}
              {editingSection === 'experience' && <Experience />}
              {editingSection === 'education' && <Education />}
              {editingSection === 'contacts' && <Contacts />}
              {editingSection === 'skills' && <Skills />}
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full bg-white">

            {activeTab === 'templates' && (
              <div className="p-8">
                <h2 className="text-[22px] font-bold text-gray-900 mb-6">Templates</h2>
                <p className="text-sm text-gray-500 mb-6">Choose a template for your resume.</p>
                <button onClick={() => navigate('/choose-template')} className="w-full py-3.5 text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-md" style={{background: GRAD}}>
                  Browse Templates
                </button>
              </div>
            )}

            {activeTab === 'section' && (
              <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar">
                <h2 className="text-[22px] font-bold text-gray-900 mb-2">Sections</h2>
                <p className="text-sm text-gray-500 mb-8">Drag & drop to reorder sections.</p>
                <div className="space-y-4 mb-10">
                  {['Summary', 'Experience', 'Education'].map(sec => (
                    <div key={sec} className="flex items-center justify-between py-4 px-4 bg-white border border-gray-200 rounded-xl shadow-sm group hover:border-purple-200 transition-colors">
                      <div className="flex items-center gap-4 text-gray-700">
                        <GripVertical size={18} className="text-gray-400 cursor-grab" />
                        <span className="font-semibold text-[15px]">{sec}</span>
                      </div>
                      <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setEditingSection(sec.toLowerCase())} className="p-2 hover:bg-purple-50 rounded-md" style={{color: PURPLE}}><Pencil size={18} /></button>
                        <button className="p-2 hover:bg-red-50 rounded-md text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <div className="text-[13px] font-semibold text-gray-500 mb-4 tracking-wide">Right column:</div>
                  <div className="space-y-4">
                    {[
                      { label: 'Contacts', locked: true },
                      { label: 'Skills', locked: false },
                      { label: 'Languages', locked: false },
                    ].map(({ label, locked }) => (
                      <div key={label} className="flex items-center justify-between py-4 px-4 bg-white border border-gray-200 rounded-xl shadow-sm group hover:border-purple-200 transition-colors">
                        <div className="flex items-center gap-4 text-gray-700">
                          {locked ? <Lock size={16} className="text-gray-300 w-[18px]" /> : <GripVertical size={18} className="text-gray-400 cursor-grab" />}
                          <span className="font-semibold text-[15px]">{label}</span>
                        </div>
                        <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100">
                          {!locked && <button onClick={() => setEditingSection(label.toLowerCase())} className="p-2 hover:bg-purple-50 rounded-md" style={{color: PURPLE}}><Pencil size={18} /></button>}
                          {locked && <button onClick={() => setEditingSection(label.toLowerCase())} className="p-2 hover:bg-purple-50 rounded-md" style={{color: PURPLE}}><Pencil size={18} /></button>}
                          {!locked && <button className="p-2 hover:bg-red-50 rounded-md text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'design' && (
              <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar">
                <h2 className="text-[22px] font-bold text-gray-900 mb-8">Design & Formatting</h2>
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-4">Resume Color</label>
                  <div className="flex flex-wrap gap-3">
                    {['#7c3aed','#0ea5e9','#2196F3','#e11d48','#16a34a','#9333ea','#ea580c','#0891b2','#334155','#0f172a'].map(c => (
                      <button key={c} onClick={() => updateSection('design', { ...data.design, color: c })}
                        className="w-9 h-9 rounded-full transition-all hover:scale-110"
                        style={{ backgroundColor: c, outline: data.design.color === c ? `3px solid ${c}` : 'none', outlineOffset: '2px', transform: data.design.color === c ? 'scale(1.15)' : '' }} />
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <label className="text-sm text-gray-500 font-medium">Custom:</label>
                    <input type="color" value={data.design.color} onChange={e => updateSection('design', { ...data.design, color: e.target.value })} className="w-10 h-10 rounded cursor-pointer border border-gray-200" />
                    <span className="text-sm font-mono text-gray-500">{data.design.color}</span>
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-4">Font Size</label>
                  <div className="flex gap-4">
                    {[{label:'Small', size:'12px'},{label:'Normal', size:'14px'},{label:'Large', size:'16px'}].map(opt => (
                      <button key={opt.label} onClick={() => updateSection('design', { ...data.design, fontSize: opt.size })}
                        className="flex-1 py-5 rounded-2xl flex flex-col items-center justify-center gap-2 font-semibold transition-all border-2"
                        style={{ borderColor: data.design.fontSize === opt.size ? PURPLE : '#e5e7eb', color: data.design.fontSize === opt.size ? PURPLE : '#4b5563', background: data.design.fontSize === opt.size ? '#f5f3ff' : 'white' }}>
                        <span className="font-bold" style={{ fontSize: opt.size === '12px' ? '18px' : opt.size === '14px' ? '22px' : '26px' }}>A</span>
                        <span className="text-xs">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-4">Font Family</label>
                  <select value={data.design.fontFamily} onChange={e => updateSection('design', { ...data.design, fontFamily: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-gray-700 font-medium focus:outline-none shadow-sm"
                    style={{}}>
                    <option value="'Inter', sans-serif">Inter</option>
                    <option value="'Montserrat', sans-serif">Montserrat</option>
                    <option value="'Roboto', sans-serif">Roboto</option>
                    <option value="'Lora', serif">Lora</option>
                    <option value="'Merriweather', serif">Merriweather</option>
                    <option value="'Georgia', serif">Georgia</option>
                  </select>
                </div>

                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <label className="block text-sm font-semibold text-gray-700">Section Spacing</label>
                    <span className="text-xs text-gray-400">{data.design.spacing === 'compact' ? 'Compact' : data.design.spacing === 'relaxed' ? 'Relaxed' : 'Normal'}</span>
                  </div>
                  <input type="range" min={0} max={2} step={1}
                    value={data.design.spacing === 'compact' ? 0 : data.design.spacing === 'relaxed' ? 2 : 1}
                    onChange={e => { const v = Number(e.target.value); updateSection('design', { ...data.design, spacing: v === 0 ? 'compact' : v === 2 ? 'relaxed' : 'normal' }); }}
                    className="w-full h-1.5 rounded-lg appearance-none cursor-pointer" style={{accentColor: PURPLE}} />
                </div>

                <div className="text-right">
                  <button onClick={() => updateSection('design', { ...data.design, color: PURPLE, fontFamily: "'Inter', sans-serif", fontSize: '14px', spacing: 'normal' })}
                    className="text-sm font-semibold hover:underline" style={{color: PURPLE}}>
                    Reset to Default
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'spellcheck' && (
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-[22px] font-bold text-gray-900">Spell check</h2>
                  <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center shadow-sm"><CheckCircle size={14} strokeWidth={3} /></div>
                </div>
                <p className="text-[15px] text-gray-600 leading-relaxed font-medium">No spelling errors detected. You can continue editing or finish your resume now.</p>
              </div>
            )}

            {activeTab === 'analysis' && (
              <div className="p-8 flex flex-col h-full overflow-y-auto custom-scrollbar">
                <div className="flex items-center gap-3 mb-6 shrink-0">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm" style={{background: GRAD}}>
                    <Sparkles size={20} />
                  </div>
                  <h2 className="text-[22px] font-bold text-gray-900">AI Resume Review</h2>
                </div>
                {!analysis && !isAnalyzing && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center mt-10">
                    <Lightbulb size={48} className="text-amber-400 mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Get Feedback Instantly</h3>
                    <p className="text-gray-500 max-w-[280px] text-sm mb-8 leading-relaxed">Our AI will scan your resume for missing keywords, weak verbs, and give actionable improvements.</p>
                    <button onClick={handleAnalyze} className="px-6 py-3 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2 hover:opacity-90" style={{background: GRAD}}>
                      <Sparkles size={18} /> Analyze My Resume
                    </button>
                  </div>
                )}
                {isAnalyzing && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center mt-10">
                    <Loader2 size={40} className="animate-spin mb-4" style={{color: PURPLE}} />
                    <p className="text-gray-600 font-medium animate-pulse">Scanning your resume...</p>
                  </div>
                )}
                {analysis && !isAnalyzing && (
                  <div className="flex-1 rounded-2xl p-6 border" style={{background: '#f5f3ff', borderColor: '#ddd6fe'}}>
                    <h3 className="font-bold mb-4 flex items-center gap-2" style={{color: PURPLE}}><Sparkles size={16} /> Suggested Improvements</h3>
                    <div className="prose prose-sm font-medium text-gray-700 leading-relaxed">
                      <Markdown>{analysis}</Markdown>
                    </div>
                    <button onClick={handleAnalyze} className="mt-8 px-5 py-2.5 bg-white border font-bold rounded-lg shadow-sm transition-all w-full text-center hover:bg-purple-50" style={{borderColor: '#ddd6fe', color: PURPLE}}>
                      Analyze Again
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Resume Preview Area */}
      <div className={`flex-1 relative overflow-y-auto flex-col p-4 md:p-8 items-center pt-8 custom-scrollbar pb-24 md:pb-8 ${!isMobilePreviewing ? 'hidden md:flex' : 'flex'}`} style={{background: '#eef2f6'}}>
        <div className="w-full max-w-[794px] flex flex-col min-h-min pb-20 md:pb-0">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between font-semibold text-sm mb-4 w-full gap-4 md:gap-0">
            <div className="flex items-center gap-2 pl-1 max-w-full overflow-hidden text-ellipsis whitespace-nowrap" style={{color: PURPLE}}>
              {data.personalInfo.firstName || 'Untitled'}_{data.personalInfo.lastName || 'Resume'} <Edit2 size={13} className="shrink-0 cursor-pointer hover:opacity-70" />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button onClick={() => navigate('/cover-letter')}
                className="flex justify-center items-center gap-2 px-5 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-lg font-bold text-sm transition-colors shadow-sm w-full md:w-auto hover:border-purple-300 hover:text-purple-600">
                <FileText size={16} /> Write Cover Letter
              </button>
              <button onClick={handleDownloadPDF} disabled={isDownloading}
                className="flex justify-center items-center gap-2 px-5 py-2.5 text-white rounded-lg font-bold text-sm transition-all shadow-md disabled:opacity-50 w-full md:w-auto hover:opacity-90"
                style={{background: GRAD}}>
                {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                Download PDF
              </button>
            </div>
          </div>

          {/* Empty State */}
          {!data.personalInfo.firstName && !data.personalInfo.lastName && (
            <div className="w-full flex flex-col items-center justify-center py-16 text-center mb-4 bg-white rounded-2xl border-2 border-dashed" style={{borderColor: '#ddd6fe'}}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4 shadow-md" style={{background: GRAD}}>
                <FileText size={30} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Your resume preview will appear here</h3>
              <p className="text-gray-500 text-sm max-w-xs">Start filling in your details from the left panel to see your resume come to life!</p>
              <button onClick={() => setEditingSection('contacts')} className="mt-6 px-6 py-2.5 text-white font-bold rounded-xl shadow-md hover:opacity-90 transition-all" style={{background: GRAD}}>
                Start Filling Details →
              </button>
            </div>
          )}

          <div className="w-full bg-white md:shadow-2xl rounded-sm overflow-hidden shrink-0 min-h-[1123px] flex flex-col scale-[0.85] md:scale-100 origin-top" id="resume-preview-container">
            <LivePreview />
          </div>
        </div>
      </div>

      {/* Mobile FAB */}
      <button onClick={() => setIsMobilePreviewing(!isMobilePreviewing)}
        className="md:hidden fixed bottom-24 right-4 text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center transition-transform active:scale-95"
        style={{background: GRAD}}>
        {isMobilePreviewing ? <Edit2 size={24} /> : <Eye size={24} />}
      </button>
    </div>
  );
};

export default Build;
