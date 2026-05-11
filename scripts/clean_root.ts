import fs from 'fs';
import path from 'path';

const files = fs.readdirSync(process.cwd());

for (const file of files) {
  if (
    file.startsWith('patch_') ||
    file.startsWith('test_') ||
    file.startsWith('fix_') ||
    file.startsWith('check_') ||
    file.startsWith('show_') ||
    file.startsWith('reorder_') ||
    file.startsWith('replace_') ||
    file.startsWith('style_') ||
    file.startsWith('tmp') ||
    file === 'cleanup.js' ||
    file === 'patch2.ts' ||
    file === 'script.ts' ||
    file === 'test.css' ||
    file === 'test.html'
  ) {
    try {
      fs.unlinkSync(file);
      console.log(`Deleted ${file}`);
    } catch (e) {
      console.error(e);
    }
  }
}
