import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));

  try {
    await page.goto('http://localhost:5173');
    await page.waitForTimeout(5000);
    const content = await page.content();
    console.log('Page Content Length:', content.length);
  } catch (e) {
    console.log('Navigation Error:', e.message);
  } finally {
    await browser.close();
  }
})();
