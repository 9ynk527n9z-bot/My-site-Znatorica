// Числовая пирамида: в нижнем ряду — числа, каждая клетка выше — сумма двух
// соседних клеток снизу. Ребёнок складывает пары и заполняет пирамиду до вершины.
export interface NumberPyramid {
  rows: number[][]; // rows[0] — нижний ряд (дано), rows[rows.length-1] — вершина (один элемент)
}

export type PyramidBase = 3 | 4 | 5;

const MAX_BASE_VALUE: Record<PyramidBase, number> = {
  3: 9,
  4: 12,
  5: 9,
};

function randInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

export function generateNumberPyramid(base: PyramidBase): NumberPyramid {
  const maxVal = MAX_BASE_VALUE[base];
  const bottom = Array.from({ length: base }, () => randInt(1, maxVal));

  const rows: number[][] = [bottom];
  let current = bottom;
  while (current.length > 1) {
    const next: number[] = [];
    for (let i = 0; i < current.length - 1; i++) {
      next.push(current[i] + current[i + 1]);
    }
    rows.push(next);
    current = next;
  }

  return { rows };
}
