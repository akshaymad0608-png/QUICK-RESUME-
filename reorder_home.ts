import fs from 'fs';

let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

const heroStart = content.indexOf('{/* 1. Hero Section */}');
const statsStart = content.indexOf('{/* 2. Stats Section (after hero) */}');
const stepsStart = content.indexOf('{/* 3. How It Works - Horizontal Steps */}');
const aiStart = content.indexOf('{/* 4. AI Features Tabs */}');
const toolsStart = content.indexOf('{/* 4.5 Resume Tools Grid */}');
const templatesStart = content.indexOf('{/* 5. Templates Showcase */}');
const footerStart = content.indexOf('{/* 6. Footer & Final CTA */}');
const end = content.lastIndexOf('</main>');

if ([heroStart, statsStart, stepsStart, aiStart, toolsStart, templatesStart, footerStart, end].includes(-1)) {
    console.log("Could not find all sections");
    console.log({heroStart, statsStart, stepsStart, aiStart, toolsStart, templatesStart, footerStart, end});
    process.exit(1);
}

const preamble = content.slice(0, heroStart);
const hero = content.slice(heroStart, statsStart);
const stats = content.slice(statsStart, stepsStart);
const steps = content.slice(stepsStart, aiStart);
const ai = content.slice(aiStart, toolsStart);
const tools = content.slice(toolsStart, templatesStart);
const templates = content.slice(templatesStart, footerStart);
const footer = content.slice(footerStart, end);
const postamble = content.slice(end);

// Reordering:
// 1. Hero 
// 2. Tools
// 3. AI
// 4. Steps
// 5. Templates
// 6. Stats
// 7. Footer

const newContent = preamble +
  hero +
  tools.replace('py-24', 'py-16').replace('mb-12', 'mb-0').replace('bg-[var(--color-bg-2)]', 'bg-[var(--color-bg)]').replace('border-b', '') +
  ai.replace('py-32', 'py-24').replace('border-y', 'border-t').replace('bg-[var(--color-bg)]', 'bg-[var(--color-bg-2)]') +
  steps.replace('py-32', 'py-24').replace('bg-[var(--color-bg-2)]', 'bg-[var(--color-bg)]') +
  templates.replace('py-32', 'py-24').replace('bg-[var(--color-bg)]', 'bg-[var(--color-bg-2)]') +
  stats.replace('py-16', 'py-24').replace('bg-[var(--color-bg)]', 'bg-[#111] text-white').replace(/var\(--text-muted\)/g, 'white') +
  footer +
  postamble;

fs.writeFileSync('src/components/Home.tsx', newContent);
console.log("Reordered sections successfully!");
