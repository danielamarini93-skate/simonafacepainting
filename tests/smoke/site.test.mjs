// Smoke tests against the built site. Run: npm run build && npm run test:smoke
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
// Uses the project's playwright if installed, else a globally installed one.
const require = createRequire(import.meta.url);
const { chromium } = (() => { try { return require('playwright'); } catch { return require(require('node:child_process').execSync('npm root -g').toString().trim() + '/playwright'); } })();

const PORT = 4399;
const BASE = `http://localhost:${PORT}`;
const LIVE_URLS = ['/', '/about/', '/services/', '/services/face-painting-children-adults/', '/services/childrens-face-painting/',
  '/services/glitter-bar-kids-adults/', '/services/glitter-tattoos-children-adults/', '/services/seasonal-themed-events/',
  '/pricing/', '/areas-we-cover/', '/gallery/', '/faqs/', '/contact/', '/privacy-policy/', '/terms-conditions/'];

let server, browser;
test.before(async () => {
  // Minimal static server for dist/ (same rules as Netlify: dir -> index.html)
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.mp4': 'video/mp4', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.xml': 'application/xml' };
  server = createServer((req, res) => {
    let p = join('dist', decodeURIComponent(new URL(req.url, BASE).pathname));
    if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html');
    if (!existsSync(p)) { res.writeHead(404); return res.end(readFileSync('dist/404.html')); }
    res.writeHead(200, { 'content-type': types[extname(p)] || 'application/octet-stream' }); res.end(readFileSync(p));
  }).listen(PORT);
  browser = await chromium.launch();
});
test.after(async () => { await browser?.close(); server?.close(); });

test('every URL from the old WordPress sitemap still exists, with a unique title and one H1', async () => {
  const titles = new Set();
  for (const u of LIVE_URLS) {
    const res = await fetch(BASE + u); assert.equal(res.status, 200, u);
    const html = await res.text();
    const title = html.match(/<title>([^<]+)<\/title>/)[1];
    assert.ok(!titles.has(title), `duplicate title ${title}`); titles.add(title);
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `one h1 on ${u}`);
    assert.match(html, /<meta name="description" content="[^"]{50,}"/, `description on ${u}`);
    assert.match(html, /wa\.me\/447459889053/, `WhatsApp link on ${u}`);
  }
});

test('hacked and placeholder WordPress pages are marked gone (410)', () => {
  const toml = readFileSync('netlify.toml', 'utf8');
  for (const p of ['/landing-1/', '/landing-2/', '/landing-3/', '/amen/']) {
    assert.match(toml, new RegExp(`from = "${p}\\*"\\s+to = "/404.html"\\s+status = 410`), p);
  }
  assert.ok(!existsSync('dist/amen/index.html'));
});

test('security headers are configured', () => {
  const toml = readFileSync('netlify.toml', 'utf8');
  for (const h of ['Strict-Transport-Security', 'X-Content-Type-Options', 'X-Frame-Options', 'Referrer-Policy']) assert.ok(toml.includes(h), h);
});

test('hero video has a poster so the page works when autoplay is blocked', async () => {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(BASE + '/');
  const poster = await page.locator('.hero-media video').getAttribute('poster');
  assert.ok(poster && poster.endsWith('.webp'));
  assert.ok(await page.locator('.hero .btn--wa').isVisible());
  await page.close();
});

test('no more than one WhatsApp button is visible in the first screen of each page (phone and desktop)', async () => {
  for (const vp of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
    for (const u of ['/', '/pricing/', '/gallery/', '/services/childrens-face-painting/', '/contact/', '/about/']) {
      const page = await browser.newPage({ viewport: vp });
      await page.goto(BASE + u); await page.waitForTimeout(500);
      // the three plan cards on /pricing/ are one choice (pick a package), counted once
      const n = await page.evaluate(() => [...document.querySelectorAll('a[href*="wa.me"]:not(.plan a)')].filter((a) => {
        const r = a.getBoundingClientRect(); let e = a, op = 1;
        while (e) { const cs = getComputedStyle(e); if (cs.display === 'none') return false; op *= +cs.opacity; e = e.parentElement; }
        return r.width > 0 && r.bottom > 0 && r.top < innerHeight && op > 0.1;
      }).length + (document.querySelector('.plan a[href*="wa.me"]') && [...document.querySelectorAll('.plan a[href*="wa.me"]')].some((a) => { const r = a.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight && getComputedStyle(a).display !== 'none'; }) ? 1 : 0));
      // contact page: the header's 'Get a quote' stays visible by request, next to the page's own WhatsApp card
      const max = u === '/contact/' && vp.width >= 1080 ? 2 : 1;
      assert.ok(n <= max, `${u} at ${vp.width}px shows ${n} WhatsApp buttons`);
      if (u === '/') assert.equal(n, 1, 'home hero keeps its WhatsApp button');
      await page.close();
    }
  }
});

test('nothing is fixed to the bottom of the screen on phones', async () => {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(BASE + '/pricing/'); await page.mouse.wheel(0, 2000); await page.waitForTimeout(600);
  const fixed = await page.evaluate(() => [...document.querySelectorAll('body *')].filter((e) => {
    const cs = getComputedStyle(e); const r = e.getBoundingClientRect();
    if (e.closest('details:not([open])')) return false; // closed menu
    return cs.position === 'fixed' && cs.display !== 'none' && +cs.opacity > 0.1 && r.height > 0 && r.bottom >= innerHeight - 4;
  }).map((e) => e.className));
  assert.deepEqual(fixed, []);
  await page.close();
});

test('gallery shows every photo without JavaScript', async () => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(BASE + '/gallery/');
  const count = await page.locator('.masonry li').count();
  const data = JSON.parse(readFileSync('src/data/gallery.json', 'utf8'));
  assert.equal(count, data.length);
  assert.equal(await page.locator('.masonry li:visible').count(), data.length);
  await ctx.close();
});

test('gallery filter hides other categories', async () => {
  const page = await browser.newPage();
  await page.goto(BASE + '/gallery/');
  await page.click('[data-filter="glitter-tattoos"]');
  const visible = await page.locator('.masonry li:visible').evaluateAll((els) => els.map((e) => e.dataset.category));
  assert.ok(visible.length > 0 && visible.every((c) => c === 'glitter-tattoos'));
  await page.close();
});

test('no image alt text or filename contains a personal name', () => {
  const data = JSON.parse(readFileSync('src/data/gallery.json', 'utf8'));
  for (const d of data) {
    assert.match(d.file, /^[a-z-]+-[0-9a-f]{8}\.jpg$/);
    assert.ok(d.alt && d.alt.length > 8);
  }
});
