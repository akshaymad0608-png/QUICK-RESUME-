const fs = require('fs');

function revert(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');

  code = code.replace("import { useReactToPrint } from 'react-to-print';", "import html2canvas from 'html2canvas';\nimport { jsPDF } from 'jspdf';");
  
  const regex = /const handleDownloadFn = useReactToPrint\(\{[\s\S]*?handleDownloadFn\(\);\n/m;
  
  const replacement = `const handleDownload = async () => {
    if (!resumeRef.current) return;
    
    setIsDownloading(true);
    const name = data.personalInfo?.fullName?.replace(/\\s+/g, '-').toLowerCase() || 'resume';
    const filename = \`\${name}-resume.pdf\`;
    
    try {
      const canvas = await html2canvas(resumeRef.current, { scale: 2, useCORS: true, logging: false });
      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF('p', 'mm', 'letter');
      const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'JPEG', 10, 10, pdfWidth, pdfHeight);
      pdf.save(filename);
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

revert('src/pages/Preview.tsx');
