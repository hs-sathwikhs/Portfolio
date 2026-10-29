import { flushSync } from 'react-dom';

let active;
let fallback;
export function transitionTo(update, kind = 'page') {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  active?.skipTransition();
  fallback?.cancel();
  if (reduce) {
    update();
    return;
  }
  if (!document.startViewTransition) {
    flushSync(update);
    if (kind !== 'page') fallback = document.querySelector('main')?.animate(
      kind === 'theme'
        ? [{ opacity: 0.3 }, { opacity: 1 }]
        : [{ opacity: 0.15, transform: 'translateY(22px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: kind === 'theme' ? 220 : 480, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' },
    );
    return;
  }
  document.documentElement.dataset.transition = kind;
  const current = document.startViewTransition(() => {
    flushSync(update);
    if (kind === 'page') {
      const target = location.hash && document.getElementById(location.hash.slice(1));
      if (target) target.scrollIntoView({ behavior: 'instant' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
    }
  });
  active = current;
  current.finished.catch(() => {}).finally(() => {
    if (active === current) {
      active = null;
      delete document.documentElement.dataset.transition;
    }
  });
}
