import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Загадки для детей 6–7 лет — про животных, природу и предметы',
  description: 'Сборник загадок для детей 6–7 лет с ответами: про животных, природу и предметы вокруг нас. Тренируем сообразительность.',
  alternates: { canonical: '/6-7-let/logika/zagadki' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Дошкольники 6–7', url: '/6-7-let' },
  { name: 'Логика и мышление', url: '/6-7-let' },
  { name: 'Загадки', url: '/6-7-let/logika/zagadki' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Загадки',
  description: 'Сборник загадок для детей 6–7 лет с ответами',
  url: '/6-7-let/logika/zagadki',
  educationalLevel: 'Дошкольное образование, 6–7 лет',
});

const RIDDLE_GROUPS = [
  {
    title: '🐾 Про животных',
    riddles: [
      { text: 'Мягкие лапки, а в лапках цап-царапки.', answer: 'Кошка' },
      { text: 'Хвост крючком, нос пятачком.', answer: 'Свинья' },
      { text: 'Кто зимой холодной ходит злой, голодный?', answer: 'Волк' },
      { text: 'Не мышь, не птица — в лесу резвится, на деревьях живёт и орешки грызёт.', answer: 'Белка' },
    ],
  },
  {
    title: '🌳 Про природу',
    riddles: [
      { text: 'Висит на ветке — ни зверь, ни птица, а осенью падает.', answer: 'Лист' },
      { text: 'Летом одевается, а зимой раздевается. Про кого это?', answer: 'Дерево' },
      { text: 'Без рук, без топоренка построена избёнка.', answer: 'Гнездо' },
      { text: 'Бел как снег, в чести у всех, в рот попал — там и пропал.', answer: 'Сахар' },
    ],
  },
  {
    title: '🏠 Про предметы вокруг',
    riddles: [
      { text: 'Из горячего колодца через нос водица льётся.', answer: 'Чайник' },
      { text: 'Одноногий Ивашка — с деревянной рубашкой; где носом ткнёт — там след кладёт.', answer: 'Карандаш' },
      { text: 'Всех кормит, а сама есть не просит.', answer: 'Земля' },
      { text: 'Круглая, но не мяч, светит ночью на небе, а через две недели становится похожа на дольку апельсина.', answer: 'Луна' },
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
          <Link href="/6-7-let" className="text-orange hover:underline">Дошкольники 6–7</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Загадки</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-4">Загадки</h1>
        <p className="text-gray-400 mb-8">
          Загадка тренирует не память, а умение рассуждать: находить скрытый смысл за необычным описанием знакомого предмета.
        </p>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link
            href="/trenazher/zagadki-6-7let"
            className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors"
          >
            🎮 Тренажер
          </Link>
        </div>

        <div className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Как отгадывать загадки</h2>
          <p className="text-gray-300 text-lg">
            Обычно в загадке предмет описывают через необычные признаки, не называя его напрямую.
            Читай загадку по одной подсказке за раз и представляй, о чём каждая может быть — так проще собрать ответ целиком.
          </p>
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

        <TopicQuiz topic="6-7-let/logika/zagadki" />
      </div>
    </div>
  );
}
