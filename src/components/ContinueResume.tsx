import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight } from 'lucide-react';

/**
 * If this visitor already started a resume (saved to localStorage as
 * `resume_data` by ResumeContext), offer a one-tap way back into it from the
 * home page. Renders nothing for first-time visitors, so it never clutters a
 * fresh landing.
 */
export const ContinueResume: React.FC = () => {
  const navigate = useNavigate();
  const [draft, setDraft] = useState<{ name: string; progress: number } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('resume_data');
      if (!raw) return;
      const d = JSON.parse(raw);
      const pi = d.personalInfo || {};
      const name = [pi.firstName, pi.lastName].filter(Boolean).join(' ').trim();

      const sections = [
        Boolean(name),
        Boolean(d.summary),
        (d.experience || []).length > 0,
        (d.education || []).length > 0,
        (d.skills || []).length > 0,
        (d.projects || []).length > 0,
      ];
      const done = sections.filter(Boolean).length;
      if (done === 0) return; // nothing meaningful saved yet

      setDraft({ name: name || 'your resume', progress: Math.round((done / 6) * 100) });
    } catch {
      /* corrupt storage — just don't show the banner */
    }
  }, []);

  if (!draft) return null;

  const label =
    draft.name === 'your resume'
      ? `Continue your resume — ${draft.progress}% done`
      : `Continue ${draft.name}’s resume — ${draft.progress}% done`;

  return (
    <section className="border-b border-line bg-pine/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-pine/15 text-pine grid place-items-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="eyebrow">Draft saved on this device</p>
            <p className="font-display text-lg text-ink font-semibold truncate">{label}</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/build')}
          className="bg-pine text-white rounded-full px-6 py-3 text-[14px] font-bold hover:bg-pine-deep transition-colors flex items-center justify-center gap-2 shrink-0"
        >
          Continue editing <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default ContinueResume;
