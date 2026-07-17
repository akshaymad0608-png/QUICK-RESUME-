import { FC, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight, Sparkles, ShieldCheck, FileText, Wand2, Search,
  MessageSquare, Edit3, GraduationCap, Briefcase, Building2, ChevronDown, Upload
} from 'lucide-react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { TemplateCard, ActualResume } from './components/TemplateCard';
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
        className="relative w-full rounded-md bg-white shadow-lift border border-line overflow-hidden rotate-[1.5deg]"
        style={{ height: `${1123 * scale}px` }}
        aria-hidden="true"
      >
        <div className="origin-top-left absolute top-0 left-0" style={{ transform: `scale(${scale})`, width: '794px', height: '1123px' }}>
          <ActualResume layout="executive" color="#3A4FD8" />
        </div>
      </div>

      {/* ATS approval seal */}
      <motion.div
        initial={{ opacity: 0, scale: 1.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.35, type: 'spring', stiffness: 260, damping: 18 }}
        className="seal-stamp absolute -top-4 -right-3 sm:-right-6 rounded-md px-4 py-3 text-center shadow-card"
      >
        <div className="text-[26px] font-semibold leading-none">92</div>
        <div className="text-[10px] tracking-[0.18em] mt-1">ATS SCORE</div>
      </motion.div>

      <div className="absolute -bottom-5 left-4 sm:-left-6 bg-ink text-paper rounded-lg px-4 py-3 shadow-lift flex items-center gap-3">
        <Sparkles className="w-4 h-4 text-seal" />
        <div className="text-xs">
          <p className="font-semibold">AI rewrote 3 bullet points</p>
          <p className="text-[#8B93B8]">Added measurable results</p>
        </div>
      </div>
    </div>
  );
};

const STEPS = [
  { n: '01', title: 'Pick a template', body: 'Choose from 60+ ATS-tested layouts, organised by role — fresher, developer, designer, executive and more.' },
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

const FAQS = [
  { q: 'Is QuickResume free to use?', a: 'Yes. You can build a resume, check your ATS score, and export a PDF for free. Premium templates and unlimited resumes are available on the Pro plan.' },
  { q: 'Are the templates really ATS-friendly?', a: 'Every template parses cleanly through systems like Workday, Greenhouse and Lever — single reading flow, standard section headings, no tables or graphics that break parsers.' },
  { q: 'Can the AI write my resume for me?', a: 'The AI drafts your summary, rewrites bullet points into measurable achievements, suggests skills for your role, and generates tailored cover letters. Every word stays editable.' },
  { q: 'Do you have templates for freshers and students?', a: 'Yes — dedicated fresher, student and internship templates that put education, projects and skills first when experience is limited.' },
  { q: 'Can I import my existing resume?', a: 'Upload your current PDF or DOCX and QuickResume extracts your details automatically, so you start from your real history instead of a blank page.' },
];

const FaqItem: FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line">
      <button
        className="w-full py-5 flex justify-between items-center gap-4 text-left"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="font-semibold text-ink text-[15px] sm:text-base">{q}</span>
        <ChevronDown className={`w-5 h-5 text-mist shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="pb-5 text-[15px] leading-relaxed text-body max-w-3xl">{a}</p>}
    </div>
  );
};

export const Home: FC = () => {
  const navigate = useNavigate();
  const { data, updateSection } = useResume();

  const handleSelectTemplate = (id: string, color?: string) => {
    updateSection('design', { ...data.design, template: id, color: color || '#3A4FD8' });
    navigate('/build');
  };

  const featuredCategories = ['Fresher', 'Developer', 'Executive'];
  const featured = featuredCategories
    .map(cat => TEMPLATES.find(t => t.category === cat))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-paper text-body font-sans selection:bg-pine selection:text-white overflow-x-hidden">
      <Helmet>
        <title>QuickResume — Free AI Resume Builder | ATS-Friendly Templates</title>
        <meta name="description" content="Build an ATS-friendly, job-winning resume in minutes. 60+ free templates for freshers, developers, designers and executives — with AI writing, ATS score checker and cover letters." />
        <link rel="canonical" href="https://quickresume.business/" />
      </Helmet>

      <Navbar />

      <main className="pt-16 md:pt-[72px]">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="relative bg-ruled border-b border-line overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-20 lg:pt-24 lg:pb-28 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="eyebrow mb-6">AI resume builder</p>
              <h1 className="font-display text-[40px] leading-[1.05] sm:text-6xl lg:text-[68px] text-ink font-semibold mb-6">
                The resume that gets past the bots<span className="text-pine">.</span>
              </h1>
              <p className="text-lg sm:text-xl leading-relaxed max-w-xl mb-9">
                Pick an ATS-tested template, let AI turn your experience into measurable achievements, and export a recruiter-ready PDF — in about ten minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button
                  onClick={() => navigate('/start')}
                  className="bg-pine text-white rounded-full px-8 py-4 text-[15px] font-bold hover:bg-pine-deep transition-colors flex items-center justify-center gap-2"
                >
                  Create my resume <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate('/improve')}
                  className="rounded-full px-8 py-4 text-[15px] font-bold border border-ink/15 text-ink hover:border-ink/40 transition-colors flex items-center justify-center gap-2 bg-card"
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-y-8">
            {[
              ['100k+', 'Resumes created'],
              ['99%', 'ATS parse rate'],
              ['60+', 'Templates by role'],
              ['Free', 'PDF export'],
            ].map(([n, l]) => (
              <div key={l} className="text-center md:border-r md:last:border-r-0 border-line px-4">
                <div className="font-display text-3xl text-ink font-semibold mb-1">{n}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist">{l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── How it works ─────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
          <div className="max-w-2xl mb-14">
            <p className="eyebrow mb-4">How it works</p>
            <h2 className="font-display text-3xl sm:text-[42px] leading-tight text-ink font-semibold">
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
                className="relative border-t-2 border-ink pt-6"
              >
                <span className="font-mono text-xs text-pine tracking-[0.18em]">{s.n}</span>
                <h3 className="text-xl font-bold text-ink mt-2 mb-3">{s.title}</h3>
                <p className="leading-relaxed text-[15px]">{s.body}</p>
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
                <h2 className="font-display text-3xl sm:text-[42px] leading-tight font-semibold text-paper">
                  Six writing tools, built into every step
                </h2>
              </div>
              <Link to="/ai-tools" className="inline-flex items-center gap-2 text-sm font-bold text-seal hover:text-white transition-colors shrink-0">
                Explore all tools <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
              {TOOLS.map(t => (
                <button
                  key={t.title}
                  onClick={() => navigate(t.to)}
                  className="bg-ink text-left p-7 sm:p-8 hover:bg-[#212842] transition-colors group"
                >
                  <t.icon className="w-6 h-6 text-seal mb-5" />
                  <h3 className="text-lg font-bold text-paper mb-2 flex items-center gap-2">
                    {t.title}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <p className="text-[#B9BFD6] text-[15px] leading-relaxed">{t.body}</p>
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
              <h2 className="font-display text-3xl sm:text-[42px] leading-tight text-ink font-semibold">
                A template for every stage of your career
              </h2>
            </div>
            <Link to="/templates" className="inline-flex items-center gap-2 text-sm font-bold text-pine hover:text-pine-deep transition-colors shrink-0">
              Browse all 60+ templates <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
            {['ATS Friendly', 'Fresher', 'Student', 'Developer', 'Designer', 'Executive', 'Marketing', 'Healthcare', 'Finance', 'Teacher'].map(cat => (
              <Link
                key={cat}
                to="/templates"
                className="whitespace-nowrap px-4 py-2 rounded-full border border-line bg-card text-sm font-semibold text-ink-soft hover:border-pine hover:text-pine transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <h2 className="font-display text-3xl sm:text-[42px] leading-tight text-ink font-semibold">
                Built for freshers, professionals and leaders alike
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {AUDIENCES.map(a => (
                <div key={a.title} className="bg-paper border border-line rounded-2xl p-7 sm:p-8 flex flex-col shadow-card">
                  <div className="w-12 h-12 rounded-xl bg-pine-tint text-pine flex items-center justify-center mb-6">
                    <a.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-3">{a.title}</h3>
                  <p className="text-[15px] leading-relaxed mb-7 flex-1">{a.body}</p>
                  <Link to="/templates" className="inline-flex items-center gap-2 text-sm font-bold text-pine hover:text-pine-deep transition-colors">
                    {a.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
          <div className="mb-10">
            <p className="eyebrow mb-4">FAQ</p>
            <h2 className="font-display text-3xl sm:text-[42px] leading-tight text-ink font-semibold">
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
            <h2 className="font-display text-3xl sm:text-5xl text-paper font-semibold mb-5">
              Your next role starts with one page<span className="text-seal">.</span>
            </h2>
            <p className="text-lg text-[#B9BFD6] mb-9 max-w-xl mx-auto">
              Build it free in about ten minutes. Export a PDF recruiters — and their software — will actually read.
            </p>
            <button
              onClick={() => navigate('/start')}
              className="bg-seal text-ink rounded-full px-10 py-4 text-[15px] font-bold hover:bg-[#FB8D6E] transition-colors inline-flex items-center gap-2"
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
