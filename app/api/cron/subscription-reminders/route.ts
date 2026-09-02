import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendRenewalReminderEmail } from '@/lib/email';
import { getNumberSetting } from '@/lib/settings';
import { SUBSCRIPTION_PRICE, YEARLY_PRICE } from '@/lib/constants';

export const dynamic = 'force-dynamic';

const DAY_MS = 24 * 60 * 60 * 1000;
const REMIND_WINDOW_DAYS = 3; // помесячная: 399₽ — небольшая сумма, хватает 3 дней
const YEARLY_REMIND_WINDOW_DAYS = 7; // годовая: сумма заметная, предупреждаем заранее

// Ненавязчивое напоминание перед окончанием продлеваемой подписки — один раз
// на подписку (renewalReminderSentAt), чтобы не спамить. Вызывается системным
// cron на сервере через curl с секретом в заголовке.
//
// Для годового тарифа окно шире (7 дней вместо 3): списание на несколько тысяч
// рублей не должно быть неожиданностью — у человека должно остаться время отменить
// автопродление в личном кабинете, если он передумал.
//
// Текст письма зависит от того, есть ли у подписки сохранённый способ оплаты
// (paymentMethodId) — см. /api/payments/create и /api/payments/webhook: если
// есть, деньги спишутся сами (см. /api/cron/subscription-autorenew), письмо
// просто предупреждает и даёт возможность отменить; если нет (подписки,
// оформленные до появления автосписания) — как раньше, просьба продлить вручную.
export async function GET(request: NextRequest) {
  const secret = request.headers.get('x-cron-secret');
  if (!secret || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const now = new Date();
  // Берём самое широкое окно (годовое), а точное окно под каждый тариф проверяем
  // ниже — иначе годовые подписки просто не попали бы в выборку за 7 дней.
  const windowEnd = new Date(now.getTime() + YEARLY_REMIND_WINDOW_DAYS * DAY_MS);
  const monthlyPrice = await getNumberSetting('monthlyPrice', SUBSCRIPTION_PRICE / 100);
  const yearlyPrice = await getNumberSetting('yearlyPrice', YEARLY_PRICE / 100);

  const candidates = await db.subscription.findMany({
    where: {
      plan: { in: ['monthly', 'yearly'] },
      status: 'active',
      endDate: { gte: now, lte: windowEnd },
      renewalReminderSentAt: null,
    },
    include: { user: { select: { email: true } } },
  });

  const dueSubscriptions = candidates.filter((sub) => {
    const windowDays = sub.plan === 'yearly' ? YEARLY_REMIND_WINDOW_DAYS : REMIND_WINDOW_DAYS;
    return sub.endDate.getTime() <= now.getTime() + windowDays * DAY_MS;
  });

  let sent = 0;
  for (const sub of dueSubscriptions) {
    try {
      const willAutoCharge = !!sub.paymentMethodId && sub.autoRenew;
      const price = sub.plan === 'yearly' ? yearlyPrice : monthlyPrice;
      await sendRenewalReminderEmail(sub.user.email, sub.endDate, willAutoCharge, price);
      await db.subscription.update({
        where: { id: sub.id },
        data: { renewalReminderSentAt: now },
      });
      sent++;
    } catch (error) {
      console.error(`Failed to send renewal reminder for subscription ${sub.id}:`, error);
    }
  }

  return NextResponse.json({ checked: dueSubscriptions.length, sent });
}
