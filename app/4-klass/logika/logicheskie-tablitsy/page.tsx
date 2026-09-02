import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Логические задачи с таблицами — 4 класс',
  description: 'Учимся решать логические задачи методом таблицы: заносим условия и находим единственно возможный ответ.',
  alternates: { canonical: '/4-klass/logika/logicheskie-tablitsy' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '4 класс', url: '/4-klass' },
  { name: 'Логика и мышление', url: '/4-klass' },
  { name: 'Логические задачи с таблицами', url: '/4-klass/logika/logicheskie-tablitsy' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Логические задачи с таблицами',
  description: 'Решение логических задач методом таблицы соответствий',
  url: '/4-klass/logika/logicheskie-tablitsy',
  educationalLevel: '4 класс начальной школы',
});

export default function LogicheskieTablitsyPage() {
  return (
    <div className="bg-black min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }} />

      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-2 text-sm">
          <Link href="/" className="text-orange hover:underline">Главная</Link>
          <span className="text-gray-400">/</span>
          <Link href="/4-klass" className="text-orange hover:underline">4 класс</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Логические задачи с таблицами</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Логические задачи с таблицами</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link
            href="/trenazher/logicheskie-tablitsy-4klass"
            className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors"
          >
            🎮 Тренажер
          </Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Как таблица помогает не запутаться</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Условие</h3>
              <p className="text-gray-300">
                Аня, Боря и Витя любят разные фрукты: яблоки, груши и сливы — у каждого свой любимый фрукт.
                Известно: Аня не любит яблоки. Боря любит груши. Кто что любит?
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 1: Заполни то, что известно точно</h3>
              <p className="text-gray-300">Боря любит груши — это сразу известно, вписываем.</p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 2: Исключай невозможное</h3>
              <p className="text-gray-300">
                Груши уже заняты Борей — значит, ни Аня, ни Витя не могут любить груши.
                Аня не любит яблоки (дано в условии) — значит, у Ани остаются только сливы.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Шаг 3: Последний вариант — единственный возможный</h3>
              <p className="text-gray-300">
                Груши — у Бори, сливы — у Ани. Значит, Вите остаются яблоки — единственный вариант, который не занят.
              </p>
              <div className="mt-4 p-4 bg-orange/10 rounded">
                <p>Аня — сливы</p>
                <p>Боря — груши</p>
                <p>Витя — яблоки</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="p-4 bg-black/40 rounded text-lg">
            <p className="mb-2">
              Три подруги — Оля, Лена и Настя — занимаются разными видами спорта: плаванием, теннисом и бегом.
              Известно: Оля не занимается бегом. Настя занимается теннисом. Кто чем занимается?
            </p>
            <details className="mt-2">
              <summary className="cursor-pointer text-orange font-bold select-none">Показать решение</summary>
              <p className="text-gray-300 mt-2">
                Настя — теннис (дано). Оля не бег и не теннис (теннис занят) — значит, Оля занимается плаванием.
                Лене остаётся единственный вариант — бег.
              </p>
            </details>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Готов тренироваться?</h3>
          <p className="text-gray-300 mb-6">
            Главный приём — не гадать, а последовательно исключать невозможные варианты, пока не останется только один.
          </p>
          <Link href="/trenazher/logicheskie-tablitsy-4klass" className="btn-primary text-lg px-8 py-4 inline-block">🎮 Открыть тренажер</Link>
        </div>

        <div className="mt-8">
          <TopicQuiz topic="4-klass/logika/logicheskie-tablitsy" />
        </div>
      </div>
    </div>
  );
}
