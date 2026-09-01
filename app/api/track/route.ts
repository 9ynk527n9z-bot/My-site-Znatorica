import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { db } from '@/lib/db';
import { getUserFromToken } from '@/lib/auth';

const SESSION_COOKIE = 'znatorika_sid';

export async function POST(request: NextRequest) {
  try {
    const { type, url } = await request.json();
    if ((!type || typeof type !== 'string') && (!url || typeof url !== 'string')) {
      return NextResponse.json({ error: 'type or url is required' }, { status: 400 });
    }

    const token = request.headers.get('authorization')?.split(' ')[1];
    const user = token ? await getUserFromToken(token) : null;

    let sessionId = request.cookies.get(SESSION_COOKIE)?.value || null;
    const response = NextResponse.json({ ok: true });

    if (!user && !sessionId) {
      sessionId = randomUUID();
      response.cookies.set(SESSION_COOKIE, sessionId, {
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
        sameSite: 'lax',
      });
    }

    if (typeof type === 'string' && type) {
      await db.generatorUse.create({
        data: {
          userId: user?.id,
          sessionId: user ? null : sessionId,
          type,
        },
      });
    }

    if (typeof url === 'string' && url) {
      await db.pageView.create({
        data: {
          userId: user?.id,
          sessionId: user ? null : sessionId,
          url: url.slice(0, 300),
        },
      });
    }

    return response;
  } catch (error) {
    console.error('Track error:', error);
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
  }
}
