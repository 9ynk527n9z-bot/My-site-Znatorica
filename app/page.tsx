import Link from 'next/link';
import type { Metadata } from 'next';
import SearchBar from '@/components/SearchBar';
import { breadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Знаторика — тренажёры и генераторы заданий для детей 4–11 лет',
  description:
    'Интерактивные тренажёры, генератор примеров и заданий, плакаты и материалы для учителей. Для дошкольников 4–7 лет и учеников 1–4 класса. Подписка 299 ₽/месяц.',
  alternates: { canonical: '/' },
};

const homeBreadcrumbs = breadcrumbJsonLd([{ name: 'Главная', url: '/' }]);

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeBreadcrumbs) }}
      />
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
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/4-5-let"
              className="btn-primary px-6 py-3"
            >
              4–5 лет
            </Link>
            <Link
              href="/6-7-let"
              className="btn-primary px-6 py-3"
            >
              6–7 лет
            </Link>
            <Link
              href="/1-klass"
              className="btn-primary px-6 py-3"
            >
              1 класс
            </Link>
            <Link
              href="/2-klass"
              className="btn-primary px-6 py-3"
            >
              2 класс
            </Link>
            <Link
              href="/3-klass"
              className="btn-primary px-6 py-3"
            >
              3 класс
            </Link>
            <Link
              href="/4-klass"
              className="btn-primary px-6 py-3"
            >
              4 класс
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

          <div className="space-y-12">
            {/* Дошкольники */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-orange">🎈 Дошкольники</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                  href="/4-5-let"
                  className="card hover:border-orange transition-colors group"
                >
                  <h4 className="text-xl font-bold mb-2 group-hover:text-orange">
                    4–5 лет
                  </h4>
                  <p className="text-gray-400 text-sm mb-4">
                    Счёт до 5, буквы, цвета, развитие речи
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-orange/20 text-orange px-2 py-1 rounded">📝 Теория</span>
                    <span className="text-xs bg-violet/20 text-violet px-2 py-1 rounded">🎮 Тренажер</span>
                  </div>
                </Link>

                <Link
                  href="/6-7-let"
                  className="card hover:border-orange transition-colors group"
                >
                  <h4 className="text-xl font-bold mb-2 group-hover:text-orange">
                    6–7 лет
                  </h4>
                  <p className="text-gray-400 text-sm mb-4">
                    Подготовка к школе, сложение, вычитание, чтение
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-orange/20 text-orange px-2 py-1 rounded">📝 Теория</span>
                    <span className="text-xs bg-violet/20 text-violet px-2 py-1 rounded">🎮 Тренажер</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Начальная школа */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-orange">📚 Начальная школа (1–4 класс)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { href: '/1-klass', title: '1 класс', desc: 'Основы счёта и чтения' },
                  { href: '/2-klass', title: '2 класс', desc: 'Умножение, деление, окружающий мир' },
                  { href: '/3-klass', title: '3 класс', desc: 'Сложные примеры, грамматика, английский' },
                  { href: '/4-klass', title: '4 класс', desc: 'Дроби, геометрия, литература' },
                ].map((grade) => (
                  <Link
                    key={grade.href}
                    href={grade.href}
                    className="card hover:border-orange transition-colors group"
                  >
                    <h4 className="text-xl font-bold mb-2 group-hover:text-orange">
                      {grade.title}
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">
                      {grade.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-orange/20 text-orange px-2 py-1 rounded">📝 Теория</span>
                      <span className="text-xs bg-violet/20 text-violet px-2 py-1 rounded">🎮 Тренажер</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
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
            <Link
              href="/plakaty"
              className="card text-center hover:border-orange transition-colors"
            >
              <p className="text-3xl mb-2">🖼️</p>
              <p className="font-bold">Плакаты</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
