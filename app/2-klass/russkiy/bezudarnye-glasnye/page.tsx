import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Безударные гласные — русский язык для 2 класса',
  description: 'Учимся проверять безударную гласную в корне слова, подбирая проверочное слово с ударением на эту гласную.',
  alternates: { canonical: '/2-klass/russkiy/bezudarnye-glasnye' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '2 класс', url: '/2-klass' },
  { name: 'Русский язык', url: '/2-klass' },
  { name: 'Безударные гласные', url: '/2-klass/russkiy/bezudarnye-glasnye' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Безударные гласные',
  description: 'Проверка безударной гласной в корне слова проверочным словом',
  url: '/2-klass/russkiy/bezudarnye-glasnye',
  educationalLevel: '2 класс начальной школы',
});

export default function BezudarnyeGlasnyePage() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/2-klass" className="text-orange hover:underline">2 класс</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Безударные гласные</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Безударные гласные</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link
            href="/trenazher/bezudarnye-glasnye"
            className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors"
          >
            🎮 Тренажер
          </Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Почему безударные гласные — это сложно</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: В чём проблема</h3>
              <p className="text-gray-300">
                Когда гласная в слове безударная, она слышится нечётко, и легко ошибиться на письме.
                В слове «в<span className="text-orange">о</span>да» без ударения слышится «вАда», но пишем «о».
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Правило проверки</h3>
              <p className="text-gray-300">
                Чтобы правильно написать безударную гласную в корне, нужно подобрать однокоренное (проверочное)
                слово, где эта же гласная стоит под ударением.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p className="text-xl mb-1">
                  в<b className="text-orange">о</b>да → в<b className="text-orange">О</b>ды (проверочное слово)
                </p>
                <p className="text-gray-300 text-base">Под ударением чётко слышно «о» — значит, и в слове «вода» пишем «о».</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: Как подобрать проверочное слово</h3>
              <p className="text-gray-300">Есть два простых способа:</p>
              <div className="mt-4 space-y-2 text-base">
                <div className="p-3 bg-black/40 rounded">Изменить число: с<b>о</b>сна → с<b>О</b>сны</div>
                <div className="p-3 bg-black/40 rounded">Подобрать однокоренное слово: тр<b>а</b>ва → тр<b>А</b>вка</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Как проверить безударную гласную в слове «л<span className="opacity-60">е</span>сной»?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Проверочное слово — «лес» (ударение падает на «е»).</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Как проверить безударную гласную в слове «м<span className="opacity-60">о</span>ря»?</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Проверочное слово — «море» (ударение на «о»).</p>
              </details>
            </div>
          </div>
        </div>

        <TopicQuiz topic="2-klass/russkiy/bezudarnye-glasnye" />
      </div>
    </div>
  );
}
