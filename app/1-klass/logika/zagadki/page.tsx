import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Загадки для 1 класса — про школу, семью и времена года',
  description: 'Сборник загадок для первоклассников с ответами: про школу, семью и времена года. Тренируем логику и словарный запас.',
  alternates: { canonical: '/1-klass/logika/zagadki' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: '1 класс', url: '/1-klass' },
  { name: 'Логика и мышление', url: '/1-klass' },
  { name: 'Загадки', url: '/1-klass/logika/zagadki' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Загадки',
  description: 'Сборник загадок для первоклассников с ответами',
  url: '/1-klass/logika/zagadki',
  educationalLevel: '1 класс начальной школы',
});

const RIDDLE_GROUPS = [
  {
    title: '🎒 Про школу',
    riddles: [
      { text: 'Новый дом несу в руке, дверцы дома — на замке. Тут жильцы бумажные, все ужасно важные.', answer: 'Портфель' },
      { text: 'Черные, кривые, от рождения все немые, встанут в ряд — сразу заговорят.', answer: 'Буквы' },
      { text: 'То я в клетку, то в линейку. Написать по мне сумей-ка! Можешь и нарисовать. Что такое я?', answer: 'Тетрадь' },
      { text: 'Веду я линию прямую, красиво в клетках рисую.', answer: 'Линейка' },
    ],
  },
  {
    title: '👨‍👩‍👧 Про семью и дом',
    riddles: [
      { text: 'Кто вас, дети, крепко любит, кто вас нежно так голубит, не смыкая ночью глаз, все заботится о вас?', answer: 'Мама' },
      { text: 'Не лает, не кусает, а в дом не пускает.', answer: 'Замок' },
      { text: 'Целый день лежит на крыше и всё время что-то слышит, а как ночь — на дверь встаёт, дом от воров стережёт.', answer: 'Собака' },
    ],
  },
  {
    title: '🍂 Про времена года',
    riddles: [
      { text: 'Тает снежок, ожил лужок, день прибывает, когда это бывает?', answer: 'Весной' },
      { text: 'Пришла без красок и без кисти, и перекрасила все листья.', answer: 'Осень' },
      { text: 'Снег на полях, лёд на реках, вьюга гуляет. Когда это бывает?', answer: 'Зимой' },
      { text: 'Солнце печёт, липа цветёт, рожь поспевает. Когда это бывает?', answer: 'Летом' },
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
          <Link href="/1-klass" className="text-orange hover:underline">1 класс</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Загадки</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-4">Загадки</h1>
        <p className="text-gray-400 mb-8">
          Загадки для первоклассника уже сложнее дошкольных — в них появляются рифма и переносный смысл,
          который нужно расшифровать.
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

        <TopicQuiz topic="1-klass/logika/zagadki" />
      </div>
    </div>
  );
}
