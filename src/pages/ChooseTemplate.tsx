import { FC, useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { ArrowLeft } from 'lucide-react';
import { TemplateType, ResumeData } from '../types';
import Classic from '../components/templates/Classic';
import Modern from '../components/templates/Modern';
import Minimal from '../components/templates/Minimal';
import Executive from '../components/templates/Executive';

export const defaultSampleData: ResumeData = {
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    jobTitle: "Senior Software Engineer",
    email: "john.doe@example.com",
    phone: "555-0123",
    phoneCode: "+1",
    location: "New York",
    city: "New York",
    country: "USA",
    linkedin: "linkedin.com/in/johndoe",
    portfolio: "johndoe.dev",
    website: "johndoe.dev",
    address: "123 Main St",
    photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80",
  },
  summary: "Results-oriented Senior Software Engineer with over 8 years of experience designing, developing, and deploying enterprise-level applications. Proven expertise in scalable architecture and mentoring teams.",
  experience: [
    {
      id: "1",
      jobTitle: "Senior Software Engineer",
      company: "Tech Corp",
      city: "New York",
      country: "USA",
      startDate: "Jan 2020",
      endDate: "Present",
      isPresent: true,
      description: "• Led a team of 5 developers to rebuild the core platform.\n• Improved application performance by 40%.\n• Implemented CI/CD pipelines."
    },
    {
      id: "2",
      jobTitle: "Software Developer",
      company: "Web Solutions Inc.",
      city: "Boston",
      country: "USA",
      startDate: "Mar 2016",
      endDate: "Dec 2019",
      isPresent: false,
      description: "• Developed responsive UI components using React.\n• Designed RESTful APIs in Node.js.\n• Maintained extensive test suites."
    }
  ],
  education: [
    {
      id: "1",
      schoolName: "University of Technology",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      city: "Boston",
      country: "USA",
      startYear: "2012",
      endYear: "2016",
      description: "Graduated with Honors."
    }
  ],
  skills: ["JavaScript", "TypeScript", "React", "Node.js", "GraphQL", "AWS"],
  design: {
    template: 'classic',
    color: '#2196F3',
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    spacing: "normal",
  }
};

const templates: { id: TemplateType; name: string; description: string; defaultColor: string }[] = [
  { id: 'classic', name: 'Classic Professional', description: 'Perfect for corporate roles and traditional industries.', defaultColor: '#2d3748' },
  { id: 'modern', name: 'Modern Elegant', description: 'A sleek, tech-forward design with clean typography.', defaultColor: '#10b981' },
  { id: 'minimal', name: 'Clean Minimalist', description: 'No clutter. Focused entirely on your content and achievements.', defaultColor: '#000000' },
  { id: 'executive', name: 'Executive', description: 'A robust template tailored for leadership and management.', defaultColor: '#3b4db8' }
];

const CardPreview: FC<{
  tpl: { id: TemplateType, name: string, description: string, defaultColor: string };
  activeColor: string;
  handleSelect: (id: TemplateType) => void;
  getTemplateComponent: (id: TemplateType, color: string) => JSX.Element;
}> = ({ tpl, activeColor, handleSelect, getTemplateComponent }) => {
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
    <div 
      ref={containerRef}
      onClick={() => handleSelect(tpl.id)}
      className="relative rounded-xl mb-4 overflow-hidden shadow-sm border-2 border-gray-200 cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 hover:border-blue-400 bg-white"
      style={{ aspectRatio: '1/1.414' }}
    >
      {cardWidth > 0 && (
        <div className="flex flex-col" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '794px',
          height: '1123px',
          transformOrigin: 'top left',
          transform: `scale(${cardWidth / 794})`,
          pointerEvents: 'none',
        }}>
          {getTemplateComponent(tpl.id, activeColor)}
        </div>
      )}
      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center z-10">
        <button className="px-6 py-2.5 bg-blue-500 text-white font-bold rounded-lg shadow-lg pointer-events-auto">
          Use Template
        </button>
      </div>
    </div>
  );
};

const ChooseTemplate: FC = () => {
  const navigate = useNavigate();
  const { data, updateSection } = useResume();
  const [hoveredColorTpl, setHoveredColorTpl] = useState<Record<string, string>>({});
  const [activeFilter, setActiveFilter] = useState('All Templates');

  const filterMap: Record<string, string[]> = {
    'All Templates': ['classic', 'modern', 'minimal', 'executive'],
    'Simple': ['classic'],
    'Modern': ['modern'],
    'One column': ['minimal'],
    'Professional': ['executive'],
  };

  const filteredTemplates = activeFilter === 'All Templates'
    ? templates
    : templates.filter(t => filterMap[activeFilter]?.includes(t.id as string));

  const handleSelect = (templateId: TemplateType) => {
    updateSection('design', { 
      ...data.design, 
      template: templateId, 
      color: hoveredColorTpl[templateId] || templates.find(t => t.id === templateId)?.defaultColor || '#2196F3' 
    });
    navigate('/build');
  };

  const getTemplateComponent = (id: TemplateType, color: string) => {
    const tplData = { ...defaultSampleData, design: { ...defaultSampleData.design, color } };
    const baseTemplates = ['classic', 'modern', 'minimal', 'executive'];
    const idx = templates.findIndex(t => t.id === id);
    const mappedId = baseTemplates[idx % baseTemplates.length];
    
    switch(mappedId) {
      case 'modern': return <Modern data={tplData} />;
      case 'minimal': return <Minimal data={tplData} />;
      case 'executive': return <Executive data={tplData} />;
      case 'classic': default: return <Classic data={tplData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Helmet>
        <title>Choose a Resume Template | QuickResume</title>
        <meta name="description" content="Select from our collection of professional, ATS-friendly resume templates. Customize colors and fonts to build a standout resume." />
        <meta name="keywords" content="resume templates, professional resume templates, ATS resume templates, free resume templates" />
        <meta property="og:title" content="Choose a Resume Template | QuickResume" />
        <meta property="og:description" content="Select from our collection of professional, ATS-friendly resume templates. Customize colors and fonts to build a standout resume." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://quickresume.business/choose-template" />
      </Helmet>

      {/* Header & Progress */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-10">
        <button onClick={() => navigate('/start')} className="flex w-fit items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium">
          <ArrowLeft size={18} /> Back
        </button>
        
        <div className="flex items-center justify-center gap-2 md:gap-4 text-xs md:text-sm font-medium">
          <div className="flex items-center gap-2 text-blue-600"><div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">1</div> Choose template</div>
          <div className="w-8 h-px bg-gray-300"></div>
          <div className="flex items-center gap-2 text-gray-400"><div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">2</div> Enter details</div>
          <div className="w-8 h-px bg-gray-300 hidden md:block"></div>
          <div className="md:flex items-center gap-2 text-gray-400 hidden"><div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">3</div> Download resume</div>
        </div>
        
        <div className="w-[100px] hidden sm:block"></div> {/* Spacer for center alignment */}
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Select a template</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Choose from our collection of ATS-friendly templates. You can change the template, colors, and fonts later.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar justify-start md:justify-center">
          {['All Templates', 'Simple', 'Modern', 'One column', 'Professional'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === tab ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredTemplates.map((tpl, idx) => {
            const activeColor = hoveredColorTpl[tpl.id] || tpl.defaultColor;
            return (
              <div key={idx} className="group flex flex-col">
                <CardPreview tpl={tpl} activeColor={activeColor} handleSelect={handleSelect} getTemplateComponent={getTemplateComponent} />
                
                <h3 className="text-lg font-bold text-gray-900">{tpl.name}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{tpl.description}</p>
                
                <div className="flex gap-2 mt-3">
                   {/* Color swatches */}
                   {Array.from(new Set(['#2196F3', '#F44336', '#4CAF50', tpl.defaultColor])).map((c) => (
                     <div 
                       key={c}
                       onMouseEnter={() => setHoveredColorTpl(prev => ({ ...prev, [tpl.id]: c }))}
                       className={`w-5 h-5 rounded-full cursor-pointer transition-all ${activeColor === c ? 'ring-2 ring-offset-2 ring-blue-500' : 'hover:ring-2 hover:ring-offset-2 hover:ring-gray-300'}`}
                       style={{ backgroundColor: c }}
                     ></div>
                   ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default ChooseTemplate;
