'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    subscriptionPrice: 299,
    subscriptionPeriodDays: 30,
    generatorFreeDaily: 10,
    maintenanceMode: false,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // TODO: Save to API
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#0A0812] border-b border-[#2D2350] px-6 py-6">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-orange hover:underline">
            ← Назад в админку
          </Link>
          <h1 className="text-3xl font-bold">⚙️ Настройки</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="bg-[#16102A] border border-[#2D2350] rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-8">Параметры платформы</h2>

          <div className="space-y-6">
            {/* Subscription Price */}
            <div>
              <label className="block text-lg font-bold mb-2">
                Цена подписки (₽ в месяц)
              </label>
              <input
                type="number"
                value={settings.subscriptionPrice}
                onChange={(e) =>
                  setSettings({ ...settings, subscriptionPrice: parseInt(e.target.value) })
                }
                className="w-full px-4 py-3 rounded-lg bg-[#0A0812] border border-[#2D2350] text-white focus:border-orange transition-colors"
              />
              <p className="text-gray-400 text-sm mt-2">Текущая цена: {settings.subscriptionPrice} ₽</p>
            </div>

            {/* Subscription Period */}
            <div>
              <label className="block text-lg font-bold mb-2">
                Период подписки (дни)
              </label>
              <input
                type="number"
                value={settings.subscriptionPeriodDays}
                onChange={(e) =>
                  setSettings({ ...settings, subscriptionPeriodDays: parseInt(e.target.value) })
                }
                className="w-full px-4 py-3 rounded-lg bg-[#0A0812] border border-[#2D2350] text-white focus:border-orange transition-colors"
              />
            </div>

            {/* Generator Free Daily */}
            <div>
              <label className="block text-lg font-bold mb-2">
                Бесплатных генераций в день (без подписки)
              </label>
              <input
                type="number"
                value={settings.generatorFreeDaily}
                onChange={(e) =>
                  setSettings({ ...settings, generatorFreeDaily: parseInt(e.target.value) })
                }
                className="w-full px-4 py-3 rounded-lg bg-[#0A0812] border border-[#2D2350] text-white focus:border-orange transition-colors"
              />
            </div>

            {/* Maintenance Mode */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) =>
                    setSettings({ ...settings, maintenanceMode: e.target.checked })
                  }
                  className="w-5 h-5"
                />
                <span className="text-lg font-bold">Режим обслуживания</span>
              </label>
              <p className="text-gray-400 text-sm mt-2">
                Если включен, платформа будет недоступна для пользователей
              </p>
            </div>

            {/* Save Button */}
            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={handleSave}
                className="bg-orange text-white font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                💾 Сохранить
              </button>
              {saved && (
                <span className="text-green-400 font-bold">✅ Сохранено!</span>
              )}
            </div>
          </div>
        </div>

        {/* YuKassa Settings */}
        <div className="bg-[#16102A] border border-[#2D2350] rounded-lg p-8 mt-8">
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

          <div className="space-y-6">
            <div>
              <label className="block text-lg font-bold mb-2">Shop ID</label>
              <input
                type="password"
                placeholder="Введите Shop ID"
                className="w-full px-4 py-3 rounded-lg bg-[#0A0812] border border-[#2D2350] text-white placeholder-gray-600 focus:border-orange transition-colors"
              />
              <p className="text-gray-400 text-sm mt-2">
                Хранится в переменной окружения YOOKASSA_SHOP_ID
              </p>
            </div>

            <div>
              <label className="block text-lg font-bold mb-2">API Key</label>
              <input
                type="password"
                placeholder="Введите API Key"
                className="w-full px-4 py-3 rounded-lg bg-[#0A0812] border border-[#2D2350] text-white placeholder-gray-600 focus:border-orange transition-colors"
              />
              <p className="text-gray-400 text-sm mt-2">
                Хранится в переменной окружения YOOKASSA_API_KEY
              </p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-blue-400 text-sm">
                💡 Учетные данные должны быть установлены в переменных окружения на сервере, а не в админ-панели.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
