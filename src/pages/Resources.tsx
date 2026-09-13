import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ArrowUpRight, FileText, Layers, PenSquare, Briefcase } from 'lucide-react';

/**
 * This page used to be the reason eleven real guides got zero impressions
 * (a twelfth, cv-vs-resume, joined later and was linked from here from day one).
 *
 * QuickResume has prerendered guide pages — resume-format-for-freshers,
 * ats-resume-checker, skills-for-resume and eight more, each with a real
 * 2026-dated title and its own meta description. None of them are React
 * routes; they are static HTML files in /public, served directly by Vercel.
 * That is fine for Google, which reads sitemap.xml regardless. It is not fine
 * for a human, because nothing inside the app ever linked to any of them —
 * not this page, not the footer, not the navbar. The only way in was typing
 * the URL or already being on Google, and Google had nothing crawlable
 * pointing at them either: sitemap.xml lists a URL, but a sitemap entry with
 * no incoming link from an indexed page is a weak signal next to a real
 * anchor. Eleven pages, live for months, zero impressions — orphaned is the
 * likely reason.
 *
 * What was here instead: four hard-coded cards with fabricated dates ("May
 * 12", no year) and a "Read full guide" button that only toggled an
 * accordion — there was no full guide to read, on this page or any other.
 * Off-brand colours too (blue-600, slate-900), not this site's pine/ink/paper
 * tokens.
 *
 * Every link to a guide below is a plain <a>, not React Router's <Link>. The
 * guides are not app routes — App.tsx has no catch-all — so a client-side
 * <Link> to one would match nothing and render blank while the URL changed
 * underneath it. A full navigation is what actually reaches the static file.
 */

interface Guide {
  slug: string;
  title: string;
  description: string;
}

interface GuideGroup {
  label: string;
  icon: typeof FileText;
  guides: Guide[];
}

const GROUPS: GuideGroup[] = [
  {
    label: 'Start here',
    icon: FileText,
    guides: [
      {
        slug: 'how-to-make-a-resume',
        title: 'How to Make a Resume in 2026',
        description: 'A step-by-step guide — format, sections, what to write, and where AI can do it for you.',
      },
      {
        slug: 'ats-resume-checker',
        title: 'Free ATS Resume Checker',
        description: 'Upload your resume, get an instant score, and see exactly what to fix to get past the bots.',
      },
      {
        slug: 'cv-vs-resume',
        title: 'CV vs Resume: What’s the Difference?',
        description: 'The real difference — length, content, and which one to send for a job in India, the US or the UK.',
      },
    ],
  },
  {
    label: 'Format & structure',
    icon: Layers,
    guides: [
      {
        slug: 'resume-format-for-freshers',
        title: 'Biodata Format for Job',
        description: 'The exact biodata format for a job application — personal details, education, experience and the declaration line.',
      },
      {
        slug: 'resume-format-for-experienced',
        title: 'Resume Format for Experienced Professionals',
        description: 'A summary-first structure built for someone with a track record to lead with.',
      },
      {
        slug: 'cover-letter-format',
        title: 'Cover Letter Format',
        description: 'The right structure, a worked example, and a free generator that matches your resume.',
      },
    ],
  },
  {
    label: 'Writing help',
    icon: PenSquare,
    guides: [
      {
        slug: 'resume-summary-examples',
        title: 'Resume Summary Examples',
        description: '15+ professional summaries, plus a two-line formula for writing your own.',
      },
      {
        slug: 'career-objective-for-resume',
        title: 'Career Objective for Resume',
        description: '20+ objective examples for freshers and experienced candidates, by situation.',
      },
      {
        slug: 'resume-headline-examples',
        title: 'Resume Headline for Naukri',
        description: '20+ headline examples by role, plus how to work inside the 250-character limit.',
      },
      {
        slug: 'skills-for-resume',
        title: 'Skills to Put on a Resume',
        description: '100+ hard and soft skills by role, and how to match them to a job description.',
      },
    ],
  },
  {
    label: 'By role',
    icon: Briefcase,
    guides: [
      {
        slug: 'resume-for-software-engineer',
        title: 'Software Engineer Resume',
        description: 'Format, must-have skills, and project bullets that actually land interviews.',
      },
      {
        slug: 'resume-for-teacher',
        title: 'Teacher Resume',
        description: 'Format, key skills, and the classroom achievements that get you shortlisted.',
      },
    ],
  },
];

const ALL_GUIDES = GROUPS.flatMap((g) => g.guides);
const SITE = 'https://quickresume.business';

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'QuickResume career guides',
  itemListElement: ALL_GUIDES.map((g, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${SITE}/${g.slug}`,
    name: g.title,
  })),
};

const Resources: FC = () => {
  return (
    <div className="min-h-screen bg-paper text-body flex flex-col font-sans selection:bg-pine selection:text-white">
      <Seo
        path="/resources"
        title="Career Resources & Resume Guides | QuickResume"
        description="12 free, up-to-date guides on resume format, ATS, CV vs resume, summaries, headlines and skills — plus role-specific guides for software engineers and teachers."
        jsonLd={itemListSchema}
      />

      <Navbar />

      <section className="pt-32 pb-16 px-6 border-b border-line bg-card">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist">Career resources</p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink">
            Guides for every stage of the search
          </h1>
          <p className="text-lg text-mist max-w-2xl mx-auto leading-relaxed">
            {ALL_GUIDES.length} free guides, each updated for 2026 — format, ATS, what to write, and
            role-specific examples you can copy and adapt.
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto w-full px-6 py-20 flex-1">
        <div className="space-y-16">
          {GROUPS.map((group) => (
            <section key={group.label}>
              <div className="flex items-center gap-2.5 mb-6">
                <group.icon size={18} className="text-pine" />
                <h2 className="font-display text-xl font-semibold text-ink">{group.label}</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {group.guides.map((guide) => (
                  <a
                    key={guide.slug}
                    href={`/${guide.slug}`}
                    className="group flex flex-col justify-between rounded-xl border border-line bg-card p-6 shadow-card hover:border-pine hover:shadow-lift transition-all"
                  >
                    <div>
                      <h3 className="font-semibold text-ink leading-snug group-hover:text-pine transition-colors">
                        {guide.title}
                      </h3>
                      <p className="mt-2 text-[14.5px] leading-relaxed text-mist">{guide.description}</p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-pine">
                      Read the guide
                      <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-20 rounded-2xl bg-ink px-8 py-10 text-center">
          <h2 className="font-display text-2xl font-semibold text-paper">
            Ready to build, not just read?
          </h2>
          <p className="mt-2 text-ink-muted max-w-xl mx-auto">
            Pick a template, let AI write the first draft, and export a free ATS-ready PDF in about ten minutes.
          </p>
          <Link
            to="/start"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-pine px-6 py-3 font-semibold text-white hover:bg-pine-deep transition-colors"
          >
            Create my resume
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
