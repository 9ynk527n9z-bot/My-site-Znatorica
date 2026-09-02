import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Рассказы — теория и тренажёр для детей 6–7 лет',
  description: 'Учимся составлять рассказы и истории по картинкам. Для детей 6-7 лет.',
  alternates: { canonical: '/6-7-let/razvitie/rasskazy' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Дошкольники 6–7', url: '/6-7-let' },
  { name: 'Развитие речи', url: '/6-7-let' },
  { name: 'Рассказы', url: '/6-7-let/razvitie/rasskazy' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Рассказы',
  description: 'Обучение составлению рассказов и историй для детей 6-7 лет',
  url: '/6-7-let/razvitie/rasskazy',
  educationalLevel: 'Дошкольное образование, 6–7 лет',
});

export default function RasskazyPage() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/6-7-let" className="text-orange hover:underline">Дошкольники 6–7</Link>
          <span className="text-gray-400">/</span>
          <Link href="/6-7-let" className="text-orange hover:underline">Развитие речи</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Рассказы</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Рассказы</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link
            href="/trenazher/rasskazy-6-7let"
            className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors"
          >
            🎮 Тренажер
          </Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Составляем истории</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: У истории есть начало, середина и конец</h3>
              <p className="text-gray-300">
                Любая история строится так: сначала что-то происходит (начало), потом случается главное событие (середина), а после — чем всё закончилось (конец).
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Рассказ по картинке</h3>
              <p className="text-gray-300">
                Посмотри на картинку и попробуй ответить: кто здесь изображён? Что они делают? Что произойдёт дальше?
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: Придумай свою историю</h3>
              <p className="text-gray-300 mb-4">Попробуй придумать короткую историю про своего любимого героя.</p>
              <div className="p-4 bg-orange/10 rounded">
                📚 Начни так: «Однажды...» и продолжи историю сам
              </div>
            </div>
          </div>
        </div>

        <TopicQuiz topic="6-7-let/razvitie/rasskazy" />
      </div>
    </div>
  );
}
