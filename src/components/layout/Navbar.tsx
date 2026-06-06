import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-white border-b border-[var(--color-border)] shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <i className="ti ti-file-description text-white text-xl"></i>
            </div>
            <span className="text-xl font-bold text-heading tracking-tight">QuickResume</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-body">
            <Link to="/start" className="hover:text-primary transition-colors duration-200">Resume Builder</Link>
            <Link to="/choose-template" className="hover:text-primary transition-colors duration-200">Templates</Link>
            <Link to="/ai-tools" className="hover:text-primary transition-colors duration-200">Career Tools</Link>
            <Link to="/cover-letter" className="hover:text-primary transition-colors duration-200">Cover Letters</Link>
          </nav>
        </div>
        
        <div className="hidden md:flex items-center gap-5">
          <button 
            className="bg-primary text-white border-none rounded-lg px-5 py-2.5 text-[15px] font-semibold hover:bg-primary-hover transition-colors shadow-sm"
            onClick={() => navigate('/start')}
          >
            Create Resume
          </button>
        </div>

        <button 
          className="md:hidden p-2 text-heading transition-colors" 
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-white md:hidden flex flex-col items-center justify-center p-6"
          >
            <div className="absolute top-0 left-0 right-0 h-[72px] px-6 flex justify-between items-center border-b border-[var(--color-border)]">
              <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                  <i className="ti ti-file-description text-white text-xl"></i>
                </div>
                <span className="text-xl font-bold tracking-tight text-heading">QuickResume</span>
              </Link>
              <button 
                className="p-2 text-heading" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex flex-col items-center w-full max-w-sm gap-6 text-xl font-semibold text-heading mt-20">
              <Link to="/choose-template" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors">Templates</Link>
              <Link to="/ai-tools" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors">Career Tools</Link>
              <Link to="/cover-letter" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors">Cover Letters</Link>
              <Link to="/start" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors">Resume Builder</Link>
              
              <div className="h-px bg-gray-200 w-full my-4"></div>
              
              <button 
                className="w-full mt-2 h-14 rounded-xl text-lg bg-primary text-white font-semibold" 
                onClick={() => { setMobileMenuOpen(false); navigate('/start'); }}
              >
                Create Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
