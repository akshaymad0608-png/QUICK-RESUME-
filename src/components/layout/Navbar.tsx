import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Feather, LogOut } from 'lucide-react';
import { LoginModal } from '../LoginModal';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };


  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div 
              className="w-9 h-9 bg-gradient-to-tr from-slate-900 to-slate-700 rounded-lg shadow-md border border-slate-800 flex items-center justify-center transition-transform duration-300"
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Feather className="text-white w-5 h-5" />
            </motion.div>
            <span className="text-xl font-bold text-white tracking-tight">QuickResume</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            <Link to="/start" className="hover:text-white transition-colors duration-200">Builder</Link>
            <Link to="/choose-template" className="hover:text-white transition-colors duration-200">Templates</Link>
            <Link to="/ai-tools" className="hover:text-white transition-colors duration-200">AI Tools</Link>
          </nav>
        </div>
        
        
        <div className="hidden md:flex items-center gap-5">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-slate-300 text-sm font-medium">{user.displayName || 'User'}</span>
              <button 
                onClick={handleLogout}
                className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-800"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button 
              className="text-white hover:text-indigo-400 font-medium text-sm transition-colors"
              onClick={() => setIsLoginModalOpen(true)}
            >
              Log in
            </button>
          )}
          <button 
            className="bg-indigo-600 text-white border-none rounded-md px-5 py-2.5 text-sm font-semibold hover:bg-indigo-700 transition-colors"
            onClick={() => navigate('/start')}
          >
            Create Resume
          </button>
        </div>


        <button 
          className="md:hidden p-2 text-white transition-colors" 
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
            className="fixed inset-0 z-50 bg-slate-950 md:hidden flex flex-col items-center justify-center p-6"
          >
            <div className="absolute top-0 left-0 right-0 h-[72px] px-6 flex justify-between items-center border-b border-slate-800 bg-slate-950">
              <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <motion.div 
                  className="w-9 h-9 bg-gradient-to-tr from-slate-900 to-slate-700 rounded-lg shadow-md border border-slate-800 flex items-center justify-center"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Feather className="text-white w-5 h-5" />
                </motion.div>
                <span className="text-xl font-bold tracking-tight text-white">QuickResume</span>
              </Link>
              <button 
                className="p-2 text-slate-500 hover:text-white transition-colors" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex flex-col items-center w-full max-w-sm gap-6 text-xl font-semibold text-slate-400 mt-20">
              <Link to="/choose-template" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Templates</Link>
              <Link to="/ai-tools" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Career Tools</Link>
              <Link to="/cover-letter" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Cover Letters</Link>
              <Link to="/start" onClick={() => setMobileMenuOpen(false)} className="hover:text-white transition-colors">Resume Builder</Link>
              
              <div className="h-px bg-white/10 w-full my-4"></div>
              
              <button 
                className="w-full mt-2 h-14 rounded-lg text-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors" 
                onClick={() => { setMobileMenuOpen(false); navigate('/start'); }}
              >
                Create Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onSuccess={() => {}} 
      />
    </header>
  );
};

