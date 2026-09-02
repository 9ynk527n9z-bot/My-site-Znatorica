import Link from 'next/link';
import type { Metadata } from 'next';
import { breadcrumbJsonLd } from '@/lib/seo';
import { MCKO_KLASSES, getMckoData } from '@/lib/mcko';

export const metadata: Metadata = {
  title: 'Подготовка к МЦКО, 4 и 5 классы — варианты с ответами',
  description:
    'Авторские тренировочные варианты для подготовки к МЦКО: материалы 4 класса и по 20 вариантов по русскому языку и математике для 5 класса по структуре 2026 года. Ответы и самопроверка.',
  alternates: { canonical: '/podgotovka-k-mcko' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Подготовка к МЦКО', url: '/podgotovka-k-mcko' },
]);

const SUBJECTS = [
  { slug: 'matematika', title: 'Математика', icon: '🔢' },
  { slug: 'russkiy', title: 'Русский язык', icon: '📝' },
  { slug: 'angliyskiy', title: 'Английский язык', icon: '🇬🇧' },
  { slug: 'okruzhayushchiy-mir', title: 'Окружающий мир', icon: '🌍' },
  { slug: 'literaturnoe-chtenie', title: 'Литературное чтение', icon: '📚' },
];

export default function MckoHubPage() {
  return (
    <div className="bg-black min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <div className="bg-gradient-to-r from-violet/20 to-orange/20 border-b border-[#2D2350] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-orange hover:underline text-sm mb-4 inline-block">
            ← На главную
          </Link>
          <h1 className="text-5xl font-bold mb-4">🏙️ Подготовка к МЦКО</h1>
          <p className="text-gray-400 text-lg max-w-3xl">
            Авторские материалы для подготовки к диагностикам Московского центра качества
            образования. Выбери класс и предмет, открой отдельную страницу варианта и реши
            задания на бумаге или с самопроверкой на сайте. Это тренировочные, а не официальные работы МЦКО.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-6 space-y-16">
        {MCKO_KLASSES.map((klass) => (
          <section key={klass.slug}>
            <h2 className="text-3xl font-bold mb-2">{klass.title}</h2>
            <p className="text-gray-400 mb-6 max-w-3xl">
              {klass.slug === '5-klass'
                ? 'Структура весенней диагностики 2026 года. Русский язык: 5 крупных заданий, 10 подпунктов, 24 балла. Математика: 11 заданий, 13 баллов. По 20 авторских вариантов, у каждого своя страница с ответами, объяснениями и критериями.'
                : 'Тренировочные материалы по пяти предметам. Выбери предмет и вариант, выполни задания, затем сравни свои ответы с пояснениями.'}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {SUBJECTS.map((subj) => {
                const data = getMckoData(klass.slug, subj.slug);
                if (!data) return null;
                return (
                  <Link
                    key={subj.slug}
                    href={`/podgotovka-k-mcko/${klass.slug}/${subj.slug}`}
                    className="group bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 hover:border-orange hover:shadow-lg hover:shadow-orange/20 transition-all"
                  >
                    <div className="text-5xl mb-4">{subj.icon}</div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-orange transition-colors">
                      {subj.title}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      {data.variants.length} вариантов · {data.variants[0].tasks.length} заданий в каждом
                    </p>
                    <span className="text-orange font-bold">Открыть варианты →</span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">💡 Как пользоваться вариантами</h2>
          <div className="grid md:grid-cols-3 gap-6 text-gray-300">
            <div>
              <h3 className="font-bold text-orange mb-2">Выбери нужный формат</h3>
              <p className="text-sm">
                Уточни у учителя название и год проверочной работы. Для федеральных проверочных
                работ есть отдельный раздел <Link href="/vpr" className="text-orange hover:underline">Подготовка к ВПР</Link>.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-orange mb-2">Сначала реши</h3>
              <p className="text-sm">
                Подготовь бумагу и ручку, а для математики — линейку. Не открывай ответы до
                завершения работы. Кнопка печати позволяет распечатать задания без ключей.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-orange mb-2">Как заниматься</h3>
              <p className="text-sm">
                Открой ответы и объяснения. В вариантах 5 класса считай баллы по критериям,
                включая частичные баллы за подпункты. Разбери ошибки и переходи к следующему варианту.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
