const fs = require('fs');

function fix(file) {
  let code = fs.readFileSync(file, 'utf8');
  if (file.includes('TemplateCard.tsx')) {
    code = code.replace(/}, \[\]\);/g, "}, [template.category]);");
  }
  fs.writeFileSync(file, code);
}

fix('src/components/TemplateCard.tsx');

