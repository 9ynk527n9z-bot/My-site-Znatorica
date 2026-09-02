import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Загадки для 2 класса — с ответами',
  description: 'Сборник загадок для второклассников с ответами: про профессии, транспорт, спорт, природу и животных. Тренируем логику на новом уровне.',
  alternates: { canonical: '/2-klass/logika/zagadki' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '2 класс', url: '/2-klass' },
  { name: 'Логика и мышление', url: '/2-klass' },
  { name: 'Загадки', url: '/2-klass/logika/zagadki' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Загадки',
  description: 'Сборник загадок для второклассников с ответами',
  url: '/2-klass/logika/zagadki',
  educationalLevel: '2 класс начальной школы',
});

// Настоящие народные и классические авторские загадки для детей (проверены по
// сборникам загадок), не придуманы заново — во 2 классе просто подлиннее и с
// более скрытой метафорой, чем в 1 классе.
const RIDDLES = [
  { text: 'Кто в дни болезней всех полезней и лечит нас от всех болезней?', answer: 'Врач' },
  { text: 'Тёмной ночью, ясным днём он сражается с огнём.', answer: 'Пожарный' },
  { text: 'Вот он у доски стоит, на него весь класс глядит. Говорит он: ну, начнём! Все тетрадки достаём!', answer: 'Учитель' },
  { text: 'Что за чудо — синий дом! Ребятишек много в нём. Носит обувь из резины и питается бензином!', answer: 'Автобус' },
  { text: 'Летит птица из железа над морями и над лесом. Возит на себе людей, садись на птицу ты смелей.', answer: 'Самолёт' },
  { text: 'Домик по морю плывёт, на себе людей везёт. В доме круглые окошки. По волнам и в шторм идёт, в порту его отдых ждёт.', answer: 'Корабль' },
  { text: 'Всё лето стояли, зимы ожидали, дождались поры, помчались с горы.', answer: 'Санки' },
  { text: 'Есть два друга у меня, в них несусь, как на конях, режут лёд легко и звонко они лезвием претонким!', answer: 'Коньки' },
];

export default function ZagadkiPage() {
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
          <span className="text-white">Загадки</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-4">Загадки</h1>
        <p className="text-gray-400 mb-8">
          Во 2 классе загадки становятся длиннее и требуют удерживать в голове несколько подсказок сразу,
          прежде чем назвать ответ.
        </p>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link href="/trenazher/zagadki-2klass" className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <div className="space-y-4 text-lg">
            {RIDDLES.map((r, i) => (
              <div key={i} className="p-4 bg-black/40 rounded">
                <p className="mb-2">{r.text}</p>
                <details>
                  <summary className="cursor-pointer text-orange font-bold select-none">Показать ответ</summary>
                  <p className="text-gray-300 mt-2">{r.answer}</p>
                </details>
              </div>
            ))}
          </div>
        </div>

        <TopicQuiz topic="2-klass/logika/zagadki" />
      </div>
    </div>
  );
}
