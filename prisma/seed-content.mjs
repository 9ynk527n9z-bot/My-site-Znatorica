// Доливает контент из prisma/content-seed.json в таблицу content_pages.
// Запускается на каждом деплое (см. команду в docker-compose.yml), а также
// вручную локально: `node prisma/seed-content.mjs`.
//
// Правила синхронизации (компромисс «и я, и вручную»):
//   • запись с manualEdit=true НЕ трогается — ручная правка через админку побеждает;
//   • существующие записи (manualEdit=false) обновляются из файла — так мои правки в коде доезжают;
//   • новые slug'и создаются;
//   • записи, которых нет в файле, НЕ удаляются — контент, созданный в админке, не пропадает.
//
// Файл cop‑ится в образ вместе со всей папкой prisma (см. Dockerfile).

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();
const here = dirname(fileURLToPath(import.meta.url));

// JSON.stringify зависит от порядка ключей объекта — у Prisma (из базы) и у
// только что распарсенного JSON-файла порядок разный при полностью одинаковом
// содержимом. Сортируем ключи рекурсивно перед сравнением, иначе body/related
// считаются "изменившимися" всегда, даже когда реально ничего не поменялось.
function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === 'object') {
    return Object.keys(value)
      .sort()
      .reduce((acc, key) => {
        acc[key] = canonical(value[key]);
        return acc;
      }, {});
  }
  return value;
}

async function main() {
  const raw = readFileSync(join(here, 'content-seed.json'), 'utf-8');
  const pages = JSON.parse(raw);

  let created = 0;
  let updated = 0;
  let skippedManual = 0;
  let skippedUnchanged = 0;

  for (const p of pages) {
    const kind = p.kind === 'topic' ? 'topic' : 'article';
    const existing = await db.contentPage.findUnique({
      where: { kind_slug: { kind, slug: p.slug } },
    });

    if (existing && existing.manualEdit) {
      skippedManual++;
      continue; // ручная правка — не перезаписываем
    }

    const data = {
      kind,
      slug: p.slug,
      title: p.title ?? '',
      description: p.description ?? '',
      segment: p.segment ?? null,
      subject: p.subject ?? null,
      tag: p.tag ?? null,
      readTime: p.readTime ?? null,
      date: p.date ?? null,
      intro: p.intro ?? '',
      body: p.body ?? [],
      related: p.related ?? null,
      published: p.published !== false,
    };

    if (existing) {
      // Обновляем только если контент реально изменился — иначе Prisma всё
      // равно бампает updatedAt на любой .update(), даже при идентичных
      // данных, и sitemap снова показывает "изменено сегодня" у всего сайта
      // на каждом деплое (та же ошибка, что мы только что убрали из sitemap.ts).
      const changed = Object.keys(data).some((key) => {
        const a = existing[key];
        const b = data[key];
        // body/related — JSON-поля, сравниваем по сериализованному виду
        if (key === 'body' || key === 'related') {
          return JSON.stringify(canonical(a)) !== JSON.stringify(canonical(b));
        }
        return a !== b;
      });
      if (changed) {
        await db.contentPage.update({ where: { id: existing.id }, data });
        updated++;
      } else {
        skippedUnchanged++;
      }
    } else {
      await db.contentPage.create({ data });
      created++;
    }
  }

  console.log(
    `[seed-content] создано: ${created}, обновлено: ${updated}, без изменений: ${skippedUnchanged}, пропущено (ручная правка): ${skippedManual}`,
  );
}

main()
  .catch((e) => {
    console.error('[seed-content] ошибка:', e);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
