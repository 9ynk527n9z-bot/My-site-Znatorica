import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getUserFromToken } from '@/lib/auth';

function dayKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

// Награда растёт с серией дней подряд, но не бесконечно — 10 звёзд в первый день,
// +5 за каждый следующий день подряд, максимум 40 (после 7-го дня серии).
function starsForStreak(streak: number): number {
  return 10 + Math.min(streak - 1, 6) * 5;
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const user = await getUserFromToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const today = dayKey(new Date());
    const alreadyClaimedToday = user.lastDailyGiftAt ? dayKey(user.lastDailyGiftAt) === today : false;

    return NextResponse.json({
      starsBalance: user.starsBalance,
      dailyGiftStreak: user.dailyGiftStreak,
      alreadyClaimedToday,
      nextReward: alreadyClaimedToday
        ? null
        : starsForStreak(
            user.lastDailyGiftAt && dayKey(new Date(Date.now() - 86400000)) === dayKey(user.lastDailyGiftAt)
              ? user.dailyGiftStreak + 1
              : 1
          ),
    });
  } catch (error) {
    console.error('Daily gift status error:', error);
    return NextResponse.json({ error: 'Failed to load daily gift status' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const user = await getUserFromToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const now = new Date();
    const today = dayKey(now);

    if (user.lastDailyGiftAt && dayKey(user.lastDailyGiftAt) === today) {
      return NextResponse.json({ error: 'Подарок на сегодня уже забран' }, { status: 400 });
    }

    const yesterday = dayKey(new Date(now.getTime() - 86400000));
    const continuesStreak = user.lastDailyGiftAt && dayKey(user.lastDailyGiftAt) === yesterday;
    const newStreak = continuesStreak ? user.dailyGiftStreak + 1 : 1;
    const awarded = starsForStreak(newStreak);

    const updated = await db.user.update({
      where: { id: user.id },
      data: {
        starsBalance: { increment: awarded },
        dailyGiftStreak: newStreak,
        lastDailyGiftAt: now,
      },
    });

    return NextResponse.json({
      awarded,
      starsBalance: updated.starsBalance,
      dailyGiftStreak: updated.dailyGiftStreak,
    });
  } catch (error) {
    console.error('Daily gift claim error:', error);
    return NextResponse.json({ error: 'Failed to claim daily gift' }, { status: 500 });
  }
}
