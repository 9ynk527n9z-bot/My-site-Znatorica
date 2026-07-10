import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Закономерности — логика для детей 6–7 лет',
  description: 'Учимся находить закономерность в ряду фигур, цветов и чисел и предсказывать, что будет дальше.',
  alternates: { canonical: '/6-7-let/logika/zakonomernosti' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Дошкольники 6–7', url: '/6-7-let' },
  { name: 'Логика и мышление', url: '/6-7-let' },
  { name: 'Закономерности', url: '/6-7-let/logika/zakonomernosti' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Закономерности',
  description: 'Поиск закономерностей в рядах фигур, цветов и чисел',
  url: '/6-7-let/logika/zakonomernosti',
  educationalLevel: 'Дошкольное образование, 6–7 лет',
});

export default function ZakonomernostiPage() {
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
          <span className="text-white">Закономерности</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Закономерности</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Что такое закономерность?</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Найди повторение</h3>
              <p className="text-gray-300">
                Закономерность — это когда что-то повторяется в определённом порядке. Если понять порядок,
                можно угадать, что будет дальше.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p className="text-2xl mb-1">🔴 🔵 🔴 🔵 🔴 ❓</p>
                <p className="text-gray-300 text-base">
                  Красный и синий чередуются. После красного идёт синий — значит, дальше будет 🔵.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Закономерности бывают сложнее</h3>
              <p className="text-gray-300">Иногда повторяется не один элемент, а целая группа из двух-трёх.</p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p className="text-2xl mb-1">🟦 🟦 🟨 🟦 🟦 🟨 ❓ ❓</p>
                <p className="text-gray-300 text-base">Группа «🟦 🟦 🟨» повторяется. Дальше будет 🟦 🟦.</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: Закономерности бывают и в числах</h3>
              <p className="text-gray-300">
                Числа тоже могут идти по порядку с каким-то правилом — например, каждое следующее больше на 2.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p className="text-2xl mb-1">2, 4, 6, 8, ❓</p>
                <p className="text-gray-300 text-base">Каждое число больше предыдущего на 2. Дальше — 10.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2 text-2xl">⭐ ⭐ 🌙 ⭐ ⭐ 🌙 ❓</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Дальше будет ⭐ — повторяется группа «две звезды, потом луна».</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2 text-2xl">1, 3, 5, 7, ❓</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Дальше 9 — каждое число больше предыдущего на 2 (это нечётные числа).</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2 text-2xl">🔺 🔻 🔺 🔻 🔺 ❓</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Дальше 🔻 — треугольники чередуются вершиной вверх и вниз.</p>
              </details>
            </div>
          </div>
        </div>

        <TopicQuiz topic="6-7-let/logika/zakonomernosti" />
      </div>
    </div>
  );
}
