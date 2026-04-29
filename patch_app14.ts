import fs from 'fs';

let content = fs.readFileSync('src/components/BuilderView.tsx', 'utf8');
content = content.replace('Share2,\n  Share2,', 'Share2,');
content = content.replace('Share2,\n  FileText,', 'FileText,');

fs.writeFileSync('src/components/BuilderView.tsx', content);
