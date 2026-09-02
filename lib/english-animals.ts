export interface EnglishWord {
  word: string;
  translation: string; // перевод на русский
  transcription: string; // МФА-транскрипция (британский вариант)
  emoji: string;
}

export const ENGLISH_ANIMALS: EnglishWord[] = [
  { word: 'Cat', translation: 'кошка', transcription: '/kæt/', emoji: '🐱' },
  { word: 'Dog', translation: 'собака', transcription: '/dɒg/', emoji: '🐶' },
  { word: 'Bird', translation: 'птица', transcription: '/bɜːd/', emoji: '🐦' },
  { word: 'Fish', translation: 'рыба', transcription: '/fɪʃ/', emoji: '🐟' },
  { word: 'Rabbit', translation: 'кролик', transcription: '/ˈræbɪt/', emoji: '🐰' },
  { word: 'Horse', translation: 'лошадь', transcription: '/hɔːs/', emoji: '🐴' },
  { word: 'Cow', translation: 'корова', transcription: '/kaʊ/', emoji: '🐮' },
  { word: 'Pig', translation: 'свинья', transcription: '/pɪg/', emoji: '🐷' },
  { word: 'Duck', translation: 'утка', transcription: '/dʌk/', emoji: '🦆' },
  { word: 'Frog', translation: 'лягушка', transcription: '/frɒg/', emoji: '🐸' },
  { word: 'Bear', translation: 'медведь', transcription: '/beə/', emoji: '🐻' },
  { word: 'Lion', translation: 'лев', transcription: '/ˈlaɪən/', emoji: '🦁' },
  { word: 'Elephant', translation: 'слон', transcription: '/ˈɛlɪfənt/', emoji: '🐘' },
  { word: 'Monkey', translation: 'обезьяна', transcription: '/ˈmʌŋki/', emoji: '🐒' },
  { word: 'Mouse', translation: 'мышь', transcription: '/maʊs/', emoji: '🐭' },
];
