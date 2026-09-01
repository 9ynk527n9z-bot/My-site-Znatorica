import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicTabs from '@/components/TopicTabs';
import CountingTrainer from '@/components/trainers/CountingTrainer';

export const metadata = {
  title: 'Счёт до 5 — теория, тренажёр и шпаргалка для детей 4–5 лет',
  description: 'Интерактивный тренажёр и понятная теория для обучения счёту до 5. Для детей 4-5 лет.',
  alternates: { canonical: '/4-5-let/matematika/schet-do-5' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Дошкольники 4–5', url: '/4-5-let' },
  { name: 'Математика', url: '/4-5-let/matematika' },
  { name: 'Счёт до 5', url: '/4-5-let/matematika/schet-do-5' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Счёт до 5',
  description: 'Интерактивный тренажёр и теория для обучения счёту до 5',
  url: '/4-5-let/matematika/schet-do-5',
  educationalLevel: 'Дошкольное образование, 4–5 лет',
});

export default function SchetDo5Page() {
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
          <span className="text-white">Счёт до 5</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Счёт до 5</h1>

        <TopicTabs
          theory={
            <>
              {/* Theory Content */}
              <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6">Как считать до 5?</h2>

                <div className="space-y-6 text-lg">
                  <div>
                    <h3 className="font-bold text-orange mb-2">Шаг 1: Выучи цифры</h3>
                    <p className="text-gray-300">
                      Цифры — это символы, которые обозначают количество предметов. Начни с числа 1 и доходи до 5.
                    </p>
                    <div className="mt-4 flex gap-4 text-3xl font-bold">
                      <span className="bg-orange/20 px-4 py-2 rounded">1️⃣ один</span>
                      <span className="bg-orange/20 px-4 py-2 rounded">2️⃣ два</span>
                      <span className="bg-orange/20 px-4 py-2 rounded">3️⃣ три</span>
                      <span className="bg-orange/20 px-4 py-2 rounded">4️⃣ четыре</span>
                      <span className="bg-orange/20 px-4 py-2 rounded">5️⃣ пять</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-orange mb-2">Шаг 2: Считай на пальцах</h3>
                    <p className="text-gray-300">
                      Используй пальцы, чтобы запомнить числа. Это самый простой способ!
                    </p>
                    <div className="mt-4 p-4 bg-orange/10 rounded">
                      🖐️ Поднимай по одному пальцу для каждого числа
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-orange mb-2">Шаг 3: Считай предметы</h3>
                    <p className="text-gray-300">
                      Видишь 3 яблока? Считай: 1, 2, 3. Вот так появляется число 3!
                    </p>
                  </div>
                </div>
              </div>
            </>
          }
          trainer={<CountingTrainer maxCount={5} />}
        />
      </div>
    </div>
  );
}
