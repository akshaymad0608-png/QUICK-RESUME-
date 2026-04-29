const fs = require("fs");
["src/App.tsx", "src/components/Home.tsx", "src/components/Templates.tsx"].forEach((file) => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, "utf8");
    content = content.replace(/shadow-\[#28a745\]/g, "shadow-emerald-600");
    fs.writeFileSync(file, content, "utf8");
  }
});
console.log("Shadows replaced");
