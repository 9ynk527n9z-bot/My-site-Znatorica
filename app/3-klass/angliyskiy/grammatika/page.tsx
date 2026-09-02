import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';

export const metadata = {
  title: 'Грамматика — английский язык для 3 класса',
  description: 'Глагол to be, Present Simple и Past Simple, множественное число существительных для третьеклассников.',
  alternates: { canonical: '/3-klass/angliyskiy/grammatika' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '3 класс', url: '/3-klass' },
  { name: 'Английский язык', url: '/3-klass' },
  { name: 'Грамматика', url: '/3-klass/angliyskiy/grammatika' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Грамматика',
  description: 'Английская грамматика для 3 класса: Present Simple, Past Simple',
  url: '/3-klass/angliyskiy/grammatika',
  educationalLevel: '3 класс начальной школы',
});

export default function GrammatikaPage() {
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
          <Link href="/3-klass" className="text-orange hover:underline">Английский язык</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Грамматика</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-8">Грамматика</h1>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link href="/trenazher/grammatika-3klass-english" className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Глагол to be: am / is / are</h2>

          <div className="space-y-6 text-lg">
            <div>
              <p className="text-gray-300">
                Глагол «быть» в настоящем времени меняется в зависимости от того, о ком мы говорим.
              </p>
              <div className="mt-2 p-3 bg-orange/10 rounded">
                I <b>am</b> a student. — Я ученик.<br />
                He/She/It <b>is</b> my friend. — Он/она мой друг.<br />
                We/You/They <b>are</b> happy. — Мы/вы/они счастливы.
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Present Simple и Past Simple</h2>

          <div className="space-y-6 text-lg">
            <div>
              <h3 className="font-bold text-orange mb-2">Present Simple — настоящее время</h3>
              <p className="text-gray-300">
                Используется, когда мы говорим о том, что происходит обычно или регулярно. С «he/she/it»
                к глаголу добавляется окончание -s или -es.
              </p>
              <div className="mt-2 p-3 bg-orange/10 rounded">
                I play football. — Я играю в футбол.<br />
                She read<b>s</b> books. — Она читает книги.<br />
                He go<b>es</b> to school. — Он ходит в школу.
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Past Simple — прошедшее время</h3>
              <p className="text-gray-300">
                Используется, когда мы рассказываем о том, что уже произошло.
              </p>
              <div className="mt-2 p-3 bg-orange/10 rounded">
                I played football. — Я играл в футбол.<br />
                She read a book. — Она прочитала книгу.
              </div>
            </div>

            <div>
              <h3 className="font-bold text-orange mb-2">Правило -ed</h3>
              <p className="text-gray-300">
                У многих глаголов прошедшее время образуется добавлением окончания -ed: play → played, watch → watched.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Множественное число существительных</h2>

          <div className="space-y-6 text-lg">
            <div>
              <p className="text-gray-300">
                Чтобы назвать несколько предметов, к существительному обычно добавляют окончание -s
                (после шипящих звуков — -es).
              </p>
              <div className="mt-2 p-3 bg-orange/10 rounded">
                cat → cat<b>s</b> — кошка → кошки<br />
                box → box<b>es</b> — коробка → коробки
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange/20 to-violet/20 border border-orange rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Готов тренироваться?</h3>
          <p className="text-gray-300 mb-6">Нажми на кнопку ниже и начни интерактивный тренажер</p>
          <Link href="/trenazher/grammatika-3klass-english" className="btn-primary text-lg px-8 py-4 inline-block">🎮 Открыть тренажер</Link>
        </div>
      </div>
    </div>
  );
}
