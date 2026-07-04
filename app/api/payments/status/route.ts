import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getUserFromToken } from '@/lib/auth';

const YOOKASSA_SHOP_ID = process.env.YOOKASSA_SHOP_ID || '';
const YOOKASSA_API_KEY = process.env.YOOKASSA_API_KEY || '';

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

    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('paymentId');

    // Без paymentId — просто отдать текущий статус подписки (используется на /podpiska и /account)
    if (!paymentId) {
      const subscription = await db.subscription.findUnique({
        where: { userId: user.id },
      });

      return NextResponse.json({
        subscription: subscription
          ? {
              status: subscription.status,
              endDate: subscription.endDate,
              autoRenew: subscription.autoRenew,
              isActive: subscription.status === 'active' && subscription.endDate > new Date(),
            }
          : null,
      });
    }

    // С paymentId — сверить конкретный платёж с YuKassa
    const payment = await db.payment.findUnique({
      where: { id: paymentId },
    });

    if (!payment || payment.userId !== user.id) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    const response = await fetch(`https://api.yookassa.ru/v3/payments/${payment.kassaId}`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${Buffer.from(`${YOOKASSA_SHOP_ID}:${YOOKASSA_API_KEY}`).toString('base64')}`,
      },
    });

    const paymentData = await response.json() as any;

    if (paymentData.status && paymentData.status !== payment.status) {
      await db.payment.update({
        where: { id: payment.id },
        data: { status: paymentData.status },
      });
    }

    const subscription = await db.subscription.findUnique({
      where: { userId: user.id },
    });

    return NextResponse.json({
      paymentId: payment.id,
      status: paymentData.status,
      subscription: subscription ? {
        status: subscription.status,
        endDate: subscription.endDate,
        autoRenew: subscription.autoRenew,
        isActive: subscription.status === 'active' && subscription.endDate > new Date(),
      } : null,
    });
  } catch (error) {
    console.error('Payment status check error:', error);
    return NextResponse.json(
      { error: 'Failed to check payment status' },
      { status: 500 }
    );
  }
}
