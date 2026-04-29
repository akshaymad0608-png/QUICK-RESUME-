import fs from "fs";

const files = [
  "src/App.tsx",
  "src/components/Home.tsx",
  "src/components/BuilderView.tsx",
  "src/components/LightInputs.tsx",
];

let replacements = [
  ["bg-slate-50", "bg-slate-950"],
  ["text-slate-900", "text-slate-100"],
  ["text-slate-800", "text-slate-200"],
  ["text-slate-700", "text-slate-300"],
  ["text-slate-600", "text-slate-400"],
  ["border-slate-200", "border-slate-800"],
  ["border-slate-300", "border-slate-700"],
  ["bg-slate-100", "bg-slate-900"],
  ["bg-slate-200", "bg-slate-800"],
  [/bg-white(?!(\/|\w))/g, "bg-slate-900"], 
  [/bg-white\/([0-9]+)/g, "bg-slate-900/$1"], // Convert bg-white/xx to bg-slate-900/xx or maybe better bg-white/xx to bg-slate-800/xx
  ["shadow-sm", "shadow-slate-950/50"],
  ["shadow-md", "shadow-slate-950/50"],
  ["shadow-lg", "shadow-slate-950/50"],
  ["shadow-xl", "shadow-slate-950/50"],
  ["shadow-2xl", "shadow-slate-950/50"],
  ["border-black/10", "border-white/10"],
  ["bg-black", "bg-white"],
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Some exceptions: We don't want to make preview-content dark if it breaks printing,
    // actually, we might want the preview to be white. Let's fix that later, or skip preview-content.
    // In BuilderView.tsx, we have id="preview-content" which we want to remain light.
    
    replacements.forEach(([search, replace]) => {
      if (typeof search === 'string') {
        content = content.split(search).join(replace as string);
      } else {
        content = content.replace(search, replace as string);
      }
    });

    fs.writeFileSync(file, content);
  }
});
