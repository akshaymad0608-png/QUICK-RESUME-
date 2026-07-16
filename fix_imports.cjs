const fs = require('fs');

function fix(file) {
  let code = fs.readFileSync(file, 'utf8');
  
  // Remove duplicates
  let matches = 0;
  code = code.replace(/import html2canvas from 'html2canvas';\n/g, () => {
    matches++;
    return matches === 1 ? "import html2canvas from 'html2canvas';\n" : "";
  });
  
  matches = 0;
  code = code.replace(/import \{ jsPDF \} from 'jspdf';\n/g, () => {
    matches++;
    return matches === 1 ? "import { jsPDF } from 'jspdf';\n" : "";
  });

  fs.writeFileSync(file, code);
}

fix('src/pages/Build.tsx');

