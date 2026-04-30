import fs from 'fs';

let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

content = content.replace(
  '      {/* 4. AI Features Tabs */}\n      <section className="py-24 bg-[var(--color-bg-2)] border-t border-[var(--color-border)] relative">',
  '      {/* 4. AI Features Tabs */}\n      <section className="py-24 border-t border-[var(--color-border)] bg-[var(--color-bg)] relative">'
);

fs.writeFileSync('src/components/Home.tsx', content);
