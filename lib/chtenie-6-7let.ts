// Слова для тренажёра "Чтение" (дошкольники 6–7 лет): техника чтения по слогам.
// Слово показывается по слогам крупно (например "МА-ШИ-НА"), озвучивается целиком,
// а ребёнок выбирает подходящую картинку-эмодзи из четырёх вариантов.
// Слова простые, 3-6 букв, знакомые дошкольнику предметы, животные и явления.
export interface ChtenieSlovo {
  id: string;
  word: string; // слово целиком, как читается и озвучивается
  syllables: string; // слово по слогам через дефис, крупно на экране, например "МА-ШИ-НА"
  emoji: string;
}

export const CHTENIE_6_7LET: ChtenieSlovo[] = [
  { id: 'kot', word: 'КОТ', syllables: 'КОТ', emoji: '🐱' },
  { id: 'dom', word: 'ДОМ', syllables: 'ДОМ', emoji: '🏠' },
  { id: 'mama', word: 'МАМА', syllables: 'МА-МА', emoji: '👩' },
  { id: 'papa', word: 'ПАПА', syllables: 'ПА-ПА', emoji: '👨' },
  { id: 'shar', word: 'ШАР', syllables: 'ШАР', emoji: '🎈' },
  { id: 'sok', word: 'СОК', syllables: 'СОК', emoji: '🧃' },
  { id: 'zhuk', word: 'ЖУК', syllables: 'ЖУК', emoji: '🪲' },
  { id: 'ryba', word: 'РЫБА', syllables: 'РЫ-БА', emoji: '🐟' },
  { id: 'luna', word: 'ЛУНА', syllables: 'ЛУ-НА', emoji: '🌙' },
  { id: 'roza', word: 'РОЗА', syllables: 'РО-ЗА', emoji: '🌹' },
  { id: 'lisa', word: 'ЛИСА', syllables: 'ЛИ-СА', emoji: '🦊' },
  { id: 'gora', word: 'ГОРА', syllables: 'ГО-РА', emoji: '⛰️' },
  { id: 'mashina', word: 'МАШИНА', syllables: 'МА-ШИ-НА', emoji: '🚗' },
  { id: 'sobaka', word: 'СОБАКА', syllables: 'СО-БА-КА', emoji: '🐶' },
  { id: 'raketa', word: 'РАКЕТА', syllables: 'РА-КЕ-ТА', emoji: '🚀' },
];
