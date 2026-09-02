'use client';

import { useEffect, useRef, useState } from 'react';
import type { SearchEntry } from './search-index';

// Общий хук для дропдаунов поиска (SearchBar на главной, поиск в Navbar):
// дебаунсит ввод и запрашивает /api/search, который объединяет статичный
// индекс с контентом из БД (статьи, темы CMS).
export function useSiteSearch(minLength = 2, debounceMs = 300, limit = 8) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchEntry[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const q = query.trim();
    if (q.length < minLength) {
      setResults([]);
      return;
    }

    const requestId = ++requestIdRef.current;
    timerRef.current = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(q)}&limit=${limit}`)
        .then((res) => (res.ok ? res.json() : { results: [] }))
        .then((data: { results?: SearchEntry[] }) => {
          if (requestIdRef.current === requestId) {
            setResults(data.results ?? []);
          }
        })
        .catch(() => {
          if (requestIdRef.current === requestId) setResults([]);
        });
    }, debounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query, minLength, debounceMs, limit]);

  return { query, setQuery, results, setResults };
}
