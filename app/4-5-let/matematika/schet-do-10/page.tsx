import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicTabs from '@/components/TopicTabs';
import CountingTrainer from '@/components/trainers/CountingTrainer';

export const metadata = {
  title: 'Счёт до 10 — теория, тренажёр и шпаргалка для детей 4–5 лет',
  description: 'Интерактивный тренажёр и понятная теория для обучения счёту до 10. Для детей 4-5 лет.',
  alternates: { canonical: '/4-5-let/matematika/schet-do-10' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Дошкольники 4–5', url: '/4-5-let' },
  { name: 'Математика', url: '/4-5-let/matematika' },
  { name: 'Счёт до 10', url: '/4-5-let/matematika/schet-do-10' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Счёт до 10',
  description: 'Интерактивный тренажёр и теория для обучения счёту до 10',
  url: '/4-5-let/matematika/schet-do-10',
  educationalLevel: 'Дошкольное образование, 4–5 лет',
});

export default function SchetDo10Page() {
  return (
    <div className="bg-black min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }}
      />
      {/* Breadcrumbs */}
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">
            Главная
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/4-5-let" className="text-orange hover:underline">
            Дошкольники 4–5
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/4-5-let/matematika" className="text-orange hover:underline">
            Математика
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Счёт до 10</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Счёт до 10</h1>

        <TopicTabs
          theory={
            <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Как считать до 10?</h2>

              <div className="space-y-6 text-lg">
                <div>
                  <h3 className="font-bold text-orange mb-2">Шаг 1: Вспомни числа от 1 до 5</h3>
                  <p className="text-gray-300">
                    Теперь ты знаешь, как считать до 5. Давай продолжим дальше!
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-orange mb-2">Шаг 2: Узнаём числа 6, 7, 8, 9, 10</h3>
                  <p className="text-gray-300">
                    После 5 идут ещё пять чисел. Давай выучим их!
                  </p>
                  <div className="mt-4 flex gap-4 text-3xl font-bold flex-wrap">
                    <span className="bg-orange/20 px-4 py-2 rounded">6️⃣ шесть</span>
                    <span className="bg-orange/20 px-4 py-2 rounded">7️⃣ семь</span>
                    <span className="bg-orange/20 px-4 py-2 rounded">8️⃣ восемь</span>
                    <span className="bg-orange/20 px-4 py-2 rounded">9️⃣ девять</span>
                    <span className="bg-orange/20 px-4 py-2 rounded">🔟 десять</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-orange mb-2">Шаг 3: Число 10</h3>
                  <p className="text-gray-300">
                    Число 10 — это две руки, полные палец! Это первое двузначное число.
                  </p>
                  <div className="mt-4 p-4 bg-orange/10 rounded">
                    🖐️🖐️ На каждой руке по 5 пальцев. Вместе — 10!
                  </div>
                </div>
              </div>
            </div>
          }
          trainer={<CountingTrainer maxCount={10} />}
        />
      </div>
    </div>
  );
}
