'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Payment {
  id: string;
  kassaId: string;
  email: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
}

export default function AdminPaymentsPage() {
  const router = useRouter();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const query = new URLSearchParams({ page: page.toString(), limit: '20' });
        if (statusFilter) query.append('status', statusFilter);

        const response = await fetch(`/api/admin/payments?${query}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch payments');
        }

        const data = await response.json();
        setPayments(data.payments);
        setTotalPages(data.pagination.pages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [page, statusFilter, router]);

  const statuses = [
    { value: '', label: 'Все' },
    { value: 'pending', label: 'Ожидание' },
    { value: 'succeeded', label: 'Успешно' },
    { value: 'canceled', label: 'Отменено' },
  ];

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-orange hover:underline">
            ← Назад в админку
          </Link>
          <h1 className="text-3xl font-bold">💳 История платежей</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-6">
        {/* Filters */}
        <div className="mb-6 flex gap-4">
          {statuses.map(status => (
            <button
              key={status.value}
              onClick={() => {
                setStatusFilter(status.value);
                setPage(1);
              }}
              className={`px-6 py-2 rounded font-semibold transition-colors ${
                statusFilter === status.value
                  ? 'bg-orange text-white'
                  : 'bg-[#2A1B4D] text-gray-400 hover:text-white border border-[#2D2350]'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>

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
                      <th className="px-6 py-4 text-left text-gray-400 font-semibold">Сумма</th>
                      <th className="px-6 py-4 text-left text-gray-400 font-semibold">ID Юкассы</th>
                      <th className="px-6 py-4 text-left text-gray-400 font-semibold">Статус</th>
                      <th className="px-6 py-4 text-left text-gray-400 font-semibold">Дата</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id} className="border-t border-[#2D2350] hover:bg-[#1E1035] transition-colors">
                        <td className="px-6 py-4 text-white">{payment.email}</td>
                        <td className="px-6 py-4 text-white">₽{payment.amount}</td>
                        <td className="px-6 py-4 text-gray-400 text-sm font-mono">{payment.kassaId.slice(0, 12)}...</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded text-sm font-semibold ${
                            payment.status === 'succeeded'
                              ? 'bg-green-500/20 text-green-400'
                              : payment.status === 'pending'
                                ? 'bg-orange/20 text-orange'
                                : 'bg-red-500/20 text-red-400'
                          }`}>
                            {payment.status === 'succeeded' ? '✅ Успешно' : payment.status === 'pending' ? '⏳ Ожидание' : '❌ Отменено'}
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
                  Платежей не найдено
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
