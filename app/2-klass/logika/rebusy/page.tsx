import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Ребусы — логика для 2 класса',
  description: 'Учимся разгадывать ребусы: как цифры и буквы в них превращаются в слова. С примерами и объяснением правил.',
  alternates: { canonical: '/2-klass/logika/rebusy' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '2 класс', url: '/2-klass' },
  { name: 'Логика и мышление', url: '/2-klass' },
  { name: 'Ребусы', url: '/2-klass/logika/rebusy' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Ребусы',
  description: 'Разгадывание ребусов с буквами и цифрами',
  url: '/2-klass/logika/rebusy',
  educationalLevel: '2 класс начальной школы',
});

export default function RebusyPage() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/2-klass" className="text-orange hover:underline">2 класс</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Ребусы</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Ребусы</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Как разгадывать ребусы с цифрами</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Цифра может звучать как слог</h3>
              <p className="text-gray-300">
                Одно из самых частых правил в ребусах — цифра заменяет часть слова, которая звучит так же, как название числа.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p className="text-2xl mb-1">7Я</p>
                <p className="text-gray-300 text-base">«7» читается как «семь», дальше «Я» — вместе получается «семь+я» = <b>семья</b>.</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Число может быть в середине слова</h3>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p className="text-2xl mb-1">100Л</p>
                <p className="text-gray-300 text-base">«100» — это «сто», плюс «Л» — получается «сто+л» = <b>стол</b>.</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: Проверяй вслух</h3>
              <p className="text-gray-300">
                Лучший способ разгадать ребус — прочитать все части вслух подряд, не останавливаясь. Часто слово «складывается» само,
                как только произносишь всё слитно.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p className="text-2xl mb-1">ВИ3НА</p>
                <p className="text-gray-300 text-base">«ви» + «три» + «на» = <b>витрина</b>.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2 text-2xl">40А</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">«Сорок» + «а» = <b>сорока</b> (птица).</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2 text-2xl">С3Ж</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">«С» + «три» + «ж» = <b>стриж</b> (птица).</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2 text-2xl">О5</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">«О» + «пять» = <b>опять</b>.</p>
              </details>
            </div>
          </div>
        </div>

        <TopicQuiz topic="2-klass/logika/rebusy" />
      </div>
    </div>
  );
}
