import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github } from 'lucide-react';

const Mark: FC = () => (
  <span className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center">
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="4" y="2.5" width="9" height="12" rx="1.5" fill="#FAFAF7" />
      <rect x="6" y="5" width="5" height="1.2" rx="0.6" fill="#0D9488" />
      <rect x="6" y="7.4" width="5" height="1" rx="0.5" fill="#9a9c90" />
      <rect x="6" y="9.4" width="3.5" height="1" rx="0.5" fill="#9a9c90" />
    </svg>
  </span>
);

export const Footer: FC = () => {
  const cols = [
    { h: 'Resume', items: [['Resume Builder', '/start'], ['Templates', '/templates'], ['Examples', '/examples']] },
    { h: 'Career', items: [['Cover Letters', '/cover-letter'], ['AI Tools', '/ai-tools'], ['Resources', '/resources']] },
    { h: 'Company', items: [['About', '/'], ['Contact', '/'], ['Privacy', '/'], ['Terms', '/']] },
  ];
  return (
    <footer className="bg-paper border-t border-line pt-16 pb-10 px-5 sm:px-8 text-body">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2 max-w-xs">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <Mark />
              <span className="font-display text-xl font-bold tracking-tight text-ink">
                Quick<span className="text-brand">Resume</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Build a professional, ATS-friendly resume in minutes — writing done with you, not for a fee.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.h}>
              <h4 className="font-mono-ui text-[0.68rem] tracking-widest uppercase text-ink mb-5">{col.h}</h4>
              <ul className="space-y-3">
                {col.items.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="text-sm hover:text-ink transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-line flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs">© {new Date().getFullYear()} QuickResume. All rights reserved.</p>
          <div className="flex gap-4 text-body">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors" aria-label="Twitter"><Twitter size={18} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors" aria-label="GitHub"><Github size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
