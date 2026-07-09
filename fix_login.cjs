const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.tsx', 'utf8');

const useE = `
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Validate origin is from AI Studio preview or localhost
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost')) {
        return;
      }
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        toast.success('Successfully logged in with LinkedIn!');
        onSuccess();
        onClose();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onClose, onSuccess]);
`;
code = code.replace(useE, "");

const linkedInBtn = `
                <button
                  onClick={handleLinkedInLogin}
                  className="flex items-center justify-center gap-3 w-full h-12 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-xl transition-colors font-medium shadow-sm"
                >
                  <Linkedin className="w-5 h-5" />
                  Continue with LinkedIn
                </button>
`;
code = code.replace(linkedInBtn, "");

const linkedInFunc = `
  const handleLinkedInLogin = async () => {
    // For now, this is a placeholder as Firebase doesn't natively support LinkedIn 
    // without a custom provider setup, but we'll simulate the UX or use OAuth.
    // In a real app we'd redirect to our /api/auth/linkedin/url.
    try {
      const response = await fetch('/api/auth/linkedin/url');
      if (!response.ok) throw new Error('Failed to fetch LinkedIn URL');
      const data = await response.json();
      
      const authWindow = window.open(data.url, 'linkedin_oauth', 'width=600,height=700');
      if (!authWindow) {
        toast.error('Please allow popups to log in with LinkedIn');
      }
    } catch {
      toast.error('LinkedIn login is currently being set up. Please use Google for now.');
    }
  };
`;
code = code.replace(linkedInFunc, "");

code = code.replace(", Linkedin } from 'lucide-react'", "} from 'lucide-react'");
code = code.replace("import { useEffect } from 'react';", "");

fs.writeFileSync('src/components/LoginModal.tsx', code);
