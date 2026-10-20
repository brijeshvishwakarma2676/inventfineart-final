import { useRef } from 'react';
import { stepIcons } from '../../data/art';
import { steps } from '../../data/content';
import { useInView } from '../../motion/useInView';

/** How we work: five steps on a line that draws when the section comes into view; each icon draws in turn. */
export function Process() {
  const list = useRef(null);
  const seen = useInView(list);
  return (
    <section id="process" className="scroll-mt-20 bg-ink py-24 text-paper md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-12 md:mb-16" data-reveal="up">
          <p className="label text-bronze-2">How we work</p>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02] font-light">
            From concept <span className="italic">to installation.</span>
          </h2>
        </div>
        {/* Phones: a vertical timeline. 640–1023px: 3 + 2. From 1024px: five in a row on a line that draws across. */}
        <ol ref={list} data-on={seen ? '' : undefined} className="relative grid gap-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-5 lg:gap-6">
          <span
            aria-hidden="true"
            className={`absolute top-[36px] right-0 left-0 hidden h-px origin-left bg-white/20 transition-transform duration-[2200ms] ease-in-out lg:block ${seen ? 'scale-x-100' : 'scale-x-0'}`}
          />
          <span
            aria-hidden="true"
            className={`absolute top-9 bottom-9 left-9 w-px origin-top bg-white/20 transition-transform duration-[2200ms] ease-in-out sm:hidden ${seen ? 'scale-y-100' : 'scale-y-0'}`}
          />
          {steps.map((s, i) => (
            <li key={s.title} className="relative grid grid-cols-[72px_1fr] gap-x-5 sm:block">
              <div className="relative grid h-[72px] w-[72px] place-items-center rounded-full border border-white/20 bg-ink">
                <svg
                  viewBox="0 0 52 52"
                  className="lineart draw h-9 w-9 text-paper"
                  strokeWidth="1.5"
                  aria-hidden="true"
                  style={{ '--s': `${i * 0.35}s` }}
                  dangerouslySetInnerHTML={{ __html: stepIcons[i] }}
                />
              </div>
              <div className="pt-2 sm:pt-0">
                <p className="label text-bronze-2 sm:mt-7">Step {i + 1}</p>
                <h3 className="mt-2 font-display text-2xl font-light">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/60">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
