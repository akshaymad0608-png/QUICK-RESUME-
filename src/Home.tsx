import { FC, useRef, useState, useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import { Link } from 'react-router-dom';
import { FileText, Award, TrendingUp, CheckCircle, Download, Sparkles, ChevronDown, ChevronUp, Menu, X, Star, Zap, Shield, Clock } from 'lucide-react';
import Modern from './components/templates/Modern';
import { defaultSampleData } from './pages/ChooseTemplate';

const faqs = [
  { q: "Is QuickResume completely free?", a: "Yes! You can create, edit, and download your resume for free. We offer a Pro plan with extra features like unlimited resumes and premium templates." },
  { q: "Is my resume ATS-friendly?", a: "Absolutely. All our templates are designed to pass Applicant Tracking Systems. We avoid complex layouts, graphics, and tables that ATS scanners can't read." },
  { q: "Can I upload my existing resume?", a: "Yes! Upload your existing PDF or DOCX file and our AI will automatically extract all your information so you can edit and improve it instantly." },
  { q: "How do I download my resume?", a: "Click the 'Download PDF' button in the builder. Your resume downloads instantly as a professional A4 PDF file, ready to send to employers." },
  { q: "Can I create multiple resumes?", a: "Free users can create and save up to 3 resumes. Upgrade to Pro for unlimited resumes tailored to different job applications." },
];

const testimonials = [
  { name: "Priya Sharma", role: "Software Engineer at Google", text: "I landed my dream job within 2 weeks of using QuickResume. The AI suggestions made my bullet points so much stronger!", initials: "PS", color: "bg-purple-500" },
  { name: "Rahul Mehta", role: "Product Manager at Flipkart", text: "The ATS score feature is a game changer. I went from 0 callbacks to 5 interviews in a single week after optimizing my resume.", initials: "RM", color: "bg-blue-500" },
  { name: "Ananya Patel", role: "Data Analyst at Deloitte", text: "Super easy to use and the templates look incredibly professional. My recruiter specifically complimented my resume design!", initials: "AP", color: "bg-violet-500" },
];

const Home: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) setCardWidth(entry.contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Helmet>
        <title>Free Resume Builder | Create AI Resume Online | QuickResume</title>
        <meta name="description" content="Build a professional, ATS-friendly resume in minutes with our free AI-powered resume builder." />
        <link rel="canonical" href="https://quickresume.business/" />
      </Helmet>

      {/* Navbar */}
      <header className="px-6 lg:px-8 py-4 flex justify-between items-center bg-white border-b border-purple-100 sticky top-0 z-50 shadow-sm">
        <Link to="/" className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)'}}>
            <FileText size={18} />
          </div>
          QuickResume.business
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
          <Link to="/choose-template" className="hover:text-purple-600 transition-colors">Templates</Link>
          <Link to="/examples" className="hover:text-purple-600 transition-colors">Resume Examples</Link>
          <Link to="/cover-letter" className="hover:text-purple-600 transition-colors">Cover Letter</Link>
          <Link to="/resources" className="hover:text-purple-600 transition-colors">Resources</Link>
        </nav>
        <div className="hidden md:flex gap-4 items-center">
          <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors">Log in</Link>
          <Link to="/start" className="px-5 py-2.5 text-white text-sm font-bold rounded-lg transition-all hover:opacity-90 shadow-md" style={{background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)'}}>
            Create Resume
          </Link>
        </div>
        <button className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-purple-50" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-20 px-6 flex flex-col gap-2 shadow-xl">
          {[
            { to: "/choose-template", label: "Templates" },
            { to: "/examples", label: "Resume Examples" },
            { to: "/cover-letter", label: "Cover Letter" },
            { to: "/resources", label: "Resources" },
            { to: "/login", label: "Log in" },
          ].map(item => (
            <Link key={item.to} to={item.to} onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-gray-700 py-3 border-b border-gray-100 hover:text-purple-600">{item.label}</Link>
          ))}
          <Link to="/start" onClick={() => setMobileMenuOpen(false)} className="mt-4 px-6 py-3.5 text-white font-bold rounded-xl text-center shadow-lg" style={{background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)'}}>
            Create Resume Free →
          </Link>
        </div>
      )}

      {/* Hero */}
      <main className="relative overflow-hidden" style={{background: 'linear-gradient(135deg, #f5f3ff 0%, #eff6ff 50%, #f0f9ff 100%)'}}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-30 -mr-32 -mt-32" style={{background: '#7c3aed'}}></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-20 -ml-20 -mb-20" style={{background: '#0ea5e9'}}></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-2 gap-16 items-center relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold mb-6 border" style={{background: '#f5f3ff', color: '#7c3aed', borderColor: '#ddd6fe'}}>
              <Award size={16} /> #1 Rated Free Resume Builder
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-6">
              Create your <br />
              <span style={{background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>job-winning</span> resume in minutes
            </h1>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Stand out to employers with a professional, ATS-friendly resume. Our AI-powered builder guides you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/start" className="px-8 py-4 text-white rounded-xl font-bold text-lg text-center transition-all hover:opacity-90 hover:scale-105 active:scale-95 shadow-lg" style={{background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)'}}>
                Create Resume — Free
              </Link>
              <Link to="/start" className="px-8 py-4 bg-white border-2 hover:border-purple-400 text-gray-700 hover:text-purple-600 rounded-xl font-bold text-lg text-center transition-colors" style={{borderColor: '#e9d5ff'}}>
                Improve My Resume
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-purple-100">
              <div>
                <div className="text-2xl font-extrabold text-gray-900 mb-1">50,000+</div>
                <div className="text-sm text-gray-500 font-medium">Resumes Created</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-gray-900 mb-1 flex items-center gap-1">4.9 <Star size={18} className="fill-yellow-400 text-yellow-400" /></div>
                <div className="text-sm text-gray-500 font-medium">Average Rating</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-gray-900 mb-1 flex items-center gap-1">2 min <Clock size={16} className="text-green-500" /></div>
                <div className="text-sm text-gray-500 font-medium">Avg Build Time</div>
              </div>
            </div>
          </div>

          <div className="relative isolate rounded-2xl p-8 pt-12 lg:p-16 border shadow-2xl overflow-hidden flex justify-center" style={{background: 'rgba(255,255,255,0.7)', borderColor: '#e9d5ff'}}>
            <div ref={containerRef} className="relative w-full max-w-[420px] aspect-[1/1.414] bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
              {cardWidth > 0 && (
                <div style={{ position: 'absolute', top: 0, left: 0, width: '794px', height: '1123px', transformOrigin: 'top left', transform: `scale(${cardWidth / 794})`, pointerEvents: 'none' }}>
                  <Modern data={defaultSampleData} />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">Build your resume in 3 easy steps</h2>
          <p className="text-gray-500 text-lg mb-14">No design skills needed. Go from blank page to downloaded PDF in minutes.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <FileText size={32} />, step: "01", title: "Choose a Template", desc: "Pick from 30+ professional, ATS-friendly resume templates designed by experts." },
              { icon: <Sparkles size={32} />, step: "02", title: "Fill Your Details", desc: "Our AI guides you step by step and even writes your summary and bullet points for you." },
              { icon: <Download size={32} />, step: "03", title: "Download & Apply", desc: "Download your polished resume as a PDF and start applying to your dream jobs." },
            ].map((item, i) => (
              <div key={i} className="relative rounded-2xl p-8 text-left border hover:shadow-lg transition-shadow" style={{background: 'linear-gradient(135deg, #f5f3ff, #eff6ff)', borderColor: '#e9d5ff'}}>
                <div className="absolute top-6 right-6 text-5xl font-extrabold" style={{color: '#ede9fe'}}>{item.step}</div>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-md mb-5" style={{background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)'}}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20" style={{background: 'linear-gradient(135deg, #f5f3ff 0%, #eff6ff 100%)'}}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">Everything you need to land the job</h2>
          <p className="text-gray-500 text-lg mb-14">Powerful features that give you an unfair advantage in your job search.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Zap size={24} />, title: "AI-Powered", desc: "AI writes and improves your content automatically." },
              { icon: <Shield size={24} />, title: "ATS Optimized", desc: "Every template passes Applicant Tracking Systems." },
              { icon: <CheckCircle size={24} />, title: "Spell Check", desc: "Built-in grammar and spell checker keeps you error-free." },
              { icon: <TrendingUp size={24} />, title: "ATS Score", desc: "Get a real-time score and tips to improve your resume." },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-left border shadow-sm hover:shadow-md transition-shadow" style={{borderColor: '#e9d5ff'}}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 shadow-sm" style={{background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)'}}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">Loved by job seekers worldwide</h2>
          <p className="text-gray-500 text-lg mb-14">Join 50,000+ professionals who landed jobs using QuickResume.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-2xl p-6 text-left border hover:shadow-lg transition-shadow" style={{background: 'linear-gradient(135deg, #f5f3ff, #eff6ff)', borderColor: '#ddd6fe'}}>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, s) => <Star key={s} size={16} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm`}>{t.initials}</div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20" style={{background: 'linear-gradient(135deg, #f5f3ff 0%, #eff6ff 100%)'}}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 text-center">Frequently Asked Questions</h2>
          <p className="text-gray-500 text-lg mb-12 text-center">Everything you need to know about QuickResume.</p>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border overflow-hidden shadow-sm" style={{borderColor: '#ddd6fe'}}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center px-6 py-5 text-left font-semibold text-gray-900 hover:bg-purple-50 transition-colors">
                  {faq.q}
                  {openFaq === i ? <ChevronUp size={20} style={{color: '#7c3aed'}} className="shrink-0" /> : <ChevronDown size={20} className="text-gray-400 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t" style={{borderColor: '#ede9fe'}}>
                    <div className="pt-4">{faq.a}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)'}}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">Ready to land your dream job?</h2>
          <p className="text-purple-100 text-lg mb-8">Create your professional resume in under 2 minutes. It's 100% free.</p>
          <Link to="/start" className="inline-block px-10 py-4 bg-white font-extrabold rounded-xl text-lg hover:bg-purple-50 transition-colors shadow-xl" style={{color: '#7c3aed'}}>
            Build My Resume Now →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)'}}>
                <FileText size={18} />
              </div>
              <span className="text-white font-bold text-lg">QuickResume</span>
            </div>
            <p className="text-sm leading-relaxed">The fastest way to build a professional, ATS-friendly resume powered by AI.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/choose-template" className="hover:text-white transition-colors">Templates</Link>
              <Link to="/examples" className="hover:text-white transition-colors">Resume Examples</Link>
              <Link to="/cover-letter" className="hover:text-white transition-colors">Cover Letter</Link>
              <Link to="/resources" className="hover:text-white transition-colors">Resources</Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Account</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/login" className="hover:text-white transition-colors">Log In</Link>
              <Link to="/start" className="hover:text-white transition-colors">Create Resume</Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <div className="flex flex-col gap-2 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-gray-800 pt-6 text-sm text-center">
          © 2025 QuickResume.business — Free AI Resume Builder. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
