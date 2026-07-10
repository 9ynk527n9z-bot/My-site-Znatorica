import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Разбор слова по составу — русский язык для 3 класса',
  description: 'Учимся находить в слове приставку, корень, суффикс и окончание.',
  alternates: { canonical: '/3-klass/russkiy/razbor-slova-po-sostavu' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '3 класс', url: '/3-klass' },
  { name: 'Русский язык', url: '/3-klass' },
  { name: 'Разбор слова по составу', url: '/3-klass/russkiy/razbor-slova-po-sostavu' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Разбор слова по составу',
  description: 'Морфемный разбор слова: приставка, корень, суффикс, окончание',
  url: '/3-klass/russkiy/razbor-slova-po-sostavu',
  educationalLevel: '3 класс начальной школы',
});

export default function RazborSlovaPage() {
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
          <span className="text-white">Разбор слова по составу</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Разбор слова по составу</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Из каких частей состоит слово</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Приставка — перед корнем</h3>
              <p className="text-gray-300">Добавляет новый смысл: «ходить» → «пере-ходить», «вы-ходить», «при-ходить».</p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Корень — главная часть</h3>
              <p className="text-gray-300">Хранит основной смысл слова, общий для всех однокоренных слов.</p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Суффикс — после корня</h3>
              <p className="text-gray-300">Часто показывает, кто или что это: «лес-ник» (тот, кто в лесу работает), «двер-к-а» (маленькая дверь).</p>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Окончание — изменяемая часть в конце</h3>
              <p className="text-gray-300">Меняется в зависимости от числа и падежа: «книг-а», «книг-и», «книг-у».</p>
            </div>

            <div className="p-4 bg-orange/10 rounded">
              <p className="text-xl mb-1">
                <span className="text-violet">пере</span>-<span className="text-orange">лес</span>-<span className="text-green-400">ок</span>
              </p>
              <p className="text-gray-300 text-base">приставка «пере» + корень «лес» + суффикс «ок» (окончание нулевое)</p>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Попробуй сам</h2>
          <div className="space-y-4 text-lg">
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Разбери слово «лесник» по составу.</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Корень «лес» + суффикс «ник» (окончание нулевое).</p>
              </details>
            </div>
            <div className="p-4 bg-black/40 rounded">
              <p className="mb-2">Разбери слово «домик» по составу.</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                <p className="text-gray-300 mt-2">Корень «дом» + суффикс «ик» (окончание нулевое).</p>
              </details>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Готов тренироваться?</h3>
          <p className="text-gray-300 mb-6">
            Разбор по составу помогает понять смысл незнакомых слов — если знаешь корень, часто можно догадаться о значении всего слова.
          </p>
          <button className="btn-primary text-lg px-8 py-4">🎮 Открыть тренажер</button>
        </div>
      </div>
    </div>
  );
}
