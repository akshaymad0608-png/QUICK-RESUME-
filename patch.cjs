const fs = require('fs');
const content = fs.readFileSync('src/pages/Build.tsx', 'utf8');

const regex = /(<\/div>\s*<\/div>\s*)({\/\* Mobile Bottom Navigation menu \*\/\}[\s\S]*?(?:<\/div>\s*))(<\/div>\s*<\/div>\s*\);\s*};)/;

const newContent = content.replace(regex, (match, p1, p2, p3) => {
  // p1 is "</div></div>" closing main content
  // p2 is the mobile nav up to its closing "</div>"
  // p3 is the final two "</div>" closing the wrapper and root
  
  // We want to move ONE "</div>" from p3 to be BEFORE p2.
  return p1 + "</div>\n" + p2 + "</div>\n  );\n};";
});

fs.writeFileSync('src/pages/Build.tsx', newContent);
