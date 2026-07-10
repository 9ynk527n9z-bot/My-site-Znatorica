// Генерирует public/og-image.png (1200×630) — превью сайта для соцсетей и мессенджеров.
// Собирается из фирменных элементов: фиолетовый градиент фона (как на сайте),
// белка-логотип и слоган. Запуск: node scripts/generate-og-image.mjs

import sharp from 'sharp';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const publicDir = join(here, '..', 'public');

const W = 1200;
const H = 630;

const bgSvg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2A1B4D"/>
      <stop offset="100%" stop-color="#1E1035"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <!-- декоративные звёздочки как на сайте -->
  <text x="90" y="110" font-size="36" fill="#ffffff" opacity="0.35">✦</text>
  <text x="1080" y="150" font-size="28" fill="#ffffff" opacity="0.25">✦</text>
  <text x="990" y="540" font-size="40" fill="#ffffff" opacity="0.3">✦</text>
  <text x="150" y="540" font-size="24" fill="#ffffff" opacity="0.25">✦</text>
  <text x="560" y="80" font-size="24" fill="#ffffff" opacity="0.2">✦</text>

  <text x="470" y="270" font-family="Arial, Helvetica, sans-serif" font-size="86" font-weight="900" fill="#F97316">Знаторика</text>
  <text x="474" y="352" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="700" fill="#FFFFFF">Учись. Тренируйся. Сдавай.</text>
  <text x="474" y="424" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#D1C4E9">Тренажёры, генераторы заданий и подготовка</text>
  <text x="474" y="466" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#D1C4E9">к ВПР для детей 4–11 лет</text>
  <text x="474" y="548" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" fill="#F97316">znatorica.ru</text>
</svg>`;

const logo = await sharp(join(publicDir, 'logo.png'))
  .resize(360, 360, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .toBuffer();

await sharp(Buffer.from(bgSvg))
  .composite([{ input: logo, left: 70, top: 150 }])
  .png()
  .toFile(join(publicDir, 'og-image.png'));

console.log('✅ public/og-image.png (1200×630) создан');
