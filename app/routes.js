import { index, route } from '@react-router/dev/routes';

// Every static path is prerendered to its own HTML file (react-router.config.js), plus /404 (scripts/postbuild.mjs).
export default [index('routes/home.jsx'), route('sculptures', 'routes/sculptures.jsx'), route('*', 'routes/not-found.jsx')];
