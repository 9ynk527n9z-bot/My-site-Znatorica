import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getUserFromToken } from '@/lib/auth';
import {
  FREE_TRAINER_LIMIT,
  REGISTERED_TRAINER_LIMIT,
  TRAINER_LIMIT_START_DATE,
  TRAINER_GRANDFATHER_UNTIL,
} from '@/lib/constants';

const SESSION_COOKIE = 'znatorika_sid';
const DAY_MS = 24 * 60 * 60 * 1000;

// Проверка лимита и запись использования — атомарно, в одной транзакции.
// Раньше TrainerGate решал, пускать ли на тренажёр, по цифре, полученной ОДИН
// раз при загрузке страницы (GET /api/trainer/quota), а потом просто уменьшал
// её локально в памяти. Если открыть несколько вкладок с разными тренажёрами
// одновременно, каждая вкладка стартовала с одной и той же "снятой" цифрой и
// пропускала сверх дневного лимита. Здесь же решение "пустить/не пустить"
// принимается сервером в момент открытия тренажёра, на свежих данных.
export async function POST(request: NextRequest) {
  try {
    const { type } = (await request.json()) as { type?: string };
    if (!type || typeof type !== 'string') {
      return NextResponse.json({ error: 'type is required' }, { status: 400 });
    }

    const token = request.headers.get('authorization')?.split(' ')[1];
    const user = token ? await getUserFromToken(token) : null;
    const since = new Date(Date.now() - DAY_MS);
    const usageWhere = { OR: [{ type: { startsWith: 'trainer:' } }, { type: { startsWith: 'vpr:' } }] };

    if (user) {
      const subscription = await db.subscription.findUnique({ where: { userId: user.id } });
      const isSubscriber =
        !!subscription && subscription.status === 'active' && subscription.endDate > new Date();
      const now = new Date();
      const grandfathered =
        user.createdAt < TRAINER_LIMIT_START_DATE && now < TRAINER_GRANDFATHER_UNTIL;

      if (isSubscriber || grandfathered) {
        await db.generatorUse.create({ data: { userId: user.id, type } });
        return NextResponse.json({
          allowed: true,
          unlimited: true,
          remaining: Infinity,
          limit: REGISTERED_TRAINER_LIMIT,
          registered: true,
        });
      }

      const result = await db.$transaction(async (tx) => {
        const used = await tx.generatorUse.count({
          where: { userId: user.id, createdAt: { gte: since }, ...usageWhere },
        });
        if (used >= REGISTERED_TRAINER_LIMIT) {
          return { allowed: false, remaining: 0 };
        }
        await tx.generatorUse.create({ data: { userId: user.id, type } });
        return { allowed: true, remaining: REGISTERED_TRAINER_LIMIT - used - 1 };
      });

      return NextResponse.json({ ...result, unlimited: false, limit: REGISTERED_TRAINER_LIMIT, registered: true });
    }

    let sessionId = request.cookies.get(SESSION_COOKIE)?.value || null;
    const response = NextResponse.json({ allowed: true });
    if (!sessionId) {
      const { randomUUID } = await import('crypto');
      sessionId = randomUUID();
      response.cookies.set(SESSION_COOKIE, sessionId, { maxAge: 60 * 60 * 24 * 365, path: '/', sameSite: 'lax' });
    }

    const result = await db.$transaction(async (tx) => {
      const used = await tx.generatorUse.count({
        where: { sessionId, createdAt: { gte: since }, ...usageWhere },
      });
      if (used >= FREE_TRAINER_LIMIT) {
        return { allowed: false, remaining: 0 };
      }
      await tx.generatorUse.create({ data: { sessionId, type } });
      return { allowed: true, remaining: FREE_TRAINER_LIMIT - used - 1 };
    });

    return NextResponse.json(
      { ...result, unlimited: false, limit: FREE_TRAINER_LIMIT, registered: false },
      { headers: response.headers }
    );
  } catch (error) {
    console.error('Trainer consume error:', error);
    // Отказ безопаснее в пользу пользователя: при сбое проверки не блокируем тренажёр.
    return NextResponse.json({ allowed: true, unlimited: false, remaining: 0, limit: FREE_TRAINER_LIMIT, registered: false });
  }
}
