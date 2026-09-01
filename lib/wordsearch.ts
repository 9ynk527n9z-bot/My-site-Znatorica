import { CROSSWORD_THEMES, type CrosswordTheme } from './crossword';

export interface PlacedSearchWord {
  word: string;
  clue: string;
  cells: [number, number][];
}

export interface WordSearchResult {
  grid: string[][];
  words: PlacedSearchWord[];
  size: number;
}

// Направления только "вперёд" (вправо, вниз, по диагонали вниз) — без разворотов
// задом наперёд, чтобы детям было проще искать слова.
const DIRECTIONS: [number, number][] = [
  [0, 1], // вправо
  [1, 0], // вниз
  [1, 1], // вниз-вправо
  [1, -1], // вниз-влево
];

const FILLER_ALPHABET = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateWordSearch(theme: CrosswordTheme, wordCount = 8): WordSearchResult {
  const pool = shuffle(CROSSWORD_THEMES[theme].words).slice(0, wordCount);
  const maxLen = Math.max(...pool.map((w) => w.word.length));
  const size = Math.max(10, maxLen + 2);

  const grid: (string | null)[][] = Array.from({ length: size }, () => Array(size).fill(null));
  const placedWords: PlacedSearchWord[] = [];

  for (const { word, clue } of pool) {
    let placed = false;
    const dirsShuffled = shuffle(DIRECTIONS);

    for (let attempt = 0; attempt < 200 && !placed; attempt++) {
      const dir = dirsShuffled[attempt % dirsShuffled.length];
      const startRow = Math.floor(Math.random() * size);
      const startCol = Math.floor(Math.random() * size);
      const endRow = startRow + dir[0] * (word.length - 1);
      const endCol = startCol + dir[1] * (word.length - 1);
      if (endRow < 0 || endRow >= size || endCol < 0 || endCol >= size) continue;

      let canPlace = true;
      for (let i = 0; i < word.length; i++) {
        const r = startRow + dir[0] * i;
        const c = startCol + dir[1] * i;
        const existing = grid[r][c];
        if (existing !== null && existing !== word[i]) {
          canPlace = false;
          break;
        }
      }
      if (!canPlace) continue;

      const cells: [number, number][] = [];
      for (let i = 0; i < word.length; i++) {
        const r = startRow + dir[0] * i;
        const c = startCol + dir[1] * i;
        grid[r][c] = word[i];
        cells.push([r, c]);
      }
      placedWords.push({ word, clue, cells });
      placed = true;
    }
  }

  const finalGrid: string[][] = grid.map((row) =>
    row.map((cell) => cell ?? FILLER_ALPHABET[Math.floor(Math.random() * FILLER_ALPHABET.length)])
  );

  return { grid: finalGrid, words: placedWords, size };
}
