import { FC } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const Languages: FC = () => {
  const { data, updateSection } = useResume();
  const languages = data.languages || [];

  const addLanguage = () => {
    updateSection('languages', [
      ...languages,
      { id: Date.now().toString(), name: '', proficiency: 'Native' }
    ]);
  };

  const removeLanguage = (id: string) => {
    updateSection('languages', languages.filter(l => l.id !== id));
  };

  const updateLanguage = (id: string, field: string, value: string) => {
    updateSection('languages', languages.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {languages.map((lang) => (
          <div key={lang.id} className="flex items-center gap-4 bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:border-slate-300 transition-colors">
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Language</label>
              <input 
                type="text" value={lang.name} onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400 transition-colors placeholder:text-slate-600 shadow-sm"
                placeholder="e.g. English, Spanish"
              />
            </div>
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Proficiency</label>
              <select 
                value={lang.proficiency} onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)}
                className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400 transition-colors shadow-sm"
              >
                <option value="Native">Native</option>
                <option value="Fluent">Fluent</option>
                <option value="Proficient">Proficient</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Beginner">Beginner</option>
              </select>
            </div>
            <button 
              onClick={() => removeLanguage(lang.id)}
              className="mt-5 text-slate-400 hover:text-red-400 hover:bg-red-50 p-2 rounded-lg transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <button 
        onClick={addLanguage}
        className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-200 hover:border-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl text-slate-500 transition-colors font-bold text-sm"
      >
        <Plus size={16} /> Add language
      </button>
    </div>
  );
};

export default Languages;
