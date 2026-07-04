import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Счёт до 20 — теория и тренажёр для детей 6–7 лет',
  description: 'Учимся считать до 20, понимаем разряды десятков и единиц. Для детей 6-7 лет.',
  alternates: { canonical: '/6-7-let/matematika/schet-do-20' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Дошкольники 6–7', url: '/6-7-let' },
  { name: 'Математика', url: '/6-7-let/matematika' },
  { name: 'Счёт до 20', url: '/6-7-let/matematika/schet-do-20' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Счёт до 20',
  description: 'Интерактивный тренажёр и теория для обучения счёту до 20',
  url: '/6-7-let/matematika/schet-do-20',
  educationalLevel: 'Дошкольное образование, 6–7 лет',
});

export default function SchetDo20Page() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#0A0812] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/6-7-let" className="text-orange hover:underline">Дошкольники 6–7</Link>
          <span className="text-gray-400">/</span>
          <Link href="/6-7-let/matematika" className="text-orange hover:underline">Математика</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Счёт до 20</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Счёт до 20</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#16102A] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Как считать после 10?</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Вспомни число 10</h3>
              <p className="text-gray-300">
                Ты уже знаешь, что 10 — это один десяток. После него счёт продолжается: 11, 12, 13...
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Десяток и единицы</h3>
              <p className="text-gray-300 mb-4">
                Число 15 — это 1 десяток и 5 единиц. Такие числа называют «дцать»: одиннадцать, двенадцать... до девятнадцати.
              </p>
              <div className="p-4 bg-orange/10 rounded">
                🔢 15 = 10 + 5 (один десяток и пять единиц)
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: Число 20 — это два десятка</h3>
              <p className="text-gray-300">
                После девятнадцати идёт двадцать — это уже два целых десятка, ни одной лишней единицы.
              </p>
              <div className="mt-4 flex gap-4 text-2xl font-bold flex-wrap">
                <span className="bg-orange/20 px-4 py-2 rounded">11</span>
                <span className="bg-orange/20 px-4 py-2 rounded">12</span>
                <span className="bg-orange/20 px-4 py-2 rounded">...</span>
                <span className="bg-orange/20 px-4 py-2 rounded">19</span>
                <span className="bg-orange/20 px-4 py-2 rounded">20</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Готов тренироваться?</h3>
          <p className="text-gray-300 mb-6">Нажми на кнопку ниже и начни интерактивный тренажер</p>
          <button className="btn-primary text-lg px-8 py-4">🎮 Открыть тренажер</button>
        </div>
      </div>
    </div>
  );
}
