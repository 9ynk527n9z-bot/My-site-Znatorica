'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import PaymentMethods from '@/components/PaymentMethods';

export default function SubscriptionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionEndDate, setSubscriptionEndDate] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('bank_card');

  useEffect(() => {
    // Check if user is already subscribed
    const checkSubscription = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch('/api/payments/status', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.subscription?.isActive) {
            setIsSubscribed(true);
            setSubscriptionEndDate(data.subscription.endDate);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    checkSubscription();
  }, []);

  const handleSubscribe = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      setLoading(true);

      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          returnUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/podpiska`,
          paymentMethod: selectedPaymentMethod,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment');
      }

      const data = await response.json();

      // Redirect to YuKassa payment page
      if (data.confirmationUrl) {
        window.location.href = data.confirmationUrl;
      }
    } catch (error) {
      console.error(error);
      alert('Ошибка при создании платежа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Подписка Знаторика</h1>
        <p className="text-center text-gray-400 mb-12">
          Получи полный доступ ко всем материалам
        </p>

        {/* Pricing Card */}
        <div className="card border-orange mb-12 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-6xl font-bold text-orange">299 ₽</p>
            <p className="text-gray-400 text-lg">в месяц</p>
          </div>

          <ul className="space-y-4 mb-12">
            <li className="flex gap-3">
              <span className="text-orange text-xl">✅</span>
              <span>Все тренажёры без ограничений</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange text-xl">✅</span>
              <span>Генератор примеров, прописей, кроссвордов без лимита</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange text-xl">✅</span>
              <span>Рабочие листы и плакаты для печати</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange text-xl">✅</span>
              <span>Материалы для учителей (конспекты, задания)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange text-xl">✅</span>
              <span>Варианты ВПР с разбором решений</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange text-xl">✅</span>
              <span>Карточки для запоминания слов и правил</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange text-xl">✅</span>
              <span>Постоянное добавление новых тем</span>
            </li>
          </ul>

          {isSubscribed ? (
            <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 mb-4 text-center">
              <p className="text-green-400 font-bold mb-1">✅ Подписка активна</p>
              <p className="text-green-400 text-sm">
                До {new Date(subscriptionEndDate || '').toLocaleDateString('ru-RU')}
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8 pb-8 border-b border-[#2D2350]">
                <PaymentMethods
                  onSelect={setSelectedPaymentMethod}
                  loading={loading}
                />
              </div>

              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="btn-primary w-full text-lg mb-4 disabled:opacity-50"
              >
                {loading ? 'Обработка...' : 'Оформить подписку'}
              </button>

              <p className="text-center text-sm text-gray-500">
                Автопродление. Отмену можно оформить в личном кабинете в любой момент.
              </p>
            </>
          )}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Часто задаваемые вопросы</h2>

          <div className="space-y-4">
            <details className="card group">
              <summary className="cursor-pointer font-bold text-lg flex justify-between items-center">
                Что входит в подписку?
                <span className="group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <p className="mt-4 text-gray-400">
                Подписка дает доступ к тренажёрам, генераторам, рабочим листам, плакатам, материалам для учителей и вариантам ВПР. Полное объяснение всех компонентов.
              </p>
            </details>

            <details className="card group">
              <summary className="cursor-pointer font-bold text-lg flex justify-between items-center">
                Как оплатить подписку?
                <span className="group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <p className="mt-4 text-gray-400">
                Мы принимаем оплату через ЮKassa. Данные карты полностью защищены и не хранятся на наших серверах.
              </p>
            </details>

            <details className="card group">
              <summary className="cursor-pointer font-bold text-lg flex justify-between items-center">
                Можно ли отменить подписку?
                <span className="group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <p className="mt-4 text-gray-400">
                Да, отмену можно оформить в личном кабинете в любой момент. После отмены на подписку останется активной до конца периода.
              </p>
            </details>

            <details className="card group">
              <summary className="cursor-pointer font-bold text-lg flex justify-between items-center">
                Есть ли пробный период?
                <span className="group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <p className="mt-4 text-gray-400">
                Сейчас пробного периода нет, но вы можете попробовать бесплатный контент (теория, шпаргалки, генератор 10 раз в день).
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
