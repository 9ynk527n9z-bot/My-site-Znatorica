export type PairType = 'synonym' | 'antonym';

export interface SinonimAntonimItem {
  word: string;
  type: PairType;
  correct: string;
  distractors: [string, string, string];
}

// 16 однозначных заданий: 8 «найди синоним», 8 «найди антоним».
// Каждая пара дважды перепроверена — среди вариантов только один подходит
// по смыслу, остальные явно не подходят (не синонимы и не антонимы к слову).
export const SINONIMY_ANTONIMY_2KLASS: SinonimAntonimItem[] = [
  // Синонимы — слова, близкие по значению
  { word: 'БОЛЬШОЙ', type: 'synonym', correct: 'ОГРОМНЫЙ', distractors: ['МАЛЕНЬКИЙ', 'ХОЛОДНЫЙ', 'БЫСТРЫЙ'] },
  { word: 'БЫСТРЫЙ', type: 'synonym', correct: 'СКОРЫЙ', distractors: ['МЕДЛЕННЫЙ', 'ТЯЖЁЛЫЙ', 'ДОБРЫЙ'] },
  { word: 'ВЕСЁЛЫЙ', type: 'synonym', correct: 'РАДОСТНЫЙ', distractors: ['ГРУСТНЫЙ', 'ТЁМНЫЙ', 'ТИХИЙ'] },
  { word: 'ХРАБРЫЙ', type: 'synonym', correct: 'СМЕЛЫЙ', distractors: ['ТРУСЛИВЫЙ', 'ЛЕНИВЫЙ', 'СЛАБЫЙ'] },
  { word: 'КРАСИВЫЙ', type: 'synonym', correct: 'ПРЕКРАСНЫЙ', distractors: ['НЕКРАСИВЫЙ', 'СКУЧНЫЙ', 'ПУСТОЙ'] },
  { word: 'УМНЫЙ', type: 'synonym', correct: 'СООБРАЗИТЕЛЬНЫЙ', distractors: ['ГЛУПЫЙ', 'ЛЕНИВЫЙ', 'ГРОМКИЙ'] },
  { word: 'ГРУСТНЫЙ', type: 'synonym', correct: 'ПЕЧАЛЬНЫЙ', distractors: ['ВЕСЁЛЫЙ', 'ЯРКИЙ', 'ГОРЯЧИЙ'] },
  { word: 'СИЛЬНЫЙ', type: 'synonym', correct: 'МОГУЧИЙ', distractors: ['СЛАБЫЙ', 'МЯГКИЙ', 'ХОЛОДНЫЙ'] },

  // Антонимы — слова с противоположным значением
  { word: 'БОЛЬШОЙ', type: 'antonym', correct: 'МАЛЕНЬКИЙ', distractors: ['ОГРОМНЫЙ', 'БЫСТРЫЙ', 'КРАСИВЫЙ'] },
  { word: 'БЫСТРЫЙ', type: 'antonym', correct: 'МЕДЛЕННЫЙ', distractors: ['СКОРЫЙ', 'ХОЛОДНЫЙ', 'ДОБРЫЙ'] },
  { word: 'ВЕСЁЛЫЙ', type: 'antonym', correct: 'ГРУСТНЫЙ', distractors: ['РАДОСТНЫЙ', 'СВЕТЛЫЙ', 'МЯГКИЙ'] },
  { word: 'ХРАБРЫЙ', type: 'antonym', correct: 'ТРУСЛИВЫЙ', distractors: ['СМЕЛЫЙ', 'СИЛЬНЫЙ', 'УМНЫЙ'] },
  { word: 'ГОРЯЧИЙ', type: 'antonym', correct: 'ХОЛОДНЫЙ', distractors: ['МОКРЫЙ', 'ЛЁГКИЙ', 'ГРОМКИЙ'] },
  { word: 'ДЕНЬ', type: 'antonym', correct: 'НОЧЬ', distractors: ['ВЕЧЕР', 'ГОД', 'НЕДЕЛЯ'] },
  { word: 'ВЫСОКИЙ', type: 'antonym', correct: 'НИЗКИЙ', distractors: ['ШИРОКИЙ', 'ТЯЖЁЛЫЙ', 'МЯГКИЙ'] },
  { word: 'ЧИСТЫЙ', type: 'antonym', correct: 'ГРЯЗНЫЙ', distractors: ['СВЕЖИЙ', 'ТЁПЛЫЙ', 'БЫСТРЫЙ'] },
];
