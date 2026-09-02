import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getUserFromToken } from '@/lib/auth';
import { computeProgressStats } from '@/lib/progress';
import { DIPLOMAS } from '@/lib/diplomas';
import { DECORATIONS } from '@/lib/decorations';

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

    const [progress, owned] = await Promise.all([
      computeProgressStats(user.id),
      db.userDecoration.findMany({ where: { userId: user.id }, select: { itemId: true } }),
    ]);

    const ownedIds = owned.map((o) => o.itemId);
    const spent = DECORATIONS.filter((d) => ownedIds.includes(d.id)).reduce((sum, d) => sum + d.cost, 0);
    const earned = progress.total + user.starsBalance;
    const available = earned - spent;

    const diplomas = DIPLOMAS.map((d) => {
      const value = d.getValue(progress);
      return {
        slug: d.slug,
        title: d.title,
        icon: d.icon,
        target: d.target,
        value: Math.min(value, d.target),
        earned: value >= d.target,
      };
    });

    // Ближайшая цель для реплики белки: либо ещё не купленное украшение подешевле
    // всего доступного бюджета сверх, либо ближайший недополученный диплом.
    const nextAffordable = DECORATIONS.filter((d) => !ownedIds.includes(d.id))
      .sort((a, b) => a.cost - b.cost)
      .find((d) => d.cost > available);
    const nextDiploma = diplomas.filter((d) => !d.earned).sort((a, b) => a.target - a.value - (b.target - b.value))[0];

    const today = new Date().toISOString().slice(0, 10);
    const alreadyWateredToday = user.lastDailyGiftAt
      ? user.lastDailyGiftAt.toISOString().slice(0, 10) === today
      : false;

    return NextResponse.json({
      starsAvailable: available,
      starsEarned: earned,
      ownedItems: ownedIds,
      diplomas,
      flowerStreak: user.dailyGiftStreak,
      alreadyWateredToday,
      hint: nextAffordable
        ? { type: 'decoration', title: nextAffordable.title, missing: nextAffordable.cost - available }
        : nextDiploma
          ? { type: 'diploma', title: nextDiploma.title, missing: nextDiploma.target - nextDiploma.value }
          : null,
    });
  } catch (error) {
    console.error('Domik status error:', error);
    return NextResponse.json({ error: 'Failed to load domik status' }, { status: 500 });
  }
}
