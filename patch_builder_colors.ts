import fs from 'fs';

let content = fs.readFileSync('src/components/BuilderView.tsx', 'utf-8');

content = content.replace(/violet-500/g, 'blue-500');
content = content.replace(/violet-400/g, 'blue-400');
content = content.replace(/violet-300/g, 'blue-300');
content = content.replace(/139,92,246/g, '59,130,246'); // rgba for shadow
content = content.replace(/124,58,237/g, '37,99,235'); // rgba

fs.writeFileSync('src/components/BuilderView.tsx', content);

console.log('BuilderView patched');
