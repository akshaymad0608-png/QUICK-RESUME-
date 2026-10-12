import { FC, useEffect, useRef, useState } from 'react';
import { Seo } from './components/Seo';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight, Sparkles, ShieldCheck, FileText, Wand2, Search,
  MessageSquare, Edit3, GraduationCap, Briefcase, Building2, ChevronDown, Upload,
  Code2, Palette, Megaphone, Stethoscope, Landmark
} from 'lucide-react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { TemplateCard, ActualResume } from './components/TemplateCard';
import { ContinueResume } from './components/ContinueResume';
import { TEMPLATES } from './data/templates';
import { motion } from 'framer-motion';
import { useResume } from './context/ResumeContext';

/* ── Hero artifact: the real product, scaled down, with an ATS seal ── */
const HeroResume: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const obs = new ResizeObserver(entries => {
      for (const e of entries) setScale(e.contentRect.width / 794);
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      <div
        ref={ref}
        className="relative w-full rounded-[3px] bg-white shadow-lift border border-line overflow-hidden rotate-[0.6deg]"
        style={{ height: `${1123 * scale}px` }}
        aria-hidden="true"
      >
        <div className="origin-top-left absolute top-0 left-0" style={{ transform: `scale(${scale})`, width: '794px', height: '1123px' }}>
          <ActualResume layout="executive" color="#14213D" />
        </div>
      </div>

      {/* ATS approval seal */}
      <motion.div
        initial={{ opacity: 0, scale: 1.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.35, type: 'spring', stiffness: 260, damping: 18 }}
        className="seal-stamp absolute -top-4 -right-3 sm:-right-6 rounded-[3px] px-4 py-3 text-center shadow-card"
      >
        <div className="text-[26px] font-semibold leading-none">92</div>
        <div className="text-[10px] tracking-[0.18em] mt-1">ATS SCORE</div>
      </motion.div>

      <div className="absolute -bottom-5 left-4 sm:-left-6 bg-ink text-white rounded-[4px] border border-white/10 px-4 py-3 shadow-lift flex items-center gap-3">
        <Sparkles className="w-4 h-4 text-seal" />
        <div className="text-xs">
          <p className="font-semibold">AI rewrote 3 bullet points</p>
          <p className="text-ink-muted">Added measurable results</p>
        </div>
      </div>
    </div>
  );
};

const STEPS = [
  { n: '01', title: 'Pick a template', body: 'Choose from 60+ ATS-friendly layouts, organised by role — fresher, developer, designer, executive and more.' },
  { n: '02', title: 'Let AI do the writing', body: 'Generate your summary, turn plain duties into measurable achievements, and get skill suggestions for your exact role.' },
  { n: '03', title: 'Check, export, apply', body: 'Score your resume against real ATS rules, fix the gaps, and download a pixel-perfect PDF or DOCX — free.' },
];

const TOOLS = [
  { icon: FileText, title: 'AI Summary Generator', body: 'A recruiter-ready professional summary written for your target role in one click.', to: '/build' },
  { icon: Edit3, title: 'Bullet Point Rewriter', body: 'Weak duties become quantified achievements — improve, shorten, or add numbers.', to: '/build' },
  { icon: Wand2, title: 'Skill Suggestions', body: 'AI recommends the industry-standard skills your resume is missing.', to: '/build' },
  { icon: ShieldCheck, title: 'ATS Score Checker', body: 'Instant score with specific fixes, tested against real tracking systems.', to: '/build' },
  { icon: Search, title: 'Job Description Match', body: 'Paste a JD and see exactly which keywords and gaps to close.', to: '/build' },
  { icon: MessageSquare, title: 'Cover Letter Generator', body: 'A tailored cover letter drafted from your resume and the job post.', to: '/cover-letter' },
];

const AUDIENCES = [
  {
    icon: GraduationCap,
    title: 'Freshers & students',
    body: 'Education-first layouts that lead with projects, internships and skills when work history is short. Includes AI education descriptions and GPA-friendly formats.',
    cta: 'Fresher templates',
    category: 'Fresher',
  },
  {
    icon: Briefcase,
    title: 'Professionals',
    body: 'Developer, designer, marketing, healthcare and finance templates tuned to what recruiters in each industry scan for first.',
    cta: 'Templates by role',
    category: 'Developer',
  },
  {
    icon: Building2,
    title: 'Executives & leaders',
    body: 'Formal, metrics-forward layouts for senior roles — built to present scale, P&L ownership and leadership impact clearly.',
    cta: 'Executive templates',
    category: 'Executive',
  },
];

/* The eight categories that get a tile, each with the icon it reads as. The
 * count is not written here: it is taken from TEMPLATES below, so a template
 * added or removed changes the number on the page without anyone remembering
 * to edit it. A category whose templates all disappear drops off the grid
 * rather than advertising zero. */
const CATEGORY_TILES = [
  { category: 'Fresher', icon: GraduationCap, blurb: 'Education and projects first' },
  { category: 'Developer', icon: Code2, blurb: 'Stack, repos and impact' },
  { category: 'Designer', icon: Palette, blurb: 'Portfolio-led layouts' },
  { category: 'Executive', icon: Building2, blurb: 'Scale, P&L and leadership' },
  { category: 'Marketing', icon: Megaphone, blurb: 'Campaigns and numbers' },
  { category: 'Healthcare', icon: Stethoscope, blurb: 'Licences and clinical detail' },
  { category: 'Finance', icon: Landmark, blurb: 'Formal, metrics-forward' },
  { category: 'ATS Friendly', icon: ShieldCheck, blurb: 'Plain, parser-safe' },
];

const FAQS = [
  { q: 'Is QuickResume free to use?', a: 'Yes. You can build a resume, check your ATS score, and export a PDF for free. Everything is free during early access; a Pro plan is planned but not on sale yet.' },
  { q: 'Are the templates really ATS-friendly?', a: 'Every template uses standard section headings and text-based layouts rather than images. No format can promise how every applicant tracking system will read it, so run your own resume through the ATS score checker before you apply.' },
  { q: 'Can the AI write my resume for me?', a: 'The AI drafts your summary, rewrites bullet points into measurable achievements, suggests skills for your role, and generates tailored cover letters. Every word stays editable.' },
  { q: 'Do you have templates for freshers and students?', a: 'Yes — dedicated fresher, student and internship templates that put education, projects and skills first when experience is limited.' },
  { q: 'Can I import my existing resume?', a: 'Upload your current PDF or DOCX and QuickResume extracts your details automatically, so you start from your real history instead of a blank page.' },
];

const FaqItem: FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line">
      <button
        className="w-full py-6 flex justify-between items-center gap-4 text-left"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="font-display font-semibold text-ink text-[17px] sm:text-[19px] pr-2">{q}</span>
        <ChevronDown className={`w-5 h-5 text-mist shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="pb-6 text-[15px] leading-[1.75] text-body max-w-3xl">{a}</p>}
    </div>
  );
};

export const Home: FC = () => {
  const navigate = useNavigate();
  const { data, updateSection } = useResume();

  const handleSelectTemplate = (id: string, color?: string) => {
    updateSection('design', { ...data.design, template: id, color: color || '#14213D' });
    navigate('/build');
  };

  /* Six featured templates, one per category, so the row shows range rather
     than six variations of the same look. */
  const featuredCategories = ['Fresher', 'Developer', 'Designer', 'Executive', 'Marketing', 'ATS Friendly'];
  const featured = featuredCategories
    .map(cat => TEMPLATES.find(t => t.category === cat))
    .filter(Boolean);

  const tiles = CATEGORY_TILES
    .map(t => ({ ...t, count: TEMPLATES.filter(x => x.category === t.category).length }))
    .filter(t => t.count > 0);

  return (
    <div className="min-h-screen bg-paper text-body font-sans selection:bg-pine selection:text-white overflow-x-hidden">
      <Seo
        path="/"
        title="QuickResume — Free AI Resume Builder | ATS-Friendly Templates"
        description="Build an ATS-friendly, job-winning resume in minutes. 60+ free templates for freshers, developers, designers and executives — with AI writing, ATS score checker and cover letters."
      />

      <Navbar />

      <main className="pt-16 md:pt-[72px]">
        <ContinueResume />

        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="relative bg-ruled border-b border-line overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-20 lg:pt-24 lg:pb-28 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="eyebrow mb-6">AI resume builder</p>
              <h1 className="font-display text-[42px] leading-[1.03] sm:text-[60px] lg:text-[72px] text-ink font-semibold mb-7">
                The resume that gets past the bots<span className="text-seal-deep">.</span>
              </h1>
              <p className="text-[17px] sm:text-xl leading-[1.65] max-w-[34rem] mb-10 text-body">
                Pick an ATS-friendly template, let AI turn your experience into measurable achievements, and export a recruiter-ready PDF — in about ten minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button
                  onClick={() => navigate('/start')}
                  className="bg-pine text-white rounded-[6px] px-8 py-[17px] text-[15px] font-semibold tracking-[0.01em] hover:bg-pine-deep transition-colors flex items-center justify-center gap-2 shadow-card"
                >
                  Create my resume <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate('/improve')}
                  className="rounded-[6px] px-8 py-[17px] text-[15px] font-semibold tracking-[0.01em] border border-line text-ink hover:border-ink/35 hover:bg-card transition-colors flex items-center justify-center gap-2 bg-card shadow-hair"
                >
                  <Upload className="w-4 h-4" /> Improve my existing resume
                </button>
              </div>

              <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-mist">
                Free PDF export · No credit card · 60+ templates
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="px-2 sm:px-6"
            >
              <HeroResume />
            </motion.div>
          </div>
        </section>

        {/* ── Trust ledger ─────────────────────────────────── */}
        <section className="border-b border-line bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-y-10">
            {[
              ['60+', 'Templates by role'],
              ['Free', 'PDF export'],
              ['Free', 'ATS score checker'],
              ['Free', 'AI writing tools'],
            ].map(([n, l]) => (
              <div key={l} className="text-center md:border-r md:last:border-r-0 border-line px-4">
                <div className="w-7 h-px bg-seal mx-auto mb-4" aria-hidden="true" />
                <div className="font-display text-[34px] leading-none text-ink font-semibold mb-2.5">{n}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist">{l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── How it works ─────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
          <div className="max-w-2xl mb-14">
            <p className="eyebrow mb-4">How it works</p>
            <h2 className="font-display text-[30px] sm:text-[44px] leading-[1.12] text-ink font-semibold">
              From blank page to job application in three steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 md:gap-8">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="relative border-t border-line pt-7"
              >
                <span className="font-mono text-[11px] text-seal-deep tracking-[0.2em]">{s.n}</span>
                <h3 className="font-display text-[22px] font-semibold text-ink mt-3 mb-3.5">{s.title}</h3>
                <p className="leading-[1.7] text-[15px] text-body">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── AI toolkit ───────────────────────────────────── */}
        <section className="bg-ink text-paper py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <div className="max-w-2xl">
                <p className="eyebrow mb-4 !text-seal">AI toolkit</p>
                <h2 className="font-display text-[30px] sm:text-[44px] leading-[1.12] font-semibold text-white">
                  Six writing tools, built into every step
                </h2>
              </div>
              <Link to="/ai-tools" className="inline-flex items-center gap-2 text-sm font-bold text-seal hover:text-white transition-colors shrink-0">
                Explore all tools <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.09] border border-white/[0.09] rounded-xl overflow-hidden">
              {TOOLS.map(t => (
                <button
                  key={t.title}
                  onClick={() => navigate(t.to)}
                  className="bg-ink text-left p-7 sm:p-9 hover:bg-[#161D33] transition-colors group"
                >
                  <t.icon className="w-[22px] h-[22px] text-seal mb-6" />
                  <h3 className="font-display text-[19px] font-semibold text-white mb-2.5 flex items-center gap-2">
                    {t.title}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <p className="text-ink-muted text-[14.5px] leading-[1.7]">{t.body}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Templates by category ────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <p className="eyebrow mb-4">Templates</p>
              <h2 className="font-display text-[30px] sm:text-[44px] leading-[1.12] text-ink font-semibold">
                A template for every stage of your career
              </h2>
            </div>
            <Link to="/templates" className="inline-flex items-center gap-2 text-sm font-bold text-pine hover:text-pine-deep transition-colors shrink-0">
              Browse all 60+ templates <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {tiles.map((t, i) => (
              <motion.div
                key={t.category}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: Math.min(i, 4) * 0.05 }}
              >
                <Link
                  to={`/templates?category=${encodeURIComponent(t.category)}`}
                  className="group h-full flex flex-col rounded-[8px] border border-line bg-card p-5 sm:p-6 hover:border-ink/25 hover:shadow-card focus-visible:border-pine transition-all"
                >
                  <span className="w-10 h-10 rounded-[6px] bg-pine-tint text-pine flex items-center justify-center mb-5 group-hover:bg-pine group-hover:text-seal transition-colors">
                    <t.icon className="w-[18px] h-[18px]" />
                  </span>
                  <h3 className="font-semibold text-ink text-[15px] mb-1.5">{t.category}</h3>
                  <p className="text-[13px] leading-[1.55] text-mist mb-5 flex-1">{t.blurb}</p>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-seal-deep">
                    {t.count} {t.count === 1 ? 'template' : 'templates'}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featured.map((tpl, idx) => tpl && (
              <motion.div
                key={tpl.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
              >
                <TemplateCard template={tpl} onSelect={handleSelectTemplate} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Audiences ────────────────────────────────────── */}
        <section className="bg-card border-y border-line py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-14">
              <p className="eyebrow mb-4">Made for you</p>
              <h2 className="font-display text-[30px] sm:text-[44px] leading-[1.12] text-ink font-semibold">
                Built for freshers, professionals and leaders alike
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {AUDIENCES.map(a => (
                <div key={a.title} className="bg-paper border border-line rounded-[10px] p-7 sm:p-9 flex flex-col">
                  <div className="w-11 h-11 rounded-[6px] bg-pine text-seal flex items-center justify-center mb-7">
                    <a.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-[23px] font-semibold text-ink mb-3.5">{a.title}</h3>
                  <p className="text-[15px] leading-[1.7] text-body mb-8 flex-1">{a.body}</p>
                  <Link to="/templates" className="inline-flex items-center gap-2 text-sm font-bold text-pine hover:text-pine-deep transition-colors">
                    {a.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ── Already have a resume ────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-24">
          <div className="relative overflow-hidden rounded-[14px] bg-pine text-white px-6 sm:px-14 py-14 lg:py-20">
            {/* Ruled texture, kept faint so the copy stays legible on it. Gold
                rather than white: on navy, white rules grey out the band. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.10]"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, #C9A24A 0, #C9A24A 1px, transparent 1px, transparent 34px)',
              }}
            />
            {/* A single hairline inset reads as a plate edge. */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-3 rounded-[10px] border border-white/10" />
            <div className="relative grid lg:grid-cols-[1.25fr_0.75fr] gap-10 lg:gap-14 items-center">
              <div>
                <p className="eyebrow mb-5 !text-seal">Already have one?</p>
                <h2 className="font-display text-[30px] sm:text-[42px] leading-[1.12] font-semibold mb-6">
                  Upload your current resume and let AI tighten it
                </h2>
                <p className="text-white/75 text-[16.5px] leading-[1.7] max-w-xl mb-9">
                  Drop a PDF or DOCX and QuickResume reads your real history out of it — no retyping. You get an ATS score,
                  the specific lines holding it back, and rewritten bullet points with the numbers put back in.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => navigate('/improve')}
                    className="bg-seal text-ink rounded-[6px] px-8 py-[17px] text-[15px] font-semibold tracking-[0.01em] hover:bg-[#D9B463] transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4" /> Upload my resume
                  </button>
                  <Link
                    to="/ai-tools"
                    className="rounded-[6px] px-8 py-[17px] text-[15px] font-semibold tracking-[0.01em] border border-white/25 text-white hover:border-white/60 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    See what it checks <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <ul className="space-y-4 lg:border-l lg:border-white/15 lg:pl-12">
                {[
                  ['PDF and DOCX', 'Parsed into editable sections'],
                  ['ATS score', 'With the exact rules you failed'],
                  ['Rewritten bullets', 'Duties turned into measurable results'],
                ].map(([t, b]) => (
                  <li key={t} className="flex gap-3.5">
                    <ShieldCheck className="w-[18px] h-[18px] text-seal shrink-0 mt-[3px]" />
                    <div>
                      <p className="font-semibold text-[15px] leading-snug">{t}</p>
                      <p className="text-white/65 text-[14px] leading-snug mt-0.5">{b}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
          <div className="mb-10">
            <p className="eyebrow mb-4">FAQ</p>
            <h2 className="font-display text-[30px] sm:text-[44px] leading-[1.12] text-ink font-semibold">
              Common questions
            </h2>
          </div>
          <div className="border-t border-line">
            {FAQS.map(f => <FaqItem key={f.q} {...f} />)}
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────── */}
        <section className="bg-ink py-20 lg:py-24 border-t border-line">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-display text-[32px] sm:text-[52px] leading-[1.1] text-white font-semibold mb-6">
              Your next role starts with one page<span className="text-seal">.</span>
            </h2>
            <p className="text-[17px] leading-[1.65] text-ink-muted mb-10 max-w-xl mx-auto">
              Build it free in about ten minutes. Export a PDF recruiters — and their software — will actually read.
            </p>
            <button
              onClick={() => navigate('/start')}
              className="bg-seal text-ink rounded-[6px] px-10 py-[17px] text-[15px] font-semibold tracking-[0.01em] hover:bg-[#D9B463] transition-colors inline-flex items-center gap-2"
            >
              Start building for free <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
