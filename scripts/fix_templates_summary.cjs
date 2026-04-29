const fs = require('fs');
let content = fs.readFileSync('src/components/Templates.tsx', 'utf8');

// The summary is typically used as: {data.summary}
content = content.replace(/\{data\.summary\}/g, "{data.summary?.substring(0, 1500)}");

fs.writeFileSync('src/components/Templates.tsx', content);
console.log('done summary');
