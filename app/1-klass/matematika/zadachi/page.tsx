import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Задачи — теория и тренажёр для 1 класса',
  description: 'Простые текстовые задачи на сложение и вычитание для первоклассников.',
  alternates: { canonical: '/1-klass/matematika/zadachi' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '1 класс', url: '/1-klass' },
  { name: 'Математика', url: '/1-klass' },
  { name: 'Задачи', url: '/1-klass/matematika/zadachi' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Задачи',
  description: 'Простые текстовые задачи для 1 класса',
  url: '/1-klass/matematika/zadachi',
  educationalLevel: '1 класс начальной школы',
});

export default function ZadachiPage() {
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
          <Link href="/1-klass" className="text-orange hover:underline">Математика</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Задачи</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Задачи</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link
            href="/trenazher/zadachi-1klass"
            className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors"
          >
            🎮 Тренажер
          </Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Как решать текстовые задачи?</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Читаем внимательно</h3>
              <p className="text-gray-300">
                Прочитай задачу два раза. Пойми, что известно, а что нужно найти.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Выбираем действие</h3>
              <p className="text-gray-300 mb-4">
                Слова «стало», «получилось», «всего» часто говорят о сложении. Слова «осталось», «улетело», «съели» — о вычитании.
              </p>
              <div className="p-4 bg-orange/10 rounded">
                🍎 У Маши было 5 яблок. Она съела 2. Сколько яблок осталось?<br />
                Решение: 5 − 2 = 3 яблока
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: Записываем ответ</h3>
              <p className="text-gray-300">
                Не забывай писать полный ответ словами: «Осталось 3 яблока», а не просто число.
              </p>
            </div>
          </div>
        </div>

        <TopicQuiz topic="1-klass/matematika/zadachi" />
      </div>
    </div>
  );
}
