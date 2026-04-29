import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 4. Update localStorage autosave
content = content.replace(
  'console.warn("Failed to save to localStorage", e);',
  'console.warn("Failed to save to localStorage", e);\n        showToast("Auto-save failed. Storage might be full.", "error");'
);

// 8. Split aiInputText and jobDescriptionText
const hookInsert = `const [aiInputText, setAiInputText] = useState("");\n  const [jobDescriptionText, setJobDescriptionText] = useState("");`;
content = content.replace('const [aiInputText, setAiInputText] = useState("");', hookInsert);

// Fix ATS Modal aiInputText usages
content = content.replace(/value=\{aiInputText\}/g, (match, offset) => {
  if (offset > 1200 && offset < 1800) return 'value={jobDescriptionText}'; // ATS modal area
  return match;
});
content = content.replace(/setAiInputText/g, (match, offset) => {
  if (offset > 1200 && offset < 1800) return 'setJobDescriptionText';
  return match;
});
content = content.replace(/!aiInputText\.trim\(\)/g, (match, offset) => {
  if (content.substring(offset - 100, offset).includes('Analyze Match')) return '!jobDescriptionText.trim()';
  return match;
});
content = content.replace(/aiInputText\.trim\(\)/g, (match, offset) => {
  if (content.substring(offset - 100, offset).includes('Job Description:')) return 'jobDescriptionText.trim()';
  return match;
});

// 12. Cover letter word count
const wcInsert = `                      />
                      {(() => {
                        const wc = getWordCount(data.coverLetter.body);
                        let colorClass = "text-emerald-500";
                        if (wc < 150) colorClass = "text-rose-500";
                        else if (wc < 250) colorClass = "text-amber-500";
                        
                        return (
                          <div className="mt-2 text-xs text-right">
                            <span className={colorClass + " font-medium"}>{wc} words</span>
                            <span className="text-[var(--text-muted)] ml-2">· Recommended: 250–400</span>
                          </div>
                        );
                      })()}
                    </div>`;
content = content.replace(/className="w-full px-4 py-3 text-sm border border-\[var\(--color-border-hover\)\] bg-\[var\(--color-bg\)\]\/50 text-\[var\(--text-main\)\] rounded-xl focus:ring-2 focus:ring-emerald-600\/30 focus:border-emerald-600 outline-none transition-all shadow-inner placeholder:text-\[var\(--text-main\)\] resize-y leading-relaxed scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"\s*\/\>\s*<\/div>/, wcInsert);

// 14. Keyboard shortcut
const shortcutInsert = `
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        handlePrint();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
`;
content = content.replace('const [expandedSection, setExpandedSection] = useState<string>("personal");', shortcutInsert + '\n  const [expandedSection, setExpandedSection] = useState<string>("personal");');

// 16. Aria labels
content = content.replace(/<button[^>]*>\s*<Trash2/g, (match) => {
  if (!match.includes('aria-label')) {
     return match.replace('<button', '<button aria-label="Delete"');
  }
  return match;
});
content = content.replace(/<button[^>]*>\s*<RefreshCw/g, (match) => {
  if (!match.includes('aria-label')) {
     return match.replace('<button', '<button aria-label="Refresh"');
  }
  return match;
});
content = content.replace(/<button[^>]*>\s*<XCircle/g, (match) => {
  if (!match.includes('aria-label')) {
     return match.replace('<button', '<button aria-label="Remove"');
  }
  return match;
});

fs.writeFileSync('src/App.tsx', content);
