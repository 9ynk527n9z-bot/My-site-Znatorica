import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Природа — теория и тренажёр для 2 класса',
  description: 'Экосистемы и животные в программе окружающего мира для 2 класса.',
  alternates: { canonical: '/2-klass/okruzhayushchiy/priroda' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '2 класс', url: '/2-klass' },
  { name: 'Окружающий мир', url: '/2-klass/okruzhayushchiy' },
  { name: 'Природа', url: '/2-klass/okruzhayushchiy/priroda' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Природа',
  description: 'Экосистемы и животные для 2 класса',
  url: '/2-klass/okruzhayushchiy/priroda',
  educationalLevel: '2 класс начальной школы',
});

export default function PrirodaPage() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#0A0812] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/2-klass" className="text-orange hover:underline">2 класс</Link>
          <span className="text-gray-400">/</span>
          <Link href="/2-klass/okruzhayushchiy" className="text-orange hover:underline">Окружающий мир</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Природа</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Природа</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#16102A] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Живая и неживая природа</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Что такое живая природа?</h3>
              <p className="text-gray-300">
                Живая природа — это всё, что растёт, дышит, питается и размножается: растения, животные, грибы, люди.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Что такое неживая природа?</h3>
              <p className="text-gray-300">
                Неживая природа — это то, что не растёт и не размножается: камни, вода, воздух, солнце.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-green-500/20 p-4 rounded">
                  <p className="font-bold text-green-400 mb-2">Живая природа</p>
                  <p className="text-gray-300 text-sm">дерево, волк, гриб, бабочка</p>
                </div>
                <div className="bg-blue-500/20 p-4 rounded">
                  <p className="font-bold text-blue-400 mb-2">Неживая природа</p>
                  <p className="text-gray-300 text-sm">камень, вода, облако, звезда</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Все связаны друг с другом</h3>
              <p className="text-gray-300">
                Растения нужны животным для еды, вода нужна всем живым существам. В природе всё взаимосвязано.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Готов тренироваться?</h3>
          <p className="text-gray-300 mb-6">Нажми на кнопку ниже и начни интерактивный тренажер</p>
          <button className="btn-primary text-lg px-8 py-4">🎮 Открыть тренажер</button>
        </div>
      </div>
    </div>
  );
}
