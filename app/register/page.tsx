'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
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

      // Перенаправить на страницу подтверждения email
      setTimeout(() => {
        router.push('/confirm-email');
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
        <div className="bg-[#16102A] border border-green-500/30 rounded-lg p-8 max-w-md text-center">
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
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="font-black text-3xl text-white hover:text-orange transition-colors">
            🐿️ Знаторика
          </Link>
          <h1 className="text-2xl font-bold mt-4">Регистрация</h1>
          <p className="text-gray-400 text-sm mt-2">Создайте новый аккаунт</p>
        </div>

        <form onSubmit={handleRegister} className="bg-[#16102A] border border-[#2D2350] rounded-lg p-8">
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#0A0812] border border-[#2D2350] text-white focus:border-orange transition-colors"
              placeholder="your@email.com"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#0A0812] border border-[#2D2350] text-white focus:border-orange transition-colors"
              placeholder="Минимум 6 символов"
            />
          </div>

          {/* ✅ ФЗ-152: Явное согласие */}
          <div className="mb-8">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="w-5 h-5 mt-1 cursor-pointer"
              />
              <span className="text-sm text-gray-300">
                Я согласен(на) с обработкой моих персональных данных в соответствии с{' '}
                <Link href="/privacy" className="text-orange hover:underline">
                  Политикой конфиденциальности
                </Link>{' '}
                и Федеральным законом №152-ФЗ
              </span>
            </label>

            {!agreeToTerms && (
              <p className="text-red-400 text-xs mt-2">
                ⚠️ Согласие обязательно для регистрации
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !agreeToTerms}
            className="w-full bg-orange text-white font-bold py-3 rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>

          {/* Link to Login */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Уже есть аккаунт?{' '}
            <Link href="/login" className="text-orange hover:underline">
              Войти
            </Link>
          </p>
        </form>

        {/* Legal Notice */}
        <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <p className="text-blue-400 text-xs">
            🔒 <span className="font-bold">Защита данных:</span> Ваши данные защищены согласно ФЗ-152 и ГОСТ Р 56860. После регистрации вам будет отправлено письмо для подтверждения email адреса.
          </p>
        </div>
      </div>
    </div>
  );
}
