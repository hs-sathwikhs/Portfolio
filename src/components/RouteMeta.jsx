import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageMeta, getBreadcrumbSchema } from '../data/seo';

function updateMeta(attribute, key, content) {
  let node = document.querySelector(`meta[${attribute}="${key}"]`);
  if (content === null) { node?.remove(); return; }
  if (!node) {
    node = document.createElement('meta');
    node.setAttribute(attribute, key);
    document.head.append(node);
  }
  node.setAttribute('content', content);
}

export default function RouteMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = getPageMeta(pathname);
    document.title = meta.title;
    updateMeta('name', 'description', meta.description);
    updateMeta('name', 'robots', meta.found ? 'index, follow' : 'noindex, follow');
    updateMeta('property', 'og:title', meta.title);
    updateMeta('property', 'og:description', meta.description);
    updateMeta('property', 'og:url', meta.canonical);
    updateMeta('name', 'twitter:title', meta.title);
    updateMeta('name', 'twitter:description', meta.description);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (meta.canonical) {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.append(canonical);
      }
      canonical.href = meta.canonical;
    } else canonical?.remove();
    const schema = getBreadcrumbSchema(pathname);
    let script = document.getElementById('breadcrumb-schema');
    if (schema) {
      if (!script) {
        script = document.createElement('script');
        script.id = 'breadcrumb-schema';
        script.type = 'application/ld+json';
        document.head.append(script);
      }
      script.textContent = JSON.stringify(schema).replace(/</g, '\\u003c');
    } else script?.remove();
  }, [pathname]);
  return null;
}
