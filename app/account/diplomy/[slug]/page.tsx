'use client';

import Link from 'next/link';
import Image from 'next/image';
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

        <div className="print-page bg-white text-black rounded-lg p-16 text-center border-8 border-double border-orange">
          <Image src="/logo.png" alt="Знаторика" width={72} height={72} className="mx-auto mb-2 rounded-full" />
          <p className="text-2xl mb-8">Диплом</p>

          <div className="text-6xl mb-8">{diploma.icon}</div>

          <h1 className="text-4xl font-bold mb-6">{diploma.title}</h1>

          <p className="text-xl mb-2">Награждается</p>
          <p className="text-3xl font-bold mb-8 border-b-2 border-black inline-block px-8 pb-2">
            {name || '_______________________'}
          </p>

          <p className="text-lg text-gray-700 mb-8">{diploma.description}</p>

          <p className="text-gray-500 mb-4">{today}</p>

          <p className="text-orange text-sm font-bold">🐿️ Белка-Знаторика гордится тобой!</p>
        </div>
      </div>
    </div>
  );
}
