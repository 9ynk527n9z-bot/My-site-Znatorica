import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Сложение — теория и тренажёр для детей 6–7 лет',
  description: 'Первые примеры на сложение чисел в пределах 20. Для детей 6-7 лет.',
  alternates: { canonical: '/6-7-let/matematika/slozhenie' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Дошкольники 6–7', url: '/6-7-let' },
  { name: 'Математика', url: '/6-7-let/matematika' },
  { name: 'Сложение', url: '/6-7-let/matematika/slozhenie' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Сложение',
  description: 'Первые примеры на сложение для детей 6-7 лет',
  url: '/6-7-let/matematika/slozhenie',
  educationalLevel: 'Дошкольное образование, 6–7 лет',
});

export default function SlozheniePage() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/6-7-let" className="text-orange hover:underline">Дошкольники 6–7</Link>
          <span className="text-gray-400">/</span>
          <Link href="/6-7-let/matematika" className="text-orange hover:underline">Математика</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Сложение</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Сложение</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Как складывать числа?</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Что значит «сложить»?</h3>
              <p className="text-gray-300">
                Сложение — это когда мы объединяем два числа в одно, большее. Знак «+» означает «прибавить».
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded text-2xl font-bold text-center">
                2 + 3 = 5
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Считаем на пальцах или предметах</h3>
              <p className="text-gray-300">
                Возьми 2 яблока, добавь ещё 3 — сосчитай, сколько получилось всего. Так проще понять, что значит «плюс».
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: Тренируйся с маленькими числами</h3>
              <p className="text-gray-300 mb-4">Начни с простых примеров, где сумма не больше 10, потом переходи к большим числам.</p>
              <div className="grid grid-cols-3 gap-3 text-xl font-bold">
                <span className="bg-orange/20 px-4 py-3 rounded text-center">1 + 1 = 2</span>
                <span className="bg-orange/20 px-4 py-3 rounded text-center">4 + 5 = 9</span>
                <span className="bg-orange/20 px-4 py-3 rounded text-center">7 + 8 = 15</span>
              </div>
            </div>
          </div>
        </div>

        <TopicQuiz topic="6-7-let/matematika/slozhenie" />
      </div>
    </div>
  );
}
