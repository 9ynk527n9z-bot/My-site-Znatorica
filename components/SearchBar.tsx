'use client';

import { useState } from 'react';
import Link from 'next/link';
import { searchSite, type SearchEntry } from '@/lib/search-index';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchEntry[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setResults(searchSite(value));
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <input
        type="text"
        placeholder="Поиск по темам, тренажёрам, генераторам..."
        value={query}
        onChange={handleSearch}
        className="w-full px-6 py-4 rounded-lg bg-[#2A1B4D] text-white placeholder-gray-400 border border-[#2D2350] focus:border-orange transition-colors text-lg"
      />

      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#2A1B4D] border border-[#2D2350] rounded-lg overflow-hidden z-10 text-left">
          {results.map((entry) => (
            <Link
              key={entry.url}
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
