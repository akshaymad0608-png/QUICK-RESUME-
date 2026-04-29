import fs from 'fs';

let content = fs.readFileSync('src/components/TemplateFactory.tsx', 'utf8');
content = content.replace(/alt=""/g, 'alt="Resume Profile"');
content = content.replace(/alt="Profile"/g, 'alt="Resume Profile"');
fs.writeFileSync('src/components/TemplateFactory.tsx', content);
