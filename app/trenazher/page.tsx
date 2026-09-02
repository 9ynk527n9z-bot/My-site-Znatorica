import Link from 'next/link';
import TrainerQuotaBanner from '@/components/TrainerQuotaBanner';

export const metadata = {
  title: 'Все тренажёры',
  description: 'Интерактивные тренажёры для детей 4-11 лет: азбука, числа, цвета, умножение и другие.',
  alternates: { canonical: '/trenazher' },
};

interface Trainer {
  id: string;
  name: string;
  description: string;
  icon: string;
  url: string;
}

interface Category {
  title: string;
  emoji: string;
  trainers: Trainer[];
}

const CATEGORIES: Category[] = [
  {
    title: 'Игры',
    emoji: '🎮',
    trainers: [
      { id: 'krestiki-noliki', name: 'Крестики-нолики', description: 'Классическая игра против компьютера — три в ряд быстрее соперника', icon: '🎯', url: '/krestiki-noliki' },
      { id: 'ugaday-slovo', name: 'Угадай слово', description: 'Отгадай загаданное слово по буквам, пока не кончились жизни', icon: '🔤', url: '/ugaday-slovo' },
      { id: 'pyatnashki', name: 'Пятнашки', description: 'Собери числа по порядку, двигая плитки по одной', icon: '🔢', url: '/pyatnashki' },
      { id: 'slova-iz-slova', name: 'Слова из слова', description: 'Найди маленькие слова, спрятанные в одном большом слове', icon: '🧠', url: '/slova-iz-slova' },
      { id: 'sudoku-igra', name: 'Судоку', description: 'Заполни сетку числами так, чтобы они не повторялись в строке, столбце и квадрате', icon: '🔲', url: '/sudoku-igra' },
      { id: 'sobery-slovo', name: 'Собери слово', description: 'Расставь перепутанные буквы в правильном порядке', icon: '🔡', url: '/sobery-slovo' },
      { id: 'matematicheskaya-lesenka', name: 'Математическая лесенка', description: 'Поднимайся по лесенке примеров — чем выше, тем сложнее', icon: '🪜', url: '/matematicheskaya-lesenka' },
      { id: 'zmeyka-s-chislami', name: 'Змейка с числами', description: 'Веди змейку и собирай числа по порядку от 1 и дальше', icon: '🐍', url: '/zmeyka-s-chislami' },
      { id: 'morskoy-boy', name: 'Морской бой', description: 'Найди и потопи все корабли компьютера по координатам', icon: '🚢', url: '/morskoy-boy' },
      { id: 'ugaday-chislo', name: 'Угадай число', description: 'Отгадай число за минимум попыток с подсказками «больше/меньше»', icon: '🎲', url: '/ugaday-chislo' },
    ],
  },
  {
    title: 'Русский язык',
    emoji: '📖',
    trainers: [
      {
        id: 'slova-obobshchenie-4-5let',
        name: 'Назови одним словом',
        description: 'Фрукты, овощи, животные, мебель — обобщающие слова для 4-5 лет',
        icon: '🍎',
        url: '/slova-obobshchenie-4-5let',
      },
      {
        id: 'zvuki-4-5let',
        name: 'Звуки — с какого звука начинается слово?',
        description: 'Слово, картинка и озвучка — выбери верную букву первого звука для 4-5 лет',
        icon: '🔊',
        url: '/zvuki-4-5let',
      },
      {
        id: 'slogi-4-5let',
        name: 'Слоги — сколько слогов в слове?',
        description: 'Слово, картинка и озвучка — сосчитай слоги для детей 4-5 лет',
        icon: '🧩',
        url: '/slogi-4-5let',
      },
      { id: 'pristavki', name: 'Приставки', description: 'Приставки русского языка', icon: '📝', url: '/pristavki' },
      {
        id: 'chtenie-6-7let',
        name: 'Чтение по слогам (6–7 лет)',
        description: 'Слово по слогам с озвучкой — выбери подходящую картинку из четырёх',
        icon: '📖',
        url: '/chtenie-6-7let',
      },
      {
        id: 'proza-1klass',
        name: 'Проза — читай и понимай',
        description: 'Короткие рассказы и вопросы на понимание прочитанного — 1 класс',
        icon: '📖',
        url: '/proza-1klass',
      },
      {
        id: 'punktuaciya-1klass',
        name: 'Знаки препинания',
        description: 'Точка, вопросительный или восклицательный знак — выбери верно',
        icon: '❓',
        url: '/punktuaciya-1klass',
      },
      {
        id: 'chasti-rechi',
        name: 'Части речи',
        description: 'Существительное, прилагательное или глагол — выбери верно',
        icon: '🔤',
        url: '/chasti-rechi',
      },
      {
        id: 'slovarnye-slova',
        name: 'Словарные слова',
        description: 'Вставь букву по классам: тренировка и режим на время',
        icon: '📖',
        url: '/slovarnye-slova',
      },
      { id: 'pogovorki', name: 'Поговорки', description: 'Русские пословицы и поговорки', icon: '💬', url: '/pogovorki' },
      {
        id: 'razbor-sostav-3klass',
        name: 'Разбор слова по составу',
        description: 'Найди приставку, корень, суффикс и окончание — 3 класс',
        icon: '🧩',
        url: '/razbor-sostav-3klass',
      },
      {
        id: 'bezudarnye-glasnye',
        name: 'Безударные гласные',
        description: 'Вставь пропущенную букву и проверь ударением',
        icon: '✏️',
        url: '/bezudarnye-glasnye',
      },
      {
        id: 'glasnye-soglasnye',
        name: 'Гласные и согласные',
        description: 'Огромная буква с озвучкой — выбери, гласная она или согласная',
        icon: '🔤',
        url: '/glasnye-soglasnye',
      },
      {
        id: 'russkiy-alfavit',
        name: 'Русский алфавит',
        description: 'Буква, слово-пример и озвучка, плюс мини-игра «Угадай букву»',
        icon: '🔤',
        url: '/russkiy-alfavit',
      },
      {
        id: 'udarenie',
        name: 'Ударение в слове',
        description: 'Слово крупно с озвучкой — нажми на гласную, куда падает ударение',
        icon: '🔤',
        url: '/udarenie',
      },
      {
        id: 'zhi-shi-cha-scha',
        name: 'Жи-ши, ча-ща, чу-щу',
        description: 'Вставь пропущенную букву — главное орфографическое правило 1 класса',
        icon: '📝',
        url: '/zhi-shi-cha-scha',
      },
      {
        id: 'spryazhenie-3klass',
        name: 'Спряжение глаголов',
        description: 'Глагол в неопределённой форме — выбери I или II спряжение',
        icon: '🔤',
        url: '/spryazhenie-3klass',
      },
      {
        id: 'slozhnie-predlozheniya-3klass',
        name: 'Сложные предложения',
        description: 'Простое или сложное предложение — определи по грамматическим основам',
        icon: '🧩',
        url: '/slozhnie-predlozheniya-3klass',
      },
      {
        id: 'stili-rechi-4klass',
        name: 'Стили речи',
        description: 'Разговорный, художественный или деловой — определи стиль отрывка',
        icon: '📝',
        url: '/stili-rechi-4klass',
      },
      {
        id: 'sklonenie-4klass',
        name: 'Склонение существительных',
        description: 'Существительное в начальной форме — выбери 1, 2 или 3 склонение',
        icon: '🔤',
        url: '/sklonenie-4klass',
      },
      {
        id: 'sintaksis-4klass',
        name: 'Члены предложения',
        description: 'Определи, каким членом предложения является выделенное слово — 4 класс',
        icon: '🧩',
        url: '/sintaksis-4klass',
      },
      {
        id: 'stihi-1klass',
        name: 'Стихи: подбери рифму',
        description: 'Строчка известного стихотворения — выбери рифмующееся слово из четырёх',
        icon: '📖',
        url: '/stihi-1klass',
      },
      {
        id: 'predlozhenie-2klass',
        name: 'Виды предложений',
        description: 'Повествовательное, вопросительное или побудительное — определи цель высказывания',
        icon: '💬',
        url: '/predlozhenie-2klass',
      },
      {
        id: 'koren-slova-2klass',
        name: 'Корень слова',
        description: 'Четыре слова — найди лишнее, не однокоренное — 2 класс',
        icon: '🌳',
        url: '/koren-slova-2klass',
      },
      {
        id: 'sinonimy-antonimy-2klass',
        name: 'Синонимы и антонимы',
        description: 'Слово и вопрос — найди синоним или антоним из четырёх вариантов — 2 класс',
        icon: '🔀',
        url: '/sinonimy-antonimy-2klass',
      },
      {
        id: 'analiz-teksta-4klass',
        name: 'Анализ текста — тема и главная мысль',
        description: 'Прочитай текст и определи его тему или главную мысль — 4 класс',
        icon: '📚',
        url: '/analiz-teksta-4klass',
      },
      {
        id: 'klassika-4klass',
        name: 'Классика — угадай автора',
        description: 'Пушкин, Толстой или Крылов — кто написал это произведение — 4 класс',
        icon: '📚',
        url: '/klassika-4klass',
      },
      {
        id: 'skorochtenie',
        name: 'Скорочтение',
        description: 'Прочитай текст на время и узнай свою скорость чтения — 1-4 класс',
        icon: '⏱️',
        url: '/skorochtenie',
      },
    ],
  },
  {
    title: 'Математика',
    emoji: '🔢',
    trainers: [
      {
        id: 'schet-do-5',
        name: 'Счёт до 5',
        description: 'Числа с картинками и озвучкой, плюс мини-игра «Сосчитай и выбери»',
        icon: '🔢',
        url: '/schet-do-5',
      },
      {
        id: 'schet-do-10',
        name: 'Счёт до 10',
        description: 'Числа с картинками и озвучкой, плюс мини-игра «Сосчитай и выбери»',
        icon: '🔢',
        url: '/schet-do-10',
      },
      {
        id: 'schet-do-20-ru',
        name: 'Счёт до 20',
        description: 'Числа от 1 до 20 с картинками и озвучкой, плюс мини-игра «Сосчитай и выбери»',
        icon: '🔢',
        url: '/schet-do-20-ru',
      },
      {
        id: 'sravnenie',
        name: 'Сравнение чисел',
        description: 'Больше, меньше или равно — выбери правильный знак',
        icon: '⚖️',
        url: '/sravnenie',
      },
      {
        id: 'tablitsa-umnozheniya',
        name: 'Таблица умножения',
        description: '4 режима: таблица, тренировка, на время, найди множитель',
        icon: '✖️',
        url: '/tablitsa-umnozheniya',
      },
      {
        id: 'slozhenie-5-10',
        name: 'Сложение 5-10',
        description: 'Устный счёт: сложи числа в пределах 10, выбери верный ответ',
        icon: '➕',
        url: '/slozhenie-5-10',
      },
      {
        id: 'vychitanie-5-10',
        name: 'Вычитание 5-10',
        description: 'Устный счёт: примеры на вычитание в пределах 10',
        icon: '➖',
        url: '/vychitanie-5-10',
      },
      {
        id: 'slozhenie-do-20',
        name: 'Сложение и вычитание до 20',
        description: 'Приём «через десяток»: 8+5, 13-5 и другие примеры с переходом через десяток',
        icon: '🔟',
        url: '/slozhenie-do-20',
      },
      {
        id: 'sostav-chisla',
        name: 'Состав числа',
        description: 'Домики: найди недостающее слагаемое числа от 5 до 10',
        icon: '🏠',
        url: '/sostav-chisla',
      },
      {
        id: 'delenie',
        name: 'Деление',
        description: 'Устный счёт: примеры на деление без остатка, выбери верный ответ',
        icon: '➗',
        url: '/delenie',
      },
      {
        id: 'delenie-s-ostatkom',
        name: 'Деление с остатком',
        description: 'Примеры вида «17 : 5 = ? (ост. ?)» — выбери верный ответ из четырёх',
        icon: '➗',
        url: '/delenie-s-ostatkom',
      },
      {
        id: 'dvuznachnye',
        name: 'Двузначные числа',
        description: 'Сколько десятков и сколько единиц в числе — выбери верный ответ',
        icon: '🔢',
        url: '/dvuznachnye',
      },
      {
        id: 'zadachi-1klass',
        name: 'Задачи для 1 класса',
        description: 'Простые текстовые задачи на сложение и вычитание в пределах 10',
        icon: '📖',
        url: '/zadachi-1klass',
      },
      {
        id: 'trekhznachnye',
        name: 'Трёхзначные числа',
        description: 'Сколько сотен, десятков и единиц в числе — выбери верный ответ',
        icon: '🔢',
        url: '/trekhznachnye',
      },
      {
        id: 'velikie-chisla',
        name: 'Большие числа',
        description: 'Сколько тысяч в числе и сколько единиц в классе единиц — выбери верный ответ',
        icon: '🔢',
        url: '/velikie-chisla',
      },
      {
        id: 'edinitsy-izmereniya-4klass',
        name: 'Единицы измерения',
        description: 'Переводи длину, массу и время: км↔м↔дм↔см, кг↔г, ч↔мин↔с',
        icon: '📏',
        url: '/edinitsy-izmereniya-4klass',
      },
      {
        id: 'vremya',
        name: 'Время',
        description: 'Циферблат крупно: сколько времени показывают часы (целые часы)',
        icon: '🕒',
        url: '/vremya',
      },
      {
        id: 'doli',
        name: 'Доли и дроби',
        description: 'Какая доля закрашена — выбери верную дробь из четырёх',
        icon: '🍕',
        url: '/doli',
      },
      {
        id: 'uravneniya-3klass',
        name: 'Уравнения (3 класс)',
        description: 'Найди неизвестное x в простых уравнениях на сложение, вычитание, умножение и деление',
        icon: '🟰',
        url: '/uravneniya-3klass',
      },
      {
        id: 'ploshchad-perimetr-3klass',
        name: 'Площадь и периметр (3 класс)',
        description: 'Периметр и площадь прямоугольника и квадрата — числа поменьше, вопросы чередуются',
        icon: '📐',
        url: '/ploshchad-perimetr-3klass',
      },
      {
        id: 'perimetr-2klass',
        name: 'Периметр (2 класс)',
        description: 'Найди периметр прямоугольника или квадрата — сложи длины сторон',
        icon: '📐',
        url: '/perimetr-2klass',
      },
      {
        id: 'geometriya-4klass',
        name: 'Геометрия (4 класс)',
        description: 'Периметр и площадь прямоугольника и квадрата — вопросы чередуются',
        icon: '📐',
        url: '/geometriya-4klass',
      },
      {
        id: 'skorost-vremya-rasstoyanie-4klass',
        name: 'Задачи на движение (4 класс)',
        description: 'Скорость, время, расстояние — S = v × t, вопросы чередуются',
        icon: '🚗',
        url: '/skorost-vremya-rasstoyanie-4klass',
      },
      {
        id: 'tsveta',
        name: 'Цвета',
        description: 'Угадай цвет по картинке — с озвучкой',
        icon: '🎨',
        url: '/tsveta',
      },
      {
        id: 'poryadok-deystviy',
        name: 'Порядок действий',
        description: 'Примеры со скобками и разными действиями — выбери верный ответ из четырёх',
        icon: '🔢',
        url: '/poryadok-deystviy',
      },
      {
        id: 'slozhnie-primery-3klass',
        name: 'Сложные примеры (3 класс)',
        description: 'Примеры в два действия с числами в пределах 100 — сложение, вычитание, умножение, деление',
        icon: '🧮',
        url: '/slozhnie-primery-3klass',
      },
      {
        id: 'desyatichnie-drobi-4klass',
        name: 'Десятичные дроби (4 класс)',
        description: 'Сравнение и сложение десятичных дробей — выбери верный знак или ответ',
        icon: '🔢',
        url: '/desyatichnie-drobi-4klass',
      },
      {
        id: 'umnozhenie-delenie-stolbikom-4klass',
        name: 'Умножение и деление столбиком (4 класс)',
        description: 'Умножай трёхзначные числа на однозначные и дели без остатка — выбери верный ответ',
        icon: '🧮',
        url: '/umnozhenie-delenie-stolbikom-4klass',
      },
      {
        id: 'vnetablichnoe-umnozhenie-3klass',
        name: 'Внетабличное умножение и деление (3 класс)',
        description: 'Двузначное число × однозначное и деление без остатка — вопросы чередуются',
        icon: '🧮',
        url: '/vnetablichnoe-umnozhenie-3klass',
      },
    ],
  },
  {
    title: 'Английский',
    emoji: '🇬🇧',
    trainers: [
      { id: 'numbers', name: 'Числа (английский)', description: 'Numbers 1-20 — учим счёт на английском с озвучкой', icon: '1️⃣', url: '/numbers' },
      { id: 'colors', name: 'Цвета (английский)', description: 'Colors — учим цвета на английском', icon: '🌈', url: '/colors' },
      { id: 'english-words', name: 'Английские слова', description: 'Словарный запас по темам', icon: '🇬🇧', url: '/english-words' },
      { id: 'irregular-verbs', name: 'Неправильные глаголы', description: 'Английские irregular verbs', icon: '🇬🇧', url: '/irregular-verbs' },
      {
        id: 'angliyskiy-alfavit',
        name: 'Английский алфавит',
        description: 'Буква, картинка, транскрипция и озвучка',
        icon: '🇬🇧',
        url: '/angliyskiy-alfavit',
      },
      {
        id: 'azbuky',
        name: 'Английский алфавит (игра)',
        description: 'A-Z с картинками и транскрипцией — второй формат, с мини-игрой',
        icon: '🇬🇧',
        url: '/azbuky',
      },
      {
        id: 'angliyskiy-schet',
        name: 'Счёт по-английски',
        description: 'Числа от 1 до 20 с транскрипцией и озвучкой',
        icon: '🇬🇧',
        url: '/angliyskiy-schet',
      },
      {
        id: 'english-colors',
        name: 'Цвета на английском',
        description: 'Режимы: цвета, карточки, квиз',
        icon: '🎨',
        url: '/english-colors',
      },
      {
        id: 'english-shapes',
        name: 'Формы на английском',
        description: 'Circle, Square, Triangle, Star, Heart',
        icon: '🔺',
        url: '/english-shapes',
      },
      {
        id: 'grammatika-3klass-english',
        name: 'Грамматика (3 класс)',
        description: 'To be, окончания -s/-es в Present Simple, множественное число',
        icon: '🇬🇧',
        url: '/grammatika-3klass-english',
      },
      { id: 'english-animals', name: 'Животные (английский)', description: 'Cat, dog, bird и другие животные с озвучкой', icon: '🐶', url: '/english-animals' },
      { id: 'english-food', name: 'Еда (английский)', description: 'Apple, bread, milk и другие продукты с озвучкой', icon: '🍎', url: '/english-food' },
      { id: 'english-family', name: 'Семья (английский)', description: 'Mother, father, sister и другие члены семьи с озвучкой', icon: '👪', url: '/english-family' },
      { id: 'english-clothes', name: 'Одежда (английский)', description: 'T-shirt, dress, shoes и другая одежда с озвучкой', icon: '👕', url: '/english-clothes' },
      { id: 'english-weather', name: 'Погода (английский)', description: 'Sun, rain, snow и другая погода с озвучкой', icon: '☀️', url: '/english-weather' },
      { id: 'english-school', name: 'Школьные принадлежности (английский)', description: 'Book, pen, ruler и другие школьные вещи с озвучкой', icon: '🎒', url: '/english-school' },
    ],
  },
  {
    title: 'Окружающий мир',
    emoji: '🌍',
    trainers: [
      {
        id: 'domashnie-dikie',
        name: 'Домашние и дикие животные',
        description: 'Кто где живёт: выбери, домашнее животное или дикое, с озвучкой',
        icon: '🐾',
        url: '/domashnie-dikie',
      },
      {
        id: 'priroda-zhivaya-nezhivaya-2klass',
        name: 'Живая и неживая природа',
        description: 'Определи по картинке: перед тобой живая или неживая природа',
        icon: '🌳',
        url: '/priroda-zhivaya-nezhivaya-2klass',
      },
      {
        id: 'priroda-1klass',
        name: 'Живое и неживое (для 1 класса)',
        description: 'Кошка, дом, цветок, мяч — определи, живое перед тобой или неживое',
        icon: '🐱',
        url: '/priroda-1klass',
      },
      {
        id: 'vremena-goda',
        name: 'Времена года',
        description: 'Угадай время года по картинке: зима, весна, лето или осень',
        icon: '🍂',
        url: '/vremena-goda',
      },
      {
        id: 'prirodnye-yavleniya-6-7let',
        name: 'Природные явления',
        description: 'Дождь, снег, гроза, радуга: угадай явление по подсказке с озвучкой',
        icon: '🌈',
        url: '/prirodnye-yavleniya-6-7let',
      },
      {
        id: 'telo-cheloveka',
        name: 'Тело человека',
        description: 'Крупные картинки и озвучка: назови часть тела правильно',
        icon: '🧑',
        url: '/telo-cheloveka',
      },
      {
        id: 'chelovek-organy-chuvstv',
        name: 'Органы чувств и организм',
        description: 'Каким органом мы видим, слышим, дышим — выбери верный ответ',
        icon: '🧠',
        url: '/chelovek-organy-chuvstv',
      },
      {
        id: 'bezopasnost-1klass',
        name: 'Правила безопасности',
        description: 'Дорога, огонь, электричество и незнакомцы — выбери верный ответ',
        icon: '🚦',
        url: '/bezopasnost-1klass',
      },
    ],
  },
  {
    title: 'Логика и внимание',
    emoji: '🧩',
    trainers: [
      { id: 'shapes-colors', name: 'Формы и цвета', description: 'Учим фигуры и цвета вместе', icon: '🔷', url: '/shapes-colors' },
      {
        id: 'zakonomernosti',
        name: 'Закономерности',
        description: 'Продолжи ряд из картинок — найди закономерность',
        icon: '🔁',
        url: '/zakonomernosti',
      },
      {
        id: 'naydi-lishnee',
        name: 'Найди лишнее',
        description: 'Для дошкольников: по форме, по цвету, по размеру',
        icon: '🧩',
        url: '/naydi-lishnee',
      },
      {
        id: 'sravnenie-predmetov',
        name: 'Сравнение предметов',
        description: 'Что больше, что длиннее, чего больше по счёту',
        icon: '📏',
        url: '/sravnenie-predmetov',
      },
      {
        id: 'naydi-paru',
        name: 'Найди пару',
        description: 'Игра на память: переверни и найди одинаковые фигуры',
        icon: '🃏',
        url: '/naydi-paru',
      },
      { id: 'chto-izmenilos', name: 'Что изменилось?', description: 'Запомни фигуры и найди, что изменилось', icon: '👀', url: '/chto-izmenilos' },
      {
        id: 'sobery-po-poryadku',
        name: 'Собери по порядку',
        description: 'Расставь фигуры от маленькой к большой',
        icon: '📏',
        url: '/sobery-po-poryadku',
      },
      {
        id: 'orientaciya-v-prostranstve',
        name: 'Ориентация в пространстве',
        description: 'Где находится предмет: сверху, снизу, слева или справа',
        icon: '🧭',
        url: '/orientaciya-v-prostranstve',
      },
      {
        id: 'zagadki-4-5let',
        name: 'Загадки для малышей 4–5 лет',
        description: 'Послушай загадку и выбери верную картинку из четырёх',
        icon: '🧸',
        url: '/zagadki-4-5let',
      },
      {
        id: 'zagadki-6-7let',
        name: 'Загадки для дошкольников 6–7 лет',
        description: 'Послушай загадку и выбери верную картинку из четырёх',
        icon: '🤔',
        url: '/zagadki-6-7let',
      },
      {
        id: 'zagadki-1klass',
        name: 'Загадки для 1 класса',
        description: 'Отгадай загадку и выбери верную картинку из четырёх',
        icon: '🤔',
        url: '/zagadki-1klass',
      },
      {
        id: 'analogii-1klass',
        name: 'Аналогии (1 класс)',
        description: 'Найди пару по тому же правилу: собака — будка, птица — ?',
        icon: '🧩',
        url: '/analogii-1klass',
      },
      {
        id: 'logicheskie-zadachi-2klass',
        name: 'Логические задачи (2 класс)',
        description: 'Сравнение, счёт, закономерности и «кто есть кто»',
        icon: '🧠',
        url: '/logicheskie-zadachi-2klass',
      },
      {
        id: 'zagadki-2klass',
        name: 'Загадки для 2 класса',
        description: 'Загадки посложнее: разгадай метафору и выбери верную картинку',
        icon: '🤔',
        url: '/zagadki-2klass',
      },
      {
        id: 'rebusy-2klass',
        name: 'Ребусы (2 класс)',
        description: 'Разгадай слово по буквам и цифрам, выбери верный ответ из четырёх',
        icon: '🧩',
        url: '/rebusy-2klass',
      },
      {
        id: 'kombinatorika-3klass',
        name: 'Комбинаторика (3 класс)',
        description: 'Считай варианты по правилу умножения — 10 задач с выбором ответа',
        icon: '🔢',
        url: '/kombinatorika-3klass',
      },
      {
        id: 'logicheskie-tablitsy-4klass',
        name: 'Логические задачи с таблицами (4 класс)',
        description: 'Реши «кто есть кто» методом исключения — 10 задач с выбором ответа',
        icon: '🧩',
        url: '/logicheskie-tablitsy-4klass',
      },
      {
        id: 'vzveshivanie-3klass',
        name: 'Задачи на взвешивание (3 класс)',
        description: 'Сколько взвешиваний нужно, чтобы найти фальшивую монету — 10 задач с выбором ответа',
        icon: '⚖️',
        url: '/vzveshivanie-3klass',
      },
      {
        id: 'perelivanie-4klass',
        name: 'Задачи на переливание (4 класс)',
        description: 'Сколько минимум ходов нужно, чтобы отмерить нужный объём двумя сосудами — 10 задач с выбором ответа',
        icon: '🧪',
        url: '/perelivanie-4klass',
      },
    ],
  },
  {
    title: 'Развитие речи',
    emoji: '🗣️',
    trainers: [
      {
        id: 'pereskaz-4-5let',
        name: 'Пересказ по картинкам (4–5 лет)',
        description: 'Собери историю из 3 картинок по порядку — с озвучкой каждого шага',
        icon: '🖼️',
        url: '/pereskaz-4-5let',
      },
      {
        id: 'pereskaz-6-7let',
        name: 'Пересказ по картинкам (6–7 лет)',
        description: 'Собери историю из 4 картинок по порядку — с озвучкой каждого шага',
        icon: '🖼️',
        url: '/pereskaz-6-7let',
      },
      {
        id: 'dialogi-6-7let',
        name: 'Диалоги (6–7 лет)',
        description: 'Тебе говорят реплику с озвучкой — выбери самый вежливый ответ из четырёх',
        icon: '💬',
        url: '/dialogi-6-7let',
      },
      {
        id: 'rasskazy-6-7let',
        name: 'Рассказы — чем закончилась история?',
        description: 'Прочитай начало истории и выбери логичный финал — для детей 6-7 лет',
        icon: '📚',
        url: '/rasskazy-6-7let',
      },
    ],
  },
];

export default function TrainerIndexPage() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-orange hover:underline text-sm mb-4 inline-block">
            ← Назад
          </Link>
          <h1 className="text-5xl font-bold mb-4">🎮 Тренажёры</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-8 px-6">
        <TrainerQuotaBanner />
      </div>

      <div className="max-w-6xl mx-auto pb-12 px-6 space-y-16">
        {CATEGORIES.map((category) => (
          <div key={category.title}>
            <h2 className="text-3xl font-bold mb-8">
              {category.emoji} {category.title}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {category.trainers.map((trainer) => (
                <Link
                  key={trainer.id}
                  href={`/trenazher${trainer.url}`}
                  className="group card hover:border-white/50 transition-all text-center !p-3"
                >
                  <div className="text-3xl mb-2">{trainer.icon}</div>
                  <h3 className="text-sm font-bold mb-1 group-hover:text-orange leading-snug">{trainer.name}</h3>
                  <p className="text-white/60 text-xs line-clamp-2">{trainer.description}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
