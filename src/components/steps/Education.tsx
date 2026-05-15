import { FC } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const Education: FC = () => {
  const { data, updateSection } = useResume();

  const addEdu = () => {
    const newEdu = { id: crypto.randomUUID(), degree: '', fieldOfStudy: '', schoolName: '', city: '', country: '', startYear: '', endYear: '', description: '' };
    updateSection('education', [...data.education, newEdu]);
  };

  const removeEdu = (id: string) => {
    updateSection('education', data.education.filter(e => e.id !== id));
  };

  const updateEdu = (id: string, field: string, value: string) => {
    updateSection('education', data.education.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Education</h2>
        <p className="text-gray-500">A varied education on your resume sums up the value that your learnings and background will bring to job.</p>
      </div>

      <div className="space-y-6">
        {data.education.map((edu) => (
          <div key={edu.id} className="relative bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:border-blue-200 transition-colors group">
            <button 
              onClick={() => removeEdu(edu.id)}
              className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={20} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">School</label>
                <input 
                  type="text" value={edu.schoolName} onChange={(e) => updateEdu(edu.id, 'schoolName', e.target.value)} 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Degree</label>
                <input 
                  type="text" value={edu.degree} onChange={(e) => updateEdu(edu.id, 'degree', e.target.value)} 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Field of Study</label>
                <input 
                  type="text" value={edu.fieldOfStudy} onChange={(e) => updateEdu(edu.id, 'fieldOfStudy', e.target.value)} 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 md:col-span-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
                  <input 
                    type="text" value={edu.city} onChange={(e) => updateEdu(edu.id, 'city', e.target.value)} 
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Country</label>
                  <input 
                    type="text" value={edu.country} onChange={(e) => updateEdu(edu.id, 'country', e.target.value)} 
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 md:col-span-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Start Date</label>
                  <input 
                    type="text" value={edu.startYear} onChange={(e) => updateEdu(edu.id, 'startYear', e.target.value)} 
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                    placeholder="YYYY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">End Date</label>
                  <input 
                    type="text" value={edu.endYear} onChange={(e) => updateEdu(edu.id, 'endYear', e.target.value)} 
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                    placeholder="YYYY"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea 
                  value={edu.description} onChange={(e) => updateEdu(edu.id, 'description', e.target.value)} 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors min-h-[100px]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={addEdu}
        className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-gray-300 hover:border-blue-500 hover:text-blue-500 rounded-xl text-gray-500 transition-colors font-semibold"
      >
        <Plus size={18} /> Add more education
      </button>
    </div>
  );
};

export default Education;
