import { FC, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, FileText, PenLine, Loader2, ArrowLeft } from 'lucide-react';
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
    <div className="min-h-screen bg-[var(--color-bg-surface)] text-body flex flex-col font-sans pt-[72px]">
      <Helmet>
        <title>Dashboard | QuickResume</title>
      </Helmet>

      {/* Navbar Minimal */}
      <nav className="fixed top-0 left-0 right-0 h-[72px] bg-white border-b border-[var(--color-border)] px-6 lg:px-10 flex items-center justify-between z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <i className="ti ti-file-description text-white text-xl"></i>
          </div>
          <span className="text-xl font-bold text-heading tracking-tight">QuickResume</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm">
            ME
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-12 flex flex-col">
        
        {!showUpload ? (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-heading mb-1">Dashboard</h1>
                <p className="text-muted">Manage your documents and track your applications.</p>
              </div>
              <button 
                onClick={() => setShowUpload(true)}
                className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm"
              >
                <FileText size={18} />
                Create New Resume
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl border border-[var(--color-border)] shadow-sm flex items-center gap-4 cursor-pointer hover:border-primary transition-colors" onClick={() => navigate('/build')}>
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">3</div>
                  <div className="text-sm font-medium text-gray-500">My Resumes</div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-[var(--color-border)] shadow-sm flex items-center gap-4 cursor-pointer hover:border-primary transition-colors" onClick={() => navigate('/build')}>
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                  <PenLine size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">Software Eng</div>
                  <div className="text-sm font-medium text-gray-500">Recently Edited</div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-[var(--color-border)] shadow-sm flex items-center gap-4 cursor-pointer hover:border-primary transition-colors" onClick={() => navigate('/build')}>
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl font-bold">
                  85
                </div>
                <div>
                  <div className="text-xl font-bold text-emerald-600">Excellent</div>
                  <div className="text-sm font-medium text-gray-500">Avg ATS Score</div>
                </div>
              </div>
            </div>

            <div className="bg-white border text-center border-[var(--color-border)] rounded-2xl p-8 mb-8 shadow-sm">
              <h2 className="text-xl font-bold text-heading mb-6 text-left">Your Resumes</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 {/* Existing Resume Mock */}
                 <div className="border border-gray-200 rounded-xl p-4 flex flex-col hover:border-primary transition-colors cursor-pointer group text-left relative" onClick={() => navigate('/build')}>
                   <div className="absolute top-2 right-2 bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-[4px] z-10 border border-emerald-200">
                     ATS: 92
                   </div>
                   <div className="bg-[#f8fafc] h-56 rounded-lg mb-4 flex justify-center border border-gray-100 overflow-hidden relative pt-4 shadow-inner">
                      <div className="absolute inset-x-8 top-8 bottom-0 bg-white border border-gray-200 rounded-t shadow-sm px-4 pt-4 text-[6px] text-gray-300">
                        <div className="h-2 w-1/3 bg-gray-300 mb-2 rounded"></div>
                        <div className="h-1 w-full bg-gray-200 mb-1 rounded"></div>
                        <div className="h-1 w-full bg-gray-200 mb-1 rounded"></div>
                        <div className="h-1 w-3/4 bg-gray-200 rounded mb-4"></div>
                        <div className="h-2 w-1/4 bg-gray-300 mb-2 rounded"></div>
                        <div className="h-1 w-full bg-gray-200 mb-1 rounded"></div>
                        <div className="h-1 w-full bg-gray-200 mb-1 rounded"></div>
                      </div>
                   </div>
                   <h3 className="font-semibold text-heading text-[15px] mb-1 truncate group-hover:text-primary transition-colors">Software Engineer - Default</h3>
                   <p className="text-[12px] text-gray-500 mb-4 flex items-center gap-1.5">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                     Edited 2 mins ago
                   </p>
                   <div className="flex gap-2">
                     <button className="flex-1 py-1.5 px-3 bg-gray-100 text-gray-700 rounded font-bold text-[12px] text-center border-none hover:bg-gray-200 transition-colors">Duplicate</button>
                     <button className="flex-1 py-1.5 px-3 bg-primary text-white rounded font-bold text-[12px] text-center border-none hover:bg-primary-hover transition-colors">Edit</button>
                   </div>
                 </div>

                 {/* Existing Resume Mock 2 */}
                 <div className="border border-gray-200 rounded-xl p-4 flex flex-col hover:border-primary transition-colors cursor-pointer group text-left relative" onClick={() => navigate('/build')}>
                   <div className="absolute top-2 right-2 bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-[4px] z-10 border border-gray-200">
                     ATS: --
                   </div>
                   <div className="bg-[#f8fafc] h-56 rounded-lg mb-4 flex justify-center border border-gray-100 overflow-hidden relative pt-4 shadow-inner">
                      <div className="absolute inset-x-8 top-8 bottom-0 bg-white border border-gray-200 rounded-t shadow-sm px-4 pt-4 text-[6px] text-gray-300">
                        <div className="h-2 w-1/3 bg-gray-300 mb-2 rounded"></div>
                        <div className="h-1 w-full bg-gray-200 mb-1 rounded"></div>
                        <div className="h-1 w-full bg-gray-200 mb-1 rounded"></div>
                        <div className="h-1 w-3/4 bg-gray-200 rounded mb-4"></div>
                      </div>
                   </div>
                   <h3 className="font-semibold text-heading text-[15px] mb-1 truncate group-hover:text-primary transition-colors">Product Manager Draft</h3>
                   <p className="text-[12px] text-gray-500 mb-4 flex items-center gap-1.5">
                     <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                     Edited 2 days ago
                   </p>
                   <div className="flex gap-2">
                     <button className="flex-1 py-1.5 px-3 bg-gray-100 text-gray-700 rounded font-bold text-[12px] text-center border-none hover:bg-gray-200 transition-colors">Duplicate</button>
                     <button className="flex-1 py-1.5 px-3 bg-primary text-white rounded font-bold text-[12px] text-center border-none hover:bg-primary-hover transition-colors">Edit</button>
                   </div>
                 </div>

                 {/* Create New Card */}
                 <div className="border-2 border-dashed border-primary/30 rounded-xl flex flex-col items-center justify-center bg-blue-50/30 hover:bg-blue-50/60 hover:border-primary/60 transition-all cursor-pointer group h-full min-h-[300px]" onClick={() => setShowUpload(true)}>
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-4">
                      <FileText size={24} />
                    </div>
                    <span className="font-bold text-primary group-hover:text-primary-hover transition-colors">Create New Resume</span>
                 </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <button 
              onClick={() => setShowUpload(false)} 
              disabled={isUploading}
              className="flex items-center gap-2 text-primary hover:text-primary-hover transition-colors font-semibold self-start mb-8 disabled:opacity-50"
            >
              <ArrowLeft size={18} /> Back to Dashboard
            </button>

            <h1 className="text-3xl md:text-4xl font-bold text-heading mb-4 text-center">How would you like to start?</h1>
            <p className="text-lg text-muted mb-12 text-center max-w-2xl">Create a new resume from scratch, or upload an existing one to redesign and improve it automatically.</p>
            
            <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
              {/* Import Card */}
              <div 
                className="bg-white p-8 rounded-2xl border border-[var(--color-border)] hover:border-primary transition-all cursor-pointer shadow-sm group text-center"
                onClick={() => { if (!isUploading) fileInputRef.current?.click(); }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary-light text-primary flex items-center justify-center mx-auto mb-6">
                  {isUploading ? <Loader2 size={32} className="animate-spin" /> : <UploadCloud size={32} />}
                </div>
                <h2 className="text-2xl font-bold text-heading mb-3">Upload your resume</h2>
                <p className="text-body mb-6">We'll automatically extract your information and format it.</p>
                <div className="text-primary font-semibold group-hover:underline">Browse files...</div>
                
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
                className="bg-white p-8 rounded-2xl border border-[var(--color-border)] hover:border-primary transition-all cursor-pointer shadow-sm group text-center"
                onClick={() => navigate('/choose-template')}
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-6">
                  <PenLine size={32} />
                </div>
                <h2 className="text-2xl font-bold text-heading mb-3">Start from scratch</h2>
                <p className="text-body mb-6">Choose a template and follow our guided step-by-step assistant.</p>
                <div className="text-blue-600 font-semibold group-hover:underline">Choose a template</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Start;
