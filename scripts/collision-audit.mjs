// Detects overlapping header elements, which a plain overflow check misses.
import { chromium } from 'playwright';

const browser = await chromium.launch();
for (const width of [320, 375, 430, 768, 1024, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 800 } });
  await page.goto('http://localhost:3001/portfolio', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2200);

  const report = await page.evaluate(() => {
    const header = document.querySelector('header');
    const boxes = [...header.querySelectorAll('a, button')]
      .map((el) => ({ el, r: el.getBoundingClientRect() }))
      .filter((b) => b.r.width > 0 && b.r.height > 0);
    const overlaps = [];
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i].r, b = boxes[j].r;
        if (boxes[i].el.contains(boxes[j].el) || boxes[j].el.contains(boxes[i].el)) continue;
        const overlapX = Math.min(a.right, b.right) - Math.max(a.left, b.left);
        const overlapY = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (overlapX > 1 && overlapY > 1) {
          overlaps.push(`${(boxes[i].el.textContent || '').trim().slice(0, 18)} <-> ${(boxes[j].el.textContent || '').trim().slice(0, 18)} (${Math.round(overlapX)}px)`);
        }
      }
    }
    const docOverflow = document.documentElement.scrollWidth - window.innerWidth;
    return { overlaps, docOverflow };
  });

  console.log(`${width}px  overflow:${report.docOverflow}  collisions:`, report.overlaps.length ? report.overlaps : 'none');
  await page.close();
}
await browser.close();
