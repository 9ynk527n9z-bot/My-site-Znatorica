import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Слоги — теория и тренажёр для детей 4–5 лет',
  description: 'Учимся читать слоги: соединяем буквы в слоги для детей 4-5 лет.',
  alternates: { canonical: '/4-5-let/gramota/slogov' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Дошкольники 4–5', url: '/4-5-let' },
  { name: 'Грамота', url: '/4-5-let/gramota' },
  { name: 'Слоги', url: '/4-5-let/gramota/slogov' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Слоги',
  description: 'Обучение чтению слогов для детей 4-5 лет',
  url: '/4-5-let/gramota/slogov',
  educationalLevel: 'Дошкольное образование, 4–5 лет',
});

export default function SlogovPage() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#0A0812] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/4-5-let" className="text-orange hover:underline">Дошкольники 4–5</Link>
          <span className="text-gray-400">/</span>
          <Link href="/4-5-let/gramota" className="text-orange hover:underline">Грамота</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Слоги</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Слоги</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#16102A] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Учимся читать слоги</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Что такое слог?</h3>
              <p className="text-gray-300">
                Слог — это согласная буква вместе с гласной, которые произносятся слитно, одним выдохом. Например, «МА» — это один слог.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Тренируемся соединять</h3>
              <p className="text-gray-300 mb-4">
                Возьми одну согласную и добавляй к ней разные гласные — получатся разные слоги.
              </p>
              <div className="flex gap-3 text-2xl font-bold flex-wrap">
                <span className="bg-orange/20 px-4 py-2 rounded">МА</span>
                <span className="bg-orange/20 px-4 py-2 rounded">МО</span>
                <span className="bg-orange/20 px-4 py-2 rounded">МУ</span>
                <span className="bg-orange/20 px-4 py-2 rounded">МИ</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: Из слогов — в слова</h3>
              <p className="text-gray-300">
                Соединяя слоги, получаем слова: МА + МА = МАМА. Попробуй прочитать слоги медленно, а потом быстрее.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                📖 Прочитай слоги: ПА-ПА, КО-Т, ДО-М
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
