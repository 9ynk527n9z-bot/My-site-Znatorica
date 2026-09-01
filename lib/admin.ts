import { NextRequest } from 'next/server';
import { getUserFromToken } from './auth';
import { db } from './db';

// Проверка прав администратора по Bearer-токену.
export async function requireAdmin(request: NextRequest) {
  const token = request.headers.get('authorization')?.split(' ')[1];
  if (!token) return null;
  const user = await getUserFromToken(token);
  if (!user || user.role !== 'admin') return null;
  return user;
}

// Журнал действий администратора (подотчётность по ФЗ-152).
export async function logAdminAction(params: {
  admin: { id: string; email: string };
  action: string;
  entity: string;
  entityId?: string | null;
  detail?: string | null;
}) {
  try {
    await db.adminLog.create({
      data: {
        adminId: params.admin.id,
        adminEmail: params.admin.email,
        action: params.action,
        entity: params.entity,
        entityId: params.entityId ?? null,
        detail: params.detail ?? null,
      },
    });
  } catch (e) {
    // Логирование не должно ронять основное действие, но пусть будет видно в логах контейнера.
    console.error('[admin-log] не удалось записать действие:', e);
  }
}

// Запрещённые формулировки: нет лицензии на образовательную деятельность и на
// заявления о соответствии ФГОС/УМК/конкретным учебникам (см. память
// no_official_compliance_claims). Проверяем контент перед сохранением.
const FORBIDDEN_PATTERNS: { re: RegExp; hint: string }[] = [
  { re: /ФГОС/iu, hint: '«ФГОС» — нельзя заявлять соответствие федеральному стандарту (нет аккредитации).' },
  { re: /\bУМК\b/iu, hint: '«УМК» — нельзя ссылаться на учебно-методические комплексы.' },
  { re: /образовательн/iu, hint: '«образовательная/образовательный» — используйте «развивающая» (нет образовательной лицензии).' },
];

export function findForbiddenTerms(text: string): string[] {
  const hits: string[] = [];
  for (const { re, hint } of FORBIDDEN_PATTERNS) {
    if (re.test(text)) hits.push(hint);
  }
  return hits;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
// Нормализация тела контента (массив разделов) из произвольного JSON.
export function normalizeBody(raw: any): { heading: string; body: string[] }[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((s: any) => ({
      heading: typeof s?.heading === 'string' ? s.heading.trim() : '',
      body: Array.isArray(s?.body)
        ? s.body.map((p: any) => (typeof p === 'string' ? p : '')).filter((p: string) => p.trim() !== '')
        : [],
    }))
    .filter((s) => s.heading !== '' || s.body.length > 0);
}

// Нормализация блока «Смотрите также».
export function normalizeRelated(raw: any): { title: string; url: string }[] | null {
  if (!Array.isArray(raw)) return null;
  const links = raw
    .map((r: any) => ({
      title: typeof r?.title === 'string' ? r.title.trim() : '',
      url: typeof r?.url === 'string' ? r.url.trim() : '',
    }))
    .filter((r) => r.title !== '' && r.url !== '');
  return links.length ? links : null;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// Собирает весь текст из полей контента для проверки guardrail'ом.
export function collectContentText(payload: {
  title?: string;
  description?: string;
  intro?: string;
  tag?: string | null;
  body?: { heading?: string; body?: string[] }[];
}): string {
  const parts: string[] = [
    payload.title ?? '',
    payload.description ?? '',
    payload.intro ?? '',
    payload.tag ?? '',
  ];
  for (const s of payload.body ?? []) {
    parts.push(s.heading ?? '');
    for (const p of s.body ?? []) parts.push(p);
  }
  return parts.join('\n');
}
