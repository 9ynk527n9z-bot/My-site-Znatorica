import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Логические задачи — логика для 2 класса',
  description: 'Учимся рассуждать по шагам и делать выводы из нескольких условий на простых логических задачах.',
  alternates: { canonical: '/2-klass/logika/logicheskie-zadachi' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '2 класс', url: '/2-klass' },
  { name: 'Логика и мышление', url: '/2-klass' },
  { name: 'Логические задачи', url: '/2-klass/logika/logicheskie-zadachi' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Логические задачи',
  description: 'Решение логических задач методом рассуждений по условиям',
  url: '/2-klass/logika/logicheskie-zadachi',
  educationalLevel: '2 класс начальной школы',
});

export default function LogicheskieZadachiPage() {
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
          <span className="text-white">Логические задачи</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Логические задачи</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Как решать логические задачи</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Выпиши все условия</h3>
              <p className="text-gray-300">
                В логической задаче обычно даны несколько фактов. Важно не держать всё в голове, а разобрать факты по одному.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Ищи то, что можно вывести сразу</h3>
              <p className="text-gray-300">
                Часто один факт сразу указывает на ответ по какому-то вопросу, даже если задача выглядит сложно.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p className="mb-2">
                  У Ани, Бори и Вити — кот, собака и попугай, у каждого своё животное.
                  Известно: у Ани не кот и не собака.
                </p>
                <p className="text-gray-300 text-base">Значит, у Ани — попугай (методом исключения).</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: Продолжай исключать</h3>
              <p className="text-gray-300">
                После первого вывода задача становится проще — оставшиеся факты применяй к оставшимся вариантам.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">
                Маша выше Пети. Петя выше Кости. Кто самый высокий, а кто самый маленький?
              </p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Самая высокая — Маша, самый маленький — Костя. Петя — посередине.</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">
                В корзине лежат яблоко, груша и банан. Яблоко не жёлтое. Банан жёлтый. Груша не красная.
                Какого цвета яблоко, если фрукты бывают только красными, жёлтыми и зелёными?
              </p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">
                  Банан — жёлтый. Яблоко не жёлтое, значит оно красное или зелёное. Груша не красная — значит груша зелёная,
                  а раз груша забрала зелёный цвет, яблоко — красное.
                </p>
              </details>
            </div>
          </div>
        </div>

        <TopicQuiz topic="2-klass/logika/logicheskie-zadachi" />
      </div>
    </div>
  );
}
