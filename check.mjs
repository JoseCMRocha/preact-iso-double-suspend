// Records what's on screen after clicking "Go to page B", in Chromium and
// WebKit. Start `PORT=5199 npm start` first; needs `npm i playwright`.
import { chromium, webkit } from 'playwright';

for (const type of [chromium, webkit]) {
  const browser = await type.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5199/');
  await page.getByText('Go to page B').click();
  const start = Date.now();
  for (const at of [100, 300, 600, 900, 1300]) {
    await page.waitForTimeout(at - (Date.now() - start));
    const text = await page.evaluate(() => document.getElementById('app').innerText);
    console.log(`${type.name()} ${at} ms after the click: ${JSON.stringify(text)}`);
  }
  await browser.close();
}
