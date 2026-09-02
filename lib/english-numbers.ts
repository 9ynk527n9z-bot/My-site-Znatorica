export interface EnglishNumber {
  value: number;
  word: string;
  transcription: string; // МФА-транскрипция (британский вариант)
  objects: string; // Строка из emoji-предметов, повторенных ровно value раз — для визуализации количества.
}

// Разные предметы по кругу — чтобы карточки с числами не были все с одним и тем же
// яблоком, как в русском варианте, а выглядели разнообразнее.
const OBJECT_PALETTE = ['🍎', '🐝', '⭐', '🎈', '🐟', '🍓', '🌸', '🐸', '🚗', '🎵'];
const objectsFor = (value: number) => OBJECT_PALETTE[(value - 1) % OBJECT_PALETTE.length].repeat(value);

export const ENGLISH_NUMBERS: EnglishNumber[] = [
  { value: 1, word: 'One', transcription: '/wʌn/', objects: objectsFor(1) },
  { value: 2, word: 'Two', transcription: '/tuː/', objects: objectsFor(2) },
  { value: 3, word: 'Three', transcription: '/θriː/', objects: objectsFor(3) },
  { value: 4, word: 'Four', transcription: '/fɔː/', objects: objectsFor(4) },
  { value: 5, word: 'Five', transcription: '/faɪv/', objects: objectsFor(5) },
  { value: 6, word: 'Six', transcription: '/sɪks/', objects: objectsFor(6) },
  { value: 7, word: 'Seven', transcription: '/ˈsɛvən/', objects: objectsFor(7) },
  { value: 8, word: 'Eight', transcription: '/eɪt/', objects: objectsFor(8) },
  { value: 9, word: 'Nine', transcription: '/naɪn/', objects: objectsFor(9) },
  { value: 10, word: 'Ten', transcription: '/tɛn/', objects: objectsFor(10) },
  { value: 11, word: 'Eleven', transcription: '/ɪˈlɛvən/', objects: objectsFor(11) },
  { value: 12, word: 'Twelve', transcription: '/twɛlv/', objects: objectsFor(12) },
  { value: 13, word: 'Thirteen', transcription: '/θɜːˈtiːn/', objects: objectsFor(13) },
  { value: 14, word: 'Fourteen', transcription: '/ˌfɔːˈtiːn/', objects: objectsFor(14) },
  { value: 15, word: 'Fifteen', transcription: '/ˌfɪfˈtiːn/', objects: objectsFor(15) },
  { value: 16, word: 'Sixteen', transcription: '/ˌsɪkˈstiːn/', objects: objectsFor(16) },
  { value: 17, word: 'Seventeen', transcription: '/ˌsɛvənˈtiːn/', objects: objectsFor(17) },
  { value: 18, word: 'Eighteen', transcription: '/ˌeɪˈtiːn/', objects: objectsFor(18) },
  { value: 19, word: 'Nineteen', transcription: '/ˌnaɪnˈtiːn/', objects: objectsFor(19) },
  { value: 20, word: 'Twenty', transcription: '/ˈtwɛnti/', objects: objectsFor(20) },
];
