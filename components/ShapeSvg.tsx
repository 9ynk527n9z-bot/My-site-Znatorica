import type { ShapeKind } from '@/lib/shapes';

export default function ShapeSvg({ kind, color, size }: { kind: ShapeKind; color: string; size: number }) {
  switch (kind) {
    case 'circle':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill={color} />
        </svg>
      );
    case 'square':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <rect x="8" y="8" width="84" height="84" rx="14" fill={color} />
        </svg>
      );
    case 'triangle':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <polygon points="50,6 95,92 5,92" fill={color} />
        </svg>
      );
    case 'star':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <polygon
            points="50,4 61,37 96,37 68,58 79,92 50,71 21,92 32,58 4,37 39,37"
            fill={color}
          />
        </svg>
      );
    case 'heart':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100">
          <path
            d="M50 90 C20 65 5 45 5 27 C5 10 20 2 33 2 C42 2 48 8 50 14 C52 8 58 2 67 2 C80 2 95 10 95 27 C95 45 80 65 50 90 Z"
            fill={color}
          />
        </svg>
      );
  }
}
