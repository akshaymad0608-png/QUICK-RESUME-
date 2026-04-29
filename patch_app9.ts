import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Remove the dangling </>
content = content.replace('</>\n            </div>\n          </div>', '            </div>\n          </div>');

// Add the missing closing for currentView === "app" && (...)
content = content.replace(
  '</button>\n      </div>\n\n      {/* Site Footer */}',
  '</button>\n      </div>\n      )}\n\n      {/* Site Footer */}'
);

fs.writeFileSync('src/App.tsx', content);
