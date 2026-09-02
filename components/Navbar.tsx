'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useSiteSearch } from '@/lib/useSiteSearch';
import type { SearchEntry } from '@/lib/search-index';

function SearchResults({
  results,
  onNavigate,
  onShowAll,
}: {
  results: SearchEntry[];
  onNavigate: () => void;
  onShowAll: () => void;
}) {
  if (results.length === 0) return null;
  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-[#3a1c6e]/95 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden z-50 max-h-96 overflow-y-auto">
      {results.map((entry) => (
        <Link
          key={`${entry.type}-${entry.url}-${entry.title}`}
          href={entry.url}
          onClick={onNavigate}
          className="block px-4 py-3 hover:bg-white/15 transition-colors border-b border-white/10 last:border-0"
        >
          <p className="font-semibold text-white text-sm">{entry.title}</p>
          <p className="text-xs text-gray-400">{entry.category}</p>
        </Link>
      ))}
      <button
        type="button"
        onClick={onShowAll}
        className="block w-full text-center px-4 py-3 text-orange font-semibold text-sm hover:bg-white/15 transition-colors"
      >
        Показать все результаты →
      </button>
    </div>
  );
}

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { query, setQuery, results, setResults } = useSiteSearch(2, 300, 8);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const searchWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target as Node)) {
        setResults([]);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setResults]);

  function clearSearch() {
    setQuery('');
    setResults([]);
    setMobileSearchOpen(false);
  }

  function goToSearchPage() {
    const q = query.trim();
    if (!q) return;
    setResults([]);
    setMobileSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      goToSearchPage();
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="px-6 py-3 flex items-center justify-between gap-4">
        {/* Название (логотип убран) */}
        <Link
          href="/"
          className="font-black text-3xl md:text-4xl bg-gradient-to-r from-orange to-[#f72585] bg-clip-text text-transparent hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          Знаторика
        </Link>

        {/* Search (Desktop) */}
        <div ref={searchWrapRef} className="hidden md:block flex-1 mx-12 relative">
          <input
            type="text"
            placeholder="Поиск по темам, тренажёрам, генераторам..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="w-full px-4 py-2 rounded-lg bg-white/15 backdrop-blur-md text-white placeholder-white/60 border border-white/25 focus:border-orange transition-colors"
          />
          <SearchResults results={results} onNavigate={clearSearch} onShowAll={goToSearchPage} />
        </div>

        {/* Search icon (Mobile) */}
        <button
          onClick={() => setMobileSearchOpen((v) => !v)}
          className="md:hidden text-gray-400 hover:text-white transition-colors text-xl"
          aria-label="Поиск"
        >
          🔍
        </button>

        {/* Auth Links */}
        <div className="flex gap-4 flex-shrink-0">
          {isLoggedIn ? (
            <Link href="/account" className="btn-primary px-4 py-2 text-base">
              👤 Кабинет
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-white/80 hover:text-white transition-colors hidden sm:flex items-center"
              >
                Вход
              </Link>
              <Link href="/register" className="btn-primary px-4 py-2 text-base">
                Регистрация
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Search (Mobile, collapsible) */}
      {mobileSearchOpen && (
        <div className="md:hidden px-6 pb-4 relative">
          <input
            type="text"
            autoFocus
            placeholder="Поиск по темам, тренажёрам, генераторам..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="w-full px-4 py-2 rounded-lg bg-white/15 backdrop-blur-md text-white placeholder-white/60 border border-white/25 focus:border-orange transition-colors"
          />
          <SearchResults results={results} onNavigate={clearSearch} onShowAll={goToSearchPage} />
        </div>
      )}
    </nav>
  );
}
