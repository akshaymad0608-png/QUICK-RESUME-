import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';

const examples = [
  { role: 'Software Engineer', industry: 'Technology', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80', description: 'Highlight modern frameworks, cloud platforms, and successful deployments. A strong engineering resume quantifies performance improvements and clearly explains system architecture decisions.' },
  { role: 'Product Manager', industry: 'Business', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80', description: 'Focus on metrics, roadmap execution, and cross-functional leadership. Great PM resumes show how you drove user growth and aligned engineering with business objectives.' },
  { role: 'Data Scientist', industry: 'Data', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80', description: 'Showcase your expertise in machine learning models, statistical analysis, and data viz. The best data resumes prove how your insights directly increased revenue or saved costs.' },
  { role: 'UX Designer', industry: 'Design', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80', description: 'Emphasize user research, wireframing, and interactive prototyping. Your resume must look visually perfect while explaining how your designs solved real user problems.' },
  { role: 'Marketing Specialist', industry: 'Marketing', image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&q=80', description: 'Highlight campaign ROI, customer acquisition costs, and channel growth. A standout marketing resume uses strong action verbs to show measurable campaign success.' },
  { role: 'Sales Executive', industry: 'Sales', image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&q=80', description: 'Put numbers front and center—quota attainment, deal sizes, and revenue generated. Strong sales resumes use concise bullets that prove consistency in closing enterprise accounts.' }
];

const ResumeExamples: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Helmet>
        <title>Professional Resume Examples & Samples | QuickResume</title>
        <meta name="description" content="Explore professional resume examples for Software Engineers, Product Managers, Sales Executives, and more. Learn what skills to highlight for your industry." />
        <meta name="keywords" content="resume examples, professional resume samples, software engineer resume, product manager resume, resume inspiration" />
        <meta property="og:title" content="Resume Examples by Industry | QuickResume" />
        <meta property="og:description" content="Explore professional resume examples for Software Engineers, Product Managers, Sales Executives, and more. Learn what skills to highlight for your industry." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://quickresume.business/examples" />
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

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Resume Examples by Industry</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of professionally designed resume examples tailored for various roles and industries to get inspiration for your own resume.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examples.map((example, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 w-full bg-gray-200 relative">
                <img src={example.image} alt={example.role} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                   <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">{example.industry}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{example.role} Resume</h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed min-h-[60px]">{example.description}</p>
                <Link to="/start" className="w-full py-2.5 bg-gray-50 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors block text-center border border-gray-200">
                  Build this resume
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ResumeExamples;
