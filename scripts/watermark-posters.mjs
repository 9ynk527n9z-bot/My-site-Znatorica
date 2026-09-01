// Впечатывает мелкую подпись «© Знаторика · znatorica.ru» в правый нижний угол
// каждого плаката в public/plakat-*.png. Плакаты — готовые статичные картинки
// (не генерируются на лету и не проходят через ExportToolbar), доступны по прямой
// ссылке в public/ — единственный способ защитить их от бесследного копирования
// это впечатать подпись прямо в пиксели файла.
//
// Запуск: node scripts/watermark-posters.mjs
//
// ВАЖНО: скрипт НЕ идемпотентен — обрабатывает ВСЕ файлы plakat-*.png при каждом
// запуске, включая уже помеченные (наложит подпись повторно поверх старой).
// При добавлении новых плакатов запускайте скрипт только если готовы, что уже
// помеченные файлы получат вторую (менее заметную, но лишнюю) подпись — либо
// временно переместите уже обработанные файлы в другую папку перед запуском.

import sharp from 'sharp';
import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const publicDir = join(here, '..', 'public');

function watermarkSvg(width, height) {
  const text = '© Знаторика · znatorica.ru';
  const fontSize = Math.max(14, Math.round(width * 0.018));
  const paddingX = fontSize * 0.9;
  const paddingY = fontSize * 0.5;
  const approxTextWidth = text.length * fontSize * 0.56;
  const boxW = approxTextWidth + paddingX * 2;
  const boxH = fontSize + paddingY * 2;
  const margin = Math.round(width * 0.02);
  const x = width - boxW - margin;
  const y = height - boxH - margin;

  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect x="${x}" y="${y}" width="${boxW}" height="${boxH}" rx="${boxH / 2}"
            fill="#ffffff" fill-opacity="0.85" stroke="#00000022" stroke-width="1" />
      <text x="${x + boxW / 2}" y="${y + boxH / 2 + fontSize * 0.34}"
            font-family="Arial, sans-serif" font-size="${fontSize}"
            fill="#222222" fill-opacity="0.9" text-anchor="middle">${text}</text>
    </svg>
  `);
}

async function main() {
  const files = readdirSync(publicDir).filter((f) => f.startsWith('plakat-') && f.endsWith('.png'));
  console.log(`Найдено плакатов: ${files.length}`);

  for (const file of files) {
    const path = join(publicDir, file);
    const image = sharp(path);
    const meta = await image.metadata();

    const buf = await sharp(path)
      .composite([{ input: watermarkSvg(meta.width, meta.height), top: 0, left: 0 }])
      .png()
      .toBuffer();

    await sharp(buf).toFile(path);
    console.log(`✓ ${file} (${meta.width}x${meta.height})`);
  }

  console.log('Готово.');
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
