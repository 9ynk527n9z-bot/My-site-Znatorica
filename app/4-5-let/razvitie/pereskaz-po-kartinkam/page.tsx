import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Пересказ по картинкам — развитие речи для детей 4–5 лет',
  description: 'Учимся составлять простую историю, глядя на картинку: что происходит, кто главный герой, что было сначала и потом.',
  alternates: { canonical: '/4-5-let/razvitie/pereskaz-po-kartinkam' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Дошкольники 4–5', url: '/4-5-let' },
  { name: 'Развитие речи', url: '/4-5-let' },
  { name: 'Пересказ по картинкам', url: '/4-5-let/razvitie/pereskaz-po-kartinkam' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Пересказ по картинкам',
  description: 'Составление простого рассказа по сюжетной картинке',
  url: '/4-5-let/razvitie/pereskaz-po-kartinkam',
  educationalLevel: 'Дошкольное образование, 4–5 лет',
});

export default function PereskazPoKartinkamPage() {
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
          <span className="text-white">Пересказ по картинкам</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Пересказ по картинкам</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Как рассказать историю по картинке</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Кто главный герой</h3>
              <p className="text-gray-300">
                Начни с вопроса «Кто здесь нарисован?». Это может быть ребёнок, зверёк или взрослый —
                назови его и опиши, какой он.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Что он делает</h3>
              <p className="text-gray-300">
                Дальше — «Что он делает на картинке?». Опиши действие: играет, бежит, ест, спит.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p className="text-2xl mb-1">🐻🍯</p>
                <p className="text-gray-300 text-base">«Медвежонок ест мёд из банки. Он сидит на полянке и радуется.»</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: Где и когда это происходит</h3>
              <p className="text-gray-300">
                Добавь место действия — в лесу, дома, на улице — и, если понятно, время суток или год: утром, зимой, летом.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 4: Собери всё вместе</h3>
              <p className="text-gray-300">
                Теперь соедини все ответы в 2-3 предложения — вот и получилась маленькая история по картинке.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2 text-2xl">🐱☔🏠</p>
              <p className="text-gray-300 mb-2">Придумай историю: кто здесь, что происходит и почему.</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Пример ответа</summary>
                <p className="text-gray-300 mt-2">«На улице идёт дождь. Котёнок промок и бежит домой, чтобы согреться.»</p>
              </details>
            </div>
          </div>
        </div>

        <TopicQuiz topic="4-5-let/razvitie/pereskaz-po-kartinkam" />
      </div>
    </div>
  );
}
