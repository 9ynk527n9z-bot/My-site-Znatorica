import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Найди лишнее — логика для детей 4–5 лет',
  description: 'Учимся находить общий признак у предметов и определять лишний. Простые примеры с картинками-эмодзи для детей 4–5 лет.',
  alternates: { canonical: '/4-5-let/logika/naydi-lishnee' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Дошкольники 4–5', url: '/4-5-let' },
  { name: 'Логика и мышление', url: '/4-5-let' },
  { name: 'Найди лишнее', url: '/4-5-let/logika/naydi-lishnee' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Найди лишнее',
  description: 'Логическая игра на поиск общего признака и лишнего предмета',
  url: '/4-5-let/logika/naydi-lishnee',
  educationalLevel: 'Дошкольное образование, 4–5 лет',
});

export default function NaydiLishneePage() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/4-5-let" className="text-orange hover:underline">Дошкольники 4–5</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Найди лишнее</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Найди лишнее</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link href="/trenazher/naydi-lishnee" className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Как искать лишнее?</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Пойми, что общего</h3>
              <p className="text-gray-300">
                Прежде чем искать лишнее, посмотри на все предметы и подумай — что у них похожего?
                Может, все они одного цвета, или все это животные, или всё это еда.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Найди того, кто не подходит</h3>
              <p className="text-gray-300">
                Когда понял общий признак — ищи предмет, который этому признаку не соответствует.
                Именно он и будет лишним.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p className="mb-2 text-2xl">🍎 🍌 🍊 🚗</p>
                <p className="text-gray-300 text-base">
                  Яблоко, банан и апельсин — это фрукты. А машина — не фрукт. Значит, лишняя — машина!
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: Объясни свой выбор</h3>
              <p className="text-gray-300">
                Самое важное — не просто угадать, а объяснить словами, почему один предмет лишний.
                Это и есть настоящая логика!
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2 text-2xl">🐶 🐱 🐰 🌳</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Дерево — лишнее, остальные это животные.</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2 text-2xl">☀️ ⭐ 🌙 🍕</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Пицца — лишняя, остальное можно увидеть на небе.</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2 text-2xl">🚗 🚌 🚲 🐟</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Рыба — лишняя, остальное это транспорт.</p>
              </details>
            </div>
          </div>
        </div>

        <TopicQuiz topic="4-5-let/logika/naydi-lishnee" />
      </div>
    </div>
  );
}
