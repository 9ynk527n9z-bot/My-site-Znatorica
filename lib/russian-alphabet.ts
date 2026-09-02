export interface RussianAlphabetLetter {
  letter: string;
  word: string;
  emoji: string;
  // Буквы Ъ, Ы, Ь не начинают ни одного русского слова — для них
  // показываем название буквы вместо слова-примера и не задействуем
  // их в мини-игре «Угадай букву».
  hasWord: boolean;
}

export const RUSSIAN_ALPHABET: RussianAlphabetLetter[] = [
  { letter: 'А', word: 'Арбуз', emoji: '🍉', hasWord: true },
  { letter: 'Б', word: 'Барабан', emoji: '🥁', hasWord: true },
  { letter: 'В', word: 'Волк', emoji: '🐺', hasWord: true },
  { letter: 'Г', word: 'Гриб', emoji: '🍄', hasWord: true },
  { letter: 'Д', word: 'Дом', emoji: '🏠', hasWord: true },
  { letter: 'Е', word: 'Ель', emoji: '🌲', hasWord: true },
  { letter: 'Ё', word: 'Ёж', emoji: '🦔', hasWord: true },
  { letter: 'Ж', word: 'Жираф', emoji: '🦒', hasWord: true },
  { letter: 'З', word: 'Зонт', emoji: '☂️', hasWord: true },
  { letter: 'И', word: 'Иголка', emoji: '🪡', hasWord: true },
  { letter: 'Й', word: 'Йогурт', emoji: '🥛', hasWord: true },
  { letter: 'К', word: 'Кот', emoji: '🐱', hasWord: true },
  { letter: 'Л', word: 'Лев', emoji: '🦁', hasWord: true },
  { letter: 'М', word: 'Мяч', emoji: '⚽', hasWord: true },
  { letter: 'Н', word: 'Носорог', emoji: '🦏', hasWord: true },
  { letter: 'О', word: 'Облако', emoji: '☁️', hasWord: true },
  { letter: 'П', word: 'Пингвин', emoji: '🐧', hasWord: true },
  { letter: 'Р', word: 'Радуга', emoji: '🌈', hasWord: true },
  { letter: 'С', word: 'Слон', emoji: '🐘', hasWord: true },
  { letter: 'Т', word: 'Тигр', emoji: '🐯', hasWord: true },
  { letter: 'У', word: 'Утка', emoji: '🦆', hasWord: true },
  { letter: 'Ф', word: 'Флаг', emoji: '🚩', hasWord: true },
  { letter: 'Х', word: 'Хомяк', emoji: '🐹', hasWord: true },
  { letter: 'Ц', word: 'Цыплёнок', emoji: '🐥', hasWord: true },
  { letter: 'Ч', word: 'Черепаха', emoji: '🐢', hasWord: true },
  { letter: 'Ш', word: 'Шар', emoji: '🎈', hasWord: true },
  { letter: 'Щ', word: 'Щука', emoji: '🐟', hasWord: true },
  { letter: 'Ъ', word: 'Твёрдый знак', emoji: '', hasWord: false },
  { letter: 'Ы', word: 'Буква «ы»', emoji: '', hasWord: false },
  { letter: 'Ь', word: 'Мягкий знак', emoji: '', hasWord: false },
  { letter: 'Э', word: 'Экран', emoji: '🖥️', hasWord: true },
  { letter: 'Ю', word: 'Юла', emoji: '🌀', hasWord: true },
  { letter: 'Я', word: 'Яблоко', emoji: '🍎', hasWord: true },
];
