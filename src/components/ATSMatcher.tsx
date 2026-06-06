import { FC, useState } from 'react';
import { Target, Loader2, CheckCircle2, XCircle, AlertCircle, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const GRAD = 'linear-gradient(135deg, #7c3aed, #0ea5e9)';

interface ATSResult {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
  verdict: string;
}

const ScoreArc: FC<{ score: number }> = ({ score }) => {
  const color = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';
  const label = score >= 75 ? 'Strong Match' : score >= 50 ? 'Moderate Match' : 'Weak Match';
  return (
    <div className="flex flex-col items-center py-5">
      <div className="relative w-28 h-28">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
          <circle cx="60" cy="60" r="50" fill="none" stroke={color} strokeWidth="12"
            strokeDasharray={`${(score / 100) * 314} 314`} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black" style={{ color }}>{score}</span>
          <span className="text-[10px] text-slate-500 font-bold">/ 100</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-bold" style={{ color }}>{label}</span>
    </div>
  );
};

const KeywordPill: FC<{ word: string; matched: boolean }> = ({ word, matched }) => (
  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
    matched ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
  }`}>
    {matched ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
    {word}
  </span>
);

const ATSMatcher: FC = () => {
  const { data } = useResume();
  const [jobDesc, setJobDesc] = useState('');
  const [result, setResult] = useState<ATSResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleMatch = async () => {
    if (!jobDesc.trim()) return;
    setLoading(true);
    setResult(null);

    const prompt = `You are an ATS (Applicant Tracking System) expert. Compare this resume to the job description and return a JSON object with:
- score: number 0-100 (how well the resume matches the job)
- matchedKeywords: array of strings (important keywords from the job description found in the resume, max 12)
- missingKeywords: array of strings (important keywords from the job description NOT in the resume, max 10)
- suggestions: array of 3-4 specific action strings to improve the ATS score
- verdict: one sentence summary of fit

Respond ONLY with valid JSON, no markdown, no backticks.

Job Description:
${jobDesc}

Resume Data:
${JSON.stringify({
  summary: data.summary,
  skills: data.skills,
  experience: data.experience.map(e => ({ title: e.jobTitle, company: e.company, description: e.description })),
  education: data.education.map(e => ({ degree: e.degree, field: e.fieldOfStudy })),
}, null, 2)}`;

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const raw = await res.json();
      const text = raw.text.trim().replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
      setResult(JSON.parse(text));
    } catch {
      // silent fail
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
      <div className="p-2 pb-0">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]" style={{ background: GRAD }}>
            <Target size={20} />
          </div>
          <div>
            <h2 className="text-[20px] font-bold text-white leading-tight">ATS Matcher</h2>
            <p className="text-xs text-slate-400">Match against job description</p>
          </div>
        </div>

        <textarea
          value={jobDesc}
          onChange={e => setJobDesc(e.target.value)}
          placeholder="Paste Job Description here..."
          rows={5}
          className="w-full p-3.5 text-sm bg-[#0F172A] border border-white/10 rounded-xl resize-none outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-300 placeholder:text-slate-600 custom-scrollbar shadow-inner"
        />

        <button
          onClick={handleMatch}
          disabled={loading || !jobDesc.trim()}
          className="mt-3 w-full py-3 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed text-sm mb-5 shadow-[0_0_20px_rgba(124,58,237,0.3)]"
          style={{ background: GRAD }}
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16} />}
          {loading ? 'Analyzing Match...' : 'Match Resume'}
        </button>
      </div>

      {result && (
        <div className="px-2 pb-6 flex flex-col gap-4">
          <ScoreArc score={result.score} />
          <p className="text-sm text-slate-400 text-center -mt-2 italic font-medium">"{result.verdict}"</p>

          <div className="rounded-xl border border-white/10 bg-[#0F172A] p-4 shadow-sm">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Keyword Match</p>
            <div className="flex flex-wrap gap-1.5">
              {result.matchedKeywords.map(k => <KeywordPill key={k} word={k} matched={true} />)}
              {result.missingKeywords.map(k => <KeywordPill key={k} word={k} matched={false} />)}
            </div>
          </div>

          <div className="rounded-xl border border-primary/20 bg-[#0F172A] shadow-lg overflow-hidden">
            <button
              onClick={() => setShowSuggestions(s => !s)}
              className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
            >
              <span className="text-xs font-bold uppercase tracking-wide text-primary">
                <AlertCircle size={12} className="inline mr-1.5 mb-0.5" />
                {result.suggestions.length} Improvement Tips
              </span>
              {showSuggestions ? <ChevronUp size={14} className="text-slate-500" /> : <ChevronDown size={14} className="text-slate-500" />}
            </button>
            {showSuggestions && (
              <ul className="px-4 pb-4 flex flex-col gap-2">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="text-xs text-slate-300 flex gap-2 bg-primary/10 rounded-lg p-2.5 border border-primary/10">
                    <span className="text-primary font-black shrink-0">{i + 1}.</span>
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSMatcher;
