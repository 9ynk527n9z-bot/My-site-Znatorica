// Слова для тренажёра «Слоги» (4-5 лет): сколько слогов в слове?
// Правило для дошкольников: количество слогов = количество гласных звуков в слове.
// Каждое слово перепроверено дважды по числу гласных.

export interface SlogSlovo {
  word: string;
  emoji: string;
  syllables: number; // правильное количество слогов
  syllableBreak: string; // слово, разбитое по слогам через дефис (для показа)
}

export const SLOGI_WORDS: SlogSlovo[] = [
  // 1 слог
  { word: 'Кот', emoji: '🐱', syllables: 1, syllableBreak: 'кот' },
  { word: 'Дом', emoji: '🏠', syllables: 1, syllableBreak: 'дом' },
  { word: 'Мяч', emoji: '⚽', syllables: 1, syllableBreak: 'мяч' },
  { word: 'Сыр', emoji: '🧀', syllables: 1, syllableBreak: 'сыр' },
  // 2 слога
  { word: 'Мама', emoji: '👩', syllables: 2, syllableBreak: 'ма-ма' },
  { word: 'Папа', emoji: '👨', syllables: 2, syllableBreak: 'па-па' },
  { word: 'Рыба', emoji: '🐟', syllables: 2, syllableBreak: 'ры-ба' },
  { word: 'Роза', emoji: '🌹', syllables: 2, syllableBreak: 'ро-за' },
  { word: 'Лиса', emoji: '🦊', syllables: 2, syllableBreak: 'ли-са' },
  // 3 слога
  { word: 'Собака', emoji: '🐶', syllables: 3, syllableBreak: 'со-ба-ка' },
  { word: 'Молоко', emoji: '🥛', syllables: 3, syllableBreak: 'мо-ло-ко' },
  { word: 'Машина', emoji: '🚗', syllables: 3, syllableBreak: 'ма-ши-на' },
  { word: 'Бабушка', emoji: '👵', syllables: 3, syllableBreak: 'ба-буш-ка' },
  { word: 'Крокодил', emoji: '🐊', syllables: 3, syllableBreak: 'кро-ко-дил' },
  // 4 слога
  { word: 'Черепаха', emoji: '🐢', syllables: 4, syllableBreak: 'че-ре-па-ха' },
  { word: 'Велосипед', emoji: '🚲', syllables: 4, syllableBreak: 'ве-ло-си-пед' },
];
