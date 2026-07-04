import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Деление — теория и тренажёр для 2 класса',
  description: 'Основы деления чисел для второклассников.',
  alternates: { canonical: '/2-klass/matematika/delenie' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '2 класс', url: '/2-klass' },
  { name: 'Математика', url: '/2-klass/matematika' },
  { name: 'Деление', url: '/2-klass/matematika/delenie' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Деление',
  description: 'Основы деления чисел для 2 класса',
  url: '/2-klass/matematika/delenie',
  educationalLevel: '2 класс начальной школы',
});

export default function DeleniePage() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#0A0812] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/2-klass" className="text-orange hover:underline">2 класс</Link>
          <span className="text-gray-400">/</span>
          <Link href="/2-klass/matematika" className="text-orange hover:underline">Математика</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Деление</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Деление</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#16102A] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Что такое деление?</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Деление — это разбиение на равные части</h3>
              <p className="text-gray-300">
                12 ÷ 3 означает «раздели 12 предметов поровну на 3 группы». В каждой группе получится по 4 предмета.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded text-2xl font-bold text-center">
                12 ÷ 3 = 4
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Деление и умножение — родственники</h3>
              <p className="text-gray-300">
                Если знаешь, что 3 × 4 = 12, то легко посчитать 12 ÷ 3 = 4 и 12 ÷ 4 = 3. Таблица умножения поможет и с делением.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Практика</h3>
              <p className="text-gray-300 mb-4">Раздели предметы на равные группы, чтобы лучше понять деление.</p>
              <div className="p-4 bg-orange/10 rounded">
                🍪 У Пети 10 печений. Он хочет разделить их поровну между 2 друзьями. Сколько печений получит каждый?
                <br />Решение: 10 ÷ 2 = 5 печений
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
