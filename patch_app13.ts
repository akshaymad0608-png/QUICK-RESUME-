import fs from 'fs';

let content = fs.readFileSync('src/components/BuilderView.tsx', 'utf8');

// remove Share2 from react-helmet-async
content = content.replace('import { Share2, Helmet } from "react-helmet-async";', 'import { Helmet } from "react-helmet-async";');

// it might also still be in lucide-react if I did it right there... actually the regex replace was:
// `setupBuilder = setupBuilder.replace('import {', 'import { Share2,');`
// Since the FIRST `import {` in the file is `import { Helmet } from "react-helmet-async"`, it changed that one!

content = content.replace('import { Share2, Helmet } from "react-helmet-async";', 'import { Helmet } from "react-helmet-async";');

// Add Share2 to lucide-react (the second import { in the file)
content = content.replace('import {\n  FileText,', 'import {\n  Share2,\n  FileText,');

fs.writeFileSync('src/components/BuilderView.tsx', content);
