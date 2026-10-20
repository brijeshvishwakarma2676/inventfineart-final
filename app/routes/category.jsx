import { useLocation } from 'react-router';
import { Seo } from '../components/Seo';
import { DesignGrid } from '../components/DesignGrid';
import { Contact } from '../components/sections/Contact';
import { LineHero, LineSpecs } from '../components/sections/LinePage';
import { lineHeroArt } from '../data/art';
import { linePages } from '../data/content';
import { lineBySlug } from '../data/lines';

/** Designer Planters, GRC Products, GRC Grilles and FRP Products: the Sculptures layout without the size filter. */
export default function Category() {
  const slug = useLocation().pathname.replace(/^\/|\/$/g, '');
  const p = linePages.find((l) => l.slug === slug);
  const line = lineBySlug[slug];

  return (
    <>
      <Seo title={line.seo.title} description={line.seo.description} image={p.designs[0]?.image ?? line.banner.image} />
      <LineHero num={p.num} name={p.name} count={p.designs.length} art={lineHeroArt[slug]} strokeWidth="0.75" />
      <LineSpecs intro={p.intro} accent={p.accent} specs={p.specs} />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <p className="mb-6 text-sm text-stone">
            Showing <span className="font-semibold text-ink tabular-nums">{p.designs.length}</span> designs · every design can be made to your size and finish
          </p>
          <DesignGrid designs={p.designs} columns="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 360px) 45vw, 100vw" />
        </div>
      </section>

      <Contact />
    </>
  );
}
