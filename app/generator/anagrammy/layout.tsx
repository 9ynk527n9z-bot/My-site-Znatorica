import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Генератор анаграмм — разгадай перемешанное слово',
  description: 'Создавайте анаграммы по темам: еда, животные, насекомые, цветы, одежда, спорт. Буквы перемешаны — разгадай слово по подсказке.',
  alternates: { canonical: '/generator/anagrammy' },
};

export default function AnagrammyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
