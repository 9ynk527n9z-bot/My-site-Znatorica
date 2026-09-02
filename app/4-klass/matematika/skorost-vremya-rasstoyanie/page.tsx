import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Задачи на движение — 4 класс',
  description: 'Формула S = v × t: как найти расстояние, скорость и время. Теория и тренажёр для 4 класса.',
  alternates: { canonical: '/4-klass/matematika/skorost-vremya-rasstoyanie' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '4 класс', url: '/4-klass' },
  { name: 'Математика', url: '/4-klass' },
  { name: 'Задачи на движение', url: '/4-klass/matematika/skorost-vremya-rasstoyanie' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Задачи на движение',
  description: 'Скорость, время и расстояние для 4 класса',
  url: '/4-klass/matematika/skorost-vremya-rasstoyanie',
  educationalLevel: '4 класс начальной школы',
});

export default function SkorostVremyaRasstoyaniePage() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/4-klass" className="text-orange hover:underline">4 класс</Link>
          <span className="text-gray-400">/</span>
          <Link href="/4-klass" className="text-orange hover:underline">Математика</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Задачи на движение</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Задачи на движение</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link
            href="/trenazher/skorost-vremya-rasstoyanie-4klass"
            className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors"
          >
            🎮 Тренажер
          </Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Скорость, время и расстояние</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Главная формула: S = v × t</h3>
              <p className="text-gray-300">
                Расстояние (S) равно скорости (v), умноженной на время (t). Скорость показывает, сколько километров
                проезжают (или проходят) за один час — поэтому её измеряют в км/ч.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded text-center">
                Машина едет со скоростью 60 км/ч, в пути 2 часа<br />
                <span className="font-bold text-xl">S = v × t = 60 × 2 = 120 км</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Как найти скорость: v = S ÷ t</h3>
              <p className="text-gray-300">
                Если известны расстояние и время, скорость находится делением расстояния на время.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded text-center">
                Велосипедист проехал 30 км за 3 часа<br />
                <span className="font-bold text-xl">v = S ÷ t = 30 ÷ 3 = 10 км/ч</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Как найти время: t = S ÷ v</h3>
              <p className="text-gray-300">
                Если известны расстояние и скорость, время находится делением расстояния на скорость.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded text-center">
                Поезд должен проехать 240 км со скоростью 80 км/ч<br />
                <span className="font-bold text-xl">t = S ÷ v = 240 ÷ 80 = 3 ч</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Треугольник-подсказка</h3>
              <p className="text-gray-300">
                Легко запомнить все три формулы: S всегда сверху, v и t — снизу. Если закрыть пальцем нужную букву,
                оставшиеся две подскажут действие: S закрыто — v × t (умножение); v закрыто — S ÷ t; t закрыто — S ÷ v.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Пример 3: пешеход</h3>
              <p className="text-gray-300">
                Пешеход идёт со скоростью 5 км/ч. За сколько часов он пройдёт 20 км?
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded text-center">
                <span className="font-bold text-xl">t = S ÷ v = 20 ÷ 5 = 4 ч</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Не путай единицы измерения</h3>
              <p className="text-gray-300">
                Скорость измеряется в км/ч (или м/мин), время — в часах (или минутах), расстояние — в км (или метрах).
                Перед решением задачи всегда проверяй, что единицы измерения подходят друг другу.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange/20 to-purple/20 border border-orange rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Готов тренироваться?</h3>
          <p className="text-gray-300 mb-6">Нажми на кнопку ниже и начни интерактивный тренажер</p>
          <Link href="/trenazher/skorost-vremya-rasstoyanie-4klass" className="btn-primary text-lg px-8 py-4 inline-block">
            🎮 Открыть тренажер
          </Link>
        </div>

        <TopicQuiz topic="4-klass/matematika/skorost-vremya-rasstoyanie" />
      </div>
    </div>
  );
}
