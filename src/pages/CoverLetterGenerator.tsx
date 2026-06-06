import { FC, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { FileText, Wand2, Copy, Download, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useResume } from '../context/ResumeContext';
import { generateCoverLetter } from '../services/geminiService';
import html2pdf from 'html2pdf.js';

const CoverLetterGenerator: FC = () => {
  const navigate = useNavigate();
  const { data } = useResume();
  const [jobDescription, setJobDescription] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleGenerate = async () => {
    if (!jobDescription || jobDescription.trim().length < 10) {
      toast.error('Please enter a valid job description.');
      return;
    }
    try {
      setIsGenerating(true);
      const output = await generateCoverLetter(data, jobDescription);
      setCoverLetter(output);
      toast.success('Cover letter generated!');
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to generate cover letter');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!coverLetter) return;
    navigator.clipboard.writeText(coverLetter);
    toast.success('Copied to clipboard');
  };

  const handleDownloadPDF = () => {
    if (!coverLetter) return;
    setIsDownloading(true);
    const element = document.createElement('div');
    element.innerHTML = `<div style="font-family: Arial, sans-serif; padding: 2rem; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${coverLetter}</div>`;
    
    const name = data.personalInfo.firstName ? `${data.personalInfo.firstName}_CoverLetter` : 'CoverLetter';

    const opt = {
      margin: 10,
      filename: `${name}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      setIsDownloading(false);
      toast.success('Downloaded PDF');
    });
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-surface)] text-body font-sans flex flex-col pt-[72px]">
      <Helmet>
        <title>Cover Letter Builder | QuickResume</title>
        <meta name="description" content="Generate a customized, professional cover letter in seconds matching your resume." />
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
          <button 
            onClick={() => navigate('/build')}
            className="text-sm font-semibold text-heading hover:text-primary transition-colors border border-gray-300 rounded-lg px-4 py-2 bg-white"
          >
            Back to Editor
          </button>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 flex flex-col gap-8 lg:flex-row">
        
        {/* Left Column: Input */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 h-[calc(100vh-140px)]">
          <div className="bg-white p-6 lg:p-8 rounded-2xl border border-[var(--color-border)] flex flex-col h-full shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-heading mb-2">Create your cover letter</h2>
              <p className="text-sm text-body">
                Paste the job description below, and our AI will write a tailored cover letter based on your resume.
              </p>
            </div>

            <textarea
              className="flex-1 w-full p-4 bg-surface border border-gray-300 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none mb-6 text-heading placeholder:text-gray-400"
              placeholder="E.g., We are looking for a software engineer with 5 years of React experience..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />

            <button
              className="w-full bg-primary text-white font-semibold rounded-xl py-4 flex items-center justify-center gap-2 hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleGenerate}
              disabled={isGenerating || !jobDescription.trim()}
            >
              {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Wand2 size={18} />}
              {isGenerating ? 'Generating...' : 'Generate Cover Letter'}
            </button>
          </div>
        </div>

        {/* Right Column: Output */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 h-[calc(100vh-140px)]">
          <div className="bg-white p-6 lg:p-8 rounded-2xl border border-[var(--color-border)] flex flex-col h-full shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-heading">Your Cover Letter</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  disabled={!coverLetter}
                  className="p-2 text-gray-500 hover:text-heading hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30 border border-transparent"
                  title="Copy to clipboard"
                >
                  <Copy size={20} />
                </button>
                <button
                  onClick={handleDownloadPDF}
                  disabled={!coverLetter || isDownloading}
                  className="p-2 text-gray-500 hover:text-heading hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30 border border-transparent"
                  title="Download as PDF"
                >
                  {isDownloading ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
                </button>
              </div>
            </div>

            {coverLetter ? (
              <textarea
                className="flex-1 w-full bg-white p-6 border border-gray-200 rounded-xl focus:border-primary outline-none resize-none text-[15px] leading-relaxed whitespace-pre-wrap font-sans text-heading shadow-inner custom-scrollbar"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              />
            ) : (
              <div className="flex-1 w-full border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-8 text-center text-gray-400 bg-gray-50">
                <div className="w-16 h-16 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-4 shadow-sm">
                   <FileText className="w-6 h-6 text-gray-400" />
                </div>
                <p className="font-medium text-sm">Your generated document will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CoverLetterGenerator;
