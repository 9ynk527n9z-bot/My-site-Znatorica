import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getUserFromToken } from '@/lib/auth';
import { isMethodAllowed } from '@/lib/payment-methods';

const YOOKASSA_SHOP_ID = process.env.YOOKASSA_SHOP_ID || '';
const YOOKASSA_API_KEY = process.env.YOOKASSA_API_KEY || '';

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

    const { returnUrl, paymentMethod = 'bank_card' } = await request.json();

    // Проверить, разрешён ли способ оплаты в РФ
    if (!isMethodAllowed(paymentMethod)) {
      return NextResponse.json(
        { error: 'Payment method not allowed in Russia' },
        { status: 400 }
      );
    }

    // Create YuKassa payment - ТОЛЬКО разрешённые методы
    const paymentData = {
      amount: {
        value: '299.00',
        currency: 'RUB',
      },
      payment_method_data: {
        type: paymentMethod === 'sbp' ? 'sbp' : 'bank_card',
      },
      confirmation: {
        type: 'redirect',
        return_url: returnUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/podpiska`,
      },
      description: 'Подписка на Знаторика на 1 месяц (299₽/месяц)',
      metadata: {
        userId: user.id,
        paymentMethod: paymentMethod,
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
        amount: 299,
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
