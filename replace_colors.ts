import fs from 'fs';

let indexCss = fs.readFileSync('src/index.css', 'utf-8');

// Replace Violet with Blue
indexCss = indexCss.replace(/#7c3aed/g, '#2563eb'); // violet-600 -> blue-600
indexCss = indexCss.replace(/#a78bfa/g, '#60a5fa'); // violet-400 -> blue-400
indexCss = indexCss.replace(/124, 58, 237/g, '37, 99, 235'); // violet-600 rgb
indexCss = indexCss.replace(/#6d28d9/g, '#1d4ed8'); // violet-700 -> blue-700

// Replace accent (cyan) with Teal
indexCss = indexCss.replace(/#06b6d4/g, '#14b8a6'); // cyan-500 -> teal-500
indexCss = indexCss.replace(/6, 182, 212/g, '20, 184, 166'); // cyan-500 rgb
indexCss = indexCss.replace(/#0891b2/g, '#0f766e'); // cyan-600 -> teal-600
indexCss = indexCss.replace(/8, 145, 178/g, '15, 118, 110'); // cyan-600 rgb

fs.writeFileSync('src/index.css', indexCss);


let homeTsx = fs.readFileSync('src/components/Home.tsx', 'utf-8');

// Colors
homeTsx = homeTsx.replace(/violet-/g, 'blue-');
homeTsx = homeTsx.replace(/fuchsia-/g, 'emerald-');
homeTsx = homeTsx.replace(/cyan-/g, 'teal-');
homeTsx = homeTsx.replace(/indigo-/g, 'cyan-');
homeTsx = homeTsx.replace(/124,58,237/g, '37,99,235'); // rgba shadow for CTA
homeTsx = homeTsx.replace(/color="#7c3aed"/g, 'color="#2563eb"');

fs.writeFileSync('src/components/Home.tsx', homeTsx);

console.log("Colors replaced!");
