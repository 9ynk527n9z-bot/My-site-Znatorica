import Link from 'next/link';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#0A0812] to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            🐿️ Знаторика
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            Учись. Тренируйся. Сдавай.
          </p>

          {/* Search */}
          <div className="mb-12">
            <SearchBar />
          </div>

          {/* Buttons */}
          <div className="flex gap-6 justify-center flex-wrap">
            <Link
              href="/4-5-let"
              className="btn-primary text-lg px-8 py-4"
            >
              Дошкольники 4–5 лет
            </Link>
            <Link
              href="/6-7-let"
              className="btn-primary text-lg px-8 py-4"
            >
              Дошкольники 6–7 лет
            </Link>
            <Link
              href="/1-klass"
              className="btn-primary text-lg px-8 py-4"
            >
              1 класс
            </Link>
          </div>
        </div>
      </section>

      {/* Segments Overview */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Выбери свой уровень
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Дошкольники 4-5 */}
            <Link
              href="/4-5-let"
              className="card hover:border-orange transition-colors group"
            >
              <h3 className="text-xl font-bold mb-2 group-hover:text-orange">
                4–5 лет
              </h3>
              <p className="text-gray-400 text-sm">
                Счёт, буквы, английский, логика
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs bg-orange/20 text-orange px-2 py-1 rounded">
                  Начало
                </span>
              </div>
            </Link>

            {/* Дошкольники 6-7 */}
            <Link
              href="/6-7-let"
              className="card hover:border-orange transition-colors group"
            >
              <h3 className="text-xl font-bold mb-2 group-hover:text-orange">
                6–7 лет
              </h3>
              <p className="text-gray-400 text-sm">
                Счёт, поговорки, английский, логика
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs bg-orange/20 text-orange px-2 py-1 rounded">
                  Подготовка
                </span>
              </div>
            </Link>

            {/* Начальная школа */}
            <Link
              href="/1-klass"
              className="card hover:border-orange transition-colors group"
            >
              <h3 className="text-xl font-bold mb-2 group-hover:text-orange">
                1–4 класс
              </h3>
              <p className="text-gray-400 text-sm">
                Все предметы, ВПР, материалы для учителей
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs bg-orange/20 text-orange px-2 py-1 rounded">
                  Школа
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Subscription Block */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-[#16102A]/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Получи полный доступ</h2>
          <p className="text-gray-400 mb-8">
            Все тренажёры, генераторы и материалы для учителей
          </p>

          <div className="card border-orange mb-8">
            <p className="text-5xl font-bold text-orange mb-2">299 ₽</p>
            <p className="text-gray-400 mb-6">в месяц</p>

            <ul className="text-left space-y-3 mb-8">
              <li>✅ Все тренажёры без ограничений</li>
              <li>✅ Генератор примеров, прописей</li>
              <li>✅ Рабочие листы и плакаты</li>
              <li>✅ Материалы для учителей</li>
            </ul>

            <Link
              href="/podpiska"
              className="btn-primary w-full text-lg"
            >
              Оформить подписку
            </Link>
          </div>

          <p className="text-sm text-gray-500">
            Бесплатный доступ к теории, шпаргалкам и 10 генерациям в день
          </p>
        </div>
      </section>

      {/* Тренажеры */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Все тренажеры
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <Link
              href="/trenazher/angliyskiy"
              className="card text-center hover:border-orange transition-colors"
            >
              <p className="text-3xl mb-2">🇬🇧</p>
              <p className="font-bold">Английский</p>
            </Link>
            <Link
              href="/trenazher/matematika"
              className="card text-center hover:border-orange transition-colors"
            >
              <p className="text-3xl mb-2">🔢</p>
              <p className="font-bold">Математика</p>
            </Link>
            <Link
              href="/trenazher/russkiy"
              className="card text-center hover:border-orange transition-colors"
            >
              <p className="text-3xl mb-2">📝</p>
              <p className="font-bold">Русский</p>
            </Link>
            <Link
              href="/trenazher/chtenie"
              className="card text-center hover:border-orange transition-colors"
            >
              <p className="text-3xl mb-2">📖</p>
              <p className="font-bold">Чтение</p>
            </Link>
            <Link
              href="/generator/primery"
              className="card text-center hover:border-orange transition-colors"
            >
              <p className="text-3xl mb-2">⚙️</p>
              <p className="font-bold">Генератор</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
