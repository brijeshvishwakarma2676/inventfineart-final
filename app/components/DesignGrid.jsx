import { useState } from 'react';
import { DesignCard } from './DesignCard';

const PHONE_LIMIT = 12;

/**
 * A grid of design cards. Phones: two compact columns from 360px (one below), and only the first 12 until
 * "Show all" (the rest stay in the HTML, hidden with CSS, so the prerendered page lists every design).
 * `columns`: the grid classes from 640px up. Remount with a new `key` to collapse it again (e.g. after a filter).
 */
export function DesignGrid({ designs, columns, sizes }) {
  const [expanded, setExpanded] = useState(false);
  const more = designs.length > PHONE_LIMIT && !expanded;
  return (
    <>
      <ul
        className={`grid grid-cols-1 gap-x-3 gap-y-8 min-[360px]:grid-cols-2 sm:gap-x-6 sm:gap-y-12 ${columns} ${
          more ? 'max-sm:[&>li:nth-child(n+13)]:hidden' : ''
        }`}
      >
        {designs.map((d) => (
          <li key={d.code} className="animate-[fade-up_0.6s_cubic-bezier(0.22,1,0.36,1)_both]">
            <DesignCard d={d} sizes={sizes} />
          </li>
        ))}
      </ul>
      {more && (
        <div className="mt-10 flex justify-center sm:hidden">
          <button type="button" onClick={() => setExpanded(true)} className="min-h-11 rounded-full border border-ink/20 px-7 text-sm font-semibold hover:border-ink">
            Show all {designs.length} designs
          </button>
        </div>
      )}
    </>
  );
}
