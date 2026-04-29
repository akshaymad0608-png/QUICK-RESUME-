import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(/href="#"/g, 'href="#" onClick={(e) => e.preventDefault()}');
fs.writeFileSync('src/App.tsx', content);
