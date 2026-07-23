import { chromium } from 'playwright';

const browser = await chromium.launch();

// 1) Tap-target sizes on the homepage at a common phone width.
{
  const page = await browser.newPage({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2800);
  const small = await page.evaluate(() => {
    const clickable = [...document.querySelectorAll('a, button')];
    return clickable
      .map((el) => {
        const r = el.getBoundingClientRect();
        return { text: (el.textContent || '').trim().slice(0, 30), w: Math.round(r.width), h: Math.round(r.height) };
      })
      .filter((el) => el.text && (el.h < 40 || el.w < 40) && el.h > 0);
  });
  console.log('=== small tap targets on / (h<40 or w<40, h>0) ===');
  console.log(JSON.stringify(small, null, 1));
  await page.close();
}

// 2) Mobile menu open/close on the header.
{
  const page = await browser.newPage({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2800);
  const burger = await page.$('header button[aria-label="Open menu"]');
  console.log('\n=== mobile menu ===');
  console.log('burger button found:', !!burger);
  if (burger) {
    await burger.click();
    await page.waitForTimeout(900);
    const overlayVisible = await page.evaluate(() => {
      const items = [...document.querySelectorAll('a')].filter((a) => a.textContent?.includes('Get a quote'));
      return items.some((a) => a.getBoundingClientRect().width > 0 && getComputedStyle(a).visibility !== 'hidden');
    });
    console.log('overlay menu items visible after click:', overlayVisible);
    await page.screenshot({ path: 'shots/audit-menu-open.png' });
    const closeBtn = await page.$('header button[aria-label="Close menu"]');
    console.log('close button found:', !!closeBtn);
    if (closeBtn) {
      await closeBtn.click();
      await page.waitForTimeout(900);
      const stillOpen = await page.evaluate(() => document.body.style.overflow === 'hidden');
      console.log('body scroll locked after close (should be false):', stillOpen);
    }
  }
  await page.close();
}

// 3) Extreme widths: very small phone (320) and large phone (430).
for (const width of [320, 430]) {
  const page = await browser.newPage({ viewport: { width, height: 800 }, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3001/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2600);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  console.log(`\n=== width ${width}px === overflow px:`, overflow);
  await page.screenshot({ path: `shots/audit-${width}.png` });
  await page.close();
}

await browser.close();
console.log('\ndone');
