import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateVerificationCode, sendPasswordResetEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email обязателен' }, { status: 400 });
    }

    const user = await db.user.findUnique({ where: { email } });

    // Не раскрываем, существует ли аккаунт — единый ответ в любом случае
    if (!user) {
      return NextResponse.json({
        message: 'Если аккаунт с таким email существует, письмо с кодом отправлено.',
      });
    }

    // Инвалидировать предыдущие неиспользованные коды
    await db.passwordResetCode.updateMany({
      where: { userId: user.id, usedAt: null },
      data: { usedAt: new Date() },
    });

    const code = generateVerificationCode();
    await db.passwordResetCode.create({
      data: {
        userId: user.id,
        code,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 час
      },
    });

    await sendPasswordResetEmail(email, code);

    return NextResponse.json({
      message: 'Если аккаунт с таким email существует, письмо с кодом отправлено.',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}
