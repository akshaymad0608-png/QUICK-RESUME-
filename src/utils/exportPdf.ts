import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Renders a DOM element to a crisp, multi-page A4 PDF.
 * Unlike a single stretched image, this slices the rendered canvas page-by-page
 * so content is never scaled oddly and page breaks stay clean.
 */
export async function exportElementToPdf(element: HTMLElement, fileName: string) {
  // Neutralize rounded corners / shadows for a clean capture.
  const originalClass = element.className;
  element.classList.add('pdf-capturing');

  const canvas = await html2canvas(element, {
    scale: Math.min(3, window.devicePixelRatio > 1 ? 3 : 2),
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    windowWidth: element.scrollWidth,
  });

  element.className = originalClass;

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();

  // Height (in canvas px) that corresponds to one PDF page.
  const pxPerPage = (canvas.width * pageH) / pageW;
  const totalPages = Math.max(1, Math.ceil(canvas.height / pxPerPage));

  for (let page = 0; page < totalPages; page++) {
    const sliceHeight = Math.min(pxPerPage, canvas.height - page * pxPerPage);

    const pageCanvas = document.createElement('canvas');
    pageCanvas.width = canvas.width;
    pageCanvas.height = sliceHeight;
    const ctx = pageCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
      ctx.drawImage(
        canvas,
        0, page * pxPerPage, canvas.width, sliceHeight,
        0, 0, canvas.width, sliceHeight,
      );
    }

    const imgData = pageCanvas.toDataURL('image/jpeg', 0.98);
    const renderedH = (sliceHeight * pageW) / canvas.width;
    if (page > 0) pdf.addPage();
    pdf.addImage(imgData, 'JPEG', 0, 0, pageW, renderedH);
  }

  pdf.save(fileName);
}
