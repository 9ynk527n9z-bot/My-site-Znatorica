'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminSettingsPage() {
  const router = useRouter();
  const [monthlyPrice, setMonthlyPrice] = useState(399);
  const [yearlyPrice, setYearlyPrice] = useState(2390);
  const [lifetimePrice, setLifetimePrice] = useState(2990);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accessDenied, setAccessDenied] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch('/api/admin/settings', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 403) {
          setAccessDenied(true);
          return;
        }
        if (!response.ok) {
          throw new Error('Failed to load settings');
        }

        const data = await response.json();
        setMonthlyPrice(data.monthlyPrice);
        setYearlyPrice(data.yearlyPrice);
        setLifetimePrice(data.lifetimePrice);
      } catch (err) {
        console.error(err);
        setError('Ошибка при загрузке настроек');
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [router]);

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      const token = localStorage.getItem('token');

      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ monthlyPrice, yearlyPrice, lifetimePrice }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Ошибка при сохранении');
        return;
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
      setError('Ошибка подключения к серверу');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-gray-400">
        Загрузка...
      </div>
    );
  }

  if (accessDenied) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-red-400">
        У вас нет доступа к админ-панели
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-6">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-orange hover:underline">
            ← Назад в админку
          </Link>
          <h1 className="text-3xl font-bold">⚙️ Настройки</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        {/* Pricing — реально сохраняется в базу и сразу используется при оплате */}
        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-2">💰 Цены</h2>
          <p className="text-gray-400 text-sm mb-8">
            Меняется сразу и для страницы «Подписка», и для создания платежей в ЮKassa.
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-lg font-bold mb-2">
                Подписка «Помесячно» (₽ в месяц)
              </label>
              <input
                type="number"
                min={1}
                value={monthlyPrice}
                onChange={(e) => setMonthlyPrice(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg bg-[#1E1035] border border-[#2D2350] text-white focus:border-orange transition-colors"
              />
            </div>

            <div>
              <label className="block text-lg font-bold mb-2">
                Подписка «На год» (₽ за год)
              </label>
              <input
                type="number"
                min={1}
                value={yearlyPrice}
                onChange={(e) => setYearlyPrice(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg bg-[#1E1035] border border-[#2D2350] text-white focus:border-orange transition-colors"
              />
            </div>

            <div>
              <label className="block text-lg font-bold mb-2">
                Разовый доступ «Навсегда» (₽)
              </label>
              <input
                type="number"
                min={1}
                value={lifetimePrice}
                onChange={(e) => setLifetimePrice(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg bg-[#1E1035] border border-[#2D2350] text-white focus:border-orange transition-colors"
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-orange text-white font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {saving ? 'Сохранение...' : '💾 Сохранить цены'}
              </button>
              {saved && <span className="text-green-400 font-bold">✅ Сохранено!</span>}
              {error && <span className="text-red-400 text-sm">{error}</span>}
            </div>
          </div>
        </div>

        {/* Остальные параметры — пока не подключены к реальной логике сайта */}
        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mt-8 opacity-60">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold">🚧 Остальные параметры</h2>
            <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">не подключено</span>
          </div>
          <p className="text-gray-400 text-sm mb-6">
            Эти поля пока ничего не сохраняют — сайт не проверяет их значения нигде в коде.
            Показаны как план на будущее, а не рабочая функция.
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-lg font-bold mb-2">Период подписки (дни)</label>
              <input
                type="number"
                defaultValue={30}
                disabled
                className="w-full px-4 py-3 rounded-lg bg-[#1E1035] border border-[#2D2350] text-gray-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-lg font-bold mb-2">
                Бесплатных генераций в день (без подписки)
              </label>
              <input
                type="number"
                defaultValue={10}
                disabled
                className="w-full px-4 py-3 rounded-lg bg-[#1E1035] border border-[#2D2350] text-gray-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="flex items-center gap-3">
                <input type="checkbox" disabled className="w-5 h-5" />
                <span className="text-lg font-bold text-gray-500">Режим обслуживания</span>
              </label>
            </div>
          </div>
        </div>

        {/* YuKassa Settings */}
        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mt-8">
          <h2 className="text-2xl font-bold mb-8">💳 Интеграция ЮKassa</h2>
          <p className="text-gray-400 mb-6">
            Для настройки платежей необходимо получить учетные данные на{' '}
            <a
              href="https://yookassa.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange hover:underline"
            >
              yookassa.ru
            </a>
          </p>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-blue-400 text-sm">
              💡 Shop ID и API Key задаются в переменных окружения на сервере
              (<code>YOOKASSA_SHOP_ID</code>, <code>YOOKASSA_API_KEY</code>), а не здесь —
              это стандартная практика безопасности для платёжных ключей.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
