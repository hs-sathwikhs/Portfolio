import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    let frame;
    let timeout;
    let observer;
    const goToSection = () => {
      const target = document.getElementById(hash.slice(1));
      if (!target) return false;
      observer?.disconnect();
      clearTimeout(timeout);
      frame = requestAnimationFrame(() => {
        target.scrollIntoView({
          behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
          block: 'start',
        });
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
      return true;
    };
    if (hash) {
      if (!goToSection()) {
        // A deep link can request a section before its presentation mounts.
        observer = new MutationObserver(goToSection);
        observer.observe(document.getElementById('main'), { childList: true, subtree: true });
        timeout = setTimeout(() => observer.disconnect(), 2500);
      }
    } else {
      frame = requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.getElementById('main')?.focus({ preventScroll: true });
      });
    }
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
      observer?.disconnect();
    };
  }, [pathname, hash, key]);
  return null;
}
