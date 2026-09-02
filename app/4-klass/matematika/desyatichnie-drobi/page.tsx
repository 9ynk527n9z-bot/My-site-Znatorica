import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Десятичные дроби — теория и тренажёр для 4 класса',
  description: 'Работа с десятичными дробями и запятой для четвероклассников.',
  alternates: { canonical: '/4-klass/matematika/desyatichnie-drobi' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '4 класс', url: '/4-klass' },
  { name: 'Математика', url: '/4-klass' },
  { name: 'Десятичные дроби', url: '/4-klass/matematika/desyatichnie-drobi' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Десятичные дроби',
  description: 'Десятичные дроби для 4 класса',
  url: '/4-klass/matematika/desyatichnie-drobi',
  educationalLevel: '4 класс начальной школы',
});

export default function DesyatichnieDrobiPage() {
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
          <Link href="/4-klass" className="text-orange hover:underline">Математика</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Десятичные дроби</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Десятичные дроби</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link
            href="/trenazher/desyatichnie-drobi-4klass"
            className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors"
          >
            🎮 Тренажер
          </Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Дроби через запятую</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Что такое десятичная дробь?</h3>
              <p className="text-gray-300">
                Это другой способ записать дробь, где вместо черты используется запятая. Число 0,5 — это то же самое, что 1/2 (половина).
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded text-xl font-bold text-center">
                0,5 = 1/2 &nbsp;&nbsp;&nbsp; 0,25 = 1/4
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Разряды после запятой</h3>
              <p className="text-gray-300">
                Первая цифра после запятой — это десятые доли, вторая — сотые. Например, 3,42 — это 3 целых, 4 десятых и 2 сотых.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Где встречаются десятичные дроби?</h3>
              <p className="text-gray-300">
                Чаще всего мы видим их в ценах (99,90 ₽) и при измерении (1,75 метра роста).
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Готов тренироваться?</h3>
          <p className="text-gray-300 mb-6">Нажми на кнопку ниже и начни интерактивный тренажер</p>
          <Link href="/trenazher/desyatichnie-drobi-4klass" className="btn-primary text-lg px-8 py-4 inline-block">
            🎮 Открыть тренажер
          </Link>
        </div>

        <TopicQuiz topic="4-klass/matematika/desyatichnie-drobi" />
      </div>
    </div>
  );
}
