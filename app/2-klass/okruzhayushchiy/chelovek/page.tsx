import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Человек — теория и тренажёр для 2 класса',
  description: 'Здоровье и гигиена в программе окружающего мира для 2 класса.',
  alternates: { canonical: '/2-klass/okruzhayushchiy/chelovek' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '2 класс', url: '/2-klass' },
  { name: 'Окружающий мир', url: '/2-klass/okruzhayushchiy' },
  { name: 'Человек', url: '/2-klass/okruzhayushchiy/chelovek' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Человек',
  description: 'Здоровье и гигиена для 2 класса',
  url: '/2-klass/okruzhayushchiy/chelovek',
  educationalLevel: '2 класс начальной школы',
});

export default function ChelovekPage() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#0A0812] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/2-klass" className="text-orange hover:underline">2 класс</Link>
          <span className="text-gray-400">/</span>
          <Link href="/2-klass/okruzhayushchiy" className="text-orange hover:underline">Окружающий мир</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Человек</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Человек</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#16102A] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Забота о здоровье</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Правила гигиены</h3>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>Мой руки перед едой и после улицы</li>
                <li>Чисти зубы утром и вечером</li>
                <li>Принимай душ или ванну регулярно</li>
                <li>Меняй одежду по мере загрязнения</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Правильное питание</h3>
              <p className="text-gray-300">
                Ешь больше овощей и фруктов, пей воду, не забывай про завтрак — это даёт энергию на весь день.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Режим дня</h3>
              <p className="text-gray-300">
                Ложись спать и просыпайся в одно и то же время. Полноценный сон помогает расти и хорошо учиться.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                💤 Детям 7-8 лет нужно спать 10-11 часов в сутки
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
