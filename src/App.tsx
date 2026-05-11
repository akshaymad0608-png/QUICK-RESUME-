// === FILE: src/App.tsx ===
import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { motion, AnimatePresence } from "motion/react";
import { Moon, Sun, Menu, X, ArrowRight, LayoutTemplate, Briefcase, FileText, Target, Brain, FileCheck } from "lucide-react";
import Logo from "./components/Logo";
import Home from "./components/Home";
import BuilderView from "./components/BuilderView";

// Navbar Component
const Navbar = ({ isDark, toggleTheme }: { isDark: boolean, toggleTheme: () => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  // Navigation Items
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Templates", path: "/builder" },
    { name: "Pricing", path: "/pricing" }
  ];

  const toolsDropdown = [
    { icon: FileText, title: "Resume Builder", path: "/builder" },
    { icon: Target, title: "ATS Checker", path: "/builder" },
    { icon: Brain, title: "Interview Prep", path: "/builder" },
    { icon: FileCheck, title: "Cover Letters", path: "/builder" }
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-[var(--color-bg)]/80 backdrop-blur-xl border-b border-[var(--color-border)] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo onClick={() => navigate("/")} />
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 bg-[var(--color-bg-2)] rounded-full px-2 py-1.5 border border-[var(--color-border)]">
            {navItems.map((item, i) => (
              <React.Fragment key={item.name}>
                {i === 1 && (
                  <div className="relative group">
                    <button 
                      className="px-4 py-2 text-sm font-semibold rounded-full text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors flex items-center gap-1"
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      Resume Tools <span className="text-[10px]">▼</span>
                    </button>
                    {dropdownOpen && (
                      <div 
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[400px]"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                      >
                        <div className="bg-[var(--color-bg-2)] border border-[var(--color-border)] rounded-2xl shadow-xl p-4 grid grid-cols-2 gap-2">
                          {toolsDropdown.map((tool, j) => (
                            <button 
                              key={j} 
                              onClick={() => { navigate(tool.path); setDropdownOpen(false); }}
                              className="flex items-start gap-3 p-3 rounded-xl hover:bg-[var(--color-bg-3)] transition-colors text-left"
                            >
                              <tool.icon size={18} className="text-[var(--color-primary)] mt-0.5" />
                              <div>
                                <div className="text-[13px] font-bold text-[var(--text-main)]">{tool.title}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <button 
                  onClick={() => navigate(item.path)}
                  className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors relative ${location.pathname === item.path ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
                >
                  {location.pathname === item.path && (
                    <motion.div layoutId="nav-pill" className="absolute inset-0 bg-[var(--color-bg-3)] rounded-full -z-10" />
                  )}
                  {item.name}
                </button>
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleTheme} 
              className="p-2.5 rounded-full text-[var(--text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-colors"
              aria-label="Toggle Theme"
              title="Toggle Theme"
            >
              {isDark ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {isHome && (
              <button 
                onClick={() => navigate("/builder")}
                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-sm font-bold shadow-md shadow-[var(--color-primary)]/20 transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Open Builder <ArrowRight size={16} />
              </button>
            )}

            {!isHome && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-bold text-xs border border-[var(--color-accent)]/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                <Target size={14} /> ATS Builder
              </div>
            )}

            <button 
              className="md:hidden p-2 text-[var(--text-main)]" 
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[var(--color-bg)] flex flex-col"
          >
            <div className="h-16 flex items-center justify-between px-6 border-b border-[var(--color-border)]">
              <Logo />
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-[var(--text-main)]">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-8 space-y-2">
              {navItems.map(item => (
                <button 
                  key={item.name}
                  onClick={() => { navigate(item.path); setIsMobileMenuOpen(false); }}
                  className="w-full text-left text-2xl font-bold p-4 rounded-xl hover:bg-[var(--color-bg-2)] text-[var(--text-main)]"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-8 mt-8 border-t border-[var(--color-border)]">
                <p className="text-[var(--text-subtle)] text-sm font-bold uppercase tracking-widest mb-4">Resume Tools</p>
                {toolsDropdown.map((tool, j) => (
                  <button 
                    key={j} 
                    onClick={() => { navigate(tool.path); setIsMobileMenuOpen(false); }}
                    className="w-full flex items-center gap-4 text-left font-bold p-4 rounded-xl hover:bg-[var(--color-bg-2)] text-[var(--text-main)]"
                  >
                    <tool.icon size={20} className="text-[var(--color-primary)]" />
                    {tool.title}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-6 border-t border-[var(--color-border)]">
              <button 
                 onClick={() => { navigate("/builder"); setIsMobileMenuOpen(false); }}
                 className="w-full py-4 rounded-xl bg-[var(--color-primary)] text-white font-bold text-lg"
              >
                Open Builder
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const AppContent = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') !== 'light';
  });

  useEffect(() => {
    // Apply dark mode on initial load
    document.body.classList.remove('theme-light');
  }, []);

  useEffect(() => {
    if (isDark) {
      document.body.classList.remove('theme-light');
    } else {
      document.body.classList.add('theme-light');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    // Add VITE_GA_MEASUREMENT_ID script load if available. Handled in main.tsx typically, but keeping app side clean.
  }, []);

  return (
    <div className="w-full min-h-screen bg-[var(--color-bg)] text-[var(--text-main)] flex flex-col font-sans">
      <Navbar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
      
      <main className="flex-1 w-full flex flex-col pt-16 relative">
        <Suspense fallback={<div className="flex-1 flex items-center justify-center text-[var(--color-primary)]"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)]"></div></div>}>
          <Routes>
            <Route path="/" element={<Home onBuild={() => window.location.href = '/builder'} onPreviewTemplates={() => window.location.href = '/builder'} />} />
            <Route path="/builder" element={<BuilderView />} />
            <Route path="*" element={<Home onBuild={() => window.location.href = '/builder'} />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </HelmetProvider>
  );
}
