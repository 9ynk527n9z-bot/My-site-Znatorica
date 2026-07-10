'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Stats {
  totalUsers: number;
  subscribers: number;
  totalRevenue: number;
  pageViews: number;
  generatorUses: number;
}

interface RecentPayment {
  id: string;
  email: string;
  amount: number;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [payments, setPayments] = useState<RecentPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch('/api/admin/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 403) {
          setError('У вас нет доступа к админ-панели');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }

        const data = await response.json();
        setStats(data.stats);
        setPayments(data.recentPayments);
      } catch (err) {
        setError('Ошибка при загрузке статистики');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [router]);

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      {/* Header */}
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <Link href="/" className="font-black text-2xl text-orange hover:opacity-80">
              🐿️ Знаторика
            </Link>
            <p className="text-gray-400 text-sm mt-1">Админ-панель</p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              router.push('/');
            }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Выход
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-6">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Всего пользователей</p>
            <p className="text-4xl font-bold text-white">{stats?.totalUsers || 0}</p>
          </div>

          <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Активных подписок</p>
            <p className="text-4xl font-bold text-orange">{stats?.subscribers || 0}</p>
          </div>

          <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Общий доход</p>
            <p className="text-4xl font-bold text-violet">₽{(stats?.totalRevenue || 0).toLocaleString('ru-RU')}</p>
          </div>

          <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Просмотров страниц</p>
            <p className="text-4xl font-bold text-white">{stats?.pageViews || 0}</p>
          </div>

          <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Использований генератора</p>
            <p className="text-4xl font-bold text-white">{stats?.generatorUses || 0}</p>
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg overflow-hidden">
          <div className="px-6 py-6 border-b border-[#2D2350]">
            <h2 className="text-2xl font-bold">Последние платежи</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1E1035]">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold">Email</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold">Сумма</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold">Статус</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold">Дата</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-t border-[#2D2350] hover:bg-[#1E1035] transition-colors">
                    <td className="px-6 py-4 text-white">{payment.email}</td>
                    <td className="px-6 py-4 text-white">₽{payment.amount}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded text-sm font-semibold ${
                          payment.status === 'succeeded'
                            ? 'bg-green-500/20 text-green-400'
                            : payment.status === 'pending'
                              ? 'bg-orange/20 text-orange'
                              : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {payment.status === 'succeeded' ? 'Успешно' : payment.status === 'pending' ? 'Ожидание' : 'Отклонено'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {new Date(payment.createdAt).toLocaleDateString('ru-RU')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {payments.length === 0 && (
            <div className="px-6 py-12 text-center text-gray-400">
              Платежей пока нет
            </div>
          )}
        </div>

        {/* Admin Actions */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Link
            href="/admin/users"
            className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6 hover:border-orange transition-colors"
          >
            <h3 className="text-xl font-bold mb-2">👥 Управление пользователями</h3>
            <p className="text-gray-400">Просмотр и управление аккаунтами</p>
          </Link>

          <Link
            href="/admin/payments"
            className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6 hover:border-orange transition-colors"
          >
            <h3 className="text-xl font-bold mb-2">💳 Платежи</h3>
            <p className="text-gray-400">История платежей и подписок</p>
          </Link>

          <Link
            href="/admin/content"
            className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6 hover:border-orange transition-colors"
          >
            <h3 className="text-xl font-bold mb-2">📚 Управление контентом</h3>
            <p className="text-gray-400">Добавление и редактирование тем</p>
          </Link>

          <Link
            href="/admin/analytics"
            className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6 hover:border-orange transition-colors"
          >
            <h3 className="text-xl font-bold mb-2">📊 Аналитика</h3>
            <p className="text-gray-400">Трафик, популярные разделы, конверсия — без Google</p>
          </Link>

          <Link
            href="/admin/logs"
            className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6 hover:border-orange transition-colors"
          >
            <h3 className="text-xl font-bold mb-2">🧾 Журнал действий</h3>
            <p className="text-gray-400">Кто и что менял — для отчётности по ФЗ-152</p>
          </Link>

          <Link
            href="/admin/settings"
            className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6 hover:border-orange transition-colors"
          >
            <h3 className="text-xl font-bold mb-2">⚙️ Настройки</h3>
            <p className="text-gray-400">Конфигурация платформы</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
