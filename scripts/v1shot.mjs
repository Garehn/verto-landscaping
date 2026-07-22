import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);
await page.screenshot({ path: 'shots/v1-hero.png' });
await browser.close();
console.log('done');
