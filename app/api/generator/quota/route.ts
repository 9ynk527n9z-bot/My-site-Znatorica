import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getUserFromToken } from '@/lib/auth';
import { FREE_GENERATOR_LIMIT } from '@/lib/constants';

const SESSION_COOKIE = 'znatorika_sid';
const DAY_MS = 24 * 60 * 60 * 1000;

// Проверка дневного лимита бесплатных генераций (только генераторы —
// печатные материалы с осязаемым результатом на вынос; тренажёры доступны
// бесплатно всем зарегистрированным, см. TrainerGate). Лимит общий на
// пользователя/сессию по ВСЕМ генераторам вместе (не по N на каждый отдельный).
// Считаем GeneratorUse с type, начинающимся на "generator:", за последние 24
// часа — та же личность (userId/sessionId), что и в /api/track.
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    const user = token ? await getUserFromToken(token) : null;
    const sessionId = request.cookies.get(SESSION_COOKIE)?.value || null;

    if (user) {
      const subscription = await db.subscription.findUnique({ where: { userId: user.id } });
      const isSubscriber = !!subscription && subscription.status === 'active' && subscription.endDate > new Date();

      if (isSubscriber) {
        return NextResponse.json({ used: 0, limit: FREE_GENERATOR_LIMIT, remaining: Infinity, unlimited: true, isSubscriber: true });
      }
    }

    const since = new Date(Date.now() - DAY_MS);
    const identity = user ? { userId: user.id } : sessionId ? { sessionId } : null;

    const used = identity
      ? await db.generatorUse.count({
          where: {
            ...identity,
            createdAt: { gte: since },
            type: { startsWith: 'generator:' },
          },
        })
      : 0;

    const remaining = Math.max(0, FREE_GENERATOR_LIMIT - used);

    return NextResponse.json({
      used,
      limit: FREE_GENERATOR_LIMIT,
      remaining,
      unlimited: false,
      isSubscriber: false,
    });
  } catch (error) {
    console.error('Generator quota error:', error);
    // Отказ безопаснее в пользу пользователя: при сбое проверки не блокируем генерацию.
    return NextResponse.json({ used: 0, limit: FREE_GENERATOR_LIMIT, remaining: FREE_GENERATOR_LIMIT, unlimited: false, isSubscriber: false });
  }
}
