// Локальная UI-проверка: все API подменены, аналитика и внешняя сеть запрещены.
// Никаких записей в БД, списаний квоты или обращений к продакшену.
const assert = require('node:assert/strict');
const { chromium } = require('/Users/olgalapina/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 960 }, serviceWorkers: 'block' });
  await context.route('**/*', route => {
    const url = new URL(route.request().url());
    if (url.hostname !== '127.0.0.1') return route.abort();
    if (url.pathname.startsWith('/api/')) {
      const body = url.pathname === '/api/trainer/consume'
        ? { allowed: true, unlimited: true, registered: false, remaining: 999, limit: 999 }
        : url.pathname.includes('products') ? [] : { ok: true };
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(body) });
    }
    return route.continue();
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const base = `${process.env.MCKO_CHECK_ORIGIN || 'http://127.0.0.1:3107'}/podgotovka-k-mcko`;
  for (const subject of ['russkiy', 'matematika']) {
    const response = await page.goto(`${base}/5-klass/${subject}`, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200);
    assert.equal(await page.locator(`a[href^="/podgotovka-k-mcko/5-klass/${subject}/variant-"]`).count(), 20);
    for (let id = 1; id <= 20; id++) {
      const response = await page.goto(`${base}/5-klass/${subject}/variant-${id}`, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200);
      await page.locator('ol > li').first().waitFor();
      assert.equal(await page.locator('ol > li').count(), subject === 'russkiy' ? 5 : 11);
      assert.equal(await page.locator('ol details').count(), subject === 'russkiy' ? 10 : 11);
      assert.equal(await page.locator('ol details[open]').count(), 0);
      assert.ok((await page.locator('h1').innerText()).includes(`вариант ${id}`));
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      assert.ok(canonical.endsWith(`/5-klass/${subject}/variant-${id}`));
      if (subject === 'matematika') assert.equal(await page.locator('ol svg[role="img"]').count(), 4);
      if (id === 1 || id === 20) {
        await page.screenshot({ path: `/private/tmp/mcko5-${subject}-${id}-desktop.png` });
        await page.locator('ol details summary').first().click();
        assert.equal(await page.locator('ol details[open]').count(), 1);
        await page.emulateMedia({ media: 'print' });
        assert.equal(await page.locator('ol details[open]').isVisible(), false);
        if (subject === 'matematika') assert.equal(await page.locator('ol svg').first().isVisible(), true);
        await page.emulateMedia({ media: 'screen' });
        await page.setViewportSize({ width: 390, height: 844 });
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
        assert.equal(overflow, false, `Horizontal overflow: ${subject} ${id}`);
        await page.screenshot({ path: `/private/tmp/mcko5-${subject}-${id}-mobile.png` });
        if (subject === 'matematika') await page.locator('ol > li').nth(4).screenshot({ path: `/private/tmp/mcko5-grid-${id}.png` });
        await page.setViewportSize({ width: 1280, height: 960 });
      }
    }
    console.log(`PASS: ${subject}: 20 URLs, content, canonical, hidden answers; 1/20 desktop, mobile and print.`);
  }
  await page.goto(base, { waitUntil: 'networkidle' });
  assert.equal(await page.getByRole('heading', { name: '5 класс', exact: true }).count(), 1);
  assert.equal(errors.length, 0, errors.join('\n'));
  console.log('PASS: hub, 40 pages; no browser errors. API calls mocked; production untouched.');
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
