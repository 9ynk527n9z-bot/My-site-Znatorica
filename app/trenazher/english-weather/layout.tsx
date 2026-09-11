import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Погода по-английски — тренажёр для детей',
  description:
    'Тренажёр английских слов на тему погоды для детей 4–7 лет: слово, транскрипция, перевод и английская озвучка.',
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
