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

// Раздел сайта по типу контента (не по классу/возрасту) — для отчёта "что смотрели".
function sectionOf(url: string): string {
  const path = url.split('?')[0];
  if (path === '/' || path === '') return 'Главная';
  if (path.startsWith('/generator')) return 'Генераторы';
  if (path.startsWith('/trenazher')) return 'Тренажёры';
  if (path.startsWith('/vpr')) return 'ВПР';
  if (path.startsWith('/dlya-roditeley')) return 'Статьи для родителей';
  if (path.startsWith('/otzyvy')) return 'Отзывы';
  if (path.startsWith('/podpiska')) return 'Подписка';
  if (path.startsWith('/account')) return 'Личный кабинет';
  if (path.startsWith('/admin')) return 'Админка';
  if (
    path.startsWith('/1-klass') ||
    path.startsWith('/2-klass') ||
    path.startsWith('/3-klass') ||
    path.startsWith('/4-klass') ||
    path.startsWith('/4-5-let') ||
    path.startsWith('/6-7-let')
  ) {
    return 'Теория и темы по классам';
  }
  return 'Другое';
}

function sectionCounts(pageViews: { url: string }[]): { key: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const v of pageViews) {
    const s = sectionOf(v.url);
    counts.set(s, (counts.get(s) ?? 0) + 1);
  }
  return topEntries(counts, 20);
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
    pageViews30Raw,
    generatorUses30,
    searchQueries30,
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
      select: { createdAt: true, url: true, userId: true, sessionId: true, utmSource: true, referrer: true, isBot: true, isOwner: true },
    }),
    db.generatorUse.findMany({
      where: { createdAt: { gte: since30 } },
      select: { createdAt: true, type: true, userId: true, sessionId: true },
    }),
    db.searchQuery.findMany({
      where: { createdAt: { gte: since30 } },
      select: { query: true, resultsCount: true },
    }),
  ]);

  // Ботов/сканеров и собственные визиты (залогинена как admin) исключаем из всех
  // "живых" метрик (DAU/MAU, источники, топ страниц, сессии) — иначе security-сканеры
  // и наши же проверки раздувают цифры и искажают картину. Отдельно считаем сколько
  // их было — для прозрачности в самой админке.
  const botPageViews30 = pageViews30Raw.filter((v) => v.isBot).length;
  const ownerPageViews30 = pageViews30Raw.filter((v) => !v.isBot && v.isOwner).length;
  const pageViews30 = pageViews30Raw.filter((v) => !v.isBot && !v.isOwner);

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
  const revenue30 = payments30.reduce((sum, p) => sum + p.amount, 0);

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

  // Источники трафика (?utm_source=... в ссылке) — по уникальным сессиям/визитам,
  // не по просмотрам страниц, иначе один посетитель с 10 просмотрами перевесит статистику.
  const sourceVisitors = new Map<string, Set<string>>();
  for (const v of pageViews30) {
    const key = visitorKey(v);
    if (!key) continue;
    const source = v.utmSource || 'Прямые заходы / без метки';
    if (!sourceVisitors.has(source)) sourceVisitors.set(source, new Set());
    sourceVisitors.get(source)!.add(key);
  }
  const trafficSources = Array.from(sourceVisitors.entries())
    .map(([key, visitors]) => ({ key, count: visitors.size }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);

  // Referrer (document.referrer с первой страницы визита) — сырой домен-источник,
  // в отличие от trafficSources не зависит от того, размечена ли ссылка вручную.
  const referrerVisitors = new Map<string, Set<string>>();
  for (const v of pageViews30) {
    const key = visitorKey(v);
    if (!key) continue;
    const source = v.referrer || 'direct';
    if (!referrerVisitors.has(source)) referrerVisitors.set(source, new Set());
    referrerVisitors.get(source)!.add(key);
  }
  const referrerSources = Array.from(referrerVisitors.entries())
    .map(([key, visitors]) => ({ key, count: visitors.size }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);

  // Крупная классификация "откуда вообще этот визит" — реклама vs органический поиск
  // vs прямой заход, поверх сырых utmSource/referrer, чтобы не сверять две таблицы
  // в голове каждый раз. Порядок проверок важен: реклама определяется по utmSource
  // (yclid/gclid/ручная метка), органика — по домену поисковика в referrer.
  const SEARCH_ENGINE_HOSTS = ['yandex.ru', 'www.yandex.ru', 'ya.ru', 'yandex.by', 'yandex.com', 'google.com', 'www.google.com', 'bing.com'];
  function classifyTraffic(v: { utmSource: string | null; referrer: string | null }): string {
    if (v.utmSource === 'yandex-direct' || v.utmSource === 'google-ads') return '📣 Реклама';
    if (v.utmSource) return '📣 Реклама (другая метка)';
    if (v.referrer && SEARCH_ENGINE_HOSTS.includes(v.referrer)) return '🔍 Поиск (органика)';
    if (v.referrer === 'direct') return '➡️ Прямой заход / приложение';
    // referrer===null (не пустая строка "direct", а именно null) — визит был ДО того,
    // как заработал новый трекинг, реального источника мы для него не знаем вообще,
    // это не то же самое, что "точно прямой заход".
    if (!v.referrer) return '❓ Нет данных (до обновления трекинга)';
    return '🔗 Другой сайт';
  }
  // Три основные категории показываем всегда, даже с нулём — иначе непонятно, то ли
  // категорию не отслеживаем, то ли по ней правда пока нет визитов.
  const trafficTypeVisitors = new Map<string, Set<string>>([
    ['📣 Реклама', new Set()],
    ['🔍 Поиск (органика)', new Set()],
    ['➡️ Прямой заход / приложение', new Set()],
  ]);
  for (const v of pageViews30) {
    const key = visitorKey(v);
    if (!key) continue;
    const type = classifyTraffic(v);
    if (!trafficTypeVisitors.has(type)) trafficTypeVisitors.set(type, new Set());
    trafficTypeVisitors.get(type)!.add(key);
  }
  const trafficTypes = Array.from(trafficTypeVisitors.entries())
    .map(([key, visitors]) => ({ key, count: visitors.size }))
    .sort((a, b) => b.count - a.count);

  // Та же классификация "реклама / органика / прямой заход", но по дням — чтобы
  // видеть тренд каждого источника отдельно, а не только сумму за 30 дней.
  const trafficTypeByDay = new Map<string, Map<string, Set<string>>>();
  for (const v of pageViews30) {
    const key = visitorKey(v);
    if (!key) continue;
    const date = dayKey(v.createdAt);
    const type = classifyTraffic(v);
    if (!trafficTypeByDay.has(date)) trafficTypeByDay.set(date, new Map());
    const typeMap = trafficTypeByDay.get(date)!;
    if (!typeMap.has(type)) typeMap.set(type, new Set());
    typeMap.get(type)!.add(key);
  }
  const trafficTypeSeries = days.map((date) => {
    const typeMap = trafficTypeByDay.get(date);
    return {
      date,
      ads: (typeMap?.get('📣 Реклама')?.size ?? 0) + (typeMap?.get('📣 Реклама (другая метка)')?.size ?? 0),
      organic: typeMap?.get('🔍 Поиск (органика)')?.size ?? 0,
      direct: typeMap?.get('➡️ Прямой заход / приложение')?.size ?? 0,
    };
  });

  // Топ страниц
  const pageCounts = new Map<string, number>();
  for (const v of pageViews30) pageCounts.set(v.url, (pageCounts.get(v.url) ?? 0) + 1);
  const topPages = topEntries(pageCounts, 10);

  // Что реально ищут на сайте, и что не находится — для понимания спроса и
  // пробелов в контенте (запрос, на который ничего не нашлось, — сигнал сделать тему).
  const searchCounts = new Map<string, number>();
  const zeroResultCounts = new Map<string, number>();
  for (const s of searchQueries30) {
    const q = s.query.toLowerCase();
    searchCounts.set(q, (searchCounts.get(q) ?? 0) + 1);
    if (s.resultsCount === 0) zeroResultCounts.set(q, (zeroResultCounts.get(q) ?? 0) + 1);
  }
  const topSearchQueries = topEntries(searchCounts, 15);
  const zeroResultQueries = topEntries(zeroResultCounts, 15);

  // Что смотрели и сколько посещений по разделам сайта — отдельно за день/неделю/месяц.
  const pageViewsDay = pageViews30.filter((v) => v.createdAt >= since1);
  const pageViewsWeek = pageViews30.filter((v) => v.createdAt >= since7);
  const sectionsByPeriod = {
    day: { visits: pageViewsDay.length, sections: sectionCounts(pageViewsDay) },
    week: { visits: pageViewsWeek.length, sections: sectionCounts(pageViewsWeek) },
    month: { visits: pageViews30.length, sections: sectionCounts(pageViews30) },
  };

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

  // Реальные сессии посетителей: группируем просмотры по userId/sessionId,
  // чтобы в админке было видно КТО заходил и КАКИЕ страницы смотрел —
  // не только агрегированные цифры.
  type SessionRow = {
    key: string;
    userId: string | null;
    sessionId: string | null;
    pages: { url: string; createdAt: Date }[];
  };
  const sessionsMap = new Map<string, SessionRow>();
  for (const v of pageViews30) {
    const key = visitorKey(v);
    if (!key) continue;
    let row = sessionsMap.get(key);
    if (!row) {
      row = { key, userId: v.userId, sessionId: v.sessionId, pages: [] };
      sessionsMap.set(key, row);
    }
    row.pages.push({ url: v.url, createdAt: v.createdAt });
  }

  const userIds = Array.from(sessionsMap.values())
    .map((r) => r.userId)
    .filter((id): id is string => !!id);
  const usersById = userIds.length
    ? new Map(
        (await db.user.findMany({ where: { id: { in: userIds } }, select: { id: true, email: true } })).map(
          (u) => [u.id, u.email],
        ),
      )
    : new Map<string, string>();

  // Активная подписка = статус active и срок ещё не истёк — используем и для
  // деления "Последних посетителей" на новых/подписчиков в админке.
  // (`now` уже объявлена в начале GET-хендлера — переиспользуем её.)
  const subscriberIds = userIds.length
    ? new Set(
        (
          await db.subscription.findMany({
            where: { userId: { in: userIds }, status: 'active', endDate: { gte: now } },
            select: { userId: true },
          })
        ).map((s) => s.userId),
      )
    : new Set<string>();

  const recentSessions = Array.from(sessionsMap.values())
    .map((r) => {
      const sorted = [...r.pages].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      return {
        label: r.userId ? usersById.get(r.userId) ?? 'Пользователь' : `Гость ${r.sessionId?.slice(0, 8) ?? ''}`,
        isUser: !!r.userId,
        isSubscriber: !!r.userId && subscriberIds.has(r.userId),
        pageCount: sorted.length,
        firstSeen: sorted[0]?.createdAt,
        lastSeen: sorted[sorted.length - 1]?.createdAt,
        pages: sorted.map((p) => ({ url: p.url, at: p.createdAt })),
      };
    })
    .sort((a, b) => (b.lastSeen?.getTime() ?? 0) - (a.lastSeen?.getTime() ?? 0))
    .slice(0, 50);

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
      revenue30,
      conversionRate: totalUsers > 0 ? Math.round((subscribers / totalUsers) * 1000) / 10 : 0,
      dau,
      wau,
      mau,
      vprCompletions30: vprEvents.length,
      vprDistinctVariants30: vprDistinctVariants,
      botPageViews30,
      ownerPageViews30,
    },
    registrationsSeries,
    revenueSeries,
    activitySeries,
    referrerSources,
    trafficTypes,
    trafficTypeSeries,
    trafficSources,
    topPages,
    topGenerators,
    topTrainers,
    recentSessions,
    sectionsByPeriod,
    topSearchQueries,
    zeroResultQueries,
  });
}
