import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import crypto from 'crypto';

/**
 * Подтверждение email при регистрации
 * ФЗ-152: Согласие активируется только после подтверждения email
 */

export async function POST(req: NextRequest) {
  try {
    const { email, confirmationCode } = await req.json();

    if (!email || !confirmationCode) {
      return NextResponse.json(
        { error: 'Email и код подтверждения обязательны' },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { error: 'Пользователь не найден' },
        { status: 404 }
      );
    }

    if (user.emailConfirmed) {
      return NextResponse.json(
        { error: 'Email уже подтвержден' },
        { status: 400 }
      );
    }

    // ✅ Проверить код подтверждения в БД (не использован и не истёк)
    const verification = await db.emailVerificationCode.findFirst({
      where: {
        userId: user.id,
        code: confirmationCode.trim().toUpperCase(),
        usedAt: null,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!verification) {
      return NextResponse.json(
        { error: 'Неверный или истёкший код подтверждения' },
        { status: 400 }
      );
    }

    await db.emailVerificationCode.update({
      where: { id: verification.id },
      data: { usedAt: new Date() },
    });

    // ✅ Обновить пользователя - email подтверждён
    await db.user.update({
      where: { id: user.id },
      data: {
        emailConfirmed: true,
        emailConfirmedAt: new Date(),
      },
    });

    // ✅ Обновить согласие - теперь оно АКТИВНО
    const consent = await db.userConsent.findFirst({
      where: { userId: user.id, consentType: 'general' },
      orderBy: { createdAt: 'desc' },
    });

    if (consent) {
      await db.userConsent.update({
        where: { id: consent.id },
        data: {
          emailConfirmedAt: new Date(),
          isActive: true, // ✅ АКТИВНОЕ СОГЛАСИЕ
          ipHashEmail: crypto
            .createHash('sha256')
            .update(req.ip || 'unknown')
            .digest('hex')
            .slice(0, 16),
        },
      });
    }

    return NextResponse.json({
      message: 'Email успешно подтвержден',
      email: user.email,
      emailConfirmed: true,
      consentActive: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
