// Статичный индекс для поиска по сайту: тренажёры, генераторы, темы по возрастам,
// разделы ВПР, плакаты и общие разделы. Статьи для родителей и новые темы из CMS
// (создаются/правятся в админке) сюда НЕ включены — они живут в БД и подмешиваются
// в рантайме сервисом `lib/search-service.ts` (используется в /api/search и /search).

export type SearchResultType =
  | 'Тренажёр'
  | 'Генератор'
  | 'Тема'
  | 'Статья'
  | 'ВПР'
  | 'МЦКО'
  | 'Плакат'
  | 'Раздел';

export interface SearchEntry {
  title: string;
  url: string;
  category: string;
  type: SearchResultType;
}

function withType(type: SearchResultType, entries: Omit<SearchEntry, 'type'>[]): SearchEntry[] {
  return entries.map((e) => ({ ...e, type }));
}

const TOPIC_ENTRIES: SearchEntry[] = withType('Тема', [
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
  { title: 'Сложение и вычитание до 20', url: '/1-klass/matematika/slozhenie-do-20', category: '1 класс · Математика' },
  { title: 'Вычитание 5-10', url: '/1-klass/matematika/vychitanie-5-10', category: '1 класс · Математика' },
  { title: 'Задачи', url: '/1-klass/matematika/zadachi', category: '1 класс · Математика' },
  { title: 'Состав числа', url: '/1-klass/matematika/sostav-chisla', category: '1 класс · Математика' },
  { title: 'Письмо', url: '/1-klass/russkiy/pisanie', category: '1 класс · Русский язык' },
  { title: 'Пунктуация', url: '/1-klass/russkiy/punktuaciya', category: '1 класс · Русский язык' },
  { title: 'Гласные и согласные', url: '/1-klass/russkiy/glasnye-i-soglasnye', category: '1 класс · Русский язык' },
  { title: 'Ударение в слове', url: '/1-klass/russkiy/udarenie', category: '1 класс · Русский язык' },
  { title: 'Жи-ши, ча-ща, чу-щу', url: '/1-klass/russkiy/zhi-shi-cha-scha', category: '1 класс · Русский язык' },
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
  { title: 'Периметр', url: '/2-klass/matematika/perimetr', category: '2 класс · Математика' },
  { title: 'Части речи', url: '/2-klass/russkiy/chasti-rechi', category: '2 класс · Русский язык' },
  { title: 'Предложение', url: '/2-klass/russkiy/predlozhenie', category: '2 класс · Русский язык' },
  { title: 'Корень слова', url: '/2-klass/russkiy/koren-slova', category: '2 класс · Русский язык' },
  { title: 'Синонимы и антонимы', url: '/2-klass/russkiy/sinonimy-antonimy', category: '2 класс · Русский язык' },
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
  { title: 'Площадь и периметр', url: '/3-klass/matematika/ploshchad-perimetr', category: '3 класс · Математика' },
  { title: 'Уравнения', url: '/3-klass/matematika/uravneniya', category: '3 класс · Математика' },
  { title: 'Деление с остатком', url: '/3-klass/matematika/delenie-s-ostatkom', category: '3 класс · Математика' },
  { title: 'Внетабличное умножение и деление', url: '/3-klass/matematika/vnetablichnoe-umnozhenie', category: '3 класс · Математика' },
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
  { title: 'Задачи на движение', url: '/4-klass/matematika/skorost-vremya-rasstoyanie', category: '4 класс · Математика' },
  { title: 'Единицы измерения', url: '/4-klass/matematika/edinitsy-izmereniya', category: '4 класс · Математика' },
  { title: 'Умножение и деление столбиком', url: '/4-klass/matematika/umnozhenie-delenie-stolbikom', category: '4 класс · Математика' },
  { title: 'Стили речи', url: '/4-klass/russkiy/stili-rechi', category: '4 класс · Русский язык' },
  { title: 'Синтаксис', url: '/4-klass/russkiy/sintaksis', category: '4 класс · Русский язык' },
  { title: 'Склонение существительных', url: '/4-klass/russkiy/sklonenie-suschestvitelnykh', category: '4 класс · Русский язык' },
  { title: 'Классика', url: '/4-klass/literatura/klassika', category: '4 класс · Литература' },
  { title: 'Анализ текста', url: '/4-klass/literatura/analiz-teksta', category: '4 класс · Литература' },
  { title: 'Логические задачи с таблицами', url: '/4-klass/logika/logicheskie-tablitsy', category: '4 класс · Логика' },
  { title: 'Задачи на переливание', url: '/4-klass/logika/zadachi-na-perelivanie', category: '4 класс · Логика' },
]);

const SEGMENT_ENTRIES: SearchEntry[] = withType('Раздел', [
  { title: 'Дошкольники 4–5 лет', url: '/4-5-let', category: 'Раздел' },
  { title: 'Дошкольники 6–7 лет', url: '/6-7-let', category: 'Раздел' },
  { title: '1 класс', url: '/1-klass', category: 'Раздел' },
  { title: '2 класс', url: '/2-klass', category: 'Раздел' },
  { title: '3 класс', url: '/3-klass', category: 'Раздел' },
  { title: '4 класс', url: '/4-klass', category: 'Раздел' },
]);

const TRAINER_ENTRIES: SearchEntry[] = withType('Тренажёр', [
  { title: 'Крестики-нолики', url: '/trenazher/krestiki-noliki', category: 'Тренажёр' },
  { title: 'Угадай слово', url: '/trenazher/ugaday-slovo', category: 'Тренажёр' },
  { title: 'Пятнашки', url: '/trenazher/pyatnashki', category: 'Тренажёр' },
  { title: 'Слова из слова', url: '/trenazher/slova-iz-slova', category: 'Тренажёр' },
  { title: 'Судоку', url: '/trenazher/sudoku-igra', category: 'Тренажёр' },
  { title: 'Собери слово', url: '/trenazher/sobery-slovo', category: 'Тренажёр' },
  { title: 'Математическая лесенка', url: '/trenazher/matematicheskaya-lesenka', category: 'Тренажёр' },
  { title: 'Змейка с числами', url: '/trenazher/zmeyka-s-chislami', category: 'Тренажёр' },
  { title: 'Морской бой', url: '/trenazher/morskoy-boy', category: 'Тренажёр' },
  { title: 'Угадай число', url: '/trenazher/ugaday-chislo', category: 'Тренажёр' },
  { title: 'Английский алфавит (игра)', url: '/trenazher/azbuky', category: 'Тренажёр' },
  { title: 'Числа по-английски 1–20', url: '/trenazher/numbers', category: 'Тренажёр' },
  { title: 'Цвета по-английски', url: '/trenazher/colors', category: 'Тренажёр' },
  { title: 'Умножение (игра)', url: '/trenazher/tablitsa-umnozheniya', category: 'Тренажёр' },
  { title: 'Английские слова по темам', url: '/trenazher/english-words', category: 'Тренажёр' },
  { title: 'Неправильные глаголы', url: '/trenazher/irregular-verbs', category: 'Тренажёр' },
  { title: 'Поговорки и пословицы', url: '/trenazher/pogovorki', category: 'Тренажёр' },
  { title: 'Разбор слова по составу (тренажёр)', url: '/trenazher/razbor-sostav-3klass', category: 'Тренажёр' },
  { title: 'Формы и цвета', url: '/trenazher/shapes-colors', category: 'Тренажёр' },
  { title: 'Приставки', url: '/trenazher/pristavki', category: 'Тренажёр' },
  { title: 'Проза — читай и понимай (тренажёр)', url: '/trenazher/proza-1klass', category: 'Тренажёр' },
  { title: 'Анализ текста — тема и главная мысль (тренажёр)', url: '/trenazher/analiz-teksta-4klass', category: 'Тренажёр' },
  { title: 'Английский алфавит', url: '/trenazher/angliyskiy-alfavit', category: 'Тренажёр' },
  { title: 'Счёт по-английски', url: '/trenazher/angliyskiy-schet', category: 'Тренажёр' },
  { title: 'Таблица умножения', url: '/trenazher/tablitsa-umnozheniya', category: 'Тренажёр' },
  { title: 'Словарные слова (тренажёр)', url: '/trenazher/slovarnye-slova', category: 'Тренажёр' },
  { title: 'Найди лишнее', url: '/trenazher/naydi-lishnee', category: 'Тренажёр' },
  { title: 'Комбинаторика (3 класс, тренажёр)', url: '/trenazher/kombinatorika-3klass', category: 'Тренажёр' },
  { title: 'Сравнение предметов (тренажёр)', url: '/trenazher/sravnenie-predmetov', category: 'Тренажёр' },
  { title: 'Ориентация в пространстве (тренажёр)', url: '/trenazher/orientaciya-v-prostranstve', category: 'Тренажёр' },
  { title: 'Загадки для малышей 4–5 лет (тренажёр)', url: '/trenazher/zagadki-4-5let', category: 'Тренажёр' },
  { title: 'Загадки для 1 класса (тренажёр)', url: '/trenazher/zagadki-1klass', category: 'Тренажёр' },
  { title: 'Правила безопасности (тренажёр)', url: '/trenazher/bezopasnost-1klass', category: 'Тренажёр' },
  { title: 'Аналогии для 1 класса (тренажёр)', url: '/trenazher/analogii-1klass', category: 'Тренажёр' },
  { title: 'Логические задачи (2 класс, тренажёр)', url: '/trenazher/logicheskie-zadachi-2klass', category: 'Тренажёр' },
  { title: 'Логические задачи с таблицами (4 класс, тренажёр)', url: '/trenazher/logicheskie-tablitsy-4klass', category: 'Тренажёр' },
  { title: 'Загадки для 2 класса (тренажёр)', url: '/trenazher/zagadki-2klass', category: 'Тренажёр' },
  { title: 'Ребусы для 2 класса (тренажёр)', url: '/trenazher/rebusy-2klass', category: 'Тренажёр' },
  { title: 'Задачи на взвешивание (3 класс, тренажёр)', url: '/trenazher/vzveshivanie-3klass', category: 'Тренажёр' },
  { title: 'Задачи на переливание (4 класс, тренажёр)', url: '/trenazher/perelivanie-4klass', category: 'Тренажёр' },
  { title: 'Загадки для дошкольников 6–7 лет (тренажёр)', url: '/trenazher/zagadki-6-7let', category: 'Тренажёр' },
  { title: 'Чтение по слогам для дошкольников 6–7 лет (тренажёр)', url: '/trenazher/chtenie-6-7let', category: 'Тренажёр' },
  { title: 'Вычитание 5-10', url: '/trenazher/vychitanie-5-10', category: 'Тренажёр' },
  { title: 'Найди пару', url: '/trenazher/naydi-paru', category: 'Тренажёр' },
  { title: 'Что изменилось?', url: '/trenazher/chto-izmenilos', category: 'Тренажёр' },
  { title: 'Собери по порядку', url: '/trenazher/sobery-po-poryadku', category: 'Тренажёр' },
  { title: 'Пересказ по картинкам (4–5 лет, тренажёр)', url: '/trenazher/pereskaz-4-5let', category: 'Тренажёр' },
  { title: 'Пересказ по картинкам (6–7 лет, тренажёр)', url: '/trenazher/pereskaz-6-7let', category: 'Тренажёр' },
  { title: 'Цвета на английском', url: '/trenazher/english-colors', category: 'Тренажёр' },
  { title: 'Формы на английском', url: '/trenazher/english-shapes', category: 'Тренажёр' },
  { title: 'Сравнение чисел', url: '/trenazher/sravnenie', category: 'Тренажёр' },
  { title: 'Деление', url: '/trenazher/delenie', category: 'Тренажёр' },
  { title: 'Деление с остатком (тренажёр)', url: '/trenazher/delenie-s-ostatkom', category: 'Тренажёр' },
  { title: 'Порядок действий (тренажёр)', url: '/trenazher/poryadok-deystviy', category: 'Тренажёр' },
  { title: 'Сложные примеры 3 класс (тренажёр)', url: '/trenazher/slozhnie-primery-3klass', category: 'Тренажёр' },
  { title: 'Русский алфавит', url: '/trenazher/russkiy-alfavit', category: 'Тренажёр' },
  { title: 'Виды предложений по цели высказывания', url: '/trenazher/predlozhenie-2klass', category: 'Тренажёр' },
  { title: 'Гласная или согласная?', url: '/trenazher/glasnye-soglasnye', category: 'Тренажёр' },
  { title: 'Счёт до 10', url: '/trenazher/schet-do-10', category: 'Тренажёр' },
  { title: 'Счёт до 20', url: '/trenazher/schet-do-20-ru', category: 'Тренажёр' },
  { title: 'Счёт до 5', url: '/trenazher/schet-do-5', category: 'Тренажёр' },
  { title: 'Состав числа (тренажёр)', url: '/trenazher/sostav-chisla', category: 'Тренажёр' },
  { title: 'Двузначные числа', url: '/trenazher/dvuznachnye', category: 'Тренажёр' },
  { title: 'Трёхзначные числа (тренажёр)', url: '/trenazher/trekhznachnye', category: 'Тренажёр' },
  { title: 'Большие числа (тренажёр)', url: '/trenazher/velikie-chisla', category: 'Тренажёр' },
  { title: 'Единицы измерения (тренажёр)', url: '/trenazher/edinitsy-izmereniya-4klass', category: 'Тренажёр' },
  { title: 'Задачи для 1 класса', url: '/trenazher/zadachi-1klass', category: 'Тренажёр' },
  { title: 'Части речи (тренажёр)', url: '/trenazher/chasti-rechi', category: 'Тренажёр' },
  { title: 'Знаки препинания (тренажёр)', url: '/trenazher/punktuaciya-1klass', category: 'Тренажёр' },
  { title: 'Спряжение глаголов (тренажёр)', url: '/trenazher/spryazhenie-3klass', category: 'Тренажёр' },
  { title: 'Сложные предложения (тренажёр)', url: '/trenazher/slozhnie-predlozheniya-3klass', category: 'Тренажёр' },
  { title: 'Стили речи (тренажёр)', url: '/trenazher/stili-rechi-4klass', category: 'Тренажёр' },
  { title: 'Склонение существительных (тренажёр)', url: '/trenazher/sklonenie-4klass', category: 'Тренажёр' },
  { title: 'Члены предложения (тренажёр)', url: '/trenazher/sintaksis-4klass', category: 'Тренажёр' },
  { title: 'Безударные гласные (тренажёр)', url: '/trenazher/bezudarnye-glasnye', category: 'Тренажёр' },
  { title: 'Домашние и дикие животные (тренажёр)', url: '/trenazher/domashnie-dikie', category: 'Тренажёр' },
  { title: 'Назови одним словом (тренажёр)', url: '/trenazher/slova-obobshchenie-4-5let', category: 'Тренажёр' },
  { title: 'Звуки — с какого звука начинается слово? (тренажёр)', url: '/trenazher/zvuki-4-5let', category: 'Тренажёр' },
  { title: 'Слоги — сколько слогов в слове? (тренажёр)', url: '/trenazher/slogi-4-5let', category: 'Тренажёр' },
  { title: 'Живая и неживая природа (тренажёр)', url: '/trenazher/priroda-zhivaya-nezhivaya-2klass', category: 'Тренажёр' },
  { title: 'Живое и неживое, 1 класс (тренажёр)', url: '/trenazher/priroda-1klass', category: 'Тренажёр' },
  { title: 'Времена года (тренажёр)', url: '/trenazher/vremena-goda', category: 'Тренажёр' },
  { title: 'Природные явления (тренажёр)', url: '/trenazher/prirodnye-yavleniya-6-7let', category: 'Тренажёр' },
  { title: 'Доли и дроби (тренажёр)', url: '/trenazher/doli', category: 'Тренажёр' },
  { title: 'Площадь и периметр 3 класс (тренажёр)', url: '/trenazher/ploshchad-perimetr-3klass', category: 'Тренажёр' },
  { title: 'Периметр 2 класс (тренажёр)', url: '/trenazher/perimetr-2klass', category: 'Тренажёр' },
  { title: 'Уравнения 3 класс (тренажёр)', url: '/trenazher/uravneniya-3klass', category: 'Тренажёр' },
  { title: 'Внетабличное умножение и деление (3 класс, тренажёр)', url: '/trenazher/vnetablichnoe-umnozhenie-3klass', category: 'Тренажёр' },
  { title: 'Ударение в слове (тренажёр)', url: '/trenazher/udarenie', category: 'Тренажёр' },
  { title: 'Жи-ши, ча-ща, чу-щу (тренажёр)', url: '/trenazher/zhi-shi-cha-scha', category: 'Тренажёр' },
  { title: 'Время (тренажёр)', url: '/trenazher/vremya', category: 'Тренажёр' },
  { title: 'Тело человека (тренажёр)', url: '/trenazher/telo-cheloveka', category: 'Тренажёр' },
  { title: 'Органы чувств и организм (тренажёр)', url: '/trenazher/chelovek-organy-chuvstv', category: 'Тренажёр' },
  { title: 'Геометрия 4 класс (тренажёр)', url: '/trenazher/geometriya-4klass', category: 'Тренажёр' },
  { title: 'Задачи на движение (4 класс, тренажёр)', url: '/trenazher/skorost-vremya-rasstoyanie-4klass', category: 'Тренажёр' },
  { title: 'Десятичные дроби (4 класс, тренажёр)', url: '/trenazher/desyatichnie-drobi-4klass', category: 'Тренажёр' },
  { title: 'Умножение и деление столбиком (4 класс, тренажёр)', url: '/trenazher/umnozhenie-delenie-stolbikom-4klass', category: 'Тренажёр' },
  { title: 'Грамматика английского (3 класс, тренажёр)', url: '/trenazher/grammatika-3klass-english', category: 'Тренажёр' },
  { title: 'Стихи: подбери рифму (1 класс, тренажёр)', url: '/trenazher/stihi-1klass', category: 'Тренажёр' },
  { title: 'Корень слова (2 класс, тренажёр)', url: '/trenazher/koren-slova-2klass', category: 'Тренажёр' },
  { title: 'Синонимы и антонимы (2 класс, тренажёр)', url: '/trenazher/sinonimy-antonimy-2klass', category: 'Тренажёр' },
  { title: 'Классика — угадай автора (4 класс, тренажёр)', url: '/trenazher/klassika-4klass', category: 'Тренажёр' },
  { title: 'Диалоги, 6–7 лет (тренажёр)', url: '/trenazher/dialogi-6-7let', category: 'Тренажёр' },
  { title: 'Рассказы — чем закончилась история (6–7 лет, тренажёр)', url: '/trenazher/rasskazy-6-7let', category: 'Тренажёр' },
  { title: 'Скорочтение (тренажёр)', url: '/trenazher/skorochtenie', category: 'Тренажёр' },
  { title: 'Животные на английском', url: '/trenazher/english-animals', category: 'Тренажёр' },
  { title: 'Еда на английском', url: '/trenazher/english-food', category: 'Тренажёр' },
  { title: 'Семья на английском', url: '/trenazher/english-family', category: 'Тренажёр' },
  { title: 'Одежда на английском', url: '/trenazher/english-clothes', category: 'Тренажёр' },
  { title: 'Погода на английском', url: '/trenazher/english-weather', category: 'Тренажёр' },
  { title: 'Школьные принадлежности на английском', url: '/trenazher/english-school', category: 'Тренажёр' },
]);

const GENERATOR_ENTRIES: SearchEntry[] = withType('Генератор', [
  { title: 'Генератор примеров', url: '/generator/primery', category: 'Генератор' },
  { title: 'Прописи (английский)', url: '/generator/propisi-angliyskiy', category: 'Генератор' },
  { title: 'Прописи (русский)', url: '/generator/propisi-ru', category: 'Генератор' },
  { title: 'Генератор кроссвордов', url: '/generator/krossvordy', category: 'Генератор' },
  { title: 'Примеры в столбик', url: '/generator/primery', category: 'Генератор' },
  { title: 'Генератор филвордов', url: '/generator/filvordy', category: 'Генератор' },
  { title: 'Генератор анаграмм', url: '/generator/anagrammy', category: 'Генератор' },
  { title: 'Генератор диктантов', url: '/generator/diktanty', category: 'Генератор' },
  { title: 'Словарные слова', url: '/generator/slovarnye-slova', category: 'Генератор' },
  { title: 'Генератор задач', url: '/generator/zadachi', category: 'Генератор' },
  { title: 'Состав числа (генератор)', url: '/generator/sostav-chisla', category: 'Генератор' },
  { title: 'Счёт предметов (генератор)', url: '/generator/schet-predmetov', category: 'Генератор' },
  { title: 'Найди и посчитай (генератор)', url: '/generator/naydi-i-poschitay', category: 'Генератор' },
  { title: 'Графический диктант (генератор)', url: '/generator/graficheskiy-diktant', category: 'Генератор' },
  { title: 'Математическая раскраска (генератор)', url: '/generator/matematicheskaya-raskraska', category: 'Генератор' },
  { title: 'Который час? (генератор)', url: '/generator/kotoryy-chas', category: 'Генератор' },
  { title: 'Лабиринты (генератор)', url: '/generator/labirinty', category: 'Генератор' },
  { title: 'Судоку для детей (генератор)', url: '/generator/sudoku', category: 'Генератор' },
  { title: 'Расписание уроков', url: '/generator/raspisanie-urokov', category: 'Генератор' },
  { title: 'Флеш-карточки (генератор)', url: '/generator/fleshkarty', category: 'Генератор' },
  { title: 'Списывание (генератор)', url: '/generator/spisyvanie', category: 'Генератор' },
  { title: 'Числовая пирамида (генератор)', url: '/generator/chislovaya-piramida', category: 'Генератор' },
]);

const VPR_ENTRIES: SearchEntry[] = withType('ВПР', [
  { title: 'Подготовка к ВПР — Математика', url: '/vpr/3-klass/matematika', category: 'ВПР · 3 класс' },
  { title: 'Подготовка к ВПР — Русский язык', url: '/vpr/3-klass/russkiy', category: 'ВПР · 3 класс' },
  { title: 'Подготовка к ВПР — Окружающий мир', url: '/vpr/3-klass/okruzhayushchiy-mir', category: 'ВПР · 3 класс' },
  { title: 'Подготовка к ВПР — Английский язык', url: '/vpr/3-klass/angliyskiy', category: 'ВПР · 3 класс' },
  { title: 'Подготовка к ВПР — Математика', url: '/vpr/4-klass/matematika', category: 'ВПР · 4 класс' },
  { title: 'Подготовка к ВПР — Русский язык', url: '/vpr/4-klass/russkiy', category: 'ВПР · 4 класс' },
  { title: 'Подготовка к ВПР — Окружающий мир', url: '/vpr/4-klass/okruzhayushchiy-mir', category: 'ВПР · 4 класс' },
  { title: 'Подготовка к ВПР — Английский язык', url: '/vpr/4-klass/angliyskiy', category: 'ВПР · 4 класс' },
]);

const MCKO_ENTRIES: SearchEntry[] = withType('МЦКО', [
  { title: 'МЦКО 2026 — Математика, 5 класс: 20 вариантов', url: '/podgotovka-k-mcko/5-klass/matematika', category: 'МЦКО · 5 класс' },
  { title: 'МЦКО 2026 — Русский язык, 5 класс: 20 вариантов', url: '/podgotovka-k-mcko/5-klass/russkiy', category: 'МЦКО · 5 класс' },
  { title: 'Подготовка к МЦКО — Математика', url: '/podgotovka-k-mcko/4-klass/matematika', category: 'МЦКО · 4 класс' },
  { title: 'Подготовка к МЦКО — Русский язык', url: '/podgotovka-k-mcko/4-klass/russkiy', category: 'МЦКО · 4 класс' },
  { title: 'Подготовка к МЦКО — Английский язык', url: '/podgotovka-k-mcko/4-klass/angliyskiy', category: 'МЦКО · 4 класс' },
]);

const PLAKATY_ENTRIES: SearchEntry[] = withType('Плакат', [
  { title: 'Плакат: Математика · 2 класс', url: '/plakaty?klass=2', category: 'Плакаты · 2 класс' },
  { title: 'Плакат: Русский язык · 2 класс', url: '/plakaty?klass=2', category: 'Плакаты · 2 класс' },
  { title: 'Плакат: English · 2 класс', url: '/plakaty?klass=2', category: 'Плакаты · 2 класс' },
  { title: 'Плакат: Окружающий мир · 2 класс', url: '/plakaty?klass=2', category: 'Плакаты · 2 класс' },
  { title: 'Плакат: Математика · 3 класс', url: '/plakaty?klass=3', category: 'Плакаты · 3 класс' },
  { title: 'Плакат: Русский язык · 3 класс', url: '/plakaty?klass=3', category: 'Плакаты · 3 класс' },
  { title: 'Плакат: English · 3 класс', url: '/plakaty?klass=3', category: 'Плакаты · 3 класс' },
  { title: 'Плакат: Окружающий мир · 3 класс', url: '/plakaty?klass=3', category: 'Плакаты · 3 класс' },
  { title: 'Плакат: Математика · 4 класс', url: '/plakaty?klass=4', category: 'Плакаты · 4 класс' },
  { title: 'Плакат: Русский язык · 4 класс', url: '/plakaty?klass=4', category: 'Плакаты · 4 класс' },
  { title: 'Плакат: Пословицы и поговорки', url: '/plakaty', category: 'Плакаты' },
  { title: 'Плакат: Present Simple', url: '/plakaty', category: 'Плакаты · Английский' },
  { title: 'Плакат: Present Continuous', url: '/plakaty', category: 'Плакаты · Английский' },
  { title: 'Плакат: Past Simple', url: '/plakaty', category: 'Плакаты · Английский' },
  { title: 'Плакат: Past Continuous', url: '/plakaty', category: 'Плакаты · Английский' },
]);

const STATIC_ENTRIES: SearchEntry[] = withType('Раздел', [
  { title: 'Главная страница', url: '/', category: 'Раздел' },
  { title: 'Все генераторы', url: '/generator', category: 'Раздел' },
  { title: 'Все тренажёры', url: '/trenazher', category: 'Раздел' },
  { title: 'Английский язык', url: '/#english', category: 'Раздел' },
  { title: 'Учеба', url: '/#ucheba', category: 'Раздел' },
  { title: 'Игры', url: '/igry', category: 'Раздел' },
  { title: 'Подготовка к ВПР', url: '/vpr', category: 'Раздел' },
  { title: 'Подготовка к МЦКО', url: '/podgotovka-k-mcko', category: 'Раздел' },
  { title: 'Готов ли ребёнок к школе?', url: '/gotovnost', category: 'Раздел' },
  { title: 'Тест готовности к 1 классу', url: '/gotovnost-k-shkole', category: 'Тест' },
  { title: 'Тест готовности ко 2 классу', url: '/gotovnost-k-2-klassu', category: 'Тест' },
  { title: 'Тест готовности к 3 классу', url: '/gotovnost-k-3-klassu', category: 'Тест' },
  { title: 'Тест готовности к 4 классу', url: '/gotovnost-k-4-klassu', category: 'Тест' },
  { title: 'Тест готовности к 5 классу', url: '/gotovnost-k-5-klassu', category: 'Тест' },
  { title: 'Какой вы родитель — тест', url: '/kakoy-ty-roditel', category: 'Тест' },
  { title: 'Для родителей', url: '/dlya-roditeley', category: 'Раздел' },
  { title: 'Плакаты', url: '/plakaty', category: 'Раздел' },
  { title: 'PDF-сборники', url: '/sborniki', category: 'Раздел' },
  { title: 'Турнир Знаторики', url: '/turnir', category: 'Раздел' },
  { title: 'Сборник для подготовки к 1 классу', url: '/sborniki/podgotovka-k-1-klassu', category: 'Сборник' },
  { title: 'Подписка', url: '/podpiska', category: 'Раздел' },
  { title: 'Памятки для родителей первоклассников', url: '/pamyatki', category: 'Раздел' },
  { title: 'Готов ли ребёнок к 1 классу: чек-лист', url: '/pamyatki', category: 'Памятка' },
  { title: 'Что купить первокласснику к школе', url: '/pamyatki', category: 'Памятка' },
  { title: 'Режим дня первоклассника', url: '/pamyatki', category: 'Памятка' },
  { title: 'Адаптация первоклассника к школе', url: '/pamyatki', category: 'Памятка' },
  { title: 'Безопасность первоклассника по дороге в школу', url: '/pamyatki', category: 'Памятка' },
  { title: 'Как помочь первокласснику с домашним заданием', url: '/pamyatki', category: 'Памятка' },
]);

export const SEARCH_INDEX: SearchEntry[] = [
  ...STATIC_ENTRIES,
  ...SEGMENT_ENTRIES,
  ...TOPIC_ENTRIES,
  ...TRAINER_ENTRIES,
  ...GENERATOR_ENTRIES,
  ...VPR_ENTRIES,
  ...MCKO_ENTRIES,
  ...PLAKATY_ENTRIES,
];

// ── Поиск с устойчивостью к опечаткам/неточному вводу ──────────────────
//
// Правила ранжирования (без внешних библиотек — объём индекса небольшой):
// 1. Точное вхождение всей фразы в заголовок — наивысший балл.
// 2. Точное вхождение фразы в категорию — балл поменьше.
// 3. Иначе — по словам запроса: сколько слов запроса нашлось как подстрока
//    в заголовке/категории (не требуем точного порядка и полного вхождения).

export function normalizeSearchText(s: string): string {
  return s.toLowerCase().replace(/ё/g, 'е').trim();
}

/**
 * Считает балл соответствия текста запросу. `query` должен быть уже
 * нормализован через `normalizeSearchText`. `weight` позволяет учитывать
 * менее значимые поля (например, описание) с меньшим весом.
 */
export function scoreTextAgainstQuery(query: string, text: string, weight = 1): number {
  const t = normalizeSearchText(text);
  if (!t || !query) return 0;

  if (t.includes(query)) return Math.round(100 * weight);

  const words = query.split(/\s+/).filter((w) => w.length >= 2);
  if (words.length === 0) return 0;

  const matched = words.filter((w) => t.includes(w)).length;
  if (matched === 0) return 0;

  return Math.round(((60 * matched) / words.length) * weight);
}

function scoreEntry(entry: SearchEntry, query: string): number {
  return Math.max(
    scoreTextAgainstQuery(query, entry.title),
    scoreTextAgainstQuery(query, entry.category, 0.5)
  );
}

export interface ScoredSearchEntry extends SearchEntry {
  score: number;
}

/** Поиск по статичному индексу (тренажёры/генераторы/темы/ВПР/плакаты/разделы). */
export function searchStaticIndex(query: string, limit = 40): ScoredSearchEntry[] {
  const q = normalizeSearchText(query);
  if (q.length < 2) return [];

  return SEARCH_INDEX.map((entry) => ({ ...entry, score: scoreEntry(entry, q) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * Совместимость с прежним API: чисто клиентский/статичный поиск (без статей
 * и CMS-тем из БД). Используется там, где нет доступа к БД — основной поиск
 * сайта идёт через `lib/search-service.ts` (`/api/search`, `/search`).
 */
export function searchSite(query: string, limit = 8): SearchEntry[] {
  return searchStaticIndex(query, limit).map(({ score: _score, ...rest }) => rest);
}
