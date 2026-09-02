'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import PaymentMethods from '@/components/PaymentMethods';

type Plan = 'monthly' | 'yearly' | 'lifetime';

export default function SubscriptionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState<Plan>('monthly');
  const [subscriptionEndDate, setSubscriptionEndDate] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('bank_card');
  const [selectedPlan, setSelectedPlan] = useState<Plan>('monthly');
  const [pricing, setPricing] = useState({ monthlyPrice: 399, yearlyPrice: 2390, lifetimePrice: 2990 });

  useEffect(() => {
    fetch('/api/pricing')
      .then((res) => res.json())
      .then((data) => setPricing(data))
      .catch((err) => console.error(err));
  }, []);

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
            setSubscriptionPlan(
              data.subscription.plan === 'lifetime'
                ? 'lifetime'
                : data.subscription.plan === 'yearly'
                  ? 'yearly'
                  : 'monthly',
            );
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
          plan: selectedPlan,
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

  // Выгода годового тарифа и цена «в день» — считаем от реальных цен (их можно
  // менять в админке), чтобы цифры на странице никогда не разъезжались с оплатой.
  const yearlyPerMonth = Math.round(pricing.yearlyPrice / 12);
  const yearlySavingsPercent = Math.max(
    0,
    Math.round((1 - pricing.yearlyPrice / (pricing.monthlyPrice * 12)) * 100),
  );
  const yearlyPerDay = Math.max(1, Math.round(pricing.yearlyPrice / 365));
  const monthlyPerDay = Math.max(1, Math.round(pricing.monthlyPrice / 30));

  return (
    <div className="min-h-screen bg-black py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Знаторика PRO</h1>

        {/* Pricing Card */}
        <div className="card border-orange mb-12 max-w-2xl mx-auto">
          {!isSubscribed && (
            <div className="flex gap-2 sm:gap-3 mb-8 justify-center flex-wrap">
              <button
                onClick={() => setSelectedPlan('monthly')}
                className={`px-5 py-3 rounded-lg font-bold transition-colors ${
                  selectedPlan === 'monthly'
                    ? 'bg-orange text-white'
                    : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                }`}
              >
                Помесячно
              </button>
              <button
                onClick={() => setSelectedPlan('yearly')}
                className={`relative px-5 py-3 rounded-lg font-bold transition-colors ${
                  selectedPlan === 'yearly'
                    ? 'bg-orange text-white'
                    : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                }`}
              >
                На год
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                  −{yearlySavingsPercent}%
                </span>
              </button>
              <button
                onClick={() => setSelectedPlan('lifetime')}
                className={`px-5 py-3 rounded-lg font-bold transition-colors ${
                  selectedPlan === 'lifetime'
                    ? 'bg-orange text-white'
                    : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                }`}
              >
                Навсегда
              </button>
            </div>
          )}

          <div className="text-center mb-8">
            {isSubscribed ? (
              <>
                <p className="text-6xl font-bold text-orange">
                  {subscriptionPlan === 'lifetime'
                    ? '∞'
                    : subscriptionPlan === 'yearly'
                      ? `${pricing.yearlyPrice} ₽`
                      : `${pricing.monthlyPrice} ₽`}
                </p>
                <p className="text-gray-400 text-lg">
                  {subscriptionPlan === 'lifetime'
                    ? 'пожизненный доступ'
                    : subscriptionPlan === 'yearly'
                      ? 'в год'
                      : 'в месяц'}
                </p>
              </>
            ) : selectedPlan === 'lifetime' ? (
              <>
                <p className="text-6xl font-bold text-orange">{pricing.lifetimePrice} ₽</p>
                <p className="text-gray-400 text-lg">один раз, доступ навсегда</p>
              </>
            ) : selectedPlan === 'yearly' ? (
              <>
                <p className="text-6xl font-bold text-orange">{pricing.yearlyPrice} ₽</p>
                <p className="text-gray-400 text-lg">
                  в год — это {yearlyPerMonth} ₽ в месяц, всего {yearlyPerDay} ₽ в день
                </p>
                <p className="text-green-400 text-sm font-bold mt-2">
                  Выгоднее помесячной на {yearlySavingsPercent}% — экономия{' '}
                  {pricing.monthlyPrice * 12 - pricing.yearlyPrice} ₽ за год
                </p>
              </>
            ) : (
              <>
                <p className="text-6xl font-bold text-orange">{pricing.monthlyPrice} ₽</p>
                <p className="text-gray-400 text-lg">в месяц — это {monthlyPerDay} ₽ в день</p>
              </>
            )}
          </div>

          <ul className="space-y-4 mb-12">
            <li className="flex gap-3">
              <span className="text-orange text-xl">✅</span>
              <span>
                Тренажёры, игры и варианты ВПР без дневного лимита — вместо 20 в день занимайтесь сколько угодно
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange text-xl">✅</span>
              <span>Генераторы заданий без дневного лимита — примеры, прописи, кроссворды, диктанты и другие</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange text-xl">✅</span>
              <span>Все плакаты — печать без ограничений</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange text-xl">✅</span>
              <span>Печать без водяного знака</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange text-xl">✅</span>
              <span>Именные PDF-дипломы Турнира Знаторики — без доплаты за каждый (обычно 99 ₽)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-orange text-xl">✅</span>
              <span>
                Отчёт об успехах ребёнка в личном кабинете — что уже освоено, сколько занимался, график
                динамики по дням
              </span>
            </li>
          </ul>

          {isSubscribed ? (
            <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 mb-4 text-center">
              <p className="text-green-400 font-bold mb-1">
                {subscriptionPlan === 'lifetime' ? '✅ Пожизненный доступ активен' : '✅ Подписка активна'}
              </p>
              {subscriptionPlan !== 'lifetime' && (
                <p className="text-green-400 text-sm">
                  До {new Date(subscriptionEndDate || '').toLocaleDateString('ru-RU')}
                </p>
              )}
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
                {loading
                  ? 'Обработка...'
                  : selectedPlan === 'lifetime'
                    ? 'Купить навсегда'
                    : selectedPlan === 'yearly'
                      ? 'Оформить на год'
                      : 'Оформить подписку'}
              </button>

              <p className="text-center text-sm text-gray-500">
                {selectedPlan === 'lifetime'
                  ? 'Разовый платёж. Доступ не заканчивается и не требует продления.'
                  : selectedPlan === 'yearly'
                    ? 'Оплата сразу за год. Автопродление через год — предупредим письмом за 7 дней, отменить можно в личном кабинете в любой момент.'
                    : 'Автопродление. Отмену можно оформить в личном кабинете в любой момент.'}
              </p>
              <p className="text-center text-xs text-gray-600 mt-2">
                Нажимая кнопку оплаты, вы принимаете условия{' '}
                <Link href="/oferta" className="text-orange hover:underline">
                  Публичной оферты
                </Link>
                , включая порядок возврата денежных средств.
              </p>
            </>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mb-12">
          Нужен только один конкретный набор заданий, без подписки?{' '}
          <Link href="/sborniki" className="text-orange hover:underline font-bold">
            Посмотреть PDF-сборники
          </Link>
        </p>

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
                Статьи и теория открыты всем без регистрации. Тренажёры, игры и варианты ВПР — 3 в день без регистрации и 20 в день после неё (лимит общий на всё вместе). Знаторика PRO добавляет: тренажёры, игры и ВПР без дневного лимита, генераторы без дневного лимита, все плакаты, печать без водяного знака и отчёт об успехах ребёнка в личном кабинете.
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
                Сейчас пробного периода нет, но статьи и теория доступны без регистрации, а после неё — 20 занятий в день (тренажёры, игры и ВПР вместе) бесплатно. Генераторы заданий — 3 раза в день бесплатно.
              </p>
            </details>

            <details className="card group">
              <summary className="cursor-pointer font-bold text-lg flex justify-between items-center">
                В чём разница между тарифами?
                <span className="group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <p className="mt-4 text-gray-400">
                Доступ к материалам одинаковый во всех трёх случаях, отличается только оплата.
                «Помесячно» — {pricing.monthlyPrice} ₽ каждый месяц с автопродлением, можно отменить в любой момент.
                «На год» — один платёж {pricing.yearlyPrice} ₽ сразу за 12 месяцев (это {yearlyPerMonth} ₽ в месяц,
                на {yearlySavingsPercent}% выгоднее помесячной). Через год продлевается автоматически, но мы заранее предупреждаем письмом за 7 дней — отменить можно в любой момент в личном кабинете.
                «Навсегда» — один платёж {pricing.lifetimePrice} ₽, без повторных списаний и без необходимости отменять что-либо.
              </p>
            </details>

            <details className="card group">
              <summary className="cursor-pointer font-bold text-lg flex justify-between items-center">
                Можно ли вернуть деньги?
                <span className="group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <p className="mt-4 text-gray-400">
                Да. Если вы ещё не пользовались оплаченным доступом — полный возврат в течение 7 дней с
                момента оплаты. Если уже пользовались — возврат за вычетом фактически использованного
                периода. Подробности — в{' '}
                <Link href="/oferta" className="text-orange hover:underline">
                  Публичной оферте
                </Link>
                , обращение — на email из оферты.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
