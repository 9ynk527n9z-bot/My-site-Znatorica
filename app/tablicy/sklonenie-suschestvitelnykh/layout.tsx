import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Склонение имён существительных — таблица 1, 2 и 3 склонения',
  description: 'Три склонения существительных с окончаниями по падежам и примерами слов. Цветной и чёрно-белый лист для печати, PDF, Word и PNG.',
  alternates: { canonical: '/tablicy/sklonenie-suschestvitelnykh' },
};

export default function DeclensionTableLayout({ children }: { children: React.ReactNode }) {
  return children;
}
