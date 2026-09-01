import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword, generateToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, code, newPassword } = await req.json();

    if (!email || !code || !newPassword) {
      return NextResponse.json(
        { error: 'Email, код и новый пароль обязательны' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Пароль должен быть не менее 6 символов' },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { error: 'Неверный или истёкший код' },
        { status: 400 }
      );
    }

    const reset = await db.passwordResetCode.findFirst({
      where: {
        userId: user.id,
        code: code.trim().toUpperCase(),
        usedAt: null,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!reset) {
      return NextResponse.json(
        { error: 'Неверный или истёкший код' },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(newPassword);

    await db.$transaction([
      db.user.update({ where: { id: user.id }, data: { passwordHash } }),
      db.passwordResetCode.update({ where: { id: reset.id }, data: { usedAt: new Date() } }),
      // Инвалидировать остальные неиспользованные коды — не оставляем «живых» кодов после смены пароля
      db.passwordResetCode.updateMany({
        where: { userId: user.id, usedAt: null },
        data: { usedAt: new Date() },
      }),
    ]);

    const token = generateToken(user.id);

    return NextResponse.json({
      message: 'Пароль успешно изменён',
      token,
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}
