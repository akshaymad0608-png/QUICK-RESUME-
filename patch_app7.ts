import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  /\{navTools\.resume\.map\(\(item, idx\) => \(\s*<button\s*key=\{idx\}/,
  '{navTools.resume.map((item, idx) => (\n                    <button\n                      key={item.title}'
);
content = content.replace(
  /\{navTools\.coverLetter\.map\(\(item, idx\) => \(\s*<button\s*key=\{idx\}/,
  '{navTools.coverLetter.map((item, idx) => (\n                    <button\n                      key={item.title}'
);

fs.writeFileSync('src/App.tsx', content);
