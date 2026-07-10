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

// GET /api/admin/content?kind=article|topic — список записей
export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const kind = request.nextUrl.searchParams.get('kind') ?? undefined;
  const where = kind === 'article' || kind === 'topic' ? { kind } : {};

  const items = await db.contentPage.findMany({
    where,
    orderBy: [{ kind: 'asc' }, { updatedAt: 'desc' }],
  });

  return NextResponse.json({ items });
}

// POST /api/admin/content — создать статью или тему
export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const payload = await request.json();

  const kind = payload.kind === 'topic' ? 'topic' : 'article';
  const slug = String(payload.slug ?? '').trim().toLowerCase();
  const title = String(payload.title ?? '').trim();

  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json(
      { error: 'Slug: только латиница в нижнем регистре, цифры и дефис (например, kak-uchit-tablitsu).' },
      { status: 400 },
    );
  }
  if (!title) {
    return NextResponse.json({ error: 'Заголовок обязателен.' }, { status: 400 });
  }

  const body = normalizeBody(payload.body);
  const related = normalizeRelated(payload.related);
  const description = String(payload.description ?? '').trim();
  const intro = String(payload.intro ?? '').trim();
  const tag = payload.tag ? String(payload.tag).trim() : null;

  // Guardrail на запрещённые формулировки (ФЗ + нет лицензии)
  const forbidden = findForbiddenTerms(
    collectContentText({ title, description, intro, tag, body }),
  );
  if (forbidden.length) {
    return NextResponse.json({ error: 'Запрещённые формулировки', forbidden }, { status: 422 });
  }

  const existing = await db.contentPage.findUnique({ where: { kind_slug: { kind, slug } } });
  if (existing) {
    return NextResponse.json({ error: 'Запись с таким slug уже существует.' }, { status: 409 });
  }

  const created = await db.contentPage.create({
    data: {
      kind,
      slug,
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
      manualEdit: true, // создано вручную → seed на деплое не трогает
    },
  });

  await logAdminAction({
    admin: { id: admin.id, email: admin.email },
    action: 'content.create',
    entity: 'content',
    entityId: created.id,
    detail: `${kind}: ${title} (/${slug})`,
  });

  return NextResponse.json({ item: created });
}
