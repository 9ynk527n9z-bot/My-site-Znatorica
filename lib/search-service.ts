import {
  searchStaticIndex,
  normalizeSearchText,
  scoreTextAgainstQuery,
  type SearchEntry,
  type ScoredSearchEntry,
} from './search-index';
import { getPublishedArticles, getPublishedTopics } from './content';

// Полноценный поиск по сайту: статичный индекс (тренажёры/генераторы/темы по
// возрастам/ВПР/плакаты/разделы) + контент из БД (статьи для родителей и новые
// темы CMS из /tema/[slug]), который меняется через админку в рантайме и
// поэтому не может быть частью статичного индекса.
//
// Используется и в /api/search (клиентский дропдаун), и напрямую в /search
// (страница результатов, без лишнего похода на себя же через fetch).
export async function searchAll(rawQuery: string, limit = 60): Promise<SearchEntry[]> {
  const query = normalizeSearchText(rawQuery);
  if (query.length < 2) return [];

  const staticResults = searchStaticIndex(query, 200);

  const [articles, topics] = await Promise.all([
    getPublishedArticles().catch(() => []),
    getPublishedTopics().catch(() => []),
  ]);

  const articleResults: ScoredSearchEntry[] = articles
    .map((a) => ({
      title: a.title,
      url: `/dlya-roditeley/${a.slug}`,
      category: 'Для родителей',
      type: 'Статья' as const,
      score: Math.max(
        scoreTextAgainstQuery(query, a.title),
        scoreTextAgainstQuery(query, a.description, 0.5)
      ),
    }))
    .filter((r) => r.score > 0);

  const topicResults: ScoredSearchEntry[] = topics
    .map((t) => ({
      title: t.title,
      url: `/tema/${t.slug}`,
      category: 'Тема',
      type: 'Тема' as const,
      score: Math.max(
        scoreTextAgainstQuery(query, t.title),
        scoreTextAgainstQuery(query, t.description, 0.5)
      ),
    }))
    .filter((r) => r.score > 0);

  return [...staticResults, ...articleResults, ...topicResults]
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ score: _score, ...rest }) => rest);
}
