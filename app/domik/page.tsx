'use client';

import Link from 'next/link';
import DomikScene, { DecorationArt } from '@/components/domik/DomikScene';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DECORATIONS, DECORATION_CATEGORIES, type DecorationCategory } from '@/lib/decorations';

interface DiplomaStatus {
  slug: string;
  title: string;
  icon: string;
  target: number;
  value: number;
  earned: boolean;
}

interface DomikStatus {
  starsAvailable: number;
  starsEarned: number;
  ownedItems: string[];
  diplomas: DiplomaStatus[];
  flowerStreak: number;
  alreadyWateredToday: boolean;
  hint: { type: 'decoration' | 'diploma'; title: string; missing: number } | null;
}

function flowerStage(streak: number): { emoji: string; label: string } {
  if (streak <= 0) return { emoji: '🪴', label: 'Ещё не посажен — полей, чтобы прорастил' };
  if (streak === 1) return { emoji: '🌱', label: 'Только проклюнулся' };
  if (streak <= 3) return { emoji: '🌿', label: 'Подрастает' };
  if (streak <= 6) return { emoji: '🌷', label: 'Почти расцвёл' };
  return { emoji: '🌻', label: 'В полном цвету!' };
}

export default function DomikPage() {
  const router = useRouter();
  const [status, setStatus] = useState<DomikStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState<DecorationCategory>('mebel');
  const [buying, setBuying] = useState<string | null>(null);
  const [watering, setWatering] = useState(false);
  const [mood, setMood] = useState<'idle' | 'happy'>('idle');

  async function load(token: string) {
    try {
      const res = await fetch('/api/user/domik', { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('DOMIK_LOAD_FAILED');
      setStatus(await res.json());
      setError('');
    } catch {
      setError('Не удалось обновить домик. Проверь соединение и попробуй ещё раз.');
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    load(token).finally(() => setLoading(false));
  }, [router]);

  async function handleBuy(itemId: string) {
    const token = localStorage.getItem('token');
    if (!token || buying) return;
    setBuying(itemId);
    setError('');
    try {
      const res = await fetch('/api/user/domik/buy', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Не удалось купить украшение');
        setTimeout(() => setError(''), 2500);
        return;
      }
      // Show the confirmed purchase even if the following refresh loses its connection.
      setStatus(current => current ? {
        ...current,
        starsAvailable: data.starsAvailable,
        ownedItems: current.ownedItems.includes(itemId) ? current.ownedItems : [...current.ownedItems, itemId],
      } : current);
      setMood('happy');
      setTimeout(() => setMood('idle'), 1500);
      await load(token);
    } catch {
      setError('Не удалось подтвердить покупку. Обнови домик, чтобы проверить её статус.');
    } finally {
      setBuying(null);
    }
  }

  async function handleWater() {
    const token = localStorage.getItem('token');
    if (!token || watering || status?.alreadyWateredToday) return;
    setWatering(true);
    setError('');
    try {
      const res = await fetch('/api/user/daily-gift', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Не удалось полить цветок');
        setTimeout(() => setError(''), 2500);
        return;
      }
      setMood('happy');
      setTimeout(() => setMood('idle'), 1500);
      await load(token);
    } catch {
      setError('Не удалось подтвердить полив. Обнови домик, чтобы проверить его статус.');
    } finally {
      setWatering(false);
    }
  }

  if (loading) {
    return <div className="bg-black min-h-screen flex items-center justify-center text-gray-400">Загружаем домик...</div>;
  }

  if (error && !status) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center p-6 space-y-4">
          <p className="text-red-400 text-lg" role="alert">{error}</p>
          <button className="btn-primary" onClick={() => {
            const token = localStorage.getItem('token');
            if (!token) { router.push('/login'); return; }
            setLoading(true);
            void load(token).finally(() => setLoading(false));
          }}>Попробовать ещё раз</button>
        </div>
      </div>
    );
  }

  if (!status) return null;

  const owned = new Set(status.ownedItems);
  const categoryItems = DECORATIONS.filter((d) => d.category === activeCategory);

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <Link href="/account" className="text-orange hover:underline text-sm">
              ← Личный кабинет
            </Link>
            <h1 className="text-3xl font-bold mt-2">🏡 Домик Знатика</h1>
          </div>
          <div className="bg-orange/20 border border-orange/40 rounded-full px-4 py-2 flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <span className="font-bold text-orange text-lg">{status.starsAvailable}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-10 px-6 space-y-8">
        {/* Toast */}
        {error && (
          <div role="alert" className="fixed top-6 right-6 max-w-sm bg-red-500/90 text-white px-5 py-3 rounded-lg shadow-lg z-50 pop-in">
            {error}
          </div>
        )}

        {/* Белка + подсказка */}
        <div className="flex items-center gap-4">
          <div className={`text-6xl flex-shrink-0 transition-transform ${mood === 'happy' ? 'scale-125' : ''}`}>
            <div className="w-20"><DecorationArt id="znatik" label="Знатик" /></div>
          </div>
          <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-2xl rounded-bl-none px-5 py-3 flex-1">
            {mood === 'happy' ? (
              <p className="text-green-400 font-bold">Ура, спасибо! Теперь тут гораздо уютнее! 🎉</p>
            ) : status.hint ? (
              <p className="text-white">
                {status.hint.type === 'decoration' ? (
                  <>
                    Ещё{' '}
                    <span className="text-orange font-bold">{status.hint.missing} ⭐</span> — и купим «
                    {status.hint.title}»!
                  </>
                ) : (
                  <>
                    Ещё немного до диплома «{status.hint.title}» — осталось{' '}
                    <span className="text-orange font-bold">{status.hint.missing}</span>.
                  </>
                )}
              </p>
            ) : (
              <p className="text-white">Ты купил(а) уже всё! Ты просто молодец 🌟</p>
            )}
          </div>
        </div>

        {/* Цветочек — растёт от ежедневного полива (тот же стрик, что у подарка) */}
        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className={`text-5xl transition-transform ${mood === 'happy' ? 'scale-125' : ''}`}>
              {flowerStage(status.flowerStreak).emoji}
            </div>
            <div>
              <p className="font-bold">{flowerStage(status.flowerStreak).label}</p>
              <p className="text-gray-400 text-sm">
                {status.flowerStreak > 0
                  ? `Полито ${status.flowerStreak} ${status.flowerStreak === 1 ? 'день' : 'дней'} подряд 🔥`
                  : 'Полей в первый раз, чтобы посадить'}
              </p>
            </div>
          </div>
          <button
            onClick={handleWater}
            disabled={watering || status.alreadyWateredToday}
            className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {status.alreadyWateredToday ? '💧 Полито сегодня' : watering ? 'Поливаем...' : '💧 Полить цветок'}
          </button>
        </div>

        <DomikScene ownedItems={status.ownedItems} happy={mood === 'happy'} />

        {/* Полка дипломов */}
        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">📚 Полка наград</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {status.diplomas.map((d) => (
              <div
                key={d.slug}
                className={`flex-shrink-0 w-28 rounded-lg p-3 text-center border ${
                  d.earned ? 'bg-orange/10 border-orange' : 'bg-black border-[#2D2350] opacity-50'
                }`}
              >
                <div className="text-3xl mb-1">{d.icon}</div>
                <p className="text-xs font-bold leading-tight mb-1">{d.title}</p>
                {!d.earned && <p className="text-[10px] text-gray-500">{d.value}/{d.target}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Магазин */}
        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">🛍️ Магазин украшений</h2>
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {DECORATION_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-orange text-white'
                    : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {categoryItems.map((item) => {
              const isOwned = owned.has(item.id);
              const canAfford = status.starsAvailable >= item.cost;
              return (
                <div
                  key={item.id}
                  className={`rounded-lg p-4 border text-center ${
                    isOwned ? 'bg-green-500/10 border-green-500/40' : 'bg-black border-[#2D2350]'
                  }`}
                >
                  <div className="mx-auto w-full max-w-36 mb-2 rounded-2xl bg-[#f3ecff]"><DecorationArt id={item.id} label={item.title} /></div>
                  <p className="font-bold text-sm mb-2">{item.title}</p>
                  <p className="text-xs text-gray-400 mb-3">{item.category === 'mebel' ? (item.floor === 2 ? 'Для спальни' : 'Для гостиной') : item.category === 'dvor' ? 'Для двора' : item.category === 'steny' ? 'Для украшения дома' : 'Для праздника'}</p>
                  {isOwned ? (
                    <p className="text-green-400 text-xs font-bold">✓ Куплено</p>
                  ) : (
                    <button
                      onClick={() => handleBuy(item.id)}
                      disabled={!canAfford || buying !== null}
                      className="w-full bg-orange text-white text-xs font-bold py-2 rounded-lg hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                    >
                      {buying === item.id ? '...' : `${item.cost} ⭐`}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center">
          <Link href="/trenazher" className="text-orange font-bold hover:underline">
            Заниматься и получать звёзды →
          </Link>
        </div>
      </div>
    </div>
  );
}
