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

    // YuKassa не гарантирует доставку уведомления ровно один раз — сетевые ретраи
    // присылают тот же payment.succeeded повторно. Без этой проверки повторное
    // уведомление продлило бы подписку/выдало бы товар ещё раз за одну и ту же оплату.
    if (payment.status === 'succeeded') {
      console.log(`Webhook повтор для уже обработанного платежа: ${kassaPaymentId}`);
      return NextResponse.json({ ok: true });
    }

    // Update payment status
    await db.payment.update({
      where: { id: payment.id },
      data: { status: 'succeeded' },
    });

    // Именной диплом «Турнира Знаторики» — помечаем результат оплаченным.
    if (metadata?.type === 'tournament' && metadata?.tournamentResultId) {
      await db.tournamentResult.update({
        where: { id: metadata.tournamentResultId },
        data: { paid: true, paymentId: payment.id },
      });
      console.log(`Tournament diploma paid: ${metadata.tournamentResultId}`);
      return NextResponse.json({ ok: true });
    }

    // Разовая покупка PDF-сборника — не подписка, просто фиксируем доступ к скачиванию.
    if (metadata?.type === 'product' && metadata?.productSlug) {
      await db.purchase.upsert({
        where: { userId_productSlug: { userId, productSlug: metadata.productSlug } },
        update: { paymentId: payment.id },
        create: { userId, productSlug: metadata.productSlug, paymentId: payment.id },
      });
      console.log(`Product purchased: ${metadata.productSlug} by user ${userId}`);
      return NextResponse.json({ ok: true });
    }

    // Create subscription
    const plan =
      metadata?.plan === 'lifetime' ? 'lifetime' : metadata?.plan === 'yearly' ? 'yearly' : 'monthly';

    // Если у пользователя уже есть активная неистёкшая подписка (например купил
    // помесячную поверх ещё не закончившейся годовой) — продлеваем ОТ её текущей
    // даты окончания, а не от «сейчас», иначе оплаченное время просто пропадает.
    const existingSubscription = await db.subscription.findUnique({ where: { userId } });
    const now = new Date();
    const baseDate =
      existingSubscription && existingSubscription.status === 'active' && existingSubscription.endDate > now
        ? existingSubscription.endDate
        : now;

    const endDate = new Date(baseDate);
    if (plan === 'lifetime') {
      endDate.setFullYear(endDate.getFullYear() + 100);
    } else if (plan === 'yearly') {
      endDate.setFullYear(endDate.getFullYear() + 1);
    } else {
      endDate.setMonth(endDate.getMonth() + 1);
    }
    // Автопродление у помесячной и годовой подписки (у «навсегда» продлевать
    // нечего). Годовая сумма заметная, поэтому перед списанием обязательно уходит
    // письмо-предупреждение — см. /api/cron/subscription-reminders (за 7 дней для
    // годовой, за 3 для помесячной), чтобы списание не стало неожиданностью.
    const autoRenew = plan === 'monthly' || plan === 'yearly';

    // Если ЮKassa сохранила способ оплаты (save_payment_method: true при создании
    // платежа) — запоминаем его id, чтобы cron мог списывать за продление
    // без участия пользователя. Если не сохранён (СБП, ошибка, старый платёж без
    // этого флага) — оставляем как было, автопродление для этой подписки просто не
    // сработает технически, будет только напоминание продлить вручную.
    const paymentMethod = data.object.payment_method;
    const paymentMethodId: string | undefined = paymentMethod?.saved === true ? paymentMethod.id : undefined;

    await db.subscription.upsert({
      where: { userId },
      update: {
        plan,
        status: 'active',
        endDate,
        autoRenew,
        paymentId: payment.id,
        // Сбрасываем флаг "письмо-напоминание отправлено" — иначе он остаётся
        // выставленным с прошлого цикла, и cron/subscription-reminders молча
        // пропускает предупреждение перед КАЖДЫМ следующим продлением, кроме первого.
        renewalReminderSentAt: null,
        ...(paymentMethodId ? { paymentMethodId } : {}),
      },
      create: {
        userId,
        plan,
        status: 'active',
        endDate,
        autoRenew,
        paymentId: payment.id,
        paymentMethodId,
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
