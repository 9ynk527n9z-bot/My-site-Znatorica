export interface EnglishNumber {
  value: number;
  word: string;
  transcription: string; // МФА-транскрипция (британский вариант)
}

export const ENGLISH_NUMBERS: EnglishNumber[] = [
  { value: 1, word: 'One', transcription: '/wʌn/' },
  { value: 2, word: 'Two', transcription: '/tuː/' },
  { value: 3, word: 'Three', transcription: '/θriː/' },
  { value: 4, word: 'Four', transcription: '/fɔː/' },
  { value: 5, word: 'Five', transcription: '/faɪv/' },
  { value: 6, word: 'Six', transcription: '/sɪks/' },
  { value: 7, word: 'Seven', transcription: '/ˈsɛvən/' },
  { value: 8, word: 'Eight', transcription: '/eɪt/' },
  { value: 9, word: 'Nine', transcription: '/naɪn/' },
  { value: 10, word: 'Ten', transcription: '/tɛn/' },
  { value: 11, word: 'Eleven', transcription: '/ɪˈlɛvən/' },
  { value: 12, word: 'Twelve', transcription: '/twɛlv/' },
  { value: 13, word: 'Thirteen', transcription: '/θɜːˈtiːn/' },
  { value: 14, word: 'Fourteen', transcription: '/ˌfɔːˈtiːn/' },
  { value: 15, word: 'Fifteen', transcription: '/ˌfɪfˈtiːn/' },
  { value: 16, word: 'Sixteen', transcription: '/ˌsɪkˈstiːn/' },
  { value: 17, word: 'Seventeen', transcription: '/ˌsɛvənˈtiːn/' },
  { value: 18, word: 'Eighteen', transcription: '/ˌeɪˈtiːn/' },
  { value: 19, word: 'Nineteen', transcription: '/ˌnaɪnˈtiːn/' },
  { value: 20, word: 'Twenty', transcription: '/ˈtwɛnti/' },
];
