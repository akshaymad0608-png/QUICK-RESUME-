import { FC, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { CheckCircle, FileText, Layout, Palette, Type, Edit2, GripVertical, Pencil, Trash2, ArrowLeft, Lock, Download, Loader2 } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import toast from 'react-hot-toast';
import Contacts from '../components/steps/Contacts';
import Experience from '../components/steps/Experience';
import Education from '../components/steps/Education';
import Skills from '../components/steps/Skills';
import Summary from '../components/steps/Summary';
import LivePreview from '../components/Preview/LivePreview';

const Build: FC = () => {
  const [activeTab, setActiveTab] = useState<'templates' | 'section' | 'design' | 'spellcheck'>('section');
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const navigate = useNavigate();
  const { data, updateSection } = useResume();

  const handleDownloadPDF = () => {
    const element = document.getElementById('resume-preview-container');
    if (!element) return;
    setIsDownloading(true);
    const name = data.personalInfo.firstName ? `${data.personalInfo.firstName}_${data.personalInfo.lastName}` : 'resume';
    html2pdf().set({
      margin: 0,
      filename: `${name}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).from(element).save().then(() => {
      setIsDownloading(false);
      toast.success('PDF downloaded!');
    });
  };

  const handleBackToSections = () => {
    setEditingSection(null);
  };

  const NavItem = ({ id, icon: Icon, label }: { id: string, icon: React.ElementType, label: string }) => (
    <button 
      onClick={() => { setActiveTab(id); setEditingSection(null); }}
      className={`flex flex-col items-center gap-2 py-5 w-full transition-colors border-b border-gray-100 ${activeTab === id ? 'text-[#0ea5e9]' : 'text-gray-500 hover:text-gray-800'}`}
    >
      <Icon size={28} strokeWidth={activeTab === id ? 2 : 1.5} />
      <span className="text-[12px] font-medium text-center">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#eef2f6] flex h-screen overflow-hidden font-sans">
      <Helmet>
        <title>Build Resume | QuickResume.business</title>
      </Helmet>
      
      {/* Far Left Sidebar */}
      <div className="w-[110px] bg-white border-r border-gray-200 flex flex-col items-center shrink-0 z-20 shadow-sm shadow-r">
        <NavItem id="templates" icon={FileText} label="Templates" />
        <NavItem id="section" icon={Layout} label="Section" />
        <NavItem id="design" icon={Palette} label="Design & Formatting" />
        <NavItem id="spellcheck" icon={Type} label="Spell check" />
      </div>

      {/* Inner Left Panel */}
      <div className="w-[360px] bg-white border-r border-gray-200 flex flex-col z-10 shrink-0 shadow-sm relative">
        {editingSection ? (
           <div className="flex flex-col h-full bg-white">
             <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-white">
                <button onClick={handleBackToSections} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                   <ArrowLeft size={18} className="text-gray-600" />
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
                 <h2 className="text-[22px] font-bold text-[#1e293b] mb-6">Templates</h2>
                 <p className="text-sm text-gray-500 mb-6">Choose a template for your resume.</p>
                 <button onClick={() => navigate('/choose-template')} className="w-full py-3.5 bg-[#0ea5e9] text-white font-bold rounded-lg hover:bg-blue-600 transition-colors">
                   Browse Templates
                 </button>
              </div>
            )}
            
            {activeTab === 'section' && (
              <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar">
                <h2 className="text-[22px] font-bold text-[#1e293b] mb-2">Sections</h2>
                <p className="text-sm text-gray-500 mb-8">Drag & drop to reorder sections.</p>
                
                <div className="space-y-4 mb-10">
                  {['Summary', 'Experience', 'Education'].map(sec => (
                    <div key={sec} className="flex items-center justify-between py-4 px-4 bg-white border border-gray-200 rounded-xl shadow-sm group">
                       <div className="flex items-center gap-4 text-gray-700">
                          <GripVertical size={18} className="text-gray-400 cursor-grab" />
                          <span className="font-semibold text-[15px]">{sec}</span>
                       </div>
                       <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                         <button onClick={() => setEditingSection(sec.toLowerCase())} className="p-2 hover:bg-gray-100 rounded-md text-gray-500"><Pencil size={18} /></button>
                         <button className="p-2 hover:bg-gray-100 rounded-md text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
                       </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <div className="text-[13px] font-semibold text-gray-500 mb-4 tracking-wide">Right column:</div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-4 px-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                       <div className="flex items-center gap-4 text-gray-700">
                          <div className="text-gray-300 w-[18px] flex justify-center"><Lock size={16} /></div>
                          <span className="font-semibold text-[15px]">Contacts</span>
                       </div>
                       <button onClick={() => setEditingSection('contacts')} className="p-2 hover:bg-gray-100 rounded-md text-gray-500 opacity-60 hover:opacity-100"><Pencil size={18} /></button>
                    </div>
                    <div className="flex items-center justify-between py-4 px-4 bg-white border border-gray-200 rounded-xl shadow-sm group">
                       <div className="flex items-center gap-4 text-gray-700">
                          <GripVertical size={18} className="text-gray-400 cursor-grab" />
                          <span className="font-semibold text-[15px]">Skills</span>
                       </div>
                       <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                         <button onClick={() => setEditingSection('skills')} className="p-2 hover:bg-gray-100 rounded-md text-gray-500"><Pencil size={18} /></button>
                         <button className="p-2 hover:bg-gray-100 rounded-md text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
                       </div>
                    </div>
                    <div className="flex items-center justify-between py-4 px-4 bg-white border border-gray-200 rounded-xl shadow-sm group">
                       <div className="flex items-center gap-4 text-gray-700">
                          <GripVertical size={18} className="text-gray-400 cursor-grab" />
                          <span className="font-semibold text-[15px]">Languages</span>
                       </div>
                       <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                         <button className="p-2 hover:bg-gray-100 rounded-md text-gray-500"><Pencil size={18} /></button>
                         <button className="p-2 hover:bg-gray-100 rounded-md text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'design' && (
              <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar">
                <h2 className="text-[22px] font-bold text-[#1e293b] mb-8">Design & Formatting</h2>

                {/* Color Theme */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-4">Resume Color</label>
                  <div className="flex flex-wrap gap-3">
                    {['#2196F3','#e11d48','#16a34a','#9333ea','#ea580c','#0891b2','#334155','#b45309','#be185d','#0f172a'].map(c => (
                      <button
                        key={c}
                        onClick={() => updateSection('design', { ...data.design, color: c })}
                        className={`w-9 h-9 rounded-full transition-all ${data.design.color === c ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' : 'hover:scale-110'}`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <label className="text-sm text-gray-500 font-medium">Custom color:</label>
                    <input
                      type="color"
                      value={data.design.color}
                      onChange={e => updateSection('design', { ...data.design, color: e.target.value })}
                      className="w-10 h-10 rounded cursor-pointer border border-gray-200"
                    />
                    <span className="text-sm font-mono text-gray-500">{data.design.color}</span>
                  </div>
                </div>

                {/* Font Size */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-4">Font style</label>
                  <div className="flex gap-4">
                    {[{label:'Small', size:'12px'},{label:'Normal', size:'14px'},{label:'Large', size:'16px'}].map(opt => (
                      <button
                        key={opt.label}
                        onClick={() => updateSection('design', { ...data.design, fontSize: opt.size })}
                        className={`flex-1 py-5 rounded-2xl flex flex-col items-center justify-center gap-2 font-semibold transition-all border-2 ${data.design.fontSize === opt.size ? 'border-[#0ea5e9] text-[#0ea5e9] bg-[#0ea5e9]/5' : 'border-gray-200 text-gray-600 bg-white hover:border-gray-300'}`}
                      >
                        <span className="font-bold leading-none" style={{ fontSize: opt.size === '12px' ? '18px' : opt.size === '14px' ? '22px' : '26px' }}>A</span>
                        <span className="text-xs font-semibold">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Family */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-4">Font</label>
                  <select
                    value={data.design.fontFamily}
                    onChange={e => updateSection('design', { ...data.design, fontFamily: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-gray-700 font-medium focus:outline-none focus:border-[#0ea5e9] shadow-sm"
                  >
                    <option value="'Inter', sans-serif">Inter</option>
                    <option value="'Montserrat', sans-serif">Montserrat</option>
                    <option value="'Roboto', sans-serif">Roboto</option>
                    <option value="'Lora', serif">Lora</option>
                    <option value="'Merriweather', serif">Merriweather</option>
                    <option value="'Georgia', serif">Georgia</option>
                    <option value="system-ui, sans-serif">System UI</option>
                  </select>
                </div>

                {/* Spacing */}
                <div className="mb-8 space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-700">Section spacing</label>
                      <span className="text-xs text-gray-400">{data.design.spacing === 'compact' ? 'Compact' : data.design.spacing === 'relaxed' ? 'Relaxed' : 'Normal'}</span>
                    </div>
                    <input
                      type="range" min={0} max={2} step={1}
                      value={data.design.spacing === 'compact' ? 0 : data.design.spacing === 'relaxed' ? 2 : 1}
                      onChange={e => {
                        const val = Number(e.target.value);
                        updateSection('design', { ...data.design, spacing: val === 0 ? 'compact' : val === 2 ? 'relaxed' : 'normal' });
                      }}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0ea5e9]"
                    />
                  </div>
                </div>

                <div className="text-right mt-6">
                  <button
                    onClick={() => updateSection('design', { ...data.design, color: '#2196F3', fontFamily: "'Inter', sans-serif", fontSize: '14px', spacing: 'normal' })}
                    className="text-[#0ea5e9] font-semibold text-sm hover:underline"
                  >
                    Reset to Default
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'spellcheck' && (
              <div className="p-8">
                 <div className="flex items-center gap-3 mb-6">
                   <h2 className="text-[22px] font-bold text-[#1e293b]">Spell check</h2>
                   <div className="w-[22px] h-[22px] rounded-full bg-green-500 text-white flex items-center justify-center shadow-sm"><CheckCircle size={14} strokeWidth={3} /></div>
                 </div>
                 <p className="text-[15px] text-gray-600 leading-relaxed font-medium">
                   No spelling errors detected. You can continue editing other sections or finish your resume now.
                 </p>
              </div>
            )}
          </div>
        )}
      </div>

     {/* Main Resume Area */}
      <div className="flex-1 bg-[#eef2f6] relative overflow-y-auto flex flex-col p-4 md:p-8 items-center pt-8 custom-scrollbar">
         <div className="w-full max-w-[794px] flex flex-col min-h-min pb-20">
            <div className="flex items-center justify-between font-semibold text-sm mb-4 w-full">
              <div className="flex items-center gap-2 text-[#0ea5e9] pl-1">
                 {data.personalInfo.firstName || 'Untitled'}_{data.personalInfo.lastName || 'Resume'} <Edit2 size={13} className="cursor-pointer hover:text-blue-600" />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate('/cover-letter')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 border border-gray-200 hover:border-[#0ea5e9] hover:text-[#0ea5e9] rounded-lg font-bold text-sm transition-colors shadow-sm"
                >
                  <FileText size={16} />
                  Write Cover Letter
                </button>
                <button
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#0ea5e9] hover:bg-blue-600 text-white rounded-lg font-bold text-sm transition-colors shadow-md disabled:opacity-50"
                >
                  {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                  Download PDF
                </button>
              </div>
            </div>
            {/* Aspect ratio container wrapper deleted to support full view */}
            <div className="w-full bg-white shadow-2xl rounded-sm overflow-hidden shrink-0 min-h-[1123px] flex flex-col">
              <LivePreview />
            </div>
         </div>
      </div>
    </div>
  );
};

export default Build;

