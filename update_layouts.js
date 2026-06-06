import fs from 'fs';

let content = fs.readFileSync('src/data/templates.ts', 'utf8');

const regex = /{ id: '([^']+)'(.*?)}/g;

content = content.replace(regex, (match, id, rest) => {
    let layout = 'classic';
    if (id.includes('modern') || id.includes('fresher') || id.includes('student')) layout = 'modern';
    if (id.includes('minimal') || id.includes('ats') || id.includes('nophoto') || id.includes('grey')) layout = 'minimal';
    if (id.includes('exec') || id.includes('finance') || id.includes('classic') || id.includes('gdocs')) layout = 'executive';
    if (id.includes('sidebar') || id.includes('twocol') || id.includes('corp-structured')) layout = 'sidebar';
    if (id.includes('twocol-modern') || id.includes('health')) layout = 'two-column';
    if (id.includes('timeline')) layout = 'timeline';
    if (id.includes('creative') || id.includes('designer') || id.includes('info-skills') || id.includes('layout-cards')) layout = 'creative';
    
    return `{ id: '${id}'${rest}, layout: '${layout}' }`;
});

fs.writeFileSync('src/data/templates.ts', content);
