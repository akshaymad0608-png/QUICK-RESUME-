import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Navbar } from './components/layout/Navbar';
import { TemplateCard } from './components/TemplateCard';
import { TEMPLATES } from './data/templates';
import { motion } from 'framer-motion';
import { useResume } from './context/ResumeContext';

/* ---------- Signature element: a live resume sheet ---------- */
const bar = (w: string, c = 'bg-line') => (
  <div className={`h-2 rounded-full ${c}`} style={{ width: w }} />
);

const ResumeSheet: FC = () => {
  const reveal = {
    hidden: { opacity: 0, y: 8 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.15 + i * 0.12, duration: 0.5 } }),
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: -1.5 }}
      animate={{ opacity: 1, y: 0, rotate: -1.5 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[420px] mx-auto bg-surface rounded-2xl shadow-lift border border-line p-7 sm:p-9"
    >
      {/* header */}
      <motion.div custom={0} variants={reveal} initial="hidden" animate="show" className="mb-5">
        <div className="font-display text-2xl font-bold text-ink leading-tight">Priya Nair</div>
        <div className="font-mono-ui text-[0.7rem] tracking-widest uppercase text-brand-deep mt-1">
          Product Designer
        </div>
      </motion.div>

      <div className="h-px bg-line mb-5" />

      {/* experience */}
      <motion.div custom={1} variants={reveal} initial="hidden" animate="show" className="mb-5">
        <div className="font-mono-ui text-[0.62rem] tracking-[0.2em] uppercase text-ink mb-3">Experience</div>
        <div className="space-y-2.5">
          {bar('72%', 'bg-ink/80')}
          {bar('90%')}
          {bar('82%')}
          {bar('60%')}
        </div>
      </motion.div>

      {/* skills as chips */}
      <motion.div custom={2} variants={reveal} initial="hidden" animate="show">
        <div className="font-mono-ui text-[0.62rem] tracking-[0.2em] uppercase text-ink mb-3">Skills</div>
        <div className="flex flex-wrap gap-2">
          {['Figma', 'Research', 'Prototyping', 'Design systems'].map((s) => (
            <span key={s} className="text-xs font-medium px-2.5 py-1 rounded-full bg-brand-soft text-brand-deep">
              {s}
            </span>
          ))}
        </div>
      </motion.div>

      {/* floating "AI polished" tag */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, type: 'spring', stiffness: 260, damping: 18 }}
        className="absolute -right-3 sm:-right-5 top-16 bg-ink text-paper text-xs font-semibold px-3 py-2 rounded-xl shadow-lift flex items-center gap-1.5"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" /> AI-polished
      </motion.div>
    </motion.div>
  );
};

export const Home: FC = () => {
  const navigate = useNavigate();
  const { data, updateSection } = useResume();

  const handleSelectTemplate = (id: string, color?: string) => {
    updateSection('design', { ...data.design, template: id, color: color || '#0D9488' });
    navigate('/build');
  };

  const steps = [
    { n: '01', t: 'Fill the essentials', d: 'Add your roles, education, and skills in a guided form. No blank-page dread — just answer the prompts.' },
    { n: '02', t: 'Let AI sharpen it', d: 'Turn plain notes into achievement-driven bullet points, tuned for the exact job you are chasing.' },
    { n: '03', t: 'Export anywhere', d: 'Download a pixel-clean PDF, an editable Word file, or a structured Excel sheet — in one click.' },
  ];

  return (
    <div className="min-h-screen bg-paper text-body overflow-x-hidden">
      <Helmet>
        <title>QuickResume — AI resume builder</title>
        <meta name="description" content="Fill in the facts. AI writes the resume. Export to PDF, Word, or Excel in one click." />
      </Helmet>

      <Navbar />

      {/* ---------------- Hero ---------------- */}
      <main className="pt-[72px]">
        <section className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-20">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-8 items-center">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="eyebrow mb-5"
              >
                AI Resume Builder
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
                className="font-display font-extrabold text-ink tracking-tight leading-[0.98] text-[2.7rem] sm:text-6xl lg:text-[4.4rem]"
              >
                Your resume,<br />
                written while<br />
                you <span className="mark">think</span>.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
                className="mt-6 text-lg text-body max-w-md leading-relaxed"
              >
                Fill in the facts. QuickResume turns them into sharp, ATS-ready bullet points —
                then exports to PDF, Word, or Excel in a single click.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
                className="mt-9 flex flex-col sm:flex-row gap-3"
              >
                <button
                  onClick={() => navigate('/build')}
                  className="group inline-flex items-center justify-center gap-2 bg-ink text-paper rounded-full px-7 py-4 text-sm font-semibold hover:bg-brand-deep transition-colors"
                >
                  Build my resume
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={() => navigate('/templates')}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-ink border border-line bg-surface hover:border-ink transition-colors"
                >
                  Browse templates
                </button>
              </motion.div>

              <motion.ul
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-body"
              >
                {['ATS-ready output', 'PDF, Word & Excel', 'No sign-up to start'].map((f) => (
                  <li key={f} className="inline-flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-brand" /> {f}
                  </li>
                ))}
              </motion.ul>
            </div>

            <div className="relative">
              {/* soft ambient wash behind the sheet, quiet */}
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_60%_35%,rgba(13,148,136,0.10),transparent_70%)]" />
              <ResumeSheet />
            </div>
          </div>
        </section>

        {/* ---------------- How it works (a real sequence) ---------------- */}
        <section className="border-t border-line bg-surface">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
            <div className="max-w-xl mb-14">
              <p className="eyebrow mb-3">How it works</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight">
                Three steps from blank to hired-ready.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-line rounded-2xl overflow-hidden border border-line">
              {steps.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-surface p-8 sm:p-10"
                >
                  <div className="font-mono-ui text-sm text-brand-deep mb-6">{s.n}</div>
                  <h3 className="font-display text-xl font-bold text-ink mb-3">{s.t}</h3>
                  <p className="text-body leading-relaxed text-[0.95rem]">{s.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Templates ---------------- */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="eyebrow mb-3">Templates</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight">
                Designed to be read — by humans and bots.
              </h2>
            </div>
            <Link to="/templates" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-brand transition-colors">
              All templates <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEMPLATES.slice(0, 3).map((tpl, idx) => (
              <motion.div
                key={tpl.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <TemplateCard template={tpl} onSelect={handleSelectTemplate} />
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/templates" className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-brand transition-colors">
              All templates <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ---------------- ATS band ---------------- */}
        <section className="bg-ink text-paper">
          <div className="max-w-4xl mx-auto px-5 sm:px-8 py-20 sm:py-28 text-center">
            <p className="font-mono-ui text-[0.72rem] tracking-[0.18em] uppercase text-brand mb-5">Built for the bots</p>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] mb-6">
              Parses cleanly into Workday, Greenhouse &amp; Lever.
            </h2>
            <p className="text-paper/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Every template is structured so applicant tracking systems read your experience the way you wrote it —
              no lost sections, no scrambled dates.
            </p>
            <button
              onClick={() => navigate('/build')}
              className="inline-flex items-center gap-2 bg-brand text-white rounded-full px-8 py-4 text-sm font-semibold hover:bg-brand-deep transition-colors"
            >
              Start building <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* ---------------- Final CTA ---------------- */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
          <div className="rounded-3xl border border-line bg-surface px-8 sm:px-16 py-16 sm:py-20 text-center shadow-paper">
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-ink tracking-tight mb-5">
              Ready in ten minutes.
            </h2>
            <p className="text-lg text-body max-w-md mx-auto mb-9">
              Free to build, free to export. Bring your details — QuickResume brings the polish.
            </p>
            <button
              onClick={() => navigate('/build')}
              className="inline-flex items-center gap-2 bg-ink text-paper rounded-full px-8 py-4 text-sm font-semibold hover:bg-brand-deep transition-colors"
            >
              Build my resume <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>

      {/* ---------------- Footer ---------------- */}
      <footer className="border-t border-line bg-paper">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
            <div className="col-span-2 max-w-xs">
              <Link to="/" className="flex items-center gap-2.5 mb-4">
                <span className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden>
                    <rect x="4" y="2.5" width="9" height="12" rx="1.5" fill="#FAFAF7" />
                    <rect x="6" y="5" width="5" height="1.2" rx="0.6" fill="#0D9488" />
                    <rect x="6" y="7.4" width="5" height="1" rx="0.5" fill="#9a9c90" />
                    <rect x="6" y="9.4" width="3.5" height="1" rx="0.5" fill="#9a9c90" />
                  </svg>
                </span>
                <span className="font-display text-xl font-bold tracking-tight text-ink">
                  Quick<span className="text-brand">Resume</span>
                </span>
              </Link>
              <p className="text-sm text-body leading-relaxed">
                The AI resume builder that writes with you. Focus on your career, not the formatting.
              </p>
            </div>

            {[
              { h: 'Product', items: [['Builder', '/build'], ['Templates', '/templates'], ['AI Tools', '/ai-tools'], ['Cover Letters', '/cover-letter']] },
              { h: 'Resources', items: [['Examples', '/examples'], ['Guides', '/resources'], ['Pricing', '/pricing']] },
              { h: 'Company', items: [['About', '/'], ['Contact', '/'], ['Privacy', '/'], ['Terms', '/']] },
            ].map((col) => (
              <div key={col.h}>
                <h4 className="font-mono-ui text-[0.68rem] tracking-widest uppercase text-ink mb-5">{col.h}</h4>
                <ul className="space-y-3">
                  {col.items.map(([label, to]) => (
                    <li key={label}>
                      <Link to={to} className="text-sm text-body hover:text-ink transition-colors">{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-body">© {new Date().getFullYear()} QuickResume. All rights reserved.</p>
            <p className="font-mono-ui text-[0.68rem] tracking-widest uppercase text-body">Paper &amp; ink · built for the web</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
