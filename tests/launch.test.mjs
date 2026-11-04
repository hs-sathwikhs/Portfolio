import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { projects } from '../src/data/projects.js';

const origin = 'https://sathwikhs.vercel.app';
const read = (path) => readFile(`dist/${path}`, 'utf8');
const capture = (html, expression) => html.match(expression)?.[1];

test('every public route exposes unique crawler metadata before JavaScript runs', async () => {
  const routes = ['/', '/projects', ...projects.map((project) => `/project/${project.slug}`)];
  const titles = new Set();
  const descriptions = new Set();
  for (const route of routes) {
    const html = await read(route === '/' ? 'index.html' : `${route.slice(1)}.html`);
    const title = capture(html, /<title>(.*?)<\/title>/);
    const description = capture(html, /<meta name="description" content="([^"]+)"/);
    assert.ok(title && description, `${route}: title and description`);
    assert.ok(!titles.has(title), `${route}: unique title`);
    assert.ok(!descriptions.has(description), `${route}: unique description`);
    titles.add(title); descriptions.add(description);
    assert.equal(capture(html, /<link rel="canonical" href="([^"]+)"/), origin + route);
    assert.equal(capture(html, /<meta property="og:url" content="([^"]+)"/), origin + route);
    assert.equal(capture(html, /<meta property="og:title" content="([^"]+)"/), title);
    assert.equal(capture(html, /<meta name="twitter:title" content="([^"]+)"/), title);
    assert.equal((html.match(/<title>/g) || []).length, 1);
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
    assert.match(html, /<meta name="robots" content="index, follow"/);
  }
});

test('breadcrumbs are valid JSON-LD and point to the visible page hierarchy', async () => {
  for (const project of projects) {
    const html = await read(`project/${project.slug}.html`);
    const schema = JSON.parse(capture(html, /<script id="breadcrumb-schema" type="application\/ld\+json">(.*?)<\/script>/));
    assert.equal(schema['@type'], 'BreadcrumbList');
    assert.deepEqual(schema.itemListElement.map((item) => item.position), [1, 2, 3]);
    assert.deepEqual(schema.itemListElement.map((item) => item.item), [origin + '/', origin + '/projects', origin + '/project/' + project.slug]);
    assert.equal(schema.itemListElement[2].name, project.title);
    assert.match(html, /<nav aria-label="Breadcrumb">/);
  }
});

test('legacy project IDs canonicalize and missing pages are not indexable', async () => {
  for (const project of projects) {
    const html = await read(`project/${project.id}.html`);
    assert.equal(capture(html, /<link rel="canonical" href="([^"]+)"/), `${origin}/project/${project.slug}`);
  }
  const missing = await read('404.html');
  assert.match(missing, /<meta name="robots" content="noindex, follow"/);
  assert.doesNotMatch(missing, /rel="canonical"|id="breadcrumb-schema"/);
  assert.match(missing, /<title>Page not found/);
});

test('sitemap lists only canonical content routes and all local icon assets exist', async () => {
  const sitemap = await read('sitemap.xml');
  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  assert.equal(locations.length, projects.length + 2);
  assert.equal(new Set(locations).size, locations.length);
  assert.ok(locations.every((location) => location.startsWith(origin + '/') && !location.includes('/404')));
  for (const project of projects) assert.ok(locations.includes(`${origin}/project/${project.slug}`));
  const manifest = JSON.parse(await read('site.webmanifest'));
  for (const icon of manifest.icons) assert.ok((await readFile(`dist${icon.src}`)).length > 0);
  const apple = await readFile('dist/apple-touch-icon.png');
  assert.equal(apple.readUInt32BE(16), 180);
  assert.equal(apple.readUInt32BE(20), 180);
});

test('HTML has no inline executable scripts or unconditional analytics tag', async () => {
  const html = await read('index.html');
  for (const match of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    assert.ok(match[1].includes('src=') || match[1].includes('application/ld+json'));
    if (match[1].includes('application/ld+json')) assert.doesNotThrow(() => JSON.parse(match[2]));
  }
  assert.doesNotMatch(html, /<script[^>]*src="https:\/\/www\.googletagmanager/);
  assert.ok((await read('theme-init.js')).includes('localStorage'));
});
