import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Слова — теория и тренажёр для детей 4–5 лет',
  description: 'Расширяем словарный запас: учимся называть предметы, действия и признаки. Для детей 4-5 лет.',
  alternates: { canonical: '/4-5-let/razvitie/slova' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Дошкольники 4–5', url: '/4-5-let' },
  { name: 'Развитие речи', url: '/4-5-let' },
  { name: 'Слова', url: '/4-5-let/razvitie/slova' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Слова',
  description: 'Расширение словарного запаса для детей 4-5 лет',
  url: '/4-5-let/razvitie/slova',
  educationalLevel: 'Дошкольное образование, 4–5 лет',
});

export default function SlovaPage() {
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
          <Link href="/4-5-let" className="text-orange hover:underline">Развитие речи</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Слова</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Слова</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link
            href="/trenazher/slova-obobshchenie-4-5let"
            className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors"
          >
            🎮 Тренажер
          </Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Расширяем словарный запас</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Слова-предметы</h3>
              <p className="text-gray-300">
                Это слова, которые называют то, что можно увидеть или потрогать: стол, кошка, дерево, мяч. Отвечают на вопрос «Кто это?» или «Что это?»
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Слова-действия</h3>
              <p className="text-gray-300">
                Это слова про то, что кто-то делает: бежит, читает, спит, прыгает. Отвечают на вопрос «Что делает?»
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                🏃 Придумай, что делает кошка, собака, птица
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Слова-признаки</h3>
              <p className="text-gray-300">
                Это слова, которые описывают предмет: большой, красный, мягкий, вкусный. Отвечают на вопрос «Какой?»
              </p>
              <div className="mt-4 flex gap-3 flex-wrap text-sm font-bold">
                <span className="bg-orange/20 px-3 py-1 rounded">большой</span>
                <span className="bg-orange/20 px-3 py-1 rounded">маленький</span>
                <span className="bg-orange/20 px-3 py-1 rounded">мягкий</span>
                <span className="bg-orange/20 px-3 py-1 rounded">колючий</span>
              </div>
            </div>
          </div>
        </div>

        <TopicQuiz topic="4-5-let/razvitie/slova" />
      </div>
    </div>
  );
}
