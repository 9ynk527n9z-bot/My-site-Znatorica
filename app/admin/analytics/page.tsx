'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

interface Totals {
  totalUsers: number;
  subscribers: number;
  conversionRate: number;
  dau: number;
  wau: number;
  mau: number;
  vprCompletions30: number;
  vprDistinctVariants30: number;
  botPageViews30: number;
  ownerPageViews30: number;
}

interface Analytics {
  totals: Totals;
  registrationsSeries: { date: string; count: number }[];
  revenueSeries: { date: string; amount: number }[];
  activitySeries: { date: string; pageViews: number; usage: number }[];
  trafficSources: { key: string; count: number }[];
  trafficTypes: { key: string; count: number }[];
  trafficTypeSeries: { date: string; ads: number; organic: number; direct: number }[];
  referrerSources: { key: string; count: number }[];
  topPages: { key: string; count: number }[];
  topGenerators: { key: string; count: number }[];
  topTrainers: { key: string; count: number }[];
  recentSessions: {
    label: string;
    isUser: boolean;
    isSubscriber: boolean;
    pageCount: number;
    firstSeen: string;
    lastSeen: string;
    pages: { url: string; at: string }[];
  }[];
  sectionsByPeriod: {
    day: { visits: number; sections: { key: string; count: number }[] };
    week: { visits: number; sections: { key: string; count: number }[] };
    month: { visits: number; sections: { key: string; count: number }[] };
  };
  topSearchQueries: { key: string; count: number }[];
  zeroResultQueries: { key: string; count: number }[];
}

function shortDate(d: string) {
  const [, m, day] = d.split('-');
  return `${day}.${m}`;
}

function StatCard({ label, value, accent }: { label: string; value: string | number; accent?: string }) {
  return (
    <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-5">
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className={`text-3xl font-bold ${accent ?? 'text-white'}`}>{value}</p>
    </div>
  );
}

function BarList({ title, items, emptyHint }: { title: string; items: { key: string; count: number }[]; emptyHint: string }) {
  const max = Math.max(1, ...items.map((i) => i.count));
  return (
    <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-5">
      <h3 className="font-bold mb-4">{title}</h3>
      {items.length === 0 ? (
        <p className="text-gray-500 text-sm">{emptyHint}</p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.key} className="flex items-center gap-3">
              <span className="text-sm text-gray-300 w-32 truncate" title={item.key}>
                {item.key || '(без указания)'}
              </span>
              <div className="flex-1 bg-black/40 rounded h-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange to-pink-500"
                  style={{ width: `${(item.count / max) * 100}%` }}
                />
              </div>
              <span className="text-sm text-gray-400 w-10 text-right">{item.count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SectionsByPeriod({ data }: { data: Analytics['sectionsByPeriod'] }) {
  const columns: { title: string; period: keyof Analytics['sectionsByPeriod'] }[] = [
    { title: 'День', period: 'day' },
    { title: 'Неделя', period: 'week' },
    { title: 'Месяц', period: 'month' },
  ];
  return (
    <div className="grid lg:grid-cols-3 gap-6 mb-6">
      {columns.map(({ title, period }) => {
        const { visits, sections } = data[period];
        return (
          <div key={period} className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-5">
            <h3 className="font-bold mb-1">📍 Разделы — {title}</h3>
            <p className="text-gray-500 text-xs mb-4">{visits} посещений всего</p>
            {sections.length === 0 ? (
              <p className="text-gray-500 text-sm">Пока нет данных.</p>
            ) : (
              <div className="space-y-2">
                {sections.map((s) => (
                  <div key={s.key} className="flex items-center gap-3">
                    <span className="text-sm text-gray-300 flex-1 truncate" title={s.key}>
                      {s.key}
                    </span>
                    <span className="text-sm text-orange font-bold w-10 text-right">{s.count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}

type Session = Analytics['recentSessions'][number];

// Ключ визита для раскрытия/сворачивания — сессии живут в двух независимых
// колонках, поэтому индекс в массиве не годится (два разных визита в разных
// колонках могут иметь одинаковый i).
function sessionKey(s: Session): string {
  return `${s.label}__${s.firstSeen}`;
}

function SessionRow({ s, isExpanded, onToggle }: { s: Session; isExpanded: boolean; onToggle: () => void }) {
  return (
    <div className="bg-black/40 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className={s.isUser ? 'text-green-400' : 'text-gray-400'}>{s.isUser ? '👤' : '🕶️'}</span>
          <span className="truncate text-sm font-bold" title={s.label}>
            {s.label}
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-400 shrink-0">
          <span>{formatDateTime(s.lastSeen)}</span>
          <span className="bg-orange/20 text-orange px-2 py-0.5 rounded">{s.pageCount} стр.</span>
          <span>{isExpanded ? '▲' : '▼'}</span>
        </div>
      </button>
      {isExpanded && (
        <div className="px-4 pb-3 space-y-1 border-t border-white/10 pt-3">
          {s.pages.map((p, j) => (
            <div key={j} className="flex items-center gap-3 text-xs">
              <span className="text-gray-500 w-12 shrink-0">{formatDateTime(p.at).split(', ')[1]}</span>
              <span className="text-gray-300 truncate">{p.url}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function VisitorColumn({
  title,
  sessions,
  expandedKeys,
  onToggle,
  emptyHint,
}: {
  title: string;
  sessions: Session[];
  expandedKeys: Set<string>;
  onToggle: (key: string) => void;
  emptyHint: string;
}) {
  return (
    <div>
      <h4 className="text-sm font-bold text-gray-300 mb-2">
        {title} <span className="text-gray-500 font-normal">({sessions.length})</span>
      </h4>
      {sessions.length === 0 ? (
        <p className="text-gray-500 text-sm">{emptyHint}</p>
      ) : (
        <div className="space-y-2">
          {sessions.map((s) => {
            const key = sessionKey(s);
            return <SessionRow key={key} s={s} isExpanded={expandedKeys.has(key)} onToggle={() => onToggle(key)} />;
          })}
        </div>
      )}
    </div>
  );
}

function VisitorSessions({ sessions }: { sessions: Analytics['recentSessions'] }) {
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());

  const toggle = (key: string) =>
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const subscribers = sessions.filter((s) => s.isSubscriber);
  const newVisitors = sessions.filter((s) => !s.isSubscriber);

  return (
    <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-5">
      <h3 className="font-bold mb-1">👥 Последние посетители</h3>
      <p className="text-gray-500 text-xs mb-4">
        Кто реально заходил и что смотрел — последние {sessions.length} визитов за 30 дней, слева новые и незалогиненные,
        справа — с активной подпиской (обновляется по перезагрузке страницы).
      </p>
      {sessions.length === 0 ? (
        <p className="text-gray-500 text-sm">Пока нет данных о визитах.</p>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          <VisitorColumn
            title="🆕 Новые"
            sessions={newVisitors}
            expandedKeys={expandedKeys}
            onToggle={toggle}
            emptyHint="За этот период новых визитов без подписки не было."
          />
          <VisitorColumn
            title="⭐ Подписчики"
            sessions={subscribers}
            expandedKeys={expandedKeys}
            onToggle={toggle}
            emptyHint="Подписчики за этот период не заходили."
          />
        </div>
      )}
    </div>
  );
}

export default function AdminAnalyticsPage() {
  const router = useRouter();
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
      try {
        const res = await fetch('/api/admin/analytics', { headers: { Authorization: `Bearer ${token}` } });
        if (res.status === 403) {
          setError('Нет доступа к админ-панели');
          return;
        }
        if (!res.ok) throw new Error('failed');
        setData(await res.json());
      } catch {
        setError('Не удалось загрузить аналитику');
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-orange hover:underline">
            ← Назад в админку
          </Link>
          <h1 className="text-3xl font-bold">📊 Аналитика</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-10 px-6">
        <p className="text-sm text-gray-400 mb-8 bg-[#1E1035] border border-[#2D2350] rounded-lg p-4">
          Своя статистика посещений и использования сайта — без Google Analytics и сторонних сервисов. Учёт просмотров
          страниц включён {new Date().toLocaleDateString('ru-RU')}, поэтому данные о трафике будут накапливаться
          со временем; регистрации и платежи считаются с самого начала.
        </p>

        {loading ? (
          <div className="text-center text-gray-400 py-12">Загрузка…</div>
        ) : error ? (
          <div className="text-center text-red-400 py-12">{error}</div>
        ) : data ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard label="Посетителей сегодня" value={data.totals.dau} accent="text-orange" />
              <StatCard label="Посетителей за неделю" value={data.totals.wau} />
              <StatCard label="Посетителей за 30 дней" value={data.totals.mau} />
              <StatCard
                label="Конверсия в подписку"
                value={`${data.totals.conversionRate}%`}
                accent="text-green-400"
              />
              <StatCard label="Всего пользователей" value={data.totals.totalUsers} />
              <StatCard label="Активных подписок" value={data.totals.subscribers} />
              <StatCard label="Решено вариантов ВПР (30 дн.)" value={data.totals.vprCompletions30} />
              <StatCard label="Разных вариантов ВПР" value={data.totals.vprDistinctVariants30} />
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-5">
                <h3 className="font-bold mb-4">Активность по дням (30 дней)</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={data.activitySeries}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2D2350" />
                    <XAxis dataKey="date" tickFormatter={shortDate} stroke="#8884" tick={{ fontSize: 11, fill: '#999' }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#999' }} />
                    <Tooltip
                      labelFormatter={shortDate}
                      contentStyle={{ background: '#1E1035', border: '1px solid #2D2350' }}
                    />
                    <Line type="monotone" dataKey="pageViews" name="Просмотры страниц" stroke="#FF8C42" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="usage" name="Генераторы/тренажёры" stroke="#9C36B5" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-5">
                <h3 className="font-bold mb-4">Регистрации и выручка (30 дней)</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={data.registrationsSeries.map((r, i) => ({ ...r, amount: data.revenueSeries[i]?.amount ?? 0 }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2D2350" />
                    <XAxis dataKey="date" tickFormatter={shortDate} stroke="#8884" tick={{ fontSize: 11, fill: '#999' }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#999' }} />
                    <Tooltip
                      labelFormatter={shortDate}
                      contentStyle={{ background: '#1E1035', border: '1px solid #2D2350' }}
                    />
                    <Bar dataKey="count" name="Регистрации" fill="#4DABF7" />
                    <Bar dataKey="amount" name="Выручка, ₽" fill="#69DB7C" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <SectionsByPeriod data={data.sectionsByPeriod} />

            {(data.totals.botPageViews30 > 0 || data.totals.ownerPageViews30 > 0) && (
              <p className="text-white/50 text-xs mb-2">
                {data.totals.botPageViews30 > 0 && <>🤖 Отфильтровано {data.totals.botPageViews30} просмотров от ботов/сканеров. </>}
                {data.totals.ownerPageViews30 > 0 && <>👤 Отфильтровано {data.totals.ownerPageViews30} собственных визитов (залогинена как admin). </>}
                Не учтены нигде ниже (за 30 дней).
              </p>
            )}
            <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-5 mb-6">
              <h3 className="font-bold mb-4">🧭 Реклама / органика / прямые заходы по дням (30 дней)</h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={data.trafficTypeSeries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2D2350" />
                  <XAxis dataKey="date" tickFormatter={shortDate} stroke="#8884" tick={{ fontSize: 11, fill: '#999' }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#999' }} />
                  <Tooltip
                    labelFormatter={shortDate}
                    contentStyle={{ background: '#1E1035', border: '1px solid #2D2350' }}
                  />
                  <Line type="monotone" dataKey="ads" name="Реклама" stroke="#FF8C42" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="organic" name="Органика (поиск)" stroke="#69DB7C" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="direct" name="Прямые заходы" stroke="#4DABF7" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-white/40 text-xs mt-2">
                Дни до подключения метки рекламы сюда не попадают честно — старые визиты без данных об источнике
                не показаны ни в одной из трёх линий.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <BarList title="🧭 Тип визита" items={data.trafficTypes} emptyHint="Пока нет данных." />
              <BarList title="🔗 Referrer (сайт-источник визита)" items={data.referrerSources} emptyHint="Пока нет данных." />
            </div>
            <div className="grid lg:grid-cols-3 gap-6 mb-6">
              <BarList title="📣 Источники трафика (метка ?utm_source=...)" items={data.trafficSources} emptyHint="Пока нет визитов с меткой ?utm_source=... в ссылке." />
              <BarList title="🔝 Топ страниц" items={data.topPages} emptyHint="Пока нет данных — учёт начался сегодня." />
              <BarList title="⚙️ Топ генераторов" items={data.topGenerators} emptyHint="Пока нет использований." />
              <BarList title="🎮 Топ тренажёров" items={data.topTrainers} emptyHint="Пока нет использований." />
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <BarList
                title="🔍 Что искали (30 дней)"
                items={data.topSearchQueries}
                emptyHint="Пока никто ничего не искал."
              />
              <BarList
                title="🔍 Искали, но не нашли"
                items={data.zeroResultQueries}
                emptyHint="Все запросы находят результаты — отлично."
              />
            </div>

            <VisitorSessions sessions={data.recentSessions} />
          </>
        ) : null}
      </div>
    </div>
  );
}
