const fs = require('fs');
const content = fs.readFileSync('src/pages/Build.tsx', 'utf8');

const navStart = content.indexOf('{/* Mobile Bottom Navigation menu */}');
const navEnd = content.indexOf('</div>', content.indexOf('</div>', content.indexOf('</div>', navStart) + 1) + 1);

// We need to move the Mobile Bottom Navigation OUTSIDE the wrapper div.
// Currently it is before the LAST `</div></div></div>` block.
// Wait, actually I can just run a string replace.

const fixed = content.replace(
  /\s*\{\/\* Mobile Bottom Navigation menu \*\/\}[\s\S]*?(?=\s*<\/div>\s*<\/div>\s*<\/div>\s*\);\s*};)/,
  ''
);

const toInsert = content.match(/\{\/\* Mobile Bottom Navigation menu \*\/\}[\s\S]*?(?=\s*<\/div>\s*<\/div>\s*<\/div>\s*\);\s*};)/)[0];

const finalCode = fixed.replace(
  /(\s*<\/div>\s*<\/div>\s*\);\s*};)/,
  `\n      </div>\n      ${toInsert}\n    </div>\n  );\n};`
);

fs.writeFileSync('src/pages/Build.tsx', finalCode);
