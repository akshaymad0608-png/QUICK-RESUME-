import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Feather, Twitter, Linkedin, Facebook } from 'lucide-react';

export const Footer: FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8 px-6 text-slate-500 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-tr from-slate-900 to-slate-700 rounded-lg flex items-center justify-center shadow-lg shadow-black/10">
                <Feather className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-900">QuickResume</span>
            </Link>
            <p className="text-sm max-w-xs text-slate-500 leading-relaxed">
              Build a professional, job-winning resume in minutes. Easy to use, ATS-friendly, and beautifully designed.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Resume</h4>
            <ul className="space-y-3">
              <li><Link to="/start" className="text-sm font-medium hover:text-slate-900 transition-colors">Resume Builder</Link></li>
              <li><Link to="/choose-template" className="text-sm font-medium hover:text-slate-900 transition-colors">Templates</Link></li>
              <li><Link to="/examples" className="text-sm font-medium hover:text-slate-900 transition-colors">Examples</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Career</h4>
            <ul className="space-y-3">
              <li><Link to="/cover-letter" className="text-sm font-medium hover:text-slate-900 transition-colors">Cover Letters</Link></li>
              <li><Link to="/ai-tools" className="text-sm font-medium hover:text-slate-900 transition-colors">Career Advice</Link></li>
              <li><Link to="/ai-tools" className="text-sm font-medium hover:text-slate-900 transition-colors">Job Tips</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm font-medium hover:text-slate-900 transition-colors">About</Link></li>
              <li><Link to="/" className="text-sm font-medium hover:text-slate-900 transition-colors">Contact</Link></li>
              <li><Link to="/" className="text-sm font-medium hover:text-slate-900 transition-colors">Privacy</Link></li>
              <li><Link to="/" className="text-sm font-medium hover:text-slate-900 transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium text-slate-500">
          <p>© {new Date().getFullYear()} quickresume.business. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors"><Twitter size={20} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors"><Linkedin size={20} /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors"><Facebook size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
