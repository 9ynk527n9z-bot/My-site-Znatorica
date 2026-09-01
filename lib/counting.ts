import { SHAPES, COLORS, type ShapeKind } from './shapes';

// Счёт предметов — базовое дошкольное упражнение: посчитать сколько фигурок
// на строке и вписать число в клетку. Переиспользует ShapeSvg/SHAPES/COLORS,
// уже созданные для тренажёров («Найди лишнее» и т.д.).
export interface CountingItem {
  shape: ShapeKind;
  color: string;
  count: number;
}

export function generateCountingItems(maxCount: number, count: number): CountingItem[] {
  const items: CountingItem[] = [];
  for (let i = 0; i < count; i++) {
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const n = 1 + Math.floor(Math.random() * maxCount);
    items.push({ shape, color, count: n });
  }
  return items;
}
