import { FC, useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, Sparkles, Loader2 } from 'lucide-react';
import { enhanceBulletPoints } from '../../services/geminiService';
import toast from 'react-hot-toast';

const Experience: FC = () => {
  const { data, updateSection } = useResume();
  const [isEnhancingId, setIsEnhancingId] = useState<string | null>(null);

  const addExperience = () => {
    const newExp = {
      id: crypto.randomUUID(),
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
  };

  const removeExperience = (id: string) => {
    updateSection('experience', data.experience.filter(e => e.id !== id));
  };

  const updateExp = (id: string, field: string, value: string | boolean) => {
    updateSection('experience', data.experience.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const handleEnhance = async (expId: string) => {
    const exp = data.experience.find(e => e.id === expId);
    if (!exp || exp.description.trim().length < 10) {
      toast.error('Please write some basic description first.');
      return;
    }

    setIsEnhancingId(expId);
    try {
      // Split description by newlines to get bullets
      const bullets = exp.description.split('\n').filter(b => b.trim());
      const enhancedBullets = await enhanceBulletPoints(bullets);
      updateSection('experience', data.experience.map(e => e.id === expId ? { ...e, description: enhancedBullets.map(b => '• ' + b.replace(/^•\s*/, '')).join('\n') } : e));
      toast.success('Description enhanced!');
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to enhance description.');
    } finally {
      setIsEnhancingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Experience</h2>
        <p className="text-gray-500">Show your relevant experience.</p>
      </div>

      <div className="space-y-8">
        {data.experience.map((exp) => (
          <div key={exp.id} className="relative bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:border-blue-200 transition-colors group">
            <button 
              onClick={() => removeExperience(exp.id)}
              className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={20} />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Job Title</label>
                <input 
                  type="text" value={exp.jobTitle} onChange={(e) => updateExp(exp.id, 'jobTitle', e.target.value)} 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Employer / Company</label>
                <input 
                  type="text" value={exp.company} onChange={(e) => updateExp(exp.id, 'company', e.target.value)} 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 md:col-span-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
                  <input 
                    type="text" value={exp.city} onChange={(e) => updateExp(exp.id, 'city', e.target.value)} 
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Country</label>
                  <input 
                    type="text" value={exp.country} onChange={(e) => updateExp(exp.id, 'country', e.target.value)} 
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 md:col-span-2">
                 <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Start Date</label>
                  <input 
                    type="text" value={exp.startDate} onChange={(e) => updateExp(exp.id, 'startDate', e.target.value)} 
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                    placeholder="MM/YYYY or Month Year"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                     <label className="block text-sm font-semibold text-gray-700">End Date</label>
                     <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
                        <input type="checkbox" checked={exp.isPresent} onChange={(e) => updateExp(exp.id, 'isPresent', e.target.checked)} className="rounded text-blue-500 focus:ring-blue-500" />
                        Currently work here
                      </label>
                  </div>
                  <input 
                    type="text" value={exp.endDate} onChange={(e) => updateExp(exp.id, 'endDate', e.target.value)} disabled={exp.isPresent}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors disabled:opacity-50"
                    placeholder="MM/YYYY or Month Year"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-700">Description</label>
                <button 
                  onClick={() => handleEnhance(exp.id)}
                  disabled={isEnhancingId === exp.id}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isEnhancingId === exp.id ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                  Enhance with AI
                </button>
              </div>
              <textarea 
                value={exp.description}
                onChange={(e) => updateExp(exp.id, 'description', e.target.value)}
                placeholder="• Directed the development of..."
                className="w-full min-h-[140px] bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-y leading-relaxed"
              />
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={addExperience}
        className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-gray-300 hover:border-blue-500 hover:text-blue-500 rounded-xl text-gray-500 transition-colors font-semibold"
      >
        <Plus size={18} /> Add more experience
      </button>

    </div>
  );
};

export default Experience;
