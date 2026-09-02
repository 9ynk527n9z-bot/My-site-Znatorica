import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Трёхзначные числа — теория и тренажёр для 3 класса',
  description: 'Числа от 100 до 1000: разряды сотен, десятков и единиц для третьеклассников.',
  alternates: { canonical: '/3-klass/matematika/trekhznachnye' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '3 класс', url: '/3-klass' },
  { name: 'Математика', url: '/3-klass' },
  { name: 'Трёхзначные числа', url: '/3-klass/matematika/trekhznachnye' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Трёхзначные числа',
  description: 'Числа от 100 до 1000 для 3 класса',
  url: '/3-klass/matematika/trekhznachnye',
  educationalLevel: '3 класс начальной школы',
});

export default function TrekhznachnyePage() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/3-klass" className="text-orange hover:underline">3 класс</Link>
          <span className="text-gray-400">/</span>
          <Link href="/3-klass" className="text-orange hover:underline">Математика</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Трёхзначные числа</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Трёхзначные числа</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link href="/trenazher/trekhznachnye" className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Числа от 100 до 1000</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Сотни, десятки, единицы</h3>
              <p className="text-gray-300">
                Трёхзначное число состоит из трёх цифр. Например, в числе 356: 3 — сотни, 5 — десятки, 6 — единицы.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded text-xl font-bold text-center">
                356 = 300 + 50 + 6
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Сравнение трёхзначных чисел</h3>
              <p className="text-gray-300">
                Сравнивай сначала сотни, потом десятки, потом единицы — как только находишь разницу, там и определяется, какое число больше.
              </p>
              <div className="mt-4 flex gap-4 text-xl font-bold flex-wrap">
                <span className="bg-orange/20 px-4 py-2 rounded">427 &gt; 419</span>
                <span className="bg-orange/20 px-4 py-2 rounded">312 &lt; 350</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Число 1000 — это десять сотен</h3>
              <p className="text-gray-300">
                После 999 идёт круглое число 1000 — с него начинаются четырёхзначные числа (тысячи).
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange rounded-lg p-8 text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">Готов тренироваться?</h3>
          <p className="text-gray-300 mb-6">Нажми на кнопку ниже и начни интерактивный тренажер</p>
          <Link href="/trenazher/trekhznachnye" className="btn-primary text-lg px-8 py-4 inline-block">🎮 Открыть тренажер</Link>
        </div>

        <TopicQuiz topic="3-klass/matematika/trekhznachnye" />
      </div>
    </div>
  );
}
