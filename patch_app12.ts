import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

const shareContent = `
  const handleShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('ref', 'quickresume');
    navigator.clipboard.writeText(url.toString());
    showToast("✅ Link copied! Share your resume layout.", "success");
  };

  const getWordCount = (text: string) => text.trim() ? text.trim().split(/\\s+/).length : 0;
  `;

content = content.replace('const handleExportDocx = () => {', shareContent + '\n  const handleExportDocx = () => {');
fs.writeFileSync('src/App.tsx', content);

let builder = fs.readFileSync('src/components/BuilderView.tsx', 'utf8');
// Fix Share2 duplicate:
// It should be from lucide-react. Let's inspect where it got added.
