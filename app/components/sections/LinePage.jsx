import { useEffect, useState } from 'react';
import { useReducedMotion } from '../../motion/useReducedMotion';

/**
 * A product-line page header: a faint line drawing along the bottom that draws itself on load, the line number and
 * design count, and the name with "Collection" in italic. `strokeWidth`: for drawings drawn at a smaller scale.
 */
export function LineHero({ num, name, count, art, strokeWidth }) {
  const [started, setStarted] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const t = requestAnimationFrame(() => setStarted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-ink pt-[72px] text-paper">
      <div className="relative mx-auto flex min-h-[62svh] max-w-[1400px] flex-col items-center justify-center px-5 py-20 text-center md:px-10">
        <svg
          viewBox={art.viewBox}
          preserveAspectRatio="xMidYMax slice"
          className="lineart draw absolute inset-x-0 bottom-0 -z-10 h-[85%] w-full text-paper/30"
          strokeWidth={strokeWidth}
          aria-hidden="true"
          data-on={started || reduced ? '' : undefined}
          dangerouslySetInnerHTML={{ __html: art.svg }}
        />
        <p className="label hero-fade text-bronze-2">
          {num} — {count} designs
        </p>
        <h1 className="mt-5 font-display text-[clamp(3.2rem,9vw,8rem)] leading-[0.95] font-light">
          <span className="split-line">
            <span>{name}</span>
          </span>
          <span className="split-line">
            <span className="italic" style={{ '--i': 1 }}>
              Collection
            </span>
          </span>
        </h1>
      </div>
    </section>
  );
}

/** The line's headline sentence beside its spec list (suitable for, materials, sizes, finishes). */
export function LineSpecs({ intro, accent, specs }) {
  return (
    <section className="border-b border-ink/10">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-14 md:grid-cols-[1.2fr_2fr] md:px-10">
        <p className="font-display text-3xl leading-snug font-light md:text-4xl" data-reveal="up">
          {intro} <span className="italic">{accent}</span>
        </p>
        <dl className="grid gap-6 sm:grid-cols-2" data-reveal="up">
          {specs.map((s) => (
            <div key={s.label} className="border-t border-ink/15 pt-4">
              <dt className="label text-stone">{s.label}</dt>
              <dd className="mt-2 text-sm leading-relaxed">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
