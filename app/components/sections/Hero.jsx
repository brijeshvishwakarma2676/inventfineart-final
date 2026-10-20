import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { heroScenes } from '../../data/art';
import { hero } from '../../data/content';
import { quoteLink } from '../Header';
import { useReducedMotion } from '../../motion/useReducedMotion';

const SCENE_MS = 6700;

/**
 * Home hero: the headline slides up line by line (CSS), and on the right three line drawings take turns, each
 * drawing itself (CSS: pathLength dashes, global.css .draw), holding, then fading as the next one draws.
 * A strip at the bottom shows 01 / 03, one progress bar per drawing and its name. Reduced motion: no cycling.
 */
export function Hero() {
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const reduced = useReducedMotion();

  // Draw the first scene once the page is running (it starts undrawn so it can draw in, as in the demo).
  useEffect(() => {
    const t = requestAnimationFrame(() => setStarted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % heroScenes.length), SCENE_MS);
    return () => clearTimeout(t);
  }, [index, reduced]);

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink pt-[72px] text-paper">
      <div className="mx-auto grid w-full max-w-[1400px] flex-1 items-center gap-6 px-5 pt-10 pb-24 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:pt-0">
        <div className="relative z-10">
          <p className="label hero-fade text-bronze-2">{hero.eyebrow}</p>
          <h1 className="mt-6 font-display text-[clamp(3rem,7.4vw,6.6rem)] leading-[0.98] font-light tracking-[-0.01em]">
            {hero.lines.map((l, i) => (
              <span key={l} className="split-line">
                <span style={{ '--i': i }}>{l}</span>
              </span>
            ))}
            <span className="split-line">
              <span className="text-bronze-2 italic" style={{ '--i': hero.lines.length }}>
                {hero.accent}
              </span>
            </span>
          </h1>
          <p className="hero-fade mt-7 max-w-md text-[0.98rem] leading-relaxed text-paper/65" style={{ '--i': 1 }}>
            {hero.text}
          </p>
          <div className="hero-fade mt-9 flex flex-wrap gap-3" style={{ '--i': 2 }}>
            <Link to="/#collections" className="rounded-full bg-paper px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-bronze-2">
              Explore products
            </Link>
            <a href={quoteLink} target="_blank" rel="noopener noreferrer" className="rounded-full border border-paper/30 px-7 py-3.5 text-sm font-semibold transition-colors hover:border-paper">
              Get a quote
            </a>
          </div>
        </div>
        <div className="relative aspect-[780/440] w-full lg:-mr-10" aria-hidden="true">
          {heroScenes.map((s, i) => {
            const on = i === index && (started || reduced);
            return (
              <svg
                key={s.label}
                viewBox={s.viewBox}
                className={`lineart draw absolute inset-0 h-full w-full text-paper transition-opacity duration-[900ms] ${i === index ? 'opacity-100' : 'opacity-0'}`}
                data-on={on ? '' : undefined}
                dangerouslySetInnerHTML={{ __html: s.svg }}
              />
            );
          })}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] items-center gap-6 px-5 py-5 text-xs md:px-10">
          <span className="tabular-nums text-paper/50">
            {String(index + 1).padStart(2, '0')} / {String(heroScenes.length).padStart(2, '0')}
          </span>
          <div className="flex flex-1 gap-2">
            {heroScenes.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${s.label}`}
                aria-current={i === index}
                className="group flex h-6 flex-1 items-center"
              >
                <span className="relative block h-px w-full overflow-hidden bg-white/15">
                  {i === index && (
                    <span
                      key={`${index}-${reduced}`}
                      className={`absolute inset-y-0 left-0 bg-paper ${reduced ? 'w-full' : 'animate-[progress_6.7s_linear_forwards]'}`}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
          <span className="label min-w-[11rem] pr-16 text-right text-paper/70 md:pr-20">{heroScenes[index].label}</span>
        </div>
      </div>
    </section>
  );
}
