import { FC, useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, ArrowRight } from 'lucide-react';
import { LoginModal } from '../LoginModal';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { AnimatePresence, motion } from 'framer-motion';

/* QuickResume mark — a resume sheet with a rising career arrow */
export const LogoMark: FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
    <rect x="2" y="2" width="32" height="32" rx="9" fill="#171D2F" />
    <rect x="9" y="10" width="12" height="2.6" rx="1.3" fill="#FAFAFC" />
    <rect x="9" y="16" width="18" height="2.6" rx="1.3" fill="#5568E8" />
    <rect x="9" y="22" width="10" height="2.6" rx="1.3" fill="#5568E8" opacity="0.65" />
    <path
      d="M10 27.5 L18 20.5 L22 24 L28.5 16.5"
      stroke="#F97350"
      strokeWidth="2.6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M23.5 15.5 h5.5 v5.5" stroke="#F97350" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Logo: FC<{ light?: boolean }> = ({ light }) => (
  <span className="flex items-center gap-2.5">
    <LogoMark />
    <span className={`text-[21px] font-display font-semibold tracking-tight ${light ? 'text-paper' : 'text-ink'}`}>
      Quick<span className="text-pine">Resume</span>
    </span>
  </span>
);

const NAV_LINKS = [
  { to: '/templates', label: 'Templates' },
  { to: '/improve', label: 'Improve Resume' },
  { to: '/examples', label: 'Examples' },
  { to: '/ai-tools', label: 'AI Tools' },
  { to: '/cover-letter', label: 'Cover Letter' },
  { to: '/pricing', label: 'Pricing' },
];

export const Navbar: FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 h-16 md:h-[72px] bg-paper/90 backdrop-blur-md transition-shadow ${scrolled ? 'border-b border-line shadow-[0_1px_0_rgba(26,36,32,0.02)]' : 'border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex justify-between items-center">
          <Link to="/" aria-label="QuickResume home" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-[14px] font-semibold" aria-label="Main">
            {NAV_LINKS.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `transition-colors ${isActive ? 'text-pine' : 'text-ink-soft hover:text-ink'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-ink-soft text-sm font-semibold max-w-[140px] truncate">{user.displayName || 'My account'}</span>
                <button
                  onClick={() => signOut(auth)}
                  className="text-mist hover:text-ink transition-colors p-2 rounded-full hover:bg-pine-tint"
                  title="Log out"
                  aria-label="Log out"
                >
                  <LogOut className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                </button>
              </div>
            ) : (
              <button
                className="text-ink-soft hover:text-ink font-semibold text-sm transition-colors"
                onClick={() => setIsLoginModalOpen(true)}
              >
                Log in
              </button>
            )}
            <button
              className="bg-pine text-white rounded-full px-5 py-2.5 text-sm font-bold hover:bg-pine-deep transition-colors inline-flex items-center gap-1.5"
              onClick={() => navigate('/start')}
            >
              Create my resume <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <button
            className="lg:hidden p-2 -mr-2 text-ink"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[100] bg-paper lg:hidden flex flex-col"
          >
            <div className="h-16 px-4 sm:px-6 flex justify-between items-center border-b border-line shrink-0">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}><Logo /></Link>
              <button className="p-2 -mr-2 text-ink" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col justify-between min-h-0 custom-scrollbar">
              <nav className="px-6 py-8 flex flex-col gap-1" aria-label="Mobile">
                {[{ to: '/start', label: 'Resume Builder' }, ...NAV_LINKS, { to: '/resources', label: 'Resources' }].map(l => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3.5 text-lg font-semibold text-ink border-b border-line/70 flex justify-between items-center"
                  >
                    {l.label}
                    <ArrowRight className="w-4 h-4 text-mist" />
                  </Link>
                ))}
              </nav>

              <div className="p-6 border-t border-line space-y-3 shrink-0">
                <button
                  className="w-full h-13 py-3.5 rounded-full text-base bg-pine hover:bg-pine-deep text-white font-bold transition-colors"
                  onClick={() => { setMobileMenuOpen(false); navigate('/start'); }}
                >
                  Create my resume
                </button>
                {!user && (
                  <button
                    className="w-full py-3 text-sm font-semibold text-ink-soft"
                    onClick={() => { setMobileMenuOpen(false); setIsLoginModalOpen(true); }}
                  >
                    Log in
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onSuccess={() => {}} />
    </>
  );
};
