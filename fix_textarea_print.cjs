const fs = require('fs');

function fix(file) {
  let code = fs.readFileSync(file, 'utf8');
  
  if (!code.includes('const letterRef = useRef<HTMLDivElement>(null);')) {
    code = code.replace("const [downloading, setDownloading] = useState(false);", "const [downloading, setDownloading] = useState(false);\n  const letterRef = useRef<HTMLDivElement>(null);");
  }
  if (!code.includes("import { useRef } from 'react';")) {
    code = code.replace("import { FC, useState } from 'react';", "import { FC, useState, useRef } from 'react';");
  }
  
  // add hidden print div
  const hiddenDiv = `
            {/* Hidden div for printing */}
            <div className="hidden">
              <div ref={letterRef} className="p-12 font-sans bg-white text-black text-sm whitespace-pre-wrap leading-relaxed max-w-[800px] mx-auto">
                {letter}
              </div>
            </div>
            <textarea
  `;
  code = code.replace("<textarea", hiddenDiv);
  
  fs.writeFileSync(file, code);
}

fix('src/components/InlineCoverLetter.tsx');
fix('src/pages/CoverLetterGenerator.tsx');

