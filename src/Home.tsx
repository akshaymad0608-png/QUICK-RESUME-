import { FC } from 'react';
import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Feather, LayoutTemplate, Bot, Briefcase } from 'lucide-react';
import { Navbar } from './components/layout/Navbar';
import { TemplateCard } from './components/TemplateCard';
import { TEMPLATES } from './data/templates';
import { motion } from 'framer-motion';

export const Home: FC = () => {
  const navigate = useNavigate();

  const handleCtaClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-white selection:text-slate-900 overflow-x-hidden">
      <Helmet>
        <title>QuickResume | AI Resume Builder</title>
        <meta name="description" content="Build a clean, professional resume in minutes." />
      </Helmet>

      <Navbar />

      {/* Navbar will handle its own space if we add padding to main */}
      <main className="pt-20 bg-grid-pattern relative">\n        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-900 pointer-events-none"></div>\n        <div className="relative z-10">
        
        {/* 1. Hero Section */}
        <section className="px-6 lg:px-10 pt-24 pb-32 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            className="flex-1 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-slate-800 text-slate-400 text-xs font-semibold uppercase tracking-widest mb-6">
              <Bot className="w-3 h-3" /> AI-Powered
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-none">
              A better resume.<br />
              <span className="text-slate-400">Zero friction.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-xl leading-relaxed">
              Design a clean, ATS-optimized resume. Let our AI handle the writing, while you focus on landing the interview.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={(e) => handleCtaClick(e, '/build')}
                className="bg-indigo-600 text-white px-8 py-4 text-sm font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                Create your resume <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => navigate('/choose-template')}
                className="bg-slate-900 text-white border border-slate-800 px-8 py-4 text-sm font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center"
              >
                View templates
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex-1 w-full lg:w-auto relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-100/40 via-purple-100/40 to-rose-100/40 blur-3xl -z-10 rounded-full"></div>
             <div className="w-full max-w-[500px] mx-auto relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 group">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop" 
                  alt="Team collaboration" 
                  className="w-full h-[400px] md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex items-end p-8">
                  <div className="text-left">
                    <p className="text-2xl md:text-3xl font-bold text-white mb-3 italic leading-tight">
                      "Success is not final; failure is not fatal: It is the courage to continue that counts."
                    </p>
                    <p className="text-slate-300 font-medium">— Winston Churchill</p>
                  </div>
                </div>
             </div>
          </motion.div>
        </section>

        {/* 2. Stats Section Minimal */}
        <section className="border-y border-slate-800 bg-slate-900 py-12">
          <motion.div 
            className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x divide-slate-800 gap-y-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
             <div className="px-6 text-center">
               <div className="text-3xl font-bold mb-1">100k+</div>
               <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Resumes Created</div>
             </div>
             <div className="px-6 text-center">
               <div className="text-3xl font-bold mb-1">99%</div>
               <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">ATS Success Rate</div>
             </div>
             <div className="px-6 text-center">
               <div className="text-3xl font-bold mb-1">25+</div>
               <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Pro Templates</div>
             </div>
             <div className="px-6 text-center">
               <div className="text-3xl font-bold mb-1">Free</div>
               <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">PDF Export</div>
             </div>
          </motion.div>
        </section>

        {/* 3. Features Overview */}
        <section className="py-32 px-6 lg:px-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
               <div className="w-12 h-12 bg-indigo-950 text-blue-600 flex items-center justify-center mb-6 rounded-xl">
                 <LayoutTemplate className="w-5 h-5 text-white" />
               </div>
               <h3 className="text-xl font-bold mb-3">Clean Templates</h3>
               <p className="text-slate-500 leading-relaxed">No clutter, no distractions. Our templates prioritize readability and ATS compatibility above all else.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
               <div className="w-12 h-12 bg-purple-50 text-purple-600 flex items-center justify-center mb-6 rounded-xl">
                 <Bot className="w-5 h-5 text-white" />
               </div>
               <h3 className="text-xl font-bold mb-3">AI Writer</h3>
               <p className="text-slate-500 leading-relaxed">Struggling to describe your impact? Let our AI rewrite your bullet points into powerful achievements.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
               <div className="w-12 h-12 bg-green-50 text-green-600 flex items-center justify-center mb-6 rounded-xl">
                 <Briefcase className="w-5 h-5 text-white" />
               </div>
               <h3 className="text-xl font-bold mb-3">Interview Prep</h3>
               <p className="text-slate-500 leading-relaxed">Prepare for behavioral interviews with AI-generated questions tailored to your exact experience.</p>
            </motion.div>
          </div>
        </section>

        {/* ATS Friendly Resume Creator Feature */}
        <section className="py-24 bg-indigo-950 border-y border-slate-800">
          <motion.div 
            className="max-w-4xl mx-auto px-6 lg:px-10 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
             <div className="w-16 h-16 bg-slate-900 shadow-sm border border-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Feather className="w-8 h-8 text-blue-600" />
             </div>
             <h2 className="text-4xl font-extrabold mb-6 text-white">ATS-Friendly Resume Creator</h2>
             <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
               Beat the resume bots with our specialized ATS templates. Built specifically to parse perfectly into Workday, Greenhouse, Lever, and other major tracking systems.
             </p>
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={(e) => handleCtaClick(e, '/build')} 
               className="bg-blue-600 text-white px-10 py-5 text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl inline-flex items-center gap-2"
             >
               Create ATS Resume Now <ArrowRight className="w-4 h-4" />
             </motion.button>
          </motion.div>
        </section>

        {/* 4. Template Showcase */}
        <section className="py-24 bg-slate-900 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <motion.div 
              className="flex justify-between items-end mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Templates</h2>
                <p className="text-slate-500">Minimalist designs for modern professionals.</p>
              </div>
              <Link to="/templates" className="hidden md:flex items-center gap-2 text-sm font-bold hover:text-slate-300 transition-colors">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {TEMPLATES.slice(0, 3).map((tpl, idx) => (
                <motion.div
                  key={tpl.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <TemplateCard template={tpl} onSelect={() => navigate('/templates')} />
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 text-center md:hidden">
              <Link to="/templates" className="inline-flex items-center gap-2 text-sm font-bold hover:text-slate-300 transition-colors">
                View all templates <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 5. Final CTA */}
        <section className="py-32 px-6 lg:px-10 max-w-5xl mx-auto text-center border-t border-slate-800">
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true, margin: "-50px" }}
             transition={{ duration: 0.5 }}
             className="grid md:grid-cols-2 gap-12 items-center text-left"
           >
             <div>
               <h2 className="text-4xl font-extrabold mb-6">Ready to start?</h2>
               <p className="text-xl text-slate-500 mb-10">Create a professional resume in under 10 minutes.</p>
               <motion.button 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={(e) => handleCtaClick(e, '/build')}
                 className="bg-indigo-600 text-white px-10 py-5 text-sm font-bold hover:bg-indigo-700 transition-colors inline-block"
               >
                 Start Building For Free
               </motion.button>
             </div>
             <div className="w-full relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 group">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop" 
                  alt="Career success" 
                  className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex items-end p-6">
                  <div>
                    <p className="text-xl font-bold text-white mb-2 italic leading-tight">
                      "The only way to do great work is to love what you do."
                    </p>
                    <p className="text-slate-300 font-medium text-sm">— Steve Jobs</p>
                  </div>
                </div>
             </div>
           </motion.div>
        </section>

        </div>\n      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 pt-16 pb-8 px-6 lg:px-10 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <motion.div 
                  className="w-9 h-9 bg-gradient-to-tr from-slate-900 to-slate-700 rounded-lg shadow-md border border-slate-800 flex items-center justify-center"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Feather className="text-white w-5 h-5" />
                </motion.div>
                <span className="text-xl font-bold text-white tracking-tight">QuickResume</span>
              </div>
              <p className="text-slate-500 text-sm max-w-xs leading-relaxed mb-6">
                The minimalist resume builder for modern professionals. Focus on your career, not formatting.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-widest">Product</h4>
              <ul className="space-y-4">
                {['Builder', 'Templates', 'AI Assistant', 'Cover Letters'].map(link => (
                  <li key={link}><Link to="#" className="text-sm text-slate-500 hover:text-white transition-colors">{link}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-widest">Resources</h4>
              <ul className="space-y-4">
                {['Examples', 'Guides', 'Interview Tips'].map(link => (
                  <li key={link}><Link to="#" className="text-sm text-slate-500 hover:text-white transition-colors">{link}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-widest">Legal</h4>
              <ul className="space-y-4">
                {['Privacy Policy', 'Terms of Service', 'Contact'].map(link => (
                  <li key={link}><Link to="#" className="text-sm text-slate-500 hover:text-white transition-colors">{link}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400">© 2026 quickresume.business. All rights reserved.</p>
            <p className="text-xs text-slate-400">Built for the modern web.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Home;
