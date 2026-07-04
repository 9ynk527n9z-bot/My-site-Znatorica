import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendPaymentSuccessEmail } from '@/lib/email';

// TODO для продакшена: проверять, что запрос реально пришёл от YuKassa
// (сверка по IP-диапазонам ЮKassa, т.к. подписи запросов у них нет — см. их документацию по вебхукам).
export async function POST(request: NextRequest) {
  try {
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
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    await db.subscription.upsert({
      where: { userId },
      update: {
        status: 'active',
        endDate,
        autoRenew: true,
        paymentId: payment.id,
      },
      create: {
        userId,
        status: 'active',
        endDate,
        autoRenew: true,
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
