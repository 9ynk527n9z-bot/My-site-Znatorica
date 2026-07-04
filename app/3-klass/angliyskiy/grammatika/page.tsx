import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Грамматика — английский язык для 3 класса',
  description: 'Present Simple и Past Simple для третьеклассников.',
  alternates: { canonical: '/3-klass/angliyskiy/grammatika' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '3 класс', url: '/3-klass' },
  { name: 'Английский язык', url: '/3-klass/angliyskiy' },
  { name: 'Грамматика', url: '/3-klass/angliyskiy/grammatika' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Грамматика',
  description: 'Английская грамматика для 3 класса: Present Simple, Past Simple',
  url: '/3-klass/angliyskiy/grammatika',
  educationalLevel: '3 класс начальной школы',
});

export default function GrammatikaPage() {
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
          <span className="text-white">Грамматика</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Грамматика</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#16102A] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Present Simple и Past Simple</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Present Simple — настоящее время</h3>
              <p className="text-gray-300">
                Используется, когда мы говорим о том, что происходит обычно или регулярно.
              </p>
              <div className="mt-2 p-3 bg-orange/10 rounded">
                I play football. — Я играю в футбол.<br />
                She reads books. — Она читает книги.
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Past Simple — прошедшее время</h3>
              <p className="text-gray-300">
                Используется, когда мы рассказываем о том, что уже произошло.
              </p>
              <div className="mt-2 p-3 bg-orange/10 rounded">
                I played football. — Я играл в футбол.<br />
                She read a book. — Она прочитала книгу.
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Правило -ed</h3>
              <p className="text-gray-300">
                У многих глаголов прошедшее время образуется добавлением окончания -ed: play → played, watch → watched.
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
