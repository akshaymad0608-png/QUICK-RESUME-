import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId); // CRITICAL: The app will break without this line
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

/**
 * Phone browsers block or mishandle the OAuth popup often enough that using it
 * there is a coin flip — Chrome on Android and any in-app browser (Instagram,
 * Gmail, LinkedIn) commonly kill it outright, which surfaced as a flat
 * "Failed to log in with Google". On small screens we use the redirect flow
 * instead and finish the sign-in when the browser comes back.
 */
const prefersRedirect = (): boolean => {
  if (typeof window === 'undefined') return false;
  const narrow = window.matchMedia?.('(max-width: 820px)').matches ?? false;
  const mobileUA = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  return narrow || mobileUA;
};

/** Popup failures that are worth retrying as a redirect (not user cancellation). */
const RETRY_AS_REDIRECT = new Set([
  'auth/popup-blocked',
  'auth/cancelled-popup-request',
  'auth/operation-not-supported-in-this-environment',
  'auth/web-storage-unsupported',
]);

/**
 * Starts Google sign-in.
 * Returns the user on a completed popup sign-in, or `null` when a redirect was
 * started — in that case the page navigates away and `completeGoogleRedirect`
 * finishes the job on the next load.
 */
export const signInWithGoogle = async () => {
  if (prefersRedirect()) {
    await signInWithRedirect(auth, googleProvider);
    return null;
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    if (RETRY_AS_REDIRECT.has(error?.code)) {
      await signInWithRedirect(auth, googleProvider);
      return null;
    }
    throw error;
  }
};

/**
 * Completes a redirect sign-in. Call once on app start: `onAuthStateChanged`
 * restores the session on its own, but this is what surfaces configuration
 * errors (an unauthorised domain, for instance) instead of failing silently.
 */
export const completeGoogleRedirect = () => getRedirectResult(auth);

/** Turns a Firebase auth error into something a user can act on. */
export const describeAuthError = (error: any): string => {
  switch (error?.code) {
    case 'auth/popup-closed-by-user':
      return 'Sign-in was cancelled.';
    case 'auth/unauthorized-domain':
      return 'This site is not authorised for Google sign-in yet. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network problem — check your connection and try again.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a moment and try again.';
    case 'auth/account-exists-with-different-credential':
      return 'That email is already registered with a different sign-in method.';
    default:
      return 'Could not sign in with Google. Please try again.';
  }
};
