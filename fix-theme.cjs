const fs = require('fs');
const path = require('path');

const replacements = [
  { from: /bg-\[#0A0A0B\]/g, to: 'bg-slate-50' },
  { from: /bg-\[#0F0F12\]/g, to: 'bg-white' },
  { from: /bg-\[#161619\]/g, to: 'bg-white' },
  { from: /bg-\[#222226\]/g, to: 'bg-slate-50' },
  { from: /text-slate-300/g, to: 'text-slate-600' },
  { from: /text-slate-400/g, to: 'text-slate-500' },
  // { from: /text-slate-500/g, to: 'text-slate-400' },
  { from: /text-white/g, to: 'text-slate-900' },
  { from: /border-white\/5/g, to: 'border-slate-200' },
  { from: /border-white\/10/g, to: 'border-slate-200' },
  { from: /border-white\/20/g, to: 'border-slate-300' },
  { from: /border-white\/30/g, to: 'border-slate-400' },
  { from: /hover:bg-white\/5/g, to: 'hover:bg-slate-50' },
  { from: /hover:bg-white\/10/g, to: 'hover:bg-slate-100' },
  { from: /hover:border-white\/20/g, to: 'hover:border-slate-300' },
  { from: /bg-black\/20/g, to: 'bg-slate-50' },
  { from: /bg-indigo-500\/10/g, to: 'bg-indigo-50' },
  { from: /bg-indigo-500\/5/g, to: 'bg-indigo-50' },
  { from: /bg-indigo-600\/90/g, to: 'bg-indigo-600/90' },
  { from: /border-indigo-500\/20/g, to: 'border-indigo-100' },
  { from: /border-indigo-500\/30/g, to: 'border-indigo-200' },
  { from: /border-indigo-500\/50/g, to: 'border-indigo-300' },
  { from: /text-indigo-400/g, to: 'text-indigo-600' },
  { from: /text-indigo-300/g, to: 'text-indigo-700' },
  { from: /shadow-indigo-500\/20/g, to: 'shadow-indigo-500/10' },
  { from: /bg-\[radial-gradient\(ellipse_at_top,_var\(--tw-gradient-stops\)\)\] from-indigo-900\/20 via-transparent to-transparent/g, to: 'bg-gradient-to-b from-indigo-50/50 to-transparent' },
  { from: /bg-\[radial-gradient\(ellipse_at_top,_var\(--tw-gradient-stops\)\)\] from-indigo-900\/10 via-transparent to-transparent/g, to: 'bg-gradient-to-b from-indigo-50/50 to-transparent' },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      for (const { from, to } of replacements) {
        content = content.replace(from, to);
      }
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory('./src');
