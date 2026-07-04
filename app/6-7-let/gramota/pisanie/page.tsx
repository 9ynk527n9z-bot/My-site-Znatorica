import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Письмо — теория и тренажёр для детей 6–7 лет',
  description: 'Учимся писать слова печатными буквами. Для детей 6-7 лет.',
  alternates: { canonical: '/6-7-let/gramota/pisanie' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Дошкольники 6–7', url: '/6-7-let' },
  { name: 'Грамота', url: '/6-7-let/gramota' },
  { name: 'Письмо', url: '/6-7-let/gramota/pisanie' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Письмо',
  description: 'Обучение письму печатными буквами для детей 6-7 лет',
  url: '/6-7-let/gramota/pisanie',
  educationalLevel: 'Дошкольное образование, 6–7 лет',
});

export default function PisaniePage() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#0A0812] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/6-7-let" className="text-orange hover:underline">Дошкольники 6–7</Link>
          <span className="text-gray-400">/</span>
          <Link href="/6-7-let/gramota" className="text-orange hover:underline">Грамота</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Письмо</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Письмо</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#16102A] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Учимся писать буквы и слова</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Правильно держим карандаш</h3>
              <p className="text-gray-300">
                Карандаш держат тремя пальцами: большим, указательным и средним. Рука должна быть расслабленной, не сжимай карандаш слишком сильно.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Пишем печатные буквы</h3>
              <p className="text-gray-300">
                Начни с простых букв: А, О, У. Обводи их по контуру, потом пробуй писать самостоятельно по клеточкам.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: От букв к словам</h3>
              <p className="text-gray-300 mb-4">Когда буквы получаются уверенно, переходи к написанию простых слов.</p>
              <div className="p-4 bg-orange/10 rounded">
                ✏️ Попробуй написать своё имя печатными буквами
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
