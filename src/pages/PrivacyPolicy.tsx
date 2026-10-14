import { FC } from 'react';
import { Seo } from '../components/Seo';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

/**
 * Every statement below was checked against the code, not assumed. Re-check it
 * whenever any of these change, because this page is then wrong:
 *
 *   - Resume draft: ResumeContext keeps it in localStorage under "resume_data";
 *     the theme preference is in localStorage under "theme". PDF, DOCX and Excel
 *     exports are generated in the browser (ExportPanel, utils/export*).
 *   - Firestore (`db` in src/firebase.ts) is initialised but never written to,
 *     so no resume data is stored in a database.
 *   - Google Sign-In (Firebase Auth) is the only login used by the client. The
 *     OTP and welcome-email routes in server.ts exist only on the self-hosted
 *     Express server and nothing in src/ calls them.
 *   - AI text tools: src/services/geminiService.ts posts to /api/gemini, a
 *     server function that forwards the prompt to the Gemini API.
 *   - Resume upload: src/utils/uploadResume.ts posts the whole file (base64) to
 *     /api/extract-resume. PDFs are passed to Gemini as an attachment; DOCX text
 *     is extracted on the server with mammoth and sent to Gemini as text. Nothing
 *     is written to disk or a database. Server errors are logged with
 *     console.error; on an unparseable AI reply the first 500 characters of that
 *     reply (which can contain resume details) are logged.
 *   - The contact form only opens the visitor's own email app (mailto:).
 *   - Third-party scripts: Google Analytics (gtag, G-1PF8P1FRWC), Google
 *     AdSense, Google Fonts and the icon font from jsDelivr, all in index.html.
 *   - No payment processor exists in the codebase (see TermsOfService.tsx).
 */
const PrivacyPolicy: FC = () => (
  <div className="min-h-screen bg-paper text-body flex flex-col font-sans selection:bg-pine selection:text-white">
    <Seo
      path="/privacy"
      title="Privacy Policy — How QuickResume Handles Your Data"
      description="What QuickResume collects and why: what stays in your browser, what goes to Google Gemini when you use AI tools or upload a resume, and your rights."
    />
    <Navbar />

    <main className="max-w-3xl mx-auto w-full px-6 pt-32 pb-24 flex-1">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist mb-3">Legal</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink mb-3">Privacy Policy</h1>
      <p className="text-mist mb-12">Last updated: 14 October 2026.</p>

      <div className="space-y-10 text-[15px] leading-relaxed text-ink-soft">
        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">The short version</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Your resume draft is saved in your own browser, not in a QuickResume database.</li>
            <li>
              When you use an AI tool, or upload a PDF or DOCX to import or check it, the text or file is sent to our
              server and on to Google's Gemini API to produce the result.
            </li>
            <li>If you sign in, Google shares your name, email address and profile photo with us.</li>
            <li>We use Google Analytics and Google AdSense, which set cookies.</li>
            <li>We do not sell your data and we do not share your resume with employers or recruiters.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Who we are</h2>
          <p>
            QuickResume (quickresume.business) is built and run by Akshay Mahajan, an independent developer in
            India. For anything about this policy or your data, email{' '}
            <a href="mailto:akshaymad0608@gmail.com" className="text-pine underline underline-offset-2">akshaymad0608@gmail.com</a>.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Your resume draft stays in your browser</h2>
          <p>
            QuickResume saves your progress to your device's local storage, not to a server database. If you
            clear your browser data or switch devices, that draft is gone, and we cannot recover it. We also
            keep one small setting there: your light or dark theme. Exporting to PDF, DOCX or Excel happens in
            your browser, so the finished file is created on your device and is not sent to us.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">What we collect, and why</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-ink">Google account details.</strong> If you sign in, Google shares your
              name, email address and profile photo with us through Firebase Authentication. We use this to
              identify your account. We never receive your Google password.
            </li>
            <li>
              <strong className="text-ink">Text you send to an AI tool.</strong> When you use the summary
              generator, bullet rewriter, skill suggestions, cover letter generator, chat assistant or the
              LinkedIn and thank-you email generators, the text you submit is sent from your browser to our
              server, which forwards it to Google's Gemini API to generate a response.
            </li>
            <li>
              <strong className="text-ink">Resume files you upload.</strong> If you upload a PDF or DOCX to import
              it or to get an ATS score, the file is sent to our server. A PDF is passed to the Gemini API as an
              attachment; for a DOCX, our server extracts the text and sends that to Gemini. The result comes
              back to your browser. We do not save the file or its text in a database or file storage.
            </li>
            <li>
              <strong className="text-ink">Hosting and error logs.</strong> Our hosting provider (Vercel) keeps
              standard technical logs of requests, such as IP address, time and page requested. If an AI request
              fails, our server may write an error to its logs, and in some failures that entry can include a
              short fragment (up to 500 characters) of the AI's reply, which may contain details from your
              resume. We do not use these logs for anything other than fixing problems.
            </li>
            <li>
              <strong className="text-ink">Usage analytics.</strong> Google Analytics tells us which pages are used
              and how: device type, approximate location from IP address, pages visited and time on site. It does
              not receive the content of your resume.
            </li>
            <li>
              <strong className="text-ink">Messages you send us.</strong> The contact form opens your own email
              app with a pre-filled message. We only receive it if you send it, as an ordinary email.
            </li>
          </ul>
          <p className="mt-3">
            Because text and files you submit to AI tools are processed by Google, please do not include
            information you would not want processed that way, such as government ID numbers, bank details or
            passwords.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Third parties involved</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-ink">Google Firebase</strong> — sign-in (authentication).</li>
            <li><strong className="text-ink">Google Gemini API</strong> — generates AI writing suggestions and reads uploaded resumes.</li>
            <li><strong className="text-ink">Vercel</strong> — hosts the site and runs the server functions that call the Gemini API.</li>
            <li><strong className="text-ink">Google Analytics</strong> — site usage analytics.</li>
            <li><strong className="text-ink">Google AdSense</strong> — shows advertising on some pages.</li>
            <li>
              <strong className="text-ink">Google Fonts and jsDelivr</strong> — deliver fonts and icons, so your IP
              address and browser details reach them when a page loads.
            </li>
          </ul>
          <p className="mt-3">
            Each operates under its own privacy policy and terms, which also govern how long they keep the data
            they receive. We don't sell resume data or account details to anyone, and we don't share your resume
            content with employers, recruiters or any other third party beyond the processing described here.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Cookies and local storage</h2>
          <p>
            Google Analytics sets cookies to tell visitors apart. Firebase Authentication uses local storage and
            cookies to keep you signed in. Your browser's local storage also holds your resume draft and theme
            setting, as described above.
          </p>
          <p className="mt-3">
            We show ads through Google AdSense. Google and its partners, as third-party vendors, use cookies
            (including the DoubleClick cookie) to serve ads based on your visits to this and other websites. You
            can opt out of personalised advertising in{' '}
            <a className="underline" href="https://adssettings.google.com" rel="noopener noreferrer" target="_blank">Google Ads Settings</a>{' '}
            or at{' '}
            <a className="underline" href="https://www.aboutads.info" rel="noopener noreferrer" target="_blank">aboutads.info</a>.{' '}
            See how Google uses data from sites that use its services at{' '}
            <a className="underline" href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer" target="_blank">policies.google.com/technologies/partner-sites</a>.
            Ads never appear inside your resume or its downloaded files.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">How long we keep things</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Resume drafts: only in your browser, until you clear it.</li>
            <li>Uploaded files and AI text: not stored by us after the request finishes, apart from the log entries described above.</li>
            <li>Sign-in details: kept in Firebase Authentication until you ask us to delete your account.</li>
            <li>Analytics and ad data: kept by Google under its own settings.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Your choices and rights</h2>
          <p>
            You can clear your browser's local storage to remove your saved draft, and sign out to end your
            Firebase session. You can ask us to tell you what account data we hold, correct it, or delete it.
            Depending on where you live (for example under India's Digital Personal Data Protection Act, 2023, or
            the GDPR), you may have additional rights. Email us at the address below and we will respond as soon
            as we can.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Changes to this policy</h2>
          <p>
            If we change how QuickResume handles data, we will update this page and the date at the top.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink mb-3">Contact</h2>
          <p>
            Questions about this policy or a data request:{' '}
            <a href="mailto:akshaymad0608@gmail.com" className="text-pine underline underline-offset-2">akshaymad0608@gmail.com</a>.
          </p>
        </section>
      </div>
    </main>

    <Footer />
  </div>
);

export default PrivacyPolicy;
