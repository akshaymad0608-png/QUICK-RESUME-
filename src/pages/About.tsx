import { FC } from 'react';
import { Seo } from '../components/Seo';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

const About: FC = () => (
  <div className="min-h-screen bg-paper text-body flex flex-col font-sans selection:bg-pine selection:text-white">
    <Seo
      path="/about"
      title="About QuickResume | Free AI Resume Builder"
      description="QuickResume is a free AI resume builder for creating ATS-friendly resumes in minutes. Read our mission and how we help job seekers land more interviews."
    />
    <Navbar />

    <main className="max-w-3xl mx-auto w-full px-6 pt-32 pb-24 flex-1">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist mb-3">About</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink mb-6">
        Built to get you past the bots
      </h1>

      <div className="space-y-10 text-[15px] leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Our mission</h2>
          <p>
            QuickResume exists because most resume builders are either expensive, ugly, or both.
            We set out to build something that's genuinely free, fast to use, and produces resumes
            that actually get through applicant tracking systems — the software that screens most
            applications before a human ever sees them.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">What we built</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-ink">60+ free templates</strong> designed to parse cleanly
              through ATS software like Workday, Greenhouse and Lever, while still looking sharp
              when a recruiter opens the PDF.
            </li>
            <li>
              <strong className="text-ink">AI writing tools</strong> that draft your professional
              summary, rewrite bullet points into measurable achievements, suggest skills for your
              role, and generate tailored cover letters.
            </li>
            <li>
              <strong className="text-ink">ATS score checker</strong> that shows you how your
              resume reads to applicant tracking software before you submit it.
            </li>
            <li>
              <strong className="text-ink">Free PDF export</strong> — no watermarks, no sign-up
              required for basic use.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Who it's for</h2>
          <p>
            Anyone who needs a resume — freshers building their first one, experienced professionals
            tailoring one application at a time, or anyone who suspects their current resume is
            being filtered out by software before a human ever reads it.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">How we're kept free</h2>
          <p>
            The core tools — resume builder, AI writing, ATS score checker and PDF export — are
            free. We offer a Pro plan for unlimited resume saves and premium templates. Some pages
            carry advertising via Google AdSense. That's it: no data selling, no hidden fees.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Contact</h2>
          <p>
            Questions, bug reports or feature requests? Use the{' '}
            <a href="/contact" className="text-pine hover:underline">contact form</a> or email us
            directly at{' '}
            <a href="mailto:akshaymad0608@gmail.com" className="text-pine hover:underline">
              akshaymad0608@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>

    <Footer />
  </div>
);

export default About;
