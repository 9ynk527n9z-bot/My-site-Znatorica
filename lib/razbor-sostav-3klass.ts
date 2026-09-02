/**
 * Слова для тренажёра «Разбор слова по составу» (3 класс).
 * Разбор каждого слова дважды сверен по морфемному словарю (тип А. Н. Тихонова) —
 * используются только бесспорные случаи без морфемной омонимии.
 *
 * Тип "окончание" с text: '' означает нулевое окончание (морфема есть, но не выражена буквами).
 */

export type MorphType = 'приставка' | 'корень' | 'суффикс' | 'окончание';

export interface Morph {
  text: string;
  type: MorphType;
}

export interface WordAnalysis {
  /** Слово целиком, как оно показывается ребёнку */
  word: string;
  morphs: Morph[];
}

export const RAZBOR_WORDS: WordAnalysis[] = [
  { word: 'рука', morphs: [{ text: 'рук', type: 'корень' }, { text: 'а', type: 'окончание' }] },
  { word: 'вода', morphs: [{ text: 'вод', type: 'корень' }, { text: 'а', type: 'окончание' }] },
  { word: 'трава', morphs: [{ text: 'трав', type: 'корень' }, { text: 'а', type: 'окончание' }] },
  {
    word: 'домик',
    morphs: [
      { text: 'дом', type: 'корень' },
      { text: 'ик', type: 'суффикс' },
      { text: '', type: 'окончание' },
    ],
  },
  {
    word: 'лесник',
    morphs: [
      { text: 'лес', type: 'корень' },
      { text: 'ник', type: 'суффикс' },
      { text: '', type: 'окончание' },
    ],
  },
  {
    word: 'дождик',
    morphs: [
      { text: 'дожд', type: 'корень' },
      { text: 'ик', type: 'суффикс' },
      { text: '', type: 'окончание' },
    ],
  },
  {
    word: 'котёнок',
    morphs: [
      { text: 'кот', type: 'корень' },
      { text: 'ёнок', type: 'суффикс' },
      { text: '', type: 'окончание' },
    ],
  },
  {
    word: 'подарок',
    morphs: [
      { text: 'по', type: 'приставка' },
      { text: 'дар', type: 'корень' },
      { text: 'ок', type: 'суффикс' },
      { text: '', type: 'окончание' },
    ],
  },
  {
    word: 'подснежник',
    morphs: [
      { text: 'под', type: 'приставка' },
      { text: 'снеж', type: 'корень' },
      { text: 'ник', type: 'суффикс' },
      { text: '', type: 'окончание' },
    ],
  },
  {
    word: 'пробежка',
    morphs: [
      { text: 'про', type: 'приставка' },
      { text: 'беж', type: 'корень' },
      { text: 'к', type: 'суффикс' },
      { text: 'а', type: 'окончание' },
    ],
  },
  {
    word: 'дорожка',
    morphs: [
      { text: 'дорож', type: 'корень' },
      { text: 'к', type: 'суффикс' },
      { text: 'а', type: 'окончание' },
    ],
  },
  {
    word: 'лётчик',
    morphs: [
      { text: 'лёт', type: 'корень' },
      { text: 'чик', type: 'суффикс' },
      { text: '', type: 'окончание' },
    ],
  },
  {
    word: 'выход',
    morphs: [
      { text: 'вы', type: 'приставка' },
      { text: 'ход', type: 'корень' },
      { text: '', type: 'окончание' },
    ],
  },
  {
    word: 'переход',
    morphs: [
      { text: 'пере', type: 'приставка' },
      { text: 'ход', type: 'корень' },
      { text: '', type: 'окончание' },
    ],
  },
  {
    word: 'поход',
    morphs: [
      { text: 'по', type: 'приставка' },
      { text: 'ход', type: 'корень' },
      { text: '', type: 'окончание' },
    ],
  },
  {
    word: 'полёт',
    morphs: [
      { text: 'по', type: 'приставка' },
      { text: 'лёт', type: 'корень' },
      { text: '', type: 'окончание' },
    ],
  },
];

export function countMorphs(word: WordAnalysis, type: MorphType): number {
  return word.morphs.filter((m) => m.type === type).length;
}

export function rootText(word: WordAnalysis): string {
  return word.morphs.filter((m) => m.type === 'корень').map((m) => m.text).join('');
}
