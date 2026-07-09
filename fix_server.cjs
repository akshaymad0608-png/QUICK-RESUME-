const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const regex = /\s*\/\/ LinkedIn OAuth[\s\S]*?\}\);\s*\/\/ Vite middleware for development/;
code = code.replace(regex, '\n  // Vite middleware for development');

fs.writeFileSync('server.ts', code);
