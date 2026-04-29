import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Fix API Keys
content = content.replaceAll(
  'process.env.GEMINI_API_KEY',
  '(import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY)'
);
content = content.replaceAll(
  `import.meta.env.VITE_GEMINI_API_KEY ||
                            (import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY)`,
   `(import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY)` 
);

// 2. Fix generateAICoverLetter model
content = content.replaceAll('model: "gemini-2.0-flash"', 'model: "gemini-2.5-flash"');

// 3. Add Cover Letter Word Count and Share button
const shareContent = `
  const handleShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('ref', 'quickresume');
    navigator.clipboard.writeText(url.toString());
    showToast("✅ Link copied! Share your resume layout.", "success");
  };

  const getWordCount = (text: string) => text.trim() ? text.trim().split(/\\s+/).length : 0;
  `;
  
// Find where to insert handleShare
content = content.replace('const handleExportDocx = async () => {', shareContent + '\n  const handleExportDocx = async () => {');

// In BuilderView, add Share button
let setupBuilder = fs.readFileSync('src/components/BuilderView.tsx', 'utf8');
setupBuilder = setupBuilder.replace(
  '<button\n            onClick={handlePrint}',
  `<button
            onClick={() => {
              const url = new URL(window.location.href);
              url.searchParams.set('ref', 'quickresume');
              navigator.clipboard.writeText(url.toString());
              alert("✅ Link copied!");
            }}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-[var(--color-primary-foreground)] bg-gradient-to-r from-blue-500 to-indigo-500 hover:scale-105 transition-transform"
          >
            <Share2 size={16} /> Share
          </button>\n          <button\n            onClick={handlePrint}`
);
setupBuilder = setupBuilder.replace('import {', 'import { Share2,');
fs.writeFileSync('src/components/BuilderView.tsx', setupBuilder);

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx patched part 1');
