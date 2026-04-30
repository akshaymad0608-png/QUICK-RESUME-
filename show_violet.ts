import fs from 'fs';

let content = fs.readFileSync('src/components/BuilderView.tsx', 'utf-8');
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('violet-')) {
    console.log(i + 1, lines[i].trim());
  }
}
