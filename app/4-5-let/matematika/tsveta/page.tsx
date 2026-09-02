import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Цвета и размеры — теория и тренажёр для детей 4–5 лет',
  description: 'Учимся различать основные цвета и сравнивать предметы по размеру. Для детей 4-5 лет.',
  alternates: { canonical: '/4-5-let/matematika/tsveta' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Дошкольники 4–5', url: '/4-5-let' },
  { name: 'Математика', url: '/4-5-let' },
  { name: 'Цвета и размеры', url: '/4-5-let/matematika/tsveta' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Цвета и размеры',
  description: 'Интерактивный тренажёр и теория по цветам и размерам предметов',
  url: '/4-5-let/matematika/tsveta',
  educationalLevel: 'Дошкольное образование, 4–5 лет',
});

export default function TsvetaPage() {
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
          <Link href="/4-5-let" className="text-orange hover:underline">Математика</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Цвета и размеры</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Цвета и размеры</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link href="/trenazher/tsveta" className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Учимся различать цвета и размеры</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Основные цвета</h3>
              <p className="text-gray-300 mb-4">
                Вокруг нас много ярких цветов! Запомнить их проще всего через знакомые предметы.
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-red-500 text-white text-center py-3 rounded font-bold">Красный — как яблоко</div>
                <div className="bg-orange text-white text-center py-3 rounded font-bold">Оранжевый — как апельсин</div>
                <div className="bg-yellow-400 text-black text-center py-3 rounded font-bold">Жёлтый — как солнце</div>
                <div className="bg-green-500 text-white text-center py-3 rounded font-bold">Зелёный — как трава</div>
                <div className="bg-blue-500 text-white text-center py-3 rounded font-bold">Синий — как небо</div>
                <div className="bg-violet text-white text-center py-3 rounded font-bold">Фиолетовый — как слива</div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Размеры предметов</h3>
              <p className="text-gray-300">
                Предметы бывают большие и маленькие. Слон большой, а мышка маленькая. Сравнивай предметы вокруг себя — что больше, а что меньше?
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                📏 Попробуй сравнить два любых предмета дома: какой из них больше, а какой меньше?
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Зачем это нужно?</h3>
              <p className="text-gray-300">
                Умение различать цвета и размеры помогает описывать мир вокруг и готовит к изучению математики и рисования в школе.
              </p>
            </div>
          </div>
        </div>

        <TopicQuiz topic="4-5-let/matematika/tsveta" />
      </div>
    </div>
  );
}
