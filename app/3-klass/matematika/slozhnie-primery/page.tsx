import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Сложные примеры — теория и тренажёр для 3 класса',
  description: 'Примеры в столбик на сложение и вычитание трёхзначных чисел для третьеклассников.',
  alternates: { canonical: '/3-klass/matematika/slozhnie-primery' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '3 класс', url: '/3-klass' },
  { name: 'Математика', url: '/3-klass' },
  { name: 'Сложные примеры', url: '/3-klass/matematika/slozhnie-primery' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Сложные примеры',
  description: 'Примеры в столбик для 3 класса',
  url: '/3-klass/matematika/slozhnie-primery',
  educationalLevel: '3 класс начальной школы',
});

export default function SlozhniePrimeryPage() {
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
          <Link href="/3-klass" className="text-orange hover:underline">Математика</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Сложные примеры</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Сложные примеры</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link href="/trenazher/slozhnie-primery-3klass" className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Считаем в столбик</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Зачем нужен счёт в столбик?</h3>
              <p className="text-gray-300">
                Когда числа большие, считать в уме сложно. Счёт в столбик помогает разбить пример на простые шаги — по разрядам.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Правило: пишем разряд под разрядом</h3>
              <p className="text-gray-300 mb-4">
                Единицы под единицами, десятки под десятками, сотни под сотнями. Складываем или вычитаем справа налево.
              </p>
              <div className="p-4 bg-orange/10 rounded font-mono text-xl text-center">
                &nbsp;&nbsp;347<br />
                +265<br />
                ————<br />
                &nbsp;&nbsp;612
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Переход через разряд</h3>
              <p className="text-gray-300">
                Если сумма в столбце больше 9, единицу «переносим» в следующий разряд слева. Это самая частая ошибка — не забывай про перенос!
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange rounded-lg p-8 text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">Готов тренироваться?</h3>
          <p className="text-gray-300 mb-6">Нажми на кнопку ниже и начни интерактивный тренажер</p>
          <Link href="/trenazher/slozhnie-primery-3klass" className="btn-primary text-lg px-8 py-4 inline-block">🎮 Открыть тренажер</Link>
        </div>

        <TopicQuiz topic="3-klass/matematika/slozhnie-primery" />
      </div>
    </div>
  );
}
