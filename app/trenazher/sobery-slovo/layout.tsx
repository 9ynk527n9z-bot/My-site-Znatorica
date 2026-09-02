import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Собери слово — расставь буквы правильно',
  description: 'Расставь перепутанные буквы в правильном порядке и собери слово. Игра для тренировки внимания и грамотности.',
  alternates: { canonical: '/trenazher/sobery-slovo' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
