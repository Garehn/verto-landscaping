// Walks every route and dumps the rendered copy plus the internal link graph,
// so the copy map reflects what is actually on the site rather than what the
// source suggests should be.
import fs from 'node:fs';
import { chromium } from 'playwright';

const routes = [
  { path: '/', name: 'Home' },
  { path: '/portfolio', name: 'Projects (index)' },
  { path: '/portfolio/castlecrag-terrace', name: 'Project: Pool & harbour terrace' },
  { path: '/portfolio/middle-cove-deck', name: 'Project: Hardwood pool deck' },
  { path: '/portfolio/castlecrag-arrival', name: 'Project: Cobblestone arrival court' },
  { path: '/portfolio/northbridge-terraces', name: 'Project: Sandstone terracing' },
  { path: '/portfolio/willoughby-courtyard', name: 'Project: Courtyard & screen' },
  { path: '/services', name: 'Services' },
  { path: '/contact', name: 'Contact / Get a quote' },
  { path: '/about', name: 'About (orphaned, not linked)' },
  { path: '/process', name: 'Process (orphaned, not linked)' },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const out = [];

for (const route of routes) {
  await page.goto(`http://localhost:3001${route.path}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3200);
  // Force every scroll-triggered reveal to fire so nothing is missed.
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += window.innerHeight / 2) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await page.waitForTimeout(900);

  const data = await page.evaluate(() => {
    const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();
    const scope = (el) => {
      if (el.closest('header')) return 'HEADER';
      if (el.closest('footer')) return 'FOOTER';
      return 'PAGE';
    };

    // Copy blocks in document order.
    const blocks = [];
    const seen = new Set();
    const sel = 'h1, h2, h3, h4, p, li, dt, dd, figcaption, blockquote, label, button, a.btn-cta, .meta, .meta-sm, .wordmark';
    document.querySelectorAll(sel).forEach((el) => {
      const text = clean(el.textContent);
      if (!text) return;
      // Skip a parent whose text is fully covered by a child we already took.
      const key = scope(el) + '|' + text;
      if (seen.has(key)) return;
      seen.add(key);
      blocks.push({
        scope: scope(el),
        tag: el.tagName.toLowerCase(),
        cls: [...el.classList].filter((c) => ['meta', 'meta-sm', 'display', 'display-md', 'wordmark', 'btn-cta'].includes(c)).join(' '),
        text,
      });
    });

    // Internal links.
    const links = [];
    document.querySelectorAll('a[href]').forEach((a) => {
      const href = a.getAttribute('href');
      // Card links wrap a heading plus meta; the heading is the meaningful label.
      const heading = a.querySelector('h1, h2, h3, h4');
      let text = clean(heading ? heading.textContent : a.textContent);
      if (!text) text = a.querySelector('img') ? '(image link)' : '(no text)';
      if (text.length > 70) text = text.slice(0, 67).trim() + '…';
      links.push({ href, text, scope: scope(a) });
    });

    return { title: document.title, blocks, links };
  });

  out.push({ ...route, ...data });
  console.log(`${route.path}  blocks:${data.blocks.length}  links:${data.links.length}`);
}

await browser.close();
fs.writeFileSync('shots/copy-map.json', JSON.stringify(out, null, 2));
console.log('wrote shots/copy-map.json');
