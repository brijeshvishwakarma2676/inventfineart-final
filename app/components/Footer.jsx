import { Link } from 'react-router';
import { Logo } from './Logo';
import { collections } from '../data/content';
import { site } from '../data/site';

const YEAR = new Date().getFullYear();

/** Ink footer: about line, products, the two addresses, phones and email. */
export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-20 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:px-10">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-6 text-sm leading-relaxed text-paper/60">
            Sculptures, designer planters, GRC and FRP products, designed and made in our own workshop for homes, hotels, landscapes and architecture.
          </p>
          <p className="label mt-6 text-bronze-2">
            {site.certification} · Since {site.foundedYear}
          </p>
        </div>
        <div>
          <p className="label text-paper/40">Products</p>
          <ul className="mt-5 space-y-3 text-sm text-paper/75">
            {collections.map((c) => (
              <li key={c.slug}>
                <Link to={c.to ?? '/#collections'} className="hover:text-paper">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label text-paper/40">Visit</p>
          <div className="mt-5 space-y-4 text-sm text-paper/75">
            <p>
              <span className="block text-paper">Head office</span>
              Kandivali East, Mumbai, Maharashtra
            </p>
            <p>
              <span className="block text-paper">Factory &amp; workshop</span>
              Opp. Jag Mata Mandir, Nalasopara West, Maharashtra
            </p>
          </div>
        </div>
        <div>
          <p className="label text-paper/40">Get in touch</p>
          <ul className="mt-5 space-y-3 text-sm text-paper/75">
            {site.phones.map((p) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`} className="hover:text-paper">
                  {p.label}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-paper">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-2 px-5 py-6 text-xs text-paper/40 sm:flex-row md:px-10">
          <p>© {YEAR} Invent Fine Art. All rights reserved.</p>
          <p>
            Crafted by{' '}
            <a href={site.credit.url} className="underline underline-offset-2 hover:text-paper">
              {site.credit.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
