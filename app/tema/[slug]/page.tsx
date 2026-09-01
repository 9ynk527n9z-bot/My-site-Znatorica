import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTopicBySlug } from '@/lib/content';
import { breadcrumbJsonLd } from '@/lib/seo';

// Новые темы берутся из БД (создаются/правятся через админку) — рендерим динамически.
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const topic = await getTopicBySlug(params.slug);
  if (!topic) return {};
  return {
    title: topic.title,
    description: topic.description,
    alternates: { canonical: `/tema/${topic.slug}` },
  };
}

export default async function TopicPage({ params }: { params: { slug: string } }) {
  const topic = await getTopicBySlug(params.slug);
  if (!topic) notFound();

  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Главная', url: '/' },
    { name: topic.title, url: `/tema/${topic.slug}` },
  ]);

  return (
    <div className="bg-black min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-3xl mx-auto flex gap-2 text-sm flex-wrap">
          <Link href="/" className="text-orange hover:underline">
            Главная
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">{topic.title}</span>
        </div>
      </div>

      <article className="max-w-3xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-6">{topic.title}</h1>

        {topic.intro && <p className="text-lg text-gray-300 mb-10">{topic.intro}</p>}

        <div className="space-y-10">
          {topic.sections.map((section, idx) => (
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

        {topic.related && topic.related.length > 0 && (
          <div className="mt-12 bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6">
            <h3 className="font-bold mb-4">Смотрите также</h3>
            <ul className="space-y-2">
              {topic.related.map((link) => (
                <li key={link.url}>
                  <Link href={link.url} className="text-orange hover:underline">
                    {link.title} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </div>
  );
}
