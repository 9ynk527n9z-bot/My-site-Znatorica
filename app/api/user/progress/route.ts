import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getUserFromToken } from '@/lib/auth';

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

    const uses = await db.generatorUse.findMany({
      where: { userId: user.id },
      select: { type: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });

    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const total = uses.length;
    const last7Days = uses.filter((u) => u.createdAt >= sevenDaysAgo).length;
    const last30Days = uses.filter((u) => u.createdAt >= thirtyDaysAgo).length;

    const byCategory: Record<string, number> = {};
    const vprVariantsSet = new Set<string>();
    const activeDays = new Set<string>();

    for (const u of uses) {
      const category = u.type.split(':')[0];
      byCategory[category] = (byCategory[category] || 0) + 1;
      if (category === 'vpr') {
        vprVariantsSet.add(u.type);
      }
      activeDays.add(u.createdAt.toISOString().slice(0, 10));
    }

    // Streak: подряд идущие дни с активностью. Если сегодня ещё не занимались,
    // это не обнуляет серию — считаем с последнего дня с активностью.
    let streak = 0;
    const cursor = new Date(now);
    if (!activeDays.has(cursor.toISOString().slice(0, 10))) {
      cursor.setDate(cursor.getDate() - 1);
    }
    while (activeDays.has(cursor.toISOString().slice(0, 10))) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    }

    // Занятий по дням за последние 30 дней — для графика динамики родителю.
    const dayCounts = new Map<string, number>();
    for (const u of uses) {
      if (u.createdAt >= thirtyDaysAgo) {
        const k = u.createdAt.toISOString().slice(0, 10);
        dayCounts.set(k, (dayCounts.get(k) ?? 0) + 1);
      }
    }
    const dailySeries: { date: string; count: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      dailySeries.push({ date: d, count: dayCounts.get(d) ?? 0 });
    }

    return NextResponse.json({
      total,
      last7Days,
      last30Days,
      byCategory,
      vprVariantsCompleted: vprVariantsSet.size,
      streak,
      dailySeries,
    });
  } catch (error) {
    console.error('Progress error:', error);
    return NextResponse.json({ error: 'Failed to load progress' }, { status: 500 });
  }
}
