import { useEffect, useState } from 'react';

/** True once the element has scrolled into view (and stays true). Prerendered HTML: false. */
export function useInView(ref, { threshold = 0.25 } = {}) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, seen, threshold]);
  return seen;
}
