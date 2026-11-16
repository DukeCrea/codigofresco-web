import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const base = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:3106';
const origin = 'https://codigofresco.com';
const personId = `${origin}/nosotros#antonio-duque`;
const output = new URL('../output/seo-geo/', import.meta.url);
await mkdir(output, { recursive: true });
const report = { pages: [], assets: [], jsonLdBlocks: 0, articles: 0, caseImages: 0, entityIds: 0 };
const identities = new Map();
const broken = /Ã|Â|�|â€/;
function walk(value, visit) {
  if (Array.isArray(value)) value.forEach((item) => walk(item, visit));
  else if (value && typeof value === 'object') { visit(value); Object.values(value).forEach((item) => walk(item, visit)); }
}
async function get(path) {
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
  return response;
}
const sitemap = await (await get('/sitemap.xml')).text();
const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, xml]) => ({ path: xml.match(/<loc>(.*?)<\/loc>/)[1].replace(origin, '') || '/', date: xml.match(/<lastmod>(.*?)<\/lastmod>/)[1] }));
assert.equal(new Set(entries.map((entry) => entry.path)).size, entries.length, 'URLs duplicadas en sitemap');
for (const { path, date } of entries) {
  const response = await get(path);
  assert.match(response.headers.get('content-type'), /text\/html;\s*charset=utf-8/i);
  const html = await response.text();
  assert.ok(!broken.test(html), `${path}: mojibake`);
  assert.match(html, /<head><meta charSet="utf-8"\/>/i, `${path}: charset no es la primera etiqueta`);
  assert.match(html, /rel="canonical"/);
  const blocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  assert.ok(blocks.length, `${path}: JSON-LD ausente`);
  const graph = blocks.map(([, text]) => JSON.parse(text));
  report.jsonLdBlocks += graph.length;
  walk(graph, (node) => {
    for (const key of ['address', 'priceRange', 'aggregateRating']) assert.ok(!(key in node), `${path}: propiedad prohibida ${key}`);
    assert.notEqual(node['@type'], 'Review');
    if (node['@id']) {
      // Comparar identidad, no traducciones legítimas de descripciones o títulos.
      const current = identities.get(node['@id']) || {};
      for (const key of ['name', 'url', 'logo', 'image', 'creator']) {
        if (node[key] === undefined) continue;
        if (current[key] !== undefined) assert.deepEqual(node[key], current[key], `${path}: ${node['@id']} contradice ${key}`);
        current[key] = node[key];
      }
      identities.set(node['@id'], current);
    }
    if (['Article', 'BlogPosting'].includes(node['@type'])) {
      assert.ok(node['@id'], `${path}: artículo sin identificador`);
      report.articles++;
      assert.equal(node.author['@id'], personId, `${path}: autor incorrecto`);
      assert.match(node.datePublished, /^\d{4}-\d{2}-\d{2}/);
      assert.equal(node.dateModified, date, `${path}: fecha distinta del sitemap`);
      assert.ok(node.datePublished <= node.dateModified, `${path}: modificación anterior a publicación`);
      assert.ok(node.image && node.inLanguage);
    }
    if (node.dateModified && !['Article', 'BlogPosting'].includes(node['@type'])) assert.equal(node.dateModified, date, `${path}: fecha de página distinta del sitemap`);
  });
  if (/^\/(?:casos|en\/cases)\//.test(path)) {
    const og = html.match(/property="og:image" content="([^"]+)"/);
    const twitter = html.match(/name="twitter:image" content="([^"]+)"/);
    assert.ok(og && twitter, `${path}: imagen social ausente`);
    assert.ok(og[1].includes(`${path}/opengraph-image`), `${path}: OG genérica`);
    assert.equal(twitter[1], og[1], `${path}: Twitter no usa la imagen del caso`);
    const image = await get(og[1].replace(origin, '').replaceAll('&amp;', '&'));
    const meta = await sharp(Buffer.from(await image.arrayBuffer())).metadata();
    assert.equal(meta.width, 1200); assert.equal(meta.height, 630);
    assert.match(html, /id="resumen"/);
    report.caseImages++;
  }
  if (['/', '/en', '/nosotros', '/en/about', '/casos/zodesk-ecosistema-full-funnel', '/en/cases/zodesk-full-funnel-ecosystem', '/recursos/wordpress-shopify-o-desarrollo-a-medida', '/blog/la-gestacion-de-una-oportunidad'].includes(path)) {
    await writeFile(new URL(`${path.replaceAll('/', '_') || 'home'}.html`, output), html);
    await writeFile(new URL(`${path.replaceAll('/', '_') || 'home'}.json`, output), JSON.stringify(graph, null, 2));
  }
  report.pages.push({ path, status: 200, date });
}
for (const path of ['/robots.txt', '/sitemap.xml', '/llms.txt', '/llms-full.txt', '/manifest.webmanifest', '/favicon.ico', '/apple-icon.png', '/logo-codigofresco.png']) {
  const response = await get(path);
  const type = response.headers.get('content-type');
  const buffer = Buffer.from(await response.arrayBuffer());
  if (/\.(txt|xml|webmanifest)$/.test(path)) {
    assert.match(type, /charset=utf-8/i, `${path}: falta charset`);
    assert.ok(!broken.test(buffer.toString('utf8')), `${path}: mojibake`);
    if (path.endsWith('webmanifest')) JSON.parse(buffer.toString('utf8'));
  } else if (path.endsWith('.png')) {
    const meta = await sharp(buffer).metadata();
    assert.equal(meta.width, path.includes('apple') ? 180 : 512);
    assert.equal(meta.height, meta.width);
  } else {
    assert.equal(buffer.readUInt16LE(4), 2);
    assert.deepEqual([buffer[6], buffer[22]], [32, 48]);
  }
  report.assets.push({ path, status: 200, contentType: type });
}
report.entityIds = identities.size;
await writeFile(new URL('verificacion.json', output), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ pages: report.pages.length, assets: report.assets, jsonLdBlocks: report.jsonLdBlocks, articles: report.articles, caseImages: report.caseImages, entityIds: report.entityIds }, null, 2));
