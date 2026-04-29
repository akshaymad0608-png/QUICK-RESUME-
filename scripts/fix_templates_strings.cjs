const fs = require('fs');
let content = fs.readFileSync('src/components/Templates.tsx', 'utf8');

// Replace {data.name || "Something"} with {data.name?.substring(0, 60) || "Something"}
content = content.replace(/\{data\.name\s*\|\|/g, "{data.name?.substring(0, 80) ||");
content = content.replace(/\{data\.name\?\([^)]+\)\s*\|\|/g, "{data.name?.substring(0, 80)?.toUpperCase() ||"); // handle toUpperCase

// Specifically handle exact cases:
content = content.replace(/data\.name\?\.toUpperCase\(\)/g, "data.name?.substring(0, 80)?.toUpperCase()");
content = content.replace(/data\.title\?\.toUpperCase\(\)/g, "data.title?.substring(0, 150)?.toUpperCase()");

content = content.replace(/\{data\.title\s*\|\|/g, "{data.title?.substring(0, 150) ||");

// Sometimes there's {data.name} directly? Let's check
content = content.replace(/\{data\.name\}/g, "{data.name?.substring(0, 80)}");
content = content.replace(/\{data\.title\}/g, "{data.title?.substring(0, 150)}");

fs.writeFileSync('src/components/Templates.tsx', content);
console.log('done');
