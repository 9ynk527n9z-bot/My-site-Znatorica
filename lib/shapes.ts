export type ShapeKind = 'circle' | 'square' | 'triangle' | 'star' | 'heart';

export const SHAPES: ShapeKind[] = ['circle', 'square', 'triangle', 'star', 'heart'];
export const COLORS = ['#FF4D6D', '#4DABF7', '#69DB7C', '#FFD43B', '#DA77F2', '#FFA94D', '#3BC9DB'];
export const SIZES = [56, 84, 118]; // маленький, средний, большой (px) — для «Найди лишнее»

// Более широкая шкала размеров для «Собери по порядку» — 5 отчётливо разных
// величин, чтобы сортировка была содержательной задачей, а не тривиальной.
export const ORDER_SIZES = [36, 58, 80, 102, 124];

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function randItem<T>(arr: T[], exclude?: T): T {
  const pool = exclude !== undefined ? arr.filter((x) => x !== exclude) : arr;
  return pool[Math.floor(Math.random() * pool.length)];
}
