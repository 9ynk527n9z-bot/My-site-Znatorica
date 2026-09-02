'use client';

import { useCallback, useEffect, useState } from 'react';

interface TrainerQuotaState {
  remaining: number;
  limit: number;
  unlimited: boolean;
  registered: boolean;
  loading: boolean;
}

const INITIAL: TrainerQuotaState = {
  remaining: Infinity,
  limit: 3,
  unlimited: false,
  registered: false,
  loading: true,
};

// Хук для TrainerGate/TrainerQuotaBanner: дневной лимит тренажёров (см.
// app/api/trainer/quota). Незарегистрированным — 3/день по сессии, зарегистрированным
// без подписки — 20/день, подписчикам PRO и «старожилам» (регистрация до введения
// лимита) — без ограничений. `registered` нужен, чтобы показать правильный призыв:
// гостю — зарегистрироваться, зарегистрированному — оформить PRO.
export function useTrainerQuota() {
  const [state, setState] = useState<TrainerQuotaState>(INITIAL);

  const refresh = useCallback(async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    try {
      const res = await fetch('/api/trainer/quota', {
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
        registered: !!data.registered,
        loading: false,
      });
    } catch {
      setState((s) => ({ ...s, loading: false }));
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  function guard(): boolean {
    if (state.loading || state.unlimited) return true;
    return state.remaining > 0;
  }

  function consume() {
    setState((s) => (s.unlimited ? s : { ...s, remaining: Math.max(0, s.remaining - 1) }));
    setTimeout(refresh, 1000);
  }

  return { ...state, guard, refresh, consume };
}
