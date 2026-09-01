import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Стили речи — теория и тренажёр для 4 класса',
  description: 'Разговорный, деловой и художественный стили речи для четвероклассников.',
  alternates: { canonical: '/4-klass/russkiy/stili-rechi' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '4 класс', url: '/4-klass' },
  { name: 'Русский язык', url: '/4-klass/russkiy' },
  { name: 'Стили речи', url: '/4-klass/russkiy/stili-rechi' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Стили речи',
  description: 'Стили речи для 4 класса',
  url: '/4-klass/russkiy/stili-rechi',
  educationalLevel: '4 класс начальной школы',
});

export default function StiliRechiPage() {
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
          <Link href="/4-klass/russkiy" className="text-orange hover:underline">Русский язык</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Стили речи</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Стили речи</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Разные способы общения</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Разговорный стиль</h3>
              <p className="text-gray-300">
                Используем в обычном общении с друзьями и семьёй. Простые слова, короткие фразы: «Привет! Как дела?»
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Художественный стиль</h3>
              <p className="text-gray-300">
                Используется в сказках, рассказах, стихах. Много ярких сравнений и описаний: «Золотое солнце ласково гладило верхушки деревьев».
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Деловой (официальный) стиль</h3>
              <p className="text-gray-300 mb-4">
                Используется в документах, объявлениях. Точные, строгие формулировки без эмоций: «Собрание состоится в 15:00».
              </p>
              <div className="p-4 bg-orange/10 rounded">
                💡 Попробуй рассказать об одном и том же событии тремя разными стилями!
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
