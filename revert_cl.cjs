const fs = require('fs');

function revert(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');

  code = code.replace("import { useReactToPrint } from 'react-to-print';", "import html2canvas from 'html2canvas';\nimport { jsPDF } from 'jspdf';");
  
  const regex = /const handleDownloadPDFFn = useReactToPrint\(\{[\s\S]*?handleDownloadPDFFn\(\);\n/m;
  
  const replacement = `const handleDownloadPDF = async () => {
    const element = letterRef.current;
    if (!element) return;
    
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, logging: false });
      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Cover_Letter.pdf');
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };
`;
  
  if (code.match(regex)) {
    code = code.replace(regex, replacement);
  }
  
  fs.writeFileSync(filePath, code);
}

revert('src/components/InlineCoverLetter.tsx');
revert('src/pages/CoverLetterGenerator.tsx');
