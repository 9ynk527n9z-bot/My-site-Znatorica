import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Задачи на переливание — логика для 4 класса',
  description: 'Учимся отмерять нужный объём воды двумя сосудами без делений — классические задачи на переливание.',
  alternates: { canonical: '/4-klass/logika/zadachi-na-perelivanie' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '4 класс', url: '/4-klass' },
  { name: 'Логика и мышление', url: '/4-klass' },
  { name: 'Задачи на переливание', url: '/4-klass/logika/zadachi-na-perelivanie' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Задачи на переливание',
  description: 'Классические логические задачи на отмеривание объёма воды двумя сосудами',
  url: '/4-klass/logika/zadachi-na-perelivanie',
  educationalLevel: '4 класс начальной школы',
});

export default function ZadachiNaPerelivaniePage() {
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
          <span className="text-white">Задачи на переливание</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Задачи на переливание</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Как отмерить нужный объём без мерного стакана</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Условие</h3>
              <p className="text-gray-300">
                Есть два сосуда без делений: один на 3 литра, другой на 5 литров, и кран с водой.
                Как отмерить ровно 4 литра?
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Наполни большой сосуд</h3>
              <p className="text-gray-300">Наполняем 5-литровый сосуд полностью. Состояние: 3л — 0, 5л — 5.</p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Перелей в маленький, пока не заполнится</h3>
              <p className="text-gray-300">
                Переливаем воду из 5-литрового в 3-литровый, пока тот не заполнится доверху.
                В 3-литровом теперь 3 литра, а в 5-литровом осталось 5 − 3 = 2 литра.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: Освободи маленький сосуд</h3>
              <p className="text-gray-300">
                Выливаем воду из 3-литрового сосуда. Переливаем в него оставшиеся 2 литра из 5-литрового.
                Состояние: 3л — 2, 5л — 0.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 4: Наполни большой сосуд снова</h3>
              <p className="text-gray-300">
                Наполняем 5-литровый сосуд полностью ещё раз. Состояние: 3л — 2, 5л — 5.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 5: Долей маленький до полного</h3>
              <p className="text-gray-300">
                В 3-литровом уже есть 2 литра — ему не хватает 1 литра до полного. Переливаем из 5-литрового
                ровно 1 литр. В 5-литровом остаётся 5 − 1 = 4 литра — то, что нужно было найти!
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p>Итоговый результат: в 5-литровом сосуде ровно 4 литра воды ✅</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="p-4 bg-black/40 rounded text-lg">
            <p className="mb-2">Как теми же двумя сосудами (3 л и 5 л) отмерить ровно 1 литр?</p>
            <details className="mt-2">
              <summary className="cursor-pointer text-orange font-bold select-none">Показать решение</summary>
              <p className="text-gray-300 mt-2">
                Наполни 3-литровый сосуд и перелей его целиком в 5-литровый (3л — 0, 5л — 3).
                Наполни 3-литровый снова и переливай в 5-литровый, пока тот не заполнится доверху —
                5-литровому не хватало 2 литра, значит, в 3-литровом сосуде останется 3 − 2 = 1 литр.
              </p>
            </details>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Готов тренироваться?</h3>
          <p className="text-gray-300 mb-6">
            Попробуйте решить эту задачу дома с настоящими стаканами или бутылками — так гораздо легче
            понять логику переливания, чем просто читая текст.
          </p>
          <button className="btn-primary text-lg px-8 py-4">🎮 Открыть тренажер</button>
        </div>
      </div>
    </div>
  );
}
