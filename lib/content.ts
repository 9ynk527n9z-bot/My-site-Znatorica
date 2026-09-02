import { unstable_cache } from 'next/cache';
import { db } from './db';

// Слой доступа к редактируемому контенту (статьи + новые темы) из БД.
// Рендер сайта берёт данные ОТСЮДА, поэтому ручные правки в админке сразу видны.

export interface ContentSection {
  heading: string;
  body: string[];
}

export interface RelatedLink {
  title: string;
  url: string;
}

export interface ContentArticle {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tag: string;
  intro: string;
  sections: ContentSection[];
  related?: RelatedLink[];
}

export interface ContentTopic {
  slug: string;
  title: string;
  description: string;
  segment: string | null;
  subject: string | null;
  intro: string;
  sections: ContentSection[];
  related?: RelatedLink[];
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function toSections(body: any): ContentSection[] {
  if (!Array.isArray(body)) return [];
  return body
    .filter((s) => s && typeof s.heading === 'string')
    .map((s) => ({
      heading: s.heading,
      body: Array.isArray(s.body) ? s.body.filter((p: any) => typeof p === 'string') : [],
    }));
}

function toRelated(related: any): RelatedLink[] | undefined {
  if (!Array.isArray(related) || related.length === 0) return undefined;
  const links = related
    .filter((r) => r && typeof r.title === 'string' && typeof r.url === 'string')
    .map((r) => ({ title: r.title, url: r.url }));
  return links.length ? links : undefined;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// ── Статьи для родителей ──────────────────────────────────────────────

// Кеш на 60с: раньше каждый заход на главную дёргал БД просто за 3 карточки
// внизу страницы, что добавляло ~1.5с к первой загрузке. Правки в админке
// теперь видны с задержкой до минуты, а не мгновенно — разумный компромисс.
export const getPublishedArticles = unstable_cache(
  async (): Promise<ContentArticle[]> => {
    const rows = await db.contentPage.findMany({
      where: { kind: 'article', published: true },
      orderBy: { date: 'desc' },
    });
    return rows.map((r) => ({
      slug: r.slug,
      title: r.title,
      description: r.description,
      date: r.date ?? '',
      readTime: r.readTime ?? '',
      tag: r.tag ?? '',
      intro: r.intro,
      sections: toSections(r.body),
      related: toRelated(r.related),
    }));
  },
  ['published-articles'],
  { revalidate: 60 },
);

export async function getArticleBySlug(slug: string): Promise<ContentArticle | null> {
  const r = await db.contentPage.findUnique({
    where: { kind_slug: { kind: 'article', slug } },
  });
  if (!r || !r.published) return null;
  return {
    slug: r.slug,
    title: r.title,
    description: r.description,
    date: r.date ?? '',
    readTime: r.readTime ?? '',
    tag: r.tag ?? '',
    intro: r.intro,
    sections: toSections(r.body),
    related: toRelated(r.related),
  };
}

export async function getAllArticleSlugs(): Promise<string[]> {
  const rows = await db.contentPage.findMany({
    where: { kind: 'article', published: true },
    select: { slug: true },
  });
  return rows.map((r) => r.slug);
}

// ── Новые темы (созданные через админку / seed) ───────────────────────

export async function getPublishedTopics(): Promise<ContentTopic[]> {
  const rows = await db.contentPage.findMany({
    where: { kind: 'topic', published: true },
    orderBy: { updatedAt: 'desc' },
  });
  return rows.map((r) => ({
    slug: r.slug,
    title: r.title,
    description: r.description,
    segment: r.segment,
    subject: r.subject,
    intro: r.intro,
    sections: toSections(r.body),
    related: toRelated(r.related),
  }));
}

// Кешированный вариант для страниц классов: секция «Дополнительные темы»
// рендерится на каждом заходе в раздел, дёргать за ней БД каждый раз незачем.
// Ошибку глушим намеренно — если БД недоступна (например, во время сборки
// образа), раздел просто не покажется, а страница класса останется рабочей.
export const getPublishedTopicsCached = unstable_cache(
  async (): Promise<ContentTopic[]> => {
    try {
      return await getPublishedTopics();
    } catch {
      return [];
    }
  },
  ['published-topics'],
  { revalidate: 60 },
);

export async function getTopicBySlug(slug: string): Promise<ContentTopic | null> {
  const r = await db.contentPage.findUnique({
    where: { kind_slug: { kind: 'topic', slug } },
  });
  if (!r || !r.published) return null;
  return {
    slug: r.slug,
    title: r.title,
    description: r.description,
    segment: r.segment,
    subject: r.subject,
    intro: r.intro,
    sections: toSections(r.body),
    related: toRelated(r.related),
  };
}
