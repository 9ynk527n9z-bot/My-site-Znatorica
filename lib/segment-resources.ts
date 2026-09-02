export interface TrainerRef {
  slug: string;
  title: string;
  icon: string;
  desc: string;
}

export interface SegmentResources {
  vprKlass?: '3-klass' | '4-klass';
  mckoKlass?: '4-klass';
  posterKlass?: '2' | '3' | '4';
  trainers: TrainerRef[];
  generators?: TrainerRef[];
}

// Единый источник правды: какие реальные тренажёры, варианты ВПР и плакаты
// подходят каждому возрастному сегменту. Используется на страницах сегментов,
// чтобы не дублировать вручную и не создавать "мёртвые" ссылки на несуществующий контент.
export const SEGMENT_RESOURCES: Record<string, SegmentResources> = {
  '4-5-let': {
    trainers: [
      { slug: 'naydi-lishnee', title: 'Найди лишнее', icon: '🧩', desc: 'По форме, по цвету, по размеру' },
      { slug: 'naydi-paru', title: 'Найди пару', icon: '🃏', desc: 'Игра на память' },
      { slug: 'chto-izmenilos', title: 'Что изменилось?', icon: '👀', desc: 'Тренируем внимание' },
      { slug: 'sobery-po-poryadku', title: 'Собери по порядку', icon: '📏', desc: 'От маленькой к большой' },
      { slug: 'azbuky', title: 'Английский алфавит (игра)', icon: '🇬🇧', desc: 'A-Z с картинками' },
      { slug: 'numbers', title: 'Числа', icon: '🔢', desc: 'Учимся считать' },
      { slug: 'colors', title: 'Цвета', icon: '🌈', desc: 'Различаем цвета' },
      { slug: 'shapes-colors', title: 'Формы и цвета', icon: '🔺', desc: 'Фигуры и оттенки' },
      { slug: 'pogovorki', title: 'Поговорки и пословицы', icon: '💬', desc: 'Русский фольклор' },
      { slug: 'angliyskiy-alfavit', title: 'Английский алфавит (Alphabet)', icon: '🇬🇧', desc: 'Буквы, картинки и озвучка' },
      { slug: 'angliyskiy-schet', title: 'Счёт по-английски (Numbers)', icon: '🇬🇧', desc: 'Числа от 1 до 20 с озвучкой' },
      { slug: 'english-animals', title: 'Животные по-английски (Animals)', icon: '🐶', desc: 'С озвучкой' },
      { slug: 'english-colors', title: 'Цвета по-английски (Colors)', icon: '🌈', desc: 'С озвучкой' },
      { slug: 'english-shapes', title: 'Формы по-английски (Shapes)', icon: '🔺', desc: 'С озвучкой' },
      { slug: 'english-food', title: 'Еда по-английски (Food)', icon: '🍎', desc: 'С озвучкой' },
      { slug: 'english-family', title: 'Семья по-английски (Family)', icon: '👪', desc: 'С озвучкой' },
      { slug: 'english-clothes', title: 'Одежда по-английски (Clothes)', icon: '👕', desc: 'С озвучкой' },
      { slug: 'english-weather', title: 'Погода по-английски (Weather)', icon: '☀️', desc: 'С озвучкой' },
      { slug: 'english-school', title: 'Школьные принадлежности по-английски (School things)', icon: '🎒', desc: 'С озвучкой' },
    ],
  },
  '6-7-let': {
    trainers: [
      { slug: 'naydi-lishnee', title: 'Найди лишнее', icon: '🧩', desc: 'По форме, по цвету, по размеру' },
      { slug: 'naydi-paru', title: 'Найди пару', icon: '🃏', desc: 'Игра на память' },
      { slug: 'chto-izmenilos', title: 'Что изменилось?', icon: '👀', desc: 'Тренируем внимание' },
      { slug: 'sobery-po-poryadku', title: 'Собери по порядку', icon: '📏', desc: 'От маленькой к большой' },
      { slug: 'azbuky', title: 'Английский алфавит (игра)', icon: '🇬🇧', desc: 'A-Z с картинками' },
      { slug: 'numbers', title: 'Числа', icon: '🔢', desc: 'Счёт до 20' },
      { slug: 'colors', title: 'Цвета', icon: '🌈', desc: 'Различаем цвета' },
      { slug: 'shapes-colors', title: 'Формы и цвета', icon: '🔺', desc: 'Закрепляем формы' },
      { slug: 'pogovorki', title: 'Поговорки и пословицы', icon: '💬', desc: 'Русский фольклор' },
      { slug: 'angliyskiy-alfavit', title: 'Английский алфавит (Alphabet)', icon: '🇬🇧', desc: 'Буквы, картинки и озвучка' },
      { slug: 'angliyskiy-schet', title: 'Счёт по-английски (Numbers)', icon: '🇬🇧', desc: 'Числа от 1 до 20 с озвучкой' },
      { slug: 'english-words', title: 'Английские слова по темам (Words)', icon: '🇬🇧', desc: 'Разные темы с озвучкой' },
      { slug: 'english-animals', title: 'Животные по-английски (Animals)', icon: '🐶', desc: 'С озвучкой' },
      { slug: 'english-colors', title: 'Цвета по-английски (Colors)', icon: '🌈', desc: 'С озвучкой' },
      { slug: 'english-shapes', title: 'Формы по-английски (Shapes)', icon: '🔺', desc: 'С озвучкой' },
      { slug: 'english-food', title: 'Еда по-английски (Food)', icon: '🍎', desc: 'С озвучкой' },
      { slug: 'english-family', title: 'Семья по-английски (Family)', icon: '👪', desc: 'С озвучкой' },
      { slug: 'english-clothes', title: 'Одежда по-английски (Clothes)', icon: '👕', desc: 'С озвучкой' },
      { slug: 'english-weather', title: 'Погода по-английски (Weather)', icon: '☀️', desc: 'С озвучкой' },
      { slug: 'english-school', title: 'Школьные принадлежности по-английски (School things)', icon: '🎒', desc: 'С озвучкой' },
    ],
    generators: [
      { slug: 'anagrammy', title: 'Анаграммы', icon: '🔤', desc: 'Разгадай слово из перемешанных букв' },
    ],
  },
  '1-klass': {
    trainers: [
      { slug: 'azbuky', title: 'Английский алфавит (игра)', icon: '🇬🇧', desc: 'A-Z с картинками' },
      { slug: 'numbers', title: 'Числа', icon: '🔢', desc: 'Счёт и цифры' },
      { slug: 'colors', title: 'Цвета', icon: '🌈', desc: 'Различаем цвета' },
      { slug: 'shapes-colors', title: 'Формы и цвета', icon: '🔺', desc: 'Фигуры и оттенки' },
      { slug: 'pogovorki', title: 'Поговорки и пословицы', icon: '💬', desc: 'Русский фольклор' },
      { slug: 'angliyskiy-alfavit', title: 'Английский алфавит (Alphabet)', icon: '🇬🇧', desc: 'Буквы, картинки и озвучка' },
      { slug: 'angliyskiy-schet', title: 'Счёт по-английски (Numbers)', icon: '🇬🇧', desc: 'Числа от 1 до 20 с озвучкой' },
      { slug: 'english-words', title: 'Английские слова по темам (Words)', icon: '🇬🇧', desc: 'Разные темы с озвучкой' },
      { slug: 'english-animals', title: 'Животные по-английски (Animals)', icon: '🐶', desc: 'С озвучкой' },
      { slug: 'english-colors', title: 'Цвета по-английски (Colors)', icon: '🌈', desc: 'С озвучкой' },
      { slug: 'english-shapes', title: 'Формы по-английски (Shapes)', icon: '🔺', desc: 'С озвучкой' },
      { slug: 'english-food', title: 'Еда по-английски (Food)', icon: '🍎', desc: 'С озвучкой' },
      { slug: 'english-family', title: 'Семья по-английски (Family)', icon: '👪', desc: 'С озвучкой' },
      { slug: 'english-clothes', title: 'Одежда по-английски (Clothes)', icon: '👕', desc: 'С озвучкой' },
      { slug: 'english-weather', title: 'Погода по-английски (Weather)', icon: '☀️', desc: 'С озвучкой' },
      { slug: 'english-school', title: 'Школьные принадлежности по-английски (School things)', icon: '🎒', desc: 'С озвучкой' },
    ],
    generators: [
      { slug: 'filvordy', title: 'Филворды', icon: '🔍', desc: 'Найди слова в сетке букв' },
      { slug: 'anagrammy', title: 'Анаграммы', icon: '🔤', desc: 'Разгадай слово из перемешанных букв' },
    ],
  },
  '2-klass': {
    posterKlass: '2',
    trainers: [
      { slug: 'tablitsa-umnozheniya', title: 'Таблица умножения', icon: '✖️', desc: '4 режима: таблица, тренировка, на время, множитель' },
      { slug: 'colors', title: 'Цвета', icon: '🌈', desc: 'Различаем цвета' },
      { slug: 'shapes-colors', title: 'Формы и цвета', icon: '🔺', desc: 'Фигуры и оттенки' },
      { slug: 'pogovorki', title: 'Поговорки и пословицы', icon: '💬', desc: 'Русский фольклор' },
      { slug: 'angliyskiy-alfavit', title: 'Английский алфавит (Alphabet)', icon: '🇬🇧', desc: 'Буквы, картинки и озвучка' },
      { slug: 'angliyskiy-schet', title: 'Счёт по-английски (Numbers)', icon: '🇬🇧', desc: 'Числа от 1 до 20 с озвучкой' },
      { slug: 'english-words', title: 'Английские слова по темам (Words)', icon: '🇬🇧', desc: 'Разные темы с озвучкой' },
      { slug: 'english-animals', title: 'Животные по-английски (Animals)', icon: '🐶', desc: 'С озвучкой' },
      { slug: 'english-colors', title: 'Цвета по-английски (Colors)', icon: '🌈', desc: 'С озвучкой' },
      { slug: 'english-shapes', title: 'Формы по-английски (Shapes)', icon: '🔺', desc: 'С озвучкой' },
      { slug: 'english-food', title: 'Еда по-английски (Food)', icon: '🍎', desc: 'С озвучкой' },
      { slug: 'english-family', title: 'Семья по-английски (Family)', icon: '👪', desc: 'С озвучкой' },
      { slug: 'english-clothes', title: 'Одежда по-английски (Clothes)', icon: '👕', desc: 'С озвучкой' },
      { slug: 'english-weather', title: 'Погода по-английски (Weather)', icon: '☀️', desc: 'С озвучкой' },
      { slug: 'english-school', title: 'Школьные принадлежности по-английски (School things)', icon: '🎒', desc: 'С озвучкой' },
    ],
    generators: [
      { slug: 'filvordy', title: 'Филворды', icon: '🔍', desc: 'Найди слова в сетке букв' },
      { slug: 'anagrammy', title: 'Анаграммы', icon: '🔤', desc: 'Разгадай слово из перемешанных букв' },
    ],
  },
  '3-klass': {
    vprKlass: '3-klass',
    posterKlass: '3',
    trainers: [
      { slug: 'tablitsa-umnozheniya', title: 'Таблица умножения', icon: '✖️', desc: '4 режима: таблица, тренировка, на время, множитель' },
      { slug: 'pristavki', title: 'Приставки', icon: '📝', desc: 'Приставки в словах' },
      { slug: 'english-words', title: 'Английские слова по темам (Words)', icon: '🇬🇧', desc: 'Разные темы с озвучкой' },
      { slug: 'irregular-verbs', title: 'Неправильные глаголы', icon: '🇬🇧', desc: 'Английская грамматика' },
      { slug: 'angliyskiy-schet', title: 'Счёт по-английски (Numbers)', icon: '🇬🇧', desc: 'Числа от 1 до 20 с озвучкой' },
      { slug: 'english-animals', title: 'Животные по-английски (Animals)', icon: '🐶', desc: 'С озвучкой' },
      { slug: 'english-colors', title: 'Цвета по-английски (Colors)', icon: '🌈', desc: 'С озвучкой' },
      { slug: 'english-shapes', title: 'Формы по-английски (Shapes)', icon: '🔺', desc: 'С озвучкой' },
      { slug: 'english-food', title: 'Еда по-английски (Food)', icon: '🍎', desc: 'С озвучкой' },
      { slug: 'english-family', title: 'Семья по-английски (Family)', icon: '👪', desc: 'С озвучкой' },
      { slug: 'english-clothes', title: 'Одежда по-английски (Clothes)', icon: '👕', desc: 'С озвучкой' },
      { slug: 'english-weather', title: 'Погода по-английски (Weather)', icon: '☀️', desc: 'С озвучкой' },
      { slug: 'english-school', title: 'Школьные принадлежности по-английски (School things)', icon: '🎒', desc: 'С озвучкой' },
    ],
    generators: [
      { slug: 'filvordy', title: 'Филворды', icon: '🔍', desc: 'Найди слова в сетке букв' },
      { slug: 'anagrammy', title: 'Анаграммы', icon: '🔤', desc: 'Разгадай слово из перемешанных букв' },
    ],
  },
  '4-klass': {
    vprKlass: '4-klass',
    mckoKlass: '4-klass',
    posterKlass: '4',
    trainers: [
      { slug: 'tablitsa-umnozheniya', title: 'Таблица умножения', icon: '✖️', desc: '4 режима: таблица, тренировка, на время, множитель' },
      { slug: 'pristavki', title: 'Приставки', icon: '📝', desc: 'Русский язык' },
      { slug: 'pogovorki', title: 'Поговорки и пословицы', icon: '💬', desc: 'Литература и фольклор' },
      { slug: 'angliyskiy-schet', title: 'Счёт по-английски (Numbers)', icon: '🇬🇧', desc: 'Числа от 1 до 20 с озвучкой' },
      { slug: 'english-words', title: 'Английские слова по темам (Words)', icon: '🇬🇧', desc: 'Разные темы с озвучкой' },
      { slug: 'irregular-verbs', title: 'Неправильные глаголы', icon: '🇬🇧', desc: 'Таблица irregular verbs' },
      { slug: 'english-animals', title: 'Животные по-английски (Animals)', icon: '🐶', desc: 'С озвучкой' },
      { slug: 'english-colors', title: 'Цвета по-английски (Colors)', icon: '🌈', desc: 'С озвучкой' },
      { slug: 'english-shapes', title: 'Формы по-английски (Shapes)', icon: '🔺', desc: 'С озвучкой' },
      { slug: 'english-food', title: 'Еда по-английски (Food)', icon: '🍎', desc: 'С озвучкой' },
      { slug: 'english-family', title: 'Семья по-английски (Family)', icon: '👪', desc: 'С озвучкой' },
      { slug: 'english-clothes', title: 'Одежда по-английски (Clothes)', icon: '👕', desc: 'С озвучкой' },
      { slug: 'english-weather', title: 'Погода по-английски (Weather)', icon: '☀️', desc: 'С озвучкой' },
      { slug: 'english-school', title: 'Школьные принадлежности по-английски (School things)', icon: '🎒', desc: 'С озвучкой' },
    ],
    generators: [
      { slug: 'filvordy', title: 'Филворды', icon: '🔍', desc: 'Найди слова в сетке букв' },
      { slug: 'anagrammy', title: 'Анаграммы', icon: '🔤', desc: 'Разгадай слово из перемешанных букв' },
    ],
  },
};
