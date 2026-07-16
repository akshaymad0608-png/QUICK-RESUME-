const fs = require('fs');

function clean(file) {
  let code = fs.readFileSync(file, 'utf8');
  
  const hiddenRegex = /\{\/\* Hidden div for printing \*\/\}\s*<div className="hidden">\s*<div ref=\{letterRef\}.*?>\s*\{letter\}\s*<\/div>\s*<\/div>/g;
  
  code = code.replace(hiddenRegex, '');
  
  fs.writeFileSync(file, code);
}

clean('src/components/InlineCoverLetter.tsx');
clean('src/pages/CoverLetterGenerator.tsx');

