import { site, whatsappLink } from '../../data/site';

/** Get a quote: the pitch, then WhatsApp, Call and Email as large pill links. */
export function Contact() {
  const links = [
    { href: whatsappLink('Hello Invent Fine Art, I would like a quote for your products.'), label: `WhatsApp ${site.phones[0].label}`, primary: true, external: true },
    { href: `tel:${site.phones[0].tel}`, label: `Call ${site.phones[0].label}` },
    { href: `mailto:${site.email}`, label: site.email },
  ];
  return (
    <section id="contact" className="scroll-mt-20 bg-paper-2 py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)] gap-12 px-5 md:px-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <div data-reveal="up">
          <p className="label text-bronze">Get a quote</p>
          <h2 className="mt-5 font-display text-[clamp(2.6rem,6vw,5.4rem)] leading-[1] font-light">
            Tell us about <span className="italic">your space.</span>
          </h2>
          <p className="mt-6 max-w-lg leading-relaxed text-ink/70">
            Share a concept, a drawing or a reference photo, with the size and location. We will suggest the right design, material and finish.
          </p>
        </div>
        <div className="flex flex-col gap-3" data-reveal="up">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={`group flex min-w-0 items-center justify-between gap-3 rounded-full px-5 py-5 transition-colors sm:px-7 ${
                l.primary ? 'bg-ink text-paper hover:bg-bronze' : 'border border-ink/20 hover:border-ink'
              }`}
            >
              <span className="min-w-0 truncate font-semibold">{l.label}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
