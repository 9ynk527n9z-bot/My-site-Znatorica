export interface RussianNumber {
  digit: number;
  word: string;
  emoji: string;
  // Строка из emoji-предметов, повторенных ровно digit раз — для визуализации количества.
  objects: string;
}

const OBJECT_EMOJI = '🍎';

export const RUSSIAN_NUMBERS: RussianNumber[] = [
  { digit: 1, word: 'Один', emoji: '1️⃣', objects: OBJECT_EMOJI.repeat(1) },
  { digit: 2, word: 'Два', emoji: '2️⃣', objects: OBJECT_EMOJI.repeat(2) },
  { digit: 3, word: 'Три', emoji: '3️⃣', objects: OBJECT_EMOJI.repeat(3) },
  { digit: 4, word: 'Четыре', emoji: '4️⃣', objects: OBJECT_EMOJI.repeat(4) },
  { digit: 5, word: 'Пять', emoji: '5️⃣', objects: OBJECT_EMOJI.repeat(5) },
  { digit: 6, word: 'Шесть', emoji: '6️⃣', objects: OBJECT_EMOJI.repeat(6) },
  { digit: 7, word: 'Семь', emoji: '7️⃣', objects: OBJECT_EMOJI.repeat(7) },
  { digit: 8, word: 'Восемь', emoji: '8️⃣', objects: OBJECT_EMOJI.repeat(8) },
  { digit: 9, word: 'Девять', emoji: '9️⃣', objects: OBJECT_EMOJI.repeat(9) },
  { digit: 10, word: 'Десять', emoji: '🔟', objects: OBJECT_EMOJI.repeat(10) },
];
