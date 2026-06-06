const fs = require('fs');

const content = fs.readFileSync('src/data/templates.ts', 'utf8');

const newInterface = `export interface TemplateData {
  id: string;
  name: string;
  description: string;
  badge: 'Free' | 'Premium';
  variant: TemplateVariant;
  category: string;
  layout: string;
}`;

let updated = content.replace(/export interface TemplateData \{[\s\S]*?\}/, newInterface);

const layouts = ['single-column', 'left-sidebar', 'top-header', 'two-column', 'timeline', 'skill-bar', 'modern-cards', 'minimal-text', 'executive-premium', 'creative-designer'];

let count = 0;
updated = updated.replace(/category: '[^']+'/g, (match) => {
    const l = layouts[count % layouts.length];
    count++;
    return `${match}, layout: '${l}'`;
});

fs.writeFileSync('src/data/templates.ts', updated);
