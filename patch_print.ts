import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

const newHandlePrint = `
  const handlePrint = async () => {
    const element = document.getElementById("preview-content");
    if (!element) return;
    
    // First try standard print, but if it fails or requires fallback:
    try {
      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        showToast("Popup blocked! Downloading PDF instead...", "info");
        const html2canvas = (await import('html2canvas')).default;
        const { jsPDF } = await import('jspdf');
        
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: paperSize === 'a4' ? 'a4' : 'letter',
        });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        pdf.save((data.name || 'Resume') + '.pdf');
        return;
      }

      printWindow.document.write(\`
        <html>
          <head>
            <title>\${data.name ? data.name + " - Resume" : "Resume"}</title>
            <style>
              body { margin: 0; padding: 0; background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              @page { size: \${paperSize === "letter" ? "letter" : "A4"}; margin: 0; }
            </style>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          </head>
          <body>
            \${element.innerHTML}
          </body>
        </html>
      \`);
      printWindow.document.close();
      printWindow.focus();
      
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    } catch (err) {
      console.error(err);
      showToast("Download failed", "error");
    }
  };
`;

content = content.replace(/const handlePrint = async \(\) => \{[\s\S]*?(?=const handleExportDocx)/, newHandlePrint);

fs.writeFileSync('src/App.tsx', content);
