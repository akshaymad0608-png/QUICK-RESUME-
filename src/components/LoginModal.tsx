import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X} from 'lucide-react';
import { signInWithGoogle, describeAuthError } from '../firebase';

import toast from 'react-hot-toast';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const LoginModal: FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  
  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      // On phones we hand off to the redirect flow: the page navigates to
      // Google now and the sign-in completes when it comes back, so there is
      // nothing to celebrate — or close — yet.
      if (!user) return;
      toast.success('Successfully logged in with Google!');
      onSuccess();
      onClose();
    } catch (error: any) {
      if (error?.code === 'auth/popup-closed-by-user') return; // user backed out
      console.error('Google sign-in failed', error);
      toast.error(describeAuthError(error));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8 text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h2>
              <p className="text-slate-500 mb-8">Sign in to save your resume and access premium features.</p>
              
              <div className="flex flex-col gap-4">
                <button
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center gap-3 w-full h-12 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors font-medium text-slate-700 shadow-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Continue with Google
                </button>
                              </div>
            </div>
            
            <div className="bg-slate-50 p-6 text-center border-t border-slate-100 text-sm text-slate-500">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
