import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { Img } from '../Img';
import { collections } from '../../data/content';
import { useReducedMotion } from '../../motion/useReducedMotion';

/**
 * One product line: on hover the card widens (desktop) and its three photos take turns. Touch screens have no
 * hover, so there the photos take turns by themselves while the card is on screen (not under reduced motion).
 */
function CollectionCard({ c, eager }) {
  const [shown, setShown] = useState(0);
  const timer = useRef(null);
  const card = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !window.matchMedia('(hover: none)').matches) return;
    let t = null;
    const io = new IntersectionObserver(
      ([e]) => {
        clearInterval(t);
        if (e.isIntersecting) t = setInterval(() => setShown((s) => (s + 1) % c.images.length), 2600);
      },
      { threshold: 0.6 },
    );
    io.observe(card.current);
    return () => {
      io.disconnect();
      clearInterval(t);
    };
  }, [reduced, c.images.length]);
  const start = (e) => {
    if (e?.pointerType === 'touch') return;
    clearInterval(timer.current);
    timer.current = setInterval(() => setShown((s) => (s + 1) % c.images.length), 1100);
  };
  const stop = () => {
    clearInterval(timer.current);
    setShown(0);
  };
  useEffect(() => () => clearInterval(timer.current), []);

  return (
    <Link
      ref={card}
      to={c.to ?? '/#collections'}
      onPointerEnter={start}
      onPointerLeave={(e) => e.pointerType !== 'touch' && stop()}
      onFocus={start}
      onBlur={stop}
      className="group relative isolate block aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-ink text-paper transition-[flex-grow] duration-700 ease-[var(--ease-out-soft)] sm:aspect-[16/9] lg:aspect-auto lg:flex-1 lg:hover:flex-[2.1]"
    >
      {c.images.map((id, i) => (
        <Img
          key={id}
          id={id}
          alt={i === 0 ? `${c.name} by Invent Fine Art` : ''}
          priority={eager && i === 0}
          sizes="(min-width: 1024px) 40vw, 100vw"
          className={`absolute inset-0 -z-10 h-full w-full object-cover transition-[opacity,transform] duration-[1400ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.04] ${i === shown ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/10 to-black/0" />
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <div className="flex items-baseline justify-between gap-3 border-t border-white/25 pt-4">
          <span className="label text-paper/60">{c.num}</span>
          <span className="text-[0.7rem] tabular-nums text-paper/60">{c.count} designs</span>
        </div>
        <h3 className="mt-3 font-display text-3xl leading-none font-light md:text-[2.1rem]">{c.name}</h3>
        <p className="mt-2 max-w-xs text-sm text-paper/70 transition-all duration-500 lg:max-h-0 lg:translate-y-3 lg:overflow-hidden lg:opacity-0 lg:group-hover:max-h-20 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
          {c.tagline} <span aria-hidden="true">→</span>
        </p>
      </div>
    </Link>
  );
}

/** "What we make": the five lines side by side, each card widening on hover. */
export function Collections() {
  return (
    <section id="collections" className="scroll-mt-20 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end" data-reveal="up">
          <div>
            <p className="label text-bronze">What we make</p>
            <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02] font-light">
              For façades, gardens and <span className="italic">everything in between.</span>
            </h2>
          </div>
          <p className="max-w-sm text-ink/65">Five product lines, from statement sculptures to architectural GRC, each made to your design, size and finish.</p>
        </div>
        <div className="flex flex-col gap-3 lg:h-[min(78vh,760px)] lg:min-h-[560px] lg:flex-row" data-reveal="up">
          {collections.map((c, i) => (
            <CollectionCard key={c.slug} c={c} eager={i < 2} />
          ))}
        </div>
      </div>
    </section>
  );
}
