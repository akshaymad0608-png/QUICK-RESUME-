import { FC } from 'react';
import { Seo } from '../components/Seo';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

/**
 * Deliberately carries no billing, refund or cancellation clause.
 *
 * The Pricing page lists a "Pro" plan at $15/mo with a working-looking
 * "Upgrade to Pro" button — but that button just calls
 * navigate('/start'). There is no payment processor anywhere in this
 * codebase (grepped for stripe/razorpay/paypal/checkout/isPro — nothing),
 * and no gating logic anywhere restricts the "Free" plan's advertised
 * limits ("1 Resume build", "Basic templates") from the templates or tools a
 * free visitor can actually reach.
 *
 * Writing "cancel anytime" or a refund window for a purchase that cannot
 * currently be made would be worse than the missing page this replaces — a
 * false promise in the one document meant to be trustworthy on the whole
 * site. That's a product decision (a payment processor, and what the Free
 * tier should actually be prevented from doing) for the site owner to make,
 * not something to invent here. Add a Billing section once it's real.
 */
const TermsOfService: FC = () => (
  <div className="min-h-screen bg-paper text-body flex flex-col font-sans selection:bg-pine selection:text-white">
    <Seo
      path="/terms"
      title="Terms of Service | QuickResume"
      description="The terms for using QuickResume's resume builder, templates and AI writing tools."
    />
    <Navbar />

    <main className="max-w-3xl mx-auto w-full px-6 pt-32 pb-24 flex-1">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist mb-3">Legal</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink mb-3">Terms of Service</h1>
      <p className="text-mist mb-12">Last updated: 25 August 2026.</p>

      <div className="space-y-10 text-[15px] leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Using QuickResume</h2>
          <p>
            QuickResume provides resume and cover letter templates, an AI-assisted writing tool, and an
            ATS score checker. You're responsible for the accuracy of what you put in your own resume —
            our AI tools suggest and rewrite text, but you choose what to submit for a job application,
            and you should check any AI-generated wording before you send it anywhere.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Your content</h2>
          <p>
            The resume, cover letter and personal details you enter belong to you. We don't claim
            ownership of it, and — as covered in the Privacy Policy — it's stored in your own browser,
            not in a database on our servers. Text you send to an AI tool is processed to generate a
            response and is not retained by us afterward.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">AI-generated content</h2>
          <p>
            Summaries, rewritten bullet points, skill suggestions and cover letters produced by our AI
            tools are generated automatically and may contain errors or generic phrasing. They're a
            starting point, not a guarantee of interview or employment outcomes. Review anything
            AI-generated before using it.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Acceptable use</h2>
          <p>
            Don't use QuickResume to generate content that is fraudulent (fabricated credentials,
            employment history or qualifications you don't have), to scrape or abuse the AI tools at
            volume outside normal use, or to attempt to access another user's data.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">No warranty</h2>
          <p>
            QuickResume is provided as-is. We aim for the ATS score checker and templates to be accurate
            and reliable, but we don't guarantee that a resume built here will pass any specific
            employer's applicant tracking system or result in an interview or job offer.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Changes</h2>
          <p>
            We may update these terms as the product changes. Material changes — including if paid
            plans become billable — will be reflected here with an updated date above.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Contact</h2>
          <p>
            Questions about these terms: <a href="mailto:hello@quickresume.business" className="text-pine underline underline-offset-2">hello@quickresume.business</a>.
          </p>
        </section>
      </div>
    </main>

    <Footer />
  </div>
);

export default TermsOfService;
