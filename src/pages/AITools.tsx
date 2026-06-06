import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Target, MessageSquare, Linkedin, FileSearch, ArrowRight, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const tools = [
  {
    id: 'resume-generator',
    name: 'Resume Builder',
    description: 'Build a full resume from scratch using our easy step-by-step editor.',
    icon: <FileText className="w-6 h-6 text-primary" />,
    popular: true,
  },
  {
    id: 'ats-checker',
    name: 'Resume Checker',
    description: 'Check your resume against common recruiter ATS requirements.',
    icon: <Target className="w-6 h-6 text-success" />,
  },
  {
    id: 'cover-letter',
    name: 'Cover Letter Builder',
    description: 'Generate a highly personalized, targeted cover letter in seconds.',
    icon: <MessageSquare className="w-6 h-6 text-purple-600" />,
  },
  {
    id: 'resume-examples',
    name: 'Resume Examples',
    description: 'Browse professionally written resume examples for your industry.',
    icon: <FileSearch className="w-6 h-6 text-amber-500" />,
  },
  {
    id: 'job-tips',
    name: 'Job Search Tips',
    description: 'Read our latest guides on interviews, job search, and career growth.',
    icon: <Wrench className="w-6 h-6 text-blue-500" />,
  },
  {
    id: 'linkedin-bio',
    name: 'LinkedIn Optimizer',
    description: 'Upgrade your LinkedIn presence with a professional bio.',
    icon: <Linkedin className="w-6 h-6 text-indigo-500" />,
  }
];

export default function AITools() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--color-bg-page)] text-body font-sans flex flex-col pt-[72px]">
      <Helmet>
        <title>Resume Maker & Career Tools | QuickResume</title>
        <meta name="description" content="Discover our powerful suite of career tools to build, analyze, and optimize your resume, write cover letters, and prepare for interviews." />
        <meta property="og:title" content="Resume Maker & Career Tools | QuickResume" />
        <meta property="og:description" content="Powerful career tools to help you land your dream job faster." />
      </Helmet>

      {/* Navbar Minimal */}
      <nav className="fixed top-0 left-0 right-0 h-[72px] bg-white border-b border-[var(--color-border)] px-6 lg:px-10 flex items-center justify-between z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <i className="ti ti-file-description text-white text-xl"></i>
          </div>
          <span className="text-xl font-bold text-heading tracking-tight">QuickResume</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/build')}
            className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
          >
            Create Resume
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-surface py-20 px-6 border-b border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-heading">
            Career Tools
          </h1>
          <p className="text-lg text-body max-w-2xl mx-auto">
            Everything you need to land your dream job faster. Optimize your resume, write cover letters, and prepare for interviews.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 px-6 bg-white flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <div 
                key={tool.id}
                className="bg-white border border-[var(--color-border)] p-8 rounded-2xl hover:shadow-md hover:border-gray-300 transition-all cursor-pointer flex flex-col group"
                onClick={() => navigate('/build')}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center border border-[var(--color-border)] group-hover:scale-105 transition-transform">
                    {tool.icon}
                  </div>
                  {tool.popular && (
                    <span className="bg-primary-light text-primary text-xs font-bold px-2.5 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-heading mb-2">{tool.name}</h3>
                <p className="text-body mb-8 flex-grow">{tool.description}</p>
                
                <div className="mt-auto flex items-center text-primary font-semibold">
                  Start tool <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Minimal */}
      <footer className="bg-white border-t border-[var(--color-border)] py-8 px-6 text-center text-sm text-muted">
        © {new Date().getFullYear()} QuickResume. All rights reserved.
      </footer>
    </div>
  );
}
