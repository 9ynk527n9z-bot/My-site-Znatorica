import Link from 'next/link';

export const metadata = {
  title: 'Все тренажёры',
  description: 'Интерактивные тренажёры для детей 4-11 лет: азбука, числа, цвета, умножение и другие.',
  alternates: { canonical: '/trenazher' },
};

interface Trainer {
  id: string;
  name: string;
  description: string;
  icon: string;
  url: string;
}

interface Category {
  title: string;
  emoji: string;
  trainers: Trainer[];
}

const CATEGORIES: Category[] = [
  {
    title: 'Русский язык',
    emoji: '📖',
    trainers: [
      { id: 'azbuky', name: 'Азбука', description: 'Учим буквы', icon: '🅰️', url: '/azbuky' },
      { id: 'pristavki', name: 'Приставки', description: 'Приставки русского языка', icon: '📝', url: '/pristavki' },
      {
        id: 'slovarnye-slova',
        name: 'Словарные слова',
        description: 'Вставь букву по классам: тренировка и режим на время',
        icon: '📖',
        url: '/slovarnye-slova',
      },
      { id: 'pogovorki', name: 'Поговорки', description: 'Русские пословицы и поговорки', icon: '💬', url: '/pogovorki' },
    ],
  },
  {
    title: 'Математика',
    emoji: '🔢',
    trainers: [
      { id: 'numbers', name: 'Числа', description: 'Учим цифры', icon: '1️⃣', url: '/numbers' },
      { id: 'multiplication', name: 'Умножение (игра)', description: 'Игровой тренажёр умножения', icon: '✖️', url: '/multiplication' },
      {
        id: 'sravnenie',
        name: 'Сравнение чисел',
        description: 'Больше, меньше или равно — выбери правильный знак',
        icon: '⚖️',
        url: '/sravnenie',
      },
      {
        id: 'tablitsa-umnozheniya',
        name: 'Таблица умножения',
        description: '4 режима: таблица, тренировка, на время, найди множитель',
        icon: '✖️',
        url: '/tablitsa-umnozheniya',
      },
    ],
  },
  {
    title: 'Английский',
    emoji: '🇬🇧',
    trainers: [
      { id: 'english-words', name: 'Английские слова', description: 'Словарный запас по темам', icon: '🇬🇧', url: '/english-words' },
      { id: 'irregular-verbs', name: 'Неправильные глаголы', description: 'Английские irregular verbs', icon: '🇬🇧', url: '/irregular-verbs' },
      {
        id: 'angliyskiy-alfavit',
        name: 'Английский алфавит',
        description: 'Буква, картинка, транскрипция и озвучка',
        icon: '🇬🇧',
        url: '/angliyskiy-alfavit',
      },
      {
        id: 'angliyskiy-schet',
        name: 'Счёт по-английски',
        description: 'Числа от 1 до 20 с транскрипцией и озвучкой',
        icon: '🇬🇧',
        url: '/angliyskiy-schet',
      },
      {
        id: 'english-colors',
        name: 'Цвета на английском',
        description: 'Режимы: цвета, карточки, квиз',
        icon: '🎨',
        url: '/english-colors',
      },
      {
        id: 'english-shapes',
        name: 'Формы на английском',
        description: 'Circle, Square, Triangle, Star, Heart',
        icon: '🔺',
        url: '/english-shapes',
      },
    ],
  },
  {
    title: 'Логика и внимание',
    emoji: '🧩',
    trainers: [
      { id: 'colors', name: 'Цвета', description: 'Распознаём цвета', icon: '🌈', url: '/colors' },
      { id: 'shapes-colors', name: 'Формы и цвета', description: 'Учим фигуры и цвета вместе', icon: '🔷', url: '/shapes-colors' },
      {
        id: 'naydi-lishnee',
        name: 'Найди лишнее',
        description: 'Для дошкольников: по форме, по цвету, по размеру',
        icon: '🧩',
        url: '/naydi-lishnee',
      },
      {
        id: 'naydi-paru',
        name: 'Найди пару',
        description: 'Игра на память: переверни и найди одинаковые фигуры',
        icon: '🃏',
        url: '/naydi-paru',
      },
      { id: 'chto-izmenilos', name: 'Что изменилось?', description: 'Запомни фигуры и найди, что изменилось', icon: '👀', url: '/chto-izmenilos' },
      {
        id: 'sobery-po-poryadku',
        name: 'Собери по порядку',
        description: 'Расставь фигуры от маленькой к большой',
        icon: '📏',
        url: '/sobery-po-poryadku',
      },
    ],
  },
];

export default function TrainerIndexPage() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-orange hover:underline text-sm mb-4 inline-block">
            ← Назад
          </Link>
          <h1 className="text-5xl font-bold mb-4">🎮 Тренажёры</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-6 space-y-16">
        {CATEGORIES.map((category) => (
          <div key={category.title}>
            <h2 className="text-3xl font-bold mb-8">
              {category.emoji} {category.title}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {category.trainers.map((trainer) => (
                <Link
                  key={trainer.id}
                  href={`/trenazher${trainer.url}`}
                  className="group card hover:border-white/50 transition-all text-center !p-3"
                >
                  <div className="text-3xl mb-2">{trainer.icon}</div>
                  <h3 className="text-sm font-bold mb-1 group-hover:text-orange leading-snug">{trainer.name}</h3>
                  <p className="text-white/60 text-xs line-clamp-2">{trainer.description}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
