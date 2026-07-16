const fs = require('fs');

function fix(file) {
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace("const letterRef = useRef<HTMLDivElement>(null);", "");
  code = code.replace("import { FC, useState, useRef } from 'react';", "import { FC, useState } from 'react';");
  fs.writeFileSync(file, code);
}

fix('src/components/InlineCoverLetter.tsx');
fix('src/pages/CoverLetterGenerator.tsx');
