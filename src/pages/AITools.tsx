import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Feather, MessageSquare, ArrowRight, Wand2, Search, Edit3, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const tools = [
  {
    id: 'summary-generator',
    name: 'AI Summary Generator',
    description: 'Instantly generate a compelling professional summary tailored to your target role.',
    icon: <FileText className="w-6 h-6 text-slate-900" />,
    color: 'bg-slate-100',
    border: 'border-slate-200',
    popular: true,
  },
  {
    id: 'skills-suggestion',
    name: 'Skills Suggestion',
    description: 'Get AI recommendations for missing industry-standard skills to beat the ATS.',
    icon: <Wand2 className="w-6 h-6 text-slate-700" />,
    color: 'bg-slate-100',
    border: 'border-slate-200',
  },
  {
    id: 'jd-match',
    name: 'Job Description Match',
    description: 'Compare your resume against a job description to identify gaps and keywords.',
    icon: <Search className="w-6 h-6 text-slate-700" />,
    color: 'bg-slate-100',
    border: 'border-slate-200',
  },
  {
    id: 'cover-letter',
    name: 'Cover Letter Generator',
    description: 'Generate a highly personalized, targeted cover letter in seconds.',
    icon: <MessageSquare className="w-6 h-6 text-rose-400" />,
    color: 'bg-rose-500/10',
    border: 'border-rose-500/20',
  },
  {
    id: 'ats-checker',
    name: 'ATS Score Checker',
    description: 'Check your resume against common recruiter ATS requirements and get a score.',
    icon: <ShieldCheck className="w-6 h-6 text-slate-700" />,
    color: 'bg-slate-100',
    border: 'border-slate-200',
    popular: true,
  },
  {
    id: 'bullet-rewriter',
    name: 'Bullet Point Rewriter',
    description: 'Transform weak experience bullet points into impactful, action-oriented achievements.',
    icon: <Edit3 className="w-6 h-6 text-slate-700" />,
    color: 'bg-slate-100',
    border: 'border-slate-200',
  }
];

export default function AITools() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-600 flex flex-col font-sans pt-[72px] bg-grid-pattern relative">\n      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 to-slate-50 pointer-events-none z-0"></div>
      <Helmet>
        <title>AI Resume Tools | QuickResume</title>
        <meta name="description" content="Discover our powerful suite of AI career tools to build, analyze, and optimize your resume, write cover letters, and match job descriptions." />
        <meta property="og:title" content="AI Resume Tools | QuickResume" />
        <meta property="og:description" content="Powerful AI career tools to help you land your dream job faster." />
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
            className="text-sm font-bold text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Create Resume
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white py-24 px-6 border-b border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-100/50 to-transparent pointer-events-none"></div>\n        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>\n        <div className="absolute top-20 -right-40 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-3xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-900 text-sm font-semibold mb-4 border border-slate-200">
            <Wand2 className="w-4 h-4" /> AI Powered
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Supercharge your job search
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Everything you need to land your dream job faster. Optimize your resume, write cover letters, and beat the ATS with our AI tools.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-24 px-6 flex-1 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <div 
                key={tool.id}
                className="bg-white border border-slate-200 p-8 rounded-3xl hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all cursor-pointer flex flex-col group"
                onClick={() => navigate(tool.id === 'cover-letter' ? '/cover-letter' : '/build')}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 ${tool.color} border ${tool.border} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    {tool.icon}
                  </div>
                  {tool.popular && (
                    <span className="bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                      Popular
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{tool.name}</h3>
                <p className="text-slate-500 mb-8 flex-grow leading-relaxed">{tool.description}</p>
                
                <div className="mt-auto flex items-center text-slate-900 font-bold group-hover:text-slate-800 transition-colors">
                  Try it now <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Minimal */}
      <footer className="bg-white border-t border-slate-200 py-8 px-6 text-center text-sm font-medium text-slate-500">
        © {new Date().getFullYear()} quickresume.business. All rights reserved.
      </footer>
    </div>
  );
}
