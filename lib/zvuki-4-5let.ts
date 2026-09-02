// Слова для тренажёра «Звуки» (4-5 лет): определяем первый звук в слове.
// Подобраны только слова, где первый звук однозначно совпадает с первой буквой
// (простые согласные и гласные в начале слова) — без йотированных гласных
// (я, ё, ю, е в начале слова дают звук [й]+гласный, это запутает дошкольника).

export interface ZvukSlovo {
  word: string;
  emoji: string;
  firstSound: string; // правильная буква первого звука
}

export const ZVUKI_WORDS: ZvukSlovo[] = [
  { word: 'Кот', emoji: '🐱', firstSound: 'К' },
  { word: 'Дом', emoji: '🏠', firstSound: 'Д' },
  { word: 'Мяч', emoji: '⚽', firstSound: 'М' },
  { word: 'Сыр', emoji: '🧀', firstSound: 'С' },
  { word: 'Рыба', emoji: '🐟', firstSound: 'Р' },
  { word: 'Лук', emoji: '🧅', firstSound: 'Л' },
  { word: 'Носок', emoji: '🧦', firstSound: 'Н' },
  { word: 'Банан', emoji: '🍌', firstSound: 'Б' },
  { word: 'Вода', emoji: '💧', firstSound: 'В' },
  { word: 'Гриб', emoji: '🍄', firstSound: 'Г' },
  { word: 'Жук', emoji: '🐞', firstSound: 'Ж' },
  { word: 'Зонт', emoji: '☂️', firstSound: 'З' },
  { word: 'Пони', emoji: '🐴', firstSound: 'П' },
  { word: 'Торт', emoji: '🎂', firstSound: 'Т' },
  { word: 'Флаг', emoji: '🚩', firstSound: 'Ф' },
  { word: 'Хлеб', emoji: '🍞', firstSound: 'Х' },
  { word: 'Часы', emoji: '⏰', firstSound: 'Ч' },
  { word: 'Шар', emoji: '🎈', firstSound: 'Ш' },
];
