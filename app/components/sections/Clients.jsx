import { Img } from '../Img';
import { clientLogos } from '../../data/clients';

// Two rows of the 28 brands (duplicate logo files are already left out in clients.js).
const rows = [clientLogos.slice(0, 14), clientLogos.slice(14)];

/** Trusted by: two rows of client logos drifting in opposite directions (paused on hover; still under reduced motion). */
export function Clients() {
  return (
    <section id="clients" className="scroll-mt-20 overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-12 md:mb-16" data-reveal="up">
          <p className="label text-bronze">Trusted by</p>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02] font-light">
            Brands and architects <span className="italic">who work with us.</span>
          </h2>
        </div>
      </div>
      <div className="flex flex-col gap-4" data-reveal="up">
        {rows.map((logos, r) => {
          return (
            <div key={r} className="marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
              {/* Two copies of the row; the track moves by one copy. The second copy is hidden from screen readers. */}
              <ul className={`marquee-track flex w-max items-center ${r % 2 ? 'reverse' : ''}`}>
                {[...logos, ...logos].map((l, i) => (
                  <li key={`${l.image}-${i}`} aria-hidden={i >= logos.length || undefined} className="mx-3 grid h-24 w-44 place-items-center rounded-xl bg-white px-6 md:mx-4 md:w-52">
                    <Img id={l.image} alt={i < logos.length ? l.alt : ''} sizes="160px" className="max-h-14 w-auto object-contain opacity-70 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0" />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
