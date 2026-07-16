const fs = require('fs');
let content = fs.readFileSync('src/components/TemplateCard.tsx', 'utf8');

content = content.replace(
  /<div className="w-\[794px\] h-\[1123px\] bg-white overflow-hidden text-left relative pointer-events-none">/,
  '<div style={{ width: "794px", minWidth: "794px", height: "1123px", minHeight: "1123px" }} className="bg-white overflow-hidden text-left relative pointer-events-none">'
);

fs.writeFileSync('src/components/TemplateCard.tsx', content);
