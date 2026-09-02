'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    subscribers: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/admin/analytics', { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) {
          const data = await res.json();
          setStats({
            totalUsers: data.totals.totalUsers,
            subscribers: data.totals.subscribers,
            revenue: data.totals.revenue30,
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  return (
    <div className="bg-black min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold">Администраторская панель</h1>
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors"
          >
            На главную
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card">
            <p className="text-gray-400 mb-2 text-sm">Всего пользователей</p>
            <p className="text-4xl font-bold">
              {loading ? '-' : stats.totalUsers}
            </p>
          </div>

          <div className="card">
            <p className="text-gray-400 mb-2 text-sm">Подписчиков</p>
            <p className="text-4xl font-bold">
              {loading ? '-' : stats.subscribers}
            </p>
          </div>

          <div className="card">
            <p className="text-gray-400 mb-2 text-sm">Доход за 30 дней</p>
            <p className="text-4xl font-bold">
              {loading ? '-' : `₽${stats.revenue}`}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            href="/admin/payments"
            className="card hover:border-orange transition-colors group"
          >
            <h3 className="font-bold text-lg mb-2 group-hover:text-orange">
              Платежи
            </h3>
            <p className="text-gray-400 text-sm">
              Просмотр всех платежей и статусов
            </p>
          </Link>

          <Link
            href="/admin/users"
            className="card hover:border-orange transition-colors group"
          >
            <h3 className="font-bold text-lg mb-2 group-hover:text-orange">
              Пользователи
            </h3>
            <p className="text-gray-400 text-sm">
              Управление доступом пользователей
            </p>
          </Link>

          <Link
            href="/admin/settings"
            className="card hover:border-orange transition-colors group"
          >
            <h3 className="font-bold text-lg mb-2 group-hover:text-orange">
              Настройки
            </h3>
            <p className="text-gray-400 text-sm">
              Изменить цену подписки и параметры
            </p>
          </Link>
        </div>

        {/* Quick Info */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">⚠️ MVP Status</h2>
          <p className="text-gray-400">
            Админ-панель находится на ранней стадии разработки. Полный функционал:
          </p>
          <ul className="mt-4 space-y-2 text-gray-400 text-sm">
            <li>✅ Просмотр статистики</li>
            <li>✅ Управление платежами</li>
            <li>✅ Управление пользователями</li>
            <li>⏳ Изменение цены подписки (в разработке)</li>
            <li>⏳ Поиск пользователей (в разработке)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
