'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import ShareButtons from '@/components/ShareButtons';

interface ResultData {
  trackTitle: string;
  childName: string;
  score: number;
  total: number;
  paid: boolean;
  createdAt: string;
}

export default function TournamentDiplomaPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    async function fetchStatus() {
      try {
        const res = await fetch(`/api/tournament/result/${params.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          if (!cancelled) setLoading(false);
          return;
        }
        const json = await res.json();
        if (cancelled) return;
        setData(json);
        setLoading(false);
        // Пока платёж не подтверждён вебхуком — опрашиваем ещё несколько раз.
        if (!json.paid && attempts < 10) {
          timer = setTimeout(() => {
            if (!cancelled) setAttempts((a) => a + 1);
          }, 1500);
        }
      } catch {
        if (!cancelled) setLoading(false);
      }
    }
    fetchStatus();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, attempts]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400">Загрузка…</div>;
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <div>
          <p className="text-gray-400 mb-4">Диплом не найден или нужно войти в аккаунт</p>
          <Link href="/login" className="text-orange hover:underline">Войти</Link>
        </div>
      </div>
    );
  }

  if (!data.paid) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <div>
          <p className="text-gray-400 mb-2">Оплата обрабатывается…</p>
          <p className="text-gray-500 text-sm">Обычно занимает несколько секунд. Страница обновится сама.</p>
        </div>
      </div>
    );
  }

  const date = new Date(data.createdAt).toLocaleDateString('ru-RU');
  const percent = Math.round((data.score / data.total) * 100);
  const rank = percent === 100 ? 'Отличный результат!' : percent >= 80 ? 'Очень хороший результат!' : percent >= 50 ? 'Хороший результат!' : 'Результат участия';

  return (
    <div className="bg-black min-h-screen py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="no-print mb-6 flex items-center justify-between">
          <Link href="/turnir" className="text-orange hover:underline text-sm">← К турнирам</Link>
          <button onClick={() => window.print()} className="btn-primary">🖨️ Печать</button>
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
            <p className="text-sm tracking-[2px] uppercase opacity-80">Турнир Знаторики</p>
            <h1 className="text-3xl font-black mb-5">{data.trackTitle}</h1>

            <div className="text-6xl mb-4" style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.3))' }}>🏅</div>

            <p className="text-base opacity-85 mb-1.5">Награждается</p>
            <p className="text-4xl font-black mb-5 border-b-[3px] border-white/70 px-6 pb-2">{data.childName}</p>

            <div className="bg-white/15 border border-white/30 rounded-2xl px-7 py-3.5 mb-2">
              <p className="text-4xl font-black text-[#FFD43B]">{data.score} из {data.total}</p>
              <p className="text-sm opacity-85">правильных ответов</p>
            </div>
            <p className="text-lg font-extrabold text-[#FFD43B] mt-2">{rank}</p>

            <p className="text-sm opacity-75 mt-5">{date}</p>
            <p className="text-sm font-extrabold opacity-90 mt-1.5">🐿️ Знаторика · znatorica.ru</p>
          </div>
        </div>

        {/* Шеринг под дипломом. Ссылка ведёт на ОБЩУЮ страницу турнира, а не на
            сам диплом: на дипломе стоит имя ребёнка, и рассылать такую ссылку
            в родительский чат — значит публиковать детское имя. К тому же по
            ссылке на турнир человек может сразу поучаствовать сам. */}
        <div className="no-print mt-8">
          <ShareButtons
            text={`Ребёнок прошёл Турнир Знаторики: ${data.trackTitle} — ${data.score} из ${data.total} правильных. Участие бесплатное, попробуйте:`}
            url="https://znatorica.ru/turnir"
            trackKey="diploma"
          />
        </div>
      </div>
    </div>
  );
}
