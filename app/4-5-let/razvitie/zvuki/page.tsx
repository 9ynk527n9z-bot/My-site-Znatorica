import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Звуки — теория и тренажёр для детей 4–5 лет',
  description: 'Учимся слышать и произносить звуки речи. Развитие фонематического слуха для детей 4-5 лет.',
  alternates: { canonical: '/4-5-let/razvitie/zvuki' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Дошкольники 4–5', url: '/4-5-let' },
  { name: 'Развитие речи', url: '/4-5-let/razvitie' },
  { name: 'Звуки', url: '/4-5-let/razvitie/zvuki' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Звуки',
  description: 'Развитие фонематического слуха: слышим и произносим звуки речи',
  url: '/4-5-let/razvitie/zvuki',
  educationalLevel: 'Дошкольное образование, 4–5 лет',
});

export default function ZvukiPage() {
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
          <Link href="/4-5-let/razvitie" className="text-orange hover:underline">Развитие речи</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Звуки</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Звуки</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#16102A] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Что такое звуки речи?</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Слушаем внимательно</h3>
              <p className="text-gray-300">
                Каждое слово состоит из звуков. Скажи слово «мама» медленно — слышишь, как звуки идут один за другим: м-а-м-а?
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Гласные и согласные</h3>
              <p className="text-gray-300 mb-4">
                Звуки бывают двух видов. Гласные — тянутся и поются (а, о, у, и, э, ы). Согласные — их нельзя пропеть (б, в, г, д и другие).
              </p>
              <div className="flex gap-4 flex-wrap">
                <span className="bg-orange/20 px-4 py-2 rounded font-bold">Гласные: а о у и э ы</span>
                <span className="bg-violet/20 px-4 py-2 rounded font-bold">Согласные: б в г д ж...</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: Игра «Найди звук»</h3>
              <p className="text-gray-300">
                Попробуй найти слова, которые начинаются на один и тот же звук. Например, «кот», «книга», «карандаш» — все начинаются на «к».
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                🗣️ Скажи 3 слова, которые начинаются на звук «м»
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
