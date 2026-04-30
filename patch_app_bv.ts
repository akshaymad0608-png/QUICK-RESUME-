import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');
content = content.replace(
  '<BuilderView\n            handleShare={handleShare}',
  '<BuilderView\n            isLightMode={isLightMode}\n            setIsLightMode={setIsLightMode}\n            handleShare={handleShare}'
);
fs.writeFileSync('src/App.tsx', content);
console.log("Patched App BuilderView props");
