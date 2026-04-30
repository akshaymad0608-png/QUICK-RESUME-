import fs from 'fs';

let content = fs.readFileSync('src/components/Home.tsx', 'utf8');

// Tools Grid
content = content.replace(
  '<section className="py-16 relative w-full mb-0 bg-[var(--color-bg)]  border-[var(--color-border)]">',
  '<section className="py-24 relative w-full mb-0 border-t border-[var(--color-border)] bg-[var(--color-bg-2)]">'
);

// AI Features
content = content.replace(
  '<section className="py-24 border-t border-[var(--color-border)] relative bg-[var(--color-bg-2)]">',
  '<section className="py-24 border-t border-[var(--color-border)] relative bg-[var(--color-bg)]">'
);

// How It Works
content = content.replace(
  '<section className="py-24 relative bg-[var(--color-bg)] overflow-hidden">',
  '<section className="py-24 relative border-t border-[var(--color-border)] bg-[var(--color-bg-2)] overflow-hidden">'
);

// Templates
content = content.replace(
  '<section id="templates" className="py-24 relative bg-[var(--color-bg-2)]">',
  '<section id="templates" className="py-24 relative border-t border-[var(--color-border)] bg-[var(--color-bg)]">'
);

fs.writeFileSync('src/components/Home.tsx', content);
console.log("Success");
