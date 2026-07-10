import { ARTICLES } from './articles';

export interface SearchEntry {
  title: string;
  url: string;
  category: string;
}

const TOPIC_ENTRIES: SearchEntry[] = [
  // 4–5 лет
  { title: 'Счёт до 5', url: '/4-5-let/matematika/schet-do-5', category: '4–5 лет · Математика' },
  { title: 'Счёт до 10', url: '/4-5-let/matematika/schet-do-10', category: '4–5 лет · Математика' },
  { title: 'Фигуры', url: '/4-5-let/matematika/figury', category: '4–5 лет · Математика' },
  { title: 'Цвета и размеры', url: '/4-5-let/matematika/tsveta', category: '4–5 лет · Математика' },
  { title: 'Звуки', url: '/4-5-let/razvitie/zvuki', category: '4–5 лет · Развитие речи' },
  { title: 'Слова', url: '/4-5-let/razvitie/slova', category: '4–5 лет · Развитие речи' },
  { title: 'Пересказ по картинкам', url: '/4-5-let/razvitie/pereskaz-po-kartinkam', category: '4–5 лет · Развитие речи' },
  { title: 'Буквы', url: '/4-5-let/gramota/bukvy', category: '4–5 лет · Грамота' },
  { title: 'Слоги', url: '/4-5-let/gramota/slogov', category: '4–5 лет · Грамота' },
  { title: 'Штриховка и графические диктанты', url: '/4-5-let/gramota/shtrikhovka-i-graficheskie-diktanty', category: '4–5 лет · Грамота' },
  { title: 'Найди лишнее', url: '/4-5-let/logika/naydi-lishnee', category: '4–5 лет · Логика' },
  { title: 'Сравнение предметов', url: '/4-5-let/logika/sravnenie-predmetov', category: '4–5 лет · Логика' },
  { title: 'Загадки', url: '/4-5-let/logika/zagadki', category: '4–5 лет · Логика' },
  { title: 'Времена года', url: '/4-5-let/okruzhayushchiy/vremena-goda', category: '4–5 лет · Окружающий мир' },
  { title: 'Домашние и дикие животные', url: '/4-5-let/okruzhayushchiy/domashnie-i-dikie-zhivotnye', category: '4–5 лет · Окружающий мир' },

  // 6–7 лет
  { title: 'Счёт до 20', url: '/6-7-let/matematika/schet-do-20', category: '6–7 лет · Математика' },
  { title: 'Сложение', url: '/6-7-let/matematika/slozhenie', category: '6–7 лет · Математика' },
  { title: 'Вычитание', url: '/6-7-let/matematika/vychitanie', category: '6–7 лет · Математика' },
  { title: 'Время', url: '/6-7-let/matematika/vremya', category: '6–7 лет · Математика' },
  { title: 'Состав числа', url: '/6-7-let/matematika/sostav-chisla', category: '6–7 лет · Математика' },
  { title: 'Диалоги', url: '/6-7-let/razvitie/dialogi', category: '6–7 лет · Развитие речи' },
  { title: 'Рассказы', url: '/6-7-let/razvitie/rasskazy', category: '6–7 лет · Развитие речи' },
  { title: 'Пересказ по картинкам', url: '/6-7-let/razvitie/pereskaz-po-kartinkam', category: '6–7 лет · Развитие речи' },
  { title: 'Чтение', url: '/6-7-let/gramota/chtenie', category: '6–7 лет · Грамота' },
  { title: 'Письмо', url: '/6-7-let/gramota/pisanie', category: '6–7 лет · Грамота' },
  { title: 'Штриховка и графические диктанты', url: '/6-7-let/gramota/shtrikhovka-i-graficheskie-diktanty', category: '6–7 лет · Грамота' },
  { title: 'Закономерности', url: '/6-7-let/logika/zakonomernosti', category: '6–7 лет · Логика' },
  { title: 'Загадки', url: '/6-7-let/logika/zagadki', category: '6–7 лет · Логика' },
  { title: 'Природные явления', url: '/6-7-let/okruzhayushchiy/prirodnye-yavleniya', category: '6–7 лет · Окружающий мир' },
  { title: 'Тело человека', url: '/6-7-let/okruzhayushchiy/telo-cheloveka', category: '6–7 лет · Окружающий мир' },

  // 1 класс
  { title: 'Сложение 5-10', url: '/1-klass/matematika/slozhenie-5-10', category: '1 класс · Математика' },
  { title: 'Вычитание 5-10', url: '/1-klass/matematika/vychitanie-5-10', category: '1 класс · Математика' },
  { title: 'Задачи', url: '/1-klass/matematika/zadachi', category: '1 класс · Математика' },
  { title: 'Состав числа', url: '/1-klass/matematika/sostav-chisla', category: '1 класс · Математика' },
  { title: 'Письмо', url: '/1-klass/russkiy/pisanie', category: '1 класс · Русский язык' },
  { title: 'Пунктуация', url: '/1-klass/russkiy/punktuaciya', category: '1 класс · Русский язык' },
  { title: 'Гласные и согласные', url: '/1-klass/russkiy/glasnye-i-soglasnye', category: '1 класс · Русский язык' },
  { title: 'Ударение в слове', url: '/1-klass/russkiy/udarenie', category: '1 класс · Русский язык' },
  { title: 'Штриховка и графические диктанты', url: '/1-klass/russkiy/shtrikhovka-i-graficheskie-diktanty', category: '1 класс · Русский язык' },
  { title: 'Проза', url: '/1-klass/chtenie/proza', category: '1 класс · Литературное чтение' },
  { title: 'Стихи', url: '/1-klass/chtenie/stihi', category: '1 класс · Литературное чтение' },
  { title: 'Аналогии', url: '/1-klass/logika/analogii', category: '1 класс · Логика' },
  { title: 'Ориентация в пространстве', url: '/1-klass/logika/orientaciya-v-prostranstve', category: '1 класс · Логика' },
  { title: 'Загадки', url: '/1-klass/logika/zagadki', category: '1 класс · Логика' },
  { title: 'Живая и неживая природа', url: '/1-klass/okruzhayushchiy/zhivaya-i-nezhivaya-priroda', category: '1 класс · Окружающий мир' },
  { title: 'Правила безопасности', url: '/1-klass/okruzhayushchiy/pravila-bezopasnosti', category: '1 класс · Окружающий мир' },

  // 2 класс
  { title: 'Умножение', url: '/2-klass/matematika/umnozhenie', category: '2 класс · Математика' },
  { title: 'Деление', url: '/2-klass/matematika/delenie', category: '2 класс · Математика' },
  { title: 'Двузначные числа', url: '/2-klass/matematika/dvuznachnye', category: '2 класс · Математика' },
  { title: 'Сравнение чисел', url: '/2-klass/matematika/sravnenie-chisel', category: '2 класс · Математика' },
  { title: 'Части речи', url: '/2-klass/russkiy/chasti-rechi', category: '2 класс · Русский язык' },
  { title: 'Предложение', url: '/2-klass/russkiy/predlozhenie', category: '2 класс · Русский язык' },
  { title: 'Корень слова', url: '/2-klass/russkiy/koren-slova', category: '2 класс · Русский язык' },
  { title: 'Безударные гласные', url: '/2-klass/russkiy/bezudarnye-glasnye', category: '2 класс · Русский язык' },
  { title: 'Штриховка и графические диктанты', url: '/2-klass/russkiy/shtrikhovka-i-graficheskie-diktanty', category: '2 класс · Русский язык' },
  { title: 'Природа', url: '/2-klass/okruzhayushchiy/priroda', category: '2 класс · Окружающий мир' },
  { title: 'Человек', url: '/2-klass/okruzhayushchiy/chelovek', category: '2 класс · Окружающий мир' },
  { title: 'Логические задачи', url: '/2-klass/logika/logicheskie-zadachi', category: '2 класс · Логика' },
  { title: 'Ребусы', url: '/2-klass/logika/rebusy', category: '2 класс · Логика' },
  { title: 'Загадки', url: '/2-klass/logika/zagadki', category: '2 класс · Логика' },

  // 3 класс
  { title: 'Трёхзначные числа', url: '/3-klass/matematika/trekhznachnye', category: '3 класс · Математика' },
  { title: 'Сложные примеры', url: '/3-klass/matematika/slozhnie-primery', category: '3 класс · Математика' },
  { title: 'Доли и дроби', url: '/3-klass/matematika/doli', category: '3 класс · Математика' },
  { title: 'Деление с остатком', url: '/3-klass/matematika/delenie-s-ostatkom', category: '3 класс · Математика' },
  { title: 'Спряжение', url: '/3-klass/russkiy/spryazhenie', category: '3 класс · Русский язык' },
  { title: 'Сложные предложения', url: '/3-klass/russkiy/slozhnie-predlozheniya', category: '3 класс · Русский язык' },
  { title: 'Разбор слова по составу', url: '/3-klass/russkiy/razbor-slova-po-sostavu', category: '3 класс · Русский язык' },
  { title: 'Словарь', url: '/3-klass/angliyskiy/vocabulary', category: '3 класс · Английский язык' },
  { title: 'Грамматика', url: '/3-klass/angliyskiy/grammatika', category: '3 класс · Английский язык' },
  { title: 'Комбинаторика', url: '/3-klass/logika/kombinatorika', category: '3 класс · Логика' },
  { title: 'Задачи на взвешивание', url: '/3-klass/logika/zadachi-na-vzveshivanie', category: '3 класс · Логика' },

  // 4 класс
  { title: 'Большие числа', url: '/4-klass/matematika/velikie-chisla', category: '4 класс · Математика' },
  { title: 'Десятичные дроби', url: '/4-klass/matematika/desyatichnie-drobi', category: '4 класс · Математика' },
  { title: 'Геометрия', url: '/4-klass/matematika/geometriya', category: '4 класс · Математика' },
  { title: 'Порядок действий', url: '/4-klass/matematika/poryadok-deystviy', category: '4 класс · Математика' },
  { title: 'Стили речи', url: '/4-klass/russkiy/stili-rechi', category: '4 класс · Русский язык' },
  { title: 'Синтаксис', url: '/4-klass/russkiy/sintaksis', category: '4 класс · Русский язык' },
  { title: 'Склонение существительных', url: '/4-klass/russkiy/sklonenie-suschestvitelnykh', category: '4 класс · Русский язык' },
  { title: 'Классика', url: '/4-klass/literatura/klassika', category: '4 класс · Литература' },
  { title: 'Анализ текста', url: '/4-klass/literatura/analiz-teksta', category: '4 класс · Литература' },
  { title: 'Логические задачи с таблицами', url: '/4-klass/logika/logicheskie-tablitsy', category: '4 класс · Логика' },
  { title: 'Задачи на переливание', url: '/4-klass/logika/zadachi-na-perelivanie', category: '4 класс · Логика' },
];

const SEGMENT_ENTRIES: SearchEntry[] = [
  { title: 'Дошкольники 4–5 лет', url: '/4-5-let', category: 'Раздел' },
  { title: 'Дошкольники 6–7 лет', url: '/6-7-let', category: 'Раздел' },
  { title: '1 класс', url: '/1-klass', category: 'Раздел' },
  { title: '2 класс', url: '/2-klass', category: 'Раздел' },
  { title: '3 класс', url: '/3-klass', category: 'Раздел' },
  { title: '4 класс', url: '/4-klass', category: 'Раздел' },
];

const TRAINER_ENTRIES: SearchEntry[] = [
  { title: 'Азбука', url: '/trenazher/azbuky', category: 'Тренажёр' },
  { title: 'Числа', url: '/trenazher/numbers', category: 'Тренажёр' },
  { title: 'Цвета', url: '/trenazher/colors', category: 'Тренажёр' },
  { title: 'Умножение (игра)', url: '/trenazher/multiplication', category: 'Тренажёр' },
  { title: 'Английские слова по темам', url: '/trenazher/english-words', category: 'Тренажёр' },
  { title: 'Неправильные глаголы', url: '/trenazher/irregular-verbs', category: 'Тренажёр' },
  { title: 'Поговорки и пословицы', url: '/trenazher/pogovorki', category: 'Тренажёр' },
  { title: 'Формы и цвета', url: '/trenazher/shapes-colors', category: 'Тренажёр' },
  { title: 'Приставки', url: '/trenazher/pristavki', category: 'Тренажёр' },
  { title: 'Английский алфавит', url: '/trenazher/angliyskiy-alfavit', category: 'Тренажёр' },
  { title: 'Счёт по-английски', url: '/trenazher/angliyskiy-schet', category: 'Тренажёр' },
  { title: 'Таблица умножения', url: '/trenazher/tablitsa-umnozheniya', category: 'Тренажёр' },
  { title: 'Словарные слова (тренажёр)', url: '/trenazher/slovarnye-slova', category: 'Тренажёр' },
  { title: 'Найди лишнее', url: '/trenazher/naydi-lishnee', category: 'Тренажёр' },
  { title: 'Найди пару', url: '/trenazher/naydi-paru', category: 'Тренажёр' },
  { title: 'Что изменилось?', url: '/trenazher/chto-izmenilos', category: 'Тренажёр' },
  { title: 'Собери по порядку', url: '/trenazher/sobery-po-poryadku', category: 'Тренажёр' },
  { title: 'Цвета на английском', url: '/trenazher/english-colors', category: 'Тренажёр' },
  { title: 'Формы на английском', url: '/trenazher/english-shapes', category: 'Тренажёр' },
];

const GENERATOR_ENTRIES: SearchEntry[] = [
  { title: 'Генератор примеров', url: '/generator/primery', category: 'Генератор' },
  { title: 'Прописи (английский)', url: '/generator/propisi', category: 'Генератор' },
  { title: 'Прописи (русский)', url: '/generator/propisi-ru', category: 'Генератор' },
  { title: 'Генератор кроссвордов', url: '/generator/krossvordy', category: 'Генератор' },
  { title: 'Примеры в столбик', url: '/generator/math', category: 'Генератор' },
  { title: 'Сравнение чисел', url: '/trenazher/sravnenie', category: 'Тренажёр' },
  { title: 'Генератор филвордов', url: '/generator/filvordy', category: 'Генератор' },
  { title: 'Генератор анаграмм', url: '/generator/anagrammy', category: 'Генератор' },
  { title: 'Генератор диктантов', url: '/generator/diktanty', category: 'Генератор' },
  { title: 'Словарные слова', url: '/generator/slovarnye-slova', category: 'Генератор' },
  { title: 'Генератор задач', url: '/generator/zadachi', category: 'Генератор' },
];

const VPR_ENTRIES: SearchEntry[] = [
  { title: 'Подготовка к ВПР — Математика', url: '/vpr/3-klass/matematika', category: 'ВПР · 3 класс' },
  { title: 'Подготовка к ВПР — Русский язык', url: '/vpr/3-klass/russkiy', category: 'ВПР · 3 класс' },
  { title: 'Подготовка к ВПР — Окружающий мир', url: '/vpr/3-klass/okruzhayushchiy-mir', category: 'ВПР · 3 класс' },
  { title: 'Подготовка к ВПР — Английский язык', url: '/vpr/3-klass/angliyskiy', category: 'ВПР · 3 класс' },
  { title: 'Подготовка к ВПР — Математика', url: '/vpr/4-klass/matematika', category: 'ВПР · 4 класс' },
  { title: 'Подготовка к ВПР — Русский язык', url: '/vpr/4-klass/russkiy', category: 'ВПР · 4 класс' },
  { title: 'Подготовка к ВПР — Окружающий мир', url: '/vpr/4-klass/okruzhayushchiy-mir', category: 'ВПР · 4 класс' },
  { title: 'Подготовка к ВПР — Английский язык', url: '/vpr/4-klass/angliyskiy', category: 'ВПР · 4 класс' },
];

const STATIC_ENTRIES: SearchEntry[] = [
  { title: 'Главная страница', url: '/', category: 'Раздел' },
  { title: 'Все генераторы', url: '/generator', category: 'Раздел' },
  { title: 'Все тренажёры', url: '/trenazher', category: 'Раздел' },
  { title: 'Подготовка к ВПР', url: '/vpr', category: 'Раздел' },
  { title: 'Для родителей', url: '/dlya-roditeley', category: 'Раздел' },
  { title: 'Плакаты', url: '/plakaty', category: 'Раздел' },
  { title: 'Подписка', url: '/podpiska', category: 'Раздел' },
];

const ARTICLE_ENTRIES: SearchEntry[] = ARTICLES.map((a) => ({
  title: a.title,
  url: `/dlya-roditeley/${a.slug}`,
  category: 'Для родителей',
}));

export const SEARCH_INDEX: SearchEntry[] = [
  ...STATIC_ENTRIES,
  ...SEGMENT_ENTRIES,
  ...TOPIC_ENTRIES,
  ...TRAINER_ENTRIES,
  ...GENERATOR_ENTRIES,
  ...VPR_ENTRIES,
  ...ARTICLE_ENTRIES,
];

export function searchSite(query: string, limit = 8): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  return SEARCH_INDEX.filter(
    (entry) => entry.title.toLowerCase().includes(q) || entry.category.toLowerCase().includes(q)
  ).slice(0, limit);
}
