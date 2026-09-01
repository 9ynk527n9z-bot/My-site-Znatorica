import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Состав числа — математика для 1 класса',
  description: 'Учимся раскладывать числа от 2 до 10 на два слагаемых. Основа для быстрого устного счёта.',
  alternates: { canonical: '/1-klass/matematika/sostav-chisla' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '1 класс', url: '/1-klass' },
  { name: 'Математика', url: '/1-klass' },
  { name: 'Состав числа', url: '/1-klass/matematika/sostav-chisla' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Состав числа',
  description: 'Разложение чисел от 2 до 10 на два слагаемых',
  url: '/1-klass/matematika/sostav-chisla',
  educationalLevel: '1 класс начальной школы',
});

export default function SostavChislaPage() {
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
          <span className="text-white">Состав числа</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Состав числа</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Из чего складывается число?</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Число можно разложить на два числа</h3>
              <p className="text-gray-300">
                Любое число больше 1 можно представить как сумму двух чисел. Например, число 5 — это
                4 и 1, или 3 и 2, или 5 и 0.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p className="text-2xl mb-1">5 = 4 + 1 = 3 + 2 = 5 + 0</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Зачем это нужно</h3>
              <p className="text-gray-300">
                Зная состав числа наизусть, легче считать в уме. Например, чтобы сложить 8 + 5,
                удобно вспомнить, что 5 = 2 + 3, тогда 8 + 2 = 10, и остаётся прибавить ещё 3: получится 13.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: Учим по одному числу за раз</h3>
              <p className="text-gray-300">
                Не нужно запоминать всё сразу — начните с состава числа 5, потом 6, и так постепенно до 10.
                Хорошо помогает раскладывать реальные предметы на две кучки и считать.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">6 = 4 + ?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">6 = 4 + 2</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">10 = 7 + ?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">10 = 7 + 3</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Назови все способы разложить число 4 на два числа больше 0.</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">4 = 3 + 1 = 2 + 2 = 1 + 3</p>
              </details>
            </div>
          </div>
        </div>

        <TopicQuiz topic="1-klass/matematika/sostav-chisla" />
      </div>
    </div>
  );
}
