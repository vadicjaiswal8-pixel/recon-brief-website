import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)));
const outputRoot = resolve(projectRoot, 'dist');
const preferredOrigin = 'https://www.reconbrief.in';
const excludedSegments = new Set([
  'api', 'app', 'auth', 'login', 'logout', 'account', 'dashboard',
  'private', 'test', 'tests', 'preview', 'draft', '404',
]);
const excludedNamePattern = /(?:^|[._-])(?:test|spec|preview|draft|redirect|404|auth|login|logout|account|dashboard|private)(?:[._-]|$)/i;
const vercelConfig = JSON.parse(await readFile(resolve(projectRoot, 'vercel.json'), 'utf8'));
const redirectRules = Array.isArray(vercelConfig.redirects) ? vercelConfig.redirects : [];

function parseAttributes(tag) {
  const attributes = {};
  const pattern = /([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g;
  for (const match of tag.matchAll(pattern)) {
    attributes[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? '';
  }
  return attributes;
}

function htmlIsNoindex(html) {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attributes = parseAttributes(match[0]);
    const name = (attributes.name ?? '').toLowerCase();
    if (name !== 'robots' && name !== 'googlebot') continue;
    const directives = (attributes.content ?? '').toLowerCase().split(/[\s,]+/);
    if (directives.includes('noindex') || directives.includes('none')) return true;
  }
  return /<meta\b[^>]*http-equiv\s*=\s*["']?refresh\b/i.test(html);
}

function canonicalHref(html) {
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const attributes = parseAttributes(match[0]);
    const relations = (attributes.rel ?? '').toLowerCase().split(/\s+/);
    if (relations.includes('canonical') && attributes.href) return attributes.href;
  }
  return null;
}

function routeForBuiltHtml(relativePath) {
  const webPath = relativePath.split(sep).join('/');
  if (webPath === 'index.html') return '/';
  if (webPath.endsWith('/index.html')) return `/${webPath.slice(0, -'/index.html'.length)}`;
  if (!webPath.toLowerCase().endsWith('.html')) return null;
  return `/${webPath.slice(0, -'.html'.length)}`;
}

function routeIsExcluded(pathname, relativePath) {
  const parts = `${relativePath.split(sep).join('/')}/${pathname}`
    .split('/')
    .filter(Boolean)
    .map((part) => part.replace(/\.html$/i, ''));
  return parts.some((part) => excludedSegments.has(part.toLowerCase()))
    || excludedNamePattern.test(relativePath.split(sep).join('/'));
}

function matchesRedirect(pathname, source) {
  if (typeof source !== 'string') return false;
  const pattern = source.split('/').map((segment) => {
    const parameter = segment.match(/^:[A-Za-z0-9_]+([*+?])?$/);
    if (parameter) {
      if (parameter[1] === '+') return '.+';
      if (parameter[1] === '?') return '[^/]*';
      if (parameter[1] === '*') return '.*';
      return '[^/]+';
    }
    if (segment === '*') return '.*';
    return segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }).join('/');
  return new RegExp(`^${pattern}/?$`).test(pathname);
}

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

async function listHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const absolutePath = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...await listHtmlFiles(absolutePath));
    else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) files.push(absolutePath);
  }
  return files;
}

async function generateSitemap() {
  const builtFiles = await listHtmlFiles(outputRoot);
  const urls = [];
  const seen = new Set();

  for (const file of builtFiles) {
    const relativePath = relative(outputRoot, file);
    const route = routeForBuiltHtml(relativePath);
    if (!route || routeIsExcluded(route, relativePath)) continue;
    if (redirectRules.some((rule) => matchesRedirect(route, rule?.source))) continue;

    const html = await readFile(file, 'utf8');
    if (htmlIsNoindex(html)) continue;

    const href = canonicalHref(html);
    if (!href) continue;

    let canonical;
    try {
      canonical = new URL(href);
    } catch {
      continue;
    }

    if (canonical.protocol !== 'https:' || canonical.origin !== preferredOrigin) continue;
    if (canonical.username || canonical.password || canonical.search || canonical.hash) continue;
    if (canonical.pathname !== route) continue;

    const url = canonical.href;
    if (seen.has(url)) throw new Error(`Duplicate canonical URL in built HTML: ${url}`);
    seen.add(url);
    urls.push(url);
  }

  urls.sort((a, b) => a.localeCompare(b));
  if (!urls.includes(`${preferredOrigin}/`)) {
    throw new Error(`The generated sitemap must include the canonical homepage ${preferredOrigin}/`);
  }

  const robots = await readFile(resolve(projectRoot, 'public/robots.txt'), 'utf8');
  const expectedSitemapDirective = `Sitemap: ${preferredOrigin}/sitemap.xml`;
  if (!robots.split(/\r?\n/).some((line) => line.trim() === expectedSitemapDirective)) {
    throw new Error(`public/robots.txt must include ${expectedSitemapDirective}`);
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n');

  await Promise.all([
    writeFile(resolve(projectRoot, 'sitemap.xml'), xml, 'utf8'),
    writeFile(resolve(projectRoot, 'public/sitemap.xml'), xml, 'utf8'),
    writeFile(resolve(projectRoot, 'robots.txt'), robots, 'utf8'),
    writeFile(resolve(outputRoot, 'sitemap.xml'), xml, 'utf8'),
    writeFile(resolve(outputRoot, 'robots.txt'), robots, 'utf8'),
  ]);

  console.log(`Generated dist/sitemap.xml with ${urls.length} canonical, indexable page(s):`);
  for (const url of urls) console.log(`  ${url}`);
}

async function buildLegacyStaticSite() {
  const rootEntries = await readdir(projectRoot, { withFileTypes: true });
  const htmlPages = rootEntries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => name.toLowerCase().endsWith('.html'))
    .filter((name) => name.toLowerCase() !== 'index.html.html')
    .filter((name) => !excludedNamePattern.test(name));

  if (!htmlPages.includes('index.html')) {
    throw new Error('Static build requires the root index.html homepage.');
  }

  await rm(outputRoot, { recursive: true, force: true });
  await mkdir(outputRoot, { recursive: true });
  await Promise.all([
    ...htmlPages.map((name) => cp(resolve(projectRoot, name), resolve(outputRoot, name))),
    cp(resolve(projectRoot, 'styles.css'), resolve(outputRoot, 'styles.css')),
    cp(resolve(projectRoot, 'script.js'), resolve(outputRoot, 'script.js')),
    cp(resolve(projectRoot, 'public'), outputRoot, { recursive: true }),
  ]);
  await generateSitemap();
  console.log('Recon Brief static build written to dist/');
}

if (process.argv.includes('--sitemap-only')) {
  await generateSitemap();
} else {
  await buildLegacyStaticSite();
}
