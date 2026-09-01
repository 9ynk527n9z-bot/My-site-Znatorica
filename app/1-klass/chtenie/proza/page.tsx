import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Проза — теория и тренажёр для 1 класса',
  description: 'Рассказы и повести в программе литературного чтения 1 класса.',
  alternates: { canonical: '/1-klass/chtenie/proza' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '1 класс', url: '/1-klass' },
  { name: 'Литературное чтение', url: '/1-klass/chtenie' },
  { name: 'Проза', url: '/1-klass/chtenie/proza' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Проза',
  description: 'Рассказы и повести для 1 класса',
  url: '/1-klass/chtenie/proza',
  educationalLevel: '1 класс начальной школы',
});

export default function ProzaPage() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/1-klass" className="text-orange hover:underline">1 класс</Link>
          <span className="text-gray-400">/</span>
          <Link href="/1-klass/chtenie" className="text-orange hover:underline">Литературное чтение</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Проза</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Проза</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Что такое проза?</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Проза — это обычная речь</h3>
              <p className="text-gray-300">
                Проза — рассказы и истории, написанные обычным языком, без рифмы. В отличие от стихов, в прозе строки не рифмуются.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Из чего состоит рассказ</h3>
              <p className="text-gray-300">
                У каждого рассказа есть герои (персонажи), место действия и события, которые с ними происходят.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Как понять прочитанное</h3>
              <p className="text-gray-300 mb-4">После чтения рассказа полезно ответить на вопросы:</p>
              <ul className="text-gray-300 space-y-1 list-disc list-inside">
                <li>Кто главный герой?</li>
                <li>Что с ним произошло?</li>
                <li>Чем закончилась история?</li>
              </ul>
            </div>
          </div>
        </div>

        <TopicQuiz topic="1-klass/chtenie/proza" />
      </div>
    </div>
  );
}
