import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getUserFromToken } from '@/lib/auth';
import { getTournamentTrack, getTournamentQuestionPool } from '@/lib/tournament';

const ROUND_SIZE = 15;

// Сохраняет результат прохождения турнира сразу после ответа на вопросы (пока
// без оплаты) — нужно, чтобы дальше создать платёж именно за диплом с этим
// результатом. Само участие в турнире бесплатно и не требует этой записи —
// она нужна только тем, кто решит купить именной диплом.
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await getUserFromToken(token);
    if (!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

    const { trackId, childName, score, total } = await request.json();

    const track = getTournamentTrack(trackId);
    if (!track) return NextResponse.json({ error: 'Unknown track' }, { status: 400 });

    const name = typeof childName === 'string' ? childName.trim().slice(0, 100) : '';
    if (!name) return NextResponse.json({ error: 'childName is required' }, { status: 400 });

    if (
      typeof score !== 'number' || typeof total !== 'number' ||
      !Number.isInteger(score) || !Number.isInteger(total) ||
      score < 0 || score > total || total <= 0
    ) {
      return NextResponse.json({ error: 'Invalid score' }, { status: 400 });
    }

    // Результат должен соответствовать реальному размеру раунда для этого трека —
    // иначе кто угодно мог бы вызвать этот API напрямую и купить диплом с
    // произвольным результатом, не проходя турнир вообще.
    const expectedTotal = Math.min(ROUND_SIZE, getTournamentQuestionPool(track.id).length);
    if (total !== expectedTotal) {
      return NextResponse.json({ error: 'Total does not match track round size' }, { status: 400 });
    }

    const result = await db.tournamentResult.create({
      data: {
        userId: user.id,
        trackId: track.id,
        trackTitle: track.title,
        childName: name,
        score,
        total,
      },
    });

    return NextResponse.json({ resultId: result.id });
  } catch (error) {
    console.error('Tournament result creation error:', error);
    return NextResponse.json({ error: 'Failed to save result' }, { status: 500 });
  }
}
