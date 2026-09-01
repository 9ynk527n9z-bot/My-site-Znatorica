export interface AlphabetLetter {
  letter: string;
  transcription: string; // МФА-транскрипция названия буквы (британский вариант)
  word: string;
  wordRu: string;
  emoji: string;
}

export const ENGLISH_ALPHABET: AlphabetLetter[] = [
  { letter: 'A', transcription: '/eɪ/', word: 'Apple', wordRu: 'яблоко', emoji: '🍎' },
  { letter: 'B', transcription: '/biː/', word: 'Ball', wordRu: 'мяч', emoji: '⚽' },
  { letter: 'C', transcription: '/siː/', word: 'Cat', wordRu: 'кот', emoji: '🐱' },
  { letter: 'D', transcription: '/diː/', word: 'Dog', wordRu: 'собака', emoji: '🐶' },
  { letter: 'E', transcription: '/iː/', word: 'Elephant', wordRu: 'слон', emoji: '🐘' },
  { letter: 'F', transcription: '/ɛf/', word: 'Fish', wordRu: 'рыба', emoji: '🐟' },
  { letter: 'G', transcription: '/dʒiː/', word: 'Grapes', wordRu: 'виноград', emoji: '🍇' },
  { letter: 'H', transcription: '/eɪtʃ/', word: 'House', wordRu: 'дом', emoji: '🏠' },
  { letter: 'I', transcription: '/aɪ/', word: 'Ice cream', wordRu: 'мороженое', emoji: '🍦' },
  { letter: 'J', transcription: '/dʒeɪ/', word: 'Juice', wordRu: 'сок', emoji: '🧃' },
  { letter: 'K', transcription: '/keɪ/', word: 'Kite', wordRu: 'воздушный змей', emoji: '🪁' },
  { letter: 'L', transcription: '/ɛl/', word: 'Lion', wordRu: 'лев', emoji: '🦁' },
  { letter: 'M', transcription: '/ɛm/', word: 'Moon', wordRu: 'луна', emoji: '🌙' },
  { letter: 'N', transcription: '/ɛn/', word: 'Nest', wordRu: 'гнездо', emoji: '🪺' },
  { letter: 'O', transcription: '/əʊ/', word: 'Orange', wordRu: 'апельсин', emoji: '🍊' },
  { letter: 'P', transcription: '/piː/', word: 'Pig', wordRu: 'свинья', emoji: '🐷' },
  { letter: 'Q', transcription: '/kjuː/', word: 'Queen', wordRu: 'королева', emoji: '👑' },
  { letter: 'R', transcription: '/ɑː/', word: 'Rainbow', wordRu: 'радуга', emoji: '🌈' },
  { letter: 'S', transcription: '/ɛs/', word: 'Sun', wordRu: 'солнце', emoji: '☀️' },
  { letter: 'T', transcription: '/tiː/', word: 'Tree', wordRu: 'дерево', emoji: '🌳' },
  { letter: 'U', transcription: '/juː/', word: 'Umbrella', wordRu: 'зонт', emoji: '☂️' },
  { letter: 'V', transcription: '/viː/', word: 'Violin', wordRu: 'скрипка', emoji: '🎻' },
  { letter: 'W', transcription: '/ˈdʌbəljuː/', word: 'Watermelon', wordRu: 'арбуз', emoji: '🍉' },
  { letter: 'X', transcription: '/ɛks/', word: 'X-ray', wordRu: 'рентген', emoji: '🩻' },
  { letter: 'Y', transcription: '/waɪ/', word: 'Yo-yo', wordRu: 'йо-йо', emoji: '🪀' },
  { letter: 'Z', transcription: '/zɛd/', word: 'Zebra', wordRu: 'зебра', emoji: '🦓' },
];
