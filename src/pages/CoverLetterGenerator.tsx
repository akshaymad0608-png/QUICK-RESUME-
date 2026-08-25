import { FC, useState } from 'react';
import { Seo } from '../components/Seo';
import { Navbar } from '../components/layout/Navbar';

import { FileText, Wand2, Copy, Download, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useResume } from '../context/ResumeContext';
import { generateCoverLetter } from '../services/geminiService';
import { exportTextToPdf } from '../utils/exportTextPdf';


const CoverLetterGenerator: FC = () => {
  const { data } = useResume();
  const [jobDescription, setJobDescription] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

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
    if (!coverLetter.trim()) {
      toast.error('Generate a cover letter first!');
      return;
    }
    try {
      exportTextToPdf(coverLetter, 'Cover_Letter.pdf');
      toast.success('PDF downloaded!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF.');
    }
  };
  
  return (
    <div className="min-h-screen bg-paper text-body flex flex-col font-sans pt-16 md:pt-[72px] relative selection:bg-pine selection:text-white">
      <Seo
        path="/cover-letter"
        title="Free AI Cover Letter Generator | QuickResume"
        description="Generate a tailored, professional cover letter in seconds. Our AI matches your resume to the job description — free to write and download."
      />

      {/* Navbar Minimal */}
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 flex flex-col gap-8 lg:flex-row">
        {/* Left Column: Input */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 lg:h-[calc(100vh-140px)]">
          <div className="bg-card p-6 lg:p-8 rounded-3xl border border-line flex flex-col h-full shadow-card">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pine-tint text-pine text-xs font-bold mb-4 uppercase tracking-widest">
                <Wand2 className="w-3.5 h-3.5" /> AI Generator
              </div>
              <h1 className="font-display text-3xl font-semibold text-ink mb-3 tracking-tight">Create your cover letter</h1>
              <p className="text-mist leading-relaxed">
                Paste the job description below, and our AI will write a tailored cover letter based on your current resume data.
              </p>
            </div>

            <textarea
              className="flex-1 w-full p-5 bg-paper border border-line rounded-2xl focus:border-pine focus:ring-1 focus:ring-pine outline-none resize-none mb-6 text-ink placeholder:text-mist transition-all custom-scrollbar"
              placeholder="Paste the job description here... (e.g., We are looking for a software engineer with 5 years of React experience)"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />

            <button
              className="w-full bg-pine text-white font-bold rounded-2xl py-4 flex items-center justify-center gap-2 hover:bg-pine-deep transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-card"
              onClick={handleGenerate}
              disabled={isGenerating || !jobDescription.trim()}
            >
              {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Wand2 size={20} />}
              {isGenerating ? 'Generating...' : 'Generate Cover Letter'}
            </button>
          </div>
        </div>

        {/* Right Column: Output */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 lg:h-[calc(100vh-140px)]">
          <div className="bg-card p-6 lg:p-8 rounded-3xl border border-line flex flex-col h-full shadow-card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-xl font-semibold text-ink">Your Document</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  disabled={!coverLetter}
                  className="p-2.5 text-mist hover:text-pine hover:bg-pine-tint rounded-xl transition-colors disabled:opacity-30 border border-transparent"
                  title="Copy to clipboard"
                >
                  <Copy size={20} />
                </button>
                <button
                  onClick={handleDownloadPDF}
                  disabled={!coverLetter}
                  className="p-2.5 text-mist hover:text-pine hover:bg-pine-tint rounded-xl transition-colors disabled:opacity-30 border border-transparent"
                  title="Download as PDF"
                >
                  <Download size={20} />
                </button>
              </div>
            </div>

            {coverLetter ? (
              <textarea
                className="flex-1 w-full bg-card p-6 border border-line rounded-2xl focus:border-pine focus:ring-1 focus:ring-pine outline-none resize-none text-[15px] leading-relaxed whitespace-pre-wrap font-sans text-ink-soft shadow-inner custom-scrollbar"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              />
            ) : (
              <div className="flex-1 w-full border-2 border-dashed border-line rounded-2xl flex flex-col items-center justify-center p-8 text-center text-mist bg-paper">
                <div className="w-16 h-16 rounded-2xl bg-card border border-line flex items-center justify-center mb-4 shadow-card">
                   <FileText className="w-6 h-6 text-mist" />
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
