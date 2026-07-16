const fs = require('fs');
let code = fs.readFileSync('src/pages/Build.tsx', 'utf8');

const regex = /const handleDownloadPDF = async \(\) => \{[\s\S]*?\n  \};\n/m;
const replacement = `const handleDownloadPDFFn = useReactToPrint({
    contentRef: printRef,
    documentTitle: data.personalInfo?.firstName ? \`\${data.personalInfo.firstName}_\${data.personalInfo.lastName}_Resume\` : resumeName,
    onAfterPrint: () => {
      setIsDownloading(false);
      toast.success('PDF downloaded successfully!');
    },
    onBeforePrint: () => {
      return new Promise((resolve) => {
        setIsDownloading(true);
        setTimeout(resolve, 500); // Wait for styles to settle
      });
    },
    onPrintError: () => {
      setIsDownloading(false);
      toast.error('Failed to generate PDF.');
    }
  });

  const handleDownloadPDF = () => {
    handleDownloadPDFFn();
  };
`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/pages/Build.tsx', code);
