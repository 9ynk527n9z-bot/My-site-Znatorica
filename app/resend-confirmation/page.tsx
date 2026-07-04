'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ResendConfirmationPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!email) return;

    try {
      setLoading(true);

      const response = await fetch('/api/auth/resend-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message || 'Готово');
    } catch (err) {
      console.error(err);
      setMessage('Ошибка подключения к серверу');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">📧 Отправить код повторно</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#16102A] border border-[#2D2350] rounded-lg p-8">
          {message && (
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-6">
              <p className="text-blue-400 text-sm">{message}</p>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Email адрес</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#0A0812] border border-[#2D2350] text-white focus:border-orange transition-colors"
              placeholder="your@email.com"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange text-white font-bold py-3 rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {loading ? 'Отправка...' : 'Отправить код'}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          <Link href="/confirm-email" className="text-orange hover:underline">
            ← Вернуться к подтверждению
          </Link>
        </p>
      </div>
    </div>
  );
}
