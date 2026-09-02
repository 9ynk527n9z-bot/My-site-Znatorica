'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface FeedbackItem {
  id: string;
  name: string | null;
  email: string | null;
  message: string;
  rating: number | null;
  status: 'pending' | 'approved' | 'rejected';
  moderatedAt: string | null;
  moderatedBy: string | null;
  createdAt: string;
}

const STATUS_LABELS: Record<string, string> = {
  pending: '⏳ На модерации',
  approved: '✅ Одобрен',
  rejected: '⛔ Отклонён',
};

const STATUS_FILTERS: { value: string; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'pending', label: 'На модерации' },
  { value: 'approved', label: 'Одобренные' },
  { value: 'rejected', label: 'Отклонённые' },
];

export default function AdminFeedbackPage() {
  const router = useRouter();
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const token = () => (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

  const load = useCallback(
    async (status: string) => {
      setLoading(true);
      const t = token();
      if (!t) {
        router.push('/login');
        return;
      }
      try {
        const qs = status === 'all' ? '' : `?status=${status}`;
        const res = await fetch(`/api/admin/feedback${qs}`, {
          headers: { Authorization: `Bearer ${t}` },
        });
        if (res.status === 403) {
          router.push('/login');
          return;
        }
        const data = await res.json();
        setItems(data.items ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [router],
  );

  useEffect(() => {
    load(filter);
  }, [filter, load]);

  async function moderate(id: string, status: 'approved' | 'rejected') {
    setBusyId(id);
    setError(null);
    const t = token();
    try {
      const res = await fetch(`/api/admin/feedback/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${t}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Не удалось обновить статус.');
      }
      await load(filter);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Не удалось обновить статус.');
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-6">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-orange hover:underline">
            ← Назад в админку
          </Link>
          <h1 className="text-3xl font-bold">💬 Модерация отзывов</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-10 px-6">
        <p className="text-sm text-gray-400 mb-6 bg-[#1E1035] border border-[#2D2350] rounded-lg p-4">
          Отзывы, отправленные через сайт, публикуются на странице <code>/otzyvy</code> только
          после одобрения здесь. Ничего не появляется на сайте автоматически.
        </p>

        <div className="flex gap-2 mb-6">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                filter === f.value
                  ? 'bg-orange text-white'
                  : 'bg-[#2A1B4D] border border-[#2D2350] text-gray-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-400 py-12">Загрузка…</div>
        ) : items.length === 0 ? (
          <div className="text-center text-gray-400 py-12">Отзывов нет.</div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-white">{item.name || 'Аноним'}</span>
                    {item.email && (
                      <span className="text-gray-400 text-sm">{item.email}</span>
                    )}
                    {item.rating && (
                      <span className="text-orange text-sm">
                        {'★'.repeat(item.rating)}
                        <span className="text-white/25">{'★'.repeat(5 - item.rating)}</span>
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-400 whitespace-nowrap">
                    {new Date(item.createdAt).toLocaleString('ru-RU')}
                  </span>
                </div>

                <p className="text-white/90 whitespace-pre-wrap mb-4">{item.message}</p>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-sm">{STATUS_LABELS[item.status] ?? item.status}</span>

                  <div className="flex items-center gap-3">
                    {item.moderatedAt && item.moderatedBy && (
                      <span className="text-xs text-gray-500">
                        {item.moderatedBy} · {new Date(item.moderatedAt).toLocaleString('ru-RU')}
                      </span>
                    )}
                    {item.status !== 'approved' && (
                      <button
                        disabled={busyId === item.id}
                        onClick={() => moderate(item.id, 'approved')}
                        className="px-4 py-2 rounded-lg text-sm font-semibold bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors disabled:opacity-50"
                      >
                        Одобрить
                      </button>
                    )}
                    {item.status !== 'rejected' && (
                      <button
                        disabled={busyId === item.id}
                        onClick={() => moderate(item.id, 'rejected')}
                        className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors disabled:opacity-50"
                      >
                        Отклонить
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
