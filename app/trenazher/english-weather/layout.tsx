import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Погода по-английски — интерактивный тренажёр для детей',
  description:
    'Бесплатный интерактивный тренажёр английских слов на тему погоды: слово, транскрипция и озвучка британским произношением для детей 4–7 лет.',
  alternates: { canonical: '/trenazher/english-weather' },
};

export default function EnglishWeatherLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
