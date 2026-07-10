export type CrosswordTheme = 'food' | 'animals' | 'insects' | 'flowers' | 'clothes' | 'sport';

interface WordClue {
  word: string;
  clue: string;
}

// Слова — только заглавные русские буквы, без пробелов и дефисов (нужно для сетки кроссворда).
export const CROSSWORD_THEMES: Record<CrosswordTheme, { title: string; icon: string; words: WordClue[] }> = {
  food: {
    title: 'Еда',
    icon: '🍎',
    words: [
      { word: 'ХЛЕБ', clue: 'Его пекут из муки, едят каждый день' },
      { word: 'МОЛОКО', clue: 'Белый напиток, который даёт корова' },
      { word: 'СЫР', clue: 'Молочный продукт, часто с дырочками, кладут в бутерброд' },
      { word: 'МЁД', clue: 'Сладкий продукт, который делают пчёлы' },
      { word: 'СУП', clue: 'Жидкое блюдо, едят ложкой' },
      { word: 'КАША', clue: 'Блюдо из крупы, часто едят на завтрак' },
      { word: 'ТОРТ', clue: 'Сладкий десерт со свечками на день рождения' },
      { word: 'СОК', clue: 'Напиток из фруктов или овощей' },
      { word: 'ЧАЙ', clue: 'Горячий напиток, заваривают в чайнике' },
      { word: 'ЯБЛОКО', clue: 'Круглый фрукт, бывает красным или зелёным' },
      { word: 'БАНАН', clue: 'Жёлтый и длинный тропический фрукт' },
      { word: 'ГРУША', clue: 'Фрукт, похожий по форме на каплю' },
      { word: 'МОРКОВЬ', clue: 'Оранжевый овощ, любит грызть заяц' },
      { word: 'КАРТОФЕЛЬ', clue: 'Овощ, из которого делают пюре и жарят' },
      { word: 'ОГУРЕЦ', clue: 'Зелёный овощ, кладут в салат' },
    ],
  },
  animals: {
    title: 'Животные',
    icon: '🐾',
    words: [
      { word: 'КОШКА', clue: 'Мурлычет и ловит мышей дома' },
      { word: 'СОБАКА', clue: 'Верный друг человека, лает' },
      { word: 'ЛОШАДЬ', clue: 'Быстрое животное, на нём катаются верхом' },
      { word: 'КОРОВА', clue: 'Даёт молоко, говорит «му»' },
      { word: 'ЗАЯЦ', clue: 'Лесной зверёк с длинными ушами' },
      { word: 'ЛИСА', clue: 'Рыжий и хитрый лесной зверь' },
      { word: 'ВОЛК', clue: 'Серый хищник, живёт стаей' },
      { word: 'МЕДВЕДЬ', clue: 'Большой зверь, спит всю зиму в берлоге' },
      { word: 'БЕЛКА', clue: 'Рыжий зверёк с пушистым хвостом, живёт на дереве' },
      { word: 'ЁЖ', clue: 'Колючий лесной зверёк' },
      { word: 'ТИГР', clue: 'Полосатая хищная кошка' },
      { word: 'СЛОН', clue: 'Самое большое сухопутное животное с хоботом' },
      { word: 'ЖИРАФ', clue: 'Животное с самой длинной шеей' },
      { word: 'ПИНГВИН', clue: 'Птица, которая не летает, а плавает' },
      { word: 'ОБЕЗЬЯНА', clue: 'Животное, которое любит бананы и лазает по деревьям' },
    ],
  },
  insects: {
    title: 'Насекомые',
    icon: '🐝',
    words: [
      { word: 'МУХА', clue: 'Надоедливое насекомое, летает и жужжит' },
      { word: 'ПЧЕЛА', clue: 'Насекомое, которое делает мёд' },
      { word: 'ОСА', clue: 'Полосатое насекомое, может ужалить' },
      { word: 'МУРАВЕЙ', clue: 'Маленькое насекомое, живёт в муравейнике' },
      { word: 'БАБОЧКА', clue: 'Насекомое с яркими крыльями' },
      { word: 'ЖУК', clue: 'Насекомое с твёрдыми крыльями-надкрыльями' },
      { word: 'КОМАР', clue: 'Маленькое насекомое, кусается летом' },
      { word: 'СТРЕКОЗА', clue: 'Насекомое с длинным телом, летает над водой' },
      { word: 'КУЗНЕЧИК', clue: 'Зелёное насекомое, умеет далеко прыгать' },
      { word: 'ШМЕЛЬ', clue: 'Пушистое и толстое жужжащее насекомое' },
      { word: 'ГУСЕНИЦА', clue: 'Из неё вырастает бабочка' },
      { word: 'СВЕРЧОК', clue: 'Насекомое, которое стрекочет по ночам' },
    ],
  },
  flowers: {
    title: 'Цветы',
    icon: '🌸',
    words: [
      { word: 'РОЗА', clue: 'Цветок с шипами, символ любви' },
      { word: 'ТЮЛЬПАН', clue: 'Весенний цветок в форме бокала' },
      { word: 'РОМАШКА', clue: 'Белый цветок с жёлтой серединкой' },
      { word: 'ЛАНДЫШ', clue: 'Лесной цветок с маленькими белыми колокольчиками' },
      { word: 'ПИОН', clue: 'Крупный пышный цветок с сильным ароматом' },
      { word: 'ВАСИЛЁК', clue: 'Синий полевой цветок среди колосьев ржи' },
      { word: 'НЕЗАБУДКА', clue: 'Маленький голубой цветок' },
      { word: 'ОДУВАНЧИК', clue: 'Жёлтый цветок, который потом становится пушистым шариком' },
      { word: 'МАК', clue: 'Ярко-красный полевой цветок' },
      { word: 'ФИАЛКА', clue: 'Небольшой фиолетовый цветок' },
      { word: 'ГЕОРГИН', clue: 'Крупный осенний цветок разных ярких цветов' },
      { word: 'КОЛОКОЛЬЧИК', clue: 'Цветок в форме маленького колокола' },
    ],
  },
  clothes: {
    title: 'Одежда',
    icon: '👕',
    words: [
      { word: 'ШУБА', clue: 'Тёплая зимняя одежда из меха' },
      { word: 'ПЛАТЬЕ', clue: 'Одежда для девочек и женщин, цельная' },
      { word: 'ЮБКА', clue: 'Женская одежда для нижней части тела' },
      { word: 'БРЮКИ', clue: 'Одежда с двумя штанинами' },
      { word: 'РУБАШКА', clue: 'Одежда с воротником и пуговицами' },
      { word: 'ФУТБОЛКА', clue: 'Летняя одежда с коротким рукавом' },
      { word: 'КУРТКА', clue: 'Верхняя одежда для прохладной погоды' },
      { word: 'ШАРФ', clue: 'Обматывают вокруг шеи в холод' },
      { word: 'ШАПКА', clue: 'Головной убор для зимы' },
      { word: 'НОСКИ', clue: 'Надевают на ноги перед обувью' },
      { word: 'САРАФАН', clue: 'Летнее платье без рукавов' },
      { word: 'ВАРЕЖКИ', clue: 'Тёплые рукавицы без отдельных пальцев' },
    ],
  },
  sport: {
    title: 'Спорт',
    icon: '⚽',
    words: [
      { word: 'ФУТБОЛ', clue: 'Игра, где забивают мяч ногами в ворота' },
      { word: 'ХОККЕЙ', clue: 'Игра на льду с клюшкой и шайбой' },
      { word: 'ТЕННИС', clue: 'Игра с ракеткой и маленьким мячом' },
      { word: 'ПЛАВАНИЕ', clue: 'Спорт, которым занимаются в бассейне' },
      { word: 'ЛЫЖИ', clue: 'На них катаются зимой по снегу' },
      { word: 'БОКС', clue: 'Спорт, где соперники бьют друг друга в перчатках' },
      { word: 'БАСКЕТБОЛ', clue: 'Игра, где мяч закидывают в кольцо' },
      { word: 'ВОЛЕЙБОЛ', clue: 'Игра, где мяч перекидывают через сетку руками' },
      { word: 'ШАХМАТЫ', clue: 'Настольная игра с королём и королевой на клетках' },
      { word: 'ГИМНАСТИКА', clue: 'Спорт с растяжкой, кувырками и лентами' },
      { word: 'БЕГ', clue: 'Самый простой вид спорта — просто быстро двигать ногами' },
      { word: 'БАДМИНТОН', clue: 'Игра, где ракеткой отбивают волан' },
    ],
  },
};

export interface PlacedWord {
  word: string;
  clue: string;
  row: number;
  col: number;
  direction: 'across' | 'down';
  number: number;
}

export interface CrosswordResult {
  grid: (string | null)[][];
  numbers: (number | null)[][];
  words: PlacedWord[];
  rows: number;
  cols: number;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateCrossword(theme: CrosswordTheme, targetCount = 8): CrosswordResult {
  const pool = shuffle(CROSSWORD_THEMES[theme].words);
  const SIZE = 21; // рабочая сетка с запасом, потом обрезаем по границам слов
  const CENTER = Math.floor(SIZE / 2);

  const cells: (string | null)[][] = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
  const placed: PlacedWord[] = [];

  function canPlace(word: string, row: number, col: number, dir: 'across' | 'down'): boolean {
    for (let i = 0; i < word.length; i++) {
      const r = dir === 'down' ? row + i : row;
      const c = dir === 'across' ? col + i : col;
      if (r < 0 || r >= SIZE || c < 0 || c >= SIZE) return false;

      const existing = cells[r][c];
      if (existing !== null && existing !== word[i]) return false;

      // Клетка не на пересечении — соседние по бокам клетки должны быть пустыми,
      // иначе слово случайно "слипнется" с соседней буквой чужого слова
      // (например, "ЖИРАФ" + случайная буква рядом читались бы как "ЖИРАФЕ").
      if (existing === null) {
        if (dir === 'across') {
          if ((cells[r - 1]?.[c] ?? null) !== null || (cells[r + 1]?.[c] ?? null) !== null) return false;
        } else {
          if ((cells[r]?.[c - 1] ?? null) !== null || (cells[r]?.[c + 1] ?? null) !== null) return false;
        }
      }
    }
    // Клетка перед началом и после конца слова должна быть пустой (не примыкать вплотную к другому слову)
    const beforeR = dir === 'down' ? row - 1 : row;
    const beforeC = dir === 'across' ? col - 1 : col;
    const afterR = dir === 'down' ? row + word.length : row;
    const afterC = dir === 'across' ? col + word.length : col;
    if (cells[beforeR]?.[beforeC]) return false;
    if (cells[afterR]?.[afterC]) return false;

    return true;
  }

  function place(word: string, clue: string, row: number, col: number, dir: 'across' | 'down') {
    for (let i = 0; i < word.length; i++) {
      const r = dir === 'down' ? row + i : row;
      const c = dir === 'across' ? col + i : col;
      cells[r][c] = word[i];
    }
    placed.push({ word, clue, row, col, direction: dir, number: 0 });
  }

  // Первое (самое длинное) слово — горизонтально в центре
  const first = pool[0];
  place(first.word, first.clue, CENTER, CENTER - Math.floor(first.word.length / 2), 'across');

  for (let idx = 1; idx < pool.length && placed.length < targetCount; idx++) {
    const { word, clue } = pool[idx];
    if (placed.some((p) => p.word === word)) continue;

    let bestPlacement: { row: number; col: number; dir: 'across' | 'down' } | null = null;

    outer: for (const p of shuffle(placed)) {
      for (let i = 0; i < word.length; i++) {
        for (let j = 0; j < p.word.length; j++) {
          if (word[i] !== p.word[j]) continue;

          const crossDir: 'across' | 'down' = p.direction === 'across' ? 'down' : 'across';
          const pRow = crossDir === 'down' ? p.row - i : p.row + j;
          const pCol = crossDir === 'across' ? p.col - i : p.col + j;

          if (canPlace(word, pRow, pCol, crossDir)) {
            bestPlacement = { row: pRow, col: pCol, dir: crossDir };
            break outer;
          }
        }
      }
    }

    if (bestPlacement) {
      place(word, clue, bestPlacement.row, bestPlacement.col, bestPlacement.dir);
    }
  }

  // Обрезаем сетку по границам занятых клеток (+1 клетка отступа)
  let minR = SIZE, maxR = 0, minC = SIZE, maxC = 0;
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (cells[r][c] !== null) {
        minR = Math.min(minR, r);
        maxR = Math.max(maxR, r);
        minC = Math.min(minC, c);
        maxC = Math.max(maxC, c);
      }
    }
  }

  const rows = maxR - minR + 1;
  const cols = maxC - minC + 1;
  const grid: (string | null)[][] = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => cells[minR + r][minC + c])
  );

  const shifted = placed.map((p) => ({ ...p, row: p.row - minR, col: p.col - minC }));

  // Нумерация клеток, с которых начинается слово (по, слева-направо, сверху-вниз)
  const numbers: (number | null)[][] = Array.from({ length: rows }, () => Array(cols).fill(null));
  const starts = new Map<string, number>();
  let counter = 1;

  const sortedByPosition = [...shifted].sort((a, b) => (a.row - b.row) || (a.col - b.col));
  for (const w of sortedByPosition) {
    const key = `${w.row},${w.col}`;
    if (!starts.has(key)) {
      starts.set(key, counter);
      numbers[w.row][w.col] = counter;
      counter++;
    }
    w.number = starts.get(key)!;
  }

  return { grid, numbers, words: shifted, rows, cols };
}
