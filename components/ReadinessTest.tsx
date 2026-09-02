'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProduct, getEffectivePrice } from '@/lib/products';
import { trackUsage } from '@/lib/track';
import type { ReadinessConfig } from '@/lib/readiness/types';

type Stage = 'intro' | 'child' | 'parent' | 'result';

interface Scores {
  child: Record<string, { correct: number; total: number }>;
  parentPoints: number;
  parentMax: number;
}

interface Result {
  domainPercent: Record<string, number>;
  overall: number;
}

export default function ReadinessTest({ config }: { config: ReadinessConfig }) {
  const router = useRouter();
  const product = getProduct(config.productSlug)!;
  const price = getEffectivePrice(product);

  const allQuestions = useMemo(
    () => config.childDomains.flatMap((d) => d.questions.map((q) => ({ domainKey: d.key, domainLabel: d.label, q }))),
    [config]
  );

  const [stage, setStage] = useState<Stage>('intro');
  const [qIndex, setQIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [childScores, setChildScores] = useState<Record<string, { correct: number; total: number }>>({});
  const [parentAnswers, setParentAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const [owned, setOwned] = useState(false);
  const [checkedOwned, setCheckedOwned] = useState(false);
  const [buying, setBuying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCheckedOwned(true);
      return;
    }
    fetch(`/api/products/${config.productSlug}/status`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => setOwned(!!data.owned))
      .catch(() => {})
      .finally(() => setCheckedOwned(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.productSlug]);

  // Восстанавливаем результат после регистрации/оплаты (см. buyFullReport).
  useEffect(() => {
    const raw = localStorage.getItem(config.pendingKey);
    if (!raw) return;
    try {
      const pending = JSON.parse(raw);
      setResult(pending);
      setStage('result');
    } catch {
      // игнорируем битые данные
    } finally {
      localStorage.removeItem(config.pendingKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.pendingKey]);

  function startChild() {
    setStage('child');
    setQIndex(0);
    setPicked(null);
    setChildScores({});
    trackUsage(`readiness:${config.pageSlug}:start`);
  }

  function choose(i: number) {
    if (picked !== null) return;
    setPicked(i);
    const { domainKey, q } = allQuestions[qIndex];
    setChildScores((prev) => {
      const cur = prev[domainKey] || { correct: 0, total: 0 };
      return { ...prev, [domainKey]: { correct: cur.correct + (i === q.correct ? 1 : 0), total: cur.total + 1 } };
    });
  }

  function nextChildQuestion() {
    if (qIndex + 1 >= allQuestions.length) {
      setStage('parent');
      setPicked(null);
    } else {
      setQIndex((i) => i + 1);
      setPicked(null);
    }
  }

  function answerParent(id: string, value: number) {
    setParentAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function finishParent() {
    const parentPoints = config.parentQuestions.reduce((sum, pq) => sum + (parentAnswers[pq.id] ?? 0), 0);
    const scores: Scores = { child: childScores, parentPoints, parentMax: config.parentQuestions.length * 2 };

    const domainPercent: Record<string, number> = {};
    for (const d of config.childDomains) {
      const s = scores.child[d.key] || { correct: 0, total: 1 };
      domainPercent[d.key] = Math.round((100 * s.correct) / s.total);
    }
    domainPercent[config.parentDomainKey] = Math.round((100 * scores.parentPoints) / scores.parentMax);
    const overall = Math.round(
      Object.values(domainPercent).reduce((a, b) => a + b, 0) / (config.childDomains.length + 1)
    );

    const computed: Result = { domainPercent, overall };
    setResult(computed);
    setStage('result');
    trackUsage(`readiness:${config.pageSlug}:finish:${overall}`);
  }

  async function buyFullReport() {
    setError(null);
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.setItem(config.pendingKey, JSON.stringify(result));
      router.push(`/register?next=${encodeURIComponent(`/${config.pageSlug}`)}`);
      return;
    }
    try {
      setBuying(true);
      const res = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          productSlug: config.productSlug,
          returnUrl: `${window.location.origin}/${config.pageSlug}`,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Не удалось создать платёж');
      localStorage.setItem(config.pendingKey, JSON.stringify(result));
      window.location.href = data.confirmationUrl;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка. Попробуйте ещё раз.');
      setBuying(false);
    }
  }

  const current = stage === 'child' ? allQuestions[qIndex] : null;
  const domainLabels: Record<string, string> = useMemo(() => {
    const labels: Record<string, string> = { [config.parentDomainKey]: config.parentDomainLabel };
    for (const d of config.childDomains) labels[d.key] = d.label;
    return labels;
  }, [config]);

  const strongestDomain = useMemo(() => {
    if (!result) return null;
    const entries = Object.entries(result.domainPercent);
    return entries.sort((a, b) => b[1] - a[1])[0][0];
  }, [result]);

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-2xl mx-auto">
        {stage === 'intro' && (
          <div className="card text-center py-10">
            <p className="text-6xl mb-4">{config.emoji}</p>
            <h1 className="text-3xl font-bold mb-4">{config.title}</h1>
            <p className="text-white/70 mb-2">
              {allQuestions.length} заданий для ребёнка {config.introChildLine} и {config.parentQuestions.length}{' '}
              вопросов для вас — про {config.parentDomainLabel.toLowerCase()}.
            </p>
            <p className="text-white/50 text-sm mb-8">
              Это наша авторская оценка для ориентира, не медицинская или психологическая диагностика. Общий
              результат вы увидите сразу после прохождения.
            </p>
            <button onClick={startChild} className="btn-primary px-8 py-4 text-lg">
              ▶️ Начать
            </button>
          </div>
        )}

        {stage === 'child' && current && (
          <div className="card bg-white text-left">
            <div className="flex justify-between items-center mb-6 text-sm">
              <span className="text-gray-500 font-bold">
                Вопрос {qIndex + 1} / {allQuestions.length}
              </span>
              <span className="text-orange font-bold">{current.domainLabel}</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold mb-6 text-[#3a1c6e] leading-relaxed">{current.q.prompt}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {current.q.options.map((opt, i) => {
                let cls = 'border-2 border-orange text-[#3a1c6e] hover:bg-orange/10';
                if (picked !== null) {
                  if (i === current.q.correct) cls = 'bg-orange border-2 border-orange text-white';
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
              <div className="flex justify-end">
                <button onClick={nextChildQuestion} className="btn-primary px-6 py-2">
                  {qIndex + 1 >= allQuestions.length ? 'Дальше: вопросы для родителя →' : 'Дальше →'}
                </button>
              </div>
            )}
          </div>
        )}

        {stage === 'parent' && (
          <div className="card bg-white text-left">
            <h2 className="text-xl font-bold text-[#3a1c6e] mb-2">Теперь несколько вопросов для вас</h2>
            <p className="text-gray-500 text-sm mb-6">Отвечайте как есть на самом деле — не как хотелось бы.</p>
            <div className="space-y-5 mb-6">
              {config.parentQuestions.map((pq) => (
                <div key={pq.id}>
                  <p className="text-[#1a1a2e] font-bold mb-2">{pq.prompt}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { v: 2, label: 'Да' },
                      { v: 1, label: 'Иногда' },
                      { v: 0, label: 'Пока нет' },
                    ].map((opt) => (
                      <button
                        key={opt.v}
                        onClick={() => answerParent(pq.id, opt.v)}
                        className={`py-2 rounded-lg font-bold text-sm border-2 transition-colors ${
                          parentAnswers[pq.id] === opt.v
                            ? 'bg-orange border-orange text-white'
                            : 'border-gray-200 text-gray-500 hover:border-orange'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={finishParent}
              disabled={Object.keys(parentAnswers).length < config.parentQuestions.length}
              className="btn-primary px-6 py-3 w-full disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Показать результат
            </button>
          </div>
        )}

        {stage === 'result' && result && (
          <div className="space-y-6">
            <div className="card bg-white text-center py-8">
              <p className="text-6xl font-black text-orange mb-2">{result.overall}%</p>
              <p className="text-xl font-bold text-[#3a1c6e] mb-1">{config.overallVerdict(result.overall)}</p>
              {strongestDomain && (
                <p className="text-gray-500 text-sm">
                  Сильнее всего у вас получается: <b>{domainLabels[strongestDomain]}</b>
                </p>
              )}
            </div>

            {checkedOwned && owned ? (
              <div className="space-y-4">
                {Object.entries(result.domainPercent).map(([domainKey, percent]) => (
                  <div key={domainKey} className="card bg-white text-left">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-[#3a1c6e]">{domainLabels[domainKey]}</h3>
                      <span className="text-orange font-bold">{percent}%</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {config.recommendationFor(domainKey, percent)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card text-center py-8">
                <p className="text-lg font-bold mb-2">🔒 Полный разбор по каждому направлению</p>
                <p className="text-white/60 text-sm mb-6">
                  Подробный результат по всем направлениям и конкретные рекомендации — {price} ₽, разовая покупка.
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
