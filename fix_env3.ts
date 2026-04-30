import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(/\(import\.meta\.env\.VITE_GEMINI_API_KEY \|\| process\.env\.GEMINI_API_KEY\)/g, 'process.env.GEMINI_API_KEY');
fs.writeFileSync('src/App.tsx', content);
