import { FC, useRef, useState, useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import { Link } from 'react-router-dom';
import { FileText, Award, TrendingUp } from 'lucide-react';
import Modern from './components/templates/Modern';
import { defaultSampleData } from './pages/ChooseTemplate';

const Home: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setCardWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Helmet>
        <title>Free Resume Builder | Create AI Resume Online | QuickResume</title>
        <meta name="description" content="Build a professional, ATS-friendly resume in minutes with our free AI-powered resume builder. Choose from modern templates and land your dream job faster." />
        <meta name="keywords" content="resume builder, free resume maker, AI resume builder, professional resume templates, ATS resume, cv maker" />
        <meta property="og:title" content="Free Resume Builder | Create AI Resume Online | QuickResume" />
        <meta property="og:description" content="Build a professional, ATS-friendly resume in minutes with our free AI-powered resume builder." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      {/* Top Navigation */}
      <header className="px-8 py-4 flex justify-between items-center border-b border-gray-100">
        <div className="text-xl font-bold tracking-tight text-brand flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white">
            <FileText size={18} />
          </div>
          QuickResume.business
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
          <Link to="/choose-template" className="hover:text-blue-500 transition-colors">Templates</Link>
          <Link to="/examples" className="hover:text-blue-500 transition-colors">Resume Examples</Link>
          <Link to="/cover-letter" className="hover:text-blue-500 transition-colors">Cover Letter</Link>
          <Link to="/resources" className="hover:text-blue-500 transition-colors">Resources</Link>
        </nav>
        <div className="flex gap-4 items-center">
          <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Log in</Link>
          <Link to="/start" className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold rounded-lg transition-colors">
            Create Resume
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6">
            <Award size={16} /> #1 Rated Resume Builder
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-6">
            Create your <br />
            <span className="text-blue-500">job-winning</span> resume in minutes
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
            Stand out to employers with a professional, ATS-friendly resume. Our AI-powered builder guides you every step of the way to ensure you land your dream job.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link 
              to="/start"
              className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold text-lg text-center transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/25"
            >
              Create New Resume
            </Link>
            <Link 
              to="/start"
              className="px-8 py-4 bg-white border-2 border-gray-200 hover:border-blue-500 text-gray-700 hover:text-blue-500 rounded-xl font-bold text-lg text-center transition-colors"
            >
              Improve My Resume
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-100">
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1">49,028</div>
              <div className="text-sm text-gray-500 font-medium">Resumes created today</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-1">48% <TrendingUp size={18} className="text-green-500" /></div>
              <div className="text-sm text-gray-500 font-medium">More likely to get hired</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-1">12% <TrendingUp size={18} className="text-green-500" /></div>
              <div className="text-sm text-gray-500 font-medium">Better pay on average</div>
            </div>
          </div>
        </div>
        
        {/* Mockup Preview Area */}
        <div className="relative isolate rounded-2xl bg-gray-50/50 p-8 pt-12 md:p-12 lg:p-16 border border-gray-100 shadow-2xl overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-[800px] flex justify-center">
          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
          
          <div ref={containerRef} className="relative w-full max-w-[450px] aspect-[1/1.414] bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden translate-y-12 rotate-[-2deg] transition-transform hover:rotate-0 duration-500">
            {/* Real resume mockup */}
            {cardWidth > 0 && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '794px',
                height: '1123px',
                transformOrigin: 'top left',
                transform: `scale(${cardWidth / 794})`,
                pointerEvents: 'none',
              }}>
                <Modern data={defaultSampleData} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
