import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '1 класс — математика, русский язык, чтение',
  description:
    'Материалы для 1 класса: сложение и вычитание в пределах 10, письмо, пунктуация, литературное чтение. Теория, тренажёры и шпаргалки.',
  alternates: { canonical: '/1-klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
