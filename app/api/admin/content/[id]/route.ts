import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import {
  requireAdmin,
  logAdminAction,
  findForbiddenTerms,
  collectContentText,
  normalizeBody,
  normalizeRelated,
} from '@/lib/admin';

export const dynamic = 'force-dynamic';

// GET /api/admin/content/[id] — одна запись (для формы редактирования)
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const item = await db.contentPage.findUnique({ where: { id: params.id } });
  if (!item) return NextResponse.json({ error: 'Не найдено' }, { status: 404 });
  return NextResponse.json({ item });
}

// PUT /api/admin/content/[id] — обновить запись
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const existing = await db.contentPage.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: 'Не найдено' }, { status: 404 });

  const payload = await request.json();

  const title = String(payload.title ?? '').trim();
  if (!title) return NextResponse.json({ error: 'Заголовок обязателен.' }, { status: 400 });

  const body = normalizeBody(payload.body);
  const related = normalizeRelated(payload.related);
  const description = String(payload.description ?? '').trim();
  const intro = String(payload.intro ?? '').trim();
  const tag = payload.tag ? String(payload.tag).trim() : null;

  const forbidden = findForbiddenTerms(
    collectContentText({ title, description, intro, tag, body }),
  );
  if (forbidden.length) {
    return NextResponse.json({ error: 'Запрещённые формулировки', forbidden }, { status: 422 });
  }

  const updated = await db.contentPage.update({
    where: { id: params.id },
    data: {
      title,
      description,
      segment: payload.segment ? String(payload.segment).trim() : null,
      subject: payload.subject ? String(payload.subject).trim() : null,
      tag,
      readTime: payload.readTime ? String(payload.readTime).trim() : null,
      date: payload.date ? String(payload.date).trim() : null,
      intro,
      body,
      related: related ?? undefined,
      published: payload.published !== false,
      manualEdit: true, // ручная правка → seed на деплое больше не трогает эту запись
    },
  });

  await logAdminAction({
    admin: { id: admin.id, email: admin.email },
    action: 'content.update',
    entity: 'content',
    entityId: updated.id,
    detail: `${updated.kind}: ${title} (/${updated.slug})`,
  });

  return NextResponse.json({ item: updated });
}

// DELETE /api/admin/content/[id] — удалить запись
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const existing = await db.contentPage.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: 'Не найдено' }, { status: 404 });

  await db.contentPage.delete({ where: { id: params.id } });

  await logAdminAction({
    admin: { id: admin.id, email: admin.email },
    action: 'content.delete',
    entity: 'content',
    entityId: existing.id,
    detail: `${existing.kind}: ${existing.title} (/${existing.slug})`,
  });

  return NextResponse.json({ ok: true });
}
