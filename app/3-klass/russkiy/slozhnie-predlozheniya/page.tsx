import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Сложные предложения — теория и тренажёр для 3 класса',
  description: 'Объединяем простые предложения в сложные для третьеклассников.',
  alternates: { canonical: '/3-klass/russkiy/slozhnie-predlozheniya' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '3 класс', url: '/3-klass' },
  { name: 'Русский язык', url: '/3-klass/russkiy' },
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

      <div className="bg-[#0A0812] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/3-klass" className="text-orange hover:underline">3 класс</Link>
          <span className="text-gray-400">/</span>
          <Link href="/3-klass/russkiy" className="text-orange hover:underline">Русский язык</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Сложные предложения</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Сложные предложения</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#16102A] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Объединяем простые предложения</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Простое и сложное предложение</h3>
              <p className="text-gray-300">
                Простое предложение содержит одну мысль (одну грамматическую основу). Сложное — объединяет две и больше простых частей.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Как соединяются части</h3>
              <p className="text-gray-300 mb-4">
                Части сложного предложения соединяются союзами (и, а, но, потому что) или просто запятой.
              </p>
              <div className="p-4 bg-orange/10 rounded">
                Простые: «Светит солнце.» + «Птицы поют.»<br />
                Сложное: «Светит солнце, <span className="text-orange font-bold">и</span> птицы поют.»
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Запятая перед союзом</h3>
              <p className="text-gray-300">
                Перед союзами «а», «но» и часто перед «и» в сложном предложении ставится запятая — она разделяет части.
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
