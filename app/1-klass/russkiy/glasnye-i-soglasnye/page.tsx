import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Гласные и согласные звуки — русский язык для 1 класса',
  description: 'Учимся различать гласные и согласные звуки и буквы, а среди согласных — звонкие и глухие, твёрдые и мягкие.',
  alternates: { canonical: '/1-klass/russkiy/glasnye-i-soglasnye' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '1 класс', url: '/1-klass' },
  { name: 'Русский язык', url: '/1-klass' },
  { name: 'Гласные и согласные', url: '/1-klass/russkiy/glasnye-i-soglasnye' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Гласные и согласные',
  description: 'Различение гласных и согласных звуков и букв',
  url: '/1-klass/russkiy/glasnye-i-soglasnye',
  educationalLevel: '1 класс начальной школы',
});

export default function GlasnyeSoglasnyePage() {
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
          <span className="text-white">Гласные и согласные</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Гласные и согласные</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link href="/trenazher/glasnye-soglasnye" className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Как отличить гласный звук от согласного</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Гласный звук можно петь</h3>
              <p className="text-gray-300">
                Гласный звук произносится свободно, без преград — рот открыт, воздух проходит легко.
                Его можно долго тянуть голосом, как будто поёшь. Всего в русском языке 10 гласных букв:
              </p>
              <div className="mt-4 flex gap-3 text-2xl font-bold flex-wrap">
                {['А', 'О', 'У', 'Ы', 'Э', 'Я', 'Ё', 'Ю', 'И', 'Е'].map((l) => (
                  <span key={l} className="bg-orange/20 px-3 py-1 rounded">{l}</span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Согласный звук — с преградой</h3>
              <p className="text-gray-300">
                При произнесении согласного звука воздух встречает преграду — губы, зубы или язык.
                Его нельзя долго тянуть голосом, как гласный.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                Попробуй потянуть звук «Б» — не получится так же легко, как «А».
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: Согласные бывают звонкие и глухие</h3>
              <p className="text-gray-300">
                Звонкие согласные произносятся голосом, глухие — без голоса, одним шумом.
                У большинства согласных есть пара «звонкий-глухой»: Б-П, В-Ф, Г-К, Д-Т, Ж-Ш, З-С.
                Но есть согласные без пары: Й, Л, М, Н, Р — всегда звонкие, а Х, Ц, Ч, Щ — всегда глухие.
                Приложи руку к горлу — при звонком звуке чувствуется дрожание.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 4: Согласные бывают твёрдые и мягкие</h3>
              <p className="text-gray-300">
                Сравни «мама» и «мяч» — звук «М» в первом слове твёрдый, а во втором — мягкий.
                Мягкость часто показывают буквы Е, Ё, Ю, Я, И или мягкий знак Ь после согласной.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Сколько гласных звуков в слове «окно»?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Два — «о» и «о».</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Звук «З» в слове «зима» — звонкий или глухой?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Звонкий — произносится голосом.</p>
              </details>
            </div>
          </div>
        </div>

        <TopicQuiz topic="1-klass/russkiy/glasnye-i-soglasnye" />
      </div>
    </div>
  );
}
