// Слова для тренажёра «Жи-ши, ча-ща, чу-щу» (1 класс).
// Правило словарное — не проверяется ударением, поэтому checkWord/checkHint
// здесь не нужны (в отличие от безударных гласных): вместо подсказки-проверки
// показываем короткое напоминание правила.

export interface ZhiShiWord {
  /** Слово с пропуском вместо гласной после Ж/Ш/Ч/Щ, например "маш_на" */
  display: string;
  /** Правильная буква */
  answer: string;
  /** Слово целиком для подсказки после ошибки */
  fullWord: string;
  /** Правило-подсказка, которое показываем при ошибке */
  rule: string;
  /** Варианты букв на выбор — правильная + контрастная неправильная */
  options: string[];
}

export const ZHI_SHI_WORDS: ZhiShiWord[] = [
  // жи-ши → всегда И
  { display: 'маш_на', answer: 'и', fullWord: 'машина', rule: 'жи-ши пиши с буквой И', options: ['и', 'ы'] },
  { display: 'ж_знь', answer: 'и', fullWord: 'жизнь', rule: 'жи-ши пиши с буквой И', options: ['и', 'ы'] },
  { display: 'ш_на', answer: 'и', fullWord: 'шина', rule: 'жи-ши пиши с буквой И', options: ['и', 'ы'] },
  { display: 'лыж_', answer: 'и', fullWord: 'лыжи', rule: 'жи-ши пиши с буквой И', options: ['и', 'ы'] },
  { display: 'еж_', answer: 'и', fullWord: 'ежи', rule: 'жи-ши пиши с буквой И', options: ['и', 'ы'] },
  { display: 'ж_раф', answer: 'и', fullWord: 'жираф', rule: 'жи-ши пиши с буквой И', options: ['и', 'ы'] },
  { display: 'ш_пы', answer: 'и', fullWord: 'шипы', rule: 'жи-ши пиши с буквой И', options: ['и', 'ы'] },
  { display: 'пиш_', answer: 'и', fullWord: 'пиши', rule: 'жи-ши пиши с буквой И', options: ['и', 'ы'] },
  { display: 'мыш_', answer: 'и', fullWord: 'мыши', rule: 'жи-ши пиши с буквой И', options: ['и', 'ы'] },

  // ча-ща → всегда А
  { display: 'ч_шка', answer: 'а', fullWord: 'чашка', rule: 'ча-ща пиши с буквой А', options: ['а', 'я'] },
  { display: 'рощ_', answer: 'а', fullWord: 'роща', rule: 'ча-ща пиши с буквой А', options: ['а', 'я'] },
  { display: 'ч_йка', answer: 'а', fullWord: 'чайка', rule: 'ча-ща пиши с буквой А', options: ['а', 'я'] },
  { display: 'пищ_', answer: 'а', fullWord: 'пища', rule: 'ча-ща пиши с буквой А', options: ['а', 'я'] },
  { display: 'туч_', answer: 'а', fullWord: 'туча', rule: 'ча-ща пиши с буквой А', options: ['а', 'я'] },
  { display: 'ч_сы', answer: 'а', fullWord: 'часы', rule: 'ча-ща пиши с буквой А', options: ['а', 'я'] },

  // чу-щу → всегда У
  { display: 'ч_до', answer: 'у', fullWord: 'чудо', rule: 'чу-щу пиши с буквой У', options: ['у', 'ю'] },
  { display: 'щ_ка', answer: 'у', fullWord: 'щука', rule: 'чу-щу пиши с буквой У', options: ['у', 'ю'] },
  { display: 'ч_лки', answer: 'у', fullWord: 'чулки', rule: 'чу-щу пиши с буквой У', options: ['у', 'ю'] },
  { display: 'ч_жой', answer: 'у', fullWord: 'чужой', rule: 'чу-щу пиши с буквой У', options: ['у', 'ю'] },
  { display: 'ч_вство', answer: 'у', fullWord: 'чувство', rule: 'чу-щу пиши с буквой У', options: ['у', 'ю'] },
];
