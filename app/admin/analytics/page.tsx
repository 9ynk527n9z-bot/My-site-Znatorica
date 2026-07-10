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
}

interface Analytics {
  totals: Totals;
  registrationsSeries: { date: string; count: number }[];
  revenueSeries: { date: string; amount: number }[];
  activitySeries: { date: string; pageViews: number; usage: number }[];
  topPages: { key: string; count: number }[];
  topGenerators: { key: string; count: number }[];
  topTrainers: { key: string; count: number }[];
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
              <StatCard label="Сегодня были на сайте" value={data.totals.dau} accent="text-orange" />
              <StatCard label="За неделю" value={data.totals.wau} />
              <StatCard label="За 30 дней" value={data.totals.mau} />
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

            <div className="grid lg:grid-cols-3 gap-6">
              <BarList title="🔝 Топ страниц" items={data.topPages} emptyHint="Пока нет данных — учёт начался сегодня." />
              <BarList title="⚙️ Топ генераторов" items={data.topGenerators} emptyHint="Пока нет использований." />
              <BarList title="🎮 Топ тренажёров" items={data.topTrainers} emptyHint="Пока нет использований." />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
