import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { Logo } from './Logo';
import { Img } from './Img';
import { collections } from '../data/content';
import { whatsappLink } from '../data/site';

export const nav = [
  { label: 'Process', to: '/#process' },
  { label: 'Clients', to: '/#clients' },
  { label: 'Contact', to: '/#contact' },
];
export const quoteLink = whatsappLink('Hello Invent Fine Art, I would like a quote for your products.');

/**
 * Fixed ink bar: logo · Products ▾ · Process · Clients · Contact · Get a Quote (WhatsApp). Hides on scroll down.
 * Products opens a panel with the five lines (hover with a mouse; click, Enter or Space otherwise; Esc or a click
 * outside closes it). On phones the menu folds open below the bar, with the five lines under Products.
 */
export function Header() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false); // phone menu
  const [products, setProducts] = useState(false); // desktop dropdown
  const [phoneProducts, setPhoneProducts] = useState(true);
  const lastY = useRef(0);
  const timer = useRef(null);
  const root = useRef(null);
  const trigger = useRef(null);
  const { pathname, hash } = useLocation();
  const onLinePage = collections.some((c) => c.to === pathname);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const hide = y > 400 && y > lastY.current + 2;
      setHidden(hide);
      if (hide) setProducts(false);
      if (y < lastY.current - 2) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!products) return;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setProducts(false);
      if (root.current?.contains(document.activeElement)) trigger.current?.focus();
    };
    const onDown = (e) => !root.current?.contains(e.target) && setProducts(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [products]);

  // Close both menus after any navigation
  const [seen, setSeen] = useState(pathname + hash);
  if (seen !== pathname + hash) {
    setSeen(pathname + hash);
    setOpen(false);
    setProducts(false);
  }

  const hoverOpen = (e) => {
    if (e.pointerType !== 'mouse') return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setProducts(true), 80);
  };
  const hoverClose = (e) => {
    if (e.pointerType !== 'mouse') return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setProducts(false), 180);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-ink/95 text-paper backdrop-blur transition-transform duration-500 ease-[var(--ease-out-soft)] ${hidden && !open ? '-translate-y-full' : ''}`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 md:px-10">
        <Link to="/" aria-label="Invent Fine Art, home">
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden h-full items-center gap-9 text-[0.82rem] font-medium tracking-wide lg:flex">
          {/* Products: trigger and panel share one wrapper, so moving the pointer into the panel keeps it open */}
          <div ref={root} className="flex h-full items-center" onPointerEnter={hoverOpen} onPointerLeave={hoverClose}>
            <button
              ref={trigger}
              type="button"
              aria-expanded={products}
              aria-controls="products-menu"
              onClick={() => setProducts((p) => !p)}
              className={`nav-link inline-flex items-center gap-1.5 transition-opacity hover:opacity-100 ${products || onLinePage ? 'opacity-100' : 'opacity-80'}`}
              aria-current={onLinePage ? 'page' : undefined}
            >
              Products
              <svg viewBox="0 0 10 6" className={`h-1.5 w-2.5 transition-transform duration-300 ${products ? 'rotate-180' : ''}`} aria-hidden="true">
                <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>
            <div
              id="products-menu"
              inert={!products}
              className={`absolute inset-x-0 top-full border-t border-white/10 bg-ink/95 backdrop-blur transition-all duration-300 ease-[var(--ease-out-soft)] ${
                products ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
              }`}
            >
              <div className="mx-auto grid max-w-[1400px] grid-cols-[1fr_4fr] gap-10 px-10 py-10">
                <div className="flex flex-col justify-between gap-6 border-r border-white/10 pr-10">
                  <div>
                    <p className="label text-bronze-2">Our products</p>
                    <p className="mt-4 font-display text-3xl leading-tight font-light">
                      Five lines, made to <span className="italic">your design.</span>
                    </p>
                  </div>
                  <Link to="/#collections" className="group flex items-center gap-3 text-sm font-semibold">
                    <span className="border-b border-current pb-1">All products</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
                <ul className="grid grid-cols-5 gap-4">
                  {collections.map((c) => (
                    <li key={c.slug}>
                      <NavLink to={c.to} className="group block">
                        <span className="block aspect-[4/5] overflow-hidden rounded-xl bg-white/5">
                          <Img
                            id={c.images[0]}
                            alt=""
                            sizes="220px"
                            className="h-full w-full object-cover opacity-85 transition-[opacity,transform] duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105 group-hover:opacity-100"
                          />
                        </span>
                        <span className="mt-3 flex items-baseline justify-between gap-2">
                          <span className="label text-paper/50">{c.num}</span>
                          <span className="text-[0.7rem] text-paper/50 tabular-nums">{c.count} designs</span>
                        </span>
                        <span className="mt-1 block font-display text-2xl leading-tight font-light group-hover:text-bronze-2 group-aria-[current=page]:text-bronze-2">
                          {c.name}
                        </span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="nav-link opacity-80 transition-opacity hover:opacity-100">
              {n.label}
            </Link>
          ))}
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
        <nav aria-label="Mobile" className="min-h-0 max-h-[calc(100svh-72px)] overflow-y-auto" inert={!open}>
          <ul className="flex flex-col gap-1 px-5 pt-2 pb-8">
            <li>
              <button
                type="button"
                aria-expanded={phoneProducts}
                onClick={() => setPhoneProducts((p) => !p)}
                className="flex w-full items-center justify-between py-3 font-display text-3xl font-light"
              >
                Products
                <span className={`text-xl transition-transform duration-300 ${phoneProducts ? 'rotate-45' : ''}`} aria-hidden="true">
                  +
                </span>
              </button>
              <ul className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ${phoneProducts ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <li className="min-h-0">
                  <ul className="mb-2 border-l border-white/15 pl-4">
                    {collections.map((c) => (
                      <li key={c.slug}>
                        <NavLink to={c.to} className="flex items-baseline gap-3 py-2 text-lg aria-[current=page]:text-bronze-2">
                          <span className="label text-paper/40">{c.num}</span>
                          {c.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </li>
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
