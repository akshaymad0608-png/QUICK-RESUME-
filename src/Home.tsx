import { FC, useState } from 'react';
import { Helmet } from "react-helmet-async";
import { useNavigate } from 'react-router-dom';

import { TemplateCard } from './components/TemplateCard';
import { TEMPLATES } from './data/templates';
import { Navbar } from './components/layout/Navbar';

export const Home: FC = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCtaClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-page)] text-[var(--color-text-body)] font-sans">
      <Helmet>
        <title>QuickResume | Professional Resume Builder</title>
        <meta name="description" content="Create a professional resume for free. Build a job-winning resume in minutes with easy templates and smart tools." />
      </Helmet>

      {/* Navbar */}
      <Navbar />

      <main className="pt-[72px]">
        {/* Hero Section */}
        <section className="bg-white px-6 lg:px-10 py-16 lg:py-24 border-b border-[var(--color-border)]">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 flex flex-col items-start lg:pr-10">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-heading mb-6 tracking-tight">
                Create a professional resume for free
              </h1>
              <p className="text-lg text-body leading-relaxed mb-8 max-w-lg">
                Build a job-winning resume in minutes with easy templates and smart tools.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto">
                <button 
                  onClick={(e) => handleCtaClick(e, '/build')}
                  className="bg-primary text-white border-none rounded-lg px-8 py-3.5 text-base font-semibold hover:bg-primary-hover transition-colors shadow-sm w-full sm:w-auto text-center"
                >
                  Create My Resume
                </button>
                <button 
                  onClick={() => navigate('/choose-template')}
                  className="bg-white text-heading border border-[var(--color-border)] rounded-lg px-8 py-3.5 text-base font-semibold hover:bg-surface transition-colors shadow-sm w-full sm:w-auto text-center"
                >
                  Browse Templates
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 text-sm font-medium text-muted">
                <div className="flex items-center gap-2">
                  <i className="ti ti-check text-green-600 text-lg"></i> Free resume builder
                </div>
                <div className="flex items-center gap-2">
                  <i className="ti ti-check text-green-600 text-lg"></i> ATS friendly templates
                </div>
                <div className="flex items-center gap-2">
                  <i className="ti ti-check text-green-600 text-lg"></i> Download instantly
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-lg lg:max-w-none flex justify-center lg:justify-end">
              <div className="w-full max-w-[500px] rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] transform hover:-translate-y-2 transition-transform duration-300 border border-[var(--color-border)]">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1000&q=80" 
                  alt="Professional working on laptop" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="bg-surface px-6 lg:px-10 py-12 border-b border-[var(--color-border)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-heading">Trusted by job seekers</h2>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-10 sm:gap-20">
              <div className="flex items-center gap-3">
                <i className="ti ti-users text-primary text-3xl"></i>
                <div className="text-left">
                  <div className="text-2xl font-bold text-heading">1M+</div>
                  <div className="text-sm text-body font-medium">Resumes Created</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <i className="ti ti-layout-grid text-primary text-3xl"></i>
                <div className="text-left">
                  <div className="text-2xl font-bold text-heading">50+</div>
                  <div className="text-sm text-body font-medium">Templates</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <i className="ti ti-scan text-primary text-3xl"></i>
                <div className="text-left">
                  <div className="text-2xl font-bold text-heading">100%</div>
                  <div className="text-sm text-body font-medium">ATS Friendly</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-white px-6 py-20 border-b border-[var(--color-border)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-heading mb-4">Build your resume in 3 simple steps</h2>
              <p className="text-lg text-body max-w-2xl mx-auto">A quick and easy way to create your professional resume.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { n: '1', i: 'ti-layout', t: 'Choose a template', d: 'Select a professional resume design.' },
                { n: '2', i: 'ti-pencil', t: 'Add your information', d: 'Fill your details with guided sections.' },
                { n: '3', i: 'ti-download', t: 'Download your resume', d: 'Export and apply for jobs.' }
              ].map((step, idx) => (
                <div key={idx} className="bg-white border border-[var(--color-border)] rounded-2xl p-8 relative shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-primary-light text-primary flex items-center justify-center mb-6">
                    <i className={`${step.i} text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-heading mb-3">{step.n}. {step.t}</h3>
                  <p className="text-body leading-relaxed">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Templates Section */}
        <section className="bg-surface px-6 py-20 border-b border-[var(--color-border)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-heading mb-4">Choose from professional resume templates</h2>
              <p className="text-lg text-body">Stand out with templates designed to get you hired.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {['All', 'Professional', 'Modern', 'Creative', 'Simple'].map((filter, i) => (
                <button key={i} className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${i === 0 ? 'bg-primary text-white' : 'bg-white text-muted border border-[var(--color-border)] hover:text-heading hover:border-gray-300'}`}>
                  {filter}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {TEMPLATES.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <button 
                onClick={() => navigate('/choose-template')}
                className="bg-white text-heading border border-[var(--color-border)] rounded-lg px-8 py-3 text-base font-semibold hover:bg-surface transition-colors shadow-sm"
              >
                View all templates
              </button>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="bg-white px-6 py-20 border-b border-[var(--color-border)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-heading">Trusted by professionals everywhere</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Sarah Jenkins', job: 'Marketing Manager', msg: 'The easiest resume builder I have ever used. Got an interview the next day after applying.' },
                { name: 'Michael Chen', job: 'Software Engineer', msg: 'Clean templates that pass ATS seamlessly. The interface is simple and straightforward to use.' },
                { name: 'Amanda Roth', job: 'Sales Director', msg: 'Built my resume in 15 minutes. It looks extremely professional and formatting was a breeze.' }
              ].map((review, idx) => (
                <div key={idx} className="bg-white border border-[var(--color-border)] rounded-2xl p-8 shadow-sm">
                  <div className="flex text-yellow-400 gap-1 mb-4 text-lg">
                    {[...Array(5)].map((_, i) => <i key={i} className="ti ti-star-filled"></i>)}
                  </div>
                  <p className="text-body leading-relaxed mb-6 font-medium">"{review.msg}"</p>
                  <div>
                    <h4 className="font-bold text-heading">{review.name}</h4>
                    <p className="text-sm text-muted">{review.job}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-surface px-6 py-20 border-b border-[var(--color-border)]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-heading">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {[
                { q: 'Is QuickResume free?', a: 'Yes, our basic resume builder is completely free to use. You can build, customize, and download your resume without paying.' },
                { q: 'Can I download a PDF?', a: 'Yes, you can download your final resume as a high-quality PDF, ready to be sent to employers.' },
                { q: 'Are templates ATS friendly?', a: 'Absolutely. All our templates are designed with best practices to ensure Applicant Tracking Systems can easily read your data.' },
                { q: 'Can I edit my resume later?', a: 'Yes. Simply create an account to save your progress and come back to edit your resume at any time.' },
                { q: 'Does it work on mobile?', a: 'Yes, our resume builder is fully responsive and works perfectly on your phone, tablet, or desktop.' }
              ].map((faq, i) => (
                <div key={i} className="bg-white border border-[var(--color-border)] rounded-xl overflow-hidden">
                  <button 
                    className="w-full text-left px-6 py-5 flex items-center justify-between font-semibold text-heading focus:outline-none"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {faq.q}
                    <i className={`ti ti-chevron-down shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}></i>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-body">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[var(--color-border)] pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                  <i className="ti ti-file-description text-white text-xl"></i>
                </div>
                <span className="text-xl font-bold text-heading tracking-tight">QuickResume</span>
              </div>
              <p className="text-body text-sm max-w-sm mb-6">
                Build a professional, job-winning resume in minutes. Easy to use, ATS-friendly, and beautifully designed.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-heading mb-4">Resume</h4>
              <ul className="space-y-3">
                {['Resume Builder', 'Templates', 'Examples'].map(link => (
                  <li key={link}><a href="#" className="text-sm text-body hover:text-primary transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-heading mb-4">Career</h4>
              <ul className="space-y-3">
                {['Cover Letters', 'Career Advice', 'Job Tips'].map(link => (
                  <li key={link}><a href="#" className="text-sm text-body hover:text-primary transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-heading mb-4">Company</h4>
              <ul className="space-y-3">
                {['About', 'Contact', 'Privacy', 'Terms'].map(link => (
                  <li key={link}><a href="#" className="text-sm text-body hover:text-primary transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted">© {new Date().getFullYear()} QuickResume. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="text-muted hover:text-heading"><i className="ti ti-brand-twitter text-xl"></i></a>
              <a href="#" className="text-muted hover:text-heading"><i className="ti ti-brand-linkedin text-xl"></i></a>
              <a href="#" className="text-muted hover:text-heading"><i className="ti ti-brand-facebook text-xl"></i></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Home;
