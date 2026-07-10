import Link from 'next/link';

export const metadata = {
  title: 'Генераторы заданий — примеры, прописи, кроссворды',
  description: 'Создавайте примеры по математике, прописи, кроссворды и другие развивающие задания. 5 бесплатных генераций в день.',
  alternates: { canonical: '/generator' },
};

const GENERATORS = [
  { url: '/primery', emoji: '📊', title: 'Примеры', desc: 'До 10 / 100 / 1000 — 6 режимов' },
  { url: '/krossvordy', emoji: '🔤', title: 'Кроссворды', desc: 'Еда, животные, спорт и другие темы' },
  { url: '/filvordy', emoji: '🔍', title: 'Филворды', desc: 'Найди слова в сетке букв' },
  { url: '/anagrammy', emoji: '🔤', title: 'Анаграммы', desc: 'Разгадай слово из букв' },
  { url: '/propisi-ru', emoji: '✍️', title: 'Прописи (рус.)', desc: 'Буквы русского алфавита' },
  { url: '/propisi', emoji: '✏️', title: 'Прописи (англ.)', desc: 'Английские буквы' },
  { url: '/math', emoji: '🧮', title: 'Примеры в столбик', desc: 'Вычитание и деление' },
  { url: '/diktanty', emoji: '🎤', title: 'Диктанты', desc: '1–4 класс' },
  { url: '/slovarnye-slova', emoji: '📖', title: 'Словарные слова', desc: '1–4 класс' },
  { url: '/zadachi', emoji: '🧩', title: 'Задачи', desc: '3–4 класс' },
  { url: '/sostav-chisla', emoji: '🏠', title: 'Состав числа', desc: '«Домики» для 1 класса' },
  { url: '/schet-predmetov', emoji: '🔢', title: 'Счёт предметов', desc: 'Для дошкольников и 1 класса' },
  { url: '/graficheskiy-diktant', emoji: '✏️', title: 'Графический диктант', desc: 'Рисунок по клеточкам' },
];

export default function GeneratorPage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Генераторы заданий</h1>
        <p className="text-center text-white/75 mb-12">5 раз бесплатно в день. Без лимита по подписке.</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {GENERATORS.map((g) => (
            <Link
              key={g.url}
              href={`/generator${g.url}`}
              className="card hover:border-white/50 transition-colors group text-center !p-3"
            >
              <div className="text-3xl mb-2">{g.emoji}</div>
              <h3 className="text-sm font-bold mb-1 group-hover:text-orange leading-snug">{g.title}</h3>
              <p className="text-white/60 text-xs line-clamp-2">{g.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
