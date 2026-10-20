import { useRef } from 'react';
import { stepIcons } from '../../data/art';
import { steps } from '../../data/content';
import { useInView } from '../../motion/useInView';

/** How we work: five steps on a line that draws across when the section comes into view; each icon draws in turn. */
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
        <ol ref={list} data-on={seen ? '' : undefined} className="relative grid gap-10 md:grid-cols-5 md:gap-6">
          <span
            aria-hidden="true"
            className={`absolute top-[36px] right-0 left-0 hidden h-px origin-left bg-white/20 transition-transform duration-[2200ms] ease-in-out md:block ${seen ? 'scale-x-100' : 'scale-x-0'}`}
          />
          {steps.map((s, i) => (
            <li key={s.title} className="relative">
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
              <p className="label mt-7 text-bronze-2">Step {i + 1}</p>
              <h3 className="mt-2 font-display text-2xl font-light">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-paper/60">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
