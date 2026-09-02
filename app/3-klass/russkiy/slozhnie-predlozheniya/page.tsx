import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Сложные предложения — теория и тренажёр для 3 класса',
  description: 'Объединяем простые предложения в сложные для третьеклассников.',
  alternates: { canonical: '/3-klass/russkiy/slozhnie-predlozheniya' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '3 класс', url: '/3-klass' },
  { name: 'Русский язык', url: '/3-klass' },
  { name: 'Сложные предложения', url: '/3-klass/russkiy/slozhnie-predlozheniya' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Сложные предложения',
  description: 'Сложные предложения для 3 класса',
  url: '/3-klass/russkiy/slozhnie-predlozheniya',
  educationalLevel: '3 класс начальной школы',
});

export default function SlozhniePredlozheniyaPage() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/3-klass" className="text-orange hover:underline">3 класс</Link>
          <span className="text-gray-400">/</span>
          <Link href="/3-klass" className="text-orange hover:underline">Русский язык</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Сложные предложения</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Сложные предложения</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link
            href="/trenazher/slozhnie-predlozheniya-3klass"
            className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors"
          >
            🎮 Тренажер
          </Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Объединяем простые предложения</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Грамматическая основа</h3>
              <p className="text-gray-300">
                Грамматическая основа — это подлежащее и сказуемое. Подлежащее отвечает на вопросы «кто?»,
                «что?», а сказуемое — на вопросы «что делает?», «что сделает?».
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Простое предложение</h3>
              <p className="text-gray-300 mb-4">
                В простом предложении только одна грамматическая основа.
              </p>
              <div className="p-4 bg-orange/10 rounded">
                <b>Белый волк завыл на луну.</b> — одна грамматическая основа: волк завыл.
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Сложное предложение</h3>
              <p className="text-gray-300 mb-4">
                В сложном предложении две и более грамматических основ. Простые предложения в составе
                сложного соединяются союзами или союзными словами (и, а, но, чтобы, потому что, так как,
                где и т. д.) либо без союзов — по интонации.
              </p>
              <div className="p-4 bg-orange/10 rounded">
                <b>Путник слышал уханье совы, но она быстро улетела.</b> — две грамматические основы:
                путник слышал и она улетела.
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Запятая перед союзом</h3>
              <p className="text-gray-300 mb-4">
                Части сложного предложения на письме разделяются запятой — она ставится перед союзом,
                который их соединяет.
              </p>
              <div className="p-4 bg-orange/10 rounded space-y-1">
                <p>Падают снежинки<span className="text-orange font-bold">,</span> и дорога становится белой.</p>
                <p>Я люблю клубнику<span className="text-orange font-bold">,</span> а Маша обожает чернику.</p>
                <p>На улице светит солнце<span className="text-orange font-bold">,</span> но выходить Дима не собирается.</p>
              </div>
            </div>
          </div>
        </div>

        <TopicQuiz topic="3-klass/russkiy/slozhnie-predlozheniya" />
      </div>
    </div>
  );
}
