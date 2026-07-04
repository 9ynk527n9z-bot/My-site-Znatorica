import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Вычитание 5-10 — теория и тренажёр для 1 класса',
  description: 'Примеры на вычитание в пределах 10 для первоклассников.',
  alternates: { canonical: '/1-klass/matematika/vychitanie-5-10' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '1 класс', url: '/1-klass' },
  { name: 'Математика', url: '/1-klass/matematika' },
  { name: 'Вычитание 5-10', url: '/1-klass/matematika/vychitanie-5-10' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Вычитание 5-10',
  description: 'Примеры на вычитание в пределах 10 для 1 класса',
  url: '/1-klass/matematika/vychitanie-5-10',
  educationalLevel: '1 класс начальной школы',
});

export default function Vychitanie510Page() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#0A0812] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/1-klass" className="text-orange hover:underline">1 класс</Link>
          <span className="text-gray-400">/</span>
          <Link href="/1-klass/matematika" className="text-orange hover:underline">Математика</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Вычитание 5-10</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Вычитание 5-10</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#16102A] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Вычитаем числа в пределах 10</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Вычитание — обратное сложению</h3>
              <p className="text-gray-300">
                Если знаешь, что 4 + 5 = 9, то легко посчитать 9 − 5 = 4 и 9 − 4 = 5. Используй эту связь для проверки ответов.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Приём «отнять по одному»</h3>
              <p className="text-gray-300 mb-4">
                Для маленьких чисел (1, 2, 3) можно отнимать по одному: 8 − 3 = 7, 6, 5.
              </p>
              <div className="grid grid-cols-3 gap-3 text-xl font-bold">
                <span className="bg-orange/20 px-4 py-3 rounded text-center">8 − 3 = 5</span>
                <span className="bg-orange/20 px-4 py-3 rounded text-center">10 − 4 = 6</span>
                <span className="bg-orange/20 px-4 py-3 rounded text-center">7 − 2 = 5</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Проверяй себя</h3>
              <p className="text-gray-300">
                После решения примера прибавь результат к вычитаемому — должно получиться исходное число.
              </p>
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
