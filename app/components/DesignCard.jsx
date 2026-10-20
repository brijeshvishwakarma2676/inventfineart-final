import { Img } from './Img';
import { cardArt } from '../data/art';
import { whatsappLink } from '../data/site';

/**
 * A design card. With a line drawing: hover or focus fades the photo and draws the piece with its indicative
 * dimensions (keyboard: focusing Enquire does the same). Without: the photo zooms and "Made to your size & finish"
 * slides in. Enquire opens WhatsApp with the design's name and code.
 */
export function DesignCard({ d, sizes = '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw' }) {
  const art = d.lineArt && cardArt[d.lineArt];
  return (
    <article className="group">
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-ink text-paper transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-2"
      >
        <Img
          id={d.image}
          alt={`${d.name}, ${d.material}, by Invent Fine Art (${d.code})`}
          sizes={sizes}
          className={`h-full w-full object-cover opacity-90 transition-[opacity,transform] duration-700 ease-[var(--ease-out-soft)] group-hover:opacity-100 ${
            art ? 'group-hover:scale-105 group-hover:!opacity-0 group-focus-within:scale-105 group-focus-within:!opacity-0' : 'group-hover:scale-[1.06]'
          }`}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.72),rgba(0,0,0,0)_38%,rgba(0,0,0,0)_75%,rgba(0,0,0,0.55))]" />
        {art && (
          <svg
            viewBox={art.viewBox}
            aria-hidden="true"
            className="lineart draw draw-hover pointer-events-none absolute inset-0 h-full w-full px-6 pt-24 pb-12 text-paper opacity-0 transition-opacity duration-500 group-focus-within:opacity-100 group-hover:opacity-100"
            dangerouslySetInnerHTML={{ __html: art.svg }}
          />
        )}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-5">
          <div>
            <p className="max-w-[12ch] font-display text-[1.5rem] leading-[1.05] font-light">{d.name}</p>
            <p className="mt-1.5 text-[0.65rem] tracking-[0.2em] text-paper/60">{d.code}</p>
          </div>
          <span className="rounded-full border border-white/25 bg-black/30 px-3 py-1 text-[0.65rem] tracking-wide whitespace-nowrap text-paper/85 backdrop-blur">
            {d.material.split(' · ')[0]}
          </span>
        </div>
        {art ? (
          <p className="absolute bottom-4 left-5 flex items-center gap-2 text-[0.65rem] tracking-[0.18em] text-paper/70 uppercase">
            <span className="inline-block h-px w-6 bg-current" />
            <span className="group-hover:hidden group-focus-within:hidden">Hover for drawing</span>
            <span className="hidden group-hover:inline group-focus-within:inline">Indicative dimensions</span>
          </p>
        ) : (
          <p className="absolute bottom-4 left-5 translate-y-2 text-[0.65rem] tracking-[0.18em] text-paper/80 uppercase opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            Made to your size &amp; finish
          </p>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4 px-1">
        <div>
          <h3 className="text-[0.95rem] font-semibold">{d.name}</h3>
          <p className="mt-0.5 text-sm text-stone">{d.material}</p>
        </div>
        <a
          href={whatsappLink(`Hello Invent Fine Art, I'd like to enquire about ${d.name} (${d.code}).`)}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 border-b border-current pb-0.5 text-xs font-semibold tracking-wide transition-colors hover:text-bronze"
        >
          Enquire
        </a>
      </div>
    </article>
  );
}
