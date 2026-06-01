import { FC, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { UploadCloud, PenLine, ArrowLeft, FileUp, Loader2 } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import toast from 'react-hot-toast';

const Start: FC = () => {
  const navigate = useNavigate();
  const { setData, data } = useResume();
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
          extractedData.experience = extractedData.experience.map((e: any) => ({ ...e, id: crypto.randomUUID() }));
        }
        if (extractedData.education && Array.isArray(extractedData.education)) {
          extractedData.education = extractedData.education.map((e: any) => ({ ...e, id: crypto.randomUUID() }));
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
          design: prevData.design // Keep existing design settings
        }));

        const isActuallyEmpty = 
          !extractedData.personalInfo?.firstName &&
          !extractedData.summary &&
          (!extractedData.experience || extractedData.experience.length === 0) &&
          (!extractedData.education || extractedData.education.length === 0);

        if (isActuallyEmpty) {
          toast.error('Could not read text from your file (it might be an image or unsupported format).', { id: 'upload', duration: 5000 });
        } else {
          toast.success('Resume imported successfully!', { id: 'upload' });
        }
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
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Helmet>
        <title>Start your resume | QuickResume.business</title>
      </Helmet>

      <header className="px-8 py-6 flex justify-start items-center">
        <button 
          onClick={() => showUpload ? setShowUpload(false) : navigate('/')} 
          disabled={isUploading}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium disabled:opacity-50"
        >
          <ArrowLeft size={20} /> {showUpload ? "Back to Options" : "Back to Home"}
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-4xl mx-auto w-full">
        {!showUpload ? (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">How do you want to start?</h1>
            <p className="text-gray-500 text-center mb-12">Choose how you'd like to build your new resume.</p>

            <div className="grid md:grid-cols-2 gap-6 w-full">
              {/* Upload Card */}
              <button 
                onClick={() => setShowUpload(true)} 
                className="group relative bg-white border-2 border-transparent hover:border-blue-500 rounded-2xl p-8 hover:shadow-xl transition-all flex flex-col text-left"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                  <UploadCloud size={32} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">I already have a resume</h2>
                <p className="text-gray-500 flex-1">Upload your existing resume to make quick edits, change templates, or let AI improve it.</p>
                <div className="mt-8 text-blue-500 font-semibold group-hover:translate-x-2 transition-transform inline-flex items-center gap-1">
                  Upload Resume →
                </div>
              </button>

              {/* Start from scratch Card */}
              <Link to="/choose-template" className="group bg-white border-2 border-transparent hover:border-blue-500 rounded-2xl p-8 hover:shadow-xl transition-all flex flex-col">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                  <PenLine size={32} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Start from scratch</h2>
                <p className="text-gray-500 flex-1">Our AI will guide you through creating a new resume step by step. We'll even write your summary!</p>
                <div className="mt-8 text-blue-500 font-semibold group-hover:translate-x-2 transition-transform inline-flex items-center gap-1">
                  Create New →
                </div>
              </Link>
            </div>
          </>
        ) : (
          <div 
            className="w-full max-w-3xl bg-white rounded-3xl p-6 md:p-16 border-2 border-dashed border-gray-300 text-center relative group hover:border-blue-400 transition-colors cursor-pointer" 
            onClick={() => { if (!isUploading) fileInputRef.current?.click(); }}
            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (isUploading) return;
              if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                handleFileUpload({ target: { files: e.dataTransfer.files } } as unknown as React.ChangeEvent<HTMLInputElement>);
              }
            }}
          >
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept=".pdf,.doc,.docx,.html,.txt"
              disabled={isUploading}
            />
            <div className="w-20 h-20 mx-auto mb-8 flex items-center justify-center text-gray-400 group-hover:text-blue-500 transition-colors">
              {isUploading ? <Loader2 size={64} className="animate-spin text-blue-500" strokeWidth={1} /> : <FileUp size={64} strokeWidth={1} />}
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {isUploading ? 'Analyzing and importing...' : 'Drag and drop your resume here'}
            </h2>
            <p className="text-gray-400 text-lg mb-8">or</p>
            
            <button 
              disabled={isUploading}
              className="px-8 py-3.5 bg-[#0ea5e9] hover:bg-[#0284c7] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors mb-8 shadow-sm text-lg"
              onClick={(e) => { e.stopPropagation(); if (!isUploading) fileInputRef.current?.click(); }}
            >
              Upload from device
            </button>
            
            <p className="text-gray-400 font-medium text-lg">Files we can read: DOCX, PDF, HTML, TXT</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Start;
