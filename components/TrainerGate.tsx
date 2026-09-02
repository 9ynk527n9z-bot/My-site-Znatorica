'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface ConsumeResult {
  allowed: boolean;
  unlimited: boolean;
  remaining: number;
  limit: number;
  registered: boolean;
}

// Тренажёры доступны БЕЗ регистрации — 3 раза в день суммарно по всем тренажёрам
// (по сессии). Регистрация поднимает лимит до 20/день, подписка Знаторика PRO
// снимает его совсем — см. app/api/trainer/consume. Единица списания: открытие
// тренажёра = 1 использование.
//
// Решение "пустить/не пустить" принимает СЕРВЕР в момент открытия тренажёра
// (POST /api/trainer/consume, атомарная проверка+запись в транзакции) — а не
// цифра, заранее загруженная в браузер. Раньше было наоборот: клиент один раз
// получал остаток лимита и просто вычитал из него локально при каждом новом
// тренажёре — открыв несколько вкладок одновременно, можно было заниматься
// больше лимита, потому что каждая вкладка стартовала с одной и той же ещё не
// уменьшённой цифрой.
export default function TrainerGate({ type, children }: { type: string; children: React.ReactNode }) {
  const [result, setResult] = useState<ConsumeResult | null>(null);
  const consumed = useRef(false);

  useEffect(() => {
    if (consumed.current) return;
    consumed.current = true;

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    fetch('/api/trainer/consume', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ type }),
    })
      .then((res) => res.json())
      .then((data: ConsumeResult) => setResult(data))
      .catch(() =>
        // Отказ безопаснее в пользу пользователя: при сбое сети не блокируем тренажёр.
        setResult({ allowed: true, unlimited: false, remaining: 0, limit: 3, registered: false })
      );
  }, [type]);

  if (!result) return null;

  if (!result.allowed) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-8 text-center">
          <p className="text-yellow-400 font-bold text-lg mb-2">
            Лимит на сегодня исчерпан ({result.limit} из {result.limit})
          </p>
          {result.registered ? (
            <>
              <p className="text-gray-400 text-sm mb-6">
                Завтра снова будут доступны {result.limit} занятий. А со Знаторика PRO
                ограничения нет совсем — занимайтесь сколько угодно.
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link href="/podpiska" className="btn-primary inline-block">
                  Знаторика PRO — без ограничений
                </Link>
                <Link
                  href="/trenazher"
                  className="inline-block px-6 py-3 rounded-lg font-bold border border-[#2D2350] text-gray-300 hover:text-white transition-colors"
                >
                  Все тренажёры
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-400 text-sm mb-6">
                Зарегистрируйтесь — это бесплатно и займёт минуту — и занятий станет
                20 в день вместо {result.limit}.
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link href="/register" className="btn-primary inline-block">
                  Зарегистрироваться
                </Link>
                <Link
                  href="/login"
                  className="inline-block px-6 py-3 rounded-lg font-bold border border-[#2D2350] text-gray-300 hover:text-white transition-colors"
                >
                  Войти
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
