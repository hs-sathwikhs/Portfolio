import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { transitionTo } from '../motion/transitions';

export default function RouteTransitions() {
  const navigate = useNavigate();
  useEffect(() => {
    const follow = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target.closest('a[href]');
      if (!anchor || anchor.target || anchor.hasAttribute('download')) return;
      const next = new URL(anchor.href, location.href);
      if (next.origin !== location.origin || next.pathname === location.pathname || !['/', '/projects'].includes(next.pathname) && !next.pathname.startsWith('/project/')) return;
      event.preventDefault();
      transitionTo(() => navigate(next.pathname + next.search + next.hash), 'page');
    };
    document.addEventListener('click', follow, true);
    return () => document.removeEventListener('click', follow, true);
  }, [navigate]);
  return null;
}
