import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * React Router does not act on the hash. Without this, `/#work` from the
 * projects page lands you at the top of the home page with a fragment in the
 * URL and no explanation - which is exactly what the previous site did.
 *
 * Two rules: a new route starts at the top, and a hash goes to its section
 * once that section has actually mounted.
 */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const lastPath = useRef(pathname);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hash) {
      // Two frames: one for the route to commit, one for layout to settle.
      let inner = 0;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => {
          const target = document.getElementById(hash.slice(1));
          if (target) {
            target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
          }
        });
      });
      lastPath.current = pathname;
      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }

    if (lastPath.current !== pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      lastPath.current = pathname;
    }
    return undefined;
  }, [pathname, hash, key]);

  return null;
}
