import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Тело человека — окружающий мир для детей 6–7 лет',
  description: 'Знакомимся с основными частями тела и органами чувств, узнаём, зачем нужно заботиться о здоровье.',
  alternates: { canonical: '/6-7-let/okruzhayushchiy/telo-cheloveka' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Дошкольники 6–7', url: '/6-7-let' },
  { name: 'Окружающий мир', url: '/6-7-let' },
  { name: 'Тело человека', url: '/6-7-let/okruzhayushchiy/telo-cheloveka' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Тело человека',
  description: 'Основные части тела и органы чувств человека',
  url: '/6-7-let/okruzhayushchiy/telo-cheloveka',
  educationalLevel: 'Дошкольное образование, 6–7 лет',
});

export default function TeloChelovekaPage() {
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
          <span className="text-white">Тело человека</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Тело человека</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link
            href="/trenazher/telo-cheloveka"
            className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors"
          >
            🎮 Тренажер
          </Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Из чего мы устроены</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Пять органов чувств</h3>
              <p className="text-gray-300 mb-3">Они помогают нам узнавать мир вокруг:</p>
              <div className="grid grid-cols-2 gap-2 text-base">
                <div className="p-3 bg-black/40 rounded">👀 глаза — видим</div>
                <div className="p-3 bg-black/40 rounded">👂 уши — слышим</div>
                <div className="p-3 bg-black/40 rounded">👃 нос — чувствуем запах</div>
                <div className="p-3 bg-black/40 rounded">👅 язык — чувствуем вкус</div>
                <div className="p-3 bg-black/40 rounded">✋ кожа — чувствуем прикосновения</div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Сердце и лёгкие</h3>
              <p className="text-gray-300">
                Сердце без остановки качает кровь по всему телу. Лёгкие помогают нам дышать — вдыхать чистый воздух
                и выдыхать использованный.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Зачем беречь здоровье</h3>
              <p className="text-gray-300">
                Мыть руки перед едой, чистить зубы утром и вечером, гулять на свежем воздухе, есть овощи и фрукты —
                всё это помогает телу оставаться здоровым и сильным.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Каким органом мы чувствуем, что музыка играет громко?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Ушами.</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Почему важно мыть руки перед едой?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Чтобы микробы с рук не попали в организм вместе с едой и не вызвали болезнь.</p>
              </details>
            </div>
          </div>
        </div>

        <TopicQuiz topic="6-7-let/okruzhayushchiy/telo-cheloveka" />
      </div>
    </div>
  );
}
