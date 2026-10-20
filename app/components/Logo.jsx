import { logoMark } from '../data/art';

/** The pebble mark with INVENT and "Fine Art". PROVISIONAL – confirm with client: replace with their vector logo. */
export function Logo({ className = '' }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <svg viewBox={logoMark.viewBox} className="h-9 w-9" aria-hidden="true" dangerouslySetInnerHTML={{ __html: logoMark.svg }} />
      <span className="flex flex-col leading-none">
        <span className="text-[1.05rem] font-semibold tracking-[0.32em]">INVENT</span>
        <span className="font-display text-[0.95rem] italic tracking-wide opacity-80">Fine Art</span>
      </span>
    </span>
  );
}
