import { FC, useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, Loader2, Sparkles, Search, Bold, Italic, Underline, List, ListOrdered, ChevronDown } from 'lucide-react';
import { enhanceBulletPoints } from '../../services/geminiService';
import toast from 'react-hot-toast';
import { experienceExamples } from '../../data/experienceExamples';

const Experience: FC = () => {
  const { data, updateSection } = useResume();
  const [isEnhancingId, setIsEnhancingId] = useState<string | null>(null);
  
  // Track which experience is currently active for inserting bullets
  const [focusedExpId, setFocusedExpId] = useState<string | null>(data.experience.length > 0 ? data.experience[0].id : null);
  
  // Right Panel State
  const [activeTab, setActiveTab] = useState<'examples' | 'ai'>('examples');
  const [careerField, setCareerField] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = Array.from(new Set(experienceExamples.map(e => e.category))).sort();

  const displayedExamples = experienceExamples.filter(ex => 
    (careerField === 'All' || ex.category === careerField) &&
    ex.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addExperience = () => {
    const newId = crypto.randomUUID();
    const newExp = {
      id: newId,
      company: '',
      jobTitle: '',
      city: '',
      country: '',
      startDate: '',
      endDate: '',
      isPresent: false,
      description: '',
    };
    updateSection('experience', [...data.experience, newExp]);
    setFocusedExpId(newId);
  };

  const removeExperience = (id: string) => {
    updateSection('experience', data.experience.filter(e => e.id !== id));
    if (focusedExpId === id) setFocusedExpId(null);
  };

  const updateExp = (id: string, field: string, value: string | boolean) => {
    updateSection('experience', data.experience.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const appendBullet = (text: string) => {
    if (!focusedExpId) {
      toast.error('Select an experience field first!');
      return;
    }
    const exp = data.experience.find(e => e.id === focusedExpId);
    if (exp) {
      const prefix = exp.description.length > 0 ? (exp.description.endsWith('\n') ? '• ' : '\n• ') : '• ';
      updateExp(focusedExpId, 'description', exp.description + prefix + text);
      toast.success('Bullet added!');
    }
  };

  const [aiActions] = useState(['Generate', 'Improve', 'Shorten', 'Professional Tone', 'ATS Optimize']);

  const handleEnhance = async (expId: string, actionType: string = 'improve') => {
    const exp = data.experience.find(e => e.id === expId);
    if (!exp || exp.description.trim().length < 5) {
      toast.error('Please write some basic description first.');
      return;
    }

    setIsEnhancingId(expId);
    try {
      const bullets = exp.description.split('\n').filter(b => b.trim());
      const enhancedBullets = await enhanceBulletPoints(bullets, actionType);
      updateSection('experience', data.experience.map(e => e.id === expId ? { ...e, description: enhancedBullets.map(b => '• ' + b.replace(/^•\s*/, '')).join('\n') } : e));
      toast.success(`Description enhanced!`);
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to enhance description.');
    } finally {
      setIsEnhancingId(null);
    }
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6 xl:h-[700px]">
      
      {/* LEFT SIDE: Experience Forms */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto pr-2 custom-scrollbar space-y-8">
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Work Experience</h2>
          <p className="text-gray-600">Show your relevant experience. Focus on your accomplishments.</p>
        </div>

        {data.experience.map((exp) => (
          <div 
            key={exp.id} 
            onClick={() => setFocusedExpId(exp.id)}
            className={`relative bg-white border p-5 rounded-2xl transition-all group ${focusedExpId === exp.id ? 'border-primary ring-2 ring-primary/20 shadow-md' : 'border-gray-200 hover:border-primary/50'}`}
          >
            <button 
              onClick={(e) => { e.stopPropagation(); removeExperience(exp.id); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 bg-white p-1 rounded-full shadow-sm"
            >
              <Trash2 size={18} />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-2">
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1">Job Title</label>
                <input 
                  type="text" value={exp.jobTitle} onChange={(e) => updateExp(exp.id, 'jobTitle', e.target.value)} 
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors shadow-sm"
                  placeholder="Software Engineer"
                />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1">Employer / Company</label>
                <input 
                  type="text" value={exp.company} onChange={(e) => updateExp(exp.id, 'company', e.target.value)} 
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors shadow-sm"
                  placeholder="Google"
                />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1">Start Date</label>
                <input 
                  type="text" value={exp.startDate} onChange={(e) => updateExp(exp.id, 'startDate', e.target.value)} 
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors shadow-sm"
                  placeholder="Jan 2020"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                   <label className="block text-[13px] font-bold text-gray-700">End Date</label>
                   <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer hover:text-gray-900">
                      <input type="checkbox" checked={exp.isPresent} onChange={(e) => updateExp(exp.id, 'isPresent', e.target.checked)} className="rounded text-primary focus:ring-primary" />
                      Currently work here
                    </label>
                </div>
                <input 
                  type="text" value={exp.endDate} onChange={(e) => updateExp(exp.id, 'endDate', e.target.value)} disabled={exp.isPresent}
                  className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors disabled:opacity-50 disabled:bg-gray-100 shadow-sm"
                  placeholder="Present"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-[13px] font-bold text-gray-700 mb-2">Description</label>
              
              {/* Toolbar */}
              <div className="border border-gray-300 rounded-t-xl bg-gray-50 px-2.5 py-1.5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-0.5">
                  <button className="p-1 text-gray-600 hover:bg-gray-200 rounded"><Bold size={14} /></button>
                  <button className="p-1 text-gray-600 hover:bg-gray-200 rounded"><Italic size={14} /></button>
                  <button className="p-1 text-gray-600 hover:bg-gray-200 rounded"><Underline size={14} /></button>
                  <div className="w-px h-4 bg-gray-300 mx-1"></div>
                  <button className="p-1 text-gray-600 hover:bg-gray-200 rounded"><List size={14} /></button>
                  <button className="p-1 text-gray-600 hover:bg-gray-200 rounded"><ListOrdered size={14} /></button>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleEnhance(exp.id); }}
                    disabled={isEnhancingId === exp.id}
                    className="flex items-center gap-1 text-[12px] font-bold text-primary bg-primary/10 px-2 py-1 rounded hover:bg-primary/20 transition-colors disabled:opacity-50"
                  >
                    {isEnhancingId === exp.id ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                    AI Improve
                  </button>
                </div>
              </div>
              <textarea 
                value={exp.description}
                onChange={(e) => updateExp(exp.id, 'description', e.target.value)}
                placeholder="Write about your experience, achievements and skills. Use examples from the right side."
                className="w-full h-[150px] bg-white border-b border-l border-r border-gray-300 rounded-b-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-gray-700 text-sm leading-relaxed resize-none custom-scrollbar shadow-sm"
              />
            </div>
          </div>
        ))}

        <button 
          onClick={addExperience}
          className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-gray-300 hover:border-primary hover:text-primary hover:bg-primary/5 rounded-xl text-gray-600 transition-colors font-bold"
        >
          <Plus size={18} /> Add Employment
        </button>
      </div>

      {/* RIGHT SIDE: Examples Panel */}
      <div className="w-full xl:w-[380px] h-[500px] xl:h-auto bg-[#F8FAFC] border border-[#D1D5DB] rounded-xl flex flex-col shrink-0 overflow-hidden shadow-sm">
         
         <div className="flex border-b border-gray-200 bg-white">
           <button 
             onClick={() => setActiveTab('examples')} 
             className={`flex-1 py-3 text-sm font-bold border-b-2 text-center transition-colors ${activeTab === 'examples' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
           >
             Pre-written Examples
           </button>
           <button 
             onClick={() => setActiveTab('ai')} 
             className={`flex-1 py-3 text-sm font-bold border-b-2 text-center transition-colors ${activeTab === 'ai' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
           >
             AI Suggestions
           </button>
         </div>

         <div className="flex-1 overflow-y-auto custom-scrollbar p-4 relative">
            
            {activeTab === 'examples' ? (
              <>
                <div className="mb-4 space-y-3">
                  <h3 className="text-[13px] font-bold text-gray-800 uppercase tracking-wide">Job based bullet suggestions</h3>
                  
                  <div className="relative">
                    <select 
                      value={careerField} 
                      onChange={(e) => setCareerField(e.target.value)}
                      className="w-full appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-lg pl-3 pr-8 py-2 outline-none focus:border-primary shadow-sm font-medium cursor-pointer"
                    >
                      <option value="All">All Career Fields</option>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search roles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {displayedExamples.length > 0 ? displayedExamples.map((ex, i) => (
                    <div key={i} className="flex bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                      <button 
                         onClick={() => appendBullet(ex.content)}
                         className="bg-[#22C55E] hover:bg-green-600 transition-colors w-12 flex flex-col items-center justify-center text-white shrink-0 font-bold text-xs gap-1 opacity-90 group-hover:opacity-100"
                      >
                         <Plus size={16} />
                         <span>ADD</span>
                      </button>
                      <div className="p-3 text-[13px] leading-relaxed text-gray-700 font-medium">
                         <div className="text-[10px] uppercase font-bold text-gray-400 mb-1">{ex.role}</div>
                         {ex.content}
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-10 text-gray-500 text-sm font-medium">No examples found.</div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center px-2">
                <h3 className="text-lg font-bold text-gray-900 mb-6">AI Enhancements</h3>
                
                <div className="w-full space-y-3">
                   {aiActions.map(action => (
                     <button 
                        key={action}
                        onClick={() => focusedExpId ? handleEnhance(focusedExpId, action.toLowerCase().replace(' ', '_')) : toast.error('Select an experience first')}
                        disabled={isEnhancingId === focusedExpId}
                        className="w-full py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                     >
                        <Sparkles size={16} className="text-purple-500" />
                        {action}
                     </button>
                   ))}
                </div>
              </div>
            )}
         </div>
      </div>
      
    </div>
  );
};

export default Experience;

