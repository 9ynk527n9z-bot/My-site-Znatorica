'use client';

import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { QUESTIONS, STYLES, computeResult, type ParentStyle } from '@/lib/parent-style-quiz';
import { getProduct, getEffectivePrice } from '@/lib/products';
import { trackUsage } from '@/lib/track';

const PRODUCT_SLUG = 'kakoy-ty-roditel';
const PENDING_KEY = 'znatorika_pending_parent_style';

type Stage = 'intro' | 'quiz' | 'result';

interface Result {
  winner: ParentStyle;
  percentByStyle: Record<ParentStyle, number>;
}

export default function ParentStyleQuizPage() {
  return (
    <Suspense fallback={null}>
      <ParentStyleQuiz />
    </Suspense>
  );
}

function ParentStyleQuiz() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sharedStyleParam = searchParams.get('r');
  const sharedStyle: ParentStyle | null =
    sharedStyleParam && sharedStyleParam in STYLES ? (sharedStyleParam as ParentStyle) : null;
  const product = getProduct(PRODUCT_SLUG)!;
  const price = getEffectivePrice(product);

  const [stage, setStage] = useState<Stage>('intro');
  const [qIndex, setQIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [, setCounts] = useState<Record<ParentStyle, number>>({ opora: 0, kapitan: 0, drug: 0, zhongler: 0 });
  const [result, setResult] = useState<Result | null>(null);

  const [owned, setOwned] = useState(false);
  const [checkedOwned, setCheckedOwned] = useState(false);
  const [buying, setBuying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCheckedOwned(true);
      return;
    }
    fetch(`/api/products/${PRODUCT_SLUG}/status`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => setOwned(!!data.owned))
      .catch(() => {})
      .finally(() => setCheckedOwned(true));
  }, []);

  useEffect(() => {
    const raw = localStorage.getItem(PENDING_KEY);
    if (!raw) return;
    try {
      const pending = JSON.parse(raw);
      setResult(pending);
      setStage('result');
    } catch {
      // игнорируем битые данные
    } finally {
      localStorage.removeItem(PENDING_KEY);
    }
  }, []);

  function start() {
    setStage('quiz');
    setQIndex(0);
    setPicked(null);
    setCounts({ opora: 0, kapitan: 0, drug: 0, zhongler: 0 });
    trackUsage('parent-style:start');
  }

  function choose(i: number) {
    if (picked !== null) return;
    setPicked(i);
    const style = QUESTIONS[qIndex].options[i].style;
    setCounts((prev) => ({ ...prev, [style]: prev[style] + 1 }));
  }

  function next() {
    if (qIndex + 1 >= QUESTIONS.length) {
      setCounts((finalCounts) => {
        const computed = computeResult(finalCounts);
        setResult(computed);
        setStage('result');
        trackUsage(`parent-style:finish:${computed.winner}`);
        return finalCounts;
      });
    } else {
      setQIndex((i) => i + 1);
      setPicked(null);
    }
  }

  async function buyFullReport() {
    setError(null);
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.setItem(PENDING_KEY, JSON.stringify(result));
      router.push(`/register?next=${encodeURIComponent('/kakoy-ty-roditel')}`);
      return;
    }
    try {
      setBuying(true);
      const res = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          productSlug: PRODUCT_SLUG,
          returnUrl: `${window.location.origin}/kakoy-ty-roditel`,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Не удалось создать платёж');
      localStorage.setItem(PENDING_KEY, JSON.stringify(result));
      window.location.href = data.confirmationUrl;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка. Попробуйте ещё раз.');
      setBuying(false);
    }
  }

  const current = stage === 'quiz' ? QUESTIONS[qIndex] : null;
  const winnerInfo = result ? STYLES[result.winner] : null;

  const shareUrl = result ? `${typeof window !== 'undefined' ? window.location.origin : ''}/kakoy-ty-roditel?r=${result.winner}` : '';
  const shareText = winnerInfo
    ? `Я — «${winnerInfo.title}»! А какой ты родитель? Пройди тест на Знаторике (znatorica.ru):`
    : '';

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-2xl mx-auto">
        {stage === 'intro' && (
          <div className="card text-center py-10">
            {sharedStyle && (
              <div className="bg-orange/10 border border-orange/30 rounded-lg px-4 py-3 mb-6 text-left flex items-center gap-3">
                <span className="text-3xl flex-shrink-0">{STYLES[sharedStyle].emoji}</span>
                <p className="text-sm text-white/80">
                  Друг прошёл тест и получил стиль «{STYLES[sharedStyle].title}». Пройдите свой — увидите сразу.
                </p>
              </div>
            )}
            <p className="text-6xl mb-4">🧭</p>
            <h1 className="text-3xl font-bold mb-4">Какой ты родитель?</h1>
            <p className="text-white/70 mb-2">
              {QUESTIONS.length} бытовых ситуаций — выбирайте, как поступили бы вы на самом деле, а не как «правильно».
            </p>
            <p className="text-white/50 text-sm mb-8">
              Это наша авторская оценка для ориентира, не психологическая диагностика. Общий результат вы увидите
              сразу после прохождения.
            </p>
            <button onClick={start} className="btn-primary px-8 py-4 text-lg">
              ▶️ Начать
            </button>
          </div>
        )}

        {stage === 'quiz' && current && (
          <div className="card bg-white text-left">
            <div className="flex justify-between items-center mb-6 text-sm">
              <span className="text-gray-500 font-bold">
                Вопрос {qIndex + 1} / {QUESTIONS.length}
              </span>
            </div>
            <p className="text-xl sm:text-2xl font-bold mb-6 text-[#3a1c6e] leading-relaxed">{current.prompt}</p>
            <div className="flex flex-col gap-3 mb-6">
              {current.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  disabled={picked !== null}
                  className={`px-4 py-3 rounded-lg font-bold text-left transition-colors border-2 ${
                    picked === i
                      ? 'bg-orange border-orange text-white'
                      : picked !== null
                        ? 'border-gray-200 text-gray-400'
                        : 'border-orange text-[#3a1c6e] hover:bg-orange/10'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
            {picked !== null && (
              <div className="flex justify-end">
                <button onClick={next} className="btn-primary px-6 py-2">
                  {qIndex + 1 >= QUESTIONS.length ? 'Показать результат' : 'Дальше →'}
                </button>
              </div>
            )}
          </div>
        )}

        {stage === 'result' && result && winnerInfo && (
          <div className="space-y-6">
            <div className="card bg-white text-center py-8">
              <p className="text-6xl mb-2">{winnerInfo.emoji}</p>
              <p className="text-xl font-bold text-[#3a1c6e] mb-1">Ваш подход к воспитанию: «{winnerInfo.title}»</p>
              <p className="text-gray-600 text-sm max-w-md mx-auto mb-5">{winnerInfo.shortDescription}</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-gray-400 text-xs">Поделиться:</span>
                <a
                  href={`https://vk.com/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackUsage('parent-style:share:vk')}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-lg transition-colors"
                  title="Поделиться ВКонтакте"
                >
                  🔵
                </a>
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackUsage('parent-style:share:telegram')}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-lg transition-colors"
                  title="Поделиться в Telegram"
                >
                  ✈️
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${shareText} ${shareUrl}`).catch(() => {});
                    trackUsage('parent-style:share:copy');
                    setLinkCopied(true);
                    setTimeout(() => setLinkCopied(false), 2000);
                  }}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-lg transition-colors"
                  title="Скопировать ссылку"
                >
                  {linkCopied ? '✅' : '🔗'}
                </button>
              </div>
            </div>

            {checkedOwned && owned ? (
              <div className="space-y-4">
                <div className="card bg-white text-left">
                  <h3 className="font-bold text-[#3a1c6e] mb-3">Как распределились ваши ответы</h3>
                  <div className="space-y-2">
                    {(Object.values(STYLES) as typeof winnerInfo[]).map((s) => (
                      <div key={s.key} className="flex items-center gap-3">
                        <span className="text-xl">{s.emoji}</span>
                        <span className="text-gray-700 text-sm w-40 flex-shrink-0">{s.title}</span>
                        <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                          <div
                            className="bg-orange h-full rounded-full"
                            style={{ width: `${result.percentByStyle[s.key]}%` }}
                          />
                        </div>
                        <span className="text-orange font-bold text-sm w-10 text-right">
                          {result.percentByStyle[s.key]}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card bg-white text-left">
                  <h3 className="font-bold text-[#3a1c6e] mb-2">💪 Сильные стороны</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{winnerInfo.strengths}</p>
                </div>
                <div className="card bg-white text-left">
                  <h3 className="font-bold text-[#3a1c6e] mb-2">👀 На что обратить внимание</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{winnerInfo.watchOutFor}</p>
                </div>
                <div className="card bg-white text-left">
                  <h3 className="font-bold text-[#3a1c6e] mb-2">✅ Что можно попробовать</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{winnerInfo.tips}</p>
                </div>
              </div>
            ) : (
              <div className="card text-center py-8">
                <p className="text-lg font-bold mb-2">🔒 Полный разбор вашего стиля</p>
                <p className="text-white/60 text-sm mb-6">
                  Распределение по всем 4 стилям, сильные стороны, на что обратить внимание и конкретные советы —
                  {' '}{price} ₽, разовая покупка.
                </p>
                {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
                <button onClick={buyFullReport} disabled={buying} className="btn-primary px-8 py-4 disabled:opacity-50">
                  {buying ? 'Обработка…' : `Открыть полный разбор — ${price} ₽`}
                </button>
                <p className="text-center text-xs text-white/40 mt-4">
                  Нажимая кнопку оплаты, вы принимаете условия{' '}
                  <Link href="/oferta" className="text-orange hover:underline">Публичной оферты</Link>.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
