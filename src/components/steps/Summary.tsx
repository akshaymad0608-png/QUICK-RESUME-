import { FC, useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Sparkles, Loader2, Search, Plus, Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon, Undo, Redo, ChevronDown } from 'lucide-react';
import { generateSummary, enhanceBulletPoints } from '../../services/geminiService'; // Re-use generic text improvement
import toast from 'react-hot-toast';
import { summaryExamples } from '../../data/summaryExamples';

const Summary: FC = () => {
  const { data, updateSection } = useResume();
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Filters for Right Panel
  const [activeTab, setActiveTab] = useState<'examples' | 'ai'>('examples');
  const [searchQuery, setSearchQuery] = useState('');
  const [careerField, setCareerField] = useState('Software Development');
  const [experienceLevel, setExperienceLevel] = useState('All');

  // Compute Categories from database dynamically
  const categories = Array.from(new Set(summaryExamples.map(s => s.category))).sort();
  const levels = ['All', 'Fresher', '1-3 Years', '3-5 Years', '5+ Years'];

  const displayedExamples = summaryExamples.filter(ex => 
    (careerField === 'All' || ex.category === careerField) &&
    (experienceLevel === 'All' || ex.experienceLevel === experienceLevel) &&
    ex.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGenerate = async (action: 'improve' | 'shorten' | 'professional' | 'generate') => {
    setIsGenerating(true);
    try {
      if(action === 'generate' || data.summary.trim().length < 10) {
        const summary = await generateSummary(data);
        updateSection('summary', summary);
        toast.success('Summary generated successfully!');
      } else {
        const result = await enhanceBulletPoints([data.summary], action === 'shorten' ? 'shorten' : 'improve');
        if(result && result[0]) {
          updateSection('summary', result[0]);
          toast.success('Summary enhanced!');
        }
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to process AI request.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleInsert = (text: string) => {
    updateSection('summary', text);
    toast.success('Example added!');
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6 xl:h-[700px]">
      
      {/* LEFT SIDE: Editor */}
      <div className="flex-1 flex flex-col min-w-0">
         <div className="mb-4">
           <h2 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">Professional Summary</h2>
           <p className="text-sm text-slate-500">Write a short paragraph highlighting your value.</p>
         </div>

         {/* Rich Text Toolbar Mockup */}
         <div className="border border-slate-200 rounded-t-xl bg-white px-3 py-2 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-1">
              <button className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded"><Bold size={16} /></button>
              <button className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded"><Italic size={16} /></button>
              <button className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded"><Underline size={16} /></button>
              <div className="w-px h-5 bg-white/10 mx-1"></div>
              <button className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded"><List size={16} /></button>
              <button className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded"><ListOrdered size={16} /></button>
              <div className="w-px h-5 bg-white/10 mx-1"></div>
              <button className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded"><LinkIcon size={16} /></button>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded"><Undo size={16} /></button>
              <button className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded"><Redo size={16} /></button>
              <div className="w-px h-5 bg-white/10 mx-1"></div>
              <button 
                onClick={() => handleGenerate('improve')}
                disabled={isGenerating}
                className="flex items-center gap-1.5 text-[13px] font-bold text-slate-800 bg-slate-100 px-2.5 py-1.5 rounded hover:bg-slate-900/20 transition-colors disabled:opacity-50"
              >
                {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                AI Improve
              </button>
            </div>
         </div>
         
         <textarea 
           value={data.summary}
           onChange={(e) => updateSection('summary', e.target.value)}
           className="w-full flex-1 bg-slate-50 border-b border-l border-r border-slate-200 rounded-b-xl p-5 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 text-slate-900 text-[15px] leading-relaxed resize-none custom-scrollbar shadow-sm placeholder:text-slate-600"
           placeholder="Write about your experience, achievements and skills. Use examples from the right side."
         />
      </div>

      {/* RIGHT SIDE: Examples Panel */}
      <div className="w-full xl:w-[380px] h-[500px] xl:h-auto bg-slate-50 border border-slate-200 rounded-xl flex flex-col shrink-0 overflow-hidden shadow-sm">
         
         {/* Tabs */}
         <div className="flex border-b border-slate-200 bg-white">
           <button 
             onClick={() => setActiveTab('examples')} 
             className={`flex-1 py-3 text-xs uppercase tracking-widest font-bold border-b-2 text-center transition-colors ${activeTab === 'examples' ? 'border-slate-400 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-600'}`}
           >
             Examples
           </button>
           <button 
             onClick={() => setActiveTab('ai')} 
             className={`flex-1 py-3 text-xs uppercase tracking-widest font-bold border-b-2 text-center transition-colors ${activeTab === 'ai' ? 'border-slate-400 text-slate-700' : 'border-transparent text-slate-500 hover:text-slate-600'}`}
           >
             AI Tools
           </button>
         </div>

         {/* Content container */}
         <div className="flex-1 overflow-y-auto custom-scrollbar p-4 relative">
            
            {activeTab === 'examples' ? (
              <>
                <div className="mb-4 space-y-3">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Find relevant examples</h3>
                  
                  <div className="relative">
                    <select 
                      value={careerField} 
                      onChange={(e) => setCareerField(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg pl-3 pr-8 py-2 outline-none focus:border-slate-400 shadow-sm font-medium cursor-pointer"
                    >
                      <option value="All">All Career Fields</option>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                  </div>

                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <select 
                        value={experienceLevel} 
                        onChange={(e) => setExperienceLevel(e.target.value)}
                        className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg pl-3 pr-8 py-2 outline-none focus:border-slate-400 shadow-sm font-medium cursor-pointer"
                      >
                        {levels.map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                    </div>
                    <div className="relative flex-[1.5]">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input 
                        type="text" 
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-slate-400 shadow-sm placeholder:text-slate-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {displayedExamples.length > 0 ? displayedExamples.map((ex, i) => (
                    <div key={i} className="flex bg-white border border-slate-200 rounded-lg shadow-sm hover:border-slate-300 transition-colors overflow-hidden group">
                      <button 
                         onClick={() => handleInsert(ex.content)}
                         className="bg-slate-900/20 hover:bg-slate-900/40 text-slate-700 transition-colors w-12 flex flex-col items-center justify-center shrink-0 font-bold text-xs gap-1 opacity-90 group-hover:opacity-100"
                      >
                         <Plus size={16} />
                         <span>ADD</span>
                      </button>
                      <div className="p-3 text-[13px] leading-relaxed text-slate-600">{ex.content}</div>
                    </div>
                  )) : (
                    <div className="text-center py-10 text-slate-500 text-sm font-medium">No examples found.</div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="w-16 h-16 bg-slate-900/20 text-slate-700 rounded-full flex items-center justify-center mb-4 border border-slate-300">
                  <Sparkles size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">AI Writing Assistant</h3>
                <p className="text-sm text-slate-500 mb-8 leading-relaxed">Need help writing? Let our AI analyze your experience and generate a professional summary optimized for applicant tracking systems.</p>
                
                <div className="w-full space-y-3">
                   <button 
                      onClick={() => handleGenerate('generate')}
                      disabled={isGenerating}
                      className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-md transition-all flex justify-center items-center gap-2 border border-slate-300"
                   >
                      {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />} Generate Full Summary
                   </button>
                   <button 
                      onClick={() => handleGenerate('improve')}
                      disabled={isGenerating}
                      className="w-full py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-xl shadow-sm transition-all"
                   >
                      Improve Writing
                   </button>
                   <div className="flex gap-3">
                     <button 
                        onClick={() => handleGenerate('professional')}
                        disabled={isGenerating}
                        className="flex-1 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-sm rounded-xl shadow-sm transition-all"
                     >
                        Professional Tone
                     </button>
                     <button 
                        onClick={() => handleGenerate('shorten')}
                        disabled={isGenerating}
                        className="flex-1 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-sm rounded-xl shadow-sm transition-all"
                     >
                        Shorten
                     </button>
                   </div>
                </div>
              </div>
            )}
         </div>
      </div>
      
    </div>
  );
};

export default Summary;

