const fs = require('fs');

function fixFile(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');

  code = code.replace("import html2canvas from 'html2canvas';", "import { useReactToPrint } from 'react-to-print';");
  code = code.replace("import { jsPDF } from 'jspdf';", "");

  if (!code.includes("import { useRef }")) {
    code = code.replace("import { FC, useState } from 'react';", "import { FC, useState, useRef } from 'react';");
  }

  const regex = /const handleDownloadPDF = async \(\) => \{[\s\S]*?\n  \};\n/m;
  const replacement = `const handleDownloadPDFFn = useReactToPrint({
      contentRef: finalizeRef,
      documentTitle: data.personalInfo?.firstName ? \`\${data.personalInfo.firstName}_\${data.personalInfo.lastName}_Resume\` : 'resume',
      onAfterPrint: () => {
        setIsDownloading(false);
        toast.success('PDF downloaded successfully!');
      },
      onBeforePrint: () => {
        return new Promise((resolve) => {
          setIsDownloading(true);
          setTimeout(resolve, 500);
        });
      },
      onPrintError: () => {
        setIsDownloading(false);
        toast.error('Failed to generate PDF.');
      }
    });

    const handleDownloadPDF = () => handleDownloadPDFFn();
  `;

  code = code.replace(regex, replacement);
  
  if (!code.includes('const finalizeRef = useRef<HTMLDivElement>(null);')) {
    code = code.replace("const [isDownloading, setIsDownloading] = useState(false);", "const [isDownloading, setIsDownloading] = useState(false);\n  const finalizeRef = useRef<HTMLDivElement>(null);");
  }

  code = code.replace('<div className="shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.1)] transition-shadow duration-500 rounded-lg overflow-hidden ring-1 ring-white/10">', '<div ref={finalizeRef} className="shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.1)] transition-shadow duration-500 rounded-lg overflow-hidden ring-1 ring-white/10">');

  fs.writeFileSync(filePath, code);
}

fixFile('src/components/steps/Finalize.tsx');
