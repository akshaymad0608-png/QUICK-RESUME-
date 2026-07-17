import { Helmet } from 'react-helmet-async';
import { FileText, MessageSquare, ArrowRight, Wand2, Search, Edit3, ShieldCheck, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

const tools = [
  {
    id: 'summary-generator',
    name: 'AI Summary Generator',
    description: 'A recruiter-ready professional summary written for your target role — generated from your actual experience, not a generic template.',
    icon: FileText,
    to: '/build',
    popular: true,
  },
  {
    id: 'bullet-rewriter',
    name: 'Bullet Point Rewriter',
    description: 'Turn plain duties into quantified achievements. Improve, shorten, expand, or add plausible metrics with one click.',
    icon: Edit3,
    to: '/build',
  },
  {
    id: 'skills-suggestion',
    name: 'Skill Suggestions',
    description: 'AI recommends the industry-standard skills your resume is missing for your exact job title.',
    icon: Wand2,
    to: '/build',
  },
  {
    id: 'ats-checker',
    name: 'ATS Score Checker',
    description: 'Score your resume against real applicant-tracking rules and get specific fixes, section by section.',
    icon: ShieldCheck,
    to: '/build',
    popular: true,
  },
  {
    id: 'jd-match',
    name: 'Job Description Match',
    description: 'Paste any job post and see exactly which keywords and requirements your resume is missing.',
    icon: Search,
    to: '/build',
  },
  {
    id: 'cover-letter',
    name: 'Cover Letter Generator',
    description: 'A tailored cover letter drafted from your resume and the job description — in seconds.',
    icon: MessageSquare,
    to: '/cover-letter',
  },
  {
    id: 'resume-import',
    name: 'Resume Import',
    description: 'Upload your existing PDF or DOCX and AI extracts your details automatically — no retyping.',
    icon: Upload,
    to: '/start',
  },
];

export default function AITools() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-paper text-body font-sans flex flex-col selection:bg-pine selection:text-white">
      <Helmet>
        <title>Free AI Resume Tools — Summary, ATS Check, Cover Letters | QuickResume</title>
        <meta name="description" content="Seven free AI career tools: resume summary generator, ATS score checker, bullet point rewriter, skill suggestions, job description matcher and cover letter generator." />
        <link rel="canonical" href="https://quickresume.business/ai-tools" />
      </Helmet>

      <Navbar />

      <main className="flex-1 pt-16 md:pt-[72px]">
        <section className="bg-ruled border-b border-line">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-12 lg:pt-16 lg:pb-16">
            <p className="eyebrow mb-4">AI toolkit</p>
            <h1 className="font-display text-4xl sm:text-5xl text-ink font-semibold mb-4 max-w-2xl leading-tight">
              Seven tools that do the hard writing for you
            </h1>
            <p className="text-lg max-w-xl">
              Each one is built into the resume editor — use them individually here, or let them work together as you build.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map(tool => (
              <button
                key={tool.id}
                onClick={() => navigate(tool.to)}
                className="bg-card border border-line rounded-2xl p-7 text-left shadow-card hover:shadow-lift hover:-translate-y-0.5 transition-all flex flex-col group"
              >
                <div className="flex justify-between items-start mb-5">
                  <div className="w-12 h-12 rounded-xl bg-pine-tint text-pine flex items-center justify-center">
                    <tool.icon className="w-6 h-6" />
                  </div>
                  {tool.popular && (
                    <span className="font-mono text-[10px] tracking-[0.14em] uppercase bg-seal-tint text-[#B34A2E] border border-seal/40 px-2.5 py-1 rounded">Popular</span>
                  )}
                </div>
                <h2 className="text-lg font-bold text-ink mb-2">{tool.name}</h2>
                <p className="text-[15px] leading-relaxed mb-6 flex-1">{tool.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-pine">
                  Try it free <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
