import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight, X } from 'lucide-react';

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
      // Hidden for this browser tab session once dismissed; the draft itself is never deleted here.
      if (sessionStorage.getItem('qr_continue_dismissed')) return;
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

  const dismiss = () => {
    try {
      sessionStorage.setItem('qr_continue_dismissed', '1');
    } catch {
      /* private mode: just hide for this view */
    }
    setDraft(null);
  };

  return (
    <section className="bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
        <div className="relative rounded-2xl bg-card border border-line border-l-4 border-l-seal shadow-[0_2px_10px_rgba(11,16,32,0.05)] px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="flex items-center gap-4 min-w-0 pr-8 sm:pr-0">
            <div className="w-11 h-11 rounded-xl bg-ink text-seal grid place-items-center shrink-0">
              <FileText className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="eyebrow">Draft saved on this device</p>
              <p className="font-display text-lg text-ink font-semibold sm:truncate">{label}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => navigate('/build')}
              className="bg-pine text-white rounded-[6px] px-6 py-3 text-[14px] font-semibold hover:bg-pine-deep transition-colors flex items-center justify-center gap-2"
            >
              Continue editing <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={dismiss}
            aria-label="Hide this reminder"
            className="absolute top-2 right-2 sm:static sm:order-last p-2 rounded-full text-mist hover:text-ink hover:bg-pine-tint transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContinueResume;
