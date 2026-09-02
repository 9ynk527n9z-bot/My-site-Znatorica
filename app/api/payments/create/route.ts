import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getUserFromToken } from '@/lib/auth';
import { isMethodAllowed } from '@/lib/payment-methods';
import { getNumberSetting } from '@/lib/settings';
import { SUBSCRIPTION_PRICE, YEARLY_PRICE, LIFETIME_PRICE, TOURNAMENT_DIPLOMA_PRICE, TOURNAMENT_DIPLOMA_FREE } from '@/lib/constants';
import { getProduct, getEffectivePrice } from '@/lib/products';

const YOOKASSA_SHOP_ID = process.env.YOOKASSA_SHOP_ID || '';
const YOOKASSA_API_KEY = process.env.YOOKASSA_API_KEY || '';

type Plan = 'monthly' | 'yearly' | 'lifetime';

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

    const { returnUrl, paymentMethod = 'bank_card', plan = 'monthly', productSlug, tournamentResultId } = await request.json();

    // Проверить, разрешён ли способ оплаты в РФ
    if (!isMethodAllowed(paymentMethod)) {
      return NextResponse.json(
        { error: 'Payment method not allowed in Russia' },
        { status: 400 }
      );
    }

    let amount: number;
    let description: string;
    let metadata: Record<string, string>;

    if (tournamentResultId) {
      // Именной PDF-диплом за результат «Турнира Знаторики» — разовый платёж, не подписка.
      const result = await db.tournamentResult.findUnique({ where: { id: tournamentResultId } });
      if (!result || result.userId !== user.id) {
        return NextResponse.json({ error: 'Unknown tournament result' }, { status: 400 });
      }

      // Подписчикам Знаторика PRO дипломы включены без доплаты (см. /podpiska) —
      // сразу помечаем диплом оплаченным и отдаём фронту признак, чтобы он повёл
      // пользователя прямо на страницу диплома, минуя ЮKassa.
      const activeSubscription = await db.subscription.findUnique({ where: { userId: user.id } });
      const isProSubscriber = !!activeSubscription && activeSubscription.status === 'active' && activeSubscription.endDate > new Date();
      // TOURNAMENT_DIPLOMA_FREE: пока диплом бесплатен для всех, а не только для
      // подписчиков — путь выдачи тот же, что и для PRO, платёж не создаётся.
      if (isProSubscriber || TOURNAMENT_DIPLOMA_FREE) {
        await db.tournamentResult.update({ where: { id: tournamentResultId }, data: { paid: true } });
        return NextResponse.json({ grantedByPro: true });
      }

      amount = TOURNAMENT_DIPLOMA_PRICE;
      description = `Именной диплом «Турнир Знаторики» (${result.trackTitle}, разовый платёж ${amount}₽)`;
      metadata = {
        userId: user.id,
        paymentMethod,
        type: 'tournament',
        tournamentResultId: result.id,
        country: 'RU',
      };
    } else if (productSlug) {
      // Разовая покупка PDF-сборника — не подписка.
      const product = getProduct(productSlug);
      if (!product) {
        return NextResponse.json({ error: 'Unknown product' }, { status: 400 });
      }
      amount = getEffectivePrice(product);
      description = `«${product.title}» (разовая покупка ${amount}₽)`;
      metadata = {
        userId: user.id,
        paymentMethod,
        type: 'product',
        productSlug: product.slug,
        country: 'RU',
      };
    } else {
      if (plan !== 'monthly' && plan !== 'yearly' && plan !== 'lifetime') {
        return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
      }
      const selectedPlan: Plan = plan;

      const monthlyPrice = await getNumberSetting('monthlyPrice', SUBSCRIPTION_PRICE / 100);
      const yearlyPrice = await getNumberSetting('yearlyPrice', YEARLY_PRICE / 100);
      const lifetimePrice = await getNumberSetting('lifetimePrice', LIFETIME_PRICE / 100);

      amount =
        selectedPlan === 'lifetime' ? lifetimePrice : selectedPlan === 'yearly' ? yearlyPrice : monthlyPrice;
      description =
        selectedPlan === 'lifetime'
          ? `Пожизненный доступ к Знаторике (разовый платёж ${lifetimePrice}₽)`
          : selectedPlan === 'yearly'
            ? `Знаторика PRO на 1 год (${yearlyPrice}₽/год)`
            : `Подписка на Знаторика на 1 месяц (${monthlyPrice}₽/месяц)`;
      metadata = {
        userId: user.id,
        paymentMethod,
        type: 'subscription',
        plan: selectedPlan,
        country: 'RU',
      };
    }

    // Для продлеваемых подписок (помесячной и годовой), оплаченных картой, просим
    // ЮKassa сохранить способ оплаты — только так возможно настоящее автопродление
    // (см. cron /api/cron/subscription-autorenew). Согласие на сохранение карты берёт
    // сама ЮKassa на своей странице оплаты — отдельного чекбокса на нашей стороне не
    // требуется. Для СБП и разовых платежей (сборники, диплом, «Навсегда») сохранение
    // не запрашивается: оно не поддерживается / не нужно.
    const shouldSavePaymentMethod =
      metadata.type === 'subscription' &&
      (metadata.plan === 'monthly' || metadata.plan === 'yearly') &&
      paymentMethod !== 'sbp';

    // Create YuKassa payment - ТОЛЬКО разрешённые методы
    const paymentData = {
      amount: {
        value: amount.toFixed(2),
        currency: 'RUB',
      },
      capture: true,
      save_payment_method: shouldSavePaymentMethod,
      payment_method_data: {
        type: paymentMethod === 'sbp' ? 'sbp' : 'bank_card',
      },
      confirmation: {
        type: 'redirect',
        return_url: returnUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/podpiska`,
      },
      description,
      metadata,
    };

    const response = await fetch('https://api.yookassa.ru/v3/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${YOOKASSA_SHOP_ID}:${YOOKASSA_API_KEY}`).toString('base64')}`,
        'Idempotence-Key': `${user.id}-${Date.now()}`,
      },
      body: JSON.stringify(paymentData),
    });

    const paymentResponse = await response.json() as any;

    if (!response.ok) {
      return NextResponse.json({ error: paymentResponse.description }, { status: 400 });
    }

    // Save payment record to database
    const payment = await db.payment.create({
      data: {
        userId: user.id,
        kassaId: paymentResponse.id,
        amount,
        currency: 'RUB',
        status: 'pending',
      },
    });

    return NextResponse.json({
      paymentId: payment.id,
      kassaId: paymentResponse.id,
      confirmationUrl: paymentResponse.confirmation?.confirmation_url,
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    );
  }
}
