import fs from 'fs';

let content = fs.readFileSync('src/components/BuilderView.tsx', 'utf8');

const danglingRegex = /<h3 className="text-2xl font-bold text-\[var\(--text-main\)\] mb-2">Ready to shine!<\/h3>\s*<p className="text-\[var\(--text-muted\)\]">Your resume will appear here as you fill in the form on the left\.<\/p>\s*<\/div>/;

content = content.replace(danglingRegex, '');

fs.writeFileSync('src/components/BuilderView.tsx', content);
