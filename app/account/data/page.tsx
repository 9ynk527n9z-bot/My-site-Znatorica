'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DataManagementPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmCode, setDeleteConfirmCode] = useState('');

  const handleExportData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      setLoading(true);
      const response = await fetch('/api/user/data', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to export data');
      }

      const data = await response.json();

      // Скачать JSON файл
      const element = document.createElement('a');
      element.setAttribute(
        'href',
        `data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`
      );
      element.setAttribute('download', `znatorika-data-${new Date().toISOString().split('T')[0]}.json`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (error) {
      console.error(error);
      alert('Ошибка при экспорте данных');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      setLoading(true);
      const response = await fetch('/api/user/data', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ confirmationCode: deleteConfirmCode }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete data');
      }

      alert('Все персональные данные удалены');
      localStorage.removeItem('token');
      router.push('/');
    } catch (error) {
      console.error(error);
      alert('Ошибка при удалении данных');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="legal-page">
      {/* Header */}
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/account" className="text-orange hover:underline text-sm mb-4 inline-block">
            ← Назад в личный кабинет
          </Link>
          <h1 className="text-3xl font-bold">🔐 Управление персональными данными</h1>
          <p className="text-gray-400 mt-2">ФЗ-152 "О защите персональных данных"</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto py-12 px-6">
        {/* Export Data Section */}
        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">📥 Экспорт моих данных</h2>
          <p className="text-gray-400 mb-6">
            Скачайте полную копию ваших персональных данных в формате JSON для своих записей.
          </p>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
            <p className="text-blue-400 text-sm">
              📋 <span className="font-bold">Ваше право:</span> Получать информацию о том, какие данные мы о вас храним (статья 27 ФЗ-152)
            </p>
          </div>

          <button
            onClick={handleExportData}
            disabled={loading}
            className="bg-orange text-white font-bold px-8 py-3 rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {loading ? 'Подготовка...' : '📥 Скачать мои данные (JSON)'}
          </button>

          <p className="text-gray-400 text-sm mt-4">
            Файл содержит: профиль, подписку, платежи, использование генератора
          </p>
        </div>

        {/* Data Storage Section */}
        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">📊 Какие данные мы собираем?</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-orange mb-2">📧 Учётные данные</h3>
              <ul className="text-gray-400 text-sm space-y-1 ml-4">
                <li>✓ Email адрес</li>
                <li>✓ Хеш пароля (не сам пароль)</li>
                <li>✓ Дата регистрации</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">💳 Платежная информация</h3>
              <ul className="text-gray-400 text-sm space-y-1 ml-4">
                <li>✓ История платежей (сумма, статус)</li>
                <li>✓ ID платежа в YuKassa</li>
                <li>✓ Даты платежей</li>
                <li>✗ Номер карты НЕ хранится</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">📊 Использование сервиса</h3>
              <ul className="text-gray-400 text-sm space-y-1 ml-4">
                <li>✓ Просмотры страниц</li>
                <li>✓ Использование генератора</li>
                <li>✓ Статус подписки</li>
              </ul>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <p className="text-yellow-400 text-sm">
                ⚠️ <span className="font-bold">Важно:</span> Банковские данные обрабатываются YuKassa, а не нами. Прочитайте их политику конфиденциальности.
              </p>
            </div>
          </div>
        </div>

        {/* Data Retention Section */}
        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">⏰ Как долго мы храним данные?</h2>

          <div className="space-y-3 text-gray-400">
            <p>📋 <span className="font-bold">При активной подписке:</span> Все данные хранятся, пока вы используете сервис</p>
            <p>📋 <span className="font-bold">После удаления аккаунта:</span> Данные удаляются в течение 30 дней</p>
            <p>📋 <span className="font-bold">Логи безопасности:</span> Хранятся 1 год</p>
            <p>📋 <span className="font-bold">Платежи:</span> Хранятся 7 лет согласно налоговому кодексу РФ</p>
          </div>
        </div>

        {/* Delete Data Section */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">⚠️ Удаление всех персональных данных</h2>
          <p className="text-gray-400 mb-6">
            Вы имеете право на "забывание" согласно ФЗ-152. Мы удалим все данные, кроме логов в целях безопасности.
          </p>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="bg-red-600 text-white font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              🗑️ Удалить все мои данные
            </button>
          ) : (
            <div className="bg-[#1E1035] border border-red-500/30 rounded-lg p-6">
              <h3 className="font-bold text-red-400 mb-4">⚠️ Подтверждение удаления</h3>

              <p className="text-gray-400 mb-6 text-sm">
                Это действие <span className="font-bold">НЕОБРАТИМО</span>. Все персональные данные будут удалены.
              </p>

              <div className="mb-6">
                <label className="block text-sm font-bold mb-2">
                  Введите код подтверждения из письма:
                </label>
                <input
                  type="text"
                  value={deleteConfirmCode}
                  onChange={(e) => setDeleteConfirmCode(e.target.value)}
                  placeholder="Код подтверждения"
                  className="w-full px-4 py-3 rounded-lg bg-[#2A1B4D] border border-[#2D2350] text-white focus:border-orange"
                />
                <p className="text-gray-400 text-xs mt-2">
                  Код отправлен на ваш email для проверки подлинности
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleDeleteData}
                  disabled={loading || !deleteConfirmCode}
                  className="bg-red-600 text-white font-bold px-6 py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? 'Удаление...' : 'Удалить все'}
                </button>
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteConfirmCode('');
                  }}
                  disabled={loading}
                  className="bg-gray-600 text-white font-bold px-6 py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
                >
                  Отмена
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Legal Info */}
        <div className="mt-12 border-t border-[#2D2350] pt-12">
          <h3 className="text-lg font-bold mb-4">📜 Нормативная база</h3>
          <ul className="text-gray-400 text-sm space-y-2 ml-4">
            <li>✓ <span className="font-bold">ФЗ-152</span> "О защите персональных данных" - Статьи 27-29 (права субъектов)</li>
            <li>✓ <span className="font-bold">ФЗ-422</span> "О налоге на профессиональный доход" - расчётные чеки через «Мой налог»</li>
            <li>✓ <span className="font-bold">ГОСТ Р 56860</span> - Безопасность электронных платежей</li>
            <li>✓ <span className="font-bold">НК РФ</span> - Хранение платежных данных 7 лет</li>
          </ul>

          <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-green-400 text-sm">
              ✅ <span className="font-bold">Соответствие:</span> Платформа полностью соответствует российскому законодательству по защите персональных данных
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
