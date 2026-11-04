import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { projects } from '../src/data/projects.js';
import { SITE_URL, getPageMeta, getBreadcrumbs, getBreadcrumbSchema, indexablePaths } from '../src/data/seo.js';

const output = process.argv[2] || 'dist';
const template = await readFile(join(output, 'index.html'), 'utf8');
const escapeHtml = (text) => String(text).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

function head(meta, path) {
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const schema = getBreadcrumbSchema(path);
  return `<!-- route-meta:start -->
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="robots" content="${meta.found ? 'index, follow' : 'noindex, follow'}" />
    ${meta.canonical ? `<link rel="canonical" href="${escapeHtml(meta.canonical)}" />` : ''}
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    ${meta.canonical ? `<meta property="og:url" content="${escapeHtml(meta.canonical)}" />` : ''}
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    ${schema ? `<script id="breadcrumb-schema" type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>` : ''}
    <!-- route-meta:end -->`;
}

function fallback(meta, path) {
  const project = meta.project;
  const body = project ? project.brief.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n') : `<p>${escapeHtml(meta.description)}</p>`;
  const links = project
    ? project.links.filter((link) => link.href).map((link) => `<li><a href="${escapeHtml(link.href)}">${escapeHtml(link.kind)}</a></li>`).join('')
    : projects.map((item) => `<li><a href="/project/${item.slug}">${escapeHtml(item.title)}</a></li>`).join('');
  const crumbs = getBreadcrumbs(path);
  const breadcrumb = crumbs.length ? `<nav aria-label="Breadcrumb"><ol>${crumbs.map((item, index) => `<li>${index === crumbs.length - 1 ? `<span aria-current="page">${escapeHtml(item.name)}</span>` : `<a href="${item.path}">${escapeHtml(item.name)}</a>`}</li>`).join('')}</ol></nav>` : '';
  return `<noscript>${breadcrumb}<h1>${escapeHtml(project?.title || meta.title)}</h1>${body}
    <nav aria-label="Portfolio"><a href="/">Home</a> · <a href="/projects">Projects</a> · <a href="/resume.pdf">Résumé</a> · <a href="mailto:hs.sathwikhs@gmail.com">Contact</a></nav>
    <ul>${links}</ul></noscript>`;
}

if (!template.includes('<!-- route-meta:start -->')) throw new Error('Missing route metadata template markers.');
const paths = [...indexablePaths, ...projects.map((project) => `/project/${project.id}`), '/404'];
for (const path of paths) {
  const meta = getPageMeta(path);
  const html = template.replace(/<!-- route-meta:start -->[\s\S]*?<!-- route-meta:end -->/, head(meta, path))
    .replace(/<noscript>[\s\S]*?<\/noscript>/, fallback(meta, path));
  const file = join(output, path === '/' ? 'index.html' : `${path.slice(1)}.html`);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}
// Derive the sitemap from the same records, without inventing last-modified dates.
await writeFile(join(output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexablePaths.map((path) => `  <url><loc>${SITE_URL}${path}</loc></url>`).join('\n')}\n</urlset>\n`);
console.log(`Generated ${paths.length} static route documents and the sitemap.`);
