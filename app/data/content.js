// Copy and lists for v5, taken as is from the approved demo (inventfineart.vercel.app), with one correction: the
// factory is in Nalasopara West (the old site's contact page), not "Vasai–Virar".
// Values marked PROVISIONAL are the demo's own and are listed in CONTENT-GAPS.md for the client to confirm.
import { designByCode, designsFor } from './designs';

// Home hero
export const hero = {
  eyebrow: 'Sculptures · Planters · GRC · FRP',
  lines: ['Art that gives', 'your space an'],
  accent: 'identity.',
  // PROVISIONAL – confirm with client (founding year 2008; "own workshop")
  text: 'Sculptures, designer planters, GRC and FRP products, designed and made in our own workshop in Nalasopara West since 2008.',
};

// "What we make": the five lines, three photos each (the card cycles them on hover).
export const collections = [
  { slug: 'sculptures', num: '01', name: 'Sculptures', tagline: 'Art that gives your space a distinctive identity', to: '/sculptures', images: ['gallery/sculptures/15', 'gallery/sculptures/13', 'gallery/sculptures/33'] },
  { slug: 'designer-planters', num: '02', name: 'Designer Planters', tagline: 'Where nature meets design', images: ['gallery/planters/4', 'gallery/planters/2', 'gallery/planters/3'] },
  { slug: 'grc-products', num: '03', name: 'GRC Products', tagline: 'Architectural creativity, modern craftsmanship', images: ['gallery/grc_products/1', 'gallery/grc_products/2', 'gallery/grc_products/11'] },
  { slug: 'grc-grilles', num: '04', name: 'GRC Grilles', tagline: 'Distinctive patterns, timeless appeal', images: ['gallery/grc_products/5', 'gallery/grc_products/4', 'gallery/grc_products/6'] },
  { slug: 'frp-products', num: '05', name: 'FRP Products', tagline: 'Creative solutions, made to your brief', images: ['gallery/other_products/6', 'gallery/other_products/11', 'gallery/other_products/13'] },
].map((c) => ({ ...c, count: designsFor(c.slug).length }));

// A design card: the catalogue entry plus the demo's material label and line drawing (if any).
// `material` and `size` are PROVISIONAL – confirm with client (the demo's own labels, not from the old site).
// `name`: the demo's card name where it gave one; otherwise the catalogue title.
const card = (code, material, lineArt, size, name) => {
  const d = designByCode[code];
  return { code, name: name ?? d.title, image: d.image, line: d.line, material, lineArt, size };
};

// "Every piece starts as a drawing": eight featured designs.
export const featured = [
  card('IFA-SC-012', 'Fibre · Gold finish', 'buddha'),
  card('IFA-PL-002', 'GRC', 'urn'),
  card('IFA-GRL-001', 'GRC', 'jali'),
  card('IFA-SC-070', 'Metal', 'ribbon'),
  card('IFA-GRC-001', 'GRC', 'facade'),
  card('IFA-PL-001', 'GRC · FRP', 'faceted'),
  card('IFA-SC-028', 'Metal mesh', null, null, 'Rhinoceros in metal mesh'),
  card('IFA-FRP-002', 'FRP'),
];

// Studio: the provisional stats (as in v4 site.js).
export const studio = {
  eyebrow: 'Since 2008',
  title: 'A community of artists, making art for',
  accent: 'real spaces.',
  body: [
    'Invent Fine Art is a team of sculptors, painters and product designers. We work across interior and architectural design, at indoor and outdoor sites.',
    // PROVISIONAL – confirm with client ("moulded, cast and finished under one roof")
    'From a single statement sculpture to façade elements for a large project, we take each piece from concept to installation — moulded, cast and finished under one roof in Nalasopara West.',
  ],
  // PROVISIONAL – confirm with client
  stats: [
    { value: 18, label: 'Years of craft' },
    { value: 160, label: 'Designs crafted' },
    { value: 30, label: 'Corporate clients' },
  ],
};

// Materials & finishes. PROVISIONAL – confirm with client (only GRC and FRP are named on the old site).
export const materialsLine = 'GRC · FRP · Fibre · Metal · Stone';
export const finishes = [
  { name: 'Natural concrete grey', swatch: '#9a9893' },
  { name: 'Sandstone texture', swatch: '#c9ad85' },
  { name: 'Matte colour', swatch: '#5b6b62' },
  { name: 'Metallic bronze', swatch: '#8c6a3e' },
  { name: 'Custom colour', swatch: 'conic-gradient(#a07a4a, #5b6b62, #9a9893, #c9ad85, #a07a4a)' },
];

// How we work (the demo's five steps; PROVISIONAL – confirm with client: "our own moulds and tools").
export const steps = [
  { title: 'Concept', text: 'Share a sketch, a reference photo or a drawing, with the size and the site.' },
  { title: 'Design & approval', text: 'We suggest the design, material and finish, and confirm every detail with you.' },
  { title: 'Mould & manufacturing', text: 'Made in our own workshop by our artisans, using our own moulds and tools.' },
  { title: 'Quality check', text: 'Every piece is examined by our quality control team before it leaves.' },
  { title: 'Delivery & installation', text: 'Packed for safe transport and installed on site where required.' },
];

// The Sculptures page.
export const sculpturesPage = {
  intro: 'Art that gives your space a',
  accent: 'distinctive identity.',
  // PROVISIONAL – confirm with client (materials and finishes are the demo's)
  specs: [
    { label: 'Suitable for', value: 'Residences · Gardens · Hotels · Commercial · Architectural projects' },
    { label: 'Materials', value: 'Fibre · Metal · Stone · Bronze finish · Mixed media' },
    { label: 'Sizes', value: 'Made to your size and drawing' },
    { label: 'Finishes', value: 'Concrete grey · Sandstone · Matte colour · Metallic bronze · Custom' },
  ],
};

// Size groups for the filter (PROVISIONAL – confirm with client: indicative; every design is made to size).
export const sizes = [
  { key: 'all', label: 'All sizes', range: 'Every design', from: 0, to: 200, objectCm: 110 },
  { key: 'S', label: 'Small', range: 'Under 60 cm', from: 0, to: 60, objectCm: 48 },
  { key: 'M', label: 'Medium', range: '60 – 150 cm', from: 60, to: 150, objectCm: 115 },
  { key: 'L', label: 'Large', range: '150 cm +', from: 150, to: 200, objectCm: 185 },
];

// The 24 sculptures shown on /sculptures, in the demo's order, with its material and size labels. Titles come
// from designs.js (the demo called most of them just "Sculpture").
export const sculptures = [
  card('IFA-SC-012', 'Fibre', 'buddha', 'L', 'Seated Buddha'),
  card('IFA-SC-010', 'Fibre · Bronze finish', null, 'L', 'Equestrian statue'),
  card('IFA-SC-070', 'Metal', 'ribbon', 'L', 'Twisted ribbon form'),
  card('IFA-SC-002', 'Fibre', null, 'M', 'Saraswati with veena'),
  card('IFA-SC-026', 'Fibre · Stone finish', null, 'L', 'Couple on a boulder'),
  card('IFA-SC-028', 'Metal mesh', null, 'L', 'Rhinoceros in metal mesh'),
  card('IFA-SC-017', 'Fibre', null, 'M', 'Giant garden chess set'),
  card('IFA-SC-064', 'Fibre · Stone finish', null, 'M', 'Buddha head'),
  card('IFA-SC-068', 'Metal', null, 'L', 'Lion of machine parts'),
  card('IFA-SC-011', 'Fibre', null, 'M'),
  card('IFA-SC-013', 'Fibre', null, 'S'),
  card('IFA-SC-014', 'Fibre', null, 'M'),
  card('IFA-SC-015', 'Fibre', null, 'S'),
  card('IFA-SC-016', 'Fibre', null, 'M'),
  card('IFA-SC-019', 'Metal', null, 'L'),
  card('IFA-SC-021', 'Fibre', null, 'L'),
  card('IFA-SC-029', 'Fibre', null, 'L'),
  card('IFA-SC-034', 'Metal', null, 'L'),
  card('IFA-SC-041', 'Fibre', null, 'M'),
  card('IFA-SC-044', 'Stone', null, 'M'),
  card('IFA-SC-046', 'Fibre', null, 'M'),
  card('IFA-SC-049', 'Fibre', null, 'S'),
  card('IFA-SC-050', 'Fibre', null, 'M'),
  card('IFA-SC-058', 'Fibre', null, 'S'),
];
