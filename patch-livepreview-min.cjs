const fs = require('fs');
let content = fs.readFileSync('src/components/Preview/LivePreview.tsx', 'utf8');

content = content.replace(
  /<div className="w-full h-full overflow-hidden relative">/,
  '<div className="w-full h-full overflow-hidden relative" style={{ minWidth: "794px", minHeight: "1123px" }}>'
);
content = content.replace(
  /<div className="w-full h-full bg-white transition-all duration-300">/,
  '<div className="w-full h-full bg-white transition-all duration-300" style={{ minWidth: "794px", minHeight: "1123px" }}>'
);

fs.writeFileSync('src/components/Preview/LivePreview.tsx', content);
