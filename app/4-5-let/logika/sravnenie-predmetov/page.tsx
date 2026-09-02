import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Сравнение предметов — логика для детей 4–5 лет',
  description: 'Учимся сравнивать предметы по размеру, длине и количеству: больше-меньше, длиннее-короче, одинаковое-разное.',
  alternates: { canonical: '/4-5-let/logika/sravnenie-predmetov' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Дошкольники 4–5', url: '/4-5-let' },
  { name: 'Логика и мышление', url: '/4-5-let' },
  { name: 'Сравнение предметов', url: '/4-5-let/logika/sravnenie-predmetov' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Сравнение предметов',
  description: 'Сравнение предметов по размеру, длине и количеству',
  url: '/4-5-let/logika/sravnenie-predmetov',
  educationalLevel: 'Дошкольное образование, 4–5 лет',
});

export default function SravnenieePredmetovPage() {
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
          <span className="text-white">Сравнение предметов</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Сравнение предметов</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link href="/trenazher/sravnenie-predmetov" className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Какими бывают сравнения?</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: По размеру</h3>
              <p className="text-gray-300">Есть предметы большие и маленькие. Слон — большой, а мышка — маленькая.</p>
              <div className="mt-4 flex gap-4 text-3xl">
                <span className="bg-orange/20 px-4 py-2 rounded">🐘 большой</span>
                <span className="bg-orange/20 px-4 py-2 rounded">🐭 маленький</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: По длине</h3>
              <p className="text-gray-300">Предметы бывают длинные и короткие. Змея длинная, а карандаш короткий.</p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                🐍 длинная — ✏️ короткий
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: По количеству</h3>
              <p className="text-gray-300">
                Можно сравнивать, чего больше, а чего меньше. Посчитай предметы в каждой группе и сравни числа.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p className="text-2xl mb-1">🍎🍎🍎 и 🍎🍎</p>
                <p className="text-gray-300 text-base">Слева 3 яблока, справа 2. Значит, слева больше.</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 4: Одинаковое или разное</h3>
              <p className="text-gray-300">
                Иногда нужно понять — предметы совсем одинаковые, или чем-то отличаются (цветом, размером, формой).
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Что длиннее: поезд 🚂🚃🚃🚃 или машина 🚗?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Поезд длиннее — он состоит из нескольких вагонов.</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Чего больше: 🐻🐻 или 🐝🐝🐝🐝?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Пчёл больше — их 4, а медведей 2.</p>
              </details>
            </div>
          </div>
        </div>

        <TopicQuiz topic="4-5-let/logika/sravnenie-predmetov" />
      </div>
    </div>
  );
}
