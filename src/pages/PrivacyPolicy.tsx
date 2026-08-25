import { FC } from 'react';
import { Seo } from '../components/Seo';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

/**
 * This page did not exist. Both footer links labelled "Privacy" and "Terms"
 * pointed at "/" — dead ends on a site that runs Google Sign-In, Google
 * Analytics, and sends resume text to an AI model.
 *
 * Every claim below was checked against what the code actually does, not
 * assumed:
 *
 *   - Firestore (`db` in src/firebase.ts) is initialised but never written to
 *     anywhere in src/ — no collection(db, ...), no setDoc. Resume data is
 *     not stored server-side today.
 *   - ResumeContext reads/writes localStorage under the key "resume_data".
 *     That is where a resume actually lives: the visitor's own browser.
 *   - Google Sign-In (Firebase Auth) is the only account system — no
 *     separate password, no other identity provider in the code.
 *   - The AI tools call api/gemini.ts, a server-side function — resume text
 *     goes to QuickResume's own server, which forwards it to Google's Gemini
 *     API. The API key lives server-side (GEMINI_API_KEY), never in the
 *     client bundle.
 *   - Analytics is Google Analytics via gtag.js (index.html), measurement id
 *     G-1PF8P1FRWC.
 *   - No payment processor exists anywhere in this codebase. See the note in
 *     TermsOfService.tsx before adding billing language to either page.
 *
 * If any of this changes — Firestore starts being written to, a payment
 * processor is added, a new tracking script goes in index.html — this page
 * is now wrong until it is updated to match.
 */
const PrivacyPolicy: FC = () => (
  <div className="min-h-screen bg-paper text-body flex flex-col font-sans selection:bg-pine selection:text-white">
    <Seo
      path="/privacy"
      title="Privacy Policy | QuickResume"
      description="What QuickResume collects, why, and where your resume data actually lives."
    />
    <Navbar />

    <main className="max-w-3xl mx-auto w-full px-6 pt-32 pb-24 flex-1">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist mb-3">Legal</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink mb-3">Privacy Policy</h1>
      <p className="text-mist mb-12">Last updated: 25 August 2026.</p>

      <div className="space-y-10 text-[15px] leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Your resume stays in your browser</h2>
          <p>
            QuickResume builds your resume in your browser and saves your progress to your device's
            local storage, not to a server database. If you clear your browser data, or switch devices,
            that saved draft is gone — there is nothing to recover it from on our side. Exporting to PDF
            or DOCX happens on your device; the finished file is not kept on our servers after it's
            generated.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">What we collect, and why</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-ink">Google account details.</strong> If you sign in, Google shares
              your name, email address and profile photo with us via Firebase Authentication. We use this
              to identify your account. We do not receive your Google password.
            </li>
            <li>
              <strong className="text-ink">Resume and cover letter text you submit to an AI tool.</strong>{' '}
              When you use the AI summary generator, bullet rewriter, ATS score checker or cover letter
              generator, the relevant text is sent from your browser to our server, which forwards it to
              Google's Gemini API to generate a response. That text is processed to generate your result;
              it is not stored in a database on our end afterward.
            </li>
            <li>
              <strong className="text-ink">Usage analytics.</strong> We use Google Analytics to understand
              which pages get used and how — device type, approximate location from IP, pages visited,
              time on site. This is aggregate usage data, not the content of your resume.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Third parties involved</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-ink">Google Firebase</strong> — authentication.</li>
            <li><strong className="text-ink">Google Gemini API</strong> — generates AI writing suggestions from text you submit.</li>
            <li><strong className="text-ink">Google Analytics</strong> — site usage analytics.</li>
          </ul>
          <p className="mt-3">
            Each operates under its own privacy policy in addition to this one. We don't sell resume
            data or account details to anyone, and we don't share your resume content with employers,
            recruiters, or any third party outside the processing above.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Cookies</h2>
          <p>
            Google Analytics sets cookies to distinguish visitors. Firebase Authentication uses local
            storage and cookies to keep you signed in. We don't run advertising or cross-site tracking
            cookies.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Your choices</h2>
          <p>
            Clearing your browser's local storage removes your saved resume draft. Signing out ends your
            Firebase session. You can ask us to confirm what account data we hold and to delete it — see
            contact below.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Contact</h2>
          <p>
            Questions about this policy or a data request: <a href="mailto:privacy@quickresume.business" className="text-pine underline underline-offset-2">privacy@quickresume.business</a>.
          </p>
        </section>
      </div>
    </main>

    <Footer />
  </div>
);

export default PrivacyPolicy;
