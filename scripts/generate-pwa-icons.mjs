// Генерирует иконки для PWA-манифеста из public/logo.png (белка-маскот).
// Запуск: node scripts/generate-pwa-icons.mjs
//
// Обычные иконки (192/512) — логотип как есть, он уже квадратный и заполняет кадр.
// Maskable-иконка — тот же логотип уменьшен и отцентрован с отступом (safe zone),
// чтобы Android не обрезал белку при вписывании в круг/квадрат со скруглением.
// Apple touch icon — логотип на непрозрачном фоне (iOS красит альфа-края в чёрный).

import sharp from 'sharp';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const publicDir = join(here, '..', 'public');
const src = join(publicDir, 'logo.png');
const BG = '#1E1035'; // фиолетовый фон бренда — совпадает с фоном самого логотипа

async function main() {
  await sharp(src).resize(192, 192).png().toFile(join(publicDir, 'icon-192.png'));
  console.log('✓ icon-192.png');

  await sharp(src).resize(512, 512).png().toFile(join(publicDir, 'icon-512.png'));
  console.log('✓ icon-512.png');

  // Maskable: логотип уменьшен до ~70% и отцентрован на фоне того же цвета —
  // оставляет safe zone по краям для обрезки под разные формы иконок Android.
  const inner = Math.round(512 * 0.7);
  const logoResized = await sharp(src).resize(inner, inner).toBuffer();
  await sharp({
    create: { width: 512, height: 512, channels: 4, background: BG },
  })
    .composite([{ input: logoResized, gravity: 'center' }])
    .png()
    .toFile(join(publicDir, 'icon-maskable-512.png'));
  console.log('✓ icon-maskable-512.png');

  // Apple touch icon: непрозрачный фон, без альфы (iOS иначе красит края в чёрный).
  await sharp(src)
    .resize(180, 180)
    .flatten({ background: BG })
    .png()
    .toFile(join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ apple-touch-icon.png');

  console.log('Готово.');
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
