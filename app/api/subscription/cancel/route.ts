import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getUserFromToken } from '@/lib/auth';
import { sendSubscriptionCancelledEmail } from '@/lib/email';

// Отменить автопродление подписки. Доступ сохраняется до конца оплаченного периода.
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

    const subscription = await db.subscription.findUnique({
      where: { userId: user.id },
    });

    if (!subscription) {
      return NextResponse.json({ error: 'Подписка не найдена' }, { status: 404 });
    }

    const updated = await db.subscription.update({
      where: { userId: user.id },
      data: { autoRenew: false },
    });

    try {
      await sendSubscriptionCancelledEmail(user.email, updated.endDate);
    } catch (emailError) {
      console.error('Failed to send cancellation email:', emailError);
    }

    return NextResponse.json({
      message: 'Автопродление отключено. Доступ сохранится до конца оплаченного периода.',
      subscription: {
        status: updated.status,
        endDate: updated.endDate,
        autoRenew: updated.autoRenew,
      },
    });
  } catch (error) {
    console.error('Subscription cancel error:', error);
    return NextResponse.json({ error: 'Failed to cancel subscription' }, { status: 500 });
  }
}
