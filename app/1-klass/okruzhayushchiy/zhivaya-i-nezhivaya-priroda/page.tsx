import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Живая и неживая природа — окружающий мир для 1 класса',
  description: 'Учимся различать живую и неживую природу и понимать главные признаки живого.',
  alternates: { canonical: '/1-klass/okruzhayushchiy/zhivaya-i-nezhivaya-priroda' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '1 класс', url: '/1-klass' },
  { name: 'Окружающий мир', url: '/1-klass' },
  { name: 'Живая и неживая природа', url: '/1-klass/okruzhayushchiy/zhivaya-i-nezhivaya-priroda' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Живая и неживая природа',
  description: 'Различение объектов живой и неживой природы',
  url: '/1-klass/okruzhayushchiy/zhivaya-i-nezhivaya-priroda',
  educationalLevel: '1 класс начальной школы',
});

export default function ZhivayaNezhivayaPrirodaPage() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/1-klass" className="text-orange hover:underline">1 класс</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Живая и неживая природа</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Живая и неживая природа</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Как отличить живое от неживого</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Главные признаки живого</h3>
              <p className="text-gray-300 mb-3">Живые существа умеют:</p>
              <div className="grid grid-cols-2 gap-2 text-base">
                <div className="p-3 bg-black/40 rounded">🌱 расти</div>
                <div className="p-3 bg-black/40 rounded">🍽️ питаться</div>
                <div className="p-3 bg-black/40 rounded">💨 дышать</div>
                <div className="p-3 bg-black/40 rounded">👶 давать потомство</div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">К живой природе относятся</h3>
              <p className="text-gray-300">Люди, животные, растения, грибы.</p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">К неживой природе относятся</h3>
              <p className="text-gray-300">
                Камни, вода, воздух, солнце, звёзды — они не растут, не питаются и не дышат так, как живые существа.
              </p>
            </div>

            <div className="p-4 bg-orange/10 rounded">
              <p className="mb-1">🌳 Дерево — живая природа: оно растёт, дышит, питается через корни.</p>
              <p>🪨 Камень — неживая природа: он не растёт и не питается, даже если лежит очень долго.</p>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Гриб растёт в лесу и питается. Это живая или неживая природа?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Живая природа.</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Река течёт, но не растёт и не питается. Это живая или неживая природа?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">
                  Неживая природа — движение воды не то же самое, что рост и питание живых существ.
                </p>
              </details>
            </div>
          </div>
        </div>

        <TopicQuiz topic="1-klass/okruzhayushchiy/zhivaya-i-nezhivaya-priroda" />
      </div>
    </div>
  );
}
