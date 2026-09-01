import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Загадки для 2 класса — про профессии, транспорт и спорт',
  description: 'Сборник загадок для второклассников с ответами: про профессии, транспорт и спорт. Тренируем логику на новом уровне.',
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

const RIDDLE_GROUPS = [
  {
    title: '👩‍⚕️ Про профессии',
    riddles: [
      { text: 'Кто у постели больного сидит? И как лечиться, он всем говорит. Кто болен — он капли ему пропишет, тем, кто здоров, — разрешит идти гулять.', answer: 'Врач' },
      { text: 'В школе есть человек такой, что ведёт урок за уроком, объясняет и учит нас всех.', answer: 'Учитель' },
      { text: 'На пожар быстрее ветра он торопится всегда, помогает и спасает от беды в любой момент.', answer: 'Пожарный' },
    ],
  },
  {
    title: '🚂 Про транспорт',
    riddles: [
      { text: 'Дом по улице идёт, на работу всех везёт. Не на курьих тонких ножках, а в резиновых сапожках.', answer: 'Автобус' },
      { text: 'Летит птица-небылица, а внутри народ сидится, разговаривает.', answer: 'Самолёт' },
      { text: 'Через море-океан плывёт чудо-великан, пассажиров он везёт, обгоняет пароход.', answer: 'Корабль' },
    ],
  },
  {
    title: '⚽ Про спорт',
    riddles: [
      { text: 'Круглый, кожаный, весёлый, бьют его ногами смело, а он не злится, только выше катится и в ворота мчится.', answer: 'Мяч' },
      { text: 'Кто на льду меня догонит? Мы бежим вперегонки. А несут меня не кони, а блестящие …', answer: 'Коньки' },
      { text: 'Деревянные кони по снегу скользят, а сидя верхом на них, с горки катят.', answer: 'Санки' },
    ],
  },
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
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">🎮 Тренажер</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors">📋 Шпаргалка</button>
        </div>

        {RIDDLE_GROUPS.map((group) => (
          <div key={group.title} className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">{group.title}</h2>
            <div className="space-y-4 text-lg">
              {group.riddles.map((r, i) => (
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
        ))}

        <TopicQuiz topic="2-klass/logika/zagadki" />
      </div>
    </div>
  );
}
