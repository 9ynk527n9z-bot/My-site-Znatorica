import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Состав числа — математика для детей 6–7 лет',
  description: 'Учимся раскладывать числа от 2 до 10 на два слагаемых — важный навык для лёгкого устного счёта в школе.',
  alternates: { canonical: '/6-7-let/matematika/sostav-chisla' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Дошкольники 6–7', url: '/6-7-let' },
  { name: 'Математика', url: '/6-7-let' },
  { name: 'Состав числа', url: '/6-7-let/matematika/sostav-chisla' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Состав числа',
  description: 'Разложение чисел от 2 до 10 на два слагаемых',
  url: '/6-7-let/matematika/sostav-chisla',
  educationalLevel: 'Дошкольное образование, 6–7 лет',
});

export default function SostavChislaPage() {
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
          <span className="text-white">Состав числа</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Состав числа</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Зачем это нужно перед школой</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Число можно разложить на два числа</h3>
              <p className="text-gray-300">
                Каждое число больше 1 можно представить как сумму двух чисел. Число 7 — это 6 и 1, или 5 и 2,
                или 4 и 3.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p className="text-2xl">7 = 6 + 1 = 5 + 2 = 4 + 3</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Это готовит к сложению и вычитанию</h3>
              <p className="text-gray-300">
                Ребёнок, который уверенно знает состав числа, в школе быстрее считает в уме и легче осваивает
                счёт через десяток — например, 8 + 5 удобно посчитать через разложение 5 = 2 + 3.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: Тренируйся на предметах</h3>
              <p className="text-gray-300">
                Возьмите 8 счётных палочек или пуговиц и разложите на две кучки разными способами — это
                нагляднее, чем просто примеры на бумаге.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">8 = 5 + ?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">8 = 5 + 3</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Назови все способы разложить число 9 на два числа больше 0.</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">9 = 8+1 = 7+2 = 6+3 = 5+4</p>
              </details>
            </div>
          </div>
        </div>

        <TopicQuiz topic="6-7-let/matematika/sostav-chisla" />
      </div>
    </div>
  );
}
