'use client';

import Link from 'next/link';
import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { reachGoal } from '@/components/YandexMetrika';

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // ✅ ФЗ-152: Проверить явное согласие
    if (!agreeToTerms) {
      setError('Вы должны согласиться с обработкой персональных данных');
      return;
    }

    if (!email || !password) {
      setError('Email и пароль обязательны');
      return;
    }

    if (password.length < 6) {
      setError('Пароль должен быть не менее 6 символов');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          agreeToTerms, // ✅ Отправляем согласие
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Ошибка регистрации');
        return;
      }

      // Сохранить токен
      localStorage.setItem('token', data.token);
      setSuccess(true);
      reachGoal('registration');

      // Если пришли с конкретной страницы (например, за именным дипломом турнира) —
      // вернуть туда, а не на подтверждение почты (токен уже рабочий сразу после
      // регистрации, подтверждение можно сделать позже). Разрешаем только
      // относительные пути на своём сайте — иначе это открытый редирект.
      const safeNext = next && next.startsWith('/') && !next.startsWith('//') ? next : null;
      setTimeout(() => {
        router.push(safeNext || '/confirm-email');
      }, 2000);
    } catch (err) {
      setError('Ошибка подключения к серверу');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="bg-[#2A1B4D] border border-green-500/30 rounded-lg p-8 max-w-md text-center">
          <p className="text-green-400 text-lg font-bold mb-4">✅ Регистрация успешна!</p>
          <p className="text-gray-400 mb-6">
            Проверьте ваш email для подтверждения учётной записи
          </p>
          <p className="text-gray-500 text-sm">
            Перенаправление на страницу подтверждения...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-6">
      <div className="max-w-sm w-full">
        <div className="text-center mb-5">
          <Link href="/" className="font-black text-2xl text-white hover:text-orange transition-colors">
            🐿️ Знаторика
          </Link>
        </div>

        <form onSubmit={handleRegister} className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-5">
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-4">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#1E1035] border border-[#2D2350] text-white focus:border-orange transition-colors"
              placeholder="you@mail.ru"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#1E1035] border border-[#2D2350] text-white focus:border-orange transition-colors"
              placeholder="Минимум 6 символов"
            />
          </div>

          {/* ✅ ФЗ-152: Явное согласие */}
          <div className="mb-5">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="w-4 h-4 mt-1 cursor-pointer"
              />
              <span className="text-sm text-gray-300">
                Я родитель/законный представитель, мне есть 18 лет. Соглашаюсь с{' '}
                <Link href="/privacy" target="_blank" className="text-orange underline font-semibold">обработкой данных</Link>
                {', '}
                <Link href="/terms" target="_blank" className="text-orange underline font-semibold">условиями</Link> и{' '}
                <Link href="/oferta" target="_blank" className="text-orange underline font-semibold">офертой</Link>
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !agreeToTerms}
            className="w-full bg-orange text-white font-bold py-2 rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>

          {/* Link to Login */}
          <p className="text-center text-gray-400 text-sm mt-4">
            Уже есть аккаунт?{' '}
            <Link href={next ? `/login?next=${encodeURIComponent(next)}` : '/login'} className="text-orange hover:underline">
              Войти
            </Link>
          </p>
        </form>

        <p className="mt-4 text-gray-300 text-sm text-center">
          🔒 После регистрации придёт письмо для подтверждения почты
        </p>
      </div>
    </div>
  );
}
