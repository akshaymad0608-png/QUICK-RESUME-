import { FC, useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Sparkles, X, Loader2, Search, Plus, ChevronDown } from 'lucide-react';
import { suggestSkills } from '../../services/geminiService';
import toast from 'react-hot-toast';
import { skillExamples } from '../../data/skillExamples';

const Skills: FC = () => {
  const { data, updateSection } = useResume();
  const [skillInput, setSkillInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(skillExamples[0].category);

  const [activeTab, setActiveTab] = useState<'examples' | 'ai'>('examples');
  const [selectedLevel, setSelectedLevel] = useState<'Beginner' | 'Intermediate' | 'Expert'>('Intermediate');

  const handleAddSkill = (name: string) => {
    const formattedSkill = `${name} - ${selectedLevel}`;
    const baseNameMatch = data.skills.some(s => s.split(' - ')[0].toLowerCase() === name.toLowerCase());
    if (!baseNameMatch) {
      updateSection('skills', [...data.skills, formattedSkill]);
      toast.success('Skill added!');
    } else {
      toast.error('Skill already added!');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!skillInput.trim()) return;
      handleAddSkill(skillInput.trim());
      setSkillInput('');
      setSearchQuery('');
    }
  };

  const removeSkill = (index: number) => {
    updateSection('skills', data.skills.filter((_, i) => i !== index));
  };

  const handleSuggest = async () => {
    const jobTitles = data.experience.map(e => e.jobTitle).filter(Boolean);
    if (jobTitles.length === 0) {
      toast.error('Please add job titles in the Experience step first.');
      return;
    }

    setIsLoading(true);
    try {
      const suggestions = await suggestSkills(jobTitles);
      const newSkills = suggestions
        .map(s => `${s} - Intermediate`)
        .filter(s => !data.skills.some(ds => ds.split(' - ')[0].toLowerCase() === s.toLowerCase()));
      updateSection('skills', [...data.skills, ...newSkills]);
      toast.success('Skills added based on your experience!');
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to suggest skills.');
    } finally {
      setIsLoading(false);
    }
  };

  const activeCategoryData = skillExamples.find(c => c.category === activeCategory) || skillExamples[0];
  const categorySkills = activeCategoryData.skills || [];
  
  const filteredSuggestions = categorySkills.filter(s => 
    s.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col xl:flex-row gap-6 xl:h-[700px]">
      
      {/* LEFT SIDE: Active Skills & Input Editor */}
      <div className="flex-1 flex flex-col min-w-0">
         <div className="mb-4">
           <h2 className="text-2xl font-black text-gray-900 mb-1">Skills</h2>
           <p className="text-sm text-gray-500">Pick skills that align with the job description.</p>
         </div>
         
         <div className="bg-white border text-left border-gray-300 rounded-xl shadow-sm p-5 flex flex-col min-h-[300px]">
            <h3 className="block text-[13px] font-bold text-gray-700 mb-4">Added Skills</h3>
            <div className="flex-1">
               {data.skills.length === 0 ? (
                <div className="text-center flex items-center justify-center h-40 text-gray-400 font-medium text-sm px-4">
                  No skills added yet. Use the panel on the right to add some skills.
                </div>
               ) : (
                <div className="flex flex-wrap gap-2.5">
                  {data.skills.map((skill, idx) => (
                    <div 
                      key={idx} 
                      className="bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-lg text-[13px] font-semibold flex items-center gap-2 text-gray-700 shadow-sm"
                    >
                      {skill.split(' - ')[0]} 
                      <span className="text-xs font-normal text-gray-400 ml-1 bg-white px-1.5 py-0.5 rounded border border-gray-200">{skill.split(' - ')[1]}</span>
                      <button 
                        onClick={() => removeSkill(idx)}
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded p-0.5 ml-1 focus:outline-none transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 mt-auto border-t border-gray-100 space-y-4">
               <div>
                 <label className="block text-[13px] font-bold text-gray-700 mb-2">Default Proficiency</label>
                 <div className="flex items-center gap-4">
                    {['Beginner', 'Intermediate', 'Expert'].map(level => (
                      <label key={level} className="flex items-center gap-2 text-[13px] text-gray-700 cursor-pointer font-medium">
                        <input 
                          type="radio" 
                          name="skillLevel" 
                          checked={selectedLevel === level}
                          onChange={() => setSelectedLevel(level as 'Beginner' | 'Intermediate' | 'Expert')}
                          className="text-primary focus:ring-primary border-gray-300 rounded-full"
                        />
                        {level}
                      </label>
                    ))}
                 </div>
               </div>

               <div>
                 <label className="block text-[13px] font-bold text-gray-700 mb-2">Manual Entry</label>
                 <div className="relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                   <input 
                     type="text" 
                     value={skillInput} 
                     onChange={(e) => setSkillInput(e.target.value)}
                     onKeyDown={handleKeyDown}
                     className="w-full bg-gray-50 text-gray-900 border border-gray-300 rounded-lg pl-9 px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors text-sm shadow-sm"
                     placeholder="Type a skill and press Enter..."
                   />
                 </div>
               </div>
            </div>
         </div>
      </div>

      {/* RIGHT SIDE: Examples Panel */}
      <div className="w-full xl:w-[380px] h-[500px] xl:h-auto bg-[#F8FAFC] border border-[#D1D5DB] rounded-xl flex flex-col shrink-0 overflow-hidden shadow-sm">
         
         {/* Tabs */}
         <div className="flex border-b border-gray-200 bg-white">
           <button 
             onClick={() => setActiveTab('examples')} 
             className={`flex-1 py-3 text-sm font-bold border-b-2 text-center transition-colors ${activeTab === 'examples' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
           >
             Suggested Skills
           </button>
           <button 
             onClick={() => setActiveTab('ai')} 
             className={`flex-1 py-3 text-sm font-bold border-b-2 text-center transition-colors ${activeTab === 'ai' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
           >
             AI Suggestions
           </button>
         </div>

         {/* Content container */}
         <div className="flex-1 overflow-y-auto custom-scrollbar p-4 relative">
            
            {activeTab === 'examples' ? (
              <>
                <div className="mb-4 space-y-3">
                  <h3 className="text-[13px] font-bold text-gray-800 uppercase tracking-wide">Browse Categories</h3>
                  
                  <div className="relative">
                    <select 
                      value={activeCategory} 
                      onChange={(e) => { setActiveCategory(e.target.value); setSearchQuery(''); }}
                      className="w-full appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-lg pl-3 pr-8 py-2 outline-none focus:border-primary shadow-sm font-medium cursor-pointer"
                    >
                      {skillExamples.map(c => <option key={c.category} value={c.category}>{c.category}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search skills..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary shadow-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                   {filteredSuggestions.length > 0 ? filteredSuggestions.map(s => (
                     <button
                       key={s}
                       onClick={() => handleAddSkill(s)}
                       className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:border-primary/50 hover:bg-primary/5 hover:text-primary text-gray-700 rounded-lg text-[13px] transition-colors text-left font-bold shadow-sm group"
                     >
                        {s} <span className="text-green-500 group-hover:scale-125 transition-transform"><Plus size={14} /></span>
                     </button>
                   )) : (
                     <div className="text-center py-6 text-gray-500 text-sm font-medium w-full">No skills found.</div>
                   )}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center px-4">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
                  <Sparkles size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">AI Auto-Suggest</h3>
                <p className="text-sm text-gray-600 mb-8 leading-relaxed">Let AI analyze your experience section and suggest the best skills to include on your resume.</p>
                
                <button 
                  onClick={handleSuggest}
                  disabled={isLoading}
                   className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md transition-all flex justify-center items-center gap-2"
                >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />} Generate Suggestions
                </button>
              </div>
            )}
         </div>
      </div>
      
    </div>
  );
};

export default Skills;

