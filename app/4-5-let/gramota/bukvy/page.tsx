import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Буквы — теория и тренажёр для детей 4–5 лет',
  description: 'Изучаем буквы русского алфавита. Первые шаги к чтению для детей 4-5 лет.',
  alternates: { canonical: '/4-5-let/gramota/bukvy' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Дошкольники 4–5', url: '/4-5-let' },
  { name: 'Грамота', url: '/4-5-let' },
  { name: 'Буквы', url: '/4-5-let/gramota/bukvy' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Буквы',
  description: 'Изучение букв русского алфавита для детей 4-5 лет',
  url: '/4-5-let/gramota/bukvy',
  educationalLevel: 'Дошкольное образование, 4–5 лет',
});

export default function BukvyPage() {
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
          <Link href="/4-5-let" className="text-orange hover:underline">Грамота</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Буквы</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Буквы</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link href="/trenazher/russkiy-alfavit" className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Знакомимся с буквами</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Буква — это знак звука</h3>
              <p className="text-gray-300">
                Мы уже умеем слышать звуки. А буква — это то, как звук выглядит на письме. Звук «м» мы слышим, а букву «М» — видим и пишем.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Начни с гласных</h3>
              <p className="text-gray-300 mb-4">
                Легче всего начать с гласных букв — их можно пропеть.
              </p>
              <div className="flex gap-3 text-3xl font-bold flex-wrap">
                <span className="bg-orange/20 px-4 py-2 rounded">А</span>
                <span className="bg-orange/20 px-4 py-2 rounded">О</span>
                <span className="bg-orange/20 px-4 py-2 rounded">У</span>
                <span className="bg-orange/20 px-4 py-2 rounded">И</span>
                <span className="bg-orange/20 px-4 py-2 rounded">Э</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: Ищи буквы вокруг</h3>
              <p className="text-gray-300">
                Буквы есть на упаковках, вывесках, в книжках. Попробуй найти букву своего имени на улице или дома!
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                🔤 Найди 3 предмета дома, название которых начинается на букву «К»
              </div>
            </div>
          </div>
        </div>

        <TopicQuiz topic="4-5-let/gramota/bukvy" />
      </div>
    </div>
  );
}
