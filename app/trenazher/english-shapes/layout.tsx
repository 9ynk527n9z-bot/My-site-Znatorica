import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Формы на английском — тренажёр Circle, Square, Triangle, Star, Heart',
  description: 'Интерактивный тренажёр английских названий геометрических форм для детей: Circle, Square, Triangle, Star, Heart и другие.',
  alternates: { canonical: '/trenazher/english-shapes' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
