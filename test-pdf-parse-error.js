import fs from 'fs';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';

async function run() {
  try {
    await pdfParse(Buffer.from('not a pdf'));
  } catch (e) {
    console.error('Caught error:', e.message);
  }
}
run();
