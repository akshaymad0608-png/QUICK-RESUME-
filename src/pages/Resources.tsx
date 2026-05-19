import { FC, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft, BookOpen, Compass, Search, ChevronDown, ChevronUp } from 'lucide-react';

const resources = [
  {
    title: "How to Write a Professional Resume Outline",
    description: "A step-by-step guide to structuring your resume effectively to get noticed by recruiters.",
    content: "Structuring your resume properly is key. Here are the core sections: 1. Contact Information. 2. Summary or Objective. 3. Work Experience. 4. Education. 5. Skills. Make sure to keep it clean and use reverse chronological order.",
    icon: <FileText size={24} className="text-blue-500" />,
    date: "May 12"
  },
  {
    title: "Top Action Verbs for Your Experience Section",
    description: "Boost the impact of your work history by replacing weak words with strong action verbs.",
    content: "Instead of using 'Responsible for' or 'Helped with', use action verbs to start your bullet points. Examples include: Spearheaded, Orchestrated, Developed, Implemented, Streamlined, and Maximized. These show leadership and impact.",
    icon: <BookOpen size={24} className="text-green-500" />,
    date: "May 10"
  },
  {
    title: "Navigating Applicant Tracking Systems (ATS)",
    description: "Learn how ATS works and how to format your resume to ensure it passes the initial screening.",
    content: "An ATS is software used by employers to filter resumes. To pass the ATS, use standard section headings (like 'Experience'), use standard fonts, avoid tables or complex graphics, and ensure your resume contains relevant keywords from the job description.",
    icon: <Search size={24} className="text-purple-500" />,
    date: "May 8"
  },
  {
    title: "Resume Formatting Best Practices in 2026",
    description: "Stay up to date with the latest design and formatting trends that appeal to modern hiring managers.",
    content: "In 2026, less is more. Stick to a clean, single-column or well-structured two-column layout. Keep margins at 1 inch. Pick a modern, sans-serif font like Inter or Roboto. Use color sparingly—usually just one accent color for headers or links.",
    icon: <Compass size={24} className="text-amber-500" />,
    date: "May 5"
  }
];

const Resources: FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpandedId(expandedId === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Helmet>
        <title>Career Resources & Guides | QuickResume</title>
        <meta name="description" content="Expert advice, resume templates, and formatting tips to help you build the perfect resume and land your dream job faster." />
        <meta name="keywords" content="career resources, resume outline, action verbs, ATS resume, resume formatting best practices" />
        <meta property="og:title" content="Career Resources & Guides | QuickResume" />
        <meta property="og:description" content="Expert advice, resume templates, and formatting tips to help you build the perfect resume and land your dream job faster." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://quickresume.business/resources" />
      </Helmet>

      <header className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link to="/" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <Link to="/" className="text-xl font-bold flex items-center gap-2 text-gray-900 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white">
               <FileText size={18} />
            </div>
            QuickResume.business
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Career Resources & Guides</h1>
          <p className="text-lg text-gray-600">
            Expert advice, templates, and tips to help you build the perfect resume and land your dream job.
          </p>
        </div>

        <div className="grid gap-6">
          {resources.map((resource, idx) => (
            <div 
              key={idx} 
              onClick={() => toggleExpand(idx)}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-all cursor-pointer"
            >
               <div className="flex gap-6">
                 <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                   {resource.icon}
                 </div>
                 <div className="flex-1">
                   <div className="flex items-center gap-3 mb-2">
                     <h3 className="text-xl font-bold text-gray-900 leading-tight">{resource.title}</h3>
                     <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{resource.date}</span>
                   </div>
                   <p className="text-gray-600 text-sm leading-relaxed">{resource.description}</p>
                   <div className="mt-4 text-blue-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      {expandedId === idx ? 'Close guide' : 'Read guide'}
                      {expandedId === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                   </div>
                 </div>
               </div>
               
               <div className={`mt-6 pt-6 border-t border-gray-100 text-gray-800 leading-relaxed text-[15px] pl-[88px] pr-4 transition-all duration-300 overflow-hidden ${expandedId === idx ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 !mt-0 !pt-0 !border-transparent py-0'}`}>
                 {resource.content}
               </div>

            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Resources;
