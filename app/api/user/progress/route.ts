import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/auth';
import { computeProgressStats } from '@/lib/progress';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await getUserFromToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const stats = await computeProgressStats(user.id);
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Progress error:', error);
    return NextResponse.json({ error: 'Failed to load progress' }, { status: 500 });
  }
}
