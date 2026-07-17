import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Facebook } from 'lucide-react';
import { Logo } from './Navbar';

const COLUMNS = [
  {
    title: 'Resume',
    links: [
      { label: 'Resume Builder', to: '/start' },
      { label: 'Improve My Resume', to: '/improve' },
      { label: 'Templates', to: '/templates' },
      { label: 'ATS-Friendly Templates', to: '/templates' },
      { label: 'Resume Examples', to: '/examples' },
    ],
  },
  {
    title: 'AI Tools',
    links: [
      { label: 'Summary Generator', to: '/ai-tools' },
      { label: 'ATS Score Checker', to: '/ai-tools' },
      { label: 'Bullet Point Rewriter', to: '/ai-tools' },
      { label: 'Cover Letter Generator', to: '/cover-letter' },
    ],
  },
  {
    title: 'Templates by role',
    links: [
      { label: 'Fresher & Student', to: '/templates' },
      { label: 'Developer & Engineering', to: '/templates' },
      { label: 'Designer & Creative', to: '/templates' },
      { label: 'Executive & Corporate', to: '/templates' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Pricing', to: '/pricing' },
      { label: 'Career Resources', to: '/resources' },
      { label: 'Privacy', to: '/' },
      { label: 'Terms', to: '/' },
    ],
  },
];

export const Footer: FC = () => (
  <footer className="bg-ink text-[#B9BFD6] pt-16 pb-8 px-4 sm:px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12 mb-14">
        <div className="col-span-2 space-y-5">
          <Link to="/" aria-label="QuickResume home"><Logo light /></Link>
          <p className="text-sm max-w-xs leading-relaxed text-[#8B93B8]">
            The AI resume builder that gets past the bots and in front of recruiters. Write less, land more interviews.
          </p>
          <div className="flex gap-3 pt-1">
            {[
              { Icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
              { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
              { Icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map(col => (
          <div key={col.title}>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8B93B8] mb-5">{col.title}</h4>
            <ul className="space-y-3">
              {col.links.map(l => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-7 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#8B93B8]">
        <p>© {new Date().getFullYear()} quickresume.business — All rights reserved.</p>
        <p className="font-mono tracking-wider">ATS-tested · Free PDF export</p>
      </div>
    </div>
  </footer>
);
