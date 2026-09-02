import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import EnglishMenu from '@/components/EnglishMenu';
import { breadcrumbJsonLd } from '@/lib/seo';
import { getPublishedArticles } from '@/lib/content';
import { getSectionPageCounts } from '@/lib/site-stats';

// Свежие статьи берутся из БД (правятся через админку) — рендерим динамически.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Знаторика — тренажёры и генераторы заданий для детей 4–11 лет',
  description:
    'Интерактивные тренажёры, генератор примеров и заданий, плакаты и материалы для учителей. Для дошкольников 4–7 лет и учеников 1–4 класса. Подписка 399 ₽/месяц.',
  alternates: { canonical: '/' },
};

const homeBreadcrumbs = breadcrumbJsonLd([{ name: 'Главная', url: '/' }]);

// Главные разделы сайта
const SECTIONS = [
  { href: '#ucheba', emoji: '📚', title: 'Учеба', desc: 'Темы по возрастам: 4–5 лет … 4 класс', from: '#4DABF7', to: '#4263EB' },
  { href: '/generator', emoji: '⚙️', title: 'Генераторы', desc: 'Примеры, прописи, кроссворды — каждый раз новые', from: '#69DB7C', to: '#2F9E44' },
  { href: '/trenazher', emoji: '🎮', title: 'Тренажеры', desc: 'Интерактивные игры для закрепления', from: '#DA77F2', to: '#9C36B5' },
  { href: '/igry', emoji: '🕹️', title: 'Игры', desc: 'Судоку, змейка, морской бой и другие', from: '#FFD43B', to: '#F59F00' },
  { href: '/plakaty', emoji: '📋', title: 'Плакаты', desc: 'Плакаты-подсказки по предметам', from: '#FFA94D', to: '#E8590C' },
  { href: '/vpr', emoji: '📝', title: 'Подготовка к ВПР', desc: '3–5 класс — тренировочные варианты', from: '#FF8787', to: '#E03131' },
  { href: '/podgotovka-k-mcko', emoji: '🏙️', title: 'Подготовка к МЦКО', desc: 'Москва и МО — 4 класс', from: '#9775FA', to: '#7048E8' },
  { href: '#dlya-roditeley', emoji: '👪', title: 'Для родителей', desc: 'Статьи о школе, режиме и подготовке', from: '#3BC9DB', to: '#1098AD' },
];

export default async function Home() {
  const latestArticles = (await getPublishedArticles()).slice(0, 3);
  const { sections: pageCounts, other: otherPages, total: totalPages } = await getSectionPageCounts();
  return (
    <div className="min-h-screen relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeBreadcrumbs) }}
      />

      {/* Категории — компактной строкой сверху */}
      <section className="px-6 pt-4 pb-1">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-2">
          {SECTIONS.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 hover:border-white/40 hover:bg-white/15 transition-all text-sm font-semibold text-white whitespace-nowrap"
            >
              <span>{s.emoji}</span>
              {s.title}
            </Link>
          ))}
          <EnglishMenu />
        </div>
      </section>

      {/* Hero */}
      <section className="pt-6 pb-6 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-black mb-3 text-white leading-tight">
              Учиться интереснее вместе!
            </h1>
            <p className="text-white/80 text-base md:text-lg mb-6">
              Тренажёры, задания и подготовка к ВПР — для детей от 4 до 11 лет
            </p>
            <p className="font-bold text-white mb-2">С чего начнём?</p>
            <Link href="/turnir" className="inline-flex items-center gap-2 text-orange font-bold hover:underline">
              🏆 Турнир Знаторики →
            </Link>
          </div>
          <div className="flex justify-center md:justify-end">
            <Image
              src="/mascot-hero.png"
              alt="Белка Знаторика"
              width={485}
              height={268}
              className="w-64 md:w-80 h-auto drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* 3 основные плашки */}
      <section className="px-6 pb-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-4">
          <div className="rounded-2xl p-5 bg-gradient-to-br from-[#7048E8] to-[#5f3dc4] flex flex-col gap-1">
            <span className="text-3xl">🎮</span>
            <h2 className="font-bold text-white text-lg">Заниматься и играть</h2>
            <p className="text-white/75 text-sm mb-3">Темы и тренажёры по возрасту</p>
            <Link href="#ucheba" className="btn-secondary text-sm text-center mt-auto">
              Выбрать занятие →
            </Link>
          </div>
          <div className="rounded-2xl p-5 bg-gradient-to-br from-[#2F9E44] to-[#237032] flex flex-col gap-1">
            <span className="text-3xl">🖨️</span>
            <h2 className="font-bold text-white text-lg">Создать и распечатать</h2>
            <p className="text-white/75 text-sm mb-3">Прописи, примеры, кроссворды и филворды</p>
            <Link href="/generator" className="btn-secondary text-sm text-center mt-auto">
              Открыть генераторы →
            </Link>
          </div>
          <div className="rounded-2xl p-5 bg-gradient-to-br from-[#E8590C] to-[#c92a2a] flex flex-col gap-1">
            <span className="text-3xl">📋</span>
            <h2 className="font-bold text-white text-lg">Подготовиться к ВПР / МЦКО</h2>
            <p className="text-white/75 text-sm mb-3">Авторские варианты с ответами</p>
            <Link href="/vpr" className="btn-secondary text-sm text-center mt-auto">
              Выбрать класс →
            </Link>
          </div>
        </div>
      </section>

      {/* Возраст/класс */}
      <section className="px-6 pb-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 md:grid-cols-6 gap-2">
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
      </section>

      {/* Тесты */}
      <section className="px-6 pb-8">
        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
          <Link
            href="/kakoy-ty-roditel"
            className="card flex items-center gap-4 hover:border-orange/60 hover:-translate-y-1 transition-all"
          >
            <span className="text-4xl flex-shrink-0">🧭</span>
            <span>
              <span className="block font-bold text-white">Какой ты родитель?</span>
              <span className="block text-white/60 text-sm">Пройти тест →</span>
            </span>
          </Link>
          <Link
            href="/gotovnost"
            className="card flex items-center gap-4 hover:border-orange/60 hover:-translate-y-1 transition-all"
          >
            <span className="text-4xl flex-shrink-0">🎒</span>
            <span>
              <span className="block font-bold text-white">Готов ли ты к школе</span>
              <span className="block text-white/60 text-sm">Пройти тест →</span>
            </span>
          </Link>
        </div>
      </section>

      {/* Страницы по разделам */}
      <section className="px-6 pb-8">
        <div className="max-w-5xl mx-auto border-t border-white/10 pt-5">
          <p className="text-white/50 text-xs mb-3">Страницы по разделам</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {pageCounts.map((s) => (
              <Link key={s.label} href={s.href} className="group">
                <span className="block text-lg font-black bg-gradient-to-r from-orange to-[#FFD43B] bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
                  {s.count}
                </span>
                <span className="block text-white/60 text-xs">{s.label}</span>
              </Link>
            ))}
            <div>
              <span className="block text-lg font-black bg-gradient-to-r from-orange to-[#FFD43B] bg-clip-text text-transparent">
                {otherPages}
              </span>
              <span className="block text-white/60 text-xs">Другие страницы</span>
            </div>
            <div>
              <span className="block text-lg font-black bg-gradient-to-r from-orange to-[#FFD43B] bg-clip-text text-transparent">
                {totalPages}
              </span>
              <span className="block text-white/60 text-xs">Всего</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 border-y border-white/15">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-6 text-center">
          {[
            { n: '710', l: 'страниц на сайте' },
            { n: '98', l: 'темы по возрастам' },
            { n: '121', l: 'тренажёров и генераторов' },
            { n: '16', l: 'игр' },
            { n: '340', l: 'авторских вариантов ВПР и МЦКО' },
            { n: '105', l: 'статей для родителей' },
            { n: '3', l: 'бесплатных генераций в день' },
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
              { href: '/generator/propisi-angliyskiy', title: '✏️ Прописи (английский)', desc: 'Английские буквы для тренировки почерка' },
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
              { href: '/trenazher/russkiy-alfavit', emoji: '🔤', label: 'Русский алфавит' },
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

      {/* Подписка */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Знаторика PRO</h2>
          <p className="text-white/75 mb-8">После регистрации — 20 занятий в день бесплатно. Знаторика PRO снимает все ограничения</p>

          <div className="card border-orange mb-8">
            <p className="text-5xl font-bold text-orange mb-2">2390 ₽</p>
            <p className="text-white/70 mb-6">за год (или <span className="text-orange font-semibold">399 ₽</span> помесячно)</p>

            <ul className="text-left space-y-3 mb-8">
              <li>✅ Тренажёры, игры и ВПР — без дневного лимита</li>
              <li>✅ Генераторы прописей, примеров, кроссвордов — без лимита</li>
              <li>✅ Рабочие листы и плакаты для печати без водяного знака</li>
              <li>✅ Отчёт об успехах ребёнка в личном кабинете</li>
            </ul>

            <Link href="/podpiska" className="btn-primary w-full text-lg">Оформить подписку</Link>
          </div>

          <p className="text-sm text-white/60">
            Тренажёры, игры и ВПР — 20 в день после регистрации. Генераторы — 3 в день. Со Знаторика PRO ограничений нет.
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
