import fs from 'fs';

let content = fs.readFileSync('src/components/BuilderView.tsx', 'utf8');

content = content.replace(
  'import {',
  'import { Moon, Sun } from "lucide-react";\nimport {'
);

fs.writeFileSync('src/components/BuilderView.tsx', content);
console.log("Patched BuilderView logic");
