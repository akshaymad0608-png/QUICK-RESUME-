/**
 * Post-build prerender: writes a static HTML file per route with correct
 * <title>, description, canonical and Open Graph tags baked in.
 *
 * This fixes the core SPA-SEO problem: crawlers and social scrapers that
 * don't run JavaScript now receive complete, unique metadata for every page,
 * while the React app still hydrates and takes over on load.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';

const DIST = 'dist';
const SITE = 'https://quickresume.business';
const OG_IMAGE = `${SITE}/og-image.png`;

const ROUTES = [
  { path: '/', title: 'QuickResume — Free AI Resume Builder | ATS-Friendly Templates', description: 'Build an ATS-friendly, job-winning resume in minutes. 60+ free templates for freshers, developers, designers and executives — with AI writing, ATS score checker and cover letters.' },
  { path: '/templates', title: '60+ Free Resume Templates by Role & Industry | QuickResume', description: 'Browse ATS-friendly resume templates for freshers, developers, designers, executives, healthcare, finance and more. Every template is free to try and exports to PDF.' },
  { path: '/improve', title: 'Improve My Resume — Free AI Resume Checker & Fixer | QuickResume', description: 'Already have a resume? Upload your PDF or DOCX, remove weak sections, get an instant ATS score, and let AI rewrite bullets, fix grammar and suggest missing skills — free.' },
  { path: '/examples', title: 'Resume Examples by Role & Industry (2026) | QuickResume', description: 'See what a winning resume looks like for software engineers, product managers, freshers, nurses, sales and more — with the exact points recruiters scan for in each role.' },
  { path: '/ai-tools', title: 'Free AI Resume Tools — Summary, ATS Check, Cover Letters | QuickResume', description: 'Free AI career tools: resume summary generator, ATS score checker, bullet point rewriter, skill suggestions, job description matcher and cover letter generator.' },
  { path: '/cover-letter', title: 'Free AI Cover Letter Generator | QuickResume', description: 'Generate a tailored, professional cover letter in seconds. Our AI matches your resume to the job description — free to write and download.' },
  { path: '/resources', title: 'Career Resources & Resume Guides | QuickResume', description: 'Expert advice, resume outlines, action verbs and ATS formatting tips to help you build the perfect resume and land your dream job faster.' },
  { path: '/pricing', title: 'Pricing — Free & Pro Plans | QuickResume', description: 'Build a resume, check your ATS score and export a PDF for free. Upgrade to Pro for unlimited resumes, premium templates and all AI tools.' },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const template = readFileSync(join(DIST, 'index.html'), 'utf-8');

for (const route of ROUTES) {
  const url = `${SITE}${route.path === '/' ? '/' : route.path}`;
  let html = template;

  // Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`);
  // Replace meta description
  html = html.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(route.description)}" />`);
  // Replace canonical
  html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`);
  // Replace OG title/description/url
  html = html.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(route.title)}" />`);
  html = html.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(route.description)}" />`);
  html = html.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`);
  // Replace twitter title/description
  html = html.replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${esc(route.title)}" />`);
  html = html.replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${esc(route.description)}" />`);

  const outPath = route.path === '/' ? join(DIST, 'index.html') : join(DIST, route.path.slice(1), 'index.html');
  if (route.path !== '/') mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  console.log(`prerendered ${route.path} → ${outPath.replace(DIST + '/', '')}`);
}

// Ensure og-image referenced correctly
if (!existsSync(join(DIST, 'og-image.png'))) {
  console.warn('WARNING: og-image.png not found in dist');
}
console.log('Prerender complete:', ROUTES.length, 'routes');
