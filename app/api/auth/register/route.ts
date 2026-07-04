import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword, generateToken } from '@/lib/auth';
import { generateVerificationCode, sendConfirmationEmail } from '@/lib/email';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { email, password, agreeToTerms } = await req.json();

    // ✅ ФЗ-152: Явное согласие обязательно
    if (!agreeToTerms) {
      return NextResponse.json(
        { error: 'Вы должны согласиться с обработкой персональных данных' },
        { status: 400 }
      );
    }

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email и пароль обязательны' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Пароль должен быть не менее 6 символов' },
        { status: 400 }
      );
    }

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Пользователь с таким email уже существует' },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);
    const user = await db.user.create({
      data: {
        email,
        passwordHash,
        emailConfirmed: false, // Email ещё не подтверждён
      },
    });

    // ✅ Создать запись согласия
    await db.userConsent.create({
      data: {
        userId: user.id,
        consentedAt: new Date(),
        consentType: 'general',
        isActive: false, // Станет active только после подтверждения email
        ipHashAuth: crypto
          .createHash('sha256')
          .update(req.ip || 'unknown')
          .digest('hex')
          .slice(0, 16),
      },
    });

    // ✅ Создать код подтверждения email и отправить письмо
    const code = generateVerificationCode();
    await db.emailVerificationCode.create({
      data: {
        userId: user.id,
        code,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 часа
      },
    });

    try {
      await sendConfirmationEmail(email, code);
    } catch (emailError) {
      // Не блокируем регистрацию, если письмо не отправилось — пользователь сможет запросить повторную отправку
      console.error('Failed to send confirmation email:', emailError);
    }

    const token = generateToken(user.id);

    return NextResponse.json(
      {
        id: user.id,
        email: user.email,
        token,
        message: 'Регистрация успешна. Проверьте email для подтверждения.',
        emailConfirmed: false,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
