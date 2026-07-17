import { useState, useMemo } from 'react';
import { Seo } from '../components/Seo';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { TemplateCard } from '../components/TemplateCard';
import { TEMPLATES } from '../data/templates';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Search, LayoutTemplate } from 'lucide-react';

/* Categories grouped so 21 chips don't overwhelm — especially on mobile */
const CATEGORY_GROUPS: { label: string; items: string[] }[] = [
  { label: 'Popular', items: ['All', 'ATS Friendly', 'Professional', 'Modern', 'Minimal'] },
  { label: 'Career stage', items: ['Fresher', 'Student', 'Executive', 'Corporate'] },
  { label: 'By role', items: ['Developer', 'Designer', 'Engineering', 'Marketing', 'Healthcare', 'Finance', 'Teacher'] },
  { label: 'By style', items: ['Creative', 'Colorful', 'Two Column', 'Infographic', 'Google Docs Style'] },
];

export default function ChooseTemplate() {
  const navigate = useNavigate();
  const { data, updateSection } = useResume();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelect = (templateId: string, selectedColor?: string) => {
    updateSection('design', {
      ...data.design,
      template: templateId,
      color: selectedColor || '#171D2F',
    });
    navigate('/build');
  };

  const filteredTemplates = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return TEMPLATES.filter(tpl => {
      const matchesCategory = activeCategory === 'All' || tpl.category === activeCategory;
      const matchesSearch = !q ||
        tpl.name.toLowerCase().includes(q) ||
        tpl.description.toLowerCase().includes(q) ||
        tpl.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-paper text-body font-sans flex flex-col selection:bg-pine selection:text-white">
      <Seo
        path="/templates"
        title="60+ Free Resume Templates by Role & Industry | QuickResume"
        description="Browse ATS-friendly resume templates for freshers, developers, designers, executives, healthcare, finance and more. Every template is free to try and exports to PDF."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Resume Templates",
          "description": "ATS-friendly resume templates by role and industry.",
          "url": "https://quickresume.business/templates"
        }}
      />

      <Navbar />

      <main className="flex-1 pt-16 md:pt-[72px]">
        {/* Page head */}
        <section className="bg-ruled border-b border-line">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-10 lg:pt-16 lg:pb-14">
            <p className="eyebrow mb-4">Template library</p>
            <h1 className="font-display text-4xl sm:text-5xl text-ink font-semibold mb-4 max-w-2xl leading-tight">
              Pick the template your industry expects
            </h1>
            <p className="text-lg max-w-xl">
              {TEMPLATES.length} ATS-tested layouts, organised by role, career stage and style. Change template anytime — your content adapts instantly.
            </p>
          </div>
        </section>

        {/* Sticky filter bar */}
        <div className="sticky top-16 md:top-[72px] z-30 bg-paper/95 backdrop-blur border-b border-line">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col lg:flex-row lg:items-center gap-3">
            <div className="relative w-full lg:w-72 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mist w-4 h-4" />
              <input
                type="search"
                placeholder="Search templates…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search templates"
                className="w-full pl-10 pr-4 py-2.5 bg-card border border-line rounded-full focus:border-pine outline-none text-sm text-ink placeholder:text-mist"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0">
              {CATEGORY_GROUPS.flatMap(g => g.items).map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-semibold border transition-colors ${
                    activeCategory === category
                      ? 'bg-ink text-paper border-ink'
                      : 'bg-card text-ink-soft border-line hover:border-ink/40'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-ink">
              {activeCategory === 'All' ? 'All templates' : `${activeCategory} templates`}
            </h2>
            <span className="font-mono text-xs tracking-[0.14em] uppercase text-mist">{filteredTemplates.length} results</span>
          </div>

          {filteredTemplates.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {filteredTemplates.map(tpl => (
                <TemplateCard key={tpl.id} template={tpl} onSelect={handleSelect} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-card border border-line rounded-2xl">
              <LayoutTemplate className="w-10 h-10 text-mist mx-auto mb-4" />
              <h3 className="text-lg font-bold text-ink mb-1">No templates match "{searchTerm}"</h3>
              <p className="text-sm mb-6">Try a shorter search, or browse a category instead.</p>
              <button
                onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                className="px-6 py-3 bg-pine text-white rounded-full text-sm font-bold hover:bg-pine-deep transition-colors"
              >
                Show all templates
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
