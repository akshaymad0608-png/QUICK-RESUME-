import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogoMark } from './layout/Navbar';

type Choice = { analytics: boolean; ads: boolean };
const KEY = 'qr_consent_v1';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Tell Google tags what the visitor allowed (Consent Mode v2). */
const applyConsent = (c: Choice) => {
  try {
    window.gtag?.('consent', 'update', {
      analytics_storage: c.analytics ? 'granted' : 'denied',
      ad_storage: c.ads ? 'granted' : 'denied',
      ad_user_data: c.ads ? 'granted' : 'denied',
      ad_personalization: c.ads ? 'granted' : 'denied',
    });
  } catch {
    /* tag blocked: nothing to update */
  }
};

const read = (): Choice | null => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Choice) : null;
  } catch {
    return null;
  }
};

export const CookieConsent: FC = () => {
  const [open, setOpen] = useState(false);
  const [configuring, setConfiguring] = useState(false);
  const [draft, setDraft] = useState<Choice>({ analytics: false, ads: false });

  useEffect(() => {
    const saved = read();
    if (saved) applyConsent(saved);
    else setOpen(true);
  }, []);

  const save = (c: Choice) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(c));
    } catch {
      /* private mode: choice lasts for this page view only */
    }
    applyConsent(c);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed z-[60] left-3 right-3 bottom-3 sm:left-6 sm:right-auto sm:bottom-6 sm:max-w-[560px] rounded-[28px] bg-ink text-paper shadow-[0_18px_50px_rgba(11,16,32,0.35)] p-4 sm:p-5"
    >
      <div className="flex items-start gap-4">
        <LogoMark className="w-10 h-10 shrink-0 hidden sm:block" />
        <div className="flex-1 min-w-0">
          <p className="font-display text-[17px] font-semibold leading-tight">Cookies</p>
          <p className="text-[13px] leading-[1.55] text-paper/80 mt-1">
            We use cookies for analytics and ads. Choose what you allow; the resume builder works either way.{' '}
            <Link to="/privacy" className="underline underline-offset-2 hover:text-white">Privacy policy</Link>
          </p>

          {configuring && (
            <div className="mt-3 space-y-2 text-[13px]">
              <label className="flex items-center justify-between gap-3 rounded-2xl bg-white/10 px-3.5 py-2.5">
                <span><strong className="font-semibold">Essential</strong><span className="block text-paper/65">Saves your draft and this choice. Always on.</span></span>
                <input type="checkbox" checked disabled className="h-4 w-4" aria-label="Essential cookies, always on" />
              </label>
              <label className="flex items-center justify-between gap-3 rounded-2xl bg-white/10 px-3.5 py-2.5 cursor-pointer">
                <span><strong className="font-semibold">Analytics</strong><span className="block text-paper/65">Google Analytics: which pages are used.</span></span>
                <input type="checkbox" checked={draft.analytics} onChange={e => setDraft({ ...draft, analytics: e.target.checked })} className="h-4 w-4" aria-label="Analytics cookies" />
              </label>
              <label className="flex items-center justify-between gap-3 rounded-2xl bg-white/10 px-3.5 py-2.5 cursor-pointer">
                <span><strong className="font-semibold">Advertising</strong><span className="block text-paper/65">Google AdSense: personalised ads.</span></span>
                <input type="checkbox" checked={draft.ads} onChange={e => setDraft({ ...draft, ads: e.target.checked })} className="h-4 w-4" aria-label="Advertising cookies" />
              </label>
            </div>
          )}

          <div className="mt-3.5 flex flex-wrap gap-2">
            <button
              onClick={() => save({ analytics: true, ads: true })}
              className="rounded-full bg-paper text-ink px-5 py-2 text-[13px] font-semibold hover:bg-white transition-colors"
            >
              Accept all
            </button>
            {configuring ? (
              <button
                onClick={() => save(draft)}
                className="rounded-full border border-white/40 px-5 py-2 text-[13px] font-semibold hover:bg-white/10 transition-colors"
              >
                Save choices
              </button>
            ) : (
              <>
                <button
                  onClick={() => setConfiguring(true)}
                  className="rounded-full border border-white/40 px-5 py-2 text-[13px] font-semibold hover:bg-white/10 transition-colors"
                >
                  Configure
                </button>
                <button
                  onClick={() => save({ analytics: false, ads: false })}
                  className="rounded-full px-3 py-2 text-[13px] font-semibold text-paper/75 hover:text-white transition-colors"
                >
                  Essential only
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
