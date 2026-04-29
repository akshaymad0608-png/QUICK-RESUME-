import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// The original garbage starts after <div className="p-6 space-y-8 flex-1">
// We want to delete from that div up to "Cover Letter Editor", replacing with the div and Cover letter content exactly as it should be.

const startRegex = /<div className="p-6 space-y-8 flex-1">\s*<Sparkles[\s\S]*?\{\/\* Cover Letter Editor \*\/\}/;

content = content.replace(startRegex, '<div className="p-6 space-y-8 flex-1">\n                  {/* Cover Letter Editor */}');

fs.writeFileSync('src/App.tsx', content);
