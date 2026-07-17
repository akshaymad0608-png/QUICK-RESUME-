import { jsPDF } from 'jspdf';

/**
 * Renders plain text (a cover letter) straight into a paginated A4 PDF
 * using jsPDF's native text engine — vector output, selectable text,
 * and immune to the blank-canvas issues of DOM rasterization.
 */
export function exportTextToPdf(text: string, fileName: string, heading?: string) {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 22;
  const maxW = pageW - margin * 2;
  let y = margin;

  if (heading) {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(15);
    pdf.text(heading, margin, y);
    y += 10;
  }

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(11.5);
  const lineHeight = 6.2;

  const paragraphs = text.replace(/\r\n/g, '\n').split('\n');
  for (const para of paragraphs) {
    const lines: string[] = para.trim() === '' ? [''] : pdf.splitTextToSize(para, maxW);
    for (const line of lines) {
      if (y > pageH - margin) {
        pdf.addPage();
        y = margin;
      }
      if (line) pdf.text(line, margin, y);
      y += lineHeight;
    }
  }

  pdf.save(fileName);
}
