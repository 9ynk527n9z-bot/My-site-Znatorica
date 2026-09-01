import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateVerificationCode, sendConfirmationEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email обязателен' }, { status: 400 });
    }

    const user = await db.user.findUnique({ where: { email } });

    // Не раскрываем, существует ли аккаунт — единый ответ в любом случае
    if (!user || user.emailConfirmed) {
      return NextResponse.json({
        message: 'Если аккаунт существует и email ещё не подтверждён, письмо отправлено.',
      });
    }

    // Инвалидировать предыдущие неиспользованные коды
    await db.emailVerificationCode.updateMany({
      where: { userId: user.id, usedAt: null },
      data: { usedAt: new Date() },
    });

    const code = generateVerificationCode();
    await db.emailVerificationCode.create({
      data: {
        userId: user.id,
        code,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    await sendConfirmationEmail(email, code);

    return NextResponse.json({
      message: 'Если аккаунт существует и email ещё не подтверждён, письмо отправлено.',
    });
  } catch (error) {
    console.error('Resend confirmation error:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}
