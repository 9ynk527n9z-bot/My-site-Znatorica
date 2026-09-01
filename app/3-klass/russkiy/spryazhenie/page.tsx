import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Спряжение — теория и тренажёр для 3 класса',
  description: 'Глаголы и их формы: спряжение для третьеклассников.',
  alternates: { canonical: '/3-klass/russkiy/spryazhenie' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '3 класс', url: '/3-klass' },
  { name: 'Русский язык', url: '/3-klass/russkiy' },
  { name: 'Спряжение', url: '/3-klass/russkiy/spryazhenie' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Спряжение',
  description: 'Спряжение глаголов для 3 класса',
  url: '/3-klass/russkiy/spryazhenie',
  educationalLevel: '3 класс начальной школы',
});

export default function SpryazheniePage() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/3-klass" className="text-orange hover:underline">3 класс</Link>
          <span className="text-gray-400">/</span>
          <Link href="/3-klass/russkiy" className="text-orange hover:underline">Русский язык</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Спряжение</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Спряжение</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Как изменяются глаголы</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Что такое спряжение?</h3>
              <p className="text-gray-300">
                Спряжение — это изменение глагола по лицам и числам: я иду, ты идёшь, он идёт, мы идём.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Два типа спряжения</h3>
              <p className="text-gray-300 mb-4">
                В русском языке глаголы делятся на I и II спряжение — они отличаются окончаниями.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange/10 p-4 rounded">
                  <p className="font-bold text-orange mb-2">I спряжение</p>
                  <p className="text-gray-300 text-sm">он читает, они читают</p>
                </div>
                <div className="bg-violet/10 p-4 rounded">
                  <p className="font-bold text-violet mb-2">II спряжение</p>
                  <p className="text-gray-300 text-sm">он говорит, они говорят</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Зачем это знать?</h3>
              <p className="text-gray-300">
                Знание спряжения помогает правильно писать безударные окончания глаголов, где легко ошибиться.
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
