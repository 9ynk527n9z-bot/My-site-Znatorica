import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug } from '@/lib/content';
import { breadcrumbJsonLd, articleJsonLd } from '@/lib/seo';

// Статья берётся из БД (правится через админку) — рендерим динамически.
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/dlya-roditeley/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      publishedTime: article.date,
    },
  };
}

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
  ];
  return `${day} ${months[month - 1]} ${year}`;
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Главная', url: '/' },
    { name: 'Для родителей', url: '/dlya-roditeley' },
    { name: article.title, url: `/dlya-roditeley/${article.slug}` },
  ]);

  const articleLd = articleJsonLd({
    title: article.title,
    description: article.description,
    url: `/dlya-roditeley/${article.slug}`,
    datePublished: article.date,
  });

  return (
    <div className="bg-black min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      {/* Breadcrumbs */}
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-3xl mx-auto flex gap-2 text-sm flex-wrap">
          <Link href="/" className="text-orange hover:underline">
            Главная
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/dlya-roditeley" className="text-orange hover:underline">
            Для родителей
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">{article.title}</span>
        </div>
      </div>

      <article className="max-w-3xl mx-auto py-12 px-6">
        <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
          <span className="bg-orange/20 text-orange px-2 py-1 rounded font-bold">
            {article.tag}
          </span>
          <span>{formatDate(article.date)}</span>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>

        <h1 className="text-4xl font-bold mb-6">{article.title}</h1>

        <p className="text-lg text-gray-300 mb-10">{article.intro}</p>

        <div className="space-y-10">
          {article.sections.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-2xl font-bold mb-4 text-orange">{section.heading}</h2>
              <div className="space-y-4">
                {section.body.map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-gray-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {article.related && article.related.length > 0 && (
          <div className="mt-12 bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h3 className="font-bold mb-4">Смотрите также</h3>
            <ul className="space-y-2">
              {article.related.map((link) => (
                <li key={link.url}>
                  <Link href={link.url} className="text-orange hover:underline">
                    {link.title} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/dlya-roditeley" className="text-orange font-bold hover:underline">
            ← Все статьи для родителей
          </Link>
        </div>
      </article>
    </div>
  );
}
