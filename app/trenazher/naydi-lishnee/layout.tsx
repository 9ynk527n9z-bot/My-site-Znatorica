import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Найди лишнее — тренажёр логики для дошкольников',
  description: 'Интерактивный тренажёр «Найди лишнее»: по форме, цвету и размеру. Развивает логическое мышление у дошкольников.',
  alternates: { canonical: '/trenazher/naydi-lishnee' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
