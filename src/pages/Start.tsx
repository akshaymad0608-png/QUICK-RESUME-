import { FC, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, FileText, Feather, PenLine, Loader2, ArrowLeft} from 'lucide-react';
import { ActualResume } from '../components/TemplateCard';
import { useResume } from '../context/ResumeContext';
import toast from 'react-hot-toast';

const Start: FC = () => {

  const navigate = useNavigate();
  const { setData } = useResume();
  const [showUpload, setShowUpload] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement> | { target: { files: FileList | null } }) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('resume', file);

      try {
        setIsUploading(true);
        toast.loading('Analyzing resume...', { id: 'upload' });
        const res = await fetch('/api/extract-resume', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Failed to extract resume');
        }

        const extractedData = await res.json();
        
        if (extractedData.experience && Array.isArray(extractedData.experience)) {
          extractedData.experience = extractedData.experience.map((e: Record<string, unknown>) => ({ ...e, id: crypto.randomUUID() }));
        }
        if (extractedData.education && Array.isArray(extractedData.education)) {
          extractedData.education = extractedData.education.map((e: Record<string, unknown>) => ({ ...e, id: crypto.randomUUID() }));
        }

        setData((prevData) => ({
          ...prevData,
          ...extractedData,
          personalInfo: {
            ...prevData.personalInfo,
            ...(extractedData.personalInfo || {}),
          },
          experience: extractedData.experience || prevData.experience,
          education: extractedData.education || prevData.education,
          skills: extractedData.skills || prevData.skills,
          summary: extractedData.summary || prevData.summary,
        }));

        toast.success('Resume imported successfully!', { id: 'upload' });
        navigate('/build');
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : 'Error importing resume', { id: 'upload' });
        console.error(error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-600 flex flex-col font-sans pt-[72px] bg-grid-pattern relative">\n      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 to-slate-50 pointer-events-none z-0"></div>
      <Helmet>
        <title>Dashboard | QuickResume</title>
      </Helmet>

      {/* Navbar Minimal */}
      <nav className="fixed top-0 left-0 right-0 h-[72px] bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 lg:px-10 flex items-center justify-between z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-gradient-to-tr from-slate-900 to-slate-700 rounded-lg flex items-center justify-center shadow-lg shadow-slate-300/50">
            <Feather className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold text-slate-900 tracking-tight">QuickResume</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold text-sm">
            ME
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-12 flex flex-col relative z-10">\n        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none -z-10 overflow-hidden">\n          <div className="absolute top-20 left-[5%] w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"></div>\n          <div className="absolute top-40 right-[5%] w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>\n        </div>
        
        {!showUpload ? (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-1">Dashboard</h1>
                <p className="text-slate-500">Manage your documents and track your applications.</p>
              </div>
              <button 
                onClick={() => setShowUpload(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm"
              >
                <FileText size={18} />
                Create New Resume
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-slate-300 transition-colors" onClick={() => navigate('/build')}>
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-xl flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">3</div>
                  <div className="text-sm font-medium text-slate-500">My Resumes</div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-slate-300 transition-colors" onClick={() => navigate('/build')}>
                <div className="w-12 h-12 bg-blue-50 text-blue-600 border-blue-100 rounded-xl flex items-center justify-center">
                  <PenLine size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">Software Eng</div>
                  <div className="text-sm font-medium text-slate-500">Recently Edited</div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-slate-300 transition-colors" onClick={() => navigate('/build')}>
                <div className="w-12 h-12 bg-blue-50 text-blue-600 border-blue-100 rounded-xl flex items-center justify-center text-xl font-bold">
                  85
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-700">Excellent</div>
                  <div className="text-sm font-medium text-slate-500">Avg ATS Score</div>
                </div>
              </div>
            </div>

            <div className="bg-white border text-center border-slate-200 rounded-2xl p-8 mb-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 blur-3xl rounded-full pointer-events-none"></div>
              
              <h2 className="text-xl font-bold text-slate-900 mb-6 text-left relative z-10">Your Resumes</h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                 {/* Existing Resume Mock */}
                 <div className="border border-slate-200 rounded-xl p-4 flex flex-col hover:border-slate-300 bg-white transition-colors cursor-pointer group text-left relative" onClick={() => navigate('/build')}>
                   <div className="absolute top-2 right-2 bg-blue-50 text-blue-600 border-blue-100 text-[10px] font-bold px-2 py-0.5 rounded-[4px] z-10 border border-slate-200">
                     ATS: 92
                   </div>
                   <div className="bg-slate-50 h-56 rounded-lg mb-4 flex justify-center items-start border border-slate-200 overflow-hidden relative pt-4 shadow-inner">
                      <div className="bg-white border border-slate-200 rounded-t shadow-sm overflow-hidden relative w-[198px] h-[280px] shrink-0 opacity-90 group-hover:opacity-100 transition-opacity">
                        <div className="w-[794px] h-[1123px] origin-top-left absolute top-0 left-0 scale-[0.25]">
                          <ActualResume layout="minimal" color="#2563EB" />
                        </div>
                      </div>
                   </div>
                   <h3 className="font-semibold text-slate-900 text-[15px] mb-1 truncate group-hover:text-slate-900 transition-colors">Software Engineer - Default</h3>
                   <p className="text-[12px] text-slate-500 mb-4 flex items-center gap-1.5">
                     <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                     Edited 2 mins ago
                   </p>
                   <div className="flex gap-2">
                     <button className="flex-1 py-1.5 px-3 bg-slate-50 text-slate-600 rounded font-bold text-[12px] text-center border-none hover:bg-slate-100 transition-colors">Duplicate</button>
                     <button className="flex-1 py-1.5 px-3 bg-indigo-600 text-white rounded font-bold text-[12px] text-center border-none hover:bg-indigo-700 transition-colors">Edit</button>
                   </div>
                 </div>

                 {/* Existing Resume Mock 2 */}
                 <div className="border border-slate-200 rounded-xl p-4 flex flex-col hover:border-slate-300 bg-white transition-colors cursor-pointer group text-left relative" onClick={() => navigate('/build')}>
                   <div className="absolute top-2 right-2 bg-slate-500/10 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-[4px] z-10 border border-slate-200">
                     ATS: --
                   </div>
                   <div className="bg-slate-50 h-56 rounded-lg mb-4 flex justify-center items-start border border-slate-200 overflow-hidden relative pt-4 shadow-inner">
                      <div className="bg-white border border-slate-200 rounded-t shadow-sm overflow-hidden relative w-[198px] h-[280px] shrink-0 opacity-90 group-hover:opacity-100 transition-opacity">
                        <div className="w-[794px] h-[1123px] origin-top-left absolute top-0 left-0 scale-[0.25]">
                          <ActualResume layout="modern" color="#0F766E" />
                        </div>
                      </div>
                   </div>
                   <h3 className="font-semibold text-slate-900 text-[15px] mb-1 truncate group-hover:text-slate-900 transition-colors">Product Manager Draft</h3>
                   <p className="text-[12px] text-slate-500 mb-4 flex items-center gap-1.5">
                     <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                     Edited 2 days ago
                   </p>
                   <div className="flex gap-2">
                     <button className="flex-1 py-1.5 px-3 bg-slate-50 text-slate-600 rounded font-bold text-[12px] text-center border-none hover:bg-slate-100 transition-colors">Duplicate</button>
                     <button className="flex-1 py-1.5 px-3 bg-indigo-600 text-white rounded font-bold text-[12px] text-center border-none hover:bg-indigo-700 transition-colors">Edit</button>
                   </div>
                 </div>

                 {/* Create New Card */}
                 <div className="border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center bg-slate-100 hover:bg-slate-100 hover:border-slate-400/60 transition-all cursor-pointer group h-full min-h-[300px]" onClick={() => setShowUpload(true)}>
                    <div className="w-12 h-12 rounded-full bg-slate-50 shadow-sm border border-slate-200 flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform mb-4">
                      <FileText size={24} />
                    </div>
                    <span className="font-bold text-slate-900 group-hover:text-slate-800 transition-colors">Create New Resume</span>
                 </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 relative">
            <button 
              onClick={() => setShowUpload(false)} 
              disabled={isUploading}
              className="flex items-center gap-2 text-slate-900 hover:text-slate-800 transition-colors font-semibold self-start mb-8 disabled:opacity-50"
            >
              <ArrowLeft size={18} /> Back to Dashboard
            </button>

            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">How would you like to start?</h1>
            <p className="text-lg text-slate-500 mb-12 text-center max-w-2xl">Create a new resume from scratch, or upload an existing one to redesign and improve it automatically.</p>
            
            <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
              {/* Import Card */}
              <div 
                className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-slate-400 hover:shadow-[0_0_30px_-5px_rgba(0,0,0,0.1)] transition-all cursor-pointer shadow-sm group text-center"
                onClick={() => { if (!isUploading) fileInputRef.current?.click(); }}
              >
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  {isUploading ? <Loader2 size={32} className="animate-spin" /> : <UploadCloud size={32} />}
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">Upload your resume</h2>
                <p className="text-slate-500 mb-6">We'll automatically extract your information and format it.</p>
                <div className="text-slate-900 font-semibold group-hover:underline">Browse files...</div>
                
                <input 
                  type="file" 
                  className="hidden" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept=".pdf,.doc,.docx"
                  disabled={isUploading}
                />
              </div>

              {/* Start from scratch Card */}
              <div 
                className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-slate-400 hover:shadow-[0_0_30px_-5px_rgba(0,0,0,0.1)] transition-all cursor-pointer shadow-sm group text-center"
                onClick={() => navigate('/choose-template')}
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 border-blue-100 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <PenLine size={32} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">Start from scratch</h2>
                <p className="text-slate-500 mb-6">Choose a template and follow our guided step-by-step assistant.</p>
                <div className="text-slate-700 font-semibold group-hover:underline">Choose a template</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Start;
