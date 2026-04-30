import fs from 'fs';

let builderContent = fs.readFileSync('src/components/BuilderView.tsx', 'utf8');

// Add the buttons to the floating action bar
const docxStr = '<FileText size={16} /> Export DOCX\n          </button>';
const replacement = docxStr + `\n          {setIsLightMode && (\n            <button\n              onClick={() => setIsLightMode(!isLightMode)}\n              className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 ml-1 rounded-full text-[var(--text-main)] hover:bg-[var(--color-bg-3)] transition-colors border border-[var(--color-border-hover)] shadow-md"\n              title="Toggle Theme"\n            >\n              {isLightMode ? <Moon size={16} /> : <Sun size={16} />}\n            </button>\n          )}`;

builderContent = builderContent.replace(docxStr, replacement);
fs.writeFileSync('src/components/BuilderView.tsx', builderContent);
console.log("Patched BuilderView");
