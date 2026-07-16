const fs = require('fs');

function rewriteDownload(file) {
  let code = fs.readFileSync(file, 'utf8');

  const downloadRegex = /const handleDownloadPDF = async \(\) => \{[\s\S]*?\n  \};\n/m;
  const replacement = `const handleDownloadPDF = async () => {
    if (!letter) return;
    setDownloading(true);
    
    // Position off-screen but in DOM for html2canvas to work
    const el = document.createElement('div');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    el.style.top = '-9999px';
    el.style.width = '800px';
    el.style.padding = '40px';
    el.style.backgroundColor = 'white';
    el.style.color = 'black';
    el.style.fontFamily = 'Arial, sans-serif';
    el.style.fontSize = '14px';
    el.style.lineHeight = '1.6';
    el.style.whiteSpace = 'pre-wrap';
    el.innerText = letter;
    
    document.body.appendChild(el);

    try {
      const canvas = await html2canvas(el, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Cover_Letter.pdf');
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF");
    } finally {
      document.body.removeChild(el);
      setDownloading(false);
    }
  };
`;

  code = code.replace(downloadRegex, replacement);
  fs.writeFileSync(file, code);
}

rewriteDownload('src/components/InlineCoverLetter.tsx');
rewriteDownload('src/pages/CoverLetterGenerator.tsx');

