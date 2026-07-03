import Link from 'next/link';

export const metadata = {
  title: 'Все тренажеры',
  description: 'Интерактивные тренажеры по всем предметам',
};

export default function TrainersPage() {
  const subjects = [
    { id: 'angliyskiy', name: 'Английский', icon: '🇬🇧' },
    { id: 'matematika', name: 'Математика', icon: '🔢' },
    { id: 'russkiy', name: 'Русский', icon: '📝' },
    { id: 'chtenie', name: 'Чтение', icon: '📖' },
    { id: 'okruzhayushchiy-mir', name: 'Окружающий мир', icon: '🌍' },
  ];

  return (
    <div className="bg-black min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Все тренажеры</h1>
        <p className="text-center text-gray-400 mb-12">
          Выбери предмет и начни заниматься
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              href={`/trenazher/${subject.id}`}
              className="card text-center hover:border-orange transition-colors group"
            >
              <p className="text-5xl mb-4">{subject.icon}</p>
              <p className="font-bold group-hover:text-orange transition-colors">
                {subject.name}
              </p>
            </Link>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">
            Тренажеры добавляются каждую неделю
          </p>
          <p className="text-gray-500 text-sm">
            Подписка даёт доступ ко всем новым материалам без ограничений
          </p>
        </div>
      </div>
    </div>
  );
}
