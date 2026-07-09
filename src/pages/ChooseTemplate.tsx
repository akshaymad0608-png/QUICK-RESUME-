import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { TemplateCard } from '../components/TemplateCard';
import { TEMPLATES } from '../data/templates';
import { Feather, Search, LayoutTemplate } from 'lucide-react';

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
    const color = selectedColor || '#000000';
    
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
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900 selection:bg-slate-900 selection:text-white bg-grid-pattern-light relative">\n      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 to-slate-50 pointer-events-none z-0"></div>
      <Helmet>
        <title>Templates | QuickResume</title>
        <meta name="description" content="Browse our library of professional, modern, and minimal resume templates." />
      </Helmet>

      {/* Navbar Minimal */}
      <nav className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-slate-100 px-6 lg:px-10 flex items-center justify-between z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 bg-gradient-to-tr from-slate-900 to-slate-700 rounded-lg flex items-center justify-center">
            <Feather className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">QuickResume</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-bold uppercase tracking-widest text-slate-400">
          <div className="flex items-center gap-2 text-slate-900">
            <span>01</span>
            <span>Template</span>
          </div>
          <div className="w-4 h-px bg-slate-200"></div>
          <div className="flex items-center gap-2">
            <span>02</span>
            <span>Details</span>
          </div>
        </div>
        <div className="hidden md:block w-24"></div>
      </nav>

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 pt-32 pb-24 relative z-10">\n        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none -z-10 overflow-hidden">\n          <div className="absolute top-20 left-[10%] w-96 h-96 bg-blue-300/10 rounded-full blur-3xl"></div>\n          <div className="absolute top-40 right-[10%] w-96 h-96 bg-purple-300/10 rounded-full blur-3xl"></div>\n        </div>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Select a template</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">All templates are free to use and export.</p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col items-center mb-16 gap-8">
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search templates..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 focus:border-indigo-600 transition-all outline-none text-sm text-slate-900 placeholder:text-slate-400 font-medium"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2 max-w-5xl">
            {CATEGORIES.map((category) => (
              <button 
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm font-semibold transition-colors border ${
                  activeCategory === category 
                    ? 'bg-indigo-600 text-white border-indigo-600' 
                    : 'bg-white text-slate-500 border-transparent hover:text-slate-900 hover:border-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-slate-100 pb-4 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">
              {activeCategory === 'All' ? 'All Templates' : `${activeCategory} Templates`}
            </h2>
            <span className="text-slate-500 text-sm font-medium">{filteredTemplates.length} results</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Sort by:</span>
            <div className="bg-white border border-slate-200 flex p-0.5">
              {['Popular', 'Newest', 'Professional'].map(sortOption => (
                <button
                  key={sortOption}
                  onClick={() => setSortBy(sortOption)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                    sortBy === sortOption 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-slate-500 hover:text-slate-900'
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
            {filteredTemplates.map((tpl) => (
              <TemplateCard key={tpl.id} template={tpl} onSelect={(id, color) => handleSelect(id, color)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-slate-50 border border-slate-100">
            <div className="flex justify-center mb-4">
              <LayoutTemplate className="w-12 h-12 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No templates found</h3>
            <p className="text-slate-500 mb-6 text-sm">Try adjusting your search or category filter.</p>
            <button 
              onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
              className="px-6 py-3 bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
