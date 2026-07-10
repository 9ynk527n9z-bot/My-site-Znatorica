import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Природные явления — окружающий мир для детей 6–7 лет',
  description: 'Знакомимся с дождём, снегом, ветром, грозой и радугой — что это такое и почему происходит.',
  alternates: { canonical: '/6-7-let/okruzhayushchiy/prirodnye-yavleniya' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Дошкольники 6–7', url: '/6-7-let' },
  { name: 'Окружающий мир', url: '/6-7-let' },
  { name: 'Природные явления', url: '/6-7-let/okruzhayushchiy/prirodnye-yavleniya' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Природные явления',
  description: 'Знакомство с основными природными явлениями',
  url: '/6-7-let/okruzhayushchiy/prirodnye-yavleniya',
  educationalLevel: 'Дошкольное образование, 6–7 лет',
});

export default function PrirodnyeYavleniyaPage() {
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
          <span className="text-white">Природные явления</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Природные явления</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Что происходит в природе</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">🌧️ Дождь</h3>
              <p className="text-gray-300">Капли воды падают из туч на землю. Вода из луж и рек нагревается солнцем, поднимается вверх и снова собирается в тучи — так вода путешествует по кругу.</p>
            </div>
            <div>
              <h3 className="font-bold text-orange mb-2">❄️ Снег</h3>
              <p className="text-gray-300">Когда на улице холодно, капельки воды в тучах замерзают и превращаются в снежинки — маленькие ледяные звёздочки.</p>
            </div>
            <div>
              <h3 className="font-bold text-orange mb-2">💨 Ветер</h3>
              <p className="text-gray-300">Воздух движется с места на место — там, где теплее, воздух поднимается вверх, а на его место приходит воздух из более холодных мест.</p>
            </div>
            <div>
              <h3 className="font-bold text-orange mb-2">⛈️ Гроза</h3>
              <p className="text-gray-300">Молния — это огромная искра электричества между тучами, а гром — это звук, который она издаёт. Гром слышен позже молнии, потому что звук летит медленнее света.</p>
            </div>
            <div>
              <h3 className="font-bold text-orange mb-2">🌈 Радуга</h3>
              <p className="text-gray-300">Появляется, когда солнце светит сквозь мелкие капли дождя — они разбивают солнечный свет на разные цвета, как маленькие призмы.</p>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Почему гром слышно позже, чем видно молнию?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Свет летит намного быстрее звука, поэтому молнию мы видим раньше, чем слышим гром от неё же.</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Когда чаще всего можно увидеть радугу — во время дождя и солнца одновременно, или в пасмурный день?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Во время дождя и солнца одновременно — нужны и капли воды, и солнечный свет.</p>
              </details>
            </div>
          </div>
        </div>

        <TopicQuiz topic="6-7-let/okruzhayushchiy/prirodnye-yavleniya" />
      </div>
    </div>
  );
}
