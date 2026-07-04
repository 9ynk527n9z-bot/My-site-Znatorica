import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Сложение 5-10 — теория и тренажёр для 1 класса',
  description: 'Примеры на сложение в пределах 10 для первоклассников.',
  alternates: { canonical: '/1-klass/matematika/slozhenie-5-10' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '1 класс', url: '/1-klass' },
  { name: 'Математика', url: '/1-klass/matematika' },
  { name: 'Сложение 5-10', url: '/1-klass/matematika/slozhenie-5-10' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Сложение 5-10',
  description: 'Примеры на сложение в пределах 10 для 1 класса',
  url: '/1-klass/matematika/slozhenie-5-10',
  educationalLevel: '1 класс начальной школы',
});

export default function Slozhenie510Page() {
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
          <span className="text-white">Сложение 5-10</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Сложение 5-10</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#16102A] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Складываем числа в пределах 10</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Состав числа</h3>
              <p className="text-gray-300">
                Чтобы быстро складывать, полезно знать состав каждого числа. Например, 10 можно получить так: 1+9, 2+8, 3+7, 4+6, 5+5.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Приём «прибавить по одному»</h3>
              <p className="text-gray-300 mb-4">
                Если нужно прибавить маленькое число (1, 2, 3), можно прибавлять по одному: 6 + 3 = 6, 7, 8, 9.
              </p>
              <div className="grid grid-cols-3 gap-3 text-xl font-bold">
                <span className="bg-orange/20 px-4 py-3 rounded text-center">4 + 3 = 7</span>
                <span className="bg-orange/20 px-4 py-3 rounded text-center">5 + 5 = 10</span>
                <span className="bg-orange/20 px-4 py-3 rounded text-center">6 + 2 = 8</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Тренируйся каждый день</h3>
              <p className="text-gray-300">
                Регулярная практика поможет запомнить примеры наизусть — это ускорит счёт в будущем.
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
