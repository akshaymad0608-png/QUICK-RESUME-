import { FC, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft, Wand2, Copy, Download, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useResume } from '../context/ResumeContext';
import { generateCoverLetter } from '../services/geminiService';
import html2pdf from 'html2pdf.js';

const CoverLetterGenerator: FC = () => {
  const { data } = useResume();
  const [jobDescription, setJobDescription] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleGenerate = async () => {
    if (!jobDescription || jobDescription.trim().length < 10) {
      toast.error('Please enter a longer job description.');
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
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Helmet>
        <title>AI Cover Letter Generator | QuickResume</title>
      </Helmet>

      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-gray-500 hover:text-gray-800 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div className="text-xl font-bold flex items-center gap-2 text-gray-900">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white">
              <FileText size={18} />
            </div>
            QuickResume
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 flex flex-col gap-6 md:flex-row">
        {/* Left Column: Input */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Generate Cover Letter</h2>
            <p className="text-sm text-gray-600 mb-6">
              Paste the job description below. We'll use your currently saved resume data and our AI to generate a tailored cover letter.
            </p>

            <textarea
              className="flex-1 w-full p-4 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none mb-6"
              placeholder="Paste job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !jobDescription.trim()}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Wand2 size={20} />}
              {isGenerating ? 'Generating...' : 'Generate with AI'}
            </button>
          </div>
        </div>

        {/* Right Column: Output */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Your Cover Letter</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  disabled={!coverLetter}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-30"
                  title="Copy to clipboard"
                >
                  <Copy size={20} />
                </button>
                <button
                  onClick={handleDownloadPDF}
                  disabled={!coverLetter || isDownloading}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-30"
                  title="Download as PDF"
                >
                  {isDownloading ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
                </button>
              </div>
            </div>

            {coverLetter ? (
              <textarea
                className="flex-1 w-full bg-gray-50 p-6 border border-gray-200 rounded-xl focus:border-blue-500 outline-none resize-none text-[14px] leading-relaxed whitespace-pre-wrap font-sans"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              />
            ) : (
              <div className="flex-1 w-full border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center p-8 text-center text-gray-400">
                Generated cover letter will appear here.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CoverLetterGenerator;
