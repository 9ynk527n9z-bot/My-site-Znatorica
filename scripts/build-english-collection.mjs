// Снимает опубликованные таблицы раздела /tablicy для PDF-сборника «Английский язык».
//
// Снимок делается с экранной версии блока таблицы, а не через печать: на сайте
// печать намеренно обесцвечивает материал (.print-page * — прозрачный фон, чёрный
// текст), чтобы родители не тратили краску. Платный сборник, наоборот, должен быть
// цветным — с эмодзи и цветными карточками, как на сайте.
//
// Запуск: сначала dev-сервер на localhost:3000, затем
//   node scripts/build-english-collection.mjs

import { chromium } from 'playwright-core';
import { mkdir, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.BASE_URL || 'http://localhost:3000';
const OUT_DIR = path.resolve('tmp/pdfs/english-build');

// Порядок страниц: сначала наглядные таблицы с эмодзи,
// алфавит и неправильные глаголы — в конце.
const TABLES = [
  { slug: 'tsveta-po-anglijski', title: 'Colours', ru: 'Цвета', icon: '🎨' },
  { slug: 'zhivotnye-po-anglijski', title: 'Domestic and Wild Animals', ru: 'Домашние и дикие животные', icon: '🐾' },
  { slug: 'eda-po-anglijski', title: 'Food', ru: 'Еда', icon: '🍎' },
  { slug: 'semya-po-anglijski', title: 'Family', ru: 'Семья', icon: '👪' },
  { slug: 'chasti-tela-po-anglijski', title: 'Body Parts', ru: 'Части тела', icon: '🙌' },
  { slug: 'odezhda-po-anglijski', title: 'Clothes', ru: 'Одежда', icon: '👕' },
  { slug: 'shkolnye-prinadlezhnosti-po-anglijski', title: 'School Things', ru: 'Школьные принадлежности', icon: '🎒' },
  { slug: 'anglijskie-chislitelnye', title: 'Numbers 1–20', ru: 'Числительные', icon: '🔢' },
  { slug: 'dni-nedeli-po-anglijski', title: 'Days of the Week', ru: 'Дни недели', icon: '📅' },
  { slug: 'mesyatsy-i-vremena-goda-po-anglijski', title: 'Months and Seasons', ru: 'Месяцы и времена года', icon: '🌍' },
  { slug: 'alfavit-po-anglijski', title: 'English Alphabet', ru: 'Алфавит', icon: '🔤' },
  { slug: 'nepravilnye-glagoly', title: 'Irregular Verbs', ru: 'Неправильные глаголы', icon: '📖' },
];

// Таблицы на сайте перестраиваются под ширину окна, поэтому ширина подбирается так,
// чтобы снимок лёг в пропорции листа A4. Без этого широкие таблицы занимают половину
// листа, а узкие вытягиваются на всю высоту — страницы выглядят разнородно.
const A4_RATIO = 210 / 297;
const WIDTHS = [1180, 1000, 860, 740, 640, 560, 480];

async function chromiumExecutable() {
  const root = path.join(process.env.HOME, 'Library/Caches/ms-playwright');
  const dirs = await readdir(root);
  const dir = dirs.find((d) => d.startsWith('chromium-'));
  return path.join(
    root,
    dir,
    'chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
  );
}

// Оболочка сайта (шапка, футер, кнопки экспорта, плашка про cookie) не должна
// попадать на лист.
async function hideSiteChrome(page) {
  await page.evaluate(() => {
    for (const node of document.querySelectorAll('nav, footer, .no-print')) {
      node.style.display = 'none';
    }
    for (const node of document.querySelectorAll('body *')) {
      if (getComputedStyle(node).position === 'fixed') node.style.display = 'none';
    }
  });
}

// Печать на сайте намеренно обесцвечивает таблицы (.print-page * — прозрачный фон,
// чёрный текст), чтобы родители не тратили краску. Платный сборник должен быть
// цветным, поэтому экранные цвета переписываются в сами элементы со значением
// !important — инлайн-стиль с !important сильнее правила из таблицы стилей.
async function lockScreenColors(page) {
  await page.evaluate(() => {
    const sheet = document.querySelector('.print-page');
    if (!sheet) return;
    for (const node of [sheet, ...sheet.querySelectorAll('*')]) {
      const style = getComputedStyle(node);
      const locked = {
        'background-color': style.backgroundColor,
        'background-image': style.backgroundImage,
        color: style.color,
        'border-top-color': style.borderTopColor,
        'border-right-color': style.borderRightColor,
        'border-bottom-color': style.borderBottomColor,
        'border-left-color': style.borderLeftColor,
      };
      for (const [property, value] of Object.entries(locked)) {
        if (value && value !== 'none') node.style.setProperty(property, value, 'important');
      }
    }
  });
}

const PDF_OPTIONS = {
  format: 'A4',
  printBackground: true,
  margin: { top: '10mm', bottom: '10mm', left: '9mm', right: '9mm' },
};

function pageCount(buffer) {
  return (buffer.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
}

// Ширина окна подбирается так, чтобы таблица легла в пропорции листа A4, затем
// масштаб уменьшается до тех пор, пока страница не уместится на один лист.
async function renderTable(page, url) {
  // Режим печати остаётся включённым с прошлой таблицы, а мерить нужно экранную вёрстку.
  await page.emulateMedia({ media: 'screen' });
  let best = null;
  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 1400 });
    await page.goto(url, { waitUntil: 'networkidle' });
    const sheet = page.locator('.print-page').first();
    await sheet.waitFor({ state: 'visible' });
    const box = await sheet.boundingBox();
    const distance = Math.abs(box.width / box.height - A4_RATIO);
    if (!best || distance < best.distance) best = { distance, width, ratio: box.width / box.height };
  }

  await page.setViewportSize({ width: best.width, height: 1400 });
  await page.goto(url, { waitUntil: 'networkidle' });
  await hideSiteChrome(page);
  await lockScreenColors(page);
  await page.emulateMedia({ media: 'print' });

  // Перебор идёт от большего к меньшему: берётся самый крупный масштаб, при котором
  // таблица ещё умещается на один лист. Иначе мелкие таблицы (например, «Цвета»)
  // занимают треть страницы и сборник выглядит разнородным.
  const SCALES = [1.7, 1.55, 1.4, 1.3, 1.2, 1.1, 1, 0.95, 0.9, 0.85, 0.8, 0.72, 0.65, 0.58];
  for (const scale of SCALES) {
    const pdf = await page.pdf({ ...PDF_OPTIONS, scale });
    if (pageCount(pdf) === 1) return { ...best, scale, pdf };
  }
  return { ...best, scale: 0.5, pdf: await page.pdf({ ...PDF_OPTIONS, scale: 0.5 }) };
}

const browser = await chromium.launch({ executablePath: await chromiumExecutable() });
const page = await browser.newPage({ deviceScaleFactor: 2 });
await mkdir(OUT_DIR, { recursive: true });

for (const [i, table] of TABLES.entries()) {
  const result = await renderTable(page, `${BASE}/tablicy/${table.slug}`);
  const name = `${String(i + 1).padStart(2, '0')}-${table.slug}.pdf`;
  await writeFile(path.join(OUT_DIR, name), result.pdf);
  console.log(
    'готово:',
    name,
    `окно ${result.width}px, пропорция ${result.ratio.toFixed(2)}, масштаб ${result.scale}`,
  );
}

// Содержание — нумерация с учётом обложки (стр. 1) и самого содержания (стр. 2).
const contentsHtml = `
<style>
  @page { size: A4; margin: 0; }
  body { margin: 0; font-family: -apple-system, 'Segoe UI', Roboto, Arial, sans-serif; background: #fff; color: #1e293b; }
  /* Чуть меньше 297mm: ровно в высоту листа страница округляется до двух. */
  .sheet { box-sizing: border-box; width: 210mm; height: 296mm; padding: 24mm 22mm; background: #fff; overflow: hidden; }
  h1 { text-align: center; font-size: 36px; margin: 0 0 6px; color: #4c1d95; }
  .sub { text-align: center; color: #64748b; font-size: 17px; margin: 0 0 34px; }
  ol { list-style: none; padding: 0; margin: 0; }
  li { display: flex; align-items: center; gap: 14px; border: 2px solid #e2e8f0; border-radius: 14px; padding: 13px 18px; margin-bottom: 10px; }
  .num { flex: 0 0 32px; height: 32px; border-radius: 50%; background: #7c3aed; color: #fff; font-weight: 700; font-size: 15px; display: flex; align-items: center; justify-content: center; }
  .icon { font-size: 24px; }
  .name { font-weight: 700; font-size: 18px; }
  .ru { color: #64748b; font-size: 14px; }
  .pageno { margin-left: auto; color: #94a3b8; font-size: 14px; white-space: nowrap; }
  footer { text-align: center; color: #94a3b8; font-size: 13px; margin-top: 30px; }
</style>
<div class="sheet" id="sheet">
  <h1>Содержание</h1>
  <p class="sub">${TABLES.length} таблиц английского языка</p>
  <ol>
    ${TABLES.map(
      (t, i) => `<li>
      <span class="num">${i + 1}</span>
      <span class="icon">${t.icon}</span>
      <span><span class="name">${t.title}</span><br><span class="ru">${t.ru}</span></span>
      <span class="pageno">стр. ${i + 3}</span>
    </li>`,
    ).join('')}
  </ol>
  <footer>Знаторика · znatorica.ru</footer>
</div>`;

await page.setViewportSize({ width: 900, height: 1400 });
await page.setContent(contentsHtml, { waitUntil: 'load' });
await page.emulateMedia({ media: 'print' });
await writeFile(
  path.join(OUT_DIR, '00-soderzhanie.pdf'),
  await page.pdf({ format: 'A4', printBackground: true, margin: { top: 0, bottom: 0, left: 0, right: 0 } }),
);
console.log('готово: 00-soderzhanie.pdf');

await browser.close();
console.log('\nВсе снимки в', OUT_DIR);
