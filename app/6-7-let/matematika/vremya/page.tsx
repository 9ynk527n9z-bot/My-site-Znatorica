import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Время — теория и тренажёр для детей 6–7 лет',
  description: 'Учимся определять время по часам: часы и минуты. Для детей 6-7 лет.',
  alternates: { canonical: '/6-7-let/matematika/vremya' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Дошкольники 6–7', url: '/6-7-let' },
  { name: 'Математика', url: '/6-7-let/matematika' },
  { name: 'Время', url: '/6-7-let/matematika/vremya' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Время',
  description: 'Обучение определению времени по часам для детей 6-7 лет',
  url: '/6-7-let/matematika/vremya',
  educationalLevel: 'Дошкольное образование, 6–7 лет',
});

export default function VremyaPage() {
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
          <Link href="/6-7-let/matematika" className="text-orange hover:underline">Математика</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Время</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Время</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Учимся определять время</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Часовая и минутная стрелки</h3>
              <p className="text-gray-300">
                На часах есть две стрелки. Короткая показывает часы, длинная — минуты. Короткая двигается медленно, длинная — быстро.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Целый час</h3>
              <p className="text-gray-300">
                Когда длинная стрелка стоит на цифре 12, а короткая — на любой другой цифре, это ровно столько-то часов. Например, короткая на 3, длинная на 12 — это 3 часа.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                🕒 3:00 — короткая стрелка на 3, длинная на 12
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: В сутках 24 часа</h3>
              <p className="text-gray-300">
                Сутки делятся на день и ночь. Утром мы просыпаемся, днём учимся и играем, вечером ужинаем, ночью спим.
              </p>
            </div>
          </div>
        </div>

        <TopicQuiz topic="6-7-let/matematika/vremya" />
      </div>
    </div>
  );
}
