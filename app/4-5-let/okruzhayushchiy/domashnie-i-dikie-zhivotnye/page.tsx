import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Домашние и дикие животные — 4–5 лет',
  description: 'Учимся различать домашних животных, которые живут рядом с человеком, и диких, которые живут в лесу.',
  alternates: { canonical: '/4-5-let/okruzhayushchiy/domashnie-i-dikie-zhivotnye' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Дошкольники 4–5', url: '/4-5-let' },
  { name: 'Окружающий мир', url: '/4-5-let' },
  { name: 'Домашние и дикие животные', url: '/4-5-let/okruzhayushchiy/domashnie-i-dikie-zhivotnye' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Домашние и дикие животные',
  description: 'Различение домашних и диких животных',
  url: '/4-5-let/okruzhayushchiy/domashnie-i-dikie-zhivotnye',
  educationalLevel: 'Дошкольное образование, 4–5 лет',
});

export default function DomashnieDikieZhivotnyePage() {
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
          <span className="text-white">Домашние и дикие животные</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Домашние и дикие животные</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link href="/trenazher/domashnie-dikie" className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Кто где живёт</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">🏠 Домашние животные</h3>
              <p className="text-gray-300 mb-3">
                Живут рядом с человеком, который о них заботится: кормит, лечит, строит для них дом.
              </p>
              <div className="flex gap-4 text-3xl flex-wrap">
                <span className="bg-orange/20 px-4 py-2 rounded">🐶 собака</span>
                <span className="bg-orange/20 px-4 py-2 rounded">🐱 кошка</span>
                <span className="bg-orange/20 px-4 py-2 rounded">🐄 корова</span>
                <span className="bg-orange/20 px-4 py-2 rounded">🐷 свинья</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">🌲 Дикие животные</h3>
              <p className="text-gray-300 mb-3">
                Живут в лесу или в других диких местах и сами добывают себе еду, человек за ними не ухаживает.
              </p>
              <div className="flex gap-4 text-3xl flex-wrap">
                <span className="bg-violet/20 px-4 py-2 rounded">🐺 волк</span>
                <span className="bg-violet/20 px-4 py-2 rounded">🦊 лиса</span>
                <span className="bg-violet/20 px-4 py-2 rounded">🐻 медведь</span>
                <span className="bg-violet/20 px-4 py-2 rounded">🦌 олень</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">🐰 Заяц живёт в лесу сам по себе. Домашнее это животное или дикое?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Дикое.</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">🐴 Лошадь живёт у человека на ферме, он её кормит. Домашнее это животное или дикое?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Домашнее.</p>
              </details>
            </div>
          </div>
        </div>

        <TopicQuiz topic="4-5-let/okruzhayushchiy/domashnie-i-dikie-zhivotnye" />
      </div>
    </div>
  );
}
