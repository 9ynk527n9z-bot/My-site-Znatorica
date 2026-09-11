import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Школьные принадлежности по-английски',
  description:
    'Тренажёр английских слов на тему школьных принадлежностей для детей 4–7 лет: слово, транскрипция, перевод и английская озвучка.',
  alternates: { canonical: '/trenazher/english-school' },
};

export default function EnglishSchoolLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
