import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendPaymentSuccessEmail } from '@/lib/email';
import { isYooKassaIp, getClientIp } from '@/lib/yookassa-ip';

// YuKassa не подписывает уведомления вебхука — единственная защита, которую они
// сами рекомендуют, это сверка IP отправителя со списком их серверов (см. lib/yookassa-ip.ts).
// Без этой проверки кто угодно, узнав URL, мог бы прислать поддельное «payment.succeeded»
// и получить подписку бесплатно.
export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    if (!clientIp || !isYooKassaIp(clientIp)) {
      console.warn(`Webhook отклонён: запрос не с IP YuKassa (${clientIp})`);
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.text();
    const data = JSON.parse(body) as any;

    if (data.event !== 'payment.succeeded') {
      return NextResponse.json({ ok: true });
    }

    const kassaPaymentId = data.object.id;
    const metadata = data.object.metadata;
    const userId = metadata?.userId;

    if (!userId) {
      console.warn('Webhook received without userId in metadata');
      return NextResponse.json({ ok: true });
    }

    // Find payment in database
    const payment = await db.payment.findUnique({
      where: { kassaId: kassaPaymentId },
    });

    if (!payment) {
      console.warn(`Payment not found: ${kassaPaymentId}`);
      return NextResponse.json({ ok: true });
    }

    // Update payment status
    await db.payment.update({
      where: { id: payment.id },
      data: { status: 'succeeded' },
    });

    // Create subscription
    const plan = metadata?.plan === 'lifetime' ? 'lifetime' : 'monthly';
    const endDate = new Date();
    if (plan === 'lifetime') {
      endDate.setFullYear(endDate.getFullYear() + 100);
    } else {
      endDate.setMonth(endDate.getMonth() + 1);
    }
    const autoRenew = plan === 'monthly';

    await db.subscription.upsert({
      where: { userId },
      update: {
        plan,
        status: 'active',
        endDate,
        autoRenew,
        paymentId: payment.id,
      },
      create: {
        userId,
        plan,
        status: 'active',
        endDate,
        autoRenew,
        paymentId: payment.id,
      },
    });

    console.log(`Subscription activated for user: ${userId}`);

    const user = await db.user.findUnique({ where: { id: userId } });
    if (user) {
      try {
        await sendPaymentSuccessEmail(user.email, payment.amount, endDate);
      } catch (emailError) {
        console.error('Failed to send payment success email:', emailError);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
