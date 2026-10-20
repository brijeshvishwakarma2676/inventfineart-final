import { useEffect, useRef } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, useLocation } from 'react-router';
import '@fontsource/cormorant-garamond/latin-300.css';
import '@fontsource/cormorant-garamond/latin-300-italic.css';
import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/latin-400-italic.css';
import '@fontsource-variable/manrope/index.css';
import cormorantLight from '@fontsource/cormorant-garamond/files/cormorant-garamond-latin-300-normal.woff2?url';
import cormorantLightItalic from '@fontsource/cormorant-garamond/files/cormorant-garamond-latin-300-italic.woff2?url';
import './styles/global.css';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { MotionProvider } from './motion/MotionProvider';
import { useReveal } from './motion/useReveal';
import { useMotion } from './motion/motion';

// The hero headline's fonts are preloaded; everything else loads as needed.
export const links = () => [
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  { rel: 'preload', href: cormorantLight, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
  { rel: 'preload', href: cormorantLightItalic, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
];

export function Layout({ children }) {
  return (
    <html lang="en-IN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0b0b0a" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { pathname, hash, key } = useLocation();
  const scope = useRef(null);
  useReveal(scope, pathname);
  const motion = useMotion();

  // In-page links (/#process, /#contact…): scroll to the section, with Lenis when it is running.
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!el) return;
    // An absolute target: Lenis's own idea of the scroll position can lag behind the router's native jump.
    const t = setTimeout(() => {
      const y = el.getBoundingClientRect().top + window.scrollY - 72;
      if (motion) motion.lenis.scrollTo(y);
      else window.scrollTo({ top: y, behavior: 'smooth' });
    }, 50);
    return () => clearTimeout(t);
  }, [hash, key, motion]);

  return (
    <MotionProvider>
      <a href="#main" className="sr-only z-[80] rounded-full bg-ink px-4 py-3 text-sm text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <Header />
      <div ref={scope}>
        <main id="main">
          <Outlet />
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
    </MotionProvider>
  );
}

export function ErrorBoundary({ error }) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-[1400px] flex-col items-start justify-center gap-4 px-5 py-24 md:px-10">
      <title>{notFound ? 'Page not found | Invent Fine Art' : 'Something went wrong | Invent Fine Art'}</title>
      <p className="label text-bronze">Invent Fine Art</p>
      <h1 className="font-display text-5xl font-light">{notFound ? 'Page not found' : 'Something went wrong'}</h1>
      <a href="/" className="border-b border-current pb-1 text-sm font-semibold">
        Back to the home page
      </a>
    </main>
  );
}
