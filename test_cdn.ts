import * as pdfjsLib from "pdfjs-dist";
fetch(`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`)
.then(res => console.log(res.status))
