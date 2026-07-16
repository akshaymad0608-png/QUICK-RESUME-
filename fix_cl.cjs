const fs = require('fs');

function fixFile(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');

  code = code.replace("import html2canvas from 'html2canvas';", "import { useReactToPrint } from 'react-to-print';");
  code = code.replace("import { jsPDF } from 'jspdf';", "");

  const regex = /const handleDownloadPDF = async \(\) => \{[\s\S]*?\n  \};\n/m;
  const replacement = `const handleDownloadPDFFn = useReactToPrint({
      contentRef: letterRef,
      documentTitle: 'Cover_Letter',
      onAfterPrint: () => {
        setIsDownloading(false);
      },
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

    const handleDownloadPDF = () => handleDownloadPDFFn();
  `;

  code = code.replace(regex, replacement);
  fs.writeFileSync(filePath, code);
}

fixFile('src/components/InlineCoverLetter.tsx');
fixFile('src/pages/CoverLetterGenerator.tsx');
