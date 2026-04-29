import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  '{/* Mobile Bottom Navigation */}',
  '{currentView === "app" && (\n      {/* Mobile Bottom Navigation */}'
);

const bottomRegex = /<Mobile Bottom Navigation[\s\S]*?<\/div>/;
// Let's just find the closing tag. The bottom nav is:
/*
      {/* Mobile Bottom Navigation *}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-bg-2)] border-t border-[var(--color-border-hover)] flex items-center justify-around p-2 z-50 pb-safe">
		...
      </div>
    </div>
  );
*/
content = content.replace(
  /<\/div>\n    <\/div>\n  \);\n\};/g,
  '</div>\n      )}\n    </div>\n  );\n};\n'
);

fs.writeFileSync('src/App.tsx', content);
