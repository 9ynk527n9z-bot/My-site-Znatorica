'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { getTournamentTrack, getTournamentQuestionPool } from '@/lib/tournament';
import type { QuizQuestion } from '@/lib/quiz/types';
import { TOURNAMENT_DIPLOMA_PRICE, TOURNAMENT_DIPLOMA_FREE } from '@/lib/constants';
import { trackUsage } from '@/lib/track';

const ROUND_SIZE = 8;
const PENDING_KEY = 'znatorika_pending_diploma';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function prepareRound(pool: QuizQuestion[], size: number): QuizQuestion[] {
  return shuffle(pool)
    .slice(0, size)
    .map((q) => {
      const order = shuffle(q.options.map((_, i) => i));
      return { ...q, options: order.map((i) => q.options[i]), correct: order.indexOf(q.correct) };
    });
}

interface PendingResult {
  trackId: string;
  childName: string;
  score: number;
  total: number;
}

export default function TournamentTrackPage({ params }: { params: { grade: string; subject: string } }) {
  const router = useRouter();
  const trackId = `${params.grade}/${params.subject}`;
  const track = getTournamentTrack(trackId);

  const [round, setRound] = useState<QuizQuestion[] | null>(null);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [finished, setFinished] = useState(false);

  const [childName, setChildName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [restoredNotice, setRestoredNotice] = useState(false);
  const [isProSubscriber, setIsProSubscriber] = useState(false);
  const [percentile, setPercentile] = useState<number | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  // Диплом входит в Знаторика PRO без доплаты (см. /podpiska) — проверяем статус,
  // чтобы показать честную цену на кнопке, а не всегда «99 ₽».
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    fetch('/api/user/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setIsProSubscriber(!!data?.subscription?.isActive))
      .catch(() => {});
  }, []);

  const pool = useMemo(() => (track ? getTournamentQuestionPool(track.id) : []), [track]);
  const roundSize = Math.min(ROUND_SIZE, pool.length);

  // Если человек прошёл турнир, ввёл имя, но не был залогинен и ушёл на
  // регистрацию — после возврата сюда (register.tsx поддерживает ?next=)
  // восстанавливаем результат из localStorage, а не заставляем проходить заново.
  useEffect(() => {
    if (!track) return;
    const token = localStorage.getItem('token');
    if (!token) return;
    const raw = localStorage.getItem(PENDING_KEY);
    if (!raw) return;
    try {
      const pending: PendingResult = JSON.parse(raw);
      if (pending.trackId !== track.id) return;
      setScore(pending.score);
      setTotal(pending.total);
      setChildName(pending.childName);
      setFinished(true);
      setRound([]); // непустой массив-заглушка — только чтобы пройти условие рендера "finished"-экрана
      setRestoredNotice(true);
      localStorage.removeItem(PENDING_KEY);
    } catch {
      localStorage.removeItem(PENDING_KEY);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track?.id]);

  if (!track) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <div>
          <p className="text-xl font-bold mb-4">Такого турнира не существует</p>
          <Link href="/turnir" className="text-orange hover:underline">← Ко всем турнирам</Link>
        </div>
      </div>
    );
  }

  function start() {
    setRound(prepareRound(pool, roundSize));
    setIndex(0);
    setPicked(null);
    setScore(0);
    setTotal(roundSize);
    setFinished(false);
    setError(null);
    setRestoredNotice(false);
    setPercentile(null);
    trackUsage(`tournament:start:${track!.id}`);
  }

  function choose(i: number) {
    if (picked !== null || !round) return;
    setPicked(i);
    if (i === round[index].correct) setScore((s) => s + 1);
  }

  function next() {
    if (!round) return;
    if (index + 1 >= round.length) {
      setFinished(true);
      trackUsage(`tournament:finish:${track!.id}:${score}/${round.length}`);
      fetch(`/api/tournament/percentile?trackId=${encodeURIComponent(track!.id)}&score=${score}&total=${round.length}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => setPercentile(data?.percentile ?? null))
        .catch(() => setPercentile(null));
    } else {
      setIndex((i) => i + 1);
      setPicked(null);
    }
  }

  async function buyDiploma() {
    setError(null);
    if (!childName.trim()) {
      setError('Введите имя ребёнка для диплома');
      return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      // Сохраняем результат, чтобы не потерять его на регистрации, и возвращаемся
      // сюда же после входа (register.tsx/login.tsx уважают ?next=).
      const pending: PendingResult = { trackId: track!.id, childName: childName.trim(), score, total };
      localStorage.setItem(PENDING_KEY, JSON.stringify(pending));
      router.push(`/register?next=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    try {
      setSaving(true);
      const resRes = await fetch('/api/tournament/create-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ trackId: track!.id, childName: childName.trim(), score, total }),
      });
      const resData = await resRes.json();
      if (!resRes.ok) throw new Error(resData.error || 'Не удалось сохранить результат');

      const payRes = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          tournamentResultId: resData.resultId,
          returnUrl: `${window.location.origin}/turnir/diplom/${resData.resultId}`,
        }),
      });
      const payData = await payRes.json();
      if (!payRes.ok) throw new Error(payData.error || 'Не удалось создать платёж');
      if (payData.grantedByPro) {
        router.push(`/turnir/diplom/${resData.resultId}`);
        return;
      }
      window.location.href = payData.confirmationUrl;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка. Попробуйте ещё раз.');
      setSaving(false);
    }
  }

  const shareUrl = track ? `${typeof window !== 'undefined' ? window.location.origin : ''}/turnir/${track.id}` : '';
  const shareText = track
    ? `Прошёл(-ла) турнир «${track.subjectLabel}» (${track.gradeLabel}) на ${score} из ${total} на Знаторике (znatorica.ru)! Попробуй свой результат:`
    : '';

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/turnir" className="text-orange hover:underline text-sm">← Все турниры</Link>
        <h1 className="text-2xl font-bold mt-2">🏆 Турнир Знаторики — {track.title}</h1>
      </div>

      <div className="max-w-2xl mx-auto py-8 px-6">
        {!round && (
          <div className="card text-center py-10">
            <p className="text-6xl mb-4">🏆</p>
            <p className="text-xl font-bold mb-2">Готов к турниру?</p>
            <p className="text-gray-400 mb-6">
              {roundSize} вопросов по теме «{track.subjectLabel}» ({track.gradeLabel}). Участие бесплатно.
            </p>
            <button onClick={start} className="btn-primary px-8 py-4 text-lg">▶️ Начать турнир</button>
          </div>
        )}

        {round && round.length > 0 && !finished && (
          <div className="card bg-white text-left">
            <div className="flex justify-between items-center mb-6 text-sm">
              <span className="text-gray-500 font-bold">Вопрос {index + 1} / {round.length}</span>
              <span className="text-orange font-bold">✅ {score}</span>
            </div>

            <p className="text-xl sm:text-2xl font-bold mb-6 text-[#3a1c6e] leading-relaxed">{round[index].prompt}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {round[index].options.map((opt, i) => {
                let cls = 'border-2 border-orange text-[#3a1c6e] hover:bg-orange/10';
                if (picked !== null) {
                  if (i === round[index].correct) cls = 'bg-orange border-2 border-orange text-white';
                  else if (i === picked) cls = 'bg-red-100 border-2 border-red-400 text-red-600';
                  else cls = 'border-2 border-gray-200 text-gray-400';
                }
                return (
                  <button
                    key={i}
                    onClick={() => choose(i)}
                    disabled={picked !== null}
                    className={`px-4 py-3 rounded-lg font-bold text-left transition-colors ${cls}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {picked !== null && (
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <p className={`font-bold ${picked === round[index].correct ? 'text-green-600' : 'text-red-500'}`}>
                  {picked === round[index].correct ? '✅ Верно!' : `❌ Верно: ${round[index].options[round[index].correct]}`}
                  {picked !== round[index].correct && round[index].hint && (
                    <span className="text-gray-500 font-normal"> — {round[index].hint}</span>
                  )}
                </p>
                <button onClick={next} className="btn-primary px-6 py-2">
                  {index + 1 >= round.length ? 'Результат' : 'Дальше →'}
                </button>
              </div>
            )}
          </div>
        )}

        {round && finished && (
          <div className="card bg-white text-center py-10">
            {restoredNotice && (
              <p className="text-green-600 text-sm font-bold mb-4">
                ✅ С возвращением! Твой результат сохранился — можно сразу оформить диплом.
              </p>
            )}
            <p className="text-3xl font-black text-[#3a1c6e] mb-2">🎉 Турнир пройден!</p>
            <p className="text-gray-600 mb-1">Результат:</p>
            <p className="text-6xl font-black text-orange mb-2">{score} / {total}</p>
            {percentile !== null && (
              <p className="text-green-600 font-bold mb-4">
                🔥 Лучше, чем у {percentile}% участников этого турнира!
              </p>
            )}
            {percentile === null && <div className="mb-4" />}

            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-gray-400 text-xs">Поделиться:</span>
              <a
                href={`https://vk.com/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackUsage('tournament:share:vk')}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-lg transition-colors"
                title="Поделиться ВКонтакте"
              >
                🔵
              </a>
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackUsage('tournament:share:telegram')}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-lg transition-colors"
                title="Поделиться в Telegram"
              >
                ✈️
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${shareText} ${shareUrl}`).catch(() => {});
                  trackUsage('tournament:share:copy');
                  setLinkCopied(true);
                  setTimeout(() => setLinkCopied(false), 2000);
                }}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-lg transition-colors"
                title="Скопировать ссылку"
              >
                {linkCopied ? '✅' : '🔗'}
              </button>
            </div>

            <div className="max-w-sm mx-auto text-left mb-6">
              <label className="block text-sm font-bold mb-2 text-gray-700">Имя ребёнка для диплома</label>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="Например, Аня Смирнова"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-[#1a1a2e]"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <div className="flex justify-center gap-3 flex-wrap">
              <button onClick={start} className="btn-secondary px-6 py-3">🔁 Пройти ещё раз</button>
              <button onClick={buyDiploma} disabled={saving} className="btn-primary px-6 py-3 disabled:opacity-50">
                {saving
                  ? 'Обработка…'
                  : TOURNAMENT_DIPLOMA_FREE
                    ? '🏅 Получить именной диплом — бесплатно'
                    : isProSubscriber
                      ? '🏅 Именной диплом — бесплатно по Знаторика PRO'
                      : `🏅 Именной диплом — ${TOURNAMENT_DIPLOMA_PRICE} ₽`}
              </button>
            </div>
            {!isProSubscriber && !TOURNAMENT_DIPLOMA_FREE && (
              <p className="text-center text-xs text-gray-500 mt-4">
                Нажимая кнопку оплаты, вы принимаете условия{' '}
                <Link href="/oferta" className="text-orange hover:underline">Публичной оферты</Link>
                , включая порядок возврата денежных средств.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
