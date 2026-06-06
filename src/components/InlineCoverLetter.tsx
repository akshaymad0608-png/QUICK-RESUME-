import { FC, useState } from 'react';
import { Mail, Loader2, Wand2, Copy, Download, CheckCircle2 } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { generateCoverLetter } from '../services/geminiService';
import toast from 'react-hot-toast';
import html2pdf from 'html2pdf.js';
import { coverLetterExamples } from '../data/examples';

const GRAD = 'linear-gradient(135deg, #7c3aed, #0ea5e9)';
const PURPLE = '#7c3aed';

const InlineCoverLetter: FC = () => {
  const { data } = useResume();
  const [jobDesc, setJobDesc] = useState('');
  const [letter, setLetter] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleGenerate = async () => {
    if (!jobDesc.trim()) return;
    setLoading(true);
    setLetter('');
    try {
      const output = await generateCoverLetter(data as unknown as Record<string, unknown>, jobDesc);
      setLetter(output);
    } catch {
      toast.error('Failed to generate cover letter, please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!letter) return;
    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Copied!');
  };

  const handleDownload = () => {
    if (!letter) return;
    setDownloading(true);
    const el = document.createElement('div');
    const NameStr = data.personalInfo.firstName ? `${data.personalInfo.firstName} ${data.personalInfo.lastName}` : '[Your Name]';
    el.innerHTML = `<div style="font-family: Arial, sans-serif; padding: 2rem; font-size: 14px; line-height: 1.8; white-space: pre-wrap; color: #1e293b;">${letter.replace(/\[Your Name\]/gi, NameStr)}</div>`;
    const name = data.personalInfo.firstName ? `${data.personalInfo.firstName}_CoverLetter` : 'CoverLetter';
    html2pdf().set({ margin: 10, filename: `${name}.pdf`, html2canvas: { scale: 2 }, jsPDF: { unit: 'mm', format: 'a4' } })
      .from(el).save()
      .then(() => { setDownloading(false); toast.success('PDF downloaded!'); });
  };

  const applyExample = (key: string) => {
      let example = coverLetterExamples[key];
      const NameStr = data.personalInfo.firstName ? `${data.personalInfo.firstName} ${data.personalInfo.lastName}` : '[Your Name]';
      example = example.replace(/\[Your Name\]/g, NameStr);
      setLetter(example);
      toast.success('Example applied!');
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm" style={{ background: GRAD }}>
            <Mail size={20} />
          </div>
          <div>
            <h2 className="text-[20px] font-bold text-gray-900 leading-tight">Cover Letter</h2>
            <p className="text-xs text-gray-400">Generate an AI tailored letter</p>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Job Description</label>
          <textarea
            value={jobDesc}
            onChange={e => setJobDesc(e.target.value)}
            placeholder="Paste job description here..."
            rows={4}
            className="w-full p-3 text-sm border border-gray-200 rounded-xl resize-none outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-200 text-gray-700 placeholder-gray-300"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !jobDesc.trim()}
          className="w-full py-2.5 mb-4 text-white font-bold rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed text-[13.5px]"
          style={{ background: GRAD }}
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Wand2 size={16} />}
          {loading ? 'Writing your letter...' : letter ? 'Regenerate' : 'AI Generate'}
        </button>

        <div className="mb-6 pt-4 border-t border-gray-100">
           <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">Quick Examples (Or pick pre-written)</label>
           <div className="flex flex-wrap gap-2">
             {Object.keys(coverLetterExamples).map(key => (
               <button
                 key={key}
                 onClick={() => applyExample(key)}
                 className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-purple-200 text-purple-700 bg-purple-50 hover:bg-purple-100 transition-colors"
               >
                 {key.replace('_', ' ')}
               </button>
             ))}
           </div>
        </div>

        {letter && (
          <div className="mt-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Your Cover Letter</p>
              <div className="flex gap-2">
                <button onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all hover:bg-purple-50"
                  style={{ borderColor: '#ddd6fe', color: PURPLE }}>
                  {copied ? <CheckCircle2 size={12} className="text-emerald-500" /> : <Copy size={12} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button onClick={handleDownload} disabled={downloading}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ background: GRAD }}>
                  {downloading ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                  PDF
                </button>
              </div>
            </div>

            <textarea
              value={letter}
              onChange={e => setLetter(e.target.value)}
              rows={18}
              className="w-full p-4 text-[13px] leading-relaxed text-gray-700 border border-gray-200 rounded-xl outline-none resize-none focus:border-purple-300 bg-white font-sans shadow-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InlineCoverLetter;
