import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const A4_W = 794;   // px @96dpi
const A4_H = 1123;

/** Wait until every <img> inside the node has finished loading (or errored). */
const waitForImages = (node: HTMLElement) =>
  Promise.all(
    Array.from(node.querySelectorAll('img')).map(img => {
      if (img.complete && img.naturalWidth > 0) return Promise.resolve();
      return new Promise<void>(resolve => {
        img.addEventListener('load', () => resolve(), { once: true });
        img.addEventListener('error', () => resolve(), { once: true });
        setTimeout(resolve, 5000);
      });
    }),
  );

/**
 * Convert every <img> to an inline data-URL so cross-origin photos
 * (Unsplash / Google / Firebase avatars) can never taint or drop out
 * of the canvas. Falls back silently if fetch fails.
 */
const inlineImages = async (node: HTMLElement) => {
  const imgs = Array.from(node.querySelectorAll('img'));
  await Promise.all(imgs.map(async img => {
    const src = img.getAttribute('src') || '';
    if (!src || src.startsWith('data:')) return;
    try {
      const res = await fetch(src, { mode: 'cors' });
      if (!res.ok) throw new Error(String(res.status));
      const blob = await res.blob();
      const dataUrl: string = await new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(r.result as string);
        r.onerror = reject;
        r.readAsDataURL(blob);
      });
      img.src = dataUrl;
    } catch {
      // CORS-blocked image: hide it rather than risk a tainted/blank canvas.
      img.style.visibility = 'hidden';
    }
  }));
};

/** Sample pixels to detect an all-white (blank) capture. */
const canvasLooksBlank = (canvas: HTMLCanvasElement): boolean => {
  const ctx = canvas.getContext('2d');
  if (!ctx || canvas.width === 0 || canvas.height === 0) return true;
  const rows = [0.1, 0.3, 0.5, 0.7, 0.9];
  for (const rf of rows) {
    const y = Math.floor(canvas.height * rf);
    const { data } = ctx.getImageData(0, Math.min(y, canvas.height - 1), canvas.width, 1);
    for (let i = 0; i < data.length; i += 16) {
      if (data[i] < 245 || data[i + 1] < 245 || data[i + 2] < 245) return false;
    }
  }
  return true;
};

const capture = (node: HTMLElement, height: number) =>
  html2canvas(node, {
    scale: 2,
    useCORS: true,
    allowTaint: false,
    logging: false,
    backgroundColor: '#ffffff',
    imageTimeout: 8000,
    width: A4_W,
    windowWidth: A4_W + 40,
    height,
    scrollX: 0,
    scrollY: 0,
  });

/**
 * Last-resort exporter: opens the browser's own print dialog with the resume
 * laid out on A4 pages. The browser's print engine renders everything the
 * screen can render, so this can never come out blank — the user just
 * chooses "Save as PDF" as the destination.
 */
const printFallback = (element: HTMLElement): Promise<void> =>
  new Promise(resolve => {
    const iframe = document.createElement('iframe');
    Object.assign(iframe.style, { position: 'fixed', right: '0', bottom: '0', width: '0', height: '0', border: '0' });
    document.body.appendChild(iframe);

    const doc = iframe.contentDocument!;
    doc.open();
    doc.write('<!DOCTYPE html><html><head><meta charset="utf-8"></head><body></body></html>');
    doc.close();

    // Copy every stylesheet + inline style block so the clone looks identical.
    document.querySelectorAll('link[rel="stylesheet"], style').forEach(node => {
      doc.head.appendChild(node.cloneNode(true));
    });
    const pageCss = doc.createElement('style');
    pageCss.textContent = `
      @page { size: A4; margin: 0; }
      html, body { margin: 0; padding: 0; background: #fff; }
      body > * { width: 794px !important; }
    `;
    doc.head.appendChild(pageCss);
    doc.body.appendChild(element.cloneNode(true));

    const done = () => {
      setTimeout(() => { iframe.remove(); resolve(); }, 500);
    };
    iframe.contentWindow!.addEventListener('afterprint', done, { once: true });

    // Give cloned stylesheets/fonts a moment to apply, then print.
    setTimeout(() => {
      try {
        iframe.contentWindow!.focus();
        iframe.contentWindow!.print();
      } finally {
        // In browsers that don't fire afterprint reliably, clean up anyway.
        setTimeout(done, 60000);
      }
    }, 600);
  });

export type PdfExportResult = 'downloaded' | 'print-dialog';

/**
 * Renders a resume DOM element to a crisp, multi-page A4 PDF.
 * `element` MUST be an unscaled, unclipped node (the hidden print node),
 * 794px wide, mounted in the document.
 * Returns 'downloaded' when the PDF was saved directly, or 'print-dialog'
 * when the browser print dialog was used as a fallback.
 */
export async function exportElementToPdf(element: HTMLElement, fileName: string, returnBlobUrl?: boolean): Promise<PdfExportResult | string> {
  // 1. Make sure fonts and images are fully ready before painting.
  if (document.fonts?.ready) {
    try { await document.fonts.ready; } catch { /* non-fatal */ }
  }
  await inlineImages(element);
  await waitForImages(element);
  await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

  const contentHeight = Math.max(A4_H, element.scrollHeight);

  // 2. Capture. If it comes out blank, retry once without photos,
  //    then fall back to the browser's print engine (never blank).
  let canvas: HTMLCanvasElement | null = null;
  try {
    canvas = await capture(element, contentHeight);
    if (canvasLooksBlank(canvas)) {
      element.querySelectorAll('img').forEach(img => { img.style.display = 'none'; });
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
      canvas = await capture(element, contentHeight);
      element.querySelectorAll('img').forEach(img => { img.style.display = ''; });
      if (canvasLooksBlank(canvas)) canvas = null;
    }
  } catch {
    canvas = null;
  }

  if (!canvas) {
    if (returnBlobUrl) throw new Error('PDF Generation failed');
    await printFallback(element);
    return 'print-dialog';
  }

  // 3. Slice the tall canvas into A4 pages.
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const pxPerPage = (canvas.width * pageH) / pageW;
  const totalPages = Math.max(1, Math.ceil(canvas.height / pxPerPage));

  for (let page = 0; page < totalPages; page++) {
    const sliceHeight = Math.min(pxPerPage, canvas.height - page * pxPerPage);
    if (page > 0 && sliceHeight <= pxPerPage * 0.01) break; // skip sliver page

    const pageCanvas = document.createElement('canvas');
    pageCanvas.width = canvas.width;
    pageCanvas.height = Math.ceil(pxPerPage);
    const ctx = pageCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
      ctx.drawImage(canvas, 0, page * pxPerPage, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);
    }

    if (page > 0) pdf.addPage();
    pdf.addImage(pageCanvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, pageW, pageH);
  }

  if (returnBlobUrl) {
    return String(pdf.output('bloburl'));
  }

  pdf.save(fileName);
  return 'downloaded';
}
