import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getNumberSetting } from '@/lib/settings';
import { SUBSCRIPTION_PRICE, YEARLY_PRICE } from '@/lib/constants';
import { sendRenewalFailedEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

const YOOKASSA_SHOP_ID = process.env.YOOKASSA_SHOP_ID || '';
const YOOKASSA_API_KEY = process.env.YOOKASSA_API_KEY || '';

// Настоящее автосписание для продлеваемых подписок (помесячных и годовых) с сохранённым способом оплаты
// (paymentMethodId появляется только у платежей, оформленных ПОСЛЕ того, как
// save_payment_method стал запрашиваться в /api/payments/create — старые подписки
// его не имеют и просто получают письмо-напоминание из /api/cron/subscription-reminders,
// без попытки списания). Вызывается системным cron на сервере раз в день,
// после того как оплаченный период уже истёк (endDate <= now).
//
// Списание идёт через тот же payment.succeeded webhook, что и обычная оплата:
// эта job только создаёт платёж в ЮKassa с payment_method_id (без confirmation —
// это офлайн-списание, пользователь на странице оплаты не участвует) и заводит
// pending-запись Payment; продление подписки и письмо об успехе делает вебхук,
// как и для ручной оплаты — логика продления не дублируется.
export async function GET(request: NextRequest) {
  const secret = request.headers.get('x-cron-secret');
  if (!secret || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const now = new Date();
  const monthlyPrice = await getNumberSetting('monthlyPrice', SUBSCRIPTION_PRICE / 100);
  const yearlyPrice = await getNumberSetting('yearlyPrice', YEARLY_PRICE / 100);

  const dueSubscriptions = await db.subscription.findMany({
    where: {
      plan: { in: ['monthly', 'yearly'] },
      status: 'active',
      autoRenew: true,
      endDate: { lte: now },
      paymentMethodId: { not: null },
    },
    include: { user: { select: { id: true, email: true } } },
  });

  let charged = 0;
  let failed = 0;

  for (const sub of dueSubscriptions) {
    const isYearly = sub.plan === 'yearly';
    const price = isYearly ? yearlyPrice : monthlyPrice;
    try {
      const response = await fetch('https://api.yookassa.ru/v3/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(`${YOOKASSA_SHOP_ID}:${YOOKASSA_API_KEY}`).toString('base64')}`,
          'Idempotence-Key': `renew-${sub.id}-${sub.endDate.getTime()}`,
        },
        body: JSON.stringify({
          amount: { value: price.toFixed(2), currency: 'RUB' },
          capture: true,
          payment_method_id: sub.paymentMethodId,
          description: isYearly
            ? `Автопродление Знаторика PRO на 1 год (${price}₽/год)`
            : `Автопродление подписки на Знаторика на 1 месяц (${price}₽/месяц)`,
          metadata: {
            userId: sub.userId,
            type: 'subscription',
            plan: sub.plan,
            country: 'RU',
          },
        }),
      });

      const paymentResponse = await response.json() as any;

      if (!response.ok || paymentResponse.status === 'canceled') {
        throw new Error(paymentResponse.description || `YuKassa error: ${response.status}`);
      }

      await db.payment.create({
        data: {
          userId: sub.userId,
          kassaId: paymentResponse.id,
          amount: price,
          currency: 'RUB',
          status: 'pending',
        },
      });

      charged++;
    } catch (error) {
      failed++;
      console.error(`Autorenew charge failed for subscription ${sub.id}:`, error);
      // Не пытаемся снова каждый день безуспешно — отключаем автопродление и
      // просим продлить вручную, как раньше для подписок без сохранённой карты.
      await db.subscription.update({ where: { id: sub.id }, data: { autoRenew: false } });
      try {
        await sendRenewalFailedEmail(sub.user.email, sub.endDate);
      } catch (emailError) {
        console.error(`Failed to send renewal-failed email for subscription ${sub.id}:`, emailError);
      }
    }
  }

  return NextResponse.json({ checked: dueSubscriptions.length, charged, failed });
}
