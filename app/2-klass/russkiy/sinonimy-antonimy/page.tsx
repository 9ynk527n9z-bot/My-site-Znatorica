import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Синонимы и антонимы — русский язык для 2 класса',
  description: 'Учимся находить синонимы — слова, близкие по значению, и антонимы — слова с противоположным значением.',
  alternates: { canonical: '/2-klass/russkiy/sinonimy-antonimy' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '2 класс', url: '/2-klass' },
  { name: 'Русский язык', url: '/2-klass' },
  { name: 'Синонимы и антонимы', url: '/2-klass/russkiy/sinonimy-antonimy' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Синонимы и антонимы',
  description: 'Различение синонимов (слов, близких по значению) и антонимов (слов с противоположным значением)',
  url: '/2-klass/russkiy/sinonimy-antonimy',
  educationalLevel: '2 класс начальной школы',
});

export default function SinonimyAntonimyPage() {
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
          <span className="text-white">Синонимы и антонимы</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Синонимы и антонимы</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link
            href="/trenazher/sinonimy-antonimy-2klass"
            className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors"
          >
            🎮 Тренажер
          </Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Что такое синонимы и антонимы</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Синонимы — слова, близкие по значению</h3>
              <p className="text-gray-300">
                Синонимы — это разные слова, которые называют почти одно и то же. Они звучат и пишутся по-разному,
                но означают похожее.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p className="text-2xl mb-1">
                  <b className="text-orange">большой</b> — <b className="text-orange">огромный</b>
                </p>
                <p className="text-gray-300 text-base">Оба слова говорят о том, что предмет имеет большой размер.</p>
              </div>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p className="text-2xl mb-1">
                  <b className="text-orange">быстрый</b> — <b className="text-orange">скорый</b>
                </p>
                <p className="text-gray-300 text-base">Оба слова говорят о высокой скорости.</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Антонимы — слова с противоположным значением</h3>
              <p className="text-gray-300">
                Антонимы — это слова, которые называют противоположные, обратные друг другу свойства или действия.
              </p>
              <div className="mt-4 p-4 bg-violet/10 rounded">
                <p className="text-2xl mb-1">
                  <b className="text-violet">большой</b> — <b className="text-violet">маленький</b>
                </p>
                <p className="text-gray-300 text-base">Размеры полностью противоположны.</p>
              </div>
              <div className="mt-4 p-4 bg-violet/10 rounded">
                <p className="text-2xl mb-1">
                  <b className="text-violet">быстрый</b> — <b className="text-violet">медленный</b>
                </p>
                <p className="text-gray-300 text-base">Скорость противоположна: одно быстро, другое медленно.</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: Как отличить синонимы от антонимов</h3>
              <p className="text-gray-300">
                Задай себе вопрос: слова говорят об одном и том же (пусть и разными словами) или об обратном?
                Если об одном и том же — это синонимы (весёлый — радостный). Если об обратном —
                это антонимы (весёлый — грустный).
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 4: Не путай с однокоренными словами</h3>
              <p className="text-gray-300">
                Однокоренные слова имеют общую часть — корень (например, «дом», «домик», «домашний»), но это
                не значит, что они синонимы или антонимы. «Дом» и «домик» — однокоренные, но не синонимы: домик —
                это просто маленький дом, а не другое слово с тем же значением. А вот «врач» и «доктор» —
                настоящие синонимы, хотя у них совсем разные корни. Синонимы и антонимы связаны по смыслу,
                а однокоренные слова — по составу слова.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Подбери синоним к слову «храбрый».</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Смелый — оба слова говорят о том, что кто-то не боится.</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Подбери антоним к слову «чистый».</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Грязный — это противоположное значение.</p>
              </details>
            </div>
          </div>
        </div>

        <TopicQuiz topic="2-klass/russkiy/sinonimy-antonimy" />
      </div>
    </div>
  );
}
