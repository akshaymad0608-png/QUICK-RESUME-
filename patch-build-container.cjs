const fs = require('fs');
let content = fs.readFileSync('src/pages/Build.tsx', 'utf8');

content = content.replace(
  /<div id="resume-preview-container" className="w-full h-full">/,
  '<div id="resume-preview-container" className="w-full h-full" style={{ minWidth: "794px", minHeight: "1123px" }}>'
);

fs.writeFileSync('src/pages/Build.tsx', content);
