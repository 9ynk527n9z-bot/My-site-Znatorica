import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Аналогии — логика для 1 класса',
  description: 'Учимся находить связь между словами и подбирать пару по образцу: кошка — котёнок, собака — щенок.',
  alternates: { canonical: '/1-klass/logika/analogii' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '1 класс', url: '/1-klass' },
  { name: 'Логика и мышление', url: '/1-klass' },
  { name: 'Аналогии', url: '/1-klass/logika/analogii' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Аналогии',
  description: 'Поиск логической связи между парами слов',
  url: '/1-klass/logika/analogii',
  educationalLevel: '1 класс начальной школы',
});

export default function AnalogiiPage() {
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
          <span className="text-white">Аналогии</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Аналогии</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link
            href="/trenazher/analogii-1klass"
            className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors"
          >
            🎮 Тренажер
          </Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Что такое аналогия?</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Найди связь в первой паре</h3>
              <p className="text-gray-300">
                В задаче на аналогию даны два слова, связанные каким-то правилом. Сначала пойми, как именно они связаны.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                Кошка → Котёнок (мама и детёныш)
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Примени то же правило к новому слову</h3>
              <p className="text-gray-300">
                Дальше даётся третье слово — нужно подобрать к нему пару по тому же правилу, что и в первой паре.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                Кошка → Котёнок, Собака → <b>Щенок</b> (тоже мама и детёныш)
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: Правила бывают разные</h3>
              <p className="text-gray-300">Связь между словами может быть разной — вот основные виды:</p>
              <div className="mt-4 space-y-2 text-base">
                <div className="p-3 bg-black/40 rounded">🐄 Корова → Молоко, 🐝 Пчела → <b>Мёд</b> (кто что даёт)</div>
                <div className="p-3 bg-black/40 rounded">☀️ День → Ночь, 🔥 Горячий → <b>Холодный</b> (противоположности)</div>
                <div className="p-3 bg-black/40 rounded">🌲 Дерево → Лист, 🏠 Дом → <b>Крыша</b> (целое и часть)</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Птица → Гнездо, Медведь → ?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Берлога — оба слова обозначают жилище животного.</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Большой → Маленький, Быстрый → ?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Медленный — это тоже пара противоположностей.</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Ученик → Школа, Пациент → ?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Больница — оба слова про место, куда приходит человек в этой роли.</p>
              </details>
            </div>
          </div>
        </div>

        <TopicQuiz topic="1-klass/logika/analogii" />
      </div>
    </div>
  );
}
