import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { findProject } from '../data/projects';

const BASE = 'https://sathwikhs.vercel.app';
const DESCRIPTION = 'Sathwik HS, cybersecurity enthusiast and Technical Intern at Noventiq India. Network/cloud security, AppSec and pentesting. Seeking Jan–Jun 2027 internships and full-time opportunities.';
export default function RouteMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const project = pathname.startsWith('/project/') ? findProject(pathname.slice(9)) : null;
    const title = project ? `${project.title} · Sathwik HS` : pathname === '/projects' ? 'Projects · Sathwik HS' : 'Sathwik HS - Cybersecurity & systems';
    const description = project?.summary || DESCRIPTION;
    const canonical = project ? `${BASE}/project/${project.slug}` : `${BASE}${pathname}`;
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical);
  }, [pathname]);
  return null;
}
