import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin } from '@/lib/admin';

export const dynamic = 'force-dynamic';

const DAY_MS = 24 * 60 * 60 * 1000;

function dayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function last30DaySeries(): string[] {
  const days: string[] = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    days.push(dayKey(new Date(now.getTime() - i * DAY_MS)));
  }
  return days;
}

function countByDay(dates: Date[], days: string[]): { date: string; count: number }[] {
  const map = new Map<string, number>();
  for (const d of dates) {
    const k = dayKey(d);
    map.set(k, (map.get(k) ?? 0) + 1);
  }
  return days.map((date) => ({ date, count: map.get(date) ?? 0 }));
}

function topEntries(counts: Map<string, number>, limit: number) {
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([key, count]) => ({ key, count }));
}

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const now = new Date();
  const days = last30DaySeries();
  const since30 = new Date(now.getTime() - 30 * DAY_MS);
  const since7 = new Date(now.getTime() - 7 * DAY_MS);
  const since1 = new Date(now.getTime() - 1 * DAY_MS);

  const [
    totalUsers,
    subscribers,
    newUsers30,
    payments30,
    pageViews30,
    generatorUses30,
  ] = await Promise.all([
    db.user.count(),
    db.subscription.count({ where: { status: 'active', endDate: { gt: now } } }),
    db.user.findMany({ where: { createdAt: { gte: since30 } }, select: { createdAt: true } }),
    db.payment.findMany({
      where: { status: 'succeeded', createdAt: { gte: since30 } },
      select: { createdAt: true, amount: true },
    }),
    db.pageView.findMany({
      where: { createdAt: { gte: since30 } },
      select: { createdAt: true, url: true, userId: true, sessionId: true },
    }),
    db.generatorUse.findMany({
      where: { createdAt: { gte: since30 } },
      select: { createdAt: true, type: true, userId: true, sessionId: true },
    }),
  ]);

  // Регистрации и выручка по дням
  const registrationsSeries = countByDay(
    newUsers30.map((u) => u.createdAt),
    days,
  );
  const revenueByDay = new Map<string, number>();
  for (const p of payments30) {
    const k = dayKey(p.createdAt);
    revenueByDay.set(k, (revenueByDay.get(k) ?? 0) + p.amount);
  }
  const revenueSeries = days.map((date) => ({ date, amount: revenueByDay.get(date) ?? 0 }));

  // DAU/WAU/MAU — уникальные посетители (userId или sessionId) по просмотрам страниц
  const visitorKey = (v: { userId: string | null; sessionId: string | null }) =>
    v.userId ? `u:${v.userId}` : v.sessionId ? `s:${v.sessionId}` : null;

  const dau = new Set(
    pageViews30.filter((v) => v.createdAt >= since1).map(visitorKey).filter(Boolean),
  ).size;
  const wau = new Set(
    pageViews30.filter((v) => v.createdAt >= since7).map(visitorKey).filter(Boolean),
  ).size;
  const mau = new Set(pageViews30.map(visitorKey).filter(Boolean)).size;

  // Топ страниц
  const pageCounts = new Map<string, number>();
  for (const v of pageViews30) pageCounts.set(v.url, (pageCounts.get(v.url) ?? 0) + 1);
  const topPages = topEntries(pageCounts, 10);

  // Топ генераторов / тренажёров / ВПР — из GeneratorUse.type вида "generator:slug"
  const generatorCounts = new Map<string, number>();
  const trainerCounts = new Map<string, number>();
  const vprEvents: { type: string }[] = [];

  for (const u of generatorUses30) {
    const [category, ...rest] = u.type.split(':');
    const slug = rest.join(':');
    if (category === 'generator') generatorCounts.set(slug, (generatorCounts.get(slug) ?? 0) + 1);
    else if (category === 'trainer') trainerCounts.set(slug, (trainerCounts.get(slug) ?? 0) + 1);
    else if (category === 'vpr') vprEvents.push(u);
  }

  const topGenerators = topEntries(generatorCounts, 10);
  const topTrainers = topEntries(trainerCounts, 10);

  const vprDistinctVariants = new Set(vprEvents.map((e) => e.type)).size;

  // Активность (страницы + генераторы/тренажёры) по дням — общий график
  const activitySeries = days.map((date) => {
    const pv = pageViews30.filter((v) => dayKey(v.createdAt) === date).length;
    const gu = generatorUses30.filter((v) => dayKey(v.createdAt) === date).length;
    return { date, pageViews: pv, usage: gu };
  });

  return NextResponse.json({
    totals: {
      totalUsers,
      subscribers,
      conversionRate: totalUsers > 0 ? Math.round((subscribers / totalUsers) * 1000) / 10 : 0,
      dau,
      wau,
      mau,
      vprCompletions30: vprEvents.length,
      vprDistinctVariants30: vprDistinctVariants,
    },
    registrationsSeries,
    revenueSeries,
    activitySeries,
    topPages,
    topGenerators,
    topTrainers,
  });
}
