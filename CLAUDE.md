# Invent Fine Art — website v5

A faithful rebuild of the approved demo (https://inventfineart.vercel.app/): Home, /sculptures (with the size
filter) and the other four product-line pages (`routes/category.jsx`), reached from the Products dropdown. See README.md.

- Stack: React 19 (JavaScript only) + Tailwind v4, React Router framework mode with `ssr: false`; every route is
  prerendered (plus /404). No other UI libraries, no CMS.
- Look: ink `#0b0b0a`, paper `#f6f5f2`, paper-2, stone, bronze `#a07a4a`, bronze-2. Cormorant Garamond (light,
  italic accents) for display, Manrope for text. Tokens only in `app/styles/global.css`.
- Line drawings: `app/data/art.js` (SVG markup with `pathLength="1"` and `--d` delays). A `.draw` SVG draws when it
  or a parent has `data-on`; `.draw-hover` draws on card hover/focus. No GSAP needed for drawing.
- Data: `app/data/content.js` (copy and lists), `designs.js` (IFA codes, never renumber), `site.js` (facts).
- Never invent facts: the demo's own values are PROVISIONAL and listed in CONTENT-GAPS.md.
- Commits and PRs never include `Co-Authored-By: Claude` or any AI tag.
