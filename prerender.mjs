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
  { path: '/', title: 'QuickResume — Free AI Resume Builder, ATS Templates', keywords: 'free resume builder, AI resume builder, ATS resume builder, resume templates, free resume maker, resume creator, ATS friendly resume, resume builder for freshers', description: 'Build a job-winning, ATS-friendly resume in minutes. 60+ free templates, plus AI writing, an ATS score checker and a cover letter generator.',
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
      { h2: 'Template categories', points: [
        'Colorful — 12 templates across bold, warm and pastel accent colours',
        'Executive and Corporate — 9 templates for senior and leadership roles',
        'Developer and Designer — 8 templates built around tech and portfolio work',
        'Creative and Minimal — 8 templates from bare-bones minimal to sidebar layouts',
        'Fresher and Student — 6 templates for a first resume with no work history',
        'Finance, Healthcare, Teacher, Engineering, Marketing — role-specific templates',
        'ATS Friendly, Two Column, Infographic and Google Docs Style — format-specific picks',
      ] },
    ] },
  { path: '/templates', title: '60+ Free Resume Templates by Role & Industry | QuickResume', keywords: 'free resume templates, ATS resume templates, resume templates for freshers, resume templates for developers, professional resume templates, CV templates, resume format', description: 'ATS-friendly resume templates for freshers, developers, designers, executives, healthcare and finance — free to try and exports to a clean PDF.',
    h1: '60+ Free Resume Templates by Role & Industry',
    intro: 'Browse ATS-friendly resume templates for freshers, developers, designers, executives, healthcare, finance and more. Every template is free to try, easy to edit and exports to a clean PDF that passes applicant tracking systems.',
    sections: [
      { h2: 'Template categories', points: [
        'Colorful — bold, warm and pastel accent colours across 12 templates',
        'Executive and Corporate — 9 templates designed for senior and leadership roles',
        'Developer and Designer — 8 templates built around tech skills and portfolio work',
        'Creative and Minimal — 8 templates from bare-bones single-column to sidebar layouts',
        'Fresher and Student — 6 templates for a first resume with no work history',
        'Finance, Healthcare, Teacher, Engineering, Marketing — role-specific picks',
        'ATS Friendly, Two Column, Infographic and Google Docs Style — format-specific options',
      ] },
      { h2: 'What makes a template ATS-friendly', points: [
        'Standard section headings (Experience, Education, Skills) that ATS software recognises',
        'No text boxes, tables or graphics that parsing software cannot read',
        'Clean fonts and readable font sizes (10pt minimum)',
        'Consistent date formatting so work history parses in the right order',
      ] },
    ],
    faq: [
      { question: 'Which resume template is best for freshers?', answer: 'The Fresher and Student category has 6 templates designed for a first resume with no work history. They emphasise education, projects, internships and skills over a long work history section.' },
      { question: 'Are these resume templates ATS-friendly?', answer: 'Yes. Every template uses standard section headings, clean fonts and no graphics or text boxes that ATS software cannot parse. Each one has been tested against common applicant tracking systems.' },
      { question: 'Can I download the resume as a PDF?', answer: 'Yes. Every template can be exported to a clean, recruiter-ready PDF in one click — no sign-up or payment required.' },
      { question: 'Which template should I use for a software engineer resume?', answer: 'The Developer and Designer category has 8 templates built around technical skills, projects and GitHub/portfolio links. The ATS Friendly templates also work well for software engineering roles where the resume may be screened automatically.' },
    ] },
  { path: '/improve', title: 'Improve My Resume — Free AI Resume Checker and Fixer', keywords: 'resume checker, ATS score checker, improve resume, resume fixer, AI resume checker, ATS resume score, resume optimization, how to improve resume', description: 'Upload your PDF or DOCX to get an instant ATS score, then let AI rewrite bullets, fix grammar and suggest the skills recruiters want — free.',
    h1: 'Improve My Resume — Free AI Resume Checker',
    intro: 'Already have a resume? Upload your PDF or DOCX and QuickResume gives you an instant ATS score, flags weak sections, rewrites your bullet points, fixes grammar and suggests the skills recruiters look for — all free and in your browser.',
    sections: [
      { h2: 'What the resume checker does', points: [
        'ATS score — how well your resume passes applicant tracking software',
        'Keyword analysis — skills and terms missing for your target role',
        'Bullet point rewriter — weak or passive bullets rewritten as strong, quantified achievements',
        'Grammar and spelling check — fixes errors that undermine credibility',
        'Section feedback — flags a missing summary, short descriptions or thin skills section',
      ] },
    ],
    faq: [
      { question: 'What is an ATS score?', answer: 'An ATS (applicant tracking system) score estimates how well your resume will be parsed and ranked by the software recruiters use to filter applications. A higher score means more of your content is readable and keyword-matched to the job. Most companies use ATS software, so a low score means fewer humans see your resume.' },
      { question: 'How do I improve my ATS score?', answer: 'Use standard section headings (Experience, Education, Skills), include keywords from the job description, avoid tables and text boxes, and use a clean font at a readable size. QuickResume\'s ATS checker flags exactly what is lowering your score and suggests specific fixes.' },
      { question: 'What file formats can I upload?', answer: 'You can upload a PDF or DOCX file. Both are supported. The checker reads your resume, analyses it and returns feedback and rewrites in your browser — your file is not stored on a server.' },
      { question: 'Is the resume checker really free?', answer: 'Yes, fully free — no sign-up, no credit card, no limit on how many times you use it.' },
    ] },
  { path: '/examples', title: 'Resume Examples by Role & Industry (2026) | QuickResume', keywords: 'resume examples, resume samples, resume example for software engineer, fresher resume example, resume example 2026, CV examples, sample resume', description: 'See what a winning resume looks like for software engineers, product managers, freshers, nurses and sales — the exact points recruiters scan for.',
    h1: 'Resume Examples by Role & Industry (2026)',
    intro: 'See what a winning resume looks like for software engineers, product managers, freshers, nurses, sales and more — with the exact skills, keywords and bullet points recruiters scan for in each role, ready to adapt for your own resume.',
    sections: [
      { h2: 'Resume examples by role', points: [
        'Software Engineer — technical skills, project highlights, GitHub links and system design experience',
        'Product Manager — roadmap ownership, cross-functional leadership and metrics-driven achievements',
        'Data Analyst — SQL, Python, dashboards and business impact of data work',
        'Marketing Manager — campaign results, channel ownership and revenue attribution',
        'Fresher / Recent Graduate — education, projects, internships and transferable skills',
        'Nurse / Healthcare — clinical skills, certifications, patient care and care settings',
        'Sales Representative — quota attainment, pipeline management and client acquisition',
        'Graphic Designer — portfolio link, tools (Figma, Adobe), and project outcomes',
      ] },
    ] },
  { path: '/ai-tools', title: 'Free AI Resume Tools — Summary, ATS Check, Cover Letter', keywords: 'AI resume tools, resume summary generator, ATS score checker, bullet point rewriter, AI career tools, job description matcher, free AI resume writer', description: 'Free AI career tools: resume summary generator, ATS score checker, bullet point rewriter, skill suggestions, job description matcher and cover letter generator.',
    h1: 'Free AI Resume Tools',
    intro: 'A full set of free AI career tools in one place: resume summary generator, ATS score checker, bullet point rewriter, skill suggestions, job-description matcher and a cover letter generator — everything you need to tailor your resume to any job.',
    sections: [
      { h2: 'AI tools included', points: [
        'Resume summary generator — write a compelling professional summary in seconds',
        'ATS score checker — see how your resume reads to applicant tracking software',
        'Bullet point rewriter — turn weak, passive bullets into quantified achievements',
        'Skill suggestions — find the keywords and skills recruiters look for in your role',
        'Job description matcher — compare your resume to a specific job posting and close the gaps',
        'Cover letter generator — generate a tailored cover letter matched to your resume and the role',
      ] },
    ],
    faq: [
      { question: 'What AI tools does QuickResume offer?', answer: 'QuickResume offers a resume summary generator, ATS score checker, bullet point rewriter, skill suggestions, job description matcher and cover letter generator — all free, with no sign-up required.' },
      { question: 'How does the AI resume summary generator work?', answer: 'Enter your job title, years of experience and key skills, and the AI writes a professional resume summary optimised for your target role. You can regenerate as many versions as you need and copy the one that fits best.' },
      { question: 'Is the AI resume writer really free?', answer: 'Yes. Every AI tool on QuickResume is free to use with no account or credit card required. There are no hidden limits on the free tools.' },
    ] },
  { path: '/cover-letter', title: 'Free AI Cover Letter Generator — Tailored in Minutes', keywords: 'cover letter generator, AI cover letter, free cover letter generator, cover letter writer, cover letter maker, how to write cover letter, cover letter template', description: 'Generate a tailored, professional cover letter in seconds. Our AI matches your resume to the job description — free to write and download.',
    h1: 'Free AI Cover Letter Generator',
    intro: "Generate a tailored, professional cover letter in seconds. Paste the job description and QuickResume's AI matches it to your resume, writes a compelling letter in your voice, and lets you download it free — no sign-up required.",
    sections: [
      { h2: 'What the cover letter generator does', points: [
        'Reads your resume and the job description to find the strongest match points',
        'Writes a 3-paragraph cover letter: hook, evidence, call to action',
        'Tailors the tone to the role — more formal for finance, more direct for tech',
        'Highlights your most relevant achievements rather than repeating your resume',
        'Free to generate and download, no account needed',
      ] },
    ],
    faq: [
      { question: 'How do I write a cover letter with AI?', answer: 'Paste the job description into QuickResume\'s cover letter generator, add your key experience and role, and the AI writes a tailored 3-paragraph cover letter in seconds. You can edit any part of it before downloading.' },
      { question: 'Should a cover letter match the job description?', answer: 'Yes. A cover letter that mirrors the job description\'s language and addresses the role\'s specific requirements performs significantly better than a generic one. QuickResume\'s AI does this automatically by comparing your resume to the job posting.' },
      { question: 'How long should a cover letter be?', answer: 'Three paragraphs and under one page is the standard. Opening paragraph: why you want this role and company. Middle paragraph: your most relevant achievement or two with evidence. Closing: a clear call to action. QuickResume\'s generator follows this structure automatically.' },
      { question: 'Is this cover letter generator free?', answer: 'Yes — free to generate and download, no sign-up or credit card required.' },
    ] },
  { path: '/resources', title: 'Career Resources and Resume Guides for Every Job Role', description: 'Expert advice, resume outlines, action verbs and ATS formatting tips to help you build the perfect resume and land your dream job faster.',
    h1: 'Career Resources & Resume Guides',
    intro: 'Expert advice, ready-to-use resume outlines, strong action verbs and ATS formatting tips to help you build a resume that gets past the bots and in front of recruiters — so you land interviews faster.',
    sections: [
      { h2: 'What you will find here', points: [
        'ATS formatting guide — what applicant tracking software can and cannot read',
        'Strong action verbs by category — led, built, reduced, increased, delivered',
        'Resume outline by experience level — fresher, mid-level and senior formats',
        'How to write bullet points that quantify your impact',
        'Common resume mistakes that get applications filtered out automatically',
        'How to tailor your resume to a specific job description in 15 minutes',
      ] },
    ] },
  { path: '/pricing', title: 'Pricing — Free & Pro Plans Compared | QuickResume', description: "Every resume tool is free today, including AI writing and the ATS checker. See what's included now and what Pro will add.",
    h1: 'Pricing: free today, simple when Pro launches',
    intro: 'Every template and every AI tool — summary writing, bullet rewrites, the ATS score checker, cover letter generation — is free to use right now, no card and no sign-up required. Pro is in early access and free for now too; we will email early users before anything becomes paid.',
    faq: [
      { question: 'Is QuickResume really free?', answer: 'Yes. Every feature — all 60+ templates, AI writing tools, the ATS score checker, bullet point rewriter and cover letter generator — is free right now with no credit card and no account required.' },
      { question: 'Will QuickResume always be free?', answer: 'The core tools will remain free. A Pro plan is in early access and is free for early users. We will email registered users before any features move behind a paywall — there will be no surprise charges.' },
      { question: 'What will Pro include?', answer: 'Pro is still being defined based on what users need most. Likely features include unlimited AI rewrites, priority processing and additional export formats. Early access users help shape what Pro becomes.' },
    ] },
  // App entry points. These are React-only routes, so without a prerendered
  // file the host returns 404 to anyone landing on them directly — including
  // every "Start" link shared or bookmarked.
  { path: '/start', title: 'Start Your Resume — Free AI Resume Builder | QuickResume', description: 'Start building your resume free: pick a template, import an existing resume, or let AI draft it from your details. No sign-up needed.',
    h1: 'Start Your Resume',
    intro: 'Start building your resume in the way that suits you: pick from 60+ ATS-friendly templates, import a resume you already have, or let AI draft one from a few details. It is free, runs in your browser and needs no sign-up.' },
  { path: '/build', title: 'Resume Builder — Edit, Score & Export Free | QuickResume', description: 'Write, edit and export your resume with live ATS scoring, AI bullet rewrites and a clean PDF download — free, right in your browser.',
    h1: 'Resume Builder',
    intro: 'Write and edit your resume with live preview, AI-assisted bullet points, instant ATS scoring and one-click PDF export. Everything runs in your browser and your data stays on your device.' },
  { path: '/contact', title: 'Contact QuickResume | Get in Touch', description: 'Have a question, found a bug, or want to suggest a feature? Send us a message and we will get back to you.',
    h1: 'Contact QuickResume',
    intro: 'Bug report, feature request or just a question — fill out the contact form and we will reply as soon as we can. You can also email akshaymad0608@gmail.com directly.' },
  { path: '/about', title: 'About QuickResume | Free AI Resume Builder', description: 'QuickResume is a free AI-powered resume builder that helps job seekers create ATS-friendly resumes in minutes. Learn about our mission and how we help you land more interviews.',
    h1: 'About QuickResume',
    intro: 'QuickResume helps job seekers build ATS-friendly resumes in minutes. 60+ free templates, AI writing tools, an ATS score checker, and PDF export — all free, with no sign-up required for basic use.' },
  { path: '/privacy', title: 'Privacy Policy | QuickResume', description: 'What QuickResume collects, why, and where your resume data actually lives — including what Firebase stores, what stays on-device, and your rights.',
    h1: 'Privacy Policy',
    intro: 'Your resume is built in your browser and saved to your device, not to a server database. This page covers exactly what we collect when you sign in or use an AI tool, which third parties are involved — Google Firebase, the Gemini API, Google Analytics — and how to reach us with a question.' },
  { path: '/terms', title: 'Terms of Service | QuickResume', description: "The terms for using QuickResume's resume builder, templates and AI writing tools — what the service is, acceptable use, and the limits of AI-generated output.",
    h1: 'Terms of Service',
    intro: "The terms for using QuickResume's templates, AI writing tools and ATS score checker — what your content is, how AI-generated suggestions should be treated, and acceptable use." },
  { path: '/linkedin-headline-generator', title: 'Free LinkedIn Headline Generator (2026) — 8 Options in Seconds', keywords: 'LinkedIn headline generator, LinkedIn headline examples, best LinkedIn headline, LinkedIn profile headline, LinkedIn headline ideas, how to write LinkedIn headline', description: "Generate 8 LinkedIn headline options from your job title and skills — free, no sign-up. Fits LinkedIn's 220-character limit, ready to paste in.",
    h1: 'LinkedIn Headline Generator',
    intro: "Enter your job title, a few keywords and your experience level, and get 8 LinkedIn headline options — free, no sign-up, no resume required. Each fits inside LinkedIn's 220-character headline limit and is ready to paste straight into your profile.",
    faq: [
      { question: 'What should a LinkedIn headline say?', answer: "Your LinkedIn headline should state your current role or target role, your core skill or value, and ideally a specific outcome or differentiator. It has 220 characters — enough for your title, a specialisation and one achievement or keyword. Avoid vague words like 'passionate' or 'results-driven' that add no information." },
      { question: "How long can a LinkedIn headline be?", answer: "LinkedIn allows up to 220 characters in the headline field. The QuickResume generator produces 8 options that each fit within this limit, so they can be pasted directly into your profile without editing." },
      { question: 'Does the LinkedIn headline affect profile views?', answer: "Yes. Your headline appears next to your name in search results, connection requests and comments — it is the first thing people read about you on LinkedIn. A clear, keyword-rich headline improves your chances of appearing in recruiter searches and getting profile visits." },
      { question: 'What keywords should I use in my LinkedIn headline?', answer: 'Use the job titles and skills that recruiters in your field search for. For example, a software engineer might include \"Python\", \"backend\" and \"distributed systems\". The generator helps you pick strong keywords based on your job title and experience.' },
    ] },
  { path: '/interview-thank-you-email-generator', title: 'Free Interview Thank-You Email Generator (2026)', keywords: 'interview thank you email generator, thank you email after interview, post interview email, interview follow up email, thank you email template interview', description: 'Generate a post-interview thank-you email in seconds — job title, company and what you discussed in, a ready-to-send email out. Free, no sign-up.',
    h1: 'Interview Thank-You Email Generator',
    intro: 'Enter the job title, company, interviewer\'s name and something specific you discussed, and get a ready-to-send thank-you email — free, no sign-up. Best sent within 24 hours of the interview.',
    faq: [
      { question: 'Should I send a thank-you email after an interview?', answer: 'Yes. A thank-you email sent within 24 hours of the interview reinforces your interest in the role, keeps you top of mind during the decision period, and gives you a chance to address anything you left out or could have said better. Most candidates do not send one, so it is a simple differentiator.' },
      { question: 'What should I include in an interview thank-you email?', answer: 'Thank the interviewer by name, mention something specific you discussed (a project, a challenge the team faces, a detail about the role), restate your enthusiasm for the position, and close with a clear next step. Keep it under 150 words — short and specific performs better than long and generic.' },
      { question: 'When should I send a thank-you email after an interview?', answer: 'Within 24 hours, ideally the same day or the morning after. Hiring decisions can move quickly, and a timely thank-you lands while you are still fresh in the interviewer\'s mind.' },
      { question: 'Is a thank-you email the same as a follow-up email?', answer: 'No. A thank-you email goes immediately after the interview to express gratitude and reinforce your interest. A follow-up email goes later — typically 5 to 7 days after the expected decision date — if you have not heard back. The QuickResume generator handles the thank-you email.' },
    ] },
];

// Only 6 of the 14 routes above were ever in this nav. The other 8 —
// /resources, /start, /build, the two free-tool generators, and the legal
// pages — had a prerendered file each but nothing crawlable pointing at it,
// which is exactly what Ahrefs flags as an orphan page (4 of them, in this
// site's case). Adding them here doesn't change what a visitor sees — React
// replaces this block on mount — it only gives a non-JS crawler a path to
// every route that already exists.
const NAV = '<nav aria-label="Sections"><a href="/templates">Resume templates</a> · <a href="/improve">Improve my resume</a> · <a href="/examples">Resume examples</a> · <a href="/ai-tools">AI resume tools</a> · <a href="/cover-letter">Cover letter generator</a> · <a href="/pricing">Pricing</a> · <a href="/resources">Career resources</a> · <a href="/start">Start your resume</a> · <a href="/build">Resume builder</a> · <a href="/linkedin-headline-generator">LinkedIn headline generator</a> · <a href="/interview-thank-you-email-generator">Interview thank-you email</a> · <a href="/about">About</a> · <a href="/contact">Contact</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a></nav>';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const template = readFileSync(join(DIST, 'index.html'), 'utf-8');

for (const route of ROUTES) {
  const url = `${SITE}${route.path === '/' ? '/' : route.path}`;
  let html = template;

  // Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`);
  // Replace meta description
  html = html.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(route.description)}" />`);
  if (route.keywords) html = html.replace(/<meta name="keywords"[^>]*>/, `<meta name="keywords" content="${esc(route.keywords)}" />`);
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
  // FAQPage schema in index.html is correct on the homepage but wrong on every
  // other page — a page that doesn't show FAQs shouldn't claim FAQPage markup.
  // Strip it from non-homepage prerendered files so Google's validator passes.
  if (route.path !== '/') {
    html = html.replace(
      /(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/,
      (_, open, body, close) => {
        try {
          const data = JSON.parse(body);
          if (Array.isArray(data['@graph'])) {
            data['@graph'] = data['@graph'].filter((n) => n['@type'] !== 'FAQPage');
          }
          return `${open}${JSON.stringify(data)}${close}`;
        } catch {
          return _;
        }
      },
    );
  }

  // Inject FAQPage schema for routes that define a faq[] array.
  // The homepage already has FAQPage in its @graph; other pages get a
  // standalone script tag injected here so they can claim rich results too.
  if (route.faq?.length) {
    const faqSchema = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: route.faq.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    });
    html = html.replace('</head>', `<script type="application/ld+json">${faqSchema}</script></head>`);
  }

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
