import Link from 'next/link';

const groups = [
  {
    title: 'Математика', icon: '🔢', accent: 'from-rose-400/35 to-orange-300/15',
    items: [
      { href: '/tablicy/tablitsa-umnozheniya', icon: '✖️', title: 'Таблица умножения', desc: 'От 2 до 9 — цветной и чёрно-белый варианты' },
      { href: '/tablicy/sostav-chisla', icon: '🏠', title: 'Состав числа', desc: 'Состав чисел до 10 и до 20' },
      { href: '/tablicy/edinitsy-izmereniya', icon: '📏', title: 'Единицы измерения', desc: 'Длина, масса, время и площадь' },
      { href: '/tablicy/matematicheskie-znaki', icon: '🧮', title: 'Математические знаки', desc: 'Действия, сравнение и порядок вычислений' },
      { href: '/tablicy/kvadraty-chisel', icon: '🔢', title: 'Квадраты чисел', desc: 'От 1 до 20 с примером вычисления' },
      { href: '/tablicy/rimskie-cifry', icon: '🏛️', title: 'Римские цифры', desc: 'Обозначения и числа от 1 до 20' },
      { href: '/tablicy/doli-i-drobi', icon: '🥧', title: 'Доли и дроби', desc: 'Наглядные схемы кругов' },
      { href: '/tablicy/formuly-perimetra-i-ploshchadi', icon: '📐', title: 'Формулы периметра и площади', desc: 'Квадрат, прямоугольник, треугольник, многоугольник' },
    ],
  },
  {
    title: 'Русский язык', icon: '📝', accent: 'from-cyan-400/30 to-violet-300/15',
    items: [
      { href: '/tablicy/padezhi-russkogo-yazyka', icon: '📚', title: 'Падежи русского языка', desc: 'Вопросы, предлоги и примеры' },
      { href: '/tablicy/sklonenie-suschestvitelnykh', icon: '📖', title: 'Склонение существительных', desc: '1, 2 и 3 склонение с окончаниями по падежам' },
      { href: '/tablicy/chasti-rechi', icon: '🔤', title: 'Части речи', desc: 'Значение, вопросы и примеры' },
      { href: '/tablicy/spryazhenie-glagolov', icon: '📝', title: 'Спряжение глаголов', desc: 'Окончания I и II спряжения, исключения' },
      { href: '/tablicy/pristavki', icon: '✂️', title: 'Приставки', desc: 'Неизменяемые, при-/пре-, на з/с' },
      { href: '/tablicy/chleny-predlozheniya', icon: '📐', title: 'Члены предложения', desc: 'Вопросы и условное подчёркивание' },
      { href: '/tablicy/razbor-slova-po-sostavu', icon: '🧩', title: 'Разбор слова по составу', desc: 'Приставка, корень, суффикс, окончание' },
      { href: '/tablicy/glasnye-i-soglasnye-zvuki', icon: '🔤', title: 'Гласные и согласные звуки', desc: '10 гласных, пары звонких и глухих' },
    ],
  },
  {
    title: 'Английский язык', icon: '🇬🇧', accent: 'from-sky-400/30 to-violet-300/15',
    items: [
      { href: '/tablicy/nepravilnye-glagoly', icon: '📖', title: 'Неправильные глаголы', desc: '62 глагола: три формы и перевод' },
      { href: '/tablicy/anglijskie-chislitelnye', icon: '🔢', title: 'Числительные по-английски', desc: 'От 1 до 20 с транскрипцией' },
      { href: '/tablicy/dni-nedeli-po-anglijski', icon: '📅', title: 'Days of the Week', desc: '7 дней недели с переводом и транскрипцией' },
      { href: '/tablicy/zhivotnye-po-anglijski', icon: '🐾', title: 'Domestic and Wild Animals', desc: '20 животных с транскрипцией и переводом' },
      { href: '/tablicy/mesyatsy-i-vremena-goda-po-anglijski', icon: '🌍', title: 'Months and Seasons', desc: '12 месяцев с транскрипцией и переводом' },
      { href: '/tablicy/tsveta-po-anglijski', icon: '🎨', title: 'Colours', desc: '11 цветов с транскрипцией и цветным образцом' },
      { href: '/tablicy/semya-po-anglijski', icon: '👪', title: 'Family', desc: '10 членов семьи с транскрипцией и переводом' },
      { href: '/tablicy/chasti-tela-po-anglijski', icon: '🙌', title: 'Body Parts', desc: '11 частей тела с транскрипцией и переводом' },
    ],
  },
  {
    title: 'Окружающий мир', icon: '🌍', accent: 'from-emerald-400/30 to-cyan-300/15',
    items: [
      { href: '/tablicy/mesyatsy-i-vremena-goda', icon: '🌍', title: 'Месяцы и времена года', desc: '12 месяцев по сезонам' },
      { href: '/tablicy/domashnie-i-dikie-zhivotnye', icon: '🐾', title: 'Домашние и дикие животные', desc: '20 животных в двух колонках' },
      { href: '/tablicy/dni-nedeli', icon: '📅', title: 'Дни недели', desc: '7 дней по порядку, будни и выходные' },
      { href: '/tablicy/krugovorot-vody', icon: '💧', title: 'Круговорот воды', desc: 'Наглядная схема и четыре этапа' },
      { href: '/tablicy/stroenie-rasteniya', icon: '🌱', title: 'Строение растения', desc: 'Корень, стебель, лист, цветок, плод и семя' },
      { href: '/tablicy/tsep-pitaniya', icon: '🌿', title: 'Цепь питания', desc: 'Солнце, трава, кузнечик, лягушка и аист' },
      { href: '/tablicy/zhivaya-nezhivaya-priroda', icon: '🌍', title: 'Живая и неживая природа', desc: 'Примеры природных объектов в двух группах' },
      { href: '/tablicy/organy-chuvstv', icon: '👁️', title: 'Органы чувств человека', desc: 'Глаза, уши, нос, язык и кожа' },
    ],
  },
];

export default function TablesPage() {
  return (
    <main className="min-h-screen bg-[#28134f] px-4 py-14 text-white sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="mb-5 inline-block text-sm font-semibold text-orange hover:underline">← На главную</Link>
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-2 text-sm font-black uppercase tracking-[0.2em] text-violet-200">Бесплатно</p>
          <h1 className="text-3xl font-black sm:text-5xl">Учебные таблицы</h1>
          <p className="mt-4 text-base text-white/75 sm:text-lg">Наглядные материалы для 1–4 класса: откройте, скачайте или распечатайте.</p>
        </header>
        <div className="grid gap-5 md:grid-cols-2">
          {groups.map((group) => (
            <section key={group.title} className={`rounded-3xl border border-white/20 bg-gradient-to-br ${group.accent} p-4 sm:p-5`}>
              <h2 className="mb-4 flex items-center gap-3 text-2xl font-black"><span>{group.icon}</span>{group.title}</h2>
              <div className="grid gap-3">
                {group.items.map((item) => (
                  <Link key={item.href} href={item.href} className="group rounded-2xl border border-white/20 bg-white/10 p-4 text-center transition hover:border-violet-200 hover:bg-white/15">
                    <div className="text-3xl" aria-hidden="true">{item.icon}</div>
                    <h3 className="mt-1 text-xl font-black group-hover:text-orange">{item.title}</h3>
                    <p className="mt-1 text-sm text-white/65">{item.desc}</p>
                    <span className="mt-3 inline-block text-sm font-bold text-violet-200">Открыть таблицу →</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-white/60">Все таблицы можно посмотреть на экране, распечатать или сохранить в PDF, Word и PNG. В бесплатной версии сохраняется небольшая подпись Знаторики, по подписке материалы скачиваются без неё.</p>
      </div>
    </main>
  );
}
