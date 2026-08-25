import { FC, useState } from 'react';
import { Seo } from '../components/Seo';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Link } from 'react-router-dom';
import { Sparkles, Loader2, Copy, Check, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { generateLinkedInHeadlines } from '../services/geminiService';

/*
 * The one AI tool on the site that doesn't need a resume, or a sign-in, or a
 * visit to /build first. Every other tool (summary generator, ATS checker,
 * bullet rewriter) assumes there's already resume data to work on. A visitor
 * searching "linkedin headline generator" has none of that yet — they have a
 * job title and maybe a few keywords, and they want an answer in one screen.
 * So this page asks for exactly those two things and nothing else.
 *
 * It's also a deliberately different search intent from the existing
 * /resume-headline-examples guide (that one is about the headline FIELD on a
 * Naukri resume profile, a specific field with a 250-character limit on one
 * platform). LinkedIn's headline is a different field with a different limit
 * (220 characters) and a different audience — real, separate search volume,
 * not a duplicate of a page the site already has.
 */

const EXPERIENCE_LEVELS = ['Student / Fresher', '1–3 years', '3–7 years', '7+ years / Senior', 'Career changer'];

const LinkedInHeadlineGenerator: FC = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [level, setLevel] = useState(EXPERIENCE_LEVELS[1]);
  const [headlines, setHeadlines] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!jobTitle.trim()) {
      toast.error('Enter a job title or target role first.');
      return;
    }
    setIsGenerating(true);
    setHeadlines([]);
    try {
      const results = await generateLinkedInHeadlines(jobTitle.trim(), keywords.trim(), level);
      if (results.length === 0) throw new Error('No headlines came back — try again.');
      setHeadlines(results);
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Could not generate headlines.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async (headline: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(headline);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx((c) => (c === idx ? null : c)), 1800);
    } catch {
      toast.error("Couldn't copy — select and copy manually.");
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long can a LinkedIn headline be?',
        acceptedAnswer: { '@type': 'Answer', text: 'LinkedIn headlines are limited to 220 characters. Every headline this tool generates fits inside that limit.' },
      },
      {
        '@type': 'Question',
        name: 'Is this the same as a resume headline?',
        acceptedAnswer: { '@type': 'Answer', text: 'No. A resume headline (used on portals like Naukri) is a different field with a shorter, different-platform limit. A LinkedIn headline is what appears under your name across LinkedIn — in search results, comments and connection requests — so it is written for a different context.' },
      },
      {
        '@type': 'Question',
        name: 'Is this free?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes, free, with no sign-up required.' },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-paper text-body flex flex-col font-sans selection:bg-pine selection:text-white">
      <Seo
        path="/linkedin-headline-generator"
        title="Free LinkedIn Headline Generator (2026) — 8 Options in Seconds"
        description="Generate 8 LinkedIn headline options from your job title and skills — free, no sign-up. Fits LinkedIn's 220-character limit, ready to paste in."
        jsonLd={faqSchema}
      />

      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <p className="eyebrow justify-center mb-4">Free tool · No sign-up</p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink mb-4">
            LinkedIn Headline Generator
          </h1>
          <p className="text-lg text-mist max-w-xl mx-auto leading-relaxed">
            Your job title and a few keywords in, 8 headline options out — each under LinkedIn's 220-character limit.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-card border border-line rounded-2xl p-6 sm:p-8 shadow-card">
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="job-title" className="block text-sm font-semibold text-ink mb-1.5">
                Job title or target role
              </label>
              <input
                id="job-title"
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Product Manager"
                className="w-full px-4 py-3 bg-paper border border-line rounded-xl focus:border-pine focus:ring-1 focus:ring-pine outline-none text-ink placeholder:text-mist transition-all"
              />
            </div>
            <div>
              <label htmlFor="exp-level" className="block text-sm font-semibold text-ink mb-1.5">
                Experience level
              </label>
              <select
                id="exp-level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-4 py-3 bg-paper border border-line rounded-xl focus:border-pine focus:ring-1 focus:ring-pine outline-none text-ink transition-all"
              >
                {EXPERIENCE_LEVELS.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          <label htmlFor="keywords" className="block text-sm font-semibold text-ink mb-1.5">
            Key skills or keywords <span className="text-mist font-normal">(optional)</span>
          </label>
          <input
            id="keywords"
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g. B2B SaaS, roadmapping, Figma, data-driven"
            className="w-full px-4 py-3 bg-paper border border-line rounded-xl focus:border-pine focus:ring-1 focus:ring-pine outline-none text-ink placeholder:text-mist transition-all mb-6"
          />

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-pine text-white font-bold rounded-xl py-3.5 flex items-center justify-center gap-2 hover:bg-pine-deep transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-card"
          >
            {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
            {isGenerating ? 'Generating...' : 'Generate 8 headlines'}
          </button>
        </div>

        {headlines.length > 0 && (
          <div className="max-w-2xl mx-auto mt-8 space-y-3">
            {headlines.map((h, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-card border border-line rounded-xl p-4 shadow-card"
              >
                <p className="flex-1 text-[15px] leading-relaxed text-ink-soft">{h}</p>
                <button
                  onClick={() => handleCopy(h, i)}
                  className="shrink-0 grid place-items-center w-9 h-9 rounded-lg border border-line text-mist hover:border-pine hover:text-pine transition-colors"
                  title="Copy"
                  aria-label={`Copy headline ${i + 1}`}
                >
                  {copiedIdx === i ? <Check size={16} className="text-pine" /> : <Copy size={16} />}
                </button>
              </div>
            ))}

            <div className="text-center pt-6">
              <p className="text-mist mb-4">Now build the resume to match it.</p>
              <Link
                to="/start"
                className="inline-flex items-center gap-2 rounded-lg bg-ink px-6 py-3 font-semibold text-white hover:bg-ink-soft transition-colors"
              >
                Build my resume free <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}

        <div className="max-w-2xl mx-auto mt-16 pt-10 border-t border-line">
          <h2 className="font-display text-xl font-semibold text-ink mb-5">A few things worth knowing</h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-ink mb-1">How long can a LinkedIn headline be?</h3>
              <p className="text-[15px] text-mist leading-relaxed">220 characters. Every headline here fits inside that.</p>
            </div>
            <div>
              <h3 className="font-semibold text-ink mb-1">Is this the same as a resume headline?</h3>
              <p className="text-[15px] text-mist leading-relaxed">
                No — a resume headline (like the one on Naukri) is a different field with a different limit. See our{' '}
                <a href="/resume-headline-examples" className="text-pine underline underline-offset-2">
                  resume headline examples
                </a>{' '}
                guide for that one specifically.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LinkedInHeadlineGenerator;
