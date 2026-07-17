import { FC, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '../components/layout/Navbar';

import { FileText, BookOpen, Compass, Search, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

const resources = [
  {
    title: "How to Write a Professional Resume Outline",
    description: "A step-by-step guide to structuring your resume effectively to get noticed by recruiters.",
    content: "Structuring your resume properly is key. Here are the core sections: 1. Contact Information. 2. Summary or Objective. 3. Work Experience. 4. Education. 5. Skills. Make sure to keep it clean and use reverse chronological order.",
    icon: <FileText size={24} className="text-blue-600" />,
    color: 'bg-blue-50',
    date: "May 12"
  },
  {
    title: "Top Action Verbs for Your Experience Section",
    description: "Boost the impact of your work history by replacing weak words with strong action verbs.",
    content: "Instead of using 'Responsible for' or 'Helped with', use action verbs to start your bullet points. Examples include: Spearheaded, Orchestrated, Developed, Implemented, Streamlined, and Maximized. These show leadership and impact.",
    icon: <BookOpen size={24} className="text-slate-900" />,
    color: 'bg-slate-100',
    date: "May 10"
  },
  {
    title: "Navigating Applicant Tracking Systems (ATS)",
    description: "Learn how ATS works and how to format your resume to ensure it passes the initial screening.",
    content: "An ATS is software used by employers to filter resumes. To pass the ATS, use standard section headings (like 'Experience'), use standard fonts, avoid tables or complex graphics, and ensure your resume contains relevant keywords from the job description.",
    icon: <Search size={24} className="text-slate-900" />,
    color: 'bg-slate-100',
    date: "May 8"
  },
  {
    title: "Resume Formatting Best Practices in 2026",
    description: "Stay up to date with the latest design and formatting trends that appeal to modern hiring managers.",
    content: "In 2026, less is more. Stick to a clean, single-column or well-structured two-column layout. Keep margins at 1 inch. Pick a modern, sans-serif font like Inter or Roboto. Use color sparingly—usually just one accent color for headers or links.",
    icon: <Compass size={24} className="text-amber-600" />,
    color: 'bg-amber-50',
    date: "May 5"
  }
];

const Resources: FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpandedId(expandedId === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-paper text-body flex flex-col font-sans pt-16 md:pt-[72px] relative selection:bg-pine selection:text-white">
      <Helmet>
        <title>Career Resources & Guides | QuickResume</title>
        <meta name="description" content="Expert advice, resume templates, and formatting tips to help you build the perfect resume and land your dream job faster." />
        <meta name="keywords" content="career resources, resume outline, action verbs, ATS resume, resume formatting best practices" />
        <meta property="og:title" content="Career Resources & Guides | QuickResume" />
        <meta property="og:description" content="Expert advice, resume templates, and formatting tips to help you build the perfect resume and land your dream job faster." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://quickresume.business/resources" />
      </Helmet>

      {/* Navbar Minimal */}
      <Navbar />

      <section className="bg-white py-24 px-6 border-b border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none"></div>
        <div className="max-w-3xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-200 text-slate-900 text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" /> Career Growth
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Career Resources & Guides
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Expert advice, templates, and tips to help you build the perfect resume and land your dream job.
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto w-full px-6 py-24 flex-1 relative z-10">        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none -z-10 overflow-hidden">          <div className="absolute top-20 left-[10%] w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"></div>          <div className="absolute top-40 right-[10%] w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>        </div>
        <div className="grid gap-6">
          {resources.map((resource, idx) => (
            <div 
              key={idx} 
              onClick={() => toggleExpand(idx)}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all cursor-pointer group"
            >
               <div className="flex gap-6 items-start">
                 <div className={`w-16 h-16 rounded-2xl ${resource.color} flex items-center justify-center shrink-0 border border-slate-100 group-hover:scale-110 transition-transform`}>
                   {resource.icon}
                 </div>
                 <div className="flex-1">
                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                     <h3 className="text-xl font-bold text-slate-900 leading-tight">{resource.title}</h3>
                     <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-auto">{resource.date}</span>
                   </div>
                   <p className="text-slate-600 text-[15px] leading-relaxed mb-1">{resource.description}</p>
                   
                   <div className={`mt-6 pt-6 border-t border-slate-100 text-slate-800 leading-relaxed text-[15px] transition-all duration-300 overflow-hidden ${expandedId === idx ? 'opacity-100 max-h-[500px] mb-6' : 'opacity-0 max-h-0 !mt-0 !pt-0 !border-transparent py-0'}`}>
                     {resource.content}
                   </div>
                   
                   <div className="text-blue-600 font-bold text-sm flex items-center gap-1 group-hover:text-slate-900 transition-colors mt-2">
                      {expandedId === idx ? 'Close guide' : 'Read full guide'}
                      {expandedId === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                   </div>
                 </div>
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

export default Resources;
