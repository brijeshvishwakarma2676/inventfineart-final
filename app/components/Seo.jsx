import { useLocation } from 'react-router';
import { SITE_URL, site } from '../data/site';
import { imageSrc } from './Img';

/** Per-page head tags (React 19 hoists them into <head>) plus optional JSON-LD. */
export function Seo({ title, description, image = 'gallery/sculptures/15', noindex = false, jsonLd }) {
  const { pathname } = useLocation();
  const url = SITE_URL + (pathname === '/' ? '' : pathname.replace(/\/$/, ''));
  const og = SITE_URL + imageSrc(image, 1200);
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={og} />
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
    </>
  );
}
