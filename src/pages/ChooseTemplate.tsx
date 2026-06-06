import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { TemplateCard } from '../components/TemplateCard';
import { TEMPLATES } from '../data/templates';

const CATEGORIES = [
  'All',
  'Professional',
  'Modern',
  'Minimal',
  'Creative',
  'Colorful',
  'Executive',
  'Corporate',
  'Fresher',
  'Student',
  'Developer',
  'Designer',
  'Marketing',
  'Healthcare',
  'Finance',
  'Teacher',
  'Engineering',
  'ATS Friendly',
  'Two Column',
  'Infographic',
  'Google Docs Style'
];

export default function ChooseTemplate() {
  const navigate = useNavigate();
  const { data, updateSection } = useResume();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Popular');

  const handleSelect = (templateId: string, selectedColor?: string) => {
    const color = selectedColor || '#2563EB';
    
    updateSection('design', { 
      ...data.design, 
      template: templateId, 
      color 
    });
    navigate('/build');
  };

  const filteredTemplates = useMemo(() => {
    let result = TEMPLATES.filter(tpl => {
      const matchesCategory = activeCategory === 'All' || tpl.category === activeCategory;
      const matchesSearch = searchTerm.trim() === '' || 
        tpl.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        tpl.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'Newest') {
      result = [...result].reverse(); // Mock newest by reversing
    } else if (sortBy === 'Professional') {
      result = [...result].sort((a, b) => a.category === 'Professional' ? -1 : (b.category === 'Professional' ? 1 : 0));
    }
    // 'Popular' leaves as default order

    return result;
  }, [activeCategory, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-body">
      <Helmet>
        <title>Professional Resume Templates | QuickResume</title>
        <meta name="description" content="Browse our library of 50+ professional, modern, and creative resume templates. All templates are customizable, ATS-friendly, and free to download." />
        <meta property="og:title" content="50+ Free Resume Templates for 2024 | QuickResume" />
        <meta property="og:description" content="Find the perfect resume template for your next job application. Easily download as PDF or DOCX." />
      </Helmet>

      {/* Navbar Minimal */}
      <nav className="fixed top-0 left-0 right-0 h-[72px] bg-white border-b border-[var(--color-border)] px-6 lg:px-10 flex items-center justify-between z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <i className="ti ti-file-description text-white text-xl"></i>
          </div>
          <span className="text-xl font-bold text-heading tracking-tight">QuickResume</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <div className="flex items-center gap-2 text-primary">
            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">1</div>
            <span>Choose Template</span>
          </div>
          <div className="w-8 h-px bg-gray-200"></div>
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-xs font-bold">2</div>
            <span>Enter Details</span>
          </div>
        </div>
        <div className="w-24"></div>
      </nav>

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 pt-32 pb-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-heading mb-4 text-gray-900">Choose from professional resume templates</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Build your resume with our recruiter-approved templates. Free to customize, download, and apply to your dream job.</p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col items-center mb-14 gap-8">
          <div className="relative w-full max-w-lg">
            <i className="ti ti-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
            <input 
              type="text" 
              placeholder="Search templates by name (e.g., modern, executive)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm font-medium outline-none text-sm"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 max-w-5xl">
            {CATEGORIES.map((category) => (
              <button 
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-[100px] text-sm font-semibold transition-all ${
                  activeCategory === category 
                    ? 'bg-white text-primary border-2 border-primary shadow-sm' 
                    : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-gray-200 pb-4 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {activeCategory === 'All' ? 'All Templates' : `${activeCategory} Templates`}
            </h2>
            <span className="text-gray-500 font-medium">{filteredTemplates.length} templates</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-500">Sort by:</span>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-1 flex">
              {['Popular', 'Newest', 'Professional'].map(sortOption => (
                <button
                  key={sortOption}
                  onClick={() => setSortBy(sortOption)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    sortBy === sortOption 
                      ? 'bg-white text-gray-900 shadow-[0_1px_3px_rgba(0,0,0,0.1)]' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {sortOption}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        {filteredTemplates.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 md:gap-10">
            {filteredTemplates.map((tpl) => (
              <TemplateCard key={tpl.id} template={tpl} onSelect={(id, color) => handleSelect(id, color)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-200">
            <div className="text-gray-400 mb-4 text-5xl">
              <i className="ti ti-receipt-off"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-500">Try adjusting your search or category filter.</p>
            <button 
              onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
              className="mt-6 px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors shadow-sm"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
