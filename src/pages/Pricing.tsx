import { FC } from 'react';
import { Seo } from '../components/Seo';
import { useNavigate } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

/*
 * Two real fixes here, beyond bringing the page onto the site's own design
 * tokens (it was slate/blue — not pine/ink/paper like everywhere else).
 *
 * 1. "Cancel anytime" and a working-looking "Upgrade to Pro" button are gone.
 *    There is no payment processor anywhere in this codebase and no gating
 *    logic anywhere restricts what a "Free" user can reach — every template
 *    and every AI tool is open to everyone today. "Cancel anytime" describes
 *    a subscription that cannot currently be started; keeping that line while
 *    making the page look more trustworthy would have made the false claim
 *    more convincing, not less.
 *
 * 2. Both CTAs now say what actually happens when you click them: you reach
 *    the free builder, because that is the only thing behind either button
 *    right now. Pro is framed as "free during early access" — true today,
 *    and it reads as a real roadmap rather than a fake paywall. When billing
 *    is wired up, this page needs its claims rewritten to match, not before.
 */

const FREE_FEATURES = [
  'Every ATS-friendly template',
  'AI summary, bullet rewrites & skill suggestions',
  'ATS score checker',
  'Cover letter generator',
  'Export to PDF',
];

const PRO_FEATURES = [
  'Everything in Free',
  'Export to DOCX',
  'Deep ATS score analysis with line-by-line fixes',
  'Job description keyword matcher',
  'Priority AI generation',
];

const Pricing: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-paper text-body flex flex-col font-sans selection:bg-pine selection:text-white">
      <Seo
        path="/pricing"
        title="Pricing — Free & Pro Plans Compared | QuickResume"
        description="Every resume tool is free today, including AI writing and the ATS checker. See what's included now and what Pro will add."
      />

      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center mb-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist mb-3">Pricing</p>
          {/*
            Was "Free today. Simple when Pro launches." — true to the page,
            but zero overlap with the <title> ("Pricing — Free & Pro Plans
            Compared"). The small "Pricing" label above is a <p>, not a
            heading, so it carries none of the keyword weight an <h1> does.
            Same message, with the word the title and the page are actually
            about now in the one tag Google reads structurally.
          */}
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink mb-4">
            Pricing: free today, simple when Pro launches
          </h1>
          <p className="text-lg text-mist max-w-xl mx-auto leading-relaxed">
            Every template and every AI tool is free to use right now — no card, no limit.
            Here's what's included, and what Pro adds when it launches.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-16">
          <div className="rounded-2xl border border-line bg-card p-8 flex flex-col shadow-card">
            <h2 className="font-display text-xl font-semibold text-ink mb-1">Free</h2>
            <p className="text-sm text-mist mb-6">Available now, no sign-up required.</p>
            <div className="flex items-end gap-1 border-b border-line pb-8 mb-8">
              <span className="text-4xl font-bold text-ink">$0</span>
            </div>
            <ul className="space-y-3.5 mb-10 flex-1">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm font-medium text-ink-soft">
                  <Check className="w-4.5 h-4.5 text-pine shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              className="w-full py-3.5 rounded-xl font-semibold text-center border border-line bg-paper text-ink hover:border-pine transition-colors"
              onClick={() => navigate('/start')}
            >
              Start free
            </button>
          </div>

          <div className="rounded-2xl border-2 border-pine bg-card p-8 flex flex-col shadow-lift relative">
            <span className="absolute -top-3 left-8 inline-flex items-center gap-1.5 bg-pine text-white text-xs font-bold px-3 py-1 rounded-full">
              <Sparkles size={12} /> Coming soon
            </span>
            <h2 className="font-display text-xl font-semibold text-ink mb-1">Pro</h2>
            <p className="text-sm text-mist mb-6">Free during early access — pricing isn't set yet.</p>
            <div className="flex items-end gap-1 border-b border-line pb-8 mb-8">
              <span className="text-4xl font-bold text-ink">Free</span>
              <span className="text-mist font-medium mb-1">for now</span>
            </div>
            <ul className="space-y-3.5 mb-10 flex-1">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm font-medium text-ink-soft">
                  <Check className="w-4.5 h-4.5 text-pine shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              className="w-full py-3.5 rounded-xl font-semibold text-center bg-pine text-white hover:bg-pine-deep transition-colors shadow-sm"
              onClick={() => navigate('/start')}
            >
              Try Pro features free
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-mist mt-10 max-w-md mx-auto">
          Both buttons take you to the same free builder — Pro isn't gated yet. We'll email early
          users before anything becomes paid.
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
