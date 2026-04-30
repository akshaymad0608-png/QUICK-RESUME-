import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = "import { Logo } from './components/Logo';\n" + content;

const oldNavLogo = `<div
              className="flex flex-col items-center justify-center gap-0 mr-4 cursor-pointer group px-2 py-1 transition-transform duration-300 hover:scale-[1.02]"
              onClick={() => setCurrentView("home")}
            >
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[var(--text-main)] leading-none font-heading uppercase text-center w-full">
                QuickResume
              </h1>
              <span className="text-[0.45rem] sm:text-[0.55rem] tracking-[0.1em] text-[var(--text-main)] uppercase font-medium mt-1 w-full text-center">
                Fast. Free. Professional.
              </span>
            </div>`;

const newNavLogo = `<div
              className="flex items-center mr-4 cursor-pointer group transition-transform duration-300 hover:scale-[1.02]"
              onClick={() => setCurrentView("home")}
            >
              <Logo className="h-10 sm:h-12 w-auto drop-shadow-md" />
            </div>`;

if (content.includes(oldNavLogo)) {
  content = content.replace(oldNavLogo, newNavLogo);
}

fs.writeFileSync('src/App.tsx', content);
console.log("App.tsx updated");

let homeContent = fs.readFileSync('src/components/Home.tsx', 'utf8');

homeContent = "import { Logo } from './Logo';\n" + homeContent;

const oldFooterLogo = `<div className="mb-6 flex flex-col items-start justify-center gap-0">
              <h1 className="text-3xl font-black tracking-tight text-[var(--text-main)] leading-none font-heading uppercase text-left w-full">
                QuickResume
              </h1>
              <span className="text-[0.60rem] tracking-[0.1em] text-[var(--text-main)] uppercase font-medium mt-1 w-full text-left">
                Fast. Free. Professional.
              </span>
            </div>`;

const newFooterLogo = `<div className="mb-6 flex items-start">
              <Logo className="h-14 w-auto drop-shadow-lg" />
            </div>`;

if (homeContent.includes(oldFooterLogo)) {
  homeContent = homeContent.replace(oldFooterLogo, newFooterLogo);
}

fs.writeFileSync('src/components/Home.tsx', homeContent);
console.log("Home.tsx updated");
