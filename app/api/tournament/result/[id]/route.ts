import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getUserFromToken } from '@/lib/auth';

// Отдаёт статус результата турнира (оплачен диплом или нет) — страница диплома
// поллит этот роут после возврата с оплаты, пока webhook не пометит paid: true.
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await getUserFromToken(token);
    if (!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

    const result = await db.tournamentResult.findUnique({ where: { id: params.id } });
    if (!result || result.userId !== user.id) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({
      trackTitle: result.trackTitle,
      childName: result.childName,
      score: result.score,
      total: result.total,
      paid: result.paid,
      createdAt: result.createdAt,
    });
  } catch (error) {
    console.error('Tournament result fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch result' }, { status: 500 });
  }
}
