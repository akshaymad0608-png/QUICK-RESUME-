import { FC, useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, Search } from 'lucide-react';
import { educationExamples } from '../../data/examples';
import toast from 'react-hot-toast';

const Education: FC = () => {
  const { data, updateSection } = useResume();
  const [activeEduIdForExamples, setActiveEduIdForExamples] = useState<string | null>(null);

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

  const appendDescription = (id: string, text: string) => {
    const edu = data.education.find(e => e.id === id);
    if (edu) {
      const prefix = edu.description.length > 0 ? (edu.description.endsWith('\n') ? '• ' : '\n• ') : '• ';
      updateEdu(id, 'description', edu.description + prefix + text);
    }
    toast.success('Added to description!');
  };

  const setFieldOfStudy = (id: string, text: string) => {
    updateEdu(id, 'fieldOfStudy', text);
    toast.success('Field of study updated!');
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Education</h2>
        <p className="text-gray-600">A varied education on your resume sums up the value that your learnings and background will bring to job.</p>
      </div>

      <div className="space-y-6">
        {data.education.map((edu) => (
          <div key={edu.id} className={`relative bg-white border p-6 rounded-2xl shadow-sm transition-colors group ${activeEduIdForExamples === edu.id ? 'border-primary ring-1 ring-primary' : 'border-gray-200 hover:border-primary/50'}`}>
            <button 
              onClick={() => removeEdu(edu.id)}
              className="absolute top-6 right-6 text-slate-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={20} />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">School</label>
                <input 
                  type="text" value={edu.schoolName} onChange={(e) => updateEdu(edu.id, 'schoolName', e.target.value)} 
                  className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors placeholder:text-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1">Degree</label>
                <input 
                  type="text" value={edu.degree} onChange={(e) => updateEdu(edu.id, 'degree', e.target.value)} 
                  className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors placeholder:text-gray-400"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-600 mb-1">Field of Study</label>
                <input 
                  type="text" value={edu.fieldOfStudy} onChange={(e) => updateEdu(edu.id, 'fieldOfStudy', e.target.value)} 
                  className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors placeholder:text-gray-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 md:col-span-2">
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-1">City</label>
                  <input 
                    type="text" value={edu.city} onChange={(e) => updateEdu(edu.id, 'city', e.target.value)} 
                    className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-1">Country</label>
                  <input 
                    type="text" value={edu.country} onChange={(e) => updateEdu(edu.id, 'country', e.target.value)} 
                    className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors placeholder:text-gray-400"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 md:col-span-2">
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-1">Start Date</label>
                  <input 
                    type="text" value={edu.startYear} onChange={(e) => updateEdu(edu.id, 'startYear', e.target.value)} 
                    className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors placeholder:text-gray-400"
                    placeholder="YYYY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-1">End Date</label>
                  <input 
                    type="text" value={edu.endYear} onChange={(e) => updateEdu(edu.id, 'endYear', e.target.value)} 
                    className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors placeholder:text-gray-400"
                    placeholder="YYYY"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-1">
                   <label className="block text-sm font-bold text-gray-600">Description</label>
                   <button 
                     onClick={() => setActiveEduIdForExamples(activeEduIdForExamples === edu.id ? null : edu.id)}
                     className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors border border-gray-200"
                   >
                     <Search size={14} /> Examples
                   </button>
                </div>
                <textarea 
                  value={edu.description} onChange={(e) => updateEdu(edu.id, 'description', e.target.value)} 
                  className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors min-h-[100px] custom-scrollbar placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Examples Panel */}
            {activeEduIdForExamples === edu.id && (
              <div className="mt-4 p-5 bg-gray-50 border border-gray-200 rounded-xl space-y-5">
                 <div>
                    <h3 className="text-[13px] font-bold text-gray-900 mb-3 uppercase tracking-wider">Course Suggestions</h3>
                    <div className="flex flex-wrap gap-2">
                      {educationExamples.courses.map(course => (
                        <button
                          key={course}
                          onClick={() => setFieldOfStudy(edu.id, course)}
                          className="px-3 py-1.5 text-[12px] font-bold rounded-lg border border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary transition-colors"
                        >
                          + {course}
                        </button>
                      ))}
                    </div>
                 </div>
                 
                 <div>
                    <h3 className="text-[13px] font-bold text-gray-900 mb-3 uppercase tracking-wider">Achievements</h3>
                    <div className="flex flex-wrap gap-2">
                      {educationExamples.achievements.map(achievement => (
                        <button
                          key={achievement}
                          onClick={() => appendDescription(edu.id, achievement)}
                          className="px-3 py-1.5 text-[12px] font-bold rounded-lg border border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary transition-colors"
                        >
                          + {achievement}
                        </button>
                      ))}
                    </div>
                 </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <button 
        onClick={addEdu}
        className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-gray-200 hover:border-primary hover:text-primary hover:bg-primary/5 rounded-xl text-gray-600 transition-colors font-bold"
      >
        <Plus size={18} /> Add more education
      </button>
    </div>
  );
};

export default Education;
