'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const topics = [
    { id: 1, title: 'Счёт до 5', slug: 'schet-do-5', segment: '4-5-let', subject: 'matematika' },
    { id: 2, title: 'Буквы русского алфавита', slug: 'bukvy', segment: '4-5-let', subject: 'russkiy' },
    { id: 3, title: 'Счёт до 10', slug: 'schet-do-10', segment: '6-7-let', subject: 'matematika' },
    { id: 4, title: 'Английский алфавит', slug: 'alfavit', segment: '6-7-let', subject: 'angliyskiy' },
    { id: 5, title: 'Цвета на английском', slug: 'cveta', segment: '6-7-let', subject: 'angliyskiy' },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (value.length > 0) {
      const filtered = topics.filter(
        (topic) =>
          topic.title.toLowerCase().includes(value) ||
          topic.subject.toLowerCase().includes(value)
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <input
        type="text"
        placeholder="Поиск по названию или предмету..."
        value={query}
        onChange={handleSearch}
        className="w-full px-6 py-4 rounded-lg bg-[#16102A] text-white placeholder-gray-400 border border-[#2D2350] focus:border-orange transition-colors text-lg"
      />

      {/* Results Dropdown */}
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#16102A] border border-[#2D2350] rounded-lg overflow-hidden z-10">
          {results.map((topic) => (
            <Link
              key={topic.id}
              href={`/${topic.segment}/${topic.subject}/${topic.slug}`}
              className="block px-6 py-3 hover:bg-[#2D2350] transition-colors border-b border-[#2D2350] last:border-0"
            >
              <p className="font-semibold text-white">{topic.title}</p>
              <p className="text-xs text-gray-400">{topic.segment} • {topic.subject}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
