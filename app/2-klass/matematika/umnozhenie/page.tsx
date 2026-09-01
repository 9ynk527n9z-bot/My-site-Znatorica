import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Умножение — теория и тренажёр для 2 класса',
  description: 'Основы умножения и таблица умножения для второклассников.',
  alternates: { canonical: '/2-klass/matematika/umnozhenie' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '2 класс', url: '/2-klass' },
  { name: 'Математика', url: '/2-klass/matematika' },
  { name: 'Умножение', url: '/2-klass/matematika/umnozhenie' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Умножение',
  description: 'Основы умножения для 2 класса',
  url: '/2-klass/matematika/umnozhenie',
  educationalLevel: '2 класс начальной школы',
});

export default function UmnozheniePage() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/2-klass" className="text-orange hover:underline">2 класс</Link>
          <span className="text-gray-400">/</span>
          <Link href="/2-klass/matematika" className="text-orange hover:underline">Математика</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Умножение</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Умножение</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Что такое умножение?</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Умножение — это многократное сложение</h3>
              <p className="text-gray-300">
                3 × 4 означает «взять число 3 четыре раза»: 3 + 3 + 3 + 3 = 12. Умножение помогает считать быстрее сложения.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded text-2xl font-bold text-center">
                3 × 4 = 12
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Учим таблицу умножения</h3>
              <p className="text-gray-300 mb-4">
                Начни с таблицы умножения на 2 и 3 — они проще всего запоминаются.
              </p>
              <div className="grid grid-cols-2 gap-3 text-lg font-bold">
                <span className="bg-orange/20 px-4 py-2 rounded text-center">2 × 2 = 4</span>
                <span className="bg-orange/20 px-4 py-2 rounded text-center">2 × 5 = 10</span>
                <span className="bg-orange/20 px-4 py-2 rounded text-center">3 × 3 = 9</span>
                <span className="bg-orange/20 px-4 py-2 rounded text-center">3 × 4 = 12</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">От перестановки множителей сумма не меняется</h3>
              <p className="text-gray-300">
                2 × 3 = 6 и 3 × 2 = 6 — результат одинаковый. Это правило помогает запомнить таблицу умножения быстрее.
              </p>
            </div>
          </div>
        </div>

        <TopicQuiz topic="2-klass/matematika/umnozhenie" />
      </div>
    </div>
  );
}
