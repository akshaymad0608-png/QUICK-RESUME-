const fs = require('fs');
let content = fs.readFileSync('src/components/Templates.tsx', 'utf8');
content = content.replace(/\.split\((?:',')|(?:\",\")\)/g, '.split(/,|\\n|\\//)');
fs.writeFileSync('src/components/Templates.tsx', content);
console.log('done');
