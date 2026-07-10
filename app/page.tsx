import Link from 'next/link';
import type { Metadata } from 'next';
import SearchBar from '@/components/SearchBar';
import { breadcrumbJsonLd } from '@/lib/seo';
import { getPublishedArticles } from '@/lib/content';

// Свежие статьи берутся из БД (правятся через админку) — рендерим динамически.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Знаторика — тренажёры и генераторы заданий для детей 4–11 лет',
  description:
    'Интерактивные тренажёры, генератор примеров и заданий, плакаты и материалы для учителей. Для дошкольников 4–7 лет и учеников 1–4 класса. Подписка 399 ₽/месяц.',
  alternates: { canonical: '/' },
};

const homeBreadcrumbs = breadcrumbJsonLd([{ name: 'Главная', url: '/' }]);

// Шесть главных разделов сайта
const SECTIONS = [
  { href: '#ucheba', emoji: '📚', title: 'Учеба', desc: 'Темы по возрастам: 4–5 лет … 4 класс', from: '#4DABF7', to: '#4263EB' },
  { href: '/generator', emoji: '⚙️', title: 'Генераторы', desc: 'Примеры, прописи, кроссворды — каждый раз новые', from: '#69DB7C', to: '#2F9E44' },
  { href: '/trenazher', emoji: '🎮', title: 'Тренажеры', desc: 'Интерактивные игры для закрепления', from: '#DA77F2', to: '#9C36B5' },
  { href: '#shpargalki', emoji: '📋', title: 'Шпаргалки', desc: 'Плакаты-подсказки по предметам', from: '#FFA94D', to: '#E8590C' },
  { href: '/vpr', emoji: '📋', title: 'Подготовка к ВПР', desc: '3 и 4 класс — тренировочные варианты', from: '#FF8787', to: '#E03131' },
  { href: '#dlya-roditeley', emoji: '👪', title: 'Для родителей', desc: 'Статьи о школе, режиме и подготовке', from: '#3BC9DB', to: '#1098AD' },
];

export default async function Home() {
  const latestArticles = (await getPublishedArticles()).slice(0, 3);
  return (
    <div className="min-h-screen relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeBreadcrumbs) }}
      />

      {/* Hero */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-orange via-[#f72585] to-[#FFD43B] bg-clip-text text-transparent">
              Знаторика
            </span>
          </h1>
          <p className="text-white/85 text-lg mb-8">
            Учись, тренируйся и сдавай — детям 4–11 лет учиться играючи, а родителям видеть реальный прогресс
          </p>

          <div className="mb-8">
            <SearchBar />
          </div>

          <div className="mb-6">
            <Link href="/podpiska" className="btn-primary px-10 py-4 text-lg inline-block">
              Оформить подписку — 399 ₽/мес
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
            {[
              { href: '/4-5-let', label: '4–5 лет' },
              { href: '/6-7-let', label: '6–7 лет' },
              { href: '/1-klass', label: '1 класс' },
              { href: '/2-klass', label: '2 класс' },
              { href: '/3-klass', label: '3 класс' },
              { href: '/4-klass', label: '4 класс' },
            ].map((g) => (
              <Link key={g.href} href={g.href} className="btn-secondary px-2 py-2 text-sm text-center">
                {g.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Меню разделов */}
      <section className="px-6 pb-8">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-2 sm:gap-4">
          {SECTIONS.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="card group flex flex-col items-center text-center gap-1 hover:border-white/50 hover:-translate-y-1 transition-all !p-2 sm:!p-3"
            >
              <span
                className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-base sm:text-lg shadow-lg"
                style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})` }}
              >
                {s.emoji}
              </span>
              <span className="block text-xs sm:text-sm font-bold text-white leading-tight">{s.title}</span>
              <span className="hidden sm:block text-white/70 text-xs leading-tight">{s.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 border-y border-white/15">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {[
            { n: '82', l: 'темы по возрастам' },
            { n: '33', l: 'тренажёров и генераторов' },
            { n: '80', l: 'авторских вариантов ВПР' },
            { n: '89', l: 'статей для родителей' },
            { n: '5', l: 'бесплатных генераций в день' },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-3xl md:text-4xl font-black text-[#FFD43B]">{s.n}</p>
              <p className="text-white/70 text-sm">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Учеба */}
      <section id="ucheba" className="py-20 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">📚 Учеба</h2>
          <p className="text-center text-white/75 mb-12">Выбери свой уровень — теория и тренажёры по каждой теме</p>

          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-[#FFD43B]">🎈 Дошкольники</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/4-5-let" className="card hover:border-white/50 transition-colors group">
                  <h4 className="text-xl font-bold mb-2 group-hover:text-orange">4–5 лет</h4>
                  <p className="text-white/70 text-sm mb-4">Счёт до 5, буквы, цвета, развитие речи</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-orange/25 text-orange px-2 py-1 rounded">📝 Теория</span>
                    <span className="text-xs bg-violet/25 text-[#DA77F2] px-2 py-1 rounded">🎮 Тренажер</span>
                  </div>
                </Link>
                <Link href="/6-7-let" className="card hover:border-white/50 transition-colors group">
                  <h4 className="text-xl font-bold mb-2 group-hover:text-orange">6–7 лет</h4>
                  <p className="text-white/70 text-sm mb-4">Подготовка к школе, сложение, вычитание, чтение</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-orange/25 text-orange px-2 py-1 rounded">📝 Теория</span>
                    <span className="text-xs bg-violet/25 text-[#DA77F2] px-2 py-1 rounded">🎮 Тренажер</span>
                  </div>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-[#FFD43B]">📖 Начальная школа (1–4 класс)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { href: '/1-klass', title: '1 класс', desc: 'Основы счёта и чтения' },
                  { href: '/2-klass', title: '2 класс', desc: 'Умножение, деление, окружающий мир' },
                  { href: '/3-klass', title: '3 класс', desc: 'Сложные примеры, грамматика, английский' },
                  { href: '/4-klass', title: '4 класс', desc: 'Дроби, геометрия, литература' },
                ].map((grade) => (
                  <Link key={grade.href} href={grade.href} className="card hover:border-white/50 transition-colors group">
                    <h4 className="text-xl font-bold mb-2 group-hover:text-orange">{grade.title}</h4>
                    <p className="text-white/70 text-sm mb-4">{grade.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-orange/25 text-orange px-2 py-1 rounded">📝 Теория</span>
                      <span className="text-xs bg-violet/25 text-[#DA77F2] px-2 py-1 rounded">🎮 Тренажер</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Генераторы */}
      <section id="generatory" className="py-20 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">⚙️ Генераторы заданий</h2>
          <p className="text-center text-white/75 mb-12">Создавай и печатай задания для тренировки — каждый раз новые</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { href: '/generator/primery', title: '📊 Примеры', desc: 'До 10, до 100, до 1000 — сложение, вычитание, умножение, деление' },
              { href: '/generator/krossvordy', title: '🔤 Кроссворды', desc: 'Еда, животные, насекомые, цветы, одежда, спорт' },
              { href: '/generator/propisi-ru', title: '✍️ Прописи (русский)', desc: 'Буквы русского алфавита для обводки и письма' },
              { href: '/generator/propisi', title: '✏️ Прописи (английский)', desc: 'Английские буквы для тренировки почерка' },
              { href: '/generator/math', title: '🧮 Примеры в столбик', desc: 'Вычитание и деление в столбик, как в тетради' },
              { href: '/generator/diktanty', title: '🎤 Диктанты', desc: 'Тексты для диктанта по классам (1–4)' },
              { href: '/generator/slovarnye-slova', title: '📖 Словарные слова', desc: 'Непроверяемые слова по классам — списком или с пропуском буквы' },
              { href: '/generator/zadachi', title: '🧩 Задачи', desc: 'Текстовые задачи для 3–4 класса — с решением и ответом' },
            ].map((g) => (
              <Link key={g.href} href={g.href} className="card hover:border-white/50 transition-colors group">
                <h3 className="text-xl font-bold mb-2 group-hover:text-orange">{g.title}</h3>
                <p className="text-white/70 text-sm">{g.desc}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/generator" className="text-orange font-bold hover:underline">Все генераторы →</Link>
          </div>
        </div>
      </section>

      {/* Тренажеры */}
      <section id="trenazhery" className="py-20 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">🎮 Тренажеры</h2>
          <p className="text-center text-white/75 mb-12">Интерактивные игры для закрепления знаний</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { href: '/trenazher/azbuky', emoji: '🔤', label: 'Азбука' },
              { href: '/trenazher/multiplication', emoji: '✖️', label: 'Таблица умножения' },
              { href: '/trenazher/english-words', emoji: '🇬🇧', label: 'Английские слова' },
              { href: '/trenazher/pristavki', emoji: '📝', label: 'Приставки' },
              { href: '/trenazher', emoji: '🎮', label: 'Все тренажёры' },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="card text-center hover:border-white/50 transition-colors">
                <p className="text-3xl mb-2">{t.emoji}</p>
                <p className="font-bold">{t.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Шпаргалки */}
      <section id="shpargalki" className="py-20 px-6 scroll-mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2">📋 Шпаргалки</h2>
          <p className="text-white/75 mb-8">
            Наглядные плакаты-подсказки по математике, русскому и английскому — смотри на экране или печатай и вешай на стену
          </p>
          <Link href="/plakaty" className="btn-primary px-8 py-3 inline-block">Открыть плакаты</Link>
        </div>
      </section>


      {/* Подписка */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Получи полный доступ</h2>
          <p className="text-white/75 mb-8">Все тренажёры, генераторы и материалы для учителей</p>

          <div className="card border-orange mb-8">
            <p className="text-5xl font-bold text-orange mb-2">399 ₽</p>
            <p className="text-white/70 mb-6">в месяц</p>

            <ul className="text-left space-y-3 mb-8">
              <li>✅ Все тренажёры без ограничений</li>
              <li>✅ Генератор примеров, прописей</li>
              <li>✅ Рабочие листы и плакаты</li>
              <li>✅ Материалы для учителей</li>
            </ul>

            <Link href="/podpiska" className="btn-primary w-full text-lg">Оформить подписку</Link>
          </div>

          <p className="text-sm text-white/60">
            Бесплатный доступ к теории, шпаргалкам и 10 генерациям в день
          </p>
        </div>
      </section>

      {/* Для родителей */}
      <section id="dlya-roditeley" className="py-20 px-6 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">👪 Для родителей</h2>
          <p className="text-center text-white/75 mb-12">Практические статьи о школе, режиме и подготовке — актуальные на 2026 год</p>

          <div className="space-y-4 mb-8">
            {latestArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/dlya-roditeley/${article.slug}`}
                className="card block hover:border-white/50 transition-colors group"
              >
                <span className="text-xs bg-orange/25 text-orange px-2 py-1 rounded font-bold">{article.tag}</span>
                <h3 className="text-xl font-bold mt-3 mb-1 group-hover:text-orange">{article.title}</h3>
                <p className="text-white/70 text-sm">{article.description}</p>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/dlya-roditeley" className="text-orange font-bold hover:underline">Все статьи для родителей →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
