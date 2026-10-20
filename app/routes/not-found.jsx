import { Link } from 'react-router';
import { Seo } from '../components/Seo';

// The splat route, prerendered at /404 and served as 404.html. No loader and no thrown response (prerender needs 200).
export default function NotFound() {
  return (
    <>
      <Seo title="Page not found | Invent Fine Art" description="This page does not exist. Explore sculptures, designer planters, GRC and FRP products by Invent Fine Art." noindex />
      <section className="bg-ink pt-[72px] text-paper">
        <div className="mx-auto flex min-h-[60svh] max-w-[1400px] flex-col items-start justify-center gap-6 px-5 py-20 md:px-10">
          <p className="label text-bronze-2">404</p>
          <h1 className="font-display text-[clamp(3rem,7vw,6rem)] leading-none font-light">
            Page <span className="italic">not found.</span>
          </h1>
          <div className="flex flex-wrap gap-3">
            <Link to="/" className="rounded-full bg-paper px-7 py-3.5 text-sm font-semibold text-ink hover:bg-bronze-2">
              Home
            </Link>
            <Link to="/sculptures" className="rounded-full border border-paper/30 px-7 py-3.5 text-sm font-semibold hover:border-paper">
              Sculptures
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
