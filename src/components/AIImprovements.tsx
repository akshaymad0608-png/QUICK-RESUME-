import { FC, useState } from 'react';
import { Sparkles, Loader2, Lightbulb, ChevronDown, ChevronUp, AlertCircle, AlertTriangle, Info, CheckCircle2, Wand2, RefreshCw } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { getResumeSuggestions, ResumeSuggestions } from '../services/geminiService';

const PURPLE = '#7c3aed';
const GRAD = 'linear-gradient(135deg, #7c3aed, #0ea5e9)';

type Priority = 'high' | 'medium' | 'low';

interface Suggestion {
  title: string;
  detail: string;
  priority: Priority;
  quickFix?: string;
  fixTarget?: 'summary';
}

interface SectionResult {
  section: string;
  score: number;
  suggestions: Suggestion[];
}

const priorityConfig: Record<Priority, { label: string; color: string; bg: string; Icon: React.ElementType }> = {
  high: { label: 'High', color: '#dc2626', bg: '#fef2f2', Icon: AlertCircle },
  medium: { label: 'Medium', color: '#d97706', bg: '#fffbeb', Icon: AlertTriangle },
  low: { label: 'Low', color: '#2563eb', bg: '#eff6ff', Icon: Info },
};

const ScoreRing: FC<{ score: number; size?: number }> = ({ score, size = 56 }) => {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 75 ? '#10b981' : score >= 50 ? '#d97706' : '#dc2626';
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={6} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={6}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      <text x={size / 2} y={size / 2 + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill={color}>{score}</text>
    </svg>
  );
};

const SectionCard: FC<{ result: SectionResult; onApplyFix: (fix: string, target: string) => void }> = ({ result, onApplyFix }) => {
  const [open, setOpen] = useState(true);
  const hasSuggestions = result.suggestions.length > 0;

  return (
    <div className="rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm mb-3">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <ScoreRing score={result.score} size={44} />
          <div className="text-left">
            <p className="font-bold text-gray-900 text-sm">{result.section}</p>
            <p className="text-xs text-gray-400">{hasSuggestions ? `${result.suggestions.length} suggestion${result.suggestions.length > 1 ? 's' : ''}` : 'Looks great!'}</p>
          </div>
        </div>
        {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
      </button>

      {open && hasSuggestions && (
        <div className="px-4 pb-4 flex flex-col gap-2 border-t border-gray-50">
          {result.suggestions.map((s, i) => {
            const { Icon, color, bg, label } = priorityConfig[s.priority];
            return (
              <div key={i} className="rounded-lg p-3 mt-2" style={{ background: bg }}>
                <div className="flex items-start gap-2">
                  <Icon size={15} style={{ color, marginTop: 2, flexShrink: 0 }} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold" style={{ color }}>{label}</span>
                      <span className="font-semibold text-gray-800 text-xs">{s.title}</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{s.detail}</p>
                    {s.quickFix && s.fixTarget && (
                      <button
                        onClick={() => onApplyFix(s.quickFix!, s.fixTarget!)}
                        className="mt-2 flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg text-white transition-all hover:opacity-90"
                        style={{ background: GRAD }}
                      >
                        <Wand2 size={12} /> Apply Fix
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {open && !hasSuggestions && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-50 flex items-center gap-2 text-emerald-600">
          <CheckCircle2 size={14} />
          <span className="text-xs font-medium">This section looks solid!</span>
        </div>
      )}
    </div>
  );
};

const OverallScore: FC<{ score: number }> = ({ score }) => {
  const label = score >= 80 ? 'Excellent' : score >= 65 ? 'Good' : score >= 45 ? 'Needs Work' : 'Poor';
  const color = score >= 80 ? '#10b981' : score >= 65 ? '#d97706' : score >= 45 ? '#f59e0b' : '#dc2626';
  return (
    <div className="rounded-2xl p-5 mb-5 flex items-center gap-5" style={{ background: 'linear-gradient(135deg, #f5f3ff, #eff6ff)', border: '1.5px solid #ddd6fe' }}>
      <ScoreRing score={score} size={72} />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-0.5">Overall Score</p>
        <p className="text-2xl font-black" style={{ color }}>{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{score}/100 — {score < 60 ? 'Several improvements needed' : score < 80 ? 'A few tweaks can make it shine' : 'Ready to impress recruiters'}</p>
      </div>
    </div>
  );
};

const AIImprovements: FC = () => {
  const { data, updateSection } = useResume();
  const [results, setResults] = useState<ResumeSuggestions | null>(null);
  const [loading, setLoading] = useState(false);
  const [appliedFixes, setAppliedFixes] = useState<string[]>([]);

  const handleAnalyze = async () => {
    setLoading(true);
    setResults(null);
    try {
      const suggestions = await getResumeSuggestions(data as unknown as Record<string, unknown>);
      setResults(suggestions);
    } catch {
      // fallback: show error in UI
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFix = (fix: string, target: string) => {
    if (target === 'summary') {
      updateSection('summary', fix);
      setAppliedFixes(prev => [...prev, fix.slice(0, 20)]);
    }
  };

  return (
    <div className="p-6 flex flex-col h-full overflow-y-auto custom-scrollbar">
      <div className="flex items-center gap-3 mb-5 shrink-0">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm" style={{ background: GRAD }}>
          <Sparkles size={20} />
        </div>
        <div>
          <h2 className="text-[20px] font-bold text-gray-900 leading-tight">AI Improvements</h2>
          <p className="text-xs text-gray-400">Section-by-section feedback</p>
        </div>
      </div>

      {!results && !loading && (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-inner" style={{ background: '#f5f3ff' }}>
            <Lightbulb size={32} className="text-amber-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Get Smart Suggestions</h3>
          <p className="text-gray-500 text-sm max-w-[260px] leading-relaxed mb-8">
            Our AI scores each section of your resume and gives you specific, actionable tips to stand out to recruiters.
          </p>
          <button
            onClick={handleAnalyze}
            className="px-7 py-3 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2 hover:opacity-90 text-sm"
            style={{ background: GRAD }}
          >
            <Sparkles size={16} /> Analyze My Resume
          </button>
        </div>
      )}

      {loading && (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
          <Loader2 size={44} className="animate-spin mb-5" style={{ color: PURPLE }} />
          <p className="text-gray-700 font-semibold text-base mb-1">Analyzing your resume…</p>
          <p className="text-gray-400 text-xs">Checking each section for improvements</p>
        </div>
      )}

      {results && !loading && (
        <div className="flex flex-col">
          <OverallScore score={results.overallScore} />
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Section Breakdown</p>
          {results.sections.map((s, i) => (
            <SectionCard key={i} result={s} onApplyFix={handleApplyFix} />
          ))}
          {appliedFixes.length > 0 && (
            <div className="flex items-center gap-2 mt-2 mb-3 text-emerald-600 text-xs font-medium">
              <CheckCircle2 size={14} />
              {appliedFixes.length} fix{appliedFixes.length > 1 ? 'es' : ''} applied to your resume
            </div>
          )}
          <button
            onClick={handleAnalyze}
            className="mt-2 w-full py-2.5 flex items-center justify-center gap-2 text-sm font-bold rounded-xl border transition-all hover:bg-purple-50"
            style={{ borderColor: '#ddd6fe', color: PURPLE }}
          >
            <RefreshCw size={14} /> Re-analyze
          </button>
        </div>
      )}
    </div>
  );
};

export default AIImprovements;
