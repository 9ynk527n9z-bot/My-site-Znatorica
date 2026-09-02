import Link from 'next/link';
import { breadcrumbJsonLd, learningResourceJsonLd } from '@/lib/seo';
import TopicQuiz from '@/components/TopicQuiz';

export const metadata = {
  title: 'Загадки для детей 4–5 лет — простые и короткие',
  description: 'Сборник простых загадок для малышей 4–5 лет с ответами: про животных и предметы вокруг нас.',
  alternates: { canonical: '/4-5-let/logika/zagadki' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Дошкольники 4–5', url: '/4-5-let' },
  { name: 'Логика и мышление', url: '/4-5-let' },
  { name: 'Загадки', url: '/4-5-let/logika/zagadki' },
]);

const learningResource = learningResourceJsonLd({
  name: 'Загадки',
  description: 'Простые загадки для детей 4–5 лет с ответами',
  url: '/4-5-let/logika/zagadki',
  educationalLevel: 'Дошкольное образование, 4–5 лет',
});

const RIDDLE_GROUPS = [
  {
    title: '🐾 Про животных',
    riddles: [
      { text: 'Мяукает у дверей, просится домой.', answer: 'Кошка' },
      { text: 'Гав-гав говорит, дом сторожит.', answer: 'Собака' },
      { text: 'Длинные ушки, быстрые ножки, любит морковку.', answer: 'Зайчик' },
    ],
  },
  {
    title: '🧸 Про игрушки и предметы',
    riddles: [
      { text: 'Круглый, прыгает, катится, играть с ним весело.', answer: 'Мяч' },
      { text: 'Спит в кроватке, глазки закрыты, а скажешь «мама» — она молчит.', answer: 'Кукла' },
      { text: 'Крутится быстро на одной ножке, пока не упадёт.', answer: 'Юла' },
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
          <Link href="/4-5-let" className="text-orange hover:underline">Дошкольники 4–5</Link>
          <span className="text-gray-400">/</span>
          <span className="text-white">Загадки</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-4">Загадки</h1>
        <p className="text-gray-400 mb-8">
          Для этого возраста лучше всего подходят совсем короткие загадки — одна-две подсказки, без сложных сравнений.
        </p>

        <div className="flex gap-4 mb-8 border-b border-[#2D2350] overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-orange font-bold text-white">📝 Теория</button>
          <Link
            href="/trenazher/zagadki-4-5let"
            className="px-6 py-3 border-b-2 border-transparent text-gray-400 hover:text-white transition-colors"
          >
            🎮 Тренажер
          </Link>
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

        <TopicQuiz topic="4-5-let/logika/zagadki" />
      </div>
    </div>
  );
}
