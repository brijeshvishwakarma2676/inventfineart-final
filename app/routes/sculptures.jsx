import { useState } from 'react';
import { Seo } from '../components/Seo';
import { DesignGrid } from '../components/DesignGrid';
import { Contact } from '../components/sections/Contact';
import { LineHero, LineSpecs } from '../components/sections/LinePage';
import { sculpturesHeroArt } from '../data/art';
import { sculptures, sculpturesPage, sizes } from '../data/content';
import { designsFor } from '../data/designs';

const PX_PER_CM = 1.9; // the scale figure: 0–200 cm over 380 units

/** The scale beside the filter: a ruler, a 170 cm figure, and a sample piece that grows to the chosen size group. */
function ScaleFigure({ size }) {
  const objectScale = (PX_PER_CM * size.objectCm) / 360;
  const motion = 'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)';
  return (
    <svg viewBox="0 -10 240 400" className="lineart h-44 w-auto shrink-0 self-center text-ink sm:h-56 sm:self-auto lg:h-auto lg:w-full" aria-hidden="true">
      {/* the chosen range, highlighted on the ruler */}
      <rect
        x="14"
        y="0"
        width="12"
        height="1"
        className="fill-bronze/25! stroke-none!"
        style={{ transform: `translateY(${380 - PX_PER_CM * size.to}px) scaleY(${(size.to - size.from) * PX_PER_CM})`, transformOrigin: '0 0', transition: motion }}
      />
      <path d="M 20 380 L 20 0" strokeWidth="1" />
      {Array.from({ length: 9 }, (_, i) => {
        const y = 380 - 25 * i * PX_PER_CM;
        return (
          <g key={i}>
            <path d={`M ${i % 2 ? 16 : 12} ${y} L 28 ${y}`} strokeWidth="1" />
            {i % 2 === 0 && (
              <text x="34" y={y + 3} fontSize="10" className="opacity-60">
                {25 * i}
              </text>
            )}
          </g>
        );
      })}
      <path d="M 10 380 L 236 380" strokeWidth="1" />
      {/* a 170 cm figure */}
      <g transform="translate(100 380) scale(0.95)" strokeWidth="1.47">
        <ellipse cx="0" cy="-322" rx="12" ry="15" />
        <path d="M -11 -330 C -8 -342 8 -344 12 -332 C 16 -338 20 -330 14 -322" />
        <path d="M -5 -307 L -5 -297 M 5 -307 L 5 -297" />
        <path d="M -5 -297 C -18 -295 -32 -290 -36 -278 C -40 -250 -42 -215 -40 -180 C -44 -120 -52 -50 -60 0 L 60 0 C 50 -50 42 -120 38 -180 C 41 -215 40 -250 36 -278 C 32 -290 18 -295 5 -297" />
        <path d="M -40 -190 C -15 -184 15 -184 38 -190" />
        <path d="M -36 -276 C -47 -240 -51 -200 -48 -160 C -47 -150 -44 -146 -41 -150" />
        <path d="M 36 -276 C 47 -240 51 -200 48 -160 C 47 -150 44 -146 41 -150" />
        <path d="M -12 -184 C -18 -120 -14 -60 -20 0 M 14 -150 C 20 -100 24 -50 30 0" />
      </g>
      {/* a sample piece on a plinth, scaled to the size group */}
      <g style={{ transform: `translate(180px, 380px) scale(${objectScale})`, transition: motion }} strokeWidth="1.4" vectorEffect="non-scaling-stroke">
        <rect x="-40" y="-90" width="80" height="90" vectorEffect="non-scaling-stroke" />
        <path d="M -46 -90 L 46 -90" vectorEffect="non-scaling-stroke" />
        <path d="M -15 -90 C 50 -140 -60 -190 0 -225 C 60 -260 -40 -320 15 -360" vectorEffect="non-scaling-stroke" />
        <path d="M 15 -90 C -50 -140 60 -190 0 -225 C -60 -260 40 -320 -15 -360" vectorEffect="non-scaling-stroke" />
        <path d="M -4 -90 C 40 -130 -40 -185 0 -225 C 40 -265 -24 -320 6 -360" vectorEffect="non-scaling-stroke" />
        <path d="M -15 -360 L 15 -360" vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  );
}

export default function Sculptures() {
  const [sizeKey, setSizeKey] = useState('all');
  const size = sizes.find((s) => s.key === sizeKey);
  const shown = sculptures.filter((d) => sizeKey === 'all' || d.size === sizeKey);
  const total = designsFor('sculptures').length;

  return (
    <>
      <Seo
        title="Sculptures Collection | Invent Fine Art, Mumbai"
        description="Sculptures for residences, gardens, hotels, commercial spaces and architectural projects, made to your size and drawing by Invent Fine Art, Mumbai."
        image="gallery/sculptures/15"
      />

      <LineHero num="01" name="Sculptures" count={total} art={sculpturesHeroArt} />
      <LineSpecs intro={sculpturesPage.intro} accent={sculpturesPage.accent} specs={sculpturesPage.specs} />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[260px_minmax(0,1fr)]">
            <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
              <p className="label text-bronze">Filter by size</p>
              {/* Phones: the figure on top, then one row of chips with the chosen range under it.
                  640–1023px: figure beside the buttons. From 1024px: a sticky sidebar. */}
              <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:gap-6 lg:block">
                <ScaleFigure size={size} />
                <div className="flex flex-1 flex-col gap-2 lg:mt-6">
                  <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-col sm:overflow-visible sm:px-0" role="radiogroup" aria-label="Filter by size">
                  {sizes.map((s) => {
                    const on = s.key === sizeKey;
                    return (
                      <button
                        key={s.key}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        onClick={() => setSizeKey(s.key)}
                        className={`flex min-h-11 shrink-0 items-center justify-between gap-4 rounded-full border px-5 text-left text-sm whitespace-nowrap transition-colors ${
                          on ? 'border-ink bg-ink text-paper' : 'border-ink/15 hover:border-ink/50'
                        }`}
                      >
                        <span className="font-semibold">{s.label}</span>
                        <span className={`hidden sm:inline ${on ? 'text-paper/60' : 'text-stone'}`}>{s.range}</span>
                      </button>
                    );
                  })}
                  </div>
                  <p className="text-sm font-semibold sm:hidden" aria-hidden="true">
                    {size.label} <span className="font-normal text-stone">· {size.range}</span>
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-stone sm:mt-2">Figure shown at 170 cm. Size groups are indicative — every design can be made to your size.</p>
                </div>
              </div>
            </aside>
            <div className="min-w-0">
              <p className="mb-6 text-sm text-stone" aria-live="polite">
                Showing <span className="font-semibold text-ink tabular-nums">{shown.length}</span> of {sculptures.length} designs
              </p>
              <DesignGrid key={sizeKey} designs={shown} columns="sm:grid-cols-2 xl:grid-cols-3" sizes="(min-width: 1280px) 25vw, (min-width: 360px) 45vw, 100vw" />
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
