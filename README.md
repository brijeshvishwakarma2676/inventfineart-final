# Invent Fine Art — website v5

v5 rebuilds the demo the client approved (https://inventfineart.vercel.app/) as is: the same two pages, layout,
copy, line drawings and animations. Under the hood it uses v4's machinery, so every page is prerendered static HTML
and photos are responsive, content-hashed WebP files.

- `/`: drawn hero (three scenes), five product lines, featured designs (hover for the drawing), studio, materials and
  finishes, process, clients, get a quote.
- `/sculptures`: drawn hero, specs, size filter with a scale figure, 24 designs.
- Enquiries go to WhatsApp, a call or an email (no form).

## Commands
- `npm run dev`: dev server
- `npm run build`: static build in `build/client` (+ `404.html`, sitemap, link-preview JPGs)
- `npm run preview`: serve the build on http://localhost:4173
- `npm run check`: lint + build
- `npm run images`: rebuild photos after changing `media-src/`

## Rules
- React (JavaScript) + Tailwind only. Tokens live in `app/styles/global.css`.
- Don't invent facts. The demo's own values are marked `PROVISIONAL` in `app/data/content.js` and listed in
  `CONTENT-GAPS.md`.
- Commits never include AI tags.
