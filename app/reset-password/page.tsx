'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage('');

    if (!email || !code || !newPassword) {
      setError('Заполните все поля');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Ошибка при сбросе пароля');
        return;
      }

      localStorage.setItem('token', data.token);
      setMessage('✅ Пароль изменён! Переходим в личный кабинет...');

      setTimeout(() => {
        router.push('/account');
      }, 1500);
    } catch (err) {
      setError('Ошибка подключения к серверу');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">🔑 Новый пароль</h1>
          <p className="text-gray-400 text-sm mt-2">Введите код из письма и новый пароль</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8">
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {message && (
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6">
              <p className="text-green-400 text-sm">{message}</p>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Email адрес</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#1E1035] border border-[#2D2350] text-white focus:border-orange transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Код из письма</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="w-full px-4 py-3 rounded-lg bg-[#1E1035] border border-[#2D2350] text-white focus:border-orange transition-colors"
              placeholder="XXXX-XXXX"
              maxLength={9}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Новый пароль</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#1E1035] border border-[#2D2350] text-white focus:border-orange transition-colors"
              placeholder="Минимум 6 символов"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange text-white font-bold py-3 rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {loading ? 'Сохранение...' : 'Сохранить новый пароль'}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Не получили код?{' '}
          <Link href="/forgot-password" className="text-orange hover:underline">
            Запросить заново
          </Link>
        </p>
      </div>
    </div>
  );
}
