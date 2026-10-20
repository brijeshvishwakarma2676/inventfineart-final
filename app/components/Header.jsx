import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { Logo } from './Logo';
import { whatsappLink } from '../data/site';

export const nav = [
  { label: 'Products', to: '/#collections' },
  { label: 'Sculptures', to: '/sculptures' },
  { label: 'Process', to: '/#process' },
  { label: 'Clients', to: '/#clients' },
  { label: 'Contact', to: '/#contact' },
];
export const quoteLink = whatsappLink('Hello Invent Fine Art, I would like a quote for your products.');

/** Fixed ink bar: logo · five links · Get a Quote (WhatsApp). Hides on scroll down; the phone menu folds open below. */
export function Header() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 400 && y > lastY.current + 2);
      if (y < lastY.current - 2) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the phone menu after any navigation
  const [seen, setSeen] = useState(pathname + hash);
  if (seen !== pathname + hash) {
    setSeen(pathname + hash);
    setOpen(false);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-ink/95 text-paper backdrop-blur transition-transform duration-500 ease-[var(--ease-out-soft)] ${hidden && !open ? '-translate-y-full' : ''}`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 md:px-10">
        <Link to="/" aria-label="Invent Fine Art, home">
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-9 text-[0.82rem] font-medium tracking-wide lg:flex">
          {nav.map((n) =>
            n.to.startsWith('/#') ? (
              <Link key={n.to} to={n.to} className="nav-link opacity-80 transition-opacity hover:opacity-100">
                {n.label}
              </Link>
            ) : (
              <NavLink key={n.to} to={n.to} className="nav-link opacity-80 transition-opacity hover:opacity-100 aria-[current=page]:opacity-100">
                {n.label}
              </NavLink>
            ),
          )}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={quoteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-bronze px-5 py-2.5 text-[0.8rem] font-semibold tracking-wide text-white transition-colors hover:bg-bronze-2 sm:inline-block"
          >
            Get a Quote
          </a>
          <button type="button" className="relative h-10 w-10 lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <span className={`absolute left-2 right-2 h-px bg-current transition-transform duration-300 ${open ? 'top-[19px] rotate-45' : 'top-[15px]'}`} />
            <span className={`absolute left-2 right-2 h-px bg-current transition-transform duration-300 ${open ? 'top-[19px] -rotate-45' : 'top-[24px]'}`} />
          </button>
        </div>
      </div>
      <div className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-[var(--ease-out-soft)] lg:hidden ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <nav aria-label="Mobile" className="min-h-0" inert={!open}>
          <ul className="flex flex-col gap-1 px-5 pb-8 pt-2">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="block py-3 font-display text-3xl font-light">
                  {n.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <a href={quoteLink} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full bg-bronze px-6 py-3 text-sm font-semibold text-white">
                Get a Quote
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
