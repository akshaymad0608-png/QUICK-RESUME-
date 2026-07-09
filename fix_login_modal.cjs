const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.tsx', 'utf8');

if (!code.includes('useEffect(() => {')) {
  code = code.replace("import { signInWithGoogle } from '../firebase';", "import { signInWithGoogle } from '../firebase';\nimport { useEffect } from 'react';");
  
  const useEffectCode = `
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
  
  code = code.replace("const handleGoogleLogin", useEffectCode + "\n  const handleGoogleLogin");
  fs.writeFileSync('src/components/LoginModal.tsx', code);
  console.log('Fixed LoginModal useEffect');
}
