import fs from 'fs';

let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

const sections = {
  heroStart: content.indexOf('{/* 1. Hero Section */}'),
  toolsStart: content.indexOf('{/* 4.5 Resume Tools Grid */}'),
  aiStart: content.indexOf('{/* 4. AI Features Tabs */}'),
  stepsStart: content.indexOf('{/* 3. How It Works - Horizontal Steps */}'),
  templatesStart: content.indexOf('{/* 5. Templates Showcase */}'),
  statsStart: content.indexOf('{/* 2. Stats Section (after hero) */}'),
  footerStart: content.indexOf('{/* 6. Footer & Final CTA */}'),
  end: content.lastIndexOf('</main>')
};

console.log(sections);

const preamble = content.slice(0, sections.heroStart);
const hero = content.slice(sections.heroStart, sections.toolsStart);
const tools = content.slice(sections.toolsStart, sections.aiStart);
const ai = content.slice(sections.aiStart, sections.stepsStart);
const steps = content.slice(sections.stepsStart, sections.templatesStart);
const templates = content.slice(sections.templatesStart, sections.statsStart);
const stats = content.slice(sections.statsStart, sections.footerStart);
const footer = content.slice(sections.footerStart, sections.end);
const postamble = content.slice(sections.end);

// Layout Flow:
// 0. Hero: bg-[var(--color-bg)]
// 1. Stats: dark
// 2. Steps: bg-[var(--color-bg-2)]
// 3. AI: bg-[var(--color-bg)]
// 4. Tools: bg-[var(--color-bg-2)]
// 5. Templates: bg-[var(--color-bg)]
// 6. Footer: bg-[var(--color-bg-2)]

const cleanBg = (html, newBgClass, hasBorder = true) => {
    // Replace main section tag's bg class and border
    let res = html.replace(/<section[^>]*className="([^"]*)"[^>]*>/, (match, classes) => {
        let newClasses = classes
            .replace(/bg-\[var\(--color-bg-2\)\]/g, '')
            .replace(/bg-\[var\(--color-bg\)\]/g, '')
            .replace(/bg-\[#111\]/g, '')
            .replace(/bg-transparent/g, '')
            .replace(/border-t/g, '')
            .replace(/border-y/g, '')
            .replace(/border-\[var\(--color-border\)\]/g, '')
            .replace(/\s+/g, ' ').trim();
        
        newClasses += ' ' + newBgClass;
        if (hasBorder) {
            newClasses += ' border-t border-[var(--color-border)]';
        }

        return match.replace(classes, newClasses);
    });
    return res;
};

const newContent = preamble +
  cleanBg(hero, 'bg-transparent', false) +
  cleanBg(stats, 'bg-[#111] text-white', false) +
  cleanBg(steps, 'bg-[var(--color-bg-2)]', false) +
  cleanBg(ai, 'bg-[var(--color-bg)]', true) +
  cleanBg(tools, 'bg-[var(--color-bg-2)]', true) +
  cleanBg(templates, 'bg-[var(--color-bg)]', true) +
  cleanBg(footer, 'bg-[var(--color-bg-2)]', true) +
  postamble;

fs.writeFileSync('src/components/Home.tsx', newContent);
console.log("Success");
