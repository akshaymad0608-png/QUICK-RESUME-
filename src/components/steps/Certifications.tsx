import { FC } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const Certifications: FC = () => {
  const { data, updateSection } = useResume();
  const certifications = data.certifications || [];

  const addCertification = () => {
    updateSection('certifications', [
      ...certifications,
      { id: Date.now().toString(), name: '', issuer: '', date: '', link: '' }
    ]);
  };

  const removeCertification = (id: string) => {
    updateSection('certifications', certifications.filter(c => c.id !== id));
  };

  const updateCertification = (id: string, field: string, value: string) => {
    updateSection('certifications', certifications.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {certifications.map((cert) => (
          <div key={cert.id} className="relative bg-white border border-slate-200 p-6 rounded-2xl shadow-sm transition-colors group hover:border-slate-300">
            <button 
              onClick={() => removeCertification(cert.id)}
              className="absolute top-6 right-6 text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100 bg-white/5 p-1.5 rounded-lg shadow-sm"
            >
              <Trash2 size={16} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Certification Name</label>
                <input 
                  type="text" value={cert.name} onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400 transition-colors placeholder:text-slate-600 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Issuer</label>
                <input 
                  type="text" value={cert.issuer} onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400 transition-colors placeholder:text-slate-600 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Date</label>
                <input 
                  type="text" value={cert.date} onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400 transition-colors placeholder:text-slate-600 shadow-sm"
                  placeholder="YYYY"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Link (Optional)</label>
                <input 
                  type="text" value={cert.link} onChange={(e) => updateCertification(cert.id, 'link', e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400 transition-colors placeholder:text-slate-600 shadow-sm"
                  placeholder="https://"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={addCertification}
        className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-slate-200 hover:border-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl text-slate-500 transition-colors font-bold text-sm"
      >
        <Plus size={18} /> Add certification
      </button>
    </div>
  );
};

export default Certifications;
