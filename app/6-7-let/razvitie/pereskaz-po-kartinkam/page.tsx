import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Пересказ по картинкам — развитие речи для детей 6–7 лет',
  description: 'Учимся составлять связный рассказ по серии из нескольких картинок — с началом, серединой и концом истории.',
  alternates: { canonical: '/6-7-let/razvitie/pereskaz-po-kartinkam' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Дошкольники 6–7', url: '/6-7-let' },
  { name: 'Развитие речи', url: '/6-7-let' },
  { name: 'Пересказ по картинкам', url: '/6-7-let/razvitie/pereskaz-po-kartinkam' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Пересказ по картинкам',
  description: 'Составление связного рассказа по серии сюжетных картинок',
  url: '/6-7-let/razvitie/pereskaz-po-kartinkam',
  educationalLevel: 'Дошкольное образование, 6–7 лет',
});

export default function PereskazPoKartinkamPage() {
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
          <span className="text-white">Пересказ по картинкам</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Пересказ по картинкам</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link
            href="/trenazher/pereskaz-6-7let"
            className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors"
          >
            🎮 Тренажер
          </Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">От одной картинки — к целой истории</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Разложи картинки по порядку</h3>
              <p className="text-gray-300">
                Если картинок несколько, сначала пойми, какая была первой, какая — второй, и так далее.
                Порядок событий — основа связного рассказа.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded text-center text-2xl">
                🌱 → 🌿 → 🌳
              </div>
              <p className="text-gray-300 text-base mt-2">Сначала было семечко, потом росток, потом выросло дерево.</p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: У истории есть начало, середина и конец</h3>
              <p className="text-gray-300">
                Начало — что было сначала. Середина — что произошло дальше и почему. Конец — чем всё закончилось.
                Старайся использовать слова «сначала», «потом», «в конце».
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: Добавь, почему это произошло</h3>
              <p className="text-gray-300">
                В этом возрасте уже можно не просто описывать, что видно на картинке, а объяснять причину:
                «Он загрустил, ПОТОМУ ЧТО потерял мяч».
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="p-4 bg-black/40 rounded text-lg">
            <p className="mb-2 text-2xl text-center">☁️ → 🌧️ → 🌈</p>
            <p className="text-gray-300 mb-2">Составь историю из трёх предложений по этим картинкам.</p>
            <details className="mt-2">
              <summary className="cursor-pointer text-orange font-bold select-none">Пример ответа</summary>
              <p className="text-gray-300 mt-2">
                «Сначала на небе появилась туча. Потом пошёл дождь. А в конце, когда дождь закончился, на небе появилась радуга.»
              </p>
            </details>
          </div>
        </div>

        <TopicQuiz topic="6-7-let/razvitie/pereskaz-po-kartinkam" />
      </div>
    </div>
  );
}
