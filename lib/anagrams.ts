import { CROSSWORD_THEMES, type CrosswordTheme } from './crossword';

export interface Anagram {
  word: string;
  clue: string;
  scrambled: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function scrambleWord(word: string): string {
  if (word.length <= 1) return word;

  let attempt = word;
  let tries = 0;
  // Пытаемся получить порядок букв, отличный от исходного слова.
  while (attempt === word && tries < 20) {
    attempt = shuffle(word.split('')).join('');
    tries++;
  }
  return attempt;
}

export function generateAnagrams(theme: CrosswordTheme, count = 8): Anagram[] {
  const pool = shuffle(CROSSWORD_THEMES[theme].words).slice(0, count);
  return pool.map(({ word, clue }) => ({
    word,
    clue,
    scrambled: scrambleWord(word),
  }));
}
