import { useState } from 'react';
import { Img } from './Img';
import { cardArt } from '../data/art';
import { whatsappLink } from '../data/site';

/**
 * A design card. With a line drawing: with a mouse, hover fades the photo and draws the piece with its indicative
 * dimensions (keyboard: focusing the card's buttons does the same); on touch screens, the "Tap for drawing" button
 * switches between photo and drawing. Without a drawing: the photo zooms and "Made to your size & finish" slides in.
 * Enquire opens WhatsApp with the design's name and code. In a narrow column (two cards across a phone) the card
 * turns compact through a container query: smaller overlay text, no material chip.
 */
export function DesignCard({ d, sizes = '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw' }) {
  const art = d.lineArt && cardArt[d.lineArt];
  const [showArt, setShowArt] = useState(false);

  return (
    <article className="group @container">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-ink text-paper transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-2 @max-[15rem]:rounded-xl">
        <Img
          id={d.image}
          alt={`${d.name}, ${d.material}, by Invent Fine Art (${d.code})`}
          sizes={sizes}
          className={`h-full w-full object-cover transition-[opacity,transform] duration-700 ease-[var(--ease-out-soft)] ${
            showArt ? 'scale-105 opacity-0' : 'opacity-90 group-hover:opacity-100'
          } ${art ? 'group-hover:scale-105 group-hover:!opacity-0 [@media(hover:hover)]:group-focus-within:scale-105 [@media(hover:hover)]:group-focus-within:!opacity-0' : 'group-hover:scale-[1.06]'}`}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.72),rgba(0,0,0,0)_38%,rgba(0,0,0,0)_75%,rgba(0,0,0,0.55))]" />
        {art && (
          <svg
            viewBox={art.viewBox}
            aria-hidden="true"
            data-on={showArt ? '' : undefined}
            className={`lineart draw draw-hover pointer-events-none absolute inset-0 h-full w-full px-6 pt-24 pb-12 text-paper transition-opacity duration-500 group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:opacity-100 @max-[15rem]:px-3 @max-[15rem]:pt-16 @max-[15rem]:pb-10 ${
              showArt ? 'opacity-100' : 'opacity-0'
            }`}
            dangerouslySetInnerHTML={{ __html: art.svg }}
          />
        )}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-5 @max-[15rem]:p-3">
          <div>
            <p className="max-w-[12ch] font-display text-[1.5rem] leading-[1.05] font-light @max-[15rem]:text-[1.1rem]">{d.name}</p>
            <p className="mt-1.5 text-[0.65rem] tracking-[0.2em] text-paper/60 @max-[15rem]:text-[0.55rem] @max-[15rem]:tracking-[0.12em]">{d.code}</p>
          </div>
          <span className="rounded-full border border-white/25 bg-black/30 px-3 py-1 text-[0.65rem] tracking-wide whitespace-nowrap text-paper/85 backdrop-blur @max-[15rem]:hidden">
            {d.material.split(' · ')[0]}
          </span>
        </div>
        {art ? (
          <>
            {/* Mouse: a label. Touch (and keyboard): a button that switches photo and drawing. */}
            <p className="absolute bottom-4 left-5 hidden items-center gap-2 text-[0.65rem] tracking-[0.18em] text-paper/70 uppercase [@media(hover:hover)]:flex">
              <span className="inline-block h-px w-6 bg-current" />
              <span className="group-hover:hidden group-focus-within:hidden">Hover for drawing</span>
              <span className="hidden group-hover:inline group-focus-within:inline">Indicative dimensions</span>
            </p>
            <button
              type="button"
              aria-pressed={showArt}
              onClick={() => setShowArt((v) => !v)}
              className="absolute bottom-1 left-2 flex min-h-11 items-center gap-2 px-3 text-[0.65rem] tracking-[0.18em] text-paper/80 uppercase [@media(hover:hover)]:sr-only [@media(hover:hover)]:focus:not-sr-only @max-[15rem]:left-0 @max-[15rem]:text-[0.55rem] @max-[15rem]:tracking-[0.1em]"
            >
              <span className="inline-block h-px w-6 bg-current @max-[15rem]:w-3" />
              {showArt ? 'Show photo' : 'Tap for drawing'}
            </button>
          </>
        ) : (
          <p className="absolute bottom-4 left-5 translate-y-2 text-[0.65rem] tracking-[0.18em] text-paper/80 uppercase opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 @max-[15rem]:hidden">
            Made to your size &amp; finish
          </p>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4 px-1 @max-[15rem]:mt-2 @max-[15rem]:flex-col @max-[15rem]:gap-0 @max-[15rem]:px-0.5">
        <div>
          <h3 className="text-[0.95rem] font-semibold @max-[15rem]:text-[0.85rem] @max-[15rem]:leading-snug">{d.name}</h3>
          <p className="mt-0.5 text-sm text-stone @max-[15rem]:text-xs">{d.material}</p>
        </div>
        <a
          href={whatsappLink(`Hello Invent Fine Art, I'd like to enquire about ${d.name} (${d.code}).`)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Enquire about ${d.name} (${d.code}) on WhatsApp`}
          className="-my-3 inline-flex min-h-11 shrink-0 items-center text-xs font-semibold tracking-wide underline decoration-1 underline-offset-4 transition-colors hover:text-bronze @max-[15rem]:my-0"
        >
          Enquire
        </a>
      </div>
    </article>
  );
}
