import { FC, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { LoginModal } from '../LoginModal';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';

const Logo: FC<{ className?: string }> = ({ className = '' }) => (
  <span className={`flex items-center gap-2.5 ${className}`}>
    <span className="w-9 h-9 rounded-lg bg-ink flex items-center justify-center shrink-0">
      {/* stacked-sheet mark: the resume, abstracted */}
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <rect x="4" y="2.5" width="9" height="12" rx="1.5" fill="#FAFAF7" />
        <rect x="6" y="5" width="5" height="1.2" rx="0.6" fill="#0D9488" />
        <rect x="6" y="7.4" width="5" height="1" rx="0.5" fill="#9a9c90" />
        <rect x="6" y="9.4" width="3.5" height="1" rx="0.5" fill="#9a9c90" />
      </svg>
    </span>
    <span className="text-[1.35rem] font-display font-bold tracking-tight text-ink leading-none">
      Quick<span className="text-brand">Resume</span>
    </span>
  </span>
);

const links = [
  { to: '/start', label: 'Builder' },
  { to: '/templates', label: 'Templates' },
  { to: '/ai-tools', label: 'AI Tools' },
  { to: '/cover-letter', label: 'Cover Letters' },
];

export const Navbar: FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 h-[72px] transition-colors duration-300 ${
        scrolled ? 'bg-paper/85 backdrop-blur-md border-b border-line' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-full flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" aria-label="QuickResume home"><Logo /></Link>
          <nav className="hidden md:flex items-center gap-7 font-mono-ui text-[0.78rem] uppercase tracking-widest text-body">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="hover:text-ink transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-ink text-sm font-medium">{user.displayName || 'Account'}</span>
              <button
                onClick={() => signOut(auth)}
                className="text-body hover:text-ink transition-colors p-2 rounded-full hover:bg-brand-soft"
                title="Log out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              className="text-ink hover:text-brand font-medium text-sm transition-colors"
              onClick={() => setIsLoginModalOpen(true)}
            >
              Log in
            </button>
          )}
          <button
            onClick={() => navigate('/build')}
            className="group inline-flex items-center gap-2 bg-ink text-paper rounded-full pl-5 pr-4 py-2.5 text-sm font-semibold hover:bg-brand-deep transition-colors"
          >
            Build my resume
            <span className="w-5 h-5 rounded-full bg-brand text-white flex items-center justify-center text-xs group-hover:translate-x-0.5 transition-transform">→</span>
          </button>
        </div>

        <button
          className="md:hidden p-2 -mr-2 text-ink"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-paper md:hidden flex flex-col"
          >
            <div className="h-[72px] px-5 flex items-center justify-between border-b border-line">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}><Logo /></Link>
              <button className="p-2 -mr-2 text-ink" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-8 gap-1">
              {links.map((l, i) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-baseline gap-4 py-3 border-b border-line group"
                >
                  <span className="font-mono-ui text-xs text-brand-deep w-8">0{i + 1}</span>
                  <span className="font-display text-3xl font-semibold text-ink group-hover:text-brand transition-colors">{l.label}</span>
                </Link>
              ))}
            </nav>

            <div className="p-6 border-t border-line">
              <button
                className="w-full h-14 rounded-full text-base bg-ink text-paper font-semibold hover:bg-brand-deep transition-colors"
                onClick={() => { setMobileMenuOpen(false); navigate('/build'); }}
              >
                Build my resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onSuccess={() => {}} />
    </header>
  );
};
