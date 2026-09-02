'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ConfirmEmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage('');

    if (!email || !confirmationCode) {
      setError('Email и код подтверждения обязательны');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('/api/auth/confirm-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          confirmationCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Ошибка при подтверждении');
        return;
      }

      setMessage('✅ Email успешно подтвержден!');

      setTimeout(() => {
        router.push('/account');
      }, 2000);
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
          <h1 className="text-3xl font-bold">📧 Подтверждение email</h1>
          <p className="text-gray-400 text-sm mt-2">ФЗ-152: Согласие на обработку данных активируется после подтверждения</p>
        </div>

        <form onSubmit={handleConfirm} className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8">
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

          {/* Email */}
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

          {/* Confirmation Code */}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Код подтверждения</label>
            <input
              type="text"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value.toUpperCase())}
              className="w-full px-4 py-3 rounded-lg bg-[#1E1035] border border-[#2D2350] text-white focus:border-orange transition-colors"
              placeholder="XXXX-XXXX-XXXX"
              maxLength={16}
            />
            <p className="text-gray-400 text-xs mt-2">
              Код был отправлен на ваш email адрес
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange text-white font-bold py-3 rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {loading ? 'Подтверждение...' : 'Подтвердить email'}
          </button>
        </form>

        {/* Info Section */}
        <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 space-y-3">
          <p className="text-blue-400 text-xs">
            <span className="font-bold">🔒 Что происходит:</span>
          </p>
          <ul className="text-blue-400 text-xs space-y-2 ml-4">
            <li>✓ Вы согласились с обработкой данных</li>
            <li>✓ На email отправлен код подтверждения</li>
            <li>✓ После подтверждения согласие становится активным</li>
            <li>✓ Вы получаете полный доступ к сервису</li>
          </ul>
        </div>

        {/* Link */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Не получили письмо?{' '}
          <Link href="/resend-confirmation" className="text-orange hover:underline">
            Отправить заново
          </Link>
        </p>

        <p className="text-center text-gray-500 text-xs mt-4">
          Кстати, со{' '}
          <Link href="/podpiska" className="hover:underline">
            Знаторика PRO
          </Link>{' '}
          тренажёры и генераторы — без дневного лимита.
        </p>
      </div>
    </div>
  );
}
