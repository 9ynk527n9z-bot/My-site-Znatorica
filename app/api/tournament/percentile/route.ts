import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Считаем «лучше, чем у X% участников» по уже существующему трекингу
// tournament:finish:{trackId}:{score}/{total} (см. lib/track.ts) — без
// отдельной таблицы под это. Пока прохождений мало, показывать процент
// не имеет смысла (легко получить обманчивые «100%» на выборке из 1-2
// человек), поэтому ниже порога отдаём null и на фронте блок просто не рисуется.
const MIN_SAMPLES = 10;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const trackId = searchParams.get('trackId');
    const score = Number(searchParams.get('score'));
    const total = Number(searchParams.get('total'));

    if (!trackId || !Number.isFinite(score) || !Number.isFinite(total) || total <= 0) {
      return NextResponse.json({ error: 'trackId, score, total обязательны' }, { status: 400 });
    }

    const prefix = `tournament:finish:${trackId}:`;
    const rows = await db.generatorUse.findMany({
      where: { type: { startsWith: prefix } },
      select: { type: true },
    });

    const fractions: number[] = [];
    for (const row of rows) {
      const suffix = row.type.slice(prefix.length);
      const match = suffix.match(/^(\d+)\/(\d+)$/);
      if (!match) continue;
      const s = Number(match[1]);
      const t = Number(match[2]);
      if (t > 0) fractions.push(s / t);
    }

    if (fractions.length < MIN_SAMPLES) {
      return NextResponse.json({ percentile: null, samples: fractions.length });
    }

    const current = score / total;
    const lower = fractions.filter((f) => f < current).length;
    const percentile = Math.round((100 * lower) / fractions.length);

    return NextResponse.json({ percentile, samples: fractions.length });
  } catch (error) {
    console.error('Tournament percentile error:', error);
    return NextResponse.json({ percentile: null }, { status: 500 });
  }
}
