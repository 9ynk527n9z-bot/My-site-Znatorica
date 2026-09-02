import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Площадь и периметр — теория и тренажёр для 3 класса',
  description: 'Что такое периметр и площадь прямоугольника, формулы P=(a+b)×2 и S=a×b на простых примерах для третьеклассников.',
  alternates: { canonical: '/3-klass/matematika/ploshchad-perimetr' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '3 класс', url: '/3-klass' },
  { name: 'Математика', url: '/3-klass' },
  { name: 'Площадь и периметр', url: '/3-klass/matematika/ploshchad-perimetr' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Площадь и периметр',
  description: 'Периметр и площадь прямоугольника для 3 класса',
  url: '/3-klass/matematika/ploshchad-perimetr',
  educationalLevel: '3 класс начальной школы',
});

export default function PloshchadPerimetrPage() {
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
          <span className="text-white">Площадь и периметр</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Площадь и периметр</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link href="/trenazher/ploshchad-perimetr-3klass" className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Что такое периметр и площадь?</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Периметр — длина границы фигуры</h3>
              <p className="text-gray-300">
                Периметр — это сумма длин всех сторон фигуры. Представь, что ты обходишь фигуру по краю: сколько сантиметров ты пройдёшь — такой и периметр. Обозначается буквой <span className="font-bold">P</span> и измеряется в единицах длины: см, м.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Площадь — сколько места внутри фигуры</h3>
              <p className="text-gray-300">
                Площадь показывает, сколько квадратиков (например, со стороной 1 см) помещается внутри фигуры. Обозначается буквой <span className="font-bold">S</span> и измеряется в квадратных единицах: см², м².
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Формулы для прямоугольника</h3>
              <p className="text-gray-300 mb-4">
                Пусть у прямоугольника стороны <span className="font-bold">a</span> и <span className="font-bold">b</span>. Тогда:
              </p>
              <div className="p-4 bg-orange/10 rounded text-center space-y-2">
                <div><span className="text-2xl font-bold">P = (a + b) × 2</span> — периметр</div>
                <div><span className="text-2xl font-bold">S = a × b</span> — площадь</div>
              </div>
              <p className="text-gray-300 mt-4">
                Для квадрата все стороны равны (a = b), поэтому формулы упрощаются: <span className="font-bold">P = a × 4</span>, <span className="font-bold">S = a × a</span>.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Единицы измерения</h3>
              <p className="text-gray-300">
                Периметр измеряется в обычных единицах длины: см, дм, м. Площадь — в квадратных единицах: см², дм², м². Не перепутай — это разные величины, и обозначаются они по-разному!
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Пример 1: прямоугольник</h3>
              <p className="text-gray-300">
                Стороны прямоугольника: a = 5 см, b = 3 см.<br />
                Периметр: P = (5 + 3) × 2 = 8 × 2 = <span className="font-bold text-white">16 см</span>.<br />
                Площадь: S = 5 × 3 = <span className="font-bold text-white">15 см²</span>.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Пример 2: квадрат</h3>
              <p className="text-gray-300">
                Сторона квадрата: a = 4 см.<br />
                Периметр: P = 4 × 4 = <span className="font-bold text-white">16 см</span>.<br />
                Площадь: S = 4 × 4 = <span className="font-bold text-white">16 см²</span>.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Пример 3: прямоугольник побольше</h3>
              <p className="text-gray-300">
                Стороны прямоугольника: a = 7 см, b = 2 см.<br />
                Периметр: P = (7 + 2) × 2 = 9 × 2 = <span className="font-bold text-white">18 см</span>.<br />
                Площадь: S = 7 × 2 = <span className="font-bold text-white">14 см²</span>.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange rounded-lg p-8 text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">Готов тренироваться?</h3>
          <p className="text-gray-300 mb-6">Нажми на кнопку ниже и начни интерактивный тренажер</p>
          <Link href="/trenazher/ploshchad-perimetr-3klass" className="btn-primary text-lg px-8 py-4 inline-block">🎮 Открыть тренажер</Link>
        </div>

        <TopicQuiz topic="3-klass/matematika/ploshchad-perimetr" />
      </div>
    </div>
  );
}
