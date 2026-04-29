import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  '{currentView === "app" && (\n      {/* Mobile Bottom Navigation */}',
  '{currentView === "app" && (\n      <>{/* Mobile Bottom Navigation */}'
);

content = content.replace(
  '</button>\n      </div>\n      )}\n\n      {/* Site Footer */}',
  '</button>\n      </div>\n      </>)}\n\n      {/* Site Footer */}'
);

fs.writeFileSync('src/App.tsx', content);
