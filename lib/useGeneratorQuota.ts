'use client';

import { useCallback, useEffect, useState } from 'react';

interface QuotaState {
  remaining: number;
  limit: number;
  unlimited: boolean;
  isSubscriber: boolean;
  loading: boolean;
}

const INITIAL: QuotaState = { remaining: Infinity, limit: 5, unlimited: false, isSubscriber: false, loading: true };

// Общий хук для всех генераторов: подтягивает дневной лимит бесплатных
// генераций (5/день суммарно по всем генераторам, без лимита для подписчиков —
// см. app/api/generator/quota).
// guard() — вызывать перед фактической генерацией; false означает «лимит исчерпан,
// генерацию показывать нельзя», в этом случае страница должна показать баннер
// (см. components/GeneratorQuotaBanner.tsx) вместо результата.
export function useGeneratorQuota() {
  const [state, setState] = useState<QuotaState>(INITIAL);

  const refresh = useCallback(async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    try {
      const res = await fetch('/api/generator/quota', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) {
        setState((s) => ({ ...s, loading: false }));
        return;
      }
      const data = await res.json();
      setState({
        remaining: data.unlimited ? Infinity : data.remaining,
        limit: data.limit,
        unlimited: !!data.unlimited,
        isSubscriber: !!data.isSubscriber,
        loading: false,
      });
    } catch {
      // Сеть недоступна — не блокируем генерацию из-за сбоя проверки.
      setState((s) => ({ ...s, loading: false }));
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Пока лимит ещё грузится — не блокируем (fail-open), чтобы не создавать
  // ложное ощущение «сайт сломан» при медленной сети.
  function guard(): boolean {
    if (state.loading || state.unlimited) return true;
    return state.remaining > 0;
  }

  // Вызывать сразу после успешной генерации вместо refresh(): уменьшает
  // remaining локально, не дожидаясь ответа сервера. trackUsage() пишет
  // счётчик в БД асинхронно (fire-and-forget) — если сразу дёрнуть refresh(),
  // GET может обогнать ещё не закоммиченный POST и показать старое число.
  // Оптимистичное уменьшение показывает верный счётчик мгновенно, а фоновый
  // refresh() через секунду подтверждает/поправляет его с сервера.
  function consume() {
    setState((s) => (s.unlimited ? s : { ...s, remaining: Math.max(0, s.remaining - 1) }));
    setTimeout(refresh, 1000);
  }

  return { ...state, guard, refresh, consume };
}
