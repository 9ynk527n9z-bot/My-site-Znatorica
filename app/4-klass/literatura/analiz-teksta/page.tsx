import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Анализ текста — теория и тренажёр для 4 класса',
  description: 'Как разбирать литературное произведение: тема, идея, герои для четвероклассников.',
  alternates: { canonical: '/4-klass/literatura/analiz-teksta' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '4 класс', url: '/4-klass' },
  { name: 'Литература', url: '/4-klass/literatura' },
  { name: 'Анализ текста', url: '/4-klass/literatura/analiz-teksta' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Анализ текста',
  description: 'Анализ литературного произведения для 4 класса',
  url: '/4-klass/literatura/analiz-teksta',
  educationalLevel: '4 класс начальной школы',
});

export default function AnalizTekstaPage() {
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
          <Link href="/4-klass/literatura" className="text-orange hover:underline">Литература</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Анализ текста</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Анализ текста</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Как разбирать произведение</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Тема — о чём произведение</h3>
              <p className="text-gray-300">
                Тема отвечает на вопрос «о чём этот текст?». Например, тема может быть — дружба, взросление, преодоление трудностей.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Главная мысль (идея)</h3>
              <p className="text-gray-300">
                Идея — это то, что автор хотел сказать читателю, чему научить. Отвечает на вопрос «зачем автор это написал?».
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Герои произведения</h3>
              <p className="text-gray-300 mb-4">
                Обращай внимание на поступки героев — они помогают понять их характер и раскрывают главную мысль произведения.
              </p>
              <div className="p-4 bg-orange/10 rounded">
                📚 После чтения спроси себя: какой герой тебе понравился и почему? Чему учит эта история?
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Готов тренироваться?</h3>
          <p className="text-gray-300 mb-6">Нажми на кнопку ниже и начни интерактивный тренажер</p>
          <button className="btn-primary text-lg px-8 py-4">🎮 Открыть тренажер</button>
        </div>
      </div>
    </div>
  );
}
