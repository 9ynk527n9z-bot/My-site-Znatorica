import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getUserFromToken } from '@/lib/auth';
import { computeProgressStats } from '@/lib/progress';
import { getDecoration, DECORATIONS } from '@/lib/decorations';

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

    const { itemId } = await request.json();
    const item = getDecoration(itemId);
    if (!item) {
      return NextResponse.json({ error: 'Неизвестное украшение' }, { status: 400 });
    }

    // Транзакция: пересчитываем баланс и создаём покупку в одной транзакции,
    // чтобы параллельные запросы на покупку не смогли дважды потратить одни
    // и те же звёзды (классический race condition денежных операций).
    const result = await db.$transaction(async (tx) => {
      const already = await tx.userDecoration.findUnique({
        where: { userId_itemId: { userId: user.id, itemId } },
      });
      if (already) {
        throw new Error('ALREADY_OWNED');
      }

      const owned = await tx.userDecoration.findMany({ where: { userId: user.id }, select: { itemId: true } });
      const spent = DECORATIONS.filter((d) => owned.some((o) => o.itemId === d.id)).reduce((sum, d) => sum + d.cost, 0);
      const progress = await computeProgressStats(user.id);
      const earned = progress.total + user.starsBalance;
      const available = earned - spent;

      if (available < item.cost) {
        throw new Error('NOT_ENOUGH_STARS');
      }

      await tx.userDecoration.create({ data: { userId: user.id, itemId } });
      return { available: available - item.cost };
    });

    return NextResponse.json({ success: true, starsAvailable: result.available, itemId });
  } catch (error) {
    if (error instanceof Error && error.message === 'ALREADY_OWNED') {
      return NextResponse.json({ error: 'Это украшение уже куплено' }, { status: 400 });
    }
    if (error instanceof Error && error.message === 'NOT_ENOUGH_STARS') {
      return NextResponse.json({ error: 'Недостаточно звёзд' }, { status: 400 });
    }
    console.error('Domik buy error:', error);
    return NextResponse.json({ error: 'Не удалось купить украшение' }, { status: 500 });
  }
}
