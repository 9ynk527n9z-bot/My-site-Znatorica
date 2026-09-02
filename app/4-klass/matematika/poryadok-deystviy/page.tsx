import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Порядок действий — математика для 4 класса',
  description: 'Учимся правильно расставлять порядок вычислений в примерах со скобками и разными действиями.',
  alternates: { canonical: '/4-klass/matematika/poryadok-deystviy' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '4 класс', url: '/4-klass' },
  { name: 'Математика', url: '/4-klass' },
  { name: 'Порядок действий', url: '/4-klass/matematika/poryadok-deystviy' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Порядок действий',
  description: 'Правила порядка выполнения арифметических действий',
  url: '/4-klass/matematika/poryadok-deystviy',
  educationalLevel: '4 класс начальной школы',
});

export default function PoryadokDeystviyPage() {
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
          <span className="text-white">Порядок действий</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Порядок действий</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link href="/trenazher/poryadok-deystviy" className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">В каком порядке решать длинный пример</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Правило 1: Сначала скобки</h3>
              <p className="text-gray-300">Всё, что в скобках, всегда считается первым, независимо от того, какие там действия.</p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Правило 2: Потом умножение и деление</h3>
              <p className="text-gray-300">
                Умножение и деление выполняются раньше сложения и вычитания — по порядку слева направо.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p className="text-2xl mb-1">2 + 3 × 4 = 2 + 12 = 14</p>
                <p className="text-gray-300 text-base">
                  А не 2 + 3 = 5, потом × 4 = 20 — это неправильно! Умножение считается раньше.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Правило 3: И только потом сложение и вычитание</h3>
              <p className="text-gray-300">Складываем и вычитаем в последнюю очередь, тоже по порядку слева направо.</p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Со скобками порядок меняется</h3>
              <div className="mt-2 p-4 bg-orange/10 rounded">
                <p className="text-2xl">(2 + 3) × 4 = 5 × 4 = 20</p>
                <p className="text-gray-300 text-base mt-1">Скобки заставляют посчитать сложение первым.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">10 − 2 × 3 = ?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать решение</summary>
                <p className="text-gray-300 mt-2">Сначала 2 × 3 = 6, потом 10 − 6 = 4.</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">6 + 12 ÷ 4 − 1 = ?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать решение</summary>
                <p className="text-gray-300 mt-2">Сначала 12 ÷ 4 = 3. Потом слева направо: 6 + 3 = 9, 9 − 1 = 8.</p>
              </details>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Готов тренироваться?</h3>
          <p className="text-gray-300 mb-6">
            Это одна из самых частых причин ошибок в контрольных работах — не потому, что вычисления сложные,
            а потому что порядок действий выбран неверно.
          </p>
          <Link href="/trenazher/poryadok-deystviy" className="btn-primary text-lg px-8 py-4 inline-block">🎮 Открыть тренажер</Link>
        </div>

        <TopicQuiz topic="4-klass/matematika/poryadok-deystviy" />
      </div>
    </div>
  );
}
