import { projects, findProject } from './projects.js';

export const SITE_URL = 'https://sathwikhs.vercel.app';
export const HOME_DESCRIPTION = 'Sathwik HS, cybersecurity enthusiast and Technical Intern at Noventiq India. Network/cloud security, AppSec and pentesting. Seeking Jan–Jun 2027 internships and full-time opportunities.';
export const indexablePaths = ['/', '/projects', ...projects.map((project) => `/project/${project.slug}`)];

export function getPageMeta(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  const project = path.startsWith('/project/') ? findProject(path.slice(9)) : null;
  const home = ['/', '/about', '/experience', '/contact'].includes(path);
  const found = home || path === '/projects' || Boolean(project);
  const canonicalPath = project ? `/project/${project.slug}` : home ? '/' : path;
  const title = project ? `${project.title} · Sathwik HS` : home ? 'Sathwik HS - Cybersecurity & systems'
    : path === '/projects' ? 'Projects · Sathwik HS' : 'Page not found · Sathwik HS';
  const description = project?.summary || (home ? HOME_DESCRIPTION : path === '/projects'
    ? 'Explore Sathwik HS’s projects in cybersecurity, distributed systems, applied machine learning, web development and blockchain, with case studies and source code.'
    : 'This page could not be found. Browse Sathwik HS’s project index or return to the portfolio to get in touch.');
  return { title, description, canonical: found ? `${SITE_URL}${canonicalPath}` : null, found, project };
}

export function getBreadcrumbs(pathname) {
  const meta = getPageMeta(pathname);
  if (!meta.found || meta.canonical === `${SITE_URL}/`) return [];
  const items = [{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }];
  if (meta.project) items.push({ name: meta.project.title, path: `/project/${meta.project.slug}` });
  return items;
}

export function getBreadcrumbSchema(pathname) {
  const items = getBreadcrumbs(pathname);
  return items.length ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: `${SITE_URL}${item.path}` })),
  } : null;
}
