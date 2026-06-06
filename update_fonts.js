import fs from 'fs';

const files = [
    'src/components/templates/Modern.tsx',
    'src/components/templates/Minimal.tsx',
    'src/components/templates/Executive.tsx'
];

for (const f of files) {
    let content = fs.readFileSync(f, 'utf8');

    // Add hf, bf parsing
    content = content.replace(/const sectionGap = spacingMap.*?;\n/g, (match) => {
        return match + `\n  const hf = design.headingFont || design.fontFamily;\n  const bf = design.bodyFont || design.fontFamily;\n`;
    });

    // Update main container
    content = content.replace(/style={{[^}]*fontFamily: design.fontFamily[^}]*}}/g, (match) => {
        return match.replace('design.fontFamily', 'bf').replace('}}', `, lineHeight: design.lineHeight || '1.5' }}`);
    });

    // Apply hf to h1, h2, style blocks
    content = content.replace(/className="([^"]*text-\d+xl[^"]*)"/g, (match) => {
        return match + ` style={{ fontFamily: hf }}`;
    });

    content = content.replace(/<h2 className="(.*?)".*?>/g, (match, classes) => {
        if(match.includes('style={{')) {
             return match.replace('style={{', 'style={{ fontFamily: hf, ');
        }
        return match.replace('>', ` style={{ fontFamily: hf }}>`);
    });
    
    // Also headings inside lists etc
    content = content.replace(/<div className="font-bold text-gray-900 text-\[\d+px\]">(.*?)<\/div>/g, (match, contents) => {
        return `<div className="font-bold text-gray-900 text-[15px]" style={{ fontFamily: hf }}>${contents}</div>`;
    });

    fs.writeFileSync(f, content);
}
