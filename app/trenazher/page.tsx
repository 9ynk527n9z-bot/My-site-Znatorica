import Link from 'next/link';

export const metadata = {
  title: 'Все тренажёры — Знаторика',
  description: 'Интерактивные тренажёры для детей 4-11 лет: азбука, числа, цвета, умножение и другие.',
  alternates: { canonical: '/trenazher' },
};

export default function TrainerIndexPage() {
  const trainers = [
    {
      id: 'azbuky',
      name: 'Азбука',
      description: 'Учим буквы',
      icon: '🅰️',
      url: '/azbuky',
    },
    {
      id: 'numbers',
      name: 'Числа',
      description: 'Учим цифры',
      icon: '1️⃣',
      url: '/numbers',
    },
    {
      id: 'colors',
      name: 'Цвета',
      description: 'Распознаём цвета',
      icon: '🌈',
      url: '/colors',
    },
    {
      id: 'multiplication',
      name: 'Умножение',
      description: 'Таблица умножения',
      icon: '✖️',
      url: '/multiplication',
    },
    {
      id: 'english-words',
      name: 'Английские слова',
      description: 'Словарный запас по темам',
      icon: '🇬🇧',
      url: '/english-words',
    },
    {
      id: 'irregular-verbs',
      name: 'Неправильные глаголы',
      description: 'Английские irregular verbs',
      icon: '🇬🇧',
      url: '/irregular-verbs',
    },
    {
      id: 'pogovorki',
      name: 'Поговорки',
      description: 'Русские пословицы и поговорки',
      icon: '📖',
      url: '/pogovorki',
    },
    {
      id: 'shapes-colors',
      name: 'Формы и цвета',
      description: 'Учим фигуры и цвета вместе',
      icon: '🔷',
      url: '/shapes-colors',
    },
    {
      id: 'pristavki',
      name: 'Приставки',
      description: 'Приставки русского языка',
      icon: '📝',
      url: '/pristavki',
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-gradient-to-r from-violet/20 to-orange/20 border-b border-[#2D2350] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-orange hover:underline text-sm mb-4 inline-block">
            ← Назад
          </Link>
          <h1 className="text-5xl font-bold mb-4">🎮 Тренажёры</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map((trainer) => (
            <Link
              key={trainer.id}
              href={`/trenazher${trainer.url}`}
              className="group bg-[#16102A] border border-[#2D2350] rounded-lg p-8 hover:border-orange transition-all text-center"
            >
              <div className="text-6xl mb-4">{trainer.icon}</div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-orange">
                {trainer.name}
              </h3>
              <p className="text-gray-400">{trainer.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
