import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Сложение и вычитание в пределах 20 с переходом через десяток — 1 класс',
  description: 'Приём «через десяток» для сложения и вычитания в пределах 20: теория с примерами и тренажёр для первоклассников.',
  alternates: { canonical: '/1-klass/matematika/slozhenie-do-20' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '1 класс', url: '/1-klass' },
  { name: 'Математика', url: '/1-klass' },
  { name: 'Сложение и вычитание в пределах 20', url: '/1-klass/matematika/slozhenie-do-20' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Сложение и вычитание в пределах 20 с переходом через десяток',
  description: 'Приём «через десяток»: складываем и вычитаем числа в пределах 20, когда сумма или разность переходят границу десятка',
  url: '/1-klass/matematika/slozhenie-do-20',
  educationalLevel: '1 класс начальной школы',
});

export default function SlozhenieDo20Page() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/1-klass" className="text-orange hover:underline">1 класс</Link>
          <span className="text-gray-400">/</span>
          <Link href="/1-klass" className="text-orange hover:underline">Математика</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Сложение и вычитание в пределах 20</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Сложение и вычитание в пределах 20 с переходом через десяток</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link href="/trenazher/slozhenie-do-20" className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Приём «через десяток»</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Почему просто прибавлять по одному — неудобно</h3>
              <p className="text-gray-300">
                Когда числа маленькие (например, 6 + 2), можно прибавлять по одному. Но если нужно сложить
                8 + 5, считать по одному долго и легко ошибиться. Есть удобный приём — «разбить второе
                число так, чтобы сначала дополнить первое до круглого десятка (10)».
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Сложение: пример 8 + 5</h3>
              <p className="text-gray-300 mb-3">
                Шаг 1. Смотрим, сколько не хватает первому числу (8) до 10. Не хватает 2: 8 + 2 = 10.
              </p>
              <p className="text-gray-300 mb-3">
                Шаг 2. Мы прибавили только часть от 5 (а именно 2). Осталось прибавить оставшуюся часть:
                5 − 2 = 3.
              </p>
              <p className="text-gray-300 mb-3">
                Шаг 3. К десятку прибавляем остаток: 10 + 3 = 13.
              </p>
              <div className="bg-orange/20 px-4 py-3 rounded text-xl font-bold text-center">
                8 + 5 = (8 + 2) + 3 = 10 + 3 = 13
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Сложение: пример 9 + 4</h3>
              <p className="text-gray-300 mb-3">
                До 10 числу 9 не хватает 1: 9 + 1 = 10. Раскладываем 4 = 1 + 3. Прибавляем остаток 3 к
                десятку: 10 + 3 = 13.
              </p>
              <div className="bg-orange/20 px-4 py-3 rounded text-xl font-bold text-center">
                9 + 4 = (9 + 1) + 3 = 10 + 3 = 13
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Вычитание: пример 13 − 5</h3>
              <p className="text-gray-300 mb-3">
                Шаг 1. Раскладываем число 13 на десяток и единицы: 13 = 10 + 3.
              </p>
              <p className="text-gray-300 mb-3">
                Шаг 2. Раскладываем вычитаемое 5 так, чтобы сначала убрать единицы (3), а потом остаток
                вычесть из десятка: 5 = 3 + 2.
              </p>
              <p className="text-gray-300 mb-3">
                Шаг 3. Сначала вычитаем единицы: 13 − 3 = 10. Потом вычитаем остаток из десятка:
                10 − 2 = 8.
              </p>
              <div className="bg-orange/20 px-4 py-3 rounded text-xl font-bold text-center">
                13 − 5 = (13 − 3) − 2 = 10 − 2 = 8
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Вычитание: пример 12 − 7</h3>
              <p className="text-gray-300 mb-3">
                12 = 10 + 2. Чтобы вычесть 7, сначала убираем единицы (2): 12 − 2 = 10. Раскладываем 7 = 2 + 5.
                Остаётся вычесть из десятка оставшиеся 5: 10 − 5 = 5.
              </p>
              <div className="bg-orange/20 px-4 py-3 rounded text-xl font-bold text-center">
                12 − 7 = (12 − 2) − 5 = 10 − 5 = 5
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Тренируйся каждый день</h3>
              <p className="text-gray-300">
                Этот приём — основа устного счёта на всю начальную школу. Сначала считай по шагам вслух,
                а потом примеры начнут решаться в уме сами собой.
              </p>
            </div>
          </div>
        </div>

        <TopicQuiz topic="1-klass/matematika/slozhenie-do-20" />
      </div>
    </div>
  );
}
