import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Feather, ArrowRight, LayoutTemplate } from 'lucide-react';

const examples = [
  { role: 'Software Engineer', industry: 'Technology', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80', description: 'Highlight modern frameworks, cloud platforms, and successful deployments. A strong engineering resume quantifies performance improvements and clearly explains system architecture decisions.' },
  { role: 'Product Manager', industry: 'Business', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80', description: 'Focus on metrics, roadmap execution, and cross-functional leadership. Great PM resumes show how you drove user growth and aligned engineering with business objectives.' },
  { role: 'Data Scientist', industry: 'Data', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80', description: 'Showcase your expertise in machine learning models, statistical analysis, and data viz. The best data resumes prove how your insights directly increased revenue or saved costs.' },
  { role: 'UX Designer', industry: 'Design', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80', description: 'Emphasize user research, wireframing, and interactive prototyping. Your resume must look visually perfect while explaining how your designs solved real user problems.' },
  { role: 'Marketing Specialist', industry: 'Marketing', image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&q=80', description: 'Highlight campaign ROI, customer acquisition costs, and channel growth. A standout marketing resume uses strong action verbs to show measurable campaign success.' },
  { role: 'Sales Executive', industry: 'Sales', image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&q=80', description: 'Put numbers front and center—quota attainment, deal sizes, and revenue generated. Strong sales resumes use concise bullets that prove consistency in closing enterprise accounts.' }
];

const ResumeExamples: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 text-slate-600 flex flex-col font-sans pt-[72px] bg-grid-pattern relative">\n      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 to-slate-50 pointer-events-none z-0"></div>
      <Helmet>
        <title>Professional Resume Examples & Samples | QuickResume</title>
        <meta name="description" content="Explore professional resume examples for Software Engineers, Product Managers, Sales Executives, and more. Learn what skills to highlight for your industry." />
        <meta name="keywords" content="resume examples, professional resume samples, software engineer resume, product manager resume, resume inspiration" />
        <meta property="og:title" content="Resume Examples by Industry | QuickResume" />
        <meta property="og:description" content="Explore professional resume examples for Software Engineers, Product Managers, Sales Executives, and more. Learn what skills to highlight for your industry." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://quickresume.business/examples" />
      </Helmet>

      {/* Navbar Minimal */}
      <nav className="fixed top-0 left-0 right-0 h-[72px] bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 lg:px-10 flex items-center justify-between z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-gradient-to-tr from-slate-900 to-slate-700 rounded-lg flex items-center justify-center shadow-lg shadow-slate-300/50">
            <Feather className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold text-slate-900 tracking-tight">QuickResume</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/build')}
            className="text-sm font-bold text-slate-900 bg-teal-600 px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
          >
            Create Resume
          </button>
        </div>
      </nav>

      <section className="bg-white py-24 px-6 border-b border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-100/50 to-transparent pointer-events-none"></div>
        <div className="max-w-3xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-900 text-sm font-semibold mb-4 border border-slate-200">
            <LayoutTemplate className="w-4 h-4" /> Best in class
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Resume Examples by Industry
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Explore our collection of professionally designed resume examples tailored for various roles and industries to get inspiration for your own resume.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto w-full px-6 py-24 flex-1 relative z-10">\n        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none -z-10 overflow-hidden">\n          <div className="absolute top-20 left-[10%] w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"></div>\n          <div className="absolute top-40 right-[10%] w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>\n        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examples.map((example, idx) => (
            <div key={idx} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-300/50 hover:-translate-y-1 transition-all group">
              <div className="h-48 w-full bg-slate-50 relative overflow-hidden">
                <img src={example.image} alt={example.role} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/90 via-[#0A0A0B]/40 to-transparent flex items-end p-6">
                   <span className="bg-teal-600/90 backdrop-blur text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-slate-400">{example.industry}</span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{example.role} Resume</h3>
                <p className="text-slate-500 mb-8 leading-relaxed min-h-[80px]">{example.description}</p>
                <Link to="/build" className="w-full py-3 bg-slate-50 text-slate-900 font-bold rounded-xl hover:bg-slate-50 hover:text-slate-800 transition-colors flex items-center justify-center gap-2 border border-slate-200">
                  Build this resume <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer Minimal */}
      <footer className="bg-white border-t border-slate-200 py-8 px-6 text-center text-sm font-medium text-slate-500">
        © {new Date().getFullYear()} quickresume.business. All rights reserved.
      </footer>
    </div>
  );
};

export default ResumeExamples;
