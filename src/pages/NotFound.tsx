import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

/**
 * App.tsx had no catch-all route before this. Any URL that wasn't one of the
 * ten exact matches — a typo, an old link, a route removed in a later
 * change — hit <Routes> with nothing to render and left the visitor on a
 * blank page with no way back except editing the address bar.
 *
 * The static guide pages in /public are unaffected: Vercel serves those as
 * real files before this rewrite/route ever runs, so this only ever fires
 * for a URL that genuinely matches nothing on the site.
 */
const NotFound: FC = () => (
  <div className="min-h-screen bg-paper text-body flex flex-col font-sans selection:bg-pine selection:text-white">
    <Seo
      path="/404"
      title="Page Not Found | QuickResume"
      description="That page doesn't exist. Find your way back to the resume builder, templates or guides."
      noindex
    />
    <Navbar />

    <main className="flex-1 flex items-center justify-center px-6 py-32 text-center">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist mb-4">404</p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-ink mb-3">
          That page doesn't exist
        </h1>
        <p className="text-mist max-w-md mx-auto mb-8">
          The link might be old, or the address might have a typo. Here's where you probably meant to go:
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/" className="rounded-lg bg-pine px-5 py-2.5 font-semibold text-white hover:bg-pine-deep transition-colors">
            Go home
          </Link>
          <Link to="/templates" className="rounded-lg border border-line bg-card px-5 py-2.5 font-semibold text-ink hover:border-pine transition-colors">
            Browse templates
          </Link>
          <Link to="/resources" className="rounded-lg border border-line bg-card px-5 py-2.5 font-semibold text-ink hover:border-pine transition-colors">
            Read a guide
          </Link>
        </div>
      </div>
    </main>

    <Footer />
  </div>
);

export default NotFound;
