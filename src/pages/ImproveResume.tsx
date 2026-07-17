import { FC, useMemo, useRef, useState } from 'react';
import { Seo } from '../components/Seo';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud, FileText, Loader2, Trash2, CheckCircle2, ShieldCheck,
  Sparkles, Wand2, Plus, ArrowRight, ArrowLeft, Undo2, Download, PenLine, RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { useResume } from '../context/ResumeContext';
import { ResumeData } from '../types';
import LivePreview from '../components/Preview/LivePreview';
import { ScaledPreview } from '../components/Preview/ScaledPreview';
import { exportElementToPdf } from '../utils/exportPdf';
import { uploadResumeFile } from '../utils/uploadResume';
import {
  calculateATS, suggestSkills, generateSummary, optimizeWorkExperience, enhanceBulletPoints,
} from '../services/geminiService';

type Step = 1 | 2 | 3;

const STEP_LABELS = ['Upload', 'Review & clean', 'AI improve'];

const ImproveResume: FC = () => {
  const navigate = useNavigate();
  const { data, setData, updateSection } = useResume();

  const [step, setStep] = useState<Step>(1);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // AI state
  const [ats, setAts] = useState<{ score: number; tips: string[] } | null>(null);
  const [aiBusy, setAiBusy] = useState<string | null>(null);
  const [skillIdeas, setSkillIdeas] = useState<string[]>([]);
  const undoRef = useRef<ResumeData | null>(null);
  const [canUndo, setCanUndo] = useState(false);

  // Export
  const printRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const hasSavedResume = useMemo(() =>
    Boolean(
      data.personalInfo.firstName || data.summary ||
      data.experience.length || data.education.length || data.skills.length
    ), [data]);

  /* ── Step 1: upload / choose source ─────────────────────── */

  const importFile = async (file: File) => {
    // Client-side pre-checks — obvious problems never reach the server.
    const okType = /\.(pdf|docx?)$/i.test(file.name) || file.type === 'application/pdf' || file.type.includes('wordprocessingml');
    if (!okType) {
      toast.error('Please upload a PDF or Word (.docx) file.');
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      toast.error('That file is over 4 MB — resume PDFs are usually under 2 MB. Please compress it and try again.');
      return;
    }

    setIsUploading(true);
    toast.loading('Reading your resume… this can take up to a minute for scanned PDFs.', { id: 'improve-upload' });
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 120000);
    try {
      const res = await uploadResumeFile(file, controller.signal);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Could not read that file. Try a PDF or DOCX.');
      }
      const extracted = await res.json();
      if (Array.isArray(extracted.experience)) {
        extracted.experience = extracted.experience.map((e: Record<string, unknown>) => ({ ...e, id: crypto.randomUUID() }));
      }
      if (Array.isArray(extracted.education)) {
        extracted.education = extracted.education.map((e: Record<string, unknown>) => ({ ...e, id: crypto.randomUUID() }));
      }
      setData(prev => ({
        ...prev,
        ...extracted,
        personalInfo: { ...prev.personalInfo, ...(extracted.personalInfo || {}) },
        experience: extracted.experience || [],
        education: extracted.education || [],
        skills: extracted.skills || [],
        summary: extracted.summary || '',
      }));
      setAts(null);
      setSkillIdeas([]);
      const found = [
        extracted.experience?.length ? `${extracted.experience.length} experience` : '',
        extracted.education?.length ? `${extracted.education.length} education` : '',
        extracted.skills?.length ? `${extracted.skills.length} skills` : '',
        extracted.summary ? 'summary' : '',
      ].filter(Boolean).join(' · ');
      toast.success(found ? `Imported: ${found}` : 'Resume imported — review what we found.', { id: 'improve-upload', duration: 5000 });
      setStep(2);
    } catch (e: unknown) {
      const aborted = e instanceof DOMException && e.name === 'AbortError';
      toast.error(aborted ? 'Reading took too long — please try again.' : (e instanceof Error ? e.message : 'Import failed. Please try again.'), { id: 'improve-upload' });
    } finally {
      clearTimeout(timer);
      setIsUploading(false);
    }
  };

  const onFilePicked = (files: FileList | null) => {
    if (files && files[0]) importFile(files[0]);
  };

  /* ── Step 2 helpers: remove / clean ─────────────────────── */

  const removeExperience = (id: string) =>
    updateSection('experience', data.experience.filter(e => e.id !== id));
  const removeEducation = (id: string) =>
    updateSection('education', data.education.filter(e => e.id !== id));
  const removeSkill = (skill: string) =>
    updateSection('skills', data.skills.filter(s => s !== skill));

  /* ── Step 3: AI actions (each keeps an undo snapshot) ───── */

  const snapshot = () => {
    undoRef.current = JSON.parse(JSON.stringify(data));
    setCanUndo(true);
  };

  const handleUndo = () => {
    if (undoRef.current) {
      setData(undoRef.current);
      undoRef.current = null;
      setCanUndo(false);
      toast.success('Last AI change undone.');
    }
  };

  const runATS = async () => {
    setAiBusy('ats');
    try {
      const result = await calculateATS(data as unknown as Record<string, unknown>);
      setAts(result);
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'ATS check failed. Please try again.');
    } finally {
      setAiBusy(null);
    }
  };

  const runImproveBullets = async () => {
    if (data.experience.length === 0) { toast.error('No experience entries to improve.'); return; }
    snapshot();
    setAiBusy('bullets');
    const t = toast.loading('Rewriting your bullet points…');
    try {
      const improved = await optimizeWorkExperience(data.experience as unknown as Record<string, unknown>[]);
      updateSection('experience', improved as unknown as ResumeData['experience']);
      toast.success('Bullet points upgraded — check the preview.', { id: t });
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Could not improve bullets.', { id: t });
      setCanUndo(false);
    } finally {
      setAiBusy(null);
    }
  };

  const runRewriteSummary = async () => {
    snapshot();
    setAiBusy('summary');
    const t = toast.loading('Writing a stronger summary…');
    try {
      const summary = await generateSummary(data as unknown as Record<string, unknown>);
      updateSection('summary', summary.trim());
      toast.success('Summary rewritten.', { id: t });
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Could not rewrite summary.', { id: t });
      setCanUndo(false);
    } finally {
      setAiBusy(null);
    }
  };

  const runFixGrammar = async () => {
    const bulletsBySection = data.experience.map(e => (e.description || '').split('\n').filter(Boolean));
    const allBullets = bulletsBySection.flat();
    if (allBullets.length === 0 && !data.summary) { toast.error('Nothing to fix yet.'); return; }
    snapshot();
    setAiBusy('grammar');
    const t = toast.loading('Fixing grammar and typos…');
    try {
      if (allBullets.length > 0) {
        const fixed = await enhanceBulletPoints(allBullets, 'grammar');
        let cursor = 0;
        updateSection('experience', data.experience.map((e, i) => {
          const count = bulletsBySection[i].length;
          const mine = fixed.slice(cursor, cursor + count);
          cursor += count;
          return count > 0 ? { ...e, description: mine.join('\n') } : e;
        }));
      }
      if (data.summary) {
        const [fixedSummary] = await enhanceBulletPoints([data.summary], 'grammar');
        if (fixedSummary) updateSection('summary', fixedSummary);
      }
      toast.success('Grammar cleaned up.', { id: t });
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Grammar fix failed.', { id: t });
      setCanUndo(false);
    } finally {
      setAiBusy(null);
    }
  };

  const runSuggestSkills = async () => {
    const titles = [data.personalInfo.jobTitle, ...data.experience.map(e => e.jobTitle)].filter(Boolean);
    if (titles.length === 0) { toast.error('Add a job title first so the AI knows your field.'); return; }
    setAiBusy('skills');
    try {
      const ideas = await suggestSkills(titles);
      const fresh = ideas.filter(s => !data.skills.some(x => x.toLowerCase() === s.toLowerCase()));
      setSkillIdeas(fresh);
      if (fresh.length === 0) toast('Your skills already cover the suggestions — nice!');
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Could not suggest skills.');
    } finally {
      setAiBusy(null);
    }
  };

  const addSkill = (skill: string) => {
    updateSection('skills', [...data.skills, skill]);
    setSkillIdeas(prev => prev.filter(s => s !== skill));
    toast.success(`Added "${skill}"`);
  };

  /* ── Export ─────────────────────────────────────────────── */

  const handleDownloadPDF = async () => {
    const element = printRef.current;
    if (!element) { toast.error('Preview not ready — try again in a second.'); return; }
    setIsDownloading(true);
    const t = toast.loading('Preparing your PDF…');
    const name = data.personalInfo.firstName ? `${data.personalInfo.firstName}_${data.personalInfo.lastName}` : 'Resume';
    try {
      const result = await exportElementToPdf(element, `${name}_Improved.pdf`);
      if (result === 'print-dialog') {
        toast.success("Print dialog opened — choose 'Save as PDF'.", { id: t, duration: 6000 });
      } else {
        toast.success('PDF downloaded!', { id: t });
      }
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Export failed.', { id: t });
    } finally {
      setIsDownloading(false);
    }
  };

  const scoreColor = (n: number) => n >= 80 ? '#3A4FD8' : n >= 60 ? '#F97350' : '#DC2626';

  /* ── UI ─────────────────────────────────────────────────── */

  return (
    <div className="min-h-screen bg-paper text-body font-sans flex flex-col pt-16 md:pt-[72px] selection:bg-pine selection:text-white">
      <Seo
        path="/improve"
        title="Improve My Resume — Free AI Resume Checker & Fixer | QuickResume"
        description="Already have a resume? Upload your PDF or DOCX, remove weak sections, get an instant ATS score, and let AI rewrite bullets, fix grammar and suggest missing skills — free."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to improve your resume with AI",
          "step": [
            { "@type": "HowToStep", "name": "Upload", "text": "Upload your current resume as a PDF or DOCX." },
            { "@type": "HowToStep", "name": "Review & clean", "text": "Remove weak or outdated sections." },
            { "@type": "HowToStep", "name": "AI improve", "text": "Run an ATS check and let AI rewrite bullets, fix grammar and suggest skills." }
          ]
        }}
      />

      <Navbar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
        {/* Heading + steps */}
        <div className="max-w-2xl mb-8">
          <p className="eyebrow mb-3">Already have a resume?</p>
          <h1 className="font-display text-3xl sm:text-[42px] leading-tight text-ink font-semibold mb-3">
            Upgrade the resume you already have
          </h1>
          <p className="text-[15px] sm:text-base leading-relaxed">
            Upload your current CV, clean out what's not working, and let AI sharpen the rest — then export a fresh, ATS-ready PDF.
          </p>
        </div>

        <ol className="flex items-center gap-2 sm:gap-4 mb-10 overflow-x-auto no-scrollbar" aria-label="Progress">
          {STEP_LABELS.map((label, i) => {
            const n = (i + 1) as Step;
            const active = step === n;
            const done = step > n;
            return (
              <li key={label} className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => { if (done || (n === 2 && hasSavedResume) || n <= step) setStep(n); }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-full border text-sm font-semibold transition-colors ${
                    active ? 'bg-ink text-white border-ink'
                    : done ? 'bg-pine-tint text-pine border-pine/30'
                    : 'bg-card text-mist border-line'
                  }`}
                >
                  {done ? <CheckCircle2 className="w-4 h-4" /> : <span className="font-mono text-xs">{n}</span>}
                  {label}
                </button>
                {i < STEP_LABELS.length - 1 && <span className="w-5 h-px bg-line hidden sm:block" />}
              </li>
            );
          })}
        </ol>

        {/* ── STEP 1: SOURCE ─────────────────────────────── */}
        {step === 1 && (
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 items-start">
            <div
              onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={e => { e.preventDefault(); setIsDragging(false); onFilePicked(e.dataTransfer.files); }}
              className={`bg-card border-2 border-dashed rounded-2xl p-10 sm:p-14 text-center transition-colors ${isDragging ? 'border-pine bg-pine-tint' : 'border-line'}`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={e => onFilePicked(e.target.files)}
              />
              <div className="w-14 h-14 rounded-2xl bg-pine-tint text-pine flex items-center justify-center mx-auto mb-5">
                {isUploading ? <Loader2 className="w-7 h-7 animate-spin" /> : <UploadCloud className="w-7 h-7" />}
              </div>
              <h2 className="text-xl font-bold text-ink mb-2">Upload your current resume</h2>
              <p className="text-sm text-mist mb-6">PDF or Word (.docx) — we'll pull out your details automatically.</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="bg-pine text-white rounded-full px-7 py-3 text-sm font-bold hover:bg-pine-deep transition-colors inline-flex items-center gap-2 disabled:opacity-60"
              >
                {isUploading ? 'Reading…' : 'Choose file'} {!isUploading && <ArrowRight className="w-4 h-4" />}
              </button>
              <p className="text-[11px] font-mono tracking-wider uppercase text-mist mt-5">or drag & drop it here</p>
            </div>

            <div className="bg-card border border-line rounded-2xl p-6 sm:p-7 shadow-card">
              <h3 className="font-bold text-ink mb-2 flex items-center gap-2"><FileText className="w-4 h-4 text-pine" /> Continue with saved resume</h3>
              {hasSavedResume ? (
                <>
                  <p className="text-sm text-mist mb-5">
                    We found a resume on this device{data.personalInfo.firstName ? ` for ${data.personalInfo.firstName} ${data.personalInfo.lastName}` : ''} — {data.experience.length} experience {data.experience.length === 1 ? 'entry' : 'entries'}, {data.skills.length} skills.
                  </p>
                  <button
                    onClick={() => setStep(2)}
                    className="w-full rounded-full border border-ink/15 text-ink py-3 text-sm font-bold hover:border-ink/40 transition-colors"
                  >
                    Improve this resume
                  </button>
                </>
              ) : (
                <p className="text-sm text-mist">No saved resume yet — upload a file to get started, or <button className="text-pine font-bold" onClick={() => navigate('/build')}>build one from scratch</button>.</p>
              )}
            </div>
          </div>
        )}

        {/* ── STEP 2: REVIEW & CLEAN ─────────────────────── */}
        {step === 2 && !hasSavedResume && (
          <div className="bg-card border border-line rounded-2xl p-10 text-center max-w-xl">
            <div className="w-14 h-14 rounded-2xl bg-seal-tint text-seal flex items-center justify-center mx-auto mb-5">
              <FileText className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-ink mb-2">Nothing to review yet</h2>
            <p className="text-sm text-mist mb-6">We couldn't find any resume details. Upload your CV first — if it's a scanned/image PDF, try a text-based file instead.</p>
            <button onClick={() => setStep(1)} className="bg-pine text-white rounded-full px-7 py-3 text-sm font-bold hover:bg-pine-deep transition-colors inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to upload
            </button>
          </div>
        )}
        {step === 2 && hasSavedResume && (
          <div className="lg:hidden mb-5 flex items-start gap-3 bg-pine-tint border border-pine/20 rounded-xl p-3.5 text-sm text-ink-soft">
            <PenLine className="w-4 h-4 text-pine shrink-0 mt-0.5" />
            <p>Remove anything you don't need below. Your changes save automatically — you'll see the full formatted preview after export or in the builder.</p>
          </div>
        )}
        {step === 2 && hasSavedResume && (
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
            <div className="space-y-5">
              {/* Summary */}
              <section className="bg-card border border-line rounded-2xl p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="font-bold text-ink">Professional summary</h3>
                  {data.summary && (
                    <button onClick={() => { updateSection('summary', ''); toast.success('Summary removed.'); }} className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1">
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  )}
                </div>
                {data.summary
                  ? <p className="text-sm leading-relaxed">{data.summary}</p>
                  : <p className="text-sm text-mist">No summary found — the AI can write one for you in the next step.</p>}
              </section>

              {/* Experience */}
              <section className="bg-card border border-line rounded-2xl p-5 sm:p-6">
                <h3 className="font-bold text-ink mb-3">Experience <span className="font-mono text-xs text-mist">({data.experience.length})</span></h3>
                {data.experience.length === 0 && <p className="text-sm text-mist">No experience entries found.</p>}
                <ul className="space-y-3">
                  {data.experience.map(e => (
                    <li key={e.id} className="flex items-start justify-between gap-3 border border-line rounded-xl p-3.5">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-ink truncate">{e.jobTitle || 'Role'} — {e.company || 'Company'}</p>
                        <p className="text-xs text-mist">{e.startDate}{e.isPresent ? ' – Present' : e.endDate ? ` – ${e.endDate}` : ''}</p>
                      </div>
                      <button onClick={() => removeExperience(e.id)} className="p-2 rounded-lg text-mist hover:text-red-500 hover:bg-red-50 transition-colors shrink-0" aria-label={`Remove ${e.jobTitle}`}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Education */}
              <section className="bg-card border border-line rounded-2xl p-5 sm:p-6">
                <h3 className="font-bold text-ink mb-3">Education <span className="font-mono text-xs text-mist">({data.education.length})</span></h3>
                {data.education.length === 0 && <p className="text-sm text-mist">No education entries found.</p>}
                <ul className="space-y-3">
                  {data.education.map(e => (
                    <li key={e.id} className="flex items-start justify-between gap-3 border border-line rounded-xl p-3.5">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-ink truncate">{e.degree}{e.fieldOfStudy ? `, ${e.fieldOfStudy}` : ''}</p>
                        <p className="text-xs text-mist truncate">{e.schoolName}{e.endYear ? ` · ${e.endYear}` : ''}</p>
                      </div>
                      <button onClick={() => removeEducation(e.id)} className="p-2 rounded-lg text-mist hover:text-red-500 hover:bg-red-50 transition-colors shrink-0" aria-label={`Remove ${e.schoolName}`}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Skills */}
              <section className="bg-card border border-line rounded-2xl p-5 sm:p-6">
                <h3 className="font-bold text-ink mb-3">Skills <span className="font-mono text-xs text-mist">({data.skills.length})</span></h3>
                {data.skills.length === 0 && <p className="text-sm text-mist">No skills found — get AI suggestions in the next step.</p>}
                <div className="flex flex-wrap gap-2">
                  {data.skills.map(s => (
                    <span key={s} className="inline-flex items-center gap-1.5 bg-paper border border-line rounded-full pl-3 pr-1.5 py-1 text-xs font-semibold text-ink">
                      {s}
                      <button onClick={() => removeSkill(s)} className="p-1 rounded-full hover:bg-red-50 hover:text-red-500 text-mist transition-colors" aria-label={`Remove ${s}`}>✕</button>
                    </span>
                  ))}
                </div>
              </section>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button onClick={() => setStep(3)} className="bg-pine text-white rounded-full px-7 py-3.5 text-sm font-bold hover:bg-pine-deep transition-colors inline-flex items-center justify-center gap-2">
                  Continue to AI improve <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => navigate('/build')} className="rounded-full border border-ink/15 text-ink px-7 py-3.5 text-sm font-bold hover:border-ink/40 transition-colors inline-flex items-center justify-center gap-2">
                  <PenLine className="w-4 h-4" /> Edit details in the builder
                </button>
              </div>
            </div>

            {/* Live preview */}
            <aside className="hidden lg:block sticky top-24">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist mb-3">Live preview</p>
              <div className="max-h-[70vh] overflow-y-auto custom-scrollbar rounded-md border border-line bg-white">
                <ScaledPreview><LivePreview /></ScaledPreview>
              </div>
            </aside>
          </div>
        )}

        {/* ── STEP 3: AI IMPROVE ─────────────────────────── */}
        {step === 3 && (
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
            <div className="space-y-5">
              {/* ATS score */}
              <section className="bg-ink text-paper rounded-2xl p-6 sm:p-7">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className="shrink-0">
                    {ats ? (
                      <div className="w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center" style={{ borderColor: scoreColor(ats.score) }}>
                        <span className="font-display text-3xl font-semibold" style={{ color: scoreColor(ats.score) }}>{ats.score}</span>
                        <span className="font-mono text-[9px] tracking-[0.18em] text-[#8B93B8]">ATS SCORE</span>
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-full border-4 border-white/15 flex items-center justify-center">
                        <ShieldCheck className="w-8 h-8 text-seal" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">{ats ? 'Your ATS report' : 'Check your ATS score'}</h3>
                    {ats ? (
                      <ul className="text-sm text-[#B9BFD6] space-y-1.5 mb-4">
                        {ats.tips.slice(0, 5).map((tip, i) => <li key={i} className="flex gap-2"><span className="text-seal">›</span>{tip}</li>)}
                      </ul>
                    ) : (
                      <p className="text-sm text-[#B9BFD6] mb-4">See how your resume parses through tracking systems, with specific fixes.</p>
                    )}
                    <button
                      onClick={runATS}
                      disabled={aiBusy !== null}
                      className="bg-seal text-ink rounded-full px-6 py-2.5 text-sm font-bold hover:bg-[#FB8D6E] transition-colors inline-flex items-center gap-2 disabled:opacity-60"
                    >
                      {aiBusy === 'ats' ? <Loader2 className="w-4 h-4 animate-spin" /> : ats ? <RefreshCw className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                      {ats ? 'Re-check score' : 'Run ATS check'}
                    </button>
                  </div>
                </div>
              </section>

              {/* One-tap improvements */}
              <section className="grid sm:grid-cols-2 gap-4">
                {[
                  { id: 'bullets', icon: Sparkles, title: 'Rewrite my bullet points', body: 'Turn duties into measurable, recruiter-ready achievements.', run: runImproveBullets },
                  { id: 'summary', icon: FileText, title: 'Rewrite my summary', body: 'A sharper professional summary based on your real experience.', run: runRewriteSummary },
                  { id: 'grammar', icon: PenLine, title: 'Fix grammar & typos', body: 'Clean every bullet and your summary without changing meaning.', run: runFixGrammar },
                  { id: 'skills', icon: Wand2, title: 'Suggest missing skills', body: 'Industry-standard skills your resume should mention.', run: runSuggestSkills },
                ].map(card => (
                  <button
                    key={card.id}
                    onClick={card.run}
                    disabled={aiBusy !== null}
                    className="bg-card border border-line rounded-2xl p-5 text-left hover:border-pine transition-colors group disabled:opacity-60"
                  >
                    <div className="w-10 h-10 rounded-xl bg-pine-tint text-pine flex items-center justify-center mb-4">
                      {aiBusy === card.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <card.icon className="w-5 h-5" />}
                    </div>
                    <h4 className="font-bold text-ink mb-1 text-[15px]">{card.title}</h4>
                    <p className="text-sm text-mist leading-relaxed">{card.body}</p>
                  </button>
                ))}
              </section>

              {/* Skill suggestions */}
              {skillIdeas.length > 0 && (
                <section className="bg-card border border-line rounded-2xl p-5 sm:p-6">
                  <h3 className="font-bold text-ink mb-3">Suggested skills — tap to add</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillIdeas.map(s => (
                      <button key={s} onClick={() => addSkill(s)} className="inline-flex items-center gap-1.5 bg-pine-tint text-pine border border-pine/30 rounded-full px-3 py-1.5 text-xs font-bold hover:bg-pine hover:text-white transition-colors">
                        <Plus className="w-3.5 h-3.5" /> {s}
                      </button>
                    ))}
                  </div>
                </section>
              )}

              {canUndo && (
                <button onClick={handleUndo} className="inline-flex items-center gap-2 text-sm font-bold text-ink-soft hover:text-ink transition-colors">
                  <Undo2 className="w-4 h-4" /> Undo last AI change
                </button>
              )}

              {/* Finish */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-line">
                <button
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  className="bg-pine text-white rounded-full px-7 py-3.5 text-sm font-bold hover:bg-pine-deep transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  Download improved PDF
                </button>
                <button onClick={() => navigate('/build')} className="rounded-full border border-ink/15 text-ink px-7 py-3.5 text-sm font-bold hover:border-ink/40 transition-colors inline-flex items-center justify-center gap-2">
                  <PenLine className="w-4 h-4" /> Fine-tune in the builder
                </button>
                <button onClick={() => setStep(2)} className="text-sm font-bold text-mist hover:text-ink transition-colors inline-flex items-center justify-center gap-2 px-4 py-3.5">
                  <ArrowLeft className="w-4 h-4" /> Back to review
                </button>
              </div>
            </div>

            {/* Live preview */}
            <aside className="hidden lg:block sticky top-24">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist mb-3">Live preview</p>
              <div className="max-h-[70vh] overflow-y-auto custom-scrollbar rounded-md border border-line bg-white">
                <ScaledPreview><LivePreview /></ScaledPreview>
              </div>
            </aside>
          </div>
        )}
      </main>

      {/* Hidden natural-size print node for the PDF exporter */}
      <div aria-hidden="true" style={{ position: 'fixed', top: 0, left: '-20000px', width: '794px', background: '#ffffff', zIndex: -1, pointerEvents: 'none' }}>
        <div ref={printRef} className="bg-white" style={{ width: '794px', minHeight: '1123px' }}>
          <LivePreview />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ImproveResume;
