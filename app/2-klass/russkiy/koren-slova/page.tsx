import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Корень слова — русский язык для 2 класса',
  description: 'Учимся находить корень — общую часть родственных слов, и подбирать однокоренные слова.',
  alternates: { canonical: '/2-klass/russkiy/koren-slova' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '2 класс', url: '/2-klass' },
  { name: 'Русский язык', url: '/2-klass' },
  { name: 'Корень слова', url: '/2-klass/russkiy/koren-slova' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Корень слова',
  description: 'Нахождение корня и подбор однокоренных слов',
  url: '/2-klass/russkiy/koren-slova',
  educationalLevel: '2 класс начальной школы',
});

export default function KorenSlovaPage() {
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
          <span className="text-white">Корень слова</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Корень слова</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link
            href="/trenazher/koren-slova-2klass"
            className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors"
          >
            🎮 Тренажер
          </Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Что такое корень</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Корень — общая часть родственных слов</h3>
              <p className="text-gray-300">
                Родственные (однокоренные) слова связаны по смыслу и имеют общую часть — корень. Именно в корне
                хранится основное значение слова.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p className="text-2xl mb-1">
                  <b className="text-orange">лес</b>ник, <b className="text-orange">лес</b>ной, <b className="text-orange">лес</b>ок
                </p>
                <p className="text-gray-300 text-base">Общая часть «лес» — это корень, все слова связаны с лесом.</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Как найти корень</h3>
              <p className="text-gray-300">
                Подбери несколько родственных слов к нужному и сравни их — часть, которая повторяется во всех
                словах и не меняется, и есть корень.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: Не путай с похожими словами</h3>
              <p className="text-gray-300">
                Слова «гора» и «горе» звучат похоже, но не однокоренные — они не связаны по смыслу.
                А вот «гора», «горный», «пригорок» — родственные, у них общий корень «гор» и общий смысл.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Найди корень в словах: водяной, водопад, водичка.</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Корень «вод» — все слова связаны со словом «вода».</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Придумай два однокоренных слова к слову «снег».</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Например: снежок, снеговик, снежинка, снежный.</p>
              </details>
            </div>
          </div>
        </div>

        <TopicQuiz topic="2-klass/russkiy/koren-slova" />
      </div>
    </div>
  );
}
