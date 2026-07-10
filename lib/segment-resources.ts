export interface TrainerRef {
  slug: string;
  title: string;
  icon: string;
  desc: string;
}

export interface SegmentResources {
  vprKlass?: '3-klass' | '4-klass';
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
      { slug: 'azbuky', title: 'Азбука', icon: '🔤', desc: 'Учим буквы' },
      { slug: 'numbers', title: 'Числа', icon: '🔢', desc: 'Учимся считать' },
      { slug: 'colors', title: 'Цвета', icon: '🌈', desc: 'Различаем цвета' },
      { slug: 'shapes-colors', title: 'Формы и цвета', icon: '🔺', desc: 'Фигуры и оттенки' },
      { slug: 'pogovorki', title: 'Поговорки и пословицы', icon: '💬', desc: 'Русский фольклор' },
      { slug: 'angliyskiy-alfavit', title: 'Английский алфавит', icon: '🇬🇧', desc: 'Буквы, картинки и озвучка' },
      { slug: 'angliyskiy-schet', title: 'Счёт по-английски', icon: '🇬🇧', desc: 'Числа от 1 до 20 с озвучкой' },
    ],
  },
  '6-7-let': {
    trainers: [
      { slug: 'naydi-lishnee', title: 'Найди лишнее', icon: '🧩', desc: 'По форме, по цвету, по размеру' },
      { slug: 'naydi-paru', title: 'Найди пару', icon: '🃏', desc: 'Игра на память' },
      { slug: 'chto-izmenilos', title: 'Что изменилось?', icon: '👀', desc: 'Тренируем внимание' },
      { slug: 'sobery-po-poryadku', title: 'Собери по порядку', icon: '📏', desc: 'От маленькой к большой' },
      { slug: 'azbuky', title: 'Азбука', icon: '🔤', desc: 'Читаем по слогам' },
      { slug: 'numbers', title: 'Числа', icon: '🔢', desc: 'Счёт до 20' },
      { slug: 'colors', title: 'Цвета', icon: '🌈', desc: 'Различаем цвета' },
      { slug: 'shapes-colors', title: 'Формы и цвета', icon: '🔺', desc: 'Закрепляем формы' },
      { slug: 'pogovorki', title: 'Поговорки и пословицы', icon: '💬', desc: 'Русский фольклор' },
      { slug: 'angliyskiy-alfavit', title: 'Английский алфавит', icon: '🇬🇧', desc: 'Буквы, картинки и озвучка' },
      { slug: 'angliyskiy-schet', title: 'Счёт по-английски', icon: '🇬🇧', desc: 'Числа от 1 до 20 с озвучкой' },
      { slug: 'english-words', title: 'Английские слова по темам', icon: '🇬🇧', desc: 'Animals, Food и другие темы' },
    ],
    generators: [
      { slug: 'anagrammy', title: 'Анаграммы', icon: '🔤', desc: 'Разгадай слово из перемешанных букв' },
    ],
  },
  '1-klass': {
    trainers: [
      { slug: 'azbuky', title: 'Азбука', icon: '🔤', desc: 'Буквы и чтение' },
      { slug: 'numbers', title: 'Числа', icon: '🔢', desc: 'Счёт и цифры' },
      { slug: 'colors', title: 'Цвета', icon: '🌈', desc: 'Различаем цвета' },
      { slug: 'shapes-colors', title: 'Формы и цвета', icon: '🔺', desc: 'Фигуры и оттенки' },
      { slug: 'pogovorki', title: 'Поговорки и пословицы', icon: '💬', desc: 'Русский фольклор' },
      { slug: 'angliyskiy-alfavit', title: 'Английский алфавит', icon: '🇬🇧', desc: 'Буквы, картинки и озвучка' },
      { slug: 'angliyskiy-schet', title: 'Счёт по-английски', icon: '🇬🇧', desc: 'Числа от 1 до 20 с озвучкой' },
      { slug: 'english-words', title: 'Английские слова по темам', icon: '🇬🇧', desc: 'Animals, Food и другие темы' },
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
      { slug: 'angliyskiy-alfavit', title: 'Английский алфавит', icon: '🇬🇧', desc: 'Буквы, картинки и озвучка' },
      { slug: 'angliyskiy-schet', title: 'Счёт по-английски', icon: '🇬🇧', desc: 'Числа от 1 до 20 с озвучкой' },
      { slug: 'english-words', title: 'Английские слова по темам', icon: '🇬🇧', desc: 'Animals, Food и другие темы' },
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
      { slug: 'english-words', title: 'Английские слова', icon: '🇬🇧', desc: 'Английская лексика' },
      { slug: 'irregular-verbs', title: 'Неправильные глаголы', icon: '🇬🇧', desc: 'Английская грамматика' },
      { slug: 'angliyskiy-schet', title: 'Счёт по-английски', icon: '🇬🇧', desc: 'Числа от 1 до 20 с озвучкой' },
    ],
    generators: [
      { slug: 'filvordy', title: 'Филворды', icon: '🔍', desc: 'Найди слова в сетке букв' },
      { slug: 'anagrammy', title: 'Анаграммы', icon: '🔤', desc: 'Разгадай слово из перемешанных букв' },
    ],
  },
  '4-klass': {
    vprKlass: '4-klass',
    posterKlass: '4',
    trainers: [
      { slug: 'tablitsa-umnozheniya', title: 'Таблица умножения', icon: '✖️', desc: '4 режима: таблица, тренировка, на время, множитель' },
      { slug: 'pristavki', title: 'Приставки', icon: '📝', desc: 'Русский язык' },
      { slug: 'pogovorki', title: 'Поговорки и пословицы', icon: '💬', desc: 'Литература и фольклор' },
      { slug: 'angliyskiy-schet', title: 'Счёт по-английски', icon: '🇬🇧', desc: 'Числа от 1 до 20 с озвучкой' },
      { slug: 'english-words', title: 'Английские слова по темам', icon: '🇬🇧', desc: 'Animals, Food и другие темы' },
      { slug: 'irregular-verbs', title: 'Неправильные глаголы', icon: '🇬🇧', desc: 'Таблица irregular verbs' },
    ],
    generators: [
      { slug: 'filvordy', title: 'Филворды', icon: '🔍', desc: 'Найди слова в сетке букв' },
      { slug: 'anagrammy', title: 'Анаграммы', icon: '🔤', desc: 'Разгадай слово из перемешанных букв' },
    ],
  },
};
