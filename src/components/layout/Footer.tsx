import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Footer: FC = () => {
  return (
    <footer className="bg-white border-t border-[var(--color-border)] pt-16 pb-8 px-6 text-body">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <i className="ti ti-file-description text-white text-xl"></i>
              </div>
              <span className="text-xl font-bold tracking-tight text-heading">QuickResume</span>
            </Link>
            <p className="text-sm max-w-xs text-muted">
              Build a professional, job-winning resume in minutes. Easy to use, ATS-friendly, and beautifully designed.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-heading mb-4">Resume</h4>
            <ul className="space-y-3">
              <li><Link to="/start" className="text-sm hover:text-primary transition-colors">Resume Builder</Link></li>
              <li><Link to="/choose-template" className="text-sm hover:text-primary transition-colors">Templates</Link></li>
              <li><Link to="#" className="text-sm hover:text-primary transition-colors">Examples</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-heading mb-4">Career</h4>
            <ul className="space-y-3">
              <li><Link to="/cover-letter" className="text-sm hover:text-primary transition-colors">Cover Letters</Link></li>
              <li><Link to="/ai-tools" className="text-sm hover:text-primary transition-colors">Career Advice</Link></li>
              <li><Link to="/ai-tools" className="text-sm hover:text-primary transition-colors">Job Tips</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-heading mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link to="#" className="text-sm hover:text-primary transition-colors">About</Link></li>
              <li><Link to="#" className="text-sm hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="#" className="text-sm hover:text-primary transition-colors">Privacy</Link></li>
              <li><Link to="#" className="text-sm hover:text-primary transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted">
          <p>© {new Date().getFullYear()} QuickResume. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-heading"><i className="ti ti-brand-twitter text-xl"></i></a>
            <a href="#" className="hover:text-heading"><i className="ti ti-brand-linkedin text-xl"></i></a>
            <a href="#" className="hover:text-heading"><i className="ti ti-brand-facebook text-xl"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
