// Банк отрывков для тренажёра «Стили речи» (4 класс).
// Используются ТОЛЬКО три стиля, упомянутые в теме app/4-klass/russkiy/stili-rechi:
// разговорный, художественный, деловой (официальный).
// Каждый отрывок — однозначный, бесспорный пример одного стиля.

export type SpeechStyle = 'razgovornyy' | 'hudozhestvennyy' | 'delovoy';

export const STYLE_LABELS: Record<SpeechStyle, string> = {
  razgovornyy: 'Разговорный',
  hudozhestvennyy: 'Художественный',
  delovoy: 'Деловой',
};

export interface SpeechSnippet {
  text: string;
  style: SpeechStyle;
}

export const SPEECH_SNIPPETS: SpeechSnippet[] = [
  // Разговорный стиль — простые слова, короткие фразы, обычное общение
  { text: 'Привет! Как дела? Пойдём сегодня гулять?', style: 'razgovornyy' },
  { text: 'Слушай, а ты домашку по математике сделал?', style: 'razgovornyy' },
  { text: 'Ой, я совсем забыла зонт дома! Теперь под дождём бежать.', style: 'razgovornyy' },
  { text: 'Мам, а что на обед? Я жутко проголодался!', style: 'razgovornyy' },
  { text: 'Вась, давай в футбол после уроков сыграем, а?', style: 'razgovornyy' },

  // Художественный стиль — яркие сравнения и образные описания
  { text: 'Золотое солнце ласково гладило верхушки деревьев.', style: 'hudozhestvennyy' },
  { text: 'Снежинки кружились в воздухе, будто маленькие балерины.', style: 'hudozhestvennyy' },
  { text: 'Осенний лес пылал багряным и золотым огнём.', style: 'hudozhestvennyy' },
  { text: 'Тихая речка серебристой лентой вилась среди зелёных лугов.', style: 'hudozhestvennyy' },
  { text: 'Ветер шептал что-то таинственное листьям старого дуба.', style: 'hudozhestvennyy' },

  // Деловой (официальный) стиль — точные, строгие формулировки без эмоций
  { text: 'Собрание родителей состоится в 15:00 в кабинете №12.', style: 'delovoy' },
  { text: 'Просьба сдать учебники в библиотеку до 25 мая.', style: 'delovoy' },
  { text: 'Приём заявлений в первый класс проводится с 1 апреля.', style: 'delovoy' },
  { text: 'Экскурсия в музей назначена на среду, начало в 10:00.', style: 'delovoy' },
];
