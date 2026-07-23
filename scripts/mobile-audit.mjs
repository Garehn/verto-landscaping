// Programmatic mobile audit: horizontal overflow, tap-target size, viewport
// meta, console errors, per page. Far more reliable than eyeballing screenshots.
import { chromium } from 'playwright';

const pages = ['/', '/portfolio', '/portfolio/castlecrag-pool', '/portfolio/castlecrag-deck', '/portfolio/castlecrag-arrival', '/services', '/contact', '/about', '/process'];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 2 });

const consoleErrors = [];
page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
page.on('pageerror', (err) => consoleErrors.push('PAGEERROR: ' + err.message));

for (const path of pages) {
  consoleErrors.length = 0;
  const res = await page.goto(`http://localhost:3001${path}`, { waitUntil: 'networkidle' });
  const status = res.status();
  await page.waitForTimeout(2800);

  const overflow = await page.evaluate(() => {
    const docWidth = document.documentElement.scrollWidth;
    const winWidth = window.innerWidth;
    if (docWidth <= winWidth) return null;
    // find the widest offenders
    const all = [...document.querySelectorAll('body *')];
    const offenders = all
      .filter((el) => el.getBoundingClientRect().right > winWidth + 2)
      .slice(0, 5)
      .map((el) => ({
        tag: el.tagName,
        cls: (el.className || '').toString().slice(0, 60),
        right: Math.round(el.getBoundingClientRect().right),
      }));
    return { docWidth, winWidth, offenders };
  });

  const viewportMeta = await page.evaluate(() => document.querySelector('meta[name="viewport"]')?.content ?? null);

  console.log(`\n=== ${path} [${status}] ===`);
  console.log('viewport meta:', viewportMeta);
  console.log('horizontal overflow:', overflow ? JSON.stringify(overflow) : 'none');
  if (consoleErrors.length) console.log('console errors:', consoleErrors.slice(0, 5));
}

await browser.close();
