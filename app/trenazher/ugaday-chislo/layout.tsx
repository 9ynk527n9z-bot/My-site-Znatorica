import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Угадай число — игра с подсказками больше/меньше',
  description:
    'Компьютер загадал число — найди его за минимум попыток с подсказками «больше» и «меньше».',
  alternates: { canonical: '/trenazher/ugaday-chislo' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
