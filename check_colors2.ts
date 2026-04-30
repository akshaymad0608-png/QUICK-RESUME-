import fs from 'fs';
import path from 'path';

function findColors(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      findColors(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('violet-') || content.includes('fuchsia-')) {
        console.log(fullPath);
      }
    }
  }
}

findColors('src');
