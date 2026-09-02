import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Геометрия — теория и тренажёр для 4 класса',
  description: 'Площадь и периметр фигур для четвероклассников.',
  alternates: { canonical: '/4-klass/matematika/geometriya' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '4 класс', url: '/4-klass' },
  { name: 'Математика', url: '/4-klass' },
  { name: 'Геометрия', url: '/4-klass/matematika/geometriya' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Геометрия',
  description: 'Площадь и периметр фигур для 4 класса',
  url: '/4-klass/matematika/geometriya',
  educationalLevel: '4 класс начальной школы',
});

export default function GeometriyaPage() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/4-klass" className="text-orange hover:underline">4 класс</Link>
          <span className="text-gray-400">/</span>
          <Link href="/4-klass" className="text-orange hover:underline">Математика</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Геометрия</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Геометрия</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link href="/trenazher/geometriya-4klass" className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Периметр и площадь</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Периметр — длина границы фигуры</h3>
              <p className="text-gray-300">
                Периметр — это сумма длин всех сторон фигуры. У прямоугольника: P = (a + b) × 2, где a и b — стороны.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded text-center">
                Прямоугольник 5 см × 3 см<br />
                <span className="font-bold text-xl">P = (5 + 3) × 2 = 16 см</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Площадь — сколько места занимает фигура</h3>
              <p className="text-gray-300">
                Площадь прямоугольника считается умножением сторон: S = a × b. Измеряется в квадратных единицах (см², м²).
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded text-center">
                <span className="font-bold text-xl">S = 5 × 3 = 15 см²</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Не путай периметр и площадь</h3>
              <p className="text-gray-300">
                Периметр — это длина забора вокруг участка, площадь — это размер самого участка.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange/20 to-purple/20 border border-orange rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Готов тренироваться?</h3>
          <p className="text-gray-300 mb-6">Нажми на кнопку ниже и начни интерактивный тренажер</p>
          <Link href="/trenazher/geometriya-4klass" className="btn-primary text-lg px-8 py-4 inline-block">
            🎮 Открыть тренажер
          </Link>
        </div>

        <TopicQuiz topic="4-klass/matematika/geometriya" />
      </div>
    </div>
  );
}
