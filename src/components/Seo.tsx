import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

const SITE = 'https://quickresume.business';
const OG_IMAGE = `${SITE}/og-image.png`;

export interface SeoProps {
  title: string;
  description: string;
  /** Path beginning with "/", e.g. "/templates". Home is "/". */
  path: string;
  /** Optional page-type override for Open Graph. */
  type?: 'website' | 'article';
  /** Optional JSON-LD structured data object(s) for this page. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Set true only on pages that should not be indexed (e.g. the builder). */
  noindex?: boolean;
}

/**
 * Single source of truth for a page's SEO. Every route renders one <Seo/>
 * so titles, canonicals, and social cards stay correct and unique.
 */
export const Seo: FC<SeoProps> = ({ title, description, path, type = 'website', jsonLd, noindex }) => {
  const url = `${SITE}${path === '/' ? '' : path}`;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="QuickResume" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {blocks.map((block, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(block)}</script>
      ))}
    </Helmet>
  );
};

export default Seo;
