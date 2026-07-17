import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

const examples = [
  { role: 'Software Engineer', industry: 'Technology', tips: ['Quantify performance wins (latency, uptime, cost)', 'Name your stack in a scannable skills block', 'Explain architecture decisions in one line each'] },
  { role: 'Product Manager', industry: 'Business', tips: ['Lead with user and revenue growth metrics', 'Show roadmap execution, not just planning', 'Highlight cross-functional leadership'] },
  { role: 'Data Scientist', industry: 'Data', tips: ['Tie models to money — revenue lifted or cost saved', 'List ML frameworks and cloud platforms', 'Mention dataset scale to signal seniority'] },
  { role: 'UX Designer', industry: 'Design', tips: ['Show research → design → outcome per project', 'Link a portfolio prominently in the header', 'Keep the layout itself impeccably clean'] },
  { role: 'Marketing Specialist', industry: 'Marketing', tips: ['Put campaign ROI and CAC front and center', 'Name channels and tools recruiters search for', 'Use strong verbs: launched, scaled, converted'] },
  { role: 'Sales Executive', industry: 'Sales', tips: ['Open with quota attainment percentages', 'Show deal sizes and enterprise logos won', 'Prove consistency across quarters'] },
  { role: 'Fresher / Graduate', industry: 'Entry level', tips: ['Lead with education, projects and internships', 'Turn coursework into skills recruiters recognise', 'Keep it to one confident page'] },
  { role: 'Registered Nurse', industry: 'Healthcare', tips: ['List certifications and licenses up top', 'Quantify patient loads and unit types', 'Use standard clinical terminology for ATS'] },
];

const ResumeExamples: FC = () => (
  <div className="min-h-screen bg-paper text-body font-sans flex flex-col selection:bg-pine selection:text-white">
    <Helmet>
      <title>Resume Examples by Role & Industry (2026) | QuickResume</title>
      <meta name="description" content="What a winning resume looks like for software engineers, product managers, freshers, nurses, sales and more — with the exact points recruiters scan for in each role." />
      <link rel="canonical" href="https://quickresume.business/examples" />
    </Helmet>

    <Navbar />

    <main className="flex-1 pt-16 md:pt-[72px]">
      <section className="bg-ruled border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-12 lg:pt-16 lg:pb-16">
          <p className="eyebrow mb-4">Examples</p>
          <h1 className="font-display text-4xl sm:text-5xl text-ink font-semibold mb-4 max-w-2xl leading-tight">
            What recruiters scan for, role by role
          </h1>
          <p className="text-lg max-w-xl">
            Each guide below lists the exact signals hiring managers look for in that role — use them as a checklist while you build.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {examples.map(example => (
            <article key={example.role} className="bg-card border border-line rounded-2xl p-6 shadow-card hover:shadow-lift transition-shadow flex flex-col">
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-pine mb-3">{example.industry}</span>
              <h2 className="text-lg font-bold text-ink mb-4">{example.role} resume</h2>
              <ul className="space-y-2.5 mb-6 flex-1">
                {example.tips.map(tip => (
                  <li key={tip} className="text-[14px] leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-seal">
                    {tip}
                  </li>
                ))}
              </ul>
              <Link
                to="/templates"
                className="inline-flex items-center gap-2 text-sm font-bold text-pine hover:text-pine-deep transition-colors"
              >
                Build this resume <ArrowRight className="w-4 h-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

export default ResumeExamples;
