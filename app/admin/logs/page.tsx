'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface LogItem {
  id: string;
  adminEmail: string;
  action: string;
  entity: string;
  entityId: string | null;
  detail: string | null;
  createdAt: string;
}

const ACTION_LABELS: Record<string, string> = {
  'content.create': '➕ создан контент',
  'content.update': '✏️ изменён контент',
  'content.delete': '🗑️ удалён контент',
  'user.export': '📤 экспорт данных пользователя',
  'user.delete': '🗑️ удалён пользователь',
  'feedback.approve': '✅ отзыв одобрен',
  'feedback.reject': '⛔ отзыв отклонён',
};

export default function AdminLogsPage() {
  const router = useRouter();
  const [items, setItems] = useState<LogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
      try {
        const res = await fetch('/api/admin/logs', { headers: { Authorization: `Bearer ${token}` } });
        if (res.status === 403) {
          router.push('/login');
          return;
        }
        const data = await res.json();
        setItems(data.items ?? []);
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-6">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link href="/admin/content" className="text-orange hover:underline">
            ← К контенту
          </Link>
          <h1 className="text-3xl font-bold">🧾 Журнал действий</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-10 px-6">
        <p className="text-sm text-gray-400 mb-6 bg-[#1E1035] border border-[#2D2350] rounded-lg p-4">
          Журнал действий администратора — для подотчётности по ФЗ-152 «О персональных данных». Здесь фиксируются
          изменения контента и операции с данными пользователей. Показаны последние 200 записей.
        </p>

        {loading ? (
          <div className="text-center text-gray-400 py-12">Загрузка…</div>
        ) : items.length === 0 ? (
          <div className="text-center text-gray-400 py-12">Пока нет записей.</div>
        ) : (
          <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#1E1035]">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-400 font-semibold">Когда</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-semibold">Кто</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-semibold">Действие</th>
                  <th className="px-4 py-3 text-left text-gray-400 font-semibold">Что</th>
                </tr>
              </thead>
              <tbody>
                {items.map((log) => (
                  <tr key={log.id} className="border-t border-[#2D2350]">
                    <td className="px-4 py-3 text-gray-400 text-sm whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString('ru-RU')}
                    </td>
                    <td className="px-4 py-3 text-white text-sm">{log.adminEmail}</td>
                    <td className="px-4 py-3 text-sm">{ACTION_LABELS[log.action] ?? log.action}</td>
                    <td className="px-4 py-3 text-gray-300 text-sm">{log.detail ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
