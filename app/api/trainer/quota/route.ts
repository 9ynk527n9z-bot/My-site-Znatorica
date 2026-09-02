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

// Дневной лимит тренажёров, три уровня доступа:
//   - подписчик Знаторика PRO — без ограничений;
//   - зарегистрировался ДО TRAINER_LIMIT_START_DATE — без ограничений, но только
//     до TRAINER_GRANDFATHER_UNTIL (год форы: сразу отбирать обещанный безлимит
//     нечестно, но и оставлять его навсегда не нужно);
//   - зарегистрирован после этой даты и без подписки — REGISTERED_TRAINER_LIMIT в день;
//   - не зарегистрирован — FREE_TRAINER_LIMIT в день (по cookie-сессии).
// Лимит общий на все тренажёры и варианты ВПР вместе, считается по событиям
// "trainer:*" и "vpr:*" в GeneratorUse за последние 24 часа — та же таблица и та же
// личность, что в /api/track. ВПР идут в общий котёл наравне с тренажёрами: они и
// раньше блокировались этим лимитом (TrainerGate стоит и на странице варианта ВПР),
// но сами его не расходовали — теперь считаются честно, как всё остальное.
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    const user = token ? await getUserFromToken(token) : null;
    const since = new Date(Date.now() - DAY_MS);

    if (user) {
      const subscription = await db.subscription.findUnique({ where: { userId: user.id } });
      const isSubscriber =
        !!subscription && subscription.status === 'active' && subscription.endDate > new Date();

      const now = new Date();
      const grandfathered =
        user.createdAt < TRAINER_LIMIT_START_DATE && now < TRAINER_GRANDFATHER_UNTIL;

      if (isSubscriber || grandfathered) {
        return NextResponse.json({
          used: 0,
          limit: REGISTERED_TRAINER_LIMIT,
          remaining: Infinity,
          unlimited: true,
          isSubscriber,
          grandfathered,
          registered: true,
        });
      }

      const usedByUser = await db.generatorUse.count({
        where: {
          userId: user.id,
          createdAt: { gte: since },
          OR: [{ type: { startsWith: 'trainer:' } }, { type: { startsWith: 'vpr:' } }],
        },
      });

      return NextResponse.json({
        used: usedByUser,
        limit: REGISTERED_TRAINER_LIMIT,
        remaining: Math.max(0, REGISTERED_TRAINER_LIMIT - usedByUser),
        unlimited: false,
        isSubscriber: false,
        grandfathered: false,
        registered: true,
      });
    }

    const sessionId = request.cookies.get(SESSION_COOKIE)?.value || null;

    const used = sessionId
      ? await db.generatorUse.count({
          where: {
            sessionId,
            createdAt: { gte: since },
            OR: [{ type: { startsWith: 'trainer:' } }, { type: { startsWith: 'vpr:' } }],
          },
        })
      : 0;

    const remaining = Math.max(0, FREE_TRAINER_LIMIT - used);

    return NextResponse.json({
      used,
      limit: FREE_TRAINER_LIMIT,
      remaining,
      unlimited: false,
      isSubscriber: false,
      registered: false,
    });
  } catch (error) {
    console.error('Trainer quota error:', error);
    // Отказ безопаснее в пользу пользователя: при сбое проверки не блокируем тренажёр.
    return NextResponse.json({
      used: 0,
      limit: FREE_TRAINER_LIMIT,
      remaining: FREE_TRAINER_LIMIT,
      unlimited: false,
      isSubscriber: false,
      registered: false,
    });
  }
}
