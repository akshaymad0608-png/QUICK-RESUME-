const fs = require('fs');
const file = 'src/pages/CoverLetterGenerator.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace("if (!letter) return;", "if (!coverLetter) return;");
code = code.replace("setDownloading(true);", "setIsDownloading(true);");
code = code.replace("setDownloading(false);", "setIsDownloading(false);");
code = code.replace("el.innerText = letter;", "el.innerText = coverLetter;");

fs.writeFileSync(file, code);
