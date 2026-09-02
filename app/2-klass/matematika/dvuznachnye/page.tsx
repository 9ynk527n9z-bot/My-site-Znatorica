import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Двузначные числа — теория и тренажёр для 2 класса',
  description: 'Числа от 10 до 100: разряды десятков и единиц для второклассников.',
  alternates: { canonical: '/2-klass/matematika/dvuznachnye' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '2 класс', url: '/2-klass' },
  { name: 'Математика', url: '/2-klass' },
  { name: 'Двузначные числа', url: '/2-klass/matematika/dvuznachnye' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Двузначные числа',
  description: 'Числа от 10 до 100 для 2 класса',
  url: '/2-klass/matematika/dvuznachnye',
  educationalLevel: '2 класс начальной школы',
});

export default function DvuznachnyePage() {
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
          <Link href="/2-klass" className="text-orange hover:underline">Математика</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Двузначные числа</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Двузначные числа</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link href="/trenazher/dvuznachnye" className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Числа от 10 до 100</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Десятки и единицы</h3>
              <p className="text-gray-300">
                Двузначное число состоит из двух цифр: первая показывает десятки, вторая — единицы. Например, в числе 47: 4 — десятки, 7 — единицы.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded text-xl font-bold text-center">
                47 = 4 десятка + 7 единиц = 40 + 7
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Сравнение чисел</h3>
              <p className="text-gray-300">
                Чтобы сравнить два двузначных числа, сначала смотри на десятки: у кого больше десятков, то число и больше. Если десятки равны — сравнивай единицы.
              </p>
              <div className="mt-4 flex gap-4 text-xl font-bold">
                <span className="bg-orange/20 px-4 py-2 rounded">52 &gt; 48</span>
                <span className="bg-orange/20 px-4 py-2 rounded">63 &lt; 67</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Число 100 — это десять десятков</h3>
              <p className="text-gray-300">
                После 99 идёт круглое число 100 — целая сотня, с которой начинаются трёхзначные числа.
              </p>
            </div>
          </div>
        </div>

        <TopicQuiz topic="2-klass/matematika/dvuznachnye" />
      </div>
    </div>
  );
}
