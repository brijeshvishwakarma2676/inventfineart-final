import { index, route } from '@react-router/dev/routes';

// Every static path is prerendered to its own HTML file (react-router.config.js), plus /404 (scripts/postbuild.mjs).
// Sculptures has its own page (size filter); the other four lines share routes/category.jsx.
export default [
  index('routes/home.jsx'),
  route('sculptures', 'routes/sculptures.jsx'),
  ...['designer-planters', 'grc-products', 'grc-grilles', 'frp-products'].map((slug) => route(slug, 'routes/category.jsx', { id: `line-${slug}` })),
  route('*', 'routes/not-found.jsx'),
];
