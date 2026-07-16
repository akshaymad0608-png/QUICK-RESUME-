import { FC, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { FileText, Feather, Wand2, Copy, Download, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useResume } from '../context/ResumeContext';
import { generateCoverLetter } from '../services/geminiService';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';


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

  const handleDownloadPDF = async () => {
    if (!coverLetter) return;
    setIsDownloading(true);
    
    const el = document.createElement('div');
    el.style.position = 'absolute';
    el.style.left = '0';
    el.style.top = '0';
    el.style.zIndex = '-9999';
    el.style.width = '800px';
    el.style.padding = '40px';
    el.style.backgroundColor = 'white';
    el.style.color = 'black';
    el.style.fontFamily = 'Arial, sans-serif';
    el.style.fontSize = '14px';
    el.style.lineHeight = '1.6';
    el.style.whiteSpace = 'pre-wrap';
    el.innerText = coverLetter;
    
    document.body.appendChild(el);

    try {
      const canvas = await html2canvas(el, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const contentHeight = (canvas.height * pdfWidth) / canvas.width;
      
      let heightLeft = contentHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, contentHeight);
      heightLeft -= pdfHeight;
      
      while (heightLeft > 0) {
        position = position - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, contentHeight);
        heightLeft -= pdfHeight;
      }
      
      pdf.save('Cover_Letter.pdf');
      toast.success('PDF downloaded!');
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF");
    } finally {
      document.body.removeChild(el);
      setIsDownloading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-50 text-slate-600 flex flex-col font-sans pt-[72px] bg-grid-pattern relative">\n      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 to-slate-50 pointer-events-none z-0"></div>
      <Helmet>
        <title>AI Cover Letter Builder | QuickResume</title>
        <meta name="description" content="Generate a customized, professional cover letter in seconds matching your resume using AI." />
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
          <button 
            onClick={() => navigate('/build')}
            className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors border border-slate-200 rounded-lg px-4 py-2 bg-white hover:bg-slate-50 shadow-sm"
          >
            Back to Editor
          </button>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 flex flex-col gap-8 lg:flex-row relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-slate-100/50 to-transparent pointer-events-none"></div>\n        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>\n        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Left Column: Input */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 lg:h-[calc(100vh-140px)] relative z-10">
          <div className="bg-white p-6 lg:p-8 rounded-3xl border border-slate-200 flex flex-col h-full shadow-sm">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-900 text-xs font-bold mb-4 uppercase tracking-widest border border-slate-200">
                <Wand2 className="w-3.5 h-3.5" /> AI Generator
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Create your cover letter</h2>
              <p className="text-slate-500 leading-relaxed">
                Paste the job description below, and our AI will write a tailored cover letter based on your current resume data.
              </p>
            </div>

            
            
            <textarea
  
              className="flex-1 w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none resize-none mb-6 text-slate-900 placeholder:text-slate-600 transition-all custom-scrollbar"
              placeholder="Paste the job description here... (e.g., We are looking for a software engineer with 5 years of React experience)"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />

            <button
              className="w-full bg-teal-600 text-white font-bold rounded-2xl py-4 flex items-center justify-center gap-2 hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-slate-300/50"
              onClick={handleGenerate}
              disabled={isGenerating || !jobDescription.trim()}
            >
              {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Wand2 size={20} />}
              {isGenerating ? 'Generating...' : 'Generate Cover Letter'}
            </button>
          </div>
        </div>

        {/* Right Column: Output */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 lg:h-[calc(100vh-140px)] relative z-10">
          <div className="bg-white p-6 lg:p-8 rounded-3xl border border-slate-200 flex flex-col h-full shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">Your Document</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  disabled={!coverLetter}
                  className="p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors disabled:opacity-30 border border-transparent"
                  title="Copy to clipboard"
                >
                  <Copy size={20} />
                </button>
                <button
                  onClick={handleDownloadPDF}
                  disabled={!coverLetter || isDownloading}
                  className="p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors disabled:opacity-30 border border-transparent"
                  title="Download as PDF"
                >
                  {isDownloading ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
                </button>
              </div>
            </div>

            {coverLetter ? (
              <textarea
                className="flex-1 w-full bg-white p-6 border border-slate-200 rounded-2xl focus:border-slate-400 focus:ring-1 focus:ring-slate-400 outline-none resize-none text-[15px] leading-relaxed whitespace-pre-wrap font-sans text-slate-600 shadow-inner custom-scrollbar"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              />
            ) : (
              <div className="flex-1 w-full border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center text-slate-500 bg-slate-50">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-4 shadow-sm">
                   <FileText className="w-6 h-6 text-slate-600" />
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
