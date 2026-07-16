const fs = require('fs');
let code = fs.readFileSync('src/pages/Preview.tsx', 'utf8');

code = code.replace("import html2canvas from 'html2canvas';", "import { useReactToPrint } from 'react-to-print';");
code = code.replace("import { jsPDF } from 'jspdf';", "");

const regex = /const handleDownload = async \(\) => \{[\s\S]*?\n  \};\n/m;
const replacement = `const handleDownloadFn = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: data.personalInfo?.fullName ? \`\${data.personalInfo.fullName.replace(/\\s+/g, '-').toLowerCase()}-resume\` : 'resume',
    onAfterPrint: () => setIsDownloading(false),
    onBeforePrint: () => {
      return new Promise((resolve) => {
        setIsDownloading(true);
        setTimeout(resolve, 500);
      });
    },
    onPrintError: () => {
      setIsDownloading(false);
    }
  });

  const handleDownload = () => handleDownloadFn();
`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/pages/Preview.tsx', code);
