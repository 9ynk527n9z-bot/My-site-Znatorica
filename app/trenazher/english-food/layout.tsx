import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Еда по-английски — интерактивный тренажёр для детей',
  description:
    'Тренажёр английских слов на тему еды для детей 4–7 лет: слово, транскрипция, перевод и английская озвучка.',
  alternates: { canonical: '/trenazher/english-food' },
};

export default function EnglishFoodLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
