import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Счёт по-английски до 20 — тренажёр',
  description:
    'Интерактивный тренажёр английских числительных от 1 до 20: число, транскрипция и озвучка британским произношением для каждого числа.',
  alternates: { canonical: '/trenazher/angliyskiy-schet' },
};

export default function EnglishNumbersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
