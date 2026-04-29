import fs from 'fs';

let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

content = content.replace(/href="#"/g, 'href="#" onClick={(e) => e.preventDefault()}');

fs.writeFileSync('src/components/Home.tsx', content);
