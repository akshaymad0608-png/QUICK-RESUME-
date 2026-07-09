const fs = require('fs');
let code = fs.readFileSync('src/pages/Start.tsx', 'utf8');

code = code.replace('grid md:grid-cols-3 gap-8 w-full max-w-6xl', 'grid md:grid-cols-2 gap-8 w-full max-w-4xl');

const linkedInRegex = /\s*\{\/\* Import from LinkedIn Card \*\/\}[\s\S]*?Upload LinkedIn PDF<\/div>\s*<\/div>/;
code = code.replace(linkedInRegex, '');

code = code.replace(', Linkedin } from', '} from');

fs.writeFileSync('src/pages/Start.tsx', code);
