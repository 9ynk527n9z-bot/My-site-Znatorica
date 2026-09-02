import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Периметр — теория и тренажёр для 2 класса',
  description: 'Что такое периметр многоугольника, как его найти сложением сторон, единицы длины см и дм на простых примерах для второклассников.',
  alternates: { canonical: '/2-klass/matematika/perimetr' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '2 класс', url: '/2-klass' },
  { name: 'Математика', url: '/2-klass' },
  { name: 'Периметр', url: '/2-klass/matematika/perimetr' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Периметр',
  description: 'Периметр многоугольника для 2 класса',
  url: '/2-klass/matematika/perimetr',
  educationalLevel: '2 класс начальной школы',
});

export default function PerimetrPage() {
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
          <span className="text-white">Периметр</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Периметр</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link href="/trenazher/perimetr-2klass" className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Что такое периметр?</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Периметр — длина границы фигуры</h3>
              <p className="text-gray-300">
                Периметр — это сумма длин всех сторон многоугольника. Представь, что ты обходишь фигуру по краю: сколько сантиметров ты пройдёшь — такой и будет периметр. Обозначается буквой <span className="font-bold">P</span>.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Как найти периметр прямоугольника</h3>
              <p className="text-gray-300 mb-4">
                У прямоугольника четыре стороны, но противоположные стороны равны. Пусть длинная сторона — <span className="font-bold">a</span>, короткая — <span className="font-bold">b</span>. Проще всего сложить все четыре стороны: a + b + a + b. А ещё быстрее — сложить две разные стороны и умножить результат на 2:
              </p>
              <div className="p-4 bg-orange/10 rounded text-center">
                <span className="text-2xl font-bold">P = (a + b) × 2</span>
              </div>
              <p className="text-gray-300 mt-4">
                Для квадрата все четыре стороны равны, поэтому периметр находим так: <span className="font-bold">P = a × 4</span>.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Единицы измерения длины</h3>
              <p className="text-gray-300">
                Периметр измеряется в единицах длины: сантиметрах (см) и дециметрах (дм). Запомни: <span className="font-bold">1 дм = 10 см</span>. Например, 3 дм — это 30 см.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Пример 1: прямоугольник</h3>
              <p className="text-gray-300">
                Стороны прямоугольника: a = 5 см, b = 3 см.<br />
                Периметр: P = (5 + 3) × 2 = 8 × 2 = <span className="font-bold text-white">16 см</span>.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Пример 2: квадрат</h3>
              <p className="text-gray-300">
                Сторона квадрата: a = 4 см.<br />
                Периметр: P = 4 × 4 = <span className="font-bold text-white">16 см</span>.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Пример 3: складываем все стороны</h3>
              <p className="text-gray-300">
                Стороны прямоугольника: a = 6 см, b = 2 см.<br />
                Складываем все четыре стороны: 6 + 2 + 6 + 2 = <span className="font-bold text-white">16 см</span>.<br />
                Проверим по формуле: P = (6 + 2) × 2 = 8 × 2 = <span className="font-bold text-white">16 см</span>. Совпало!
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange rounded-lg p-8 text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">Готов тренироваться?</h3>
          <p className="text-gray-300 mb-6">Нажми на кнопку ниже и начни интерактивный тренажер</p>
          <Link href="/trenazher/perimetr-2klass" className="btn-primary text-lg px-8 py-4 inline-block">🎮 Открыть тренажер</Link>
        </div>

        <TopicQuiz topic="2-klass/matematika/perimetr" />
      </div>
    </div>
  );
}
