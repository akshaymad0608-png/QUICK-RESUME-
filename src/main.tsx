import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import { completeGoogleRedirect } from './firebase'

// Finish a Google sign-in that used the redirect flow (phones). onAuthStateChanged
// restores the session by itself; this call is what makes a misconfiguration
// visible in the console instead of looking like nothing happened.
completeGoogleRedirect().catch((error) => {
  console.error('Google redirect sign-in did not complete', error);
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)
