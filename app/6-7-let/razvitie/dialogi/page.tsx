import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Диалоги — теория и тренажёр для детей 6–7 лет',
  description: 'Учимся вести диалог и правильно общаться. Для детей 6-7 лет.',
  alternates: { canonical: '/6-7-let/razvitie/dialogi' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Дошкольники 6–7', url: '/6-7-let' },
  { name: 'Развитие речи', url: '/6-7-let' },
  { name: 'Диалоги', url: '/6-7-let/razvitie/dialogi' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Диалоги',
  description: 'Обучение навыкам общения и ведения диалога для детей 6-7 лет',
  url: '/6-7-let/razvitie/dialogi',
  educationalLevel: 'Дошкольное образование, 6–7 лет',
});

export default function DialogiPage() {
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
          <span className="text-white">Диалоги</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Диалоги</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link
            href="/trenazher/dialogi-6-7let"
            className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors"
          >
            🎮 Тренажер
          </Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Учимся общаться</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Что такое диалог?</h3>
              <p className="text-gray-300">
                Диалог — это разговор между двумя людьми, где каждый по очереди говорит и слушает собеседника.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Правила вежливого разговора</h3>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>Здоровайся при встрече и прощайся при расставании</li>
                <li>Слушай собеседника, не перебивай</li>
                <li>Говори «спасибо» и «пожалуйста»</li>
                <li>Задавай вопросы, если что-то интересно</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Потренируйся</h3>
              <p className="text-gray-300">Попробуй разыграть диалог с другом или родителями на тему «В магазине» или «Знакомство».</p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                💬 — Здравствуй! Как тебя зовут? — Меня зовут... А тебя?
              </div>
            </div>
          </div>
        </div>

        <TopicQuiz topic="6-7-let/razvitie/dialogi" />
      </div>
    </div>
  );
}
