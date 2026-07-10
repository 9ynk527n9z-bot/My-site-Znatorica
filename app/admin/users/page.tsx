'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  role: string;
  createdAt: string;
  subscriptionStatus: string;
  subscriptionEndDate: string | null;
  totalSpent: number;
  lastPayment: string | null;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch(`/api/admin/users?page=${page}&limit=20`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data.users);
        setTotalPages(data.pagination.pages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, router]);

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-orange hover:underline">
            ← Назад в админку
          </Link>
          <h1 className="text-3xl font-bold">👥 Управление пользователями</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-6">
        {loading ? (
          <div className="text-center text-gray-400">Загрузка...</div>
        ) : (
          <>
            <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#1E1035]">
                    <tr>
                      <th className="px-6 py-4 text-left text-gray-400 font-semibold">Email</th>
                      <th className="px-6 py-4 text-left text-gray-400 font-semibold">Роль</th>
                      <th className="px-6 py-4 text-left text-gray-400 font-semibold">Подписка</th>
                      <th className="px-6 py-4 text-left text-gray-400 font-semibold">Потрачено</th>
                      <th className="px-6 py-4 text-left text-gray-400 font-semibold">Дата регистрации</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-t border-[#2D2350] hover:bg-[#1E1035] transition-colors">
                        <td className="px-6 py-4 text-white">{user.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded text-sm font-semibold ${
                            user.role === 'admin' ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {user.role === 'admin' ? 'Админ' : 'Пользователь'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded text-sm font-semibold ${
                            user.subscriptionStatus === 'active'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {user.subscriptionStatus === 'active' ? '✅ Активна' : '❌ Нет'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white">₽{user.totalSpent}</td>
                        <td className="px-6 py-4 text-gray-400 text-sm">
                          {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {users.length === 0 && (
                <div className="px-6 py-12 text-center text-gray-400">
                  Пользователей не найдено
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-orange text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Предыдущая
              </button>
              <span className="text-gray-400">
                Страница {page} из {totalPages}
              </span>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-orange text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Следующая →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
