'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSiteSearch } from '@/lib/useSiteSearch';

export default function SearchBar() {
  const router = useRouter();
  const { query, setQuery, results, setResults } = useSiteSearch(2, 300, 8);

  function goToSearchPage() {
    const q = query.trim();
    if (!q) return;
    setResults([]);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          goToSearchPage();
        }}
      >
        <input
          type="text"
          placeholder="Поиск по темам, тренажёрам, генераторам..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-6 py-4 rounded-lg bg-[#2A1B4D] text-white placeholder-gray-400 border border-[#2D2350] focus:border-orange transition-colors text-lg"
        />
      </form>

      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#2A1B4D] border border-[#2D2350] rounded-lg overflow-hidden z-10 text-left">
          {results.map((entry) => (
            <Link
              key={`${entry.type}-${entry.url}-${entry.title}`}
              href={entry.url}
              onClick={() => {
                setQuery('');
                setResults([]);
              }}
              className="block px-6 py-3 hover:bg-[#2D2350] transition-colors border-b border-[#2D2350] last:border-0"
            >
              <p className="font-semibold text-white">{entry.title}</p>
              <p className="text-xs text-gray-400">{entry.category}</p>
            </Link>
          ))}
          <button
            type="button"
            onClick={goToSearchPage}
            className="block w-full text-center px-6 py-3 text-orange font-semibold hover:bg-[#2D2350] transition-colors"
          >
            Показать все результаты →
          </button>
        </div>
      )}

      {query.trim().length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-4 text-gray-400 text-sm z-10">
          Ничего не найдено
        </div>
      )}
    </div>
  );
}
