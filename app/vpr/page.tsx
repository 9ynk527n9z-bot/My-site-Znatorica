import Link from 'next/link';
import type { Metadata } from 'next';
import { breadcrumbJsonLd } from '@/lib/seo';
import { VPR_KLASSES, getVprData } from '@/lib/vpr';

export const metadata: Metadata = {
  title: 'Подготовка к ВПР, 3–5 класс — варианты с ответами',
  description:
    'Авторские тренировочные варианты для подготовки к ВПР по математике, русскому языку, окружающему миру и английскому языку: 10 вариантов для 3 класса, 20 для 4 класса и 20 для 5 класса, с ответами и решениями. Можно решать онлайн или распечатать.',
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
  { slug: 'literatura', title: 'Литература', icon: '📖', ready: true },
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
          <p className="text-gray-500 text-sm mt-3 max-w-3xl">
            В Москве и Московской области вместо ВПР пишут МЦКО — формат отличается, для него
            есть отдельный раздел: <Link href="/podgotovka-k-mcko" className="text-orange hover:underline">Подготовка к МЦКО</Link>.
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
                английский язык — 8 заданий (аудирование с настоящей озвучкой, чтение, грамматика,
                анкета), как в реальной работе.
              </p>
            )}
            {klass.slug === '5-klass' && (
              <p className="text-gray-400 mb-6 max-w-3xl">
                Формат ВПР-2026 для 5 класса: математика — 17 заданий в 2 частях (24 балла, 2 урока
                по 45 минут); русский язык — новый короткий формат из 5 заданий (24 балла, 45 минут):
                списывание текста с пропусками, три вида разбора, развёрнутый ответ по тексту,
                лексическое значение слова и постановка ударения; литература — 4 задания по
                стихотворению и прозаическому отрывку из школьной программы (20 баллов, 45 минут);
                английский язык — аудирование, чтение, грамматика и письмо (25 баллов, 45 минут);
                география — 17 заданий (20 баллов, 90 минут) с атласом и непрограммируемым калькулятором;
                биология — 19 заданий (43 балла, 90 минут) без дополнительных материалов.
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
