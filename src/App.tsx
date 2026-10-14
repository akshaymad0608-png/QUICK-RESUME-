import CookieConsent from './components/CookieConsent';
import { Suspense, lazy, useEffect } from 'react';

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ResumeProvider } from './context/ResumeContext';
import { HelmetProvider } from 'react-helmet-async';

const Home = lazy(() => import('./Home'));
const Start = lazy(() => import('./pages/Start'));
const ChooseTemplate = lazy(() => import('./pages/ChooseTemplate'));
const Build = lazy(() => import('./pages/Build'));
const ResumeExamples = lazy(() => import('./pages/ResumeExamples'));
const Resources = lazy(() => import('./pages/Resources'));
const AITools = lazy(() => import('./pages/AITools'));

const CoverLetterGenerator = lazy(() => import('./pages/CoverLetterGenerator'));
const ImproveResume = lazy(() => import('./pages/ImproveResume'));
const Pricing = lazy(() => import('./pages/Pricing'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));
const LinkedInHeadlineGenerator = lazy(() => import('./pages/LinkedInHeadlineGenerator'));
const ThankYouEmailGenerator = lazy(() => import('./pages/ThankYouEmailGenerator'));


/**
 * AdSense policy: ads must not appear on screens without real publisher content
 * (the builder, the upload/score tools, sign-in, error pages). The AdSense script
 * stays in index.html so Google's review finds it, and Auto ads would otherwise
 * be allowed anywhere. This marks every route that is not a content page, and
 * index.css hides Google's auto-placed ads on those routes (including after a
 * client-side navigation, when ads from an earlier page could still be in the DOM).
 * Long-form guides are static HTML files, not React routes, so they are unaffected.
 */
const AD_FRIENDLY_ROUTES = ['/', '/resources', '/examples'];
function AdGuard() {
  const { pathname } = useLocation();
  useEffect(() => {
    const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
    document.documentElement.setAttribute('data-ads', AD_FRIENDLY_ROUTES.includes(clean) ? 'on' : 'off');
  }, [pathname]);
  return null;
}

function App() {
  return (
    <HelmetProvider>
      <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
        <ResumeProvider>
          <BrowserRouter>
            <AdGuard />
            <CookieConsent />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/start" element={<Start />} />
              <Route path="/templates" element={<ChooseTemplate />} />
              <Route path="/build" element={<Build />} />
              <Route path="/examples" element={<ResumeExamples />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/ai-tools" element={<AITools />} />
              <Route path="/cover-letter" element={<CoverLetterGenerator />} />
              <Route path="/improve" element={<ImproveResume />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/linkedin-headline-generator" element={<LinkedInHeadlineGenerator />} />
              <Route path="/interview-thank-you-email-generator" element={<ThankYouEmailGenerator />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              {/*
                No catch-all existed before this. A mistyped URL, a removed
                route, or a stale link from an old build all hit </Routes>
                with nothing matching — React Router renders nothing, so the
                visitor got a blank page at whatever URL they landed on, with
                no way back in short of editing the address bar. This at least
                gives them a page and a way home.
              */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster position="bottom-right" />
        </ResumeProvider>
      </Suspense>
    </HelmetProvider>
  )
}

export default App;
