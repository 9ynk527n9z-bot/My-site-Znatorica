import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getUserFromToken } from '@/lib/auth';
import { isMethodAllowed } from '@/lib/payment-methods';
import { getNumberSetting } from '@/lib/settings';
import { SUBSCRIPTION_PRICE, LIFETIME_PRICE } from '@/lib/constants';

const YOOKASSA_SHOP_ID = process.env.YOOKASSA_SHOP_ID || '';
const YOOKASSA_API_KEY = process.env.YOOKASSA_API_KEY || '';

type Plan = 'monthly' | 'lifetime';

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

    const { returnUrl, paymentMethod = 'bank_card', plan = 'monthly' } = await request.json();

    if (plan !== 'monthly' && plan !== 'lifetime') {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }
    const selectedPlan: Plan = plan;

    // Проверить, разрешён ли способ оплаты в РФ
    if (!isMethodAllowed(paymentMethod)) {
      return NextResponse.json(
        { error: 'Payment method not allowed in Russia' },
        { status: 400 }
      );
    }

    const monthlyPrice = await getNumberSetting('monthlyPrice', SUBSCRIPTION_PRICE / 100);
    const lifetimePrice = await getNumberSetting('lifetimePrice', LIFETIME_PRICE / 100);

    const amount = selectedPlan === 'lifetime' ? lifetimePrice : monthlyPrice;
    const description =
      selectedPlan === 'lifetime'
        ? `Пожизненный доступ к Знаторике (разовый платёж ${lifetimePrice}₽)`
        : `Подписка на Знаторика на 1 месяц (${monthlyPrice}₽/месяц)`;

    // Create YuKassa payment - ТОЛЬКО разрешённые методы
    const paymentData = {
      amount: {
        value: amount.toFixed(2),
        currency: 'RUB',
      },
      capture: true,
      payment_method_data: {
        type: paymentMethod === 'sbp' ? 'sbp' : 'bank_card',
      },
      confirmation: {
        type: 'redirect',
        return_url: returnUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/podpiska`,
      },
      description,
      metadata: {
        userId: user.id,
        paymentMethod: paymentMethod,
        plan: selectedPlan,
        country: 'RU',
      },
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
