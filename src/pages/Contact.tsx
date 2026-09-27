import { FC, useState } from 'react';
import { Seo } from '../components/Seo';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

const CONTACT_EMAIL = 'akshaymad0608@gmail.com';

const TOPICS = [
  'General question',
  'Bug report',
  'Feature request',
  'Template suggestion',
  'Advertising / partnership',
  'Other',
];

const Contact: FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent(`[QuickResume] ${data.get('topic') || 'Contact'}`);
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-paper text-body flex flex-col font-sans selection:bg-pine selection:text-white">
      <Seo
        path="/contact"
        title="Contact QuickResume | Get in Touch"
        description="Have a question, found a bug, or want to suggest a feature? Send us a message and we'll get back to you."
      />
      <Navbar />

      <main className="max-w-2xl mx-auto w-full px-6 pt-32 pb-24 flex-1">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist mb-3">Contact</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink mb-3">Get in touch</h1>
        <p className="text-mist mb-12 text-[15px] leading-relaxed">
          Bug report, feature request or just a question — fill out the form below and we'll reply as soon as we can.
        </p>

        {submitted ? (
          <div className="rounded-2xl border border-pine/30 bg-pine/5 p-8 text-center">
            <p className="text-ink font-display text-xl font-semibold mb-2">Message sent!</p>
            <p className="text-mist text-[15px]">
              Your email client should have opened. If it didn't,{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-pine hover:underline">
                email us directly
              </a>
              .
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-[13px] font-medium text-ink mb-1.5">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-[15px] text-ink placeholder-mist focus:border-pine focus:outline-none focus:ring-2 focus:ring-pine/20 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[13px] font-medium text-ink mb-1.5">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-[15px] text-ink placeholder-mist focus:border-pine focus:outline-none focus:ring-2 focus:ring-pine/20 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="topic" className="block text-[13px] font-medium text-ink mb-1.5">
                Topic
              </label>
              <select
                id="topic"
                name="topic"
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-[15px] text-ink focus:border-pine focus:outline-none focus:ring-2 focus:ring-pine/20 transition-colors appearance-none"
              >
                {TOPICS.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-[13px] font-medium text-ink mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="Describe your question or issue..."
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-[15px] text-ink placeholder-mist focus:border-pine focus:outline-none focus:ring-2 focus:ring-pine/20 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-pine px-6 py-3.5 text-[15px] font-semibold text-white hover:bg-pine/90 transition-colors"
            >
              Send message
            </button>
          </form>
        )}

        <p className="mt-10 text-center text-[13px] text-mist">
          Or email us directly at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-pine hover:underline">
            {CONTACT_EMAIL}
          </a>
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
