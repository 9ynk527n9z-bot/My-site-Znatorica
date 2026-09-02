import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin } from '@/lib/admin';

export const dynamic = 'force-dynamic';

// GET /api/admin/feedback?status=pending|approved|rejected — список отзывов для модерации
export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const status = request.nextUrl.searchParams.get('status') ?? undefined;
  const where =
    status === 'pending' || status === 'approved' || status === 'rejected' ? { status } : {};

  const items = await db.feedback.findMany({
    where,
    // pending сначала, затем по дате создания (новые сверху)
    orderBy: [{ createdAt: 'desc' }],
  });

  const sorted = [...items].sort((a, b) => {
    if (a.status === b.status) return 0;
    if (a.status === 'pending') return -1;
    if (b.status === 'pending') return 1;
    return 0;
  });

  return NextResponse.json({ items: sorted });
}
