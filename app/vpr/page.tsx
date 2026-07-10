import Link from 'next/link';
import type { Metadata } from 'next';
import { breadcrumbJsonLd } from '@/lib/seo';
import { VPR_KLASSES, getVprData } from '@/lib/vpr';

export const metadata: Metadata = {
  title: 'Подготовка к ВПР для 3 и 4 класса — тренировочные варианты с ответами',
  description:
    'Авторские тренировочные варианты для подготовки к ВПР по математике, русскому языку и окружающему миру для 3 и 4 класса: по 10 вариантов с ответами и решениями. Можно решать онлайн или распечатать.',
  alternates: { canonical: '/vpr' },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: 'Главная', url: '/' },
  { name: 'Подготовка к ВПР', url: '/vpr' },
]);

const SUBJECTS = [
  { slug: 'matematika', title: 'Математика', icon: '🔢', ready: true },
  { slug: 'russkiy', title: 'Русский язык', icon: '📝', ready: true },
  { slug: 'okruzhayushchiy-mir', title: 'Окружающий мир', icon: '🌍', ready: true },
  { slug: 'angliyskiy', title: 'Английский язык', icon: '🇬🇧', ready: true },
];

export default function VprPage() {
  return (
    <div className="bg-black min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* Hero */}
      <div className="bg-gradient-to-r from-violet/20 to-orange/20 border-b border-[#2D2350] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-orange hover:underline text-sm mb-4 inline-block">
            ← На главную
          </Link>
          <h1 className="text-5xl font-bold mb-4">📋 Подготовка к ВПР</h1>
          <p className="text-gray-400 text-lg max-w-3xl">
            Авторские тренировочные варианты в формате Всероссийских проверочных работ.
            Каждый вариант можно решать онлайн (с самопроверкой по ответам) или распечатать
            и решать на бумаге — как на настоящей работе.
          </p>
        </div>
      </div>

      {/* Segments */}
      <div className="max-w-6xl mx-auto py-12 px-6 space-y-16">
        {VPR_KLASSES.map((klass) => (
          <section key={klass.slug}>
            <h2 className="text-3xl font-bold mb-2">
              {klass.title}
              <span className="text-gray-400 text-lg font-normal ml-3">({klass.note})</span>
            </h2>
            {klass.slug === '3-klass' && (
              <p className="text-gray-400 mb-6 max-w-3xl">
                Официально ВПР пишут начиная с 4 класса — варианты для 3 класса помогают
                привыкнуть к формату заранее и без стресса.
              </p>
            )}
            {klass.slug === '4-klass' && (
              <p className="text-gray-400 mb-6 max-w-3xl">
                Структура повторяет демоверсии ВПР-2026 по каждому предмету: математика — 11 заданий
                (вычисления, геометрия, задачи, логика), задания повышенной сложности № 3, 8, 10, 11
                отмечены отдельно, как в настоящем оценивании; русский язык — 12 заданий, включая
                диктант и текст для чтения; окружающий мир — 10 заданий по основным темам курса;
                английский язык — 4 задания (аудирование с настоящей озвучкой, чтение, грамматика,
                анкета), как в реальной работе.
              </p>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SUBJECTS.map((subj) => {
                const data = subj.ready ? getVprData(klass.slug, subj.slug) : null;
                if (data) {
                  return (
                    <Link
                      key={subj.slug}
                      href={`/vpr/${klass.slug}/${subj.slug}`}
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
                }
                return (
                  <div
                    key={subj.slug}
                    className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8 opacity-50"
                  >
                    <div className="text-5xl mb-4">{subj.icon}</div>
                    <h3 className="text-2xl font-bold mb-2">{subj.title}</h3>
                    <span className="inline-block bg-gray-700/50 text-gray-300 px-3 py-1 rounded text-sm">
                      Скоро
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {/* Как пользоваться */}
        <section className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">💡 Как заниматься по вариантам</h2>
          <div className="grid md:grid-cols-3 gap-6 text-gray-300">
            <div>
              <h3 className="font-bold text-orange mb-2">1. Реши вариант целиком</h3>
              <p className="text-sm">
                Засеки 45 минут — столько длится настоящая ВПР. Не подглядывай в ответы во время решения.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-orange mb-2">2. Проверь себя</h3>
              <p className="text-sm">
                После решения открой ответы под каждым заданием и сравни. К сложным заданиям есть пояснения.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-orange mb-2">3. Разбери ошибки</h3>
              <p className="text-sm">
                Темы, где были ошибки, повтори в разделах <Link href="/3-klass" className="text-orange hover:underline">3 класса</Link> и{' '}
                <Link href="/4-klass" className="text-orange hover:underline">4 класса</Link>, потом решай следующий вариант.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
