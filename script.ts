import fs from 'fs';

// 1. Update Types.tsx
let typesCode = fs.readFileSync('src/types.ts', 'utf8');
if (!typesCode.includes('website?: string;')) {
  typesCode = typesCode.replace(
    'linkedin: string;', 
    'linkedin: string;\n  website?: string;'
  );
  fs.writeFileSync('src/types.ts', typesCode);
}

// 2. Update Templates.tsx
let templatesCode = fs.readFileSync('src/components/Templates.tsx', 'utf8');
if (!templatesCode.includes('Globe')) {
  templatesCode = templatesCode.replace(
    /Award,\s*\}\s*from\s*"lucide-react";/,
    'Award,\n  Globe,\n} from "lucide-react";'
  );
}

const templatesRegexes = [
  {
    find: /\{data\.linkedin && <span>• \{data\.linkedin\}<\/span>\}/g,
    replace: "{data.linkedin && <span>• {data.linkedin}</span>}\n        {data.website && <span>• {data.website}</span>}"
  },
  {
    find: /\{data\.linkedin && \(\s*<div className="flex items-center justify-end gap-2">\s*<span>\{data\.linkedin\}<\/span>\s*<span style=\{\{ color \}\}>in<\/span>\s*<\/div>\s*\)\}/,
    replace: "{data.linkedin && (\n          <div className=\"flex items-center justify-end gap-2\">\n            <span>{data.linkedin}</span>\n            <span style={{ color }}>in</span>\n          </div>\n        )}\n        {data.website && (\n          <div className=\"flex items-center justify-end gap-2\">\n            <span>{data.website}</span>\n            <span style={{ color }}>w</span>\n          </div>\n        )}"
  },
  {
    find: /\{data\.linkedin && \(\s*<div className="flex border-b border-gray-200 pb-1">\s*<span className="w-24 text-gray-400">LINK:<\/span>\{" "\}\s*<span>\{data\.linkedin\}<\/span>\s*<\/div>\s*\)\}/,
    replace: "{data.linkedin && (\n            <div className=\"flex border-b border-gray-200 pb-1\">\n              <span className=\"w-24 text-gray-400\">LINK:</span>{\" \"}\n              <span>{data.linkedin}</span>\n            </div>\n          )}\n          {data.website && (\n            <div className=\"flex border-b border-gray-200 pb-1\">\n              <span className=\"w-24 text-gray-400\">WEB:</span>{\" \"}\n              <span>{data.website}</span>\n            </div>\n          )}"
  },
  {
    find: /\{data\.linkedin && \(\s*<span className="flex items-center gap-1">\s*<Linkedin size=\{14\} \/> \{data\.linkedin\}\s*<\/span>\s*\)\}/,
    replace: "{data.linkedin && (\n            <span className=\"flex items-center gap-1\">\n              <Linkedin size={14} /> {data.linkedin}\n            </span>\n          )}\n          {data.website && (\n            <span className=\"flex items-center gap-1\">\n              <Globe size={14} /> {data.website}\n            </span>\n          )}"
  },
  {
    find: /\{data\.linkedin && \(\s*<div className="flex items-center gap-2">\s*<Linkedin size=\{16\} \/> \{data\.linkedin\}\s*<\/div>\s*\)\}/,
    replace: "{data.linkedin && (\n          <div className=\"flex items-center gap-2\">\n            <Linkedin size={16} /> {data.linkedin}\n          </div>\n        )}\n        {data.website && (\n          <div className=\"flex items-center gap-2\">\n            <Globe size={16} /> {data.website}\n          </div>\n        )}"
  },
  {
    find: /\{data\.linkedin && \(\s*<span className="flex items-center gap-3">\s*<Linkedin size=\{16\} className="shrink-0" style=\{\{ color \}\} \/> <span className="break-all leading-tight">\{data\.linkedin\}<\/span>\s*<\/span>\s*\)\}/,
    replace: "{data.linkedin && (\n          <span className=\"flex items-center gap-3\">\n            <Linkedin size={16} className=\"shrink-0\" style={{ color }} /> <span className=\"break-all leading-tight\">{data.linkedin}</span>\n          </span>\n        )}\n        {data.website && (\n          <span className=\"flex items-center gap-3\">\n            <Globe size={16} className=\"shrink-0\" style={{ color }} /> <span className=\"break-all leading-tight\">{data.website}</span>\n          </span>\n        )}"
  },
  {
    find: /\{data\.linkedin && \(\s*<span className="text-\[12px\] flex items-center gap-1\.5 text-\[\#666\]">\s*<Linkedin size=\{12\} className="text-\[\#888\] shrink-0" \/>\s*\{data\.linkedin\}\s*<\/span>\s*\)\}/,
    replace: "{data.linkedin && (\n            <span className=\"text-[12px] flex items-center gap-1.5 text-[#666]\">\n              <Linkedin size={12} className=\"text-[#888] shrink-0\" />\n              {data.linkedin}\n            </span>\n          )}\n          {data.website && (\n            <span className=\"text-[12px] flex items-center gap-1.5 text-[#666]\">\n              <Globe size={12} className=\"text-[#888] shrink-0\" />\n              {data.website}\n            </span>\n          )}"
  },
  {
    find: /\{data\.linkedin && <div>\{data\.linkedin\}<\/div>\}/,
    replace: "{data.linkedin && <div>{data.linkedin}</div>}\n        {data.website && <div>{data.website}</div>}"
  },
  {
    find: /\{data\.linkedin && <li className="break-all">\{data\.linkedin\}<\/li>\}/,
    replace: "{data.linkedin && <li className=\"break-all\">{data.linkedin}</li>}\n            {data.website && <li className=\"break-all\">{data.website}</li>}"
  },
  {
    find: /\{data\.linkedin && <span className="flex items-center gap-2"><Linkedin size=\{14\}\/> \{data\.linkedin\}<\/span>\}/,
    replace: "{data.linkedin && <span className=\"flex items-center gap-2\"><Linkedin size={14}/> {data.linkedin}</span>}\n        {data.website && <span className=\"flex items-center gap-2\"><Globe size={14}/> {data.website}</span>}"
  },
  {
    find: /\{data\.linkedin && <div className="flex flex-col"><span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">LinkedIn<\/span><span>\{data\.linkedin\}<\/span><\/div>\}/,
    replace: "{data.linkedin && <div className=\"flex flex-col\"><span className=\"text-xs font-bold text-slate-400 uppercase tracking-widest mb-1\">LinkedIn</span><span>{data.linkedin}</span></div>}\n        {data.website && <div className=\"flex flex-col\"><span className=\"text-xs font-bold text-slate-400 uppercase tracking-widest mb-1\">Website</span><span>{data.website}</span></div>}"
  },
  {
    find: /\{data\.linkedin && <span className="flex items-center gap-1\.5"><Linkedin size=\{16\} style=\{\{ color \}\}\/> \{data\.linkedin\}<\/span>\}/,
    replace: "{data.linkedin && <span className=\"flex items-center gap-1.5\"><Linkedin size={16} style={{ color }}/> {data.linkedin}</span>}\n          {data.website && <span className=\"flex items-center gap-1.5\"><Globe size={16} style={{ color }}/> {data.website}</span>}"
  }
];

templatesRegexes.forEach(r => {
  templatesCode = templatesCode.replace(r.find, r.replace);
});
fs.writeFileSync('src/components/Templates.tsx', templatesCode);

// 3. Create robots.txt and sitemap.xml
if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}
fs.writeFileSync('public/robots.txt', 'User-agent: *\nAllow: /\nSitemap: https://quickresume.app/sitemap.xml');
fs.writeFileSync('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://quickresume.app/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`);

// 4. Update index.html meta wrapper
let indexCode = fs.readFileSync('index.html', 'utf8');
indexCode = indexCode.replace(/<meta name="theme-color" content="#10b981" \/>/, '<meta name="theme-color" content="#7c3aed" />');
fs.writeFileSync('index.html', indexCode);

console.log('Script completed');
