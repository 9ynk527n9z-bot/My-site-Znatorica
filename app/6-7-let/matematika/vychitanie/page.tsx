import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Вычитание — теория и тренажёр для детей 6–7 лет',
  description: 'Учимся вычитать числа в пределах 20. Для детей 6-7 лет.',
  alternates: { canonical: '/6-7-let/matematika/vychitanie' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Дошкольники 6–7', url: '/6-7-let' },
  { name: 'Математика', url: '/6-7-let/matematika' },
  { name: 'Вычитание', url: '/6-7-let/matematika/vychitanie' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Вычитание',
  description: 'Обучение вычитанию чисел для детей 6-7 лет',
  url: '/6-7-let/matematika/vychitanie',
  educationalLevel: 'Дошкольное образование, 6–7 лет',
});

export default function VychitaniePage() {
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
          <span className="text-white">Вычитание</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Вычитание</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Как вычитать числа?</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Что значит «вычесть»?</h3>
              <p className="text-gray-300">
                Вычитание — это когда мы убираем часть от целого числа. Знак «−» означает «отнять» или «убрать».
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded text-2xl font-bold text-center">
                5 − 2 = 3
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Сложение и вычитание — родственники</h3>
              <p className="text-gray-300">
                Если 2 + 3 = 5, то 5 − 3 = 2 и 5 − 2 = 3. Зная сложение, легче проверить вычитание.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: Считай на предметах</h3>
              <p className="text-gray-300 mb-4">Возьми 7 карандашей, убери 3 — сосчитай, сколько осталось.</p>
              <div className="grid grid-cols-3 gap-3 text-xl font-bold">
                <span className="bg-orange/20 px-4 py-3 rounded text-center">3 − 1 = 2</span>
                <span className="bg-orange/20 px-4 py-3 rounded text-center">9 − 4 = 5</span>
                <span className="bg-orange/20 px-4 py-3 rounded text-center">15 − 7 = 8</span>
              </div>
            </div>
          </div>
        </div>

        <TopicQuiz topic="6-7-let/matematika/vychitanie" />
      </div>
    </div>
  );
}
