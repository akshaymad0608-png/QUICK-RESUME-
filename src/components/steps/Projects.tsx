import { FC } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const Projects: FC = () => {
  const { data, updateSection } = useResume();
  const projects = data.projects || [];

  const addProject = () => {
    updateSection('projects', [
      ...projects,
      { id: Date.now().toString(), title: '', subtitle: '', link: '', startDate: '', endDate: '', description: '' }
    ]);
  };

  const removeProject = (id: string) => {
    updateSection('projects', projects.filter(p => p.id !== id));
  };

  const updateProject = (id: string, field: string, value: string) => {
    updateSection('projects', projects.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="relative bg-white border border-slate-200 p-6 rounded-2xl shadow-sm transition-colors group hover:border-slate-300">
            <button 
              onClick={() => removeProject(project.id)}
              className="absolute top-6 right-6 text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100 bg-white/5 p-1.5 rounded-lg shadow-sm"
            >
              <Trash2 size={16} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Project Title</label>
                <input 
                  type="text" value={project.title} onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400 transition-colors placeholder:text-slate-600 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Subtitle / Role</label>
                <input 
                  type="text" value={project.subtitle} onChange={(e) => updateProject(project.id, 'subtitle', e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400 transition-colors placeholder:text-slate-600 shadow-sm"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Project Link</label>
                <input 
                  type="text" value={project.link} onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400 transition-colors placeholder:text-slate-600 shadow-sm"
                  placeholder="https://"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 md:col-span-2">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Start Date</label>
                  <input 
                    type="text" value={project.startDate} onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400 transition-colors placeholder:text-slate-600 shadow-sm"
                    placeholder="MM/YYYY"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">End Date</label>
                  <input 
                    type="text" value={project.endDate} onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400 transition-colors placeholder:text-slate-600 shadow-sm"
                    placeholder="MM/YYYY or Present"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Description</label>
                <textarea 
                  value={project.description} onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400 transition-colors min-h-[100px] custom-scrollbar placeholder:text-slate-600 shadow-sm"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={addProject}
        className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-slate-200 hover:border-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl text-slate-500 transition-colors font-bold text-sm"
      >
        <Plus size={18} /> Add project
      </button>
    </div>
  );
};

export default Projects;
