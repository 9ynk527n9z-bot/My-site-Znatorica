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
    ],
  },
  {
    title: 'Русский язык', icon: '📝', accent: 'from-cyan-400/30 to-violet-300/15',
    items: [
      { href: '/tablicy/padezhi-russkogo-yazyka', icon: '📚', title: 'Падежи русского языка', desc: 'Вопросы, предлоги и примеры' },
      { href: '/tablicy/chasti-rechi', icon: '🔤', title: 'Части речи', desc: 'Значение, вопросы и примеры' },
      { href: '/tablicy/spryazhenie-glagolov', icon: '📝', title: 'Спряжение глаголов', desc: 'Окончания I и II спряжения, исключения' },
      { href: '/tablicy/pristavki', icon: '✂️', title: 'Приставки', desc: 'Неизменяемые, при-/пре-, на з/с' },
      { href: '/tablicy/chleny-predlozheniya', icon: '📐', title: 'Члены предложения', desc: 'Вопросы и условное подчёркивание' },
      { href: '/tablicy/razbor-slova-po-sostavu', icon: '🧩', title: 'Разбор слова по составу', desc: 'Приставка, корень, суффикс, окончание' },
    ],
  },
  {
    title: 'Английский язык', icon: '🇬🇧', accent: 'from-sky-400/30 to-violet-300/15',
    items: [
      { href: '/tablicy/nepravilnye-glagoly', icon: '📖', title: 'Неправильные глаголы', desc: '62 глагола: три формы и перевод' },
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
