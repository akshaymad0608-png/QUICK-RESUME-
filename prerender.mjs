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
  { path: '/', title: 'QuickResume — Free AI Resume Builder, ATS Templates', description: 'Build a job-winning, ATS-friendly resume in minutes. 60+ free templates, plus AI writing, an ATS score checker and a cover letter generator.',
    h1: 'Free AI Resume Builder — ATS-Friendly Templates',
    intro: 'QuickResume helps you build a job-winning, ATS-friendly resume in minutes. Choose from 60+ free templates for freshers, developers, designers and executives, then use AI to write your summary, rewrite bullet points, check your ATS score and generate a matching cover letter — free, with no sign-up.',
    sections: [
      { h2: 'What you get', points: [
        '60+ free, ATS-friendly resume templates by role and industry',
        'AI writing — summary, bullet points and skills, rewritten for the job you want',
        'ATS score checker — see how your resume reads to applicant tracking software before you submit it',
        'Matching cover letter generator',
        'Export to a clean, recruiter-ready PDF',
      ] },
      { h2: 'Who it is for', points: [
        'Freshers building a first resume with no work history yet',
        'Experienced hires tailoring one resume per application',
        'Anyone whose resume is being filtered out by ATS software before a human sees it',
      ] },
    ] },
  { path: '/templates', title: '60+ Free Resume Templates by Role & Industry | QuickResume', description: 'ATS-friendly resume templates for freshers, developers, designers, executives, healthcare and finance — free to try and exports to a clean PDF.',
    h1: '60+ Free Resume Templates by Role & Industry',
    intro: 'Browse ATS-friendly resume templates for freshers, developers, designers, executives, healthcare, finance and more. Every template is free to try, easy to edit and exports to a clean PDF that passes applicant tracking systems.' },
  { path: '/improve', title: 'Improve My Resume — Free AI Resume Checker & Fixer | QuickResume', description: 'Upload your PDF or DOCX to get an instant ATS score, then let AI rewrite bullets, fix grammar and suggest the skills recruiters want — free.',
    h1: 'Improve My Resume — Free AI Resume Checker',
    intro: 'Already have a resume? Upload your PDF or DOCX and QuickResume gives you an instant ATS score, flags weak sections, rewrites your bullet points, fixes grammar and suggests the skills recruiters look for — all free and in your browser.' },
  { path: '/examples', title: 'Resume Examples by Role & Industry (2026) | QuickResume', description: 'See what a winning resume looks like for software engineers, product managers, freshers, nurses and sales — the exact points recruiters scan for.',
    h1: 'Resume Examples by Role & Industry (2026)',
    intro: 'See what a winning resume looks like for software engineers, product managers, freshers, nurses, sales and more — with the exact skills, keywords and bullet points recruiters scan for in each role, ready to adapt for your own resume.' },
  { path: '/ai-tools', title: 'Free AI Resume Tools — Summary, ATS Check, Cover Letters | QuickResume', description: 'Free AI career tools: resume summary generator, ATS score checker, bullet point rewriter, skill suggestions, job description matcher and cover letter generator.',
    h1: 'Free AI Resume Tools',
    intro: 'A full set of free AI career tools in one place: resume summary generator, ATS score checker, bullet point rewriter, skill suggestions, job-description matcher and a cover letter generator — everything you need to tailor your resume to any job.' },
  { path: '/cover-letter', title: 'Free AI Cover Letter Generator | QuickResume', description: 'Generate a tailored, professional cover letter in seconds. Our AI matches your resume to the job description — free to write and download.',
    h1: 'Free AI Cover Letter Generator',
    intro: 'Generate a tailored, professional cover letter in seconds. Paste the job description and QuickResume’s AI matches it to your resume, writes a compelling letter in your voice, and lets you download it free — no sign-up required.' },
  { path: '/resources', title: 'Career Resources & Resume Guides | QuickResume', description: 'Expert advice, resume outlines, action verbs and ATS formatting tips to help you build the perfect resume and land your dream job faster.',
    h1: 'Career Resources & Resume Guides',
    intro: 'Expert advice, ready-to-use resume outlines, strong action verbs and ATS formatting tips to help you build a resume that gets past the bots and in front of recruiters — so you land interviews faster.' },
  { path: '/pricing', title: 'Pricing — Free & Pro Plans | QuickResume', description: 'Build a resume, check your ATS score and export a PDF for free. Upgrade to Pro for unlimited resumes, premium templates and all AI tools.',
    h1: 'QuickResume Pricing — Free & Pro Plans',
    intro: 'Build a resume, check your ATS score and export a PDF completely free. Upgrade to Pro for unlimited resumes, premium templates and every AI tool — with clear, simple pricing and no hidden fees.' },
  // App entry points. These are React-only routes, so without a prerendered
  // file the host returns 404 to anyone landing on them directly — including
  // every "Start" link shared or bookmarked.
  { path: '/start', title: 'Start Your Resume — Free AI Resume Builder | QuickResume', description: 'Start building your resume free: pick a template, import an existing resume, or let AI draft it from your details. No sign-up needed.',
    h1: 'Start Your Resume',
    intro: 'Start building your resume in the way that suits you: pick from 60+ ATS-friendly templates, import a resume you already have, or let AI draft one from a few details. It is free, runs in your browser and needs no sign-up.' },
  { path: '/build', title: 'Resume Builder — Edit, Score & Export Free | QuickResume', description: 'Write, edit and export your resume with live ATS scoring, AI bullet rewrites and a clean PDF download — free, right in your browser.',
    h1: 'Resume Builder',
    intro: 'Write and edit your resume with live preview, AI-assisted bullet points, instant ATS scoring and one-click PDF export. Everything runs in your browser and your data stays on your device.' },
];

const NAV = '<nav aria-label="Sections"><a href="/templates">Resume templates</a> · <a href="/improve">Improve my resume</a> · <a href="/examples">Resume examples</a> · <a href="/ai-tools">AI resume tools</a> · <a href="/cover-letter">Cover letter generator</a> · <a href="/pricing">Pricing</a></nav>';

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

  // Give each route its own crawlable body: h1 + intro inside #root (React
  // replaces it on mount). Fixes the empty-#root / no-h1 SPA problem per route.
  if (route.h1) {
    // Optional h2 sections give crawlers real heading structure and more
    // than a single paragraph of body text, without touching what real
    // visitors see (React replaces this whole block on mount).
    const sectionsHtml = (route.sections || [])
      .map((s) => `<h2 style="font-size:20px;margin:28px 0 10px">${esc(s.h2)}</h2><ul style="font-size:15px;line-height:1.6;color:#444;padding-left:20px">${s.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>`)
      .join('');
    const seoBlock = `<div id="prerender-seo" style="max-width:760px;margin:0 auto;padding:48px 20px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif"><h1 style="font-size:30px;line-height:1.2;margin:0 0 14px">${esc(route.h1)}</h1><p style="font-size:17px;line-height:1.6;color:#444">${esc(route.intro)}</p>${sectionsHtml}${NAV}</div>`;
    html = html.replace(/<div id="prerender-seo"[\s\S]*?<\/nav><\/div>/, seoBlock);
  }

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
