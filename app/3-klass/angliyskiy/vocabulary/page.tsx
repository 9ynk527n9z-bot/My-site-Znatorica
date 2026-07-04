import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Словарь — английский язык для 3 класса',
  description: 'Базовые английские слова по темам для третьеклассников.',
  alternates: { canonical: '/3-klass/angliyskiy/vocabulary' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '3 класс', url: '/3-klass' },
  { name: 'Английский язык', url: '/3-klass/angliyskiy' },
  { name: 'Словарь', url: '/3-klass/angliyskiy/vocabulary' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Словарь',
  description: 'Английский словарь для 3 класса',
  url: '/3-klass/angliyskiy/vocabulary',
  educationalLevel: '3 класс начальной школы',
});

export default function VocabularyPage() {
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
          <Link href="/3-klass/angliyskiy" className="text-orange hover:underline">Английский язык</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Словарь</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Словарь</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#16102A] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Новые английские слова</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Семья (Family)</h3>
              <div className="flex gap-3 flex-wrap text-sm font-bold">
                <span className="bg-orange/20 px-3 py-1 rounded">mother — мама</span>
                <span className="bg-orange/20 px-3 py-1 rounded">father — папа</span>
                <span className="bg-orange/20 px-3 py-1 rounded">sister — сестра</span>
                <span className="bg-orange/20 px-3 py-1 rounded">brother — брат</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Животные (Animals)</h3>
              <div className="flex gap-3 flex-wrap text-sm font-bold">
                <span className="bg-violet/20 px-3 py-1 rounded">dog — собака</span>
                <span className="bg-violet/20 px-3 py-1 rounded">cat — кошка</span>
                <span className="bg-violet/20 px-3 py-1 rounded">bird — птица</span>
                <span className="bg-violet/20 px-3 py-1 rounded">fish — рыба</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Как запоминать слова</h3>
              <p className="text-gray-300">
                Учи слова маленькими группами по темам, повторяй их через день. Полезно проговаривать слово вслух и представлять картинку.
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
