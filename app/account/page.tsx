'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Profile {
  user: {
    id: string;
    email: string;
    role: string;
    emailConfirmed: boolean;
    createdAt: string;
  };
  subscription: {
    status: string;
    endDate: string;
    autoRenew: boolean;
    isActive: boolean;
  } | null;
  payments: {
    id: string;
    amount: number;
    status: string;
    createdAt: string;
  }[];
  generatorUsesCount: number;
}

export default function AccountPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelMessage, setCancelMessage] = useState<string | null>(null);

  const loadProfile = async (token: string) => {
    const response = await fetch('/api/user/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 401) {
      localStorage.removeItem('token');
      router.push('/login');
      return;
    }

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    const data = await response.json();
    setProfile(data);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    loadProfile(token)
      .catch((err) => {
        console.error(err);
        setError('Не удалось загрузить данные аккаунта');
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleCancelSubscription = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    if (!confirm('Отключить автопродление подписки? Доступ сохранится до конца оплаченного периода.')) {
      return;
    }

    try {
      setCancelLoading(true);
      setCancelMessage(null);

      const response = await fetch('/api/subscription/cancel', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (!response.ok) {
        setCancelMessage(data.error || 'Ошибка при отмене подписки');
        return;
      }

      setCancelMessage(data.message);
      await loadProfile(token);
    } catch (err) {
      console.error(err);
      setCancelMessage('Ошибка подключения к серверу');
    } finally {
      setCancelLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{error || 'Что-то пошло не так'}</div>
      </div>
    );
  }

  const { user, subscription, payments, generatorUsesCount } = profile;

  return (
    <div className="bg-black min-h-screen">
      {/* Header */}
      <div className="bg-[#0A0812] border-b border-[#2D2350] px-6 py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">👤 Личный кабинет</h1>
            <p className="text-gray-400 text-sm mt-1">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Выйти
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6 space-y-8">
        {/* Email confirmation warning */}
        {!user.emailConfirmed && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-center justify-between gap-4">
            <p className="text-yellow-400 text-sm">
              ⚠️ Email не подтверждён. Подтвердите его, чтобы активировать согласие на обработку данных.
            </p>
            <Link
              href="/confirm-email"
              className="text-yellow-400 font-bold text-sm whitespace-nowrap hover:underline"
            >
              Подтвердить →
            </Link>
          </div>
        )}

        {/* Subscription Card */}
        <div className="bg-[#16102A] border border-[#2D2350] rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">💳 Подписка</h2>

          {subscription?.isActive ? (
            <div className="space-y-4">
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-400 font-bold mb-1">✅ Подписка активна</p>
                <p className="text-green-400 text-sm">
                  Действует до {new Date(subscription.endDate).toLocaleDateString('ru-RU')}
                </p>
                <p className="text-green-400 text-sm mt-1">
                  {subscription.autoRenew
                    ? 'Автопродление включено'
                    : 'Автопродление отключено — после окончания периода подписка не продлится'}
                </p>
              </div>

              {subscription.autoRenew && (
                <button
                  onClick={handleCancelSubscription}
                  disabled={cancelLoading}
                  className="text-red-400 hover:text-red-300 text-sm font-bold disabled:opacity-50"
                >
                  {cancelLoading ? 'Отмена...' : 'Отменить автопродление'}
                </button>
              )}

              {cancelMessage && (
                <p className="text-gray-400 text-sm">{cancelMessage}</p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-400">У вас нет активной подписки.</p>
              <Link href="/podpiska" className="btn-primary inline-block">
                Оформить подписку — 299 ₽/мес
              </Link>
            </div>
          )}
        </div>

        {/* Usage Stats */}
        <div className="bg-[#16102A] border border-[#2D2350] rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">📊 Активность</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-gray-400 text-sm mb-1">Использований генератора</p>
              <p className="text-3xl font-bold text-orange">{generatorUsesCount}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Аккаунт создан</p>
              <p className="text-lg font-bold">
                {new Date(user.createdAt).toLocaleDateString('ru-RU')}
              </p>
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-[#16102A] border border-[#2D2350] rounded-lg overflow-hidden">
          <div className="px-8 py-6 border-b border-[#2D2350]">
            <h2 className="text-2xl font-bold">🧾 История платежей</h2>
          </div>

          {payments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0A0812]">
                  <tr>
                    <th className="px-8 py-3 text-left text-gray-400 font-semibold text-sm">Сумма</th>
                    <th className="px-8 py-3 text-left text-gray-400 font-semibold text-sm">Статус</th>
                    <th className="px-8 py-3 text-left text-gray-400 font-semibold text-sm">Дата</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-t border-[#2D2350]">
                      <td className="px-8 py-4 text-white">₽{payment.amount}</td>
                      <td className="px-8 py-4">
                        <span
                          className={`px-3 py-1 rounded text-xs font-semibold ${
                            payment.status === 'succeeded'
                              ? 'bg-green-500/20 text-green-400'
                              : payment.status === 'pending'
                                ? 'bg-orange/20 text-orange'
                                : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {payment.status === 'succeeded'
                            ? 'Успешно'
                            : payment.status === 'pending'
                              ? 'Ожидание'
                              : 'Отклонено'}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-gray-400 text-sm">
                        {new Date(payment.createdAt).toLocaleDateString('ru-RU')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-8 py-12 text-center text-gray-400">Платежей пока нет</div>
          )}
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/account/data"
            className="bg-[#16102A] border border-[#2D2350] rounded-lg p-6 hover:border-orange transition-colors"
          >
            <h3 className="text-xl font-bold mb-2">🔐 Персональные данные</h3>
            <p className="text-gray-400 text-sm">Экспорт или удаление данных (ФЗ-152)</p>
          </Link>

          {user.role === 'admin' && (
            <Link
              href="/admin/dashboard"
              className="bg-[#16102A] border border-[#2D2350] rounded-lg p-6 hover:border-orange transition-colors"
            >
              <h3 className="text-xl font-bold mb-2">⚙️ Админ-панель</h3>
              <p className="text-gray-400 text-sm">Управление платформой</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
