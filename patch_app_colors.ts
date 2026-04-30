import fs from 'fs';

function replaceApp(file: string) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8');
    content = content.replace(/violet-/g, 'blue-');
    content = content.replace(/fuchsia-/g, 'emerald-');
    content = content.replace(/themeColor === "#7c3aed"/g, 'themeColor === "#2563eb"');
    content = content.replace(/setThemeColor\("#7c3aed"\)/g, 'setThemeColor("#2563eb")');
    content = content.replace(/#7c3aed/g, '#2563eb');
    fs.writeFileSync(file, content);
  }
}

replaceApp('src/App.tsx');
replaceApp('src/components/Templates.tsx');
