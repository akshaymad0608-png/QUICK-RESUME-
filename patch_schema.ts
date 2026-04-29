import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  /responsibilities:\s*\{\s*type:\s*Type\.ARRAY,\s*items:\s*\{\s*type:\s*Type\.STRING\s*\},\s*description:\s*"[^"]*"\s*\}/,
  'responsibilities: { type: Type.STRING, description: "A single string containing bullet points separated by newlines." }'
);

fs.writeFileSync('src/App.tsx', content);
