const fs = require('fs');
let content = fs.readFileSync('src/components/TemplateCard.tsx', 'utf8');

content = content.replace(
  /<div className="w-\[794px\] h-\[1123px\] origin-top-left absolute top-0 left-0" style=\{\{ transform: \\`scale\\\(\\\$\{scale\}\\\)\\` \}\}>/,
  '<div className="origin-top-left absolute top-0 left-0" style={{ transform: `scale(${scale})`, width: "794px", height: "1123px" }}>'
);

fs.writeFileSync('src/components/TemplateCard.tsx', content);
