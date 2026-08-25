import { FC, useState } from 'react';
import { Seo } from '../components/Seo';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Link } from 'react-router-dom';
import { Mail, Loader2, Copy, Check, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { generateThankYouEmail } from '../services/geminiService';

/*
 * Same shape as the LinkedIn Headline Generator: standalone, no resume, no
 * sign-up, reuses the existing /api/gemini endpoint. Different visitor
 * though — this one just walked out of an interview and has maybe an hour
 * before "should have sent it already" turns into "too late now". The form
 * has to be fillable in under a minute.
 */

const TONES = ['Warm', 'Formal', 'Brief'] as const;
type Tone = (typeof TONES)[number];

const ThankYouEmailGenerator: FC = () => {
  const [interviewerName, setInterviewerName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [highlight, setHighlight] = useState('');
  const [tone, setTone] = useState<Tone>('Warm');
  const [email, setEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!jobTitle.trim() || !company.trim()) {
      toast.error('Enter at least the job title and company.');
      return;
    }
    setIsGenerating(true);
    setEmail('');
    try {
      const result = await generateThankYouEmail(
        interviewerName.trim(),
        jobTitle.trim(),
        company.trim(),
        highlight.trim(),
        tone,
      );
      setEmail(result);
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Could not generate the email.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success('Copied');
      setTimeout(() => setCopied(false), 1800);
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
        name: 'How soon should I send a post-interview thank-you email?',
        acceptedAnswer: { '@type': 'Answer', text: 'Within 24 hours — same day if the interview was in the morning or early afternoon. It reads as a genuine, timely reaction rather than something drafted later.' },
      },
      {
        '@type': 'Question',
        name: 'Should I email every interviewer separately?',
        acceptedAnswer: { '@type': 'Answer', text: 'If you have each interviewer\'s email, yes — a short, individually relevant note to each is stronger than one email to a group, and each can reference what that specific person discussed with you.' },
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
        path="/interview-thank-you-email-generator"
        title="Free Interview Thank-You Email Generator (2026)"
        description="Generate a post-interview thank-you email in seconds — job title, company and what you discussed in, a ready-to-send email out. Free, no sign-up."
        jsonLd={faqSchema}
      />

      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <p className="eyebrow justify-center mb-4">Free tool · No sign-up</p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink mb-4">
            Interview Thank-You Email Generator
          </h1>
          <p className="text-lg text-mist max-w-xl mx-auto leading-relaxed">
            A few details from the interview in, a ready-to-send email out. Best sent within 24 hours.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-card border border-line rounded-2xl p-6 sm:p-8 shadow-card">
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="job-title" className="block text-sm font-semibold text-ink mb-1.5">
                Job title <span className="text-mist font-normal">(required)</span>
              </label>
              <input
                id="job-title"
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Senior Data Analyst"
                className="w-full px-4 py-3 bg-paper border border-line rounded-xl focus:border-pine focus:ring-1 focus:ring-pine outline-none text-ink placeholder:text-mist transition-all"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-ink mb-1.5">
                Company <span className="text-mist font-normal">(required)</span>
              </label>
              <input
                id="company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Northwind Traders"
                className="w-full px-4 py-3 bg-paper border border-line rounded-xl focus:border-pine focus:ring-1 focus:ring-pine outline-none text-ink placeholder:text-mist transition-all"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="interviewer" className="block text-sm font-semibold text-ink mb-1.5">
                Interviewer's name <span className="text-mist font-normal">(optional)</span>
              </label>
              <input
                id="interviewer"
                type="text"
                value={interviewerName}
                onChange={(e) => setInterviewerName(e.target.value)}
                placeholder="e.g. Priya"
                className="w-full px-4 py-3 bg-paper border border-line rounded-xl focus:border-pine focus:ring-1 focus:ring-pine outline-none text-ink placeholder:text-mist transition-all"
              />
            </div>
            <div>
              <label htmlFor="tone" className="block text-sm font-semibold text-ink mb-1.5">
                Tone
              </label>
              <select
                id="tone"
                value={tone}
                onChange={(e) => setTone(e.target.value as Tone)}
                className="w-full px-4 py-3 bg-paper border border-line rounded-xl focus:border-pine focus:ring-1 focus:ring-pine outline-none text-ink transition-all"
              >
                {TONES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <label htmlFor="highlight" className="block text-sm font-semibold text-ink mb-1.5">
            Something specific from the interview <span className="text-mist font-normal">(optional, but makes it much better)</span>
          </label>
          <textarea
            id="highlight"
            value={highlight}
            onChange={(e) => setHighlight(e.target.value)}
            placeholder="e.g. We talked about the team's move to a new data pipeline — I mentioned my experience migrating one at my last job."
            rows={3}
            className="w-full px-4 py-3 bg-paper border border-line rounded-xl focus:border-pine focus:ring-1 focus:ring-pine outline-none resize-none text-ink placeholder:text-mist transition-all mb-6"
          />

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-pine text-white font-bold rounded-xl py-3.5 flex items-center justify-center gap-2 hover:bg-pine-deep transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-card"
          >
            {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Mail size={20} />}
            {isGenerating ? 'Writing...' : 'Generate email'}
          </button>
        </div>

        {email && (
          <div className="max-w-2xl mx-auto mt-8">
            <div className="bg-card border border-line rounded-xl p-6 shadow-card">
              <div className="flex justify-between items-start gap-4 mb-3">
                <h2 className="font-display text-lg font-semibold text-ink">Your email</h2>
                <button
                  onClick={handleCopy}
                  className="shrink-0 flex items-center gap-1.5 text-sm font-semibold text-pine hover:text-pine-deep transition-colors"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="text-[15px] leading-relaxed text-ink-soft whitespace-pre-wrap">{email}</p>
            </div>

            <div className="text-center pt-8">
              <p className="text-mist mb-4">While you wait to hear back, make sure your resume is ready too.</p>
              <Link
                to="/improve"
                className="inline-flex items-center gap-2 rounded-lg bg-ink px-6 py-3 font-semibold text-white hover:bg-ink-soft transition-colors"
              >
                Check my resume's ATS score <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}

        <div className="max-w-2xl mx-auto mt-16 pt-10 border-t border-line">
          <h2 className="font-display text-xl font-semibold text-ink mb-5">A few things worth knowing</h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-ink mb-1">How soon should I send this?</h3>
              <p className="text-[15px] text-mist leading-relaxed">Within 24 hours — same day if you can. It reads as genuine and timely rather than an afterthought.</p>
            </div>
            <div>
              <h3 className="font-semibold text-ink mb-1">Should I email every interviewer separately?</h3>
              <p className="text-[15px] text-mist leading-relaxed">If you have each person's email, yes — a short, individually relevant note beats one email sent to a group.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ThankYouEmailGenerator;
