import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getUserFromToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const MAX_MESSAGE_LENGTH = 1000;

// GET /api/feedback — публичный список одобренных отзывов для страницы /otzyvy
export async function GET() {
  const items = await db.feedback.findMany({
    where: { status: 'approved' },
    orderBy: { createdAt: 'desc' },
    take: 100,
    select: {
      id: true,
      name: true,
      message: true,
      rating: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ items });
}

// POST /api/feedback — публичная отправка отзыва (без авторизации), уходит на модерацию
export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    // Honeypot: скрытое поле, которое заполняют только боты. Тихо "принимаем",
    // ничего не сохраняя — бот не должен понять, что его отклонили.
    if (typeof payload?.honeypot === 'string' && payload.honeypot.trim() !== '') {
      return NextResponse.json({ ok: true });
    }

    const message = String(payload?.message ?? '').trim();
    if (!message) {
      return NextResponse.json({ error: 'Сообщение обязательно.' }, { status: 400 });
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Сообщение слишком длинное (максимум ${MAX_MESSAGE_LENGTH} символов).` },
        { status: 400 },
      );
    }

    const name = payload?.name ? String(payload.name).trim().slice(0, 100) : null;

    let rating: number | null = null;
    if (payload?.rating !== undefined && payload?.rating !== null && payload?.rating !== '') {
      const parsed = Number(payload.rating);
      if (!Number.isInteger(parsed) || parsed < 1 || parsed > 5) {
        return NextResponse.json({ error: 'Оценка должна быть от 1 до 5.' }, { status: 400 });
      }
      rating = parsed;
    }

    // Если пользователь залогинен — можно опционально подставить его email.
    let email: string | null = null;
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (token) {
      const user = await getUserFromToken(token);
      if (user) email = user.email;
    }

    const created = await db.feedback.create({
      data: {
        name: name || null,
        email,
        message,
        rating,
        status: 'pending',
      },
    });

    return NextResponse.json({ ok: true, id: created.id });
  } catch (error) {
    console.error('Feedback POST error:', error);
    return NextResponse.json({ error: 'Не удалось отправить отзыв.' }, { status: 500 });
  }
}
