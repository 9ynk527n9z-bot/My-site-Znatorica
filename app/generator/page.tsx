import Link from 'next/link';

export const metadata = {
  title: 'Генераторы заданий — примеры, прописи, кроссворды',
  description: 'Создавайте примеры по математике, прописи, кроссворды и другие развивающие задания. 3 бесплатных генерации в день.',
  alternates: { canonical: '/generator' },
};

const GENERATORS = [
  { url: '/primery', emoji: '📊', title: 'Примеры', desc: 'До 10 / 100 / 1000 — 6 режимов', category: 'math' },
  { url: '/primery-do-20', emoji: '➕', title: 'Примеры до 20', desc: 'Переход через десяток для 1 класса', category: 'math' },
  { url: '/primery-po-klassam', emoji: '🎓', title: 'Примеры по классам', desc: 'Выбери класс — диапазон подберётся сам', category: 'math' },
  { url: '/krossvordy', emoji: '🔤', title: 'Кроссворды', desc: 'Еда, животные, спорт и другие темы', category: 'words' },
  { url: '/filvordy', emoji: '🔍', title: 'Филворды', desc: 'Найди слова в сетке букв', category: 'words' },
  { url: '/anagrammy', emoji: '🔤', title: 'Анаграммы', desc: 'Разгадай слово из букв', category: 'words' },
  { url: '/propisi-ru', emoji: '✍️', title: 'Прописи (рус.)', desc: 'Буквы русского алфавита', category: 'words' },
  { url: '/alfavit', emoji: '🪆', title: 'Алфавит', desc: 'Печатные и письменные буквы А–Я', category: 'words' },
  { url: '/propisi-glasnye', emoji: '🅰️', title: 'Прописи: гласные', desc: 'Только гласные буквы', category: 'words' },
  { url: '/propisi-soglasnye', emoji: '🅱️', title: 'Прописи: согласные', desc: 'Только согласные буквы', category: 'words' },
  { url: '/propisi-dlya-doshkolnikov', emoji: '🎈', title: 'Прописи для дошкольников', desc: 'Печатные буквы, 4–6 лет', category: 'preschool' },
  { url: '/propisi-1-klass', emoji: '📏', title: 'Прописи для 1 класса', desc: 'Письменные буквы, как в школе', category: 'words' },
  { url: '/propisi-alfavit', emoji: '🔠', title: 'Прописи: весь алфавит', desc: 'Все буквы по порядку', category: 'words' },
  { url: '/propisi-angliyskiy', emoji: '✏️', title: 'Прописи (англ.)', desc: 'Английские буквы', category: 'words' },
  { url: '/angliyskiy-alfavit', emoji: '🇬🇧', title: 'Английский алфавит', desc: 'Печатные и письменные буквы A–Z', category: 'words' },
  { url: '/diktanty', emoji: '🎤', title: 'Диктанты', desc: '1–4 класс', category: 'words' },
  { url: '/slovarnye-slova', emoji: '📖', title: 'Словарные слова', desc: '1–4 класс', category: 'words' },
  { url: '/zadachi', emoji: '🧩', title: 'Задачи', desc: '3–4 класс', category: 'math' },
  { url: '/sostav-chisla', emoji: '🏠', title: 'Состав числа', desc: '«Домики» для 1 класса', category: 'math' },
  { url: '/schet-predmetov', emoji: '🔢', title: 'Счёт предметов', desc: 'Для дошкольников и 1 класса', category: 'preschool' },
  { url: '/graficheskiy-diktant', emoji: '✏️', title: 'Графический диктант', desc: 'Рисунок по клеточкам', category: 'preschool' },
  { url: '/matematicheskaya-raskraska', emoji: '🎨', title: 'Математическая раскраска', desc: 'Реши пример — узнай цвет', category: 'math' },
  { url: '/labirinty', emoji: '🌀', title: 'Лабиринты', desc: '3 размера, от 3 лет до школьников', category: 'preschool' },
  { url: '/sudoku', emoji: '🎲', title: 'Судоку для детей', desc: '4×4, 6×6, 9×9 — по возрасту', category: 'math' },
  { url: '/naydi-i-poschitay', emoji: '👀', title: 'Найди и посчитай', desc: 'Находилки: сколько каждого вида', category: 'preschool' },
  { url: '/kotoryy-chas', emoji: '🕒', title: 'Который час?', desc: 'Циферблаты для 1–3 класса', category: 'math' },
  { url: '/raspisanie-urokov', emoji: '🗓️', title: 'Расписание уроков', desc: 'Заполни и распечатай', category: 'school' },
  { url: '/fleshkarty', emoji: '🃏', title: 'Флеш-карточки', desc: 'Алфавит, числа, слова — для вырезания', category: 'preschool' },
  { url: '/spisyvanie', emoji: '✍️', title: 'Списывание', desc: 'Текст для переписывания от руки', category: 'words' },
  { url: '/chislovaya-piramida', emoji: '🔺', title: 'Числовая пирамида', desc: 'Сложи пары до самой вершины', category: 'math' },
  { url: '/chitatelskiy-dnevnik', emoji: '📖', title: 'Читательский дневник', desc: 'Обложка, страницы книг и сводная таблица', category: 'school' },
  { url: '/nakleyki-na-tetradi', emoji: '🏷️', title: 'Наклейки для подписи тетрадей', desc: 'Впиши имя один раз — получи наклейки на все предметы', category: 'school' },
  { url: '/raspisanie-zvonkov', emoji: '🔔', title: 'Расписание звонков', desc: 'Считается само по времени начала и длительности урока', category: 'school' },
  { url: '/rezhim-dnya-shkolnika', emoji: '🕗', title: 'Режим дня школьника', desc: 'Готовый распорядок дня для 1–4 и 5–9 класса', category: 'school' },
  { url: '/spisok-v-shkolu', emoji: '🎒', title: 'Список вещей в школу', desc: 'Чек-лист по классу — отмечай галочкой при сборе', category: 'school' },
  { url: '/raspisanie-kruzhkov', emoji: '🎨', title: 'Расписание кружков и секций', desc: 'На неделю, включая выходные', category: 'school' },
  { url: '/grafik-dezhurstv', emoji: '🧹', title: 'График дежурств', desc: 'Равномерно распределить учеников по дням', category: 'school' },
  { url: '/yarlychki-na-odezhdu', emoji: '🏷️', title: 'Ярлычки на одежду', desc: 'Подпиши куртки, шапки и обувь для сада и школы', category: 'school' },
  { url: '/dnevnik-nablyudeniy-za-pogodoy', emoji: '🌦️', title: 'Дневник наблюдений за погодой', desc: 'Таблица на неделю, 2 недели или месяц', category: 'school' },
  { url: '/razdeli-na-gruppy', emoji: '🧩', title: 'Раздели на группы', desc: 'Сортировка карточек по двум столбикам', category: 'preschool' },
];

const COLUMNS = [
  { id: 'math', categories: ['math'], icon: '🔢', title: 'Математика и логика', desc: 'Примеры, задачи и головоломки', accent: 'from-rose-400/45 via-pink-400/32 to-orange-400/20', card: 'from-rose-400/34 via-pink-400/28 to-orange-400/20 hover:from-rose-400/44 hover:to-orange-400/28' },
  { id: 'development', categories: ['words', 'preschool'], icon: '✍️', title: 'Развитие', desc: 'Буквы, слова, моторика и внимание', accent: 'from-emerald-400/30 via-teal-400/18 to-cyan-300/10', card: 'from-emerald-400/24 via-teal-400/15 to-cyan-300/12 hover:from-emerald-400/34 hover:to-cyan-300/20' },
  { id: 'school', categories: ['school'], icon: '🎒', title: 'Всё для школы', desc: 'Расписания, дневники и чек-листы', accent: 'from-sky-400/35 via-blue-400/20 to-indigo-300/10', card: 'from-sky-400/28 via-blue-400/16 to-indigo-300/12 hover:from-sky-400/38 hover:to-indigo-300/20' },
] as const;

export default function GeneratorPage() {
  return (
    <div className="generator-catalog-page min-h-screen py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-orange hover:underline text-sm mb-4 inline-block">
          ← Назад
        </Link>
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-[28px] sm:text-[40px] font-bold mb-4">Генераторы заданий</h1>
          <p className="text-white/75 text-base sm:text-lg">Выбери материал, задай сложность и получи готовый лист для печати.
          </p>
          <p className="text-white/55 text-sm mt-2">3 раза бесплатно в день · без лимита по подписке</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          {COLUMNS.map((column) => (
            <section key={column.id} id={column.id} className={`scroll-mt-24 rounded-2xl border border-white/15 bg-gradient-to-b ${column.accent} p-3`}>
              <div className="flex items-center gap-3 min-h-[76px] px-2 mb-2">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-black/10 text-xl">
                  {column.icon}
                </div>
                <div>
                  <h2 className="text-lg font-extrabold leading-tight text-[#FF9F1C] drop-shadow-[0_1px_2px_rgba(45,15,75,0.9)]">
                    {column.title}
                  </h2>
                  <p className="text-white/60 text-xs leading-snug mt-1">{column.desc}</p>
                </div>
              </div>

              <div className="grid gap-2">
                {GENERATORS.filter((generator) => column.categories.some((category) => category === generator.category)).map((generator) => (
                  <Link
                    key={generator.url}
                    href={`/generator${generator.url}`}
                    className={`group min-h-[104px] rounded-xl border border-white/20 bg-gradient-to-br ${column.card} p-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-white/50 transition-all`}
                  >
                    <div className="text-2xl mb-1">
                      {generator.emoji}
                    </div>
                    <h3 className="text-lg font-bold leading-snug group-hover:text-orange transition-colors">{generator.title}</h3>
                    <p className="text-white/60 text-base leading-snug mt-1 line-clamp-2">{generator.desc}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
