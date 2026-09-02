import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin, logAdminAction } from '@/lib/admin';

export const dynamic = 'force-dynamic';

// PATCH /api/admin/feedback/[id] — одобрить/отклонить отзыв
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const existing = await db.feedback.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: 'Не найдено' }, { status: 404 });

  const payload = await request.json();
  const status = payload?.status;
  if (status !== 'approved' && status !== 'rejected') {
    return NextResponse.json(
      { error: 'status должен быть "approved" или "rejected".' },
      { status: 400 },
    );
  }

  const updated = await db.feedback.update({
    where: { id: params.id },
    data: {
      status,
      moderatedAt: new Date(),
      moderatedBy: admin.email,
    },
  });

  await logAdminAction({
    admin: { id: admin.id, email: admin.email },
    action: status === 'approved' ? 'feedback.approve' : 'feedback.reject',
    entity: 'feedback',
    entityId: updated.id,
    detail: `Отзыв ${status === 'approved' ? 'одобрен' : 'отклонён'}: "${updated.message.slice(0, 80)}"`,
  });

  return NextResponse.json({ item: updated });
}
