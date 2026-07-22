// Screenshot harness for design iteration.
// Usage: node scripts/shoot.mjs [url-path] [outPrefix] [--mobile]
// Scrolls through the page viewport-by-viewport so scroll-triggered
// animations fire, then captures each stop.
import { chromium } from 'playwright';

const path = process.argv[2] ?? '/';
const prefix = process.argv[3] ?? 'shot';
const mobile = process.argv.includes('--mobile');

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 },
  deviceScaleFactor: mobile ? 2 : 1,
});

await page.goto(`http://localhost:3001${path}`, { waitUntil: 'networkidle' });
// Let the preloader finish + hero settle.
await page.waitForTimeout(3400);

const total = await page.evaluate(() => document.body.scrollHeight);
const vh = await page.evaluate(() => window.innerHeight);
const stops = Math.min(Math.ceil(total / vh), 14);

for (let i = 0; i < stops; i++) {
  const y = Math.min(i * vh, total - vh);
  await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y);
  await page.waitForTimeout(1300); // let reveals play
  await page.screenshot({ path: `shots/${prefix}-${String(i).padStart(2, '0')}.png` });
}

await browser.close();
console.log(`captured ${stops} stops of ${total}px into shots/${prefix}-*.png`);
