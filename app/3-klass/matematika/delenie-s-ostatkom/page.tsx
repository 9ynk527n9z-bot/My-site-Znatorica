import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Деление с остатком — математика для 3 класса',
  description: 'Учимся делить числа, которые не делятся друг на друга нацело, и находить остаток.',
  alternates: { canonical: '/3-klass/matematika/delenie-s-ostatkom' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '3 класс', url: '/3-klass' },
  { name: 'Математика', url: '/3-klass' },
  { name: 'Деление с остатком', url: '/3-klass/matematika/delenie-s-ostatkom' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Деление с остатком',
  description: 'Деление чисел, не делящихся нацело, с нахождением остатка',
  url: '/3-klass/matematika/delenie-s-ostatkom',
  educationalLevel: '3 класс начальной школы',
});

export default function DelenieSOstatkomPage() {
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
          <span className="text-white">Деление с остатком</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Деление с остатком</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Что делать, если число не делится нацело</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Найди наибольшее число, которое делится</h3>
              <p className="text-gray-300">
                Раздели 17 конфет между 5 детьми поровну. 5 × 3 = 15 — это наибольшее число конфет, которое
                можно раздать поровну по 3 каждому. Останется 17 − 15 = 2 конфеты — это остаток.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p className="text-2xl mb-1">17 ÷ 5 = 3 (ост. 2)</p>
                <p className="text-gray-300 text-base">Проверка: 5 × 3 + 2 = 15 + 2 = 17 ✓</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Главное правило</h3>
              <p className="text-gray-300">
                Остаток всегда меньше делителя. Если при делении на 5 у тебя получился остаток 6 —
                значит, где-то ошибка: 6 конфет можно было ещё раз разделить по 5, добавив ещё одному ребёнку.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: Проверяй себя умножением</h3>
              <p className="text-gray-300">
                Делитель × частное + остаток должно равняться делимому. Это лучший способ проверить,
                не ошибся ли ты в делении.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">23 ÷ 4 = ?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">5 (ост. 3) — проверка: 4 × 5 + 3 = 23</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">31 ÷ 6 = ?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">5 (ост. 1) — проверка: 6 × 5 + 1 = 31</p>
              </details>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Готов тренироваться?</h3>
          <p className="text-gray-300 mb-6">
            Деление с остатком очень часто встречается в жизни — например, когда нужно понять,
            сколько полных коробок получится и сколько предметов останется лишними.
          </p>
          <button className="btn-primary text-lg px-8 py-4">🎮 Открыть тренажер</button>
        </div>
      </div>
    </div>
  );
}
