import { Suspense, lazy } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
const Pricing = lazy(() => import('./pages/Pricing'));

function App() {
  return (
    <HelmetProvider>
      <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
        <ResumeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/start" element={<Start />} />
              <Route path="/choose-template" element={<ChooseTemplate />} />
              <Route path="/build" element={<Build />} />
              <Route path="/examples" element={<ResumeExamples />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/ai-tools" element={<AITools />} />
              <Route path="/cover-letter" element={<CoverLetterGenerator />} />
              <Route path="/pricing" element={<Pricing />} />
            </Routes>
          </BrowserRouter>
          <Toaster position="bottom-right" />
        </ResumeProvider>
      </Suspense>
    </HelmetProvider>
  )
}

export default App;
