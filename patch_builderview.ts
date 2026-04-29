import fs from 'fs';

let setupBuilder = fs.readFileSync('src/components/BuilderView.tsx', 'utf8');

if(!setupBuilder.includes('handleShare?: () => void;')) {
  setupBuilder = setupBuilder.replace(
    'handlePrint: () => void;',
    'handlePrint: () => void;\n  handleShare?: () => void;'
  );
  setupBuilder = setupBuilder.replace(
    'handlePrint,\n  setCurrentView',
    'handlePrint,\n  handleShare,\n  setCurrentView'
  );
  
  setupBuilder = setupBuilder.replace(
    '<button\n            onClick={handlePrint}',
    `<button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-[var(--color-primary-foreground)] bg-gradient-to-r from-blue-500 to-indigo-500 hover:scale-105 transition-transform"
            >
              <Share2 size={16} /> Share
            </button>\n          <button\n            onClick={handlePrint}`
  );
  setupBuilder = setupBuilder.replace(/import\s*\{\s*Share2,\s*/, 'import { ');
  setupBuilder = setupBuilder.replace('import {', 'import { Share2,');
}
fs.writeFileSync('src/components/BuilderView.tsx', setupBuilder);

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Also update App.tsx to pass handleShare to BuilderView calls
content = content.replaceAll(
  '<BuilderView',
  '<BuilderView\n          handleShare={handleShare}'
);

fs.writeFileSync('src/App.tsx', content);
