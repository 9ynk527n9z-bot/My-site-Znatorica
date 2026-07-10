import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Комбинаторика — логика для 3 класса',
  description: 'Учимся считать количество возможных вариантов сочетаний с помощью умножения.',
  alternates: { canonical: '/3-klass/logika/kombinatorika' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '3 класс', url: '/3-klass' },
  { name: 'Логика и мышление', url: '/3-klass' },
  { name: 'Комбинаторика', url: '/3-klass/logika/kombinatorika' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Комбинаторика',
  description: 'Подсчёт количества сочетаний методом умножения',
  url: '/3-klass/logika/kombinatorika',
  educationalLevel: '3 класс начальной школы',
});

export default function KombinatorikaPage() {
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
          <span className="text-white">Комбинаторика</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Комбинаторика</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Как посчитать все варианты, не перечисляя их</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Правило умножения</h3>
              <p className="text-gray-300">
                Если первое можно выбрать A способами, а второе — B способами, то вместе их можно
                скомбинировать A × B способами.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p className="mb-2">У Пети 3 футболки и 2 шорт. Сколько разных комплектов «футболка + шорты» он может составить?</p>
                <p className="text-2xl">3 × 2 = 6 комплектов</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Проверь на маленьком примере</h3>
              <p className="text-gray-300">
                Если сомневаешься, перечисли варианты списком — для маленьких чисел это легко проверяет умножение.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded text-base">
                Футболка 1 + шорты 1, футболка 1 + шорты 2, футболка 2 + шорты 1, футболка 2 + шорты 2,
                футболка 3 + шорты 1, футболка 3 + шорты 2 — ровно 6 вариантов.
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: Работает и для трёх групп</h3>
              <p className="text-gray-300">
                Если добавить ещё, например, 2 пары кроссовок, то всего вариантов будет 3 × 2 × 2 = 12.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">В меню столовой 2 супа и 3 вторых блюда. Сколько разных обедов можно составить?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">2 × 3 = 6 разных обедов.</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">У Кати 4 шапки и 3 шарфа. Сколько разных комплектов «шапка + шарф» она может составить?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">4 × 3 = 12 комплектов.</p>
              </details>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Готов тренироваться?</h3>
          <p className="text-gray-300 mb-6">
            Правило умножения для подсчёта вариантов — основа комбинаторики, с которой в старших классах решают куда более сложные задачи.
          </p>
          <button className="btn-primary text-lg px-8 py-4">🎮 Открыть тренажер</button>
        </div>
      </div>
    </div>
  );
}
