import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Стихи — теория и тренажёр для 1 класса',
  description: 'Поэтические произведения в программе литературного чтения 1 класса.',
  alternates: { canonical: '/1-klass/chtenie/stihi' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '1 класс', url: '/1-klass' },
  { name: 'Литературное чтение', url: '/1-klass/chtenie' },
  { name: 'Стихи', url: '/1-klass/chtenie/stihi' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Стихи',
  description: 'Поэтические произведения для 1 класса',
  url: '/1-klass/chtenie/stihi',
  educationalLevel: '1 класс начальной школы',
});

export default function StihiPage() {
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
          <span className="text-white">Стихи</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Стихи</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Что такое стихотворение?</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Рифма</h3>
              <p className="text-gray-300">
                В стихах строки часто заканчиваются похожими по звучанию словами — это называется рифмой. Например: «кошка — ложка», «стол — пол».
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Ритм</h3>
              <p className="text-gray-300">
                Стихи легко читать нараспев — в них есть особый ритм, похожий на музыку.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Учим наизусть</h3>
              <p className="text-gray-300 mb-4">
                Заучивание стихов развивает память и помогает лучше чувствовать красоту языка. Читай стихотворение по строчке, повторяй несколько раз.
              </p>
              <div className="p-4 bg-orange/10 rounded italic">
                Идёт бычок, качается,<br />
                Вздыхает на ходу...
              </div>
            </div>
          </div>
        </div>

        <TopicQuiz topic="1-klass/chtenie/stihi" />
      </div>
    </div>
  );
}
