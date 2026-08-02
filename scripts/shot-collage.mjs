import { chromium } from 'playwright';
const b = await chromium.launch();
const errs = [];
const routes = [
  ['/portfolio', 'idx'],
  ['/portfolio/pool-terrace', 'p1'],
  ['/portfolio/cobblestone-drive', 'p2'],
  ['/portfolio/screened-terrace', 'p3'],
];
const width = Number(process.env.W || 1440);
for (const [route, name] of routes) {
  // reduced motion makes every Reveal render as a static div, so the capture
  // shows layout rather than whichever animations happened to have fired.
  const page = await b.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  page.on('pageerror', e => errs.push(`${route} PAGEERROR ${e.message}`));
  page.on('console', m => { if (m.type() === 'error') errs.push(`${route} ${m.text()}`); });
  const res = await page.goto(`http://localhost:3001${route}`, { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 110)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
  const m = await page.evaluate(() => ({ h: document.documentElement.scrollHeight, ov: document.documentElement.scrollWidth - window.innerWidth }));
  await page.screenshot({ path: `/tmp/shots/${name}${width === 1440 ? '' : '-' + width}.png`, fullPage: true });
  console.log(`${route} [${res.status()}] h=${m.h} overflow=${m.ov}`);
  await page.close();
}
console.log(errs.length ? 'ERRORS: ' + JSON.stringify(errs.slice(0, 8)) : 'no console errors');
await b.close();
