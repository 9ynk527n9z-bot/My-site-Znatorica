'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDiploma, type ProgressStats } from '@/lib/diplomas';

export default function DiplomaPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const diploma = getDiploma(params.slug);
  const [progress, setProgress] = useState<ProgressStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const today = new Date().toLocaleDateString('ru-RU');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetch('/api/user/progress', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => (res.ok ? res.json() : null))
      .then(setProgress)
      .finally(() => setLoading(false));
  }, [router]);

  if (!diploma) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-red-400">
        Такого диплома не существует
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-gray-400">
        Загрузка...
      </div>
    );
  }

  const value = progress ? diploma.getValue(progress) : 0;
  const unlocked = value >= diploma.target;

  if (!unlocked) {
    return (
      <div className="bg-black min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
        <p className="text-gray-400">
          Этот диплом ещё не открыт: {value} из {diploma.target}
        </p>
        <Link href="/account" className="text-orange font-bold hover:underline">
          ← Вернуться в личный кабинет
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="no-print mb-6 flex items-center justify-between">
          <Link href="/account" className="text-orange hover:underline text-sm">
            ← Личный кабинет
          </Link>
          <button onClick={() => window.print()} className="btn-primary">
            🖨️ Печать
          </button>
        </div>

        <div className="no-print mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-400">
            Имя ребёнка (напечатается на дипломе)
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите имя"
            className="w-full px-4 py-2 rounded-lg bg-[#2A1B4D] border border-[#2D2350] text-white focus:border-orange transition-colors"
          />
        </div>

        <p className="no-print text-center text-gray-500 text-xs mb-3">
          Совет: для печати выбери в диалоге печати «Печатать фон» / «Background graphics» — тогда цвет сохранится
        </p>

        <div
          className="print-page-color relative overflow-hidden rounded-[20px] text-white text-center px-10 py-12 flex flex-col items-center"
          style={{
            aspectRatio: '210 / 297',
            background: 'linear-gradient(160deg, #3a1c6e 0%, #6b21a8 45%, #f72585 100%)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          <div className="pointer-events-none absolute inset-3.5 rounded-2xl border-2 border-white/55" />
          <div className="pointer-events-none absolute w-24 h-24 rounded-full bg-[#FFD43B] opacity-35 -top-2 -left-2" />
          <div className="pointer-events-none absolute w-16 h-16 rounded-full bg-orange opacity-35 bottom-10 right-6" />
          <div className="pointer-events-none absolute w-10 h-10 rounded-full bg-white opacity-50 top-16 right-16" />
          <div className="pointer-events-none absolute w-32 h-32 rounded-full bg-[#4DABF7] opacity-25 -bottom-8 -left-8" />

          <div className="relative z-10 flex flex-col items-center gap-1.5">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-2"
              style={{
                background: 'radial-gradient(circle at 35% 30%, #ffb27a, #F97316 60%, #d9480f 100%)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
              }}
            >
              🐿️
            </div>
            <p className="text-sm tracking-[2px] uppercase opacity-80">Диплом</p>

            <div className="text-6xl my-2" style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.3))' }}>{diploma.icon}</div>

            <h1 className="text-3xl font-black mb-5">{diploma.title}</h1>

            <p className="text-base opacity-85 mb-1.5">Награждается</p>
            <p className="text-4xl font-black mb-5 border-b-[3px] border-white/70 px-6 pb-2">
              {name || '_______________________'}
            </p>

            <div className="bg-white/15 border border-white/30 rounded-2xl px-7 py-4 mb-2 max-w-md">
              <p className="text-base opacity-90">{diploma.description}</p>
            </div>

            <p className="text-sm opacity-75 mt-5">{today}</p>
            <p className="text-sm font-extrabold text-[#FFD43B] mt-1.5">Ты отлично справился с заданиями! Вперёд, к новым победам!</p>
            <p className="text-sm font-extrabold opacity-90 mt-1.5">🐿️ Знаторика · znatorica.ru</p>
          </div>
        </div>
      </div>
    </div>
  );
}
