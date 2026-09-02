import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Еда по-английски — интерактивный тренажёр для детей',
  description:
    'Бесплатный интерактивный тренажёр английских слов на тему еды: слово, транскрипция и озвучка британским произношением для детей 4–7 лет.',
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
