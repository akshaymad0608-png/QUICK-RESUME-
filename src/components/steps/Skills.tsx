import { FC, useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Sparkles, X, Loader2 } from 'lucide-react';
import { suggestSkills } from '../../services/geminiService';
import toast from 'react-hot-toast';

const Skills: FC = () => {
  const { data, updateSection } = useResume();
  const [skillInput, setSkillInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!skillInput.trim()) return;
      
      if (!data.skills.map(s => s.toLowerCase()).includes(skillInput.toLowerCase())) {
        updateSection('skills', [...data.skills, skillInput.trim()]);
      }
      setSkillInput('');
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
      const newSkills = suggestions.filter(s => !data.skills.map(ds => ds.toLowerCase()).includes(s.toLowerCase()));
      updateSection('skills', [...data.skills, ...newSkills]);
      toast.success('Skills added based on your experience!');
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to suggest skills.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Skills</h2>
          <p className="text-gray-500">Pick skills that align with the job description.</p>
        </div>
        <button 
          onClick={handleSuggest}
          disabled={isLoading}
          className="flex items-center justify-center gap-1.5 text-sm font-semibold px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors disabled:opacity-50 shrink-0"
        >
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
          AI Suggest Skills
        </button>
      </div>

      <div>
         <input 
            type="text" 
            value={skillInput} 
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            placeholder="Type a skill and press Enter..."
          />
      </div>

      <div className="bg-white border text-gray-900 border-gray-200 p-6 rounded-xl min-h-[200px] shadow-inner">
        {data.skills.length === 0 ? (
          <div className="text-center text-gray-400 h-full flex items-center justify-center text-sm py-12">
            No skills added yet. Type above or use AI suggestions.
          </div>
        ) : (
          <div className="flex flex-wrap gap-2.5">
            {data.skills.map((skill, idx) => (
              <div 
                key={idx} 
                className="bg-gray-100 border border-gray-200 px-3 py-1.5 rounded text-sm font-medium flex items-center gap-2"
              >
                {skill}
                <button 
                  onClick={() => removeSkill(idx)}
                  className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded p-0.5 focus:outline-none transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;
