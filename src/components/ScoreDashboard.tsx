import { FC, useState, useMemo } from 'react';
import { BarChart2, CheckCircle2, Circle, AlertTriangle, User, Briefcase, GraduationCap, Star, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const GRAD = 'linear-gradient(135deg, #7c3aed, #0ea5e9)';

interface SectionScore {
  name: string;
  score: number;
  maxScore: number;
  items: { label: string; done: boolean; tip?: string }[];
  Icon: React.ElementType;
  color: string;
}

const ProgressBar: FC<{ value: number; color: string }> = ({ value, color }) => (
  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${value}%`, background: color }} />
  </div>
);

const CircleScore: FC<{ score: number; max: number; size?: number; color: string }> = ({ score, max, size = 52, color }) => {
  const pct = max > 0 ? (score / max) * 100 : 0;
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={5} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={5}
        strokeDasharray={`${(pct / 100) * circ} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      <text x={size / 2} y={size / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="800" fill={color}>
        {score}/{max}
      </text>
    </svg>
  );
};

const SectionCard: FC<{ sec: SectionScore; pct: number }> = ({ sec, pct }) => {
  const [open, setOpen] = useState(false);
  const pendingTips = sec.items.filter(i => !i.done && i.tip);
  const allDone = sec.score === sec.maxScore;

  return (
    <div className="rounded-xl border border-white/5 bg-[#0F172A] shadow-sm overflow-hidden transition-all hover:border-white/10">
      <button onClick={() => setOpen(o => !o)} className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors">
        <CircleScore score={sec.score} max={sec.maxScore} color={sec.color} />
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2 mb-1.5">
            <sec.Icon size={13} style={{ color: sec.color }} />
            <span className="font-bold text-slate-200 text-sm">{sec.name}</span>
            {allDone && <CheckCircle2 size={12} className="text-emerald-500" />}
          </div>
          <ProgressBar value={pct} color={sec.color} />
        </div>
        {open ? <ChevronUp size={14} className="text-slate-500" /> : <ChevronDown size={14} className="text-slate-500" />}
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-white/5">
          <ul className="mt-3 flex flex-col gap-1.5">
            {sec.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                {item.done
                  ? <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" />
                  : <Circle size={13} className="text-slate-600 mt-0.5 shrink-0" />}
                <span className={`text-xs ${item.done ? 'text-slate-500 line-through' : 'text-slate-300 font-medium'}`}>
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
          {pendingTips.length > 0 && (
            <div className="mt-3 rounded-lg p-2.5 bg-amber-500/10 border border-amber-500/20 flex gap-2">
              <AlertTriangle size={12} className="text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-200/80">{pendingTips[0].tip}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ScoreDashboard: FC = () => {
  const { data } = useResume();

  const sections: SectionScore[] = useMemo(() => [
    {
      name: 'Contact Info', Icon: User, color: '#8b5cf6',
      score: [!!data.personalInfo.firstName, !!data.personalInfo.lastName, !!data.personalInfo.email, !!data.personalInfo.phone, !!data.personalInfo.jobTitle, !!(data.personalInfo.city || data.personalInfo.location), !!data.personalInfo.linkedin].filter(Boolean).length,
      maxScore: 7,
      items: [
        { label: 'First & Last Name', done: !!(data.personalInfo.firstName && data.personalInfo.lastName) },
        { label: 'Email Address', done: !!data.personalInfo.email },
        { label: 'Phone Number', done: !!data.personalInfo.phone },
        { label: 'Job Title', done: !!data.personalInfo.jobTitle, tip: 'Target role likho (e.g. "Frontend Developer")' },
        { label: 'City / Location', done: !!(data.personalInfo.city || data.personalInfo.location) },
        { label: 'LinkedIn URL', done: !!data.personalInfo.linkedin, tip: 'LinkedIn add karo — recruiters check karte hain' },
      ],
    },
    {
      name: 'Summary', Icon: FileText, color: '#38bdf8',
      score: [!!data.summary, data.summary.length >= 100, data.summary.length >= 200, data.summary.split(' ').filter(Boolean).length >= 30].filter(Boolean).length,
      maxScore: 4,
      items: [
        { label: 'Summary written', done: !!data.summary, tip: 'Professional summary add karo' },
        { label: 'At least 100 characters', done: data.summary.length >= 100, tip: 'Summary thodi aur bado' },
        { label: 'At least 30 words', done: data.summary.split(' ').filter(Boolean).length >= 30 },
        { label: 'Detailed (200+ chars)', done: data.summary.length >= 200 },
      ],
    },
    {
      name: 'Experience', Icon: Briefcase, color: '#10b981',
      score: [data.experience.length > 0, data.experience.length >= 2, data.experience.some(e => !!e.description), data.experience.some(e => e.description.length >= 100), data.experience.every(e => !!e.startDate), data.experience.some(e => !!e.description.match(/\d+/))].filter(Boolean).length,
      maxScore: 6,
      items: [
        { label: 'At least 1 job added', done: data.experience.length > 0, tip: 'Work experience add karo' },
        { label: '2+ positions', done: data.experience.length >= 2 },
        { label: 'Job descriptions added', done: data.experience.some(e => !!e.description), tip: 'Har job mein responsibilities likho' },
        { label: 'Detailed descriptions (100+ chars)', done: data.experience.some(e => e.description.length >= 100) },
        { label: 'Numbers / metrics used', done: data.experience.some(e => !!e.description.match(/\d+/)), tip: 'Add numbers: "increased sales by 30%"' },
        { label: 'All dates filled', done: data.experience.every(e => !!e.startDate) },
      ],
    },
    {
      name: 'Education', Icon: GraduationCap, color: '#f59e0b',
      score: [data.education.length > 0, data.education.some(e => !!e.degree), data.education.some(e => !!e.schoolName), data.education.some(e => !!e.startYear)].filter(Boolean).length,
      maxScore: 4,
      items: [
        { label: 'Education entry added', done: data.education.length > 0, tip: 'Education add karo' },
        { label: 'Degree specified', done: data.education.some(e => !!e.degree) },
        { label: 'School name added', done: data.education.some(e => !!e.schoolName) },
        { label: 'Year mentioned', done: data.education.some(e => !!e.startYear) },
      ],
    },
    {
      name: 'Skills', Icon: Star, color: '#f43f5e',
      score: [data.skills.length > 0, data.skills.length >= 5, data.skills.length >= 8, data.skills.length >= 12].filter(Boolean).length,
      maxScore: 4,
      items: [
        { label: 'At least 1 skill', done: data.skills.length > 0, tip: 'Skills add karo' },
        { label: '5+ skills', done: data.skills.length >= 5 },
        { label: '8+ skills', done: data.skills.length >= 8 },
        { label: '12+ skills (ATS boost)', done: data.skills.length >= 12, tip: '12+ skills ATS ranking improve karta hai' },
      ],
    },
  ], [data]);

  const totalScore = sections.reduce((a, s) => a + s.score, 0);
  const totalMax = sections.reduce((a, s) => a + s.maxScore, 0);
  const overallPct = Math.round((totalScore / totalMax) * 100);
  const overallColor = overallPct >= 80 ? '#10b981' : overallPct >= 55 ? '#f59e0b' : '#ef4444';
  const overallLabel = overallPct >= 80 ? 'Excellent' : overallPct >= 55 ? 'Good' : 'Incomplete';

  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
      <div className="p-2">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]" style={{ background: GRAD }}>
            <BarChart2 size={20} />
          </div>
          <div>
            <h2 className="text-[20px] font-bold text-white leading-tight">Score Dashboard</h2>
            <p className="text-xs text-slate-400">Resume completeness tracker</p>
          </div>
        </div>

        <div className="rounded-2xl p-5 mb-5 flex items-center gap-4 bg-[#0F172A] border border-primary/20 shadow-lg">
          <div className="relative w-20 h-20 shrink-0">
            <svg viewBox="0 0 88 88" className="w-full h-full -rotate-90">
              <circle cx="44" cy="44" r="36" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
              <circle cx="44" cy="44" r="36" fill="none" stroke={overallColor} strokeWidth="10"
                strokeDasharray={`${(overallPct / 100) * 226} 226`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black" style={{ color: overallColor }}>{overallPct}</span>
              <span className="text-[9px] text-slate-500 font-bold">%</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Resume Score</p>
            <p className="text-2xl font-black mt-0.5" style={{ color: overallColor }}>{overallLabel}</p>
            <p className="text-xs text-slate-400 mt-1">{totalScore} / {totalMax} points completed</p>
          </div>
        </div>

        <p className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-3">Section Breakdown</p>
        <div className="flex flex-col gap-3">
          {sections.map((sec) => (
            <SectionCard key={sec.name} sec={sec} pct={Math.round((sec.score / sec.maxScore) * 100)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScoreDashboard;
