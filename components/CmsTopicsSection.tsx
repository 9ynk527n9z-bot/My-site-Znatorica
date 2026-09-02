import Link from 'next/link';
import { getPublishedTopicsCached } from '@/lib/content';

// Темы, созданные через админку (/admin/content), живут в БД и не попадают в
// свёрстанные вручную списки на страницах классов. Этот серверный компонент
// подмешивает их в конец страницы своего сегмента, чтобы на них вели
// внутренние ссылки, а не только sitemap и поиск.
export default async function CmsTopicsSection({ segment }: { segment: string }) {
  const topics = (await getPublishedTopicsCached()).filter((t) => t.segment === segment);
  if (topics.length === 0) return null;

  return (
    <section className="bg-black border-t border-[#2D2350] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">📗 Дополнительные темы</h2>
        <p className="text-gray-400 mb-8">
          {topics.length === 1 ? 'Ещё одна тема' : 'Ещё темы'} этого раздела
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((t) => (
            <Link
              key={t.slug}
              href={`/tema/${t.slug}`}
              className="block bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-6 hover:border-orange transition-colors"
            >
              <h3 className="font-bold text-white mb-1">{t.title}</h3>
              <p className="text-gray-400 text-sm">{t.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
