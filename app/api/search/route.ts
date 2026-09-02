import { NextRequest, NextResponse } from 'next/server';
import { searchAll } from '@/lib/search-service';
import { db } from '@/lib/db';

const SESSION_COOKIE = 'znatorika_sid';

// Ищет и по статичному индексу (тренажёры/генераторы/темы/ВПР/плакаты), и по
// контенту из БД (статьи для родителей, темы CMS) — см. lib/search-service.ts.
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') ?? '';

  const limitParam = Number(searchParams.get('limit'));
  const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(limitParam, 200) : 20;

  const results = await searchAll(q, limit);

  const trimmed = q.trim();
  if (trimmed) {
    // Сохраняем запрос для админ-аналитики (что реально ищут, какие запросы
    // не дают результатов). Не блокируем ответ пользователю при сбое записи.
    db.searchQuery
      .create({
        data: {
          query: trimmed.slice(0, 200),
          resultsCount: results.length,
          sessionId: request.cookies.get(SESSION_COOKIE)?.value || null,
        },
      })
      .catch((error) => console.error('Failed to log search query:', error));
  }

  return NextResponse.json({ results });
}
