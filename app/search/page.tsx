import Link from 'next/link';
import { searchAll } from '@/lib/search-service';
import type { SearchEntry, SearchResultType } from '@/lib/search-index';

// Результаты зависят от БД (статьи, темы CMS) и от строки запроса — не кешируем.
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Поиск по сайту',
  robots: { index: false, follow: true },
};

const TYPE_ORDER: SearchResultType[] = ['Тема', 'Тренажёр', 'Генератор', 'ВПР', 'МЦКО', 'Плакат', 'Статья', 'Раздел'];

const TYPE_LABELS: Record<SearchResultType, string> = {
  Тема: 'Темы по возрастам',
  Тренажёр: 'Тренажёры',
  Генератор: 'Генераторы',
  ВПР: 'Подготовка к ВПР',
  МЦКО: 'Подготовка к МЦКО',
  Плакат: 'Плакаты',
  Статья: 'Статьи для родителей',
  Раздел: 'Разделы сайта',
};

function groupByType(results: SearchEntry[]): { type: SearchResultType; items: SearchEntry[] }[] {
  const map = new Map<SearchResultType, SearchEntry[]>();
  for (const r of results) {
    const list = map.get(r.type) ?? [];
    list.push(r);
    map.set(r.type, list);
  }
  return TYPE_ORDER.filter((t) => map.has(t)).map((t) => ({ type: t, items: map.get(t) as SearchEntry[] }));
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = (searchParams.q ?? '').trim();
  const results = q.length >= 2 ? await searchAll(q, 100) : [];
  const groups = groupByType(results);

  return (
    <div className="bg-black min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">🔍 Результаты поиска</h1>

        {q.length >= 2 ? (
          <p className="text-white/70 mb-10">
            По запросу «{q}» найдено: {results.length}
          </p>
        ) : q.length > 0 ? (
          <p className="text-white/70 mb-10">Введите минимум 2 символа для поиска.</p>
        ) : (
          <p className="text-white/70 mb-10">
            Введите запрос, чтобы найти тренажёры, темы, статьи для родителей и другие материалы сайта.
          </p>
        )}

        {q.length >= 2 && results.length === 0 && (
          <div className="card text-center text-white/70">
            По запросу «{q}» ничего не найдено, попробуйте другое слово.
          </div>
        )}

        <div className="space-y-12">
          {groups.map((group) => (
            <section key={group.type}>
              <h2 className="text-xl font-bold mb-4 text-orange">
                {TYPE_LABELS[group.type]}{' '}
                <span className="text-white/40 text-base font-normal">({group.items.length})</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.items.map((item) => (
                  <Link
                    key={`${item.type}-${item.url}-${item.title}`}
                    href={item.url}
                    className="card block hover:border-white/50 transition-colors group !p-4"
                  >
                    <p className="font-semibold text-white group-hover:text-orange">{item.title}</p>
                    <p className="text-xs text-white/50 mt-1">{item.category}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
