import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Сравнение чисел — математика для 2 класса',
  description: 'Учимся сравнивать двузначные числа и использовать знаки больше, меньше и равно.',
  alternates: { canonical: '/2-klass/matematika/sravnenie-chisel' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '2 класс', url: '/2-klass' },
  { name: 'Математика', url: '/2-klass' },
  { name: 'Сравнение чисел', url: '/2-klass/matematika/sravnenie-chisel' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Сравнение чисел',
  description: 'Сравнение двузначных чисел с использованием знаков больше, меньше и равно',
  url: '/2-klass/matematika/sravnenie-chisel',
  educationalLevel: '2 класс начальной школы',
});

export default function SravnenyeChiselPage() {
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
          <span className="text-white">Сравнение чисел</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Сравнение чисел</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link href="/trenazher/sravnenie" className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Как сравнивать двузначные числа</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Знаки сравнения</h3>
              <p className="text-gray-300">Для сравнения чисел используют три знака:</p>
              <div className="mt-4 flex gap-4 text-2xl font-bold flex-wrap">
                <span className="bg-orange/20 px-4 py-2 rounded">&gt; больше</span>
                <span className="bg-orange/20 px-4 py-2 rounded">&lt; меньше</span>
                <span className="bg-orange/20 px-4 py-2 rounded">= равно</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Сравни количество десятков</h3>
              <p className="text-gray-300">
                У двузначных чисел сначала смотри на цифру десятков — у кого их больше, то число и больше.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p className="text-2xl">45 &gt; 38</p>
                <p className="text-gray-300 text-base mt-1">В 45 — четыре десятка, в 38 — три десятка. 4 больше 3, значит 45 больше.</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: Если десятков поровну — сравни единицы</h3>
              <p className="text-gray-300">
                Когда количество десятков одинаковое, нужно сравнить число единиц.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p className="text-2xl">52 &lt; 57</p>
                <p className="text-gray-300 text-base mt-1">В обоих числах 5 десятков. Но 2 меньше 7 — значит 52 меньше.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Поставь знак: 67 ... 76</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">67 &lt; 76 (у 76 больше десятков — 7 против 6).</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Поставь знак: 29 ... 29</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">29 = 29 (числа одинаковые).</p>
              </details>
            </div>
          </div>
        </div>

        <TopicQuiz topic="2-klass/matematika/sravnenie-chisel" />
      </div>
    </div>
  );
}
