// Снимает все таблицы раздела /tablicy для сводного сборника «Таблицы для начальной
// школы»: математика, русский язык, окружающий мир, английский язык.
//
// Печать на сайте намеренно обесцвечивает материал, чтобы родители не тратили краску,
// поэтому цвета экранной версии переписываются в элементы перед печатью — в платном
// сборнике таблицы должны быть цветными.
//
// Запуск: сначала dev-сервер на localhost:3000, затем
//   node scripts/build-tables-collection.mjs

import { chromium } from 'playwright-core';
import { mkdir, writeFile, readdir, rm } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.BASE_URL || 'http://localhost:3000';
const OUT_DIR = path.resolve('tmp/pdfs/tables-build');

export const SECTIONS = [
  {
    title: 'Математика',
    icon: '🔢',
    tables: [
      { slug: 'tablitsa-umnozheniya', title: 'Таблица умножения' },
      { slug: 'sostav-chisla', title: 'Состав числа' },
      { slug: 'edinitsy-izmereniya', title: 'Единицы измерения' },
      { slug: 'matematicheskie-znaki', title: 'Математические знаки' },
      { slug: 'kvadraty-chisel', title: 'Квадраты чисел' },
      { slug: 'rimskie-cifry', title: 'Римские цифры' },
      { slug: 'doli-i-drobi', title: 'Доли и дроби' },
      { slug: 'formuly-perimetra-i-ploshchadi', title: 'Формулы периметра и площади' },
    ],
  },
  {
    title: 'Русский язык',
    icon: '📝',
    tables: [
      { slug: 'padezhi-russkogo-yazyka', title: 'Падежи русского языка' },
      { slug: 'sklonenie-suschestvitelnykh', title: 'Склонение существительных' },
      { slug: 'chasti-rechi', title: 'Части речи' },
      { slug: 'spryazhenie-glagolov', title: 'Спряжение глаголов' },
      { slug: 'pristavki', title: 'Приставки' },
      { slug: 'chleny-predlozheniya', title: 'Члены предложения' },
      { slug: 'razbor-slova-po-sostavu', title: 'Разбор слова по составу' },
      { slug: 'glasnye-i-soglasnye-zvuki', title: 'Гласные и согласные звуки' },
      { slug: 'sinonimy-i-antonimy', title: 'Синонимы и антонимы' },
    ],
  },
  {
    title: 'Окружающий мир',
    icon: '🌍',
    tables: [
      { slug: 'mesyatsy-i-vremena-goda', title: 'Месяцы и времена года' },
      { slug: 'dni-nedeli', title: 'Дни недели' },
      { slug: 'domashnie-i-dikie-zhivotnye', title: 'Домашние и дикие животные' },
      { slug: 'zhivaya-nezhivaya-priroda', title: 'Живая и неживая природа' },
      { slug: 'stroenie-rasteniya', title: 'Строение растения' },
      { slug: 'tsep-pitaniya', title: 'Цепь питания' },
      { slug: 'krugovorot-vody', title: 'Круговорот воды' },
      { slug: 'organy-chuvstv', title: 'Органы чувств человека' },
      { slug: 'solnechnaya-sistema', title: 'Солнечная система' },
      { slug: 'prirodnye-zony-rossii', title: 'Природные зоны России' },
    ],
  },
  {
    title: 'Английский язык',
    icon: '🇬🇧',
    tables: [
      { slug: 'alfavit-po-anglijski', title: 'English Alphabet' },
      { slug: 'tsveta-po-anglijski', title: 'Colours' },
      { slug: 'anglijskie-chislitelnye', title: 'Numbers 1–20' },
      { slug: 'zhivotnye-po-anglijski', title: 'Domestic and Wild Animals' },
      { slug: 'eda-po-anglijski', title: 'Food' },
      { slug: 'semya-po-anglijski', title: 'Family' },
      { slug: 'chasti-tela-po-anglijski', title: 'Body Parts' },
      { slug: 'odezhda-po-anglijski', title: 'Clothes' },
      { slug: 'shkolnye-prinadlezhnosti-po-anglijski', title: 'School Things' },
      { slug: 'dni-nedeli-po-anglijski', title: 'Days of the Week' },
      { slug: 'mesyatsy-i-vremena-goda-po-anglijski', title: 'Months and Seasons' },
      { slug: 'nepravilnye-glagoly', title: 'Irregular Verbs' },
    ],
  },
];

const A4_RATIO = 210 / 297;
const WIDTHS = [1180, 900, 740, 600];
const SCALES = [1.7, 1.5, 1.3, 1.15, 1, 0.9, 0.8, 0.7, 0.6];

const PDF_OPTIONS = {
  format: 'A4',
  printBackground: true,
  margin: { top: '10mm', bottom: '10mm', left: '9mm', right: '9mm' },
};

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

function pageCount(buffer) {
  return (buffer.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
}

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

async function renderTable(page, url) {
  await page.emulateMedia({ media: 'screen' });
  let best = null;
  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 1400 });
    await page.goto(url, { waitUntil: 'networkidle' });
    const sheet = page.locator('.print-page').first();
    await sheet.waitFor({ state: 'visible' });
    const box = await sheet.boundingBox();
    const distance = Math.abs(box.width / box.height - A4_RATIO);
    if (!best || distance < best.distance) best = { distance, width };
  }

  await page.setViewportSize({ width: best.width, height: 1400 });
  await page.goto(url, { waitUntil: 'networkidle' });
  await hideSiteChrome(page);
  await lockScreenColors(page);
  await page.emulateMedia({ media: 'print' });

  for (const scale of SCALES) {
    const pdf = await page.pdf({ ...PDF_OPTIONS, scale });
    if (pageCount(pdf) === 1) return { ...best, scale, pdf };
  }
  return { ...best, scale: 0.55, pdf: await page.pdf({ ...PDF_OPTIONS, scale: 0.55 }) };
}

const browser = await chromium.launch({ executablePath: await chromiumExecutable() });
const page = await browser.newPage({ deviceScaleFactor: 2 });
await rm(OUT_DIR, { recursive: true, force: true });
await mkdir(OUT_DIR, { recursive: true });

// Порядок и названия пишутся рядом со страницами: сборщик содержания берёт их отсюда,
// а не вычитывает из самих PDF — в них заголовок набран вразрядку («Т А Б Л И Ц А»).
const manifest = [];
let index = 0;
for (const [s, section] of SECTIONS.entries()) {
  for (const table of section.tables) {
    index += 1;
    const result = await renderTable(page, `${BASE}/tablicy/${table.slug}`);
    const file = `${String(index).padStart(2, '0')}-${s}-${table.slug}.pdf`;
    await writeFile(path.join(OUT_DIR, file), result.pdf);
    manifest.push({ file, section: s, sectionTitle: section.title, title: table.title });
    console.log(`${index}/39 ${section.title} — ${table.title} (окно ${result.width}, масштаб ${result.scale})`);
  }
}
await writeFile(path.join(OUT_DIR, 'index.json'), JSON.stringify(manifest, null, 2));

await browser.close();
console.log('\nВсе страницы в', OUT_DIR);
