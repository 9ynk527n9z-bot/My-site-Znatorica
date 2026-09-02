// Задания для тренажёра "Грамматика (английский, 3 класс)".
// Тема: to be (am/is/are), окончание -s/-es в Present Simple (he/she/it),
// множественное число существительных (-s/-es).
// Каждое задание — простое, бесспорное правило, без спорных случаев.
// Формат: sentence с "___" на месте пропуска, options — 4 варианта, answer — индекс верного.

export interface GrammarTask {
  id: string;
  sentence: string; // предложение с "___" вместо пропуска
  options: string[]; // 4 варианта
  answer: number; // индекс правильного варианта в options
  hint: string; // короткая подсказка/правило по-русски
}

export const GRAMMAR_TASKS: GrammarTask[] = [
  {
    id: 'tobe-1',
    sentence: 'I ___ a student.',
    options: ['am', 'is', 'are', 'be'],
    answer: 0,
    hint: 'С "I" всегда используется "am".',
  },
  {
    id: 'tobe-2',
    sentence: 'She ___ my sister.',
    options: ['am', 'are', 'is', 'be'],
    answer: 2,
    hint: 'С "he/she/it" используется "is".',
  },
  {
    id: 'tobe-3',
    sentence: 'They ___ happy today.',
    options: ['is', 'am', 'are', 'be'],
    answer: 2,
    hint: 'С "we/you/they" используется "are".',
  },
  {
    id: 'tobe-4',
    sentence: 'We ___ at school now.',
    options: ['is', 'am', 'be', 'are'],
    answer: 3,
    hint: 'С "we/you/they" используется "are".',
  },
  {
    id: 'tobe-5',
    sentence: 'It ___ a big dog.',
    options: ['is', 'am', 'are', 'be'],
    answer: 0,
    hint: 'С "he/she/it" используется "is".',
  },
  {
    id: 'tobe-6',
    sentence: 'You ___ my best friend.',
    options: ['is', 'am', 'are', 'be'],
    answer: 2,
    hint: 'С "we/you/they" используется "are".',
  },
  {
    id: 'presimple-1',
    sentence: 'She ___ to school every day.',
    options: ['go', 'goes', 'going', 'went'],
    answer: 1,
    hint: 'С "he/she/it" в Present Simple добавляем -es к go: goes.',
  },
  {
    id: 'presimple-2',
    sentence: 'He ___ football every weekend.',
    options: ['play', 'plays', 'playing', 'played'],
    answer: 1,
    hint: 'С "he/she/it" в Present Simple добавляем -s: plays.',
  },
  {
    id: 'presimple-3',
    sentence: 'My cat ___ milk every morning.',
    options: ['drink', 'drinking', 'drinks', 'drank'],
    answer: 2,
    hint: 'С "it" (my cat) добавляем -s: drinks.',
  },
  {
    id: 'presimple-4',
    sentence: 'I ___ books every evening.',
    options: ['read', 'reads', 'reading', 'readed'],
    answer: 0,
    hint: 'С "I" глагол без окончания: read.',
  },
  {
    id: 'presimple-5',
    sentence: 'We ___ English on Mondays.',
    options: ['study', 'studies', 'studying', 'studyes'],
    answer: 0,
    hint: 'С "we" глагол без окончания: study.',
  },
  {
    id: 'presimple-6',
    sentence: 'My brother ___ his teeth twice a day.',
    options: ['brush', 'brushing', 'brushes', 'brushed'],
    answer: 2,
    hint: 'Глагол на -sh с "he" получает окончание -es: brushes.',
  },
  {
    id: 'plural-1',
    sentence: 'I have two ___.',
    options: ['dog', 'dogs', 'doges', 'dogies'],
    answer: 1,
    hint: 'Множественное число большинства существительных: -s → dogs.',
  },
  {
    id: 'plural-2',
    sentence: 'She has three ___.',
    options: ['box', 'boxs', 'boxes', 'boxies'],
    answer: 2,
    hint: 'Существительные на -x получают окончание -es: boxes.',
  },
  {
    id: 'plural-3',
    sentence: 'There are five ___ in the classroom.',
    options: ['book', 'bookes', 'books', 'bookies'],
    answer: 2,
    hint: 'Множественное число большинства существительных: -s → books.',
  },
  {
    id: 'plural-4',
    sentence: 'I can see two ___ in the sky.',
    options: ['star', 'stares', 'stars', 'starss'],
    answer: 2,
    hint: 'Множественное число большинства существительных: -s → stars.',
  },
  {
    id: 'plural-5',
    sentence: 'We have four ___ at home.',
    options: ['chairs', 'chair', 'chaires', 'chairies'],
    answer: 0,
    hint: 'Множественное число большинства существительных: -s → chairs.',
  },
];
