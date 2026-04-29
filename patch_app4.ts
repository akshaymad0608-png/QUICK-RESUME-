import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

const resumeBlockRegex = /\{\(activeTab as string\) === "resume" \? \([\s\S]*?\) : \(/;
content = content.replace(resumeBlockRegex, '');

const closingRegex = /<\/div>\n\s*<\/section>\n\s*<\/>\n\s*\)}/;
content = content.replace(closingRegex, '</div>\n                  </section>\n                </>');

fs.writeFileSync('src/App.tsx', content);
