'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DIPLOMAS, type ProgressStats } from '@/lib/diplomas';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

function shortDate(d: string) {
  const [, m, day] = d.split('-');
  return `${day}.${m}`;
}

const CATEGORY_LABELS: Record<string, string> = {
  generator: 'Генераторы',
  trainer: 'Тренажёры',
  vpr: 'Варианты ВПР',
  plakaty: 'Плакаты',
};

interface Recommendation {
  icon: string;
  text: string;
  href?: string;
  linkText?: string;
}

// Простые правила по уже собранной статистике — без отдельного тяжёлого движка рекомендаций.
function getRecommendations(progress: ProgressStats): Recommendation[] {
  const recs: Recommendation[] = [];

  if (progress.total === 0) {
    return [
      {
        icon: '🚀',
        text: 'Начните с любого тренажёра — это займёт всего пару минут, а прогресс сразу начнёт отображаться здесь.',
        href: '/trenazher',
        linkText: 'Все тренажёры',
      },
    ];
  }

  if (progress.vprVariantsCompleted === 0) {
    recs.push({
      icon: '📋',
      text: 'Вы ещё не пробовали варианты ВПР — если ребёнок в 3 или 4 классе, стоит попробовать прямо сейчас.',
      href: '/vpr',
      linkText: 'Подготовка к ВПР',
    });
  }

  const generatorCount = progress.byCategory['generator'] || 0;
  const trainerCount = progress.byCategory['trainer'] || 0;
  if (generatorCount > trainerCount * 2 && generatorCount > 3) {
    recs.push({
      icon: '🎮',
      text: 'Вы часто пользуетесь генераторами — попробуйте тренажёры: там задания в игровой форме со счётом и обратной связью.',
      href: '/trenazher',
      linkText: 'Все тренажёры',
    });
  } else if (trainerCount > generatorCount * 2 && trainerCount > 3) {
    recs.push({
      icon: '⚙️',
      text: 'Вы часто занимаетесь на тренажёрах — попробуйте генераторы: удобно распечатать задания и позаниматься без экрана.',
      href: '/generator',
      linkText: 'Все генераторы',
    });
  }

  if (progress.streak === 0) {
    recs.push({
      icon: '🔥',
      text: 'Сегодня ещё не было занятий — позанимайтесь хотя бы 5 минут, чтобы начать новую серию дней подряд.',
    });
  } else if (progress.streak >= 1 && progress.streak < 7) {
    recs.push({
      icon: '💪',
      text: `Серия — ${progress.streak} ${progress.streak === 1 ? 'день' : 'дня'} подряд. Ещё немного — и будет достижение «Неделя подряд»!`,
    });
  }

  if (recs.length === 0) {
    recs.push({
      icon: '🌟',
      text: 'Вы отлично занимаетесь по всем направлениям — так держать!',
    });
  }

  return recs;
}

interface Profile {
  user: {
    id: string;
    email: string;
    role: string;
    emailConfirmed: boolean;
    createdAt: string;
    starsBalance: number;
  };
  subscription: {
    plan: string;
    status: string;
    endDate: string;
    autoRenew: boolean;
    willAutoCharge: boolean;
    isActive: boolean;
  } | null;
  payments: {
    id: string;
    amount: number;
    status: string;
    createdAt: string;
  }[];
  generatorUsesCount: number;
  tournamentDiplomas: {
    id: string;
    trackTitle: string;
    childName: string;
    score: number;
    total: number;
    createdAt: string;
  }[];
}

interface DailyGiftStatus {
  starsBalance: number;
  dailyGiftStreak: number;
  alreadyClaimedToday: boolean;
  nextReward: number | null;
}

export default function AccountPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [progress, setProgress] = useState<ProgressStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelMessage, setCancelMessage] = useState<string | null>(null);
  const [gift, setGift] = useState<DailyGiftStatus | null>(null);
  const [giftClaiming, setGiftClaiming] = useState(false);
  const [giftResult, setGiftResult] = useState<string | null>(null);

  const loadProfile = async (token: string) => {
    const response = await fetch('/api/user/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 401) {
      localStorage.removeItem('token');
      router.push('/login');
      return;
    }

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    const data = await response.json();
    setProfile(data);
  };

  const loadProgress = async (token: string) => {
    const response = await fetch('/api/user/progress', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      setProgress(await response.json());
    }
  };

  const loadGift = async (token: string) => {
    const response = await fetch('/api/user/daily-gift', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      setGift(await response.json());
    }
  };

  const handleClaimGift = async () => {
    const token = localStorage.getItem('token');
    if (!token || giftClaiming) return;

    setGiftClaiming(true);
    setGiftResult(null);
    try {
      const response = await fetch('/api/user/daily-gift', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        setGiftResult(data.error || 'Не удалось забрать подарок');
        return;
      }
      setGiftResult(`+${data.awarded} ⭐ (серия: ${data.dailyGiftStreak} ${data.dailyGiftStreak === 1 ? 'день' : 'дней'})`);
      await loadGift(token);
    } catch (err) {
      console.error(err);
      setGiftResult('Ошибка подключения к серверу');
    } finally {
      setGiftClaiming(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    Promise.all([loadProfile(token), loadProgress(token), loadGift(token)])
      .catch((err) => {
        console.error(err);
        setError('Не удалось загрузить данные аккаунта');
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleCancelSubscription = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    if (!confirm('Отключить автопродление подписки? Доступ сохранится до конца оплаченного периода.')) {
      return;
    }

    try {
      setCancelLoading(true);
      setCancelMessage(null);

      const response = await fetch('/api/subscription/cancel', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (!response.ok) {
        setCancelMessage(data.error || 'Ошибка при отмене подписки');
        return;
      }

      setCancelMessage(data.message);
      await loadProfile(token);
    } catch (err) {
      console.error(err);
      setCancelMessage('Ошибка подключения к серверу');
    } finally {
      setCancelLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{error || 'Что-то пошло не так'}</div>
      </div>
    );
  }

  const { user, subscription, payments } = profile;
  const totalStars = (progress?.total || 0) + user.starsBalance;

  return (
    <div className="bg-black min-h-screen">
      {/* Header */}
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">👤 Личный кабинет</h1>
            <p className="text-gray-400 text-sm mt-1">{user.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/domik"
              className="bg-orange/20 border border-orange/40 rounded-full px-4 py-2 flex items-center gap-2 hover:bg-orange/30 transition-colors"
            >
              <span className="text-2xl">⭐</span>
              <span className="font-bold text-orange text-lg">{totalStars}</span>
              <span className="text-xs text-orange/80 ml-1">🏡 Домик →</span>
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6 space-y-8">
        {/* Email confirmation warning */}
        {!user.emailConfirmed && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-center justify-between gap-4">
            <p className="text-yellow-400 text-sm">
              ⚠️ Email не подтверждён. Подтвердите его, чтобы активировать согласие на обработку данных.
            </p>
            <Link
              href="/confirm-email"
              className="text-yellow-400 font-bold text-sm whitespace-nowrap hover:underline"
            >
              Подтвердить →
            </Link>
          </div>
        )}

        {/* Subscription Card */}
        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">💳 Подписка</h2>

          {subscription?.isActive ? (
            subscription.plan === 'lifetime' ? (
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-400 font-bold mb-1">✅ Пожизненный доступ активен</p>
                <p className="text-green-400 text-sm">Доступ не заканчивается и не требует продления</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <p className="text-green-400 font-bold mb-1">✅ Подписка активна</p>
                  <p className="text-green-400 text-sm">
                    Действует до {new Date(subscription.endDate).toLocaleDateString('ru-RU')}
                  </p>
                  <p className="text-green-400 text-sm mt-1">
                    {subscription.plan === 'yearly'
                      ? 'Оплачен год вперёд. Перед автопродлением предупредим письмом за 7 дней'
                      : !subscription.autoRenew
                        ? 'Автопродление отключено — после окончания периода подписка не продлится'
                        : subscription.willAutoCharge
                          ? 'Автопродление включено — карта сохранена, спишем автоматически'
                          : 'Автопродление включено, но карта не сохранена — продлите вручную до конца периода, иначе доступ закончится'}
                  </p>
                </div>

                {subscription.autoRenew && (
                  <button
                    onClick={handleCancelSubscription}
                    disabled={cancelLoading}
                    className="text-red-400 hover:text-red-300 text-sm font-bold disabled:opacity-50"
                  >
                    {cancelLoading ? 'Отмена...' : 'Отменить автопродление'}
                  </button>
                )}

                {cancelMessage && (
                  <p className="text-gray-400 text-sm">{cancelMessage}</p>
                )}
              </div>
            )
          ) : (
            <div className="space-y-4">
              <p className="text-gray-400">У вас нет активной подписки.</p>
              <Link href="/podpiska" className="btn-primary inline-block">
                Оформить подписку — помесячно или навсегда
              </Link>
            </div>
          )}
        </div>

        {/* Daily Gift */}
        <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange/40 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">🎁 Ежедневный подарок</h2>
          {gift ? (
            gift.alreadyClaimedToday ? (
              <div>
                <p className="text-green-400 font-bold mb-1">✅ Подарок на сегодня уже забран!</p>
                <p className="text-gray-400 text-sm">
                  Серия дней подряд: {gift.dailyGiftStreak} 🔥 — заходи завтра за новым подарком.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-gray-300 mb-4">
                  Забери сегодняшний подарок — <span className="font-bold text-orange">+{gift.nextReward} ⭐</span>
                  {gift.dailyGiftStreak > 0 && <> (серия продолжится: {gift.dailyGiftStreak + 1} {gift.dailyGiftStreak + 1 === 1 ? 'день' : 'дней'} подряд)</>}
                </p>
                <button onClick={handleClaimGift} disabled={giftClaiming} className="btn-primary disabled:opacity-50">
                  {giftClaiming ? 'Забираем...' : '🎁 Забрать подарок'}
                </button>
                {giftResult && <p className="text-orange font-bold mt-3">{giftResult}</p>}
              </div>
            )
          ) : (
            <p className="text-gray-400 text-sm">Загрузка...</p>
          )}
        </div>

        {/* Progress Dashboard */}
        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">📊 Прогресс</h2>

          {progress ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Всего занятий</p>
                  <p className="text-3xl font-bold text-orange">{progress.total}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">За 7 дней</p>
                  <p className="text-3xl font-bold text-orange">{progress.last7Days}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">За 30 дней</p>
                  <p className="text-3xl font-bold text-orange">{progress.last30Days}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Дней подряд</p>
                  <p className="text-3xl font-bold text-orange">🔥 {progress.streak}</p>
                </div>
              </div>

              {Object.keys(progress.byCategory).length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-400 mb-1">🗺️ Карта прогресса по разделам</p>
                  {(() => {
                    const max = Math.max(...Object.values(progress.byCategory));
                    return Object.entries(progress.byCategory)
                      .sort(([, a], [, b]) => b - a)
                      .map(([cat, count]) => (
                        <div key={cat}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-300">{CATEGORY_LABELS[cat] || cat}</span>
                            <span className="font-bold text-white">{count}</span>
                          </div>
                          <div className="w-full bg-black rounded-full h-3">
                            <div
                              className="bg-gradient-to-r from-orange to-violet h-3 rounded-full transition-all"
                              style={{ width: `${Math.max(6, Math.round((count / max) * 100))}%` }}
                            />
                          </div>
                        </div>
                      ));
                  })()}
                </div>
              )}

              {progress.dailySeries.some((d) => d.count > 0) && (
                <div className="mt-8">
                  <p className="text-sm text-gray-400 mb-3">📈 Динамика занятий за 30 дней</p>
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={progress.dailySeries}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2D2350" />
                      <XAxis dataKey="date" tickFormatter={shortDate} tick={{ fontSize: 11, fill: '#999' }} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#999' }} />
                      <Tooltip
                        labelFormatter={shortDate}
                        formatter={(v: number) => [`${v}`, 'занятий']}
                        contentStyle={{ background: '#1E1035', border: '1px solid #2D2350' }}
                      />
                      <Line type="monotone" dataKey="count" stroke="#FF8C42" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-400">Пока нет данных об активности — начните с любого тренажёра или генератора.</p>
          )}

          <p className="text-gray-500 text-sm mt-6">
            Аккаунт создан {new Date(user.createdAt).toLocaleDateString('ru-RU')}
          </p>
        </div>

        {/* Recommendations */}
        {progress && (
          <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">💡 Рекомендации</h2>
            <ul className="space-y-3">
              {getRecommendations(progress).map((rec, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0">{rec.icon}</span>
                  <div>
                    <p className="text-gray-300 text-sm">{rec.text}</p>
                    {rec.href && (
                      <Link href={rec.href} className="text-orange font-bold text-sm hover:underline">
                        {rec.linkText} →
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Diplomas */}
        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-2">🏆 Кубки и достижения</h2>
          <p className="text-gray-500 text-sm mb-6">Копи звёзды и открывай новые достижения — каждое можно распечатать как диплом</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DIPLOMAS.map((diploma) => {
              const value = progress ? diploma.getValue(progress) : 0;
              const unlocked = value >= diploma.target;
              const pct = Math.min(100, Math.round((value / diploma.target) * 100));

              return (
                <div
                  key={diploma.slug}
                  className={`rounded-lg p-6 border ${
                    unlocked ? 'bg-orange/10 border-orange' : 'bg-black border-[#2D2350]'
                  }`}
                >
                  <div className="text-4xl mb-2">{diploma.icon}</div>
                  <h3 className="text-lg font-bold mb-1">{diploma.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{diploma.description}</p>

                  {unlocked ? (
                    <Link
                      href={`/account/diplomy/${diploma.slug}`}
                      className="text-orange font-bold text-sm hover:underline"
                    >
                      🖨️ Получить диплом →
                    </Link>
                  ) : (
                    <>
                      <div className="w-full bg-[#2D2350] rounded-full h-2 mb-2">
                        <div
                          className="bg-orange h-2 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <p className="text-gray-500 text-xs">
                        {value} из {diploma.target}
                      </p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Tournament diplomas */}
        {profile.tournamentDiplomas.length > 0 && (
          <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-2">🏆 Дипломы «Турнира Знаторики»</h2>
            <p className="text-gray-500 text-sm mb-6">Именные дипломы за участие в турнире — можно открыть и распечатать снова в любой момент</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {profile.tournamentDiplomas.map((d) => (
                <Link
                  key={d.id}
                  href={`/turnir/diplom/${d.id}`}
                  className="rounded-lg p-6 border bg-black border-[#2D2350] hover:border-orange transition-colors block"
                >
                  <div className="text-4xl mb-2">🏅</div>
                  <h3 className="text-lg font-bold mb-1">{d.trackTitle}</h3>
                  <p className="text-gray-400 text-sm mb-2">{d.childName} — {d.score} из {d.total}</p>
                  <p className="text-orange font-bold text-sm">🖨️ Открыть диплом →</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Payment History */}
        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg overflow-hidden">
          <div className="px-8 py-6 border-b border-[#2D2350]">
            <h2 className="text-2xl font-bold">🧾 История платежей</h2>
          </div>

          {payments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1E1035]">
                  <tr>
                    <th className="px-8 py-3 text-left text-gray-400 font-semibold text-sm">Сумма</th>
                    <th className="px-8 py-3 text-left text-gray-400 font-semibold text-sm">Статус</th>
                    <th className="px-8 py-3 text-left text-gray-400 font-semibold text-sm">Дата</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-t border-[#2D2350]">
                      <td className="px-8 py-4 text-white">₽{payment.amount}</td>
                      <td className="px-8 py-4">
                        <span
                          className={`px-3 py-1 rounded text-xs font-semibold ${
                            payment.status === 'succeeded'
                              ? 'bg-green-500/20 text-green-400'
                              : payment.status === 'pending'
                                ? 'bg-orange/20 text-orange'
                                : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {payment.status === 'succeeded'
                            ? 'Успешно'
                            : payment.status === 'pending'
                              ? 'Ожидание'
                              : 'Отклонено'}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-gray-400 text-sm">
                        {new Date(payment.createdAt).toLocaleDateString('ru-RU')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-8 py-12 text-center text-gray-400">Платежей пока нет</div>
          )}
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/account/data"
            className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6 hover:border-orange transition-colors"
          >
            <h3 className="text-xl font-bold mb-2">🔐 Персональные данные</h3>
            <p className="text-gray-400 text-sm">Экспорт или удаление данных (ФЗ-152)</p>
          </Link>

          {user.role === 'admin' && (
            <Link
              href="/admin/dashboard"
              className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6 hover:border-orange transition-colors"
            >
              <h3 className="text-xl font-bold mb-2">⚙️ Админ-панель</h3>
              <p className="text-gray-400 text-sm">Управление платформой</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
