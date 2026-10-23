#!/usr/bin/env node
/**
 * Builds static guide pages in public/ from guides-src/<slug>.json.
 *
 *   node scripts/build-guides.mjs            # build every guides-src/*.json
 *   node scripts/build-guides.mjs slug ...   # build only these slugs
 *
 * The page chrome (head, header, footer, consent banner) comes from
 * guides-src/_template.html so every generated guide matches the hand-made ones.
 * Content (title, sections, FAQs, related links) lives in the JSON file.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SITE = 'https://quickresume.business';
const SRC = 'guides-src';
const OUT = 'public';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const jsonLd = (o) => `<script type="application/ld+json">\n${JSON.stringify(o, null, 2)}\n</script>`;
const monthYear = (iso) => new Date(iso + 'T00:00:00Z').toLocaleString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

// Titles for "Related guides" links. Existing guides first; generated ones are added from their JSON.
const TITLES = {
  'how-to-make-a-resume': 'Resume Kaise Banaye',
  'ats-resume-checker': 'ATS Resume Checker',
  'what-is-an-ats-resume': 'What Is an ATS Resume?',
  'resume-banane-wala-app': 'Resume Banane Wala App',
  'cv-vs-resume': 'CV vs Resume',
  'resume-format-for-freshers': 'Resume Format for Freshers',
  'biodata-format-for-job': 'Biodata Format for Job',
  'how-long-should-a-resume-be': 'How Long Should a Resume Be?',
  'resume-format-for-experienced': 'Resume Format for Experienced',
  'cover-letter-format': 'Cover Letter Format',
  'cover-letter-for-freshers': 'Cover Letter for Freshers',
  'pdf-or-word-resume': 'PDF or Word Resume?',
  'photo-on-resume-india': 'Photo on Resume in India',
  'resume-summary-examples': 'Resume Summary Examples',
  'career-objective-for-resume': 'Career Objective Examples',
  'resume-headline-examples': 'Resume Headline Examples',
  'skills-for-resume': 'Skills to Put on a Resume',
  'projects-section-for-resume': 'Projects Section in Resume',
  'resume-for-software-engineer': 'Software Engineer Resume',
  'resume-for-teacher': 'Teacher Resume',
  'resume-for-internship': 'Resume for Internship',
};

const files = readdirSync(SRC).filter((f) => f.endsWith('.json'));
const guides = files.map((f) => JSON.parse(readFileSync(join(SRC, f), 'utf8')));
for (const g of guides) TITLES[g.slug] = g.h1 || TITLES[g.slug] || g.slug;

const only = process.argv.slice(2);
const template = readFileSync(join(SRC, '_template.html'), 'utf8');

function build(g) {
  const url = `${SITE}/${g.slug}`;
  const modified = g.modified || g.published;
  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(g.title)}</title>`);
  html = html.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(g.description)}" />`);
  html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`);
  html = html.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(g.title)}" />`);
  html = html.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(g.description)}" />`);
  html = html.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`);
  html = html.replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${esc(g.title)}" />`);
  html = html.replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${esc(g.description)}" />`);

  const article = {
    '@context': 'https://schema.org', '@type': 'Article', headline: g.title, description: g.description,
    inLanguage: 'en', datePublished: g.published, dateModified: modified, mainEntityOfPage: url,
    author: { '@type': 'Organization', name: 'QuickResume', url: `${SITE}/` },
    publisher: { '@id': `${SITE}/#org` }, image: `${SITE}/og-image.png`,
  };
  const crumbs = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Resources', item: `${SITE}/resources` },
      { '@type': 'ListItem', position: 3, name: g.h1, item: url },
    ],
  };
  const faq = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: g.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  const ld = [jsonLd(article), jsonLd(crumbs), jsonLd(faq)];
  let i = 0;
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, () => ld[i++] ?? '');

  const related = (g.related || []).filter((s) => s !== g.slug && TITLES[s])
    .map((s) => `    <a href="${SITE}/${s}">${esc(TITLES[s])}</a>`).join('\n');

  const main = `<main class="wrap">
  <div class="crumbs"><a href="${SITE}/">Home</a> › <a href="${SITE}/resources">Resources</a> › <span>${esc(g.h1)}</span></div>
  <h1>${esc(g.h1)}</h1>
  <p class="lede">${esc(g.lede)}</p>
  <p class="meta">Updated ${monthYear(modified)} · By <a href="${SITE}/">QuickResume</a> · Free · No sign-up</p>
  <div class="toc"><b>Quick answer</b><p style="margin:8px 0 0">${g.quickAnswer}</p></div>
${g.sections.map((s) => `  <h2>${esc(s.h2)}</h2>\n  ${s.html}`).join('\n')}
${g.note ? `  <div class="note">${esc(g.note)}</div>\n` : ''}  <div class="cta">
    <h2>${esc(g.cta.title)}</h2>
    <p style="color:var(--mist);margin:0 0 14px">${esc(g.cta.text)}</p>
    <a class="btn" href="${g.cta.href}">${esc(g.cta.label)}</a>
  </div>
  <h2>Frequently asked questions</h2>
  <div class="faq">
${g.faqs.map((f) => `    <p><b>${esc(f.q)}</b><br>${esc(f.a)}</p>`).join('\n')}
  </div>
  <h2>Related guides</h2>
  <div class="related">
${related}
  </div>
</main>`;
  html = html.replace(/<main class="wrap">[\s\S]*?<\/main>/, () => main);
  writeFileSync(join(OUT, `${g.slug}.html`), html);
  const words = (g.lede + ' ' + g.quickAnswer + ' ' + g.sections.map((s) => s.h2 + ' ' + s.html).join(' ')).replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  console.log(`built ${g.slug}.html (~${words} words, ${g.faqs.length} FAQs)`);
}

for (const g of guides) if (!only.length || only.includes(g.slug)) build(g);
