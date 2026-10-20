import { useRef } from 'react';
import { Link } from 'react-router';
import { Seo } from '../components/Seo';
import { Hero } from '../components/sections/Hero';
import { Collections } from '../components/sections/Collections';
import { Process } from '../components/sections/Process';
import { Clients } from '../components/sections/Clients';
import { Contact } from '../components/sections/Contact';
import { DesignCard } from '../components/DesignCard';
import { featured, studio, materialsLine, finishes } from '../data/content';
import { organization } from '../data/seo';
import { useCountUp } from '../motion/useCountUp';

export default function Home() {
  const stats = useRef(null);
  useCountUp(stats);

  return (
    <>
      <Seo
        title="Invent Fine Art | Sculptures, Planters, GRC & FRP Products, Mumbai"
        description="Sculptures, designer planters, GRC products, GRC grilles and FRP products, designed and made in our own workshop for homes, hotels, landscapes and architecture."
        image="gallery/sculptures/15"
        jsonLd={organization}
      />
      <Hero />
      <Collections />

      {/* Featured designs */}
      <section className="bg-ink py-24 text-paper md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end" data-reveal="up">
            <div>
              <p className="label text-bronze-2">Featured designs</p>
              <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02] font-light">
                Every piece starts as <span className="italic">a drawing.</span>
              </h2>
            </div>
            <Link to="/sculptures" className="group flex items-center gap-3 text-sm font-semibold">
              <span className="border-b border-current pb-1">View the sculpture collection</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
          <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4" data-reveal="stagger">
            {featured.map((d) => (
              <li key={d.code}>
                <DesignCard d={d} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Studio */}
      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-5 md:px-10 lg:grid-cols-[1.1fr_1fr]">
          <div data-reveal="up">
            <p className="label text-bronze">{studio.eyebrow}</p>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02] font-light">
              {studio.title} <span className="italic">{studio.accent}</span>
            </h2>
          </div>
          <div className="space-y-5 text-ink/70 lg:pt-10" data-reveal="up">
            {studio.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="lg:col-span-2" data-reveal="up">
            <dl ref={stats} className="grid grid-cols-3 border-t border-ink/15">
              {studio.stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse border-r border-ink/15 py-8 pr-4 last:border-r-0 [&:not(:first-child)]:pl-4 md:[&:not(:first-child)]:pl-8">
                  <dt className="label mt-3 text-stone">{s.label}</dt>
                  <dd className="font-display text-[clamp(2.6rem,6vw,5rem)] leading-none font-light [font-variant-numeric:lining-nums]">
                    <span data-count={s.value}>{s.value}</span>
                    <span className="text-bronze">+</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Materials & finishes */}
      <section className="bg-paper-2 py-20 md:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 md:px-10 lg:grid-cols-[1fr_2fr] lg:items-center">
          <div data-reveal="up">
            <p className="label text-bronze">Materials &amp; finishes</p>
            <h2 className="mt-4 font-display text-4xl leading-tight font-light md:text-5xl">{materialsLine}</h2>
          </div>
          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-5" data-reveal="stagger">
            {finishes.map((f) => (
              <li key={f.name} className="group flex flex-col items-start gap-4">
                <span
                  aria-hidden="true"
                  className="block aspect-square w-full max-w-[120px] rounded-full ring-1 ring-ink/10 transition-transform duration-500 group-hover:scale-105"
                  style={{ background: f.swatch }}
                />
                <span className="text-sm font-medium">{f.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Process />
      <Clients />
      <Contact />
    </>
  );
}
