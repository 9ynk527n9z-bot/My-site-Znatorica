import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Единицы измерения — тренажёр для 4 класса',
  description:
    'Переводи величины длины (км, м, дм, см), массы (кг, г) и времени (ч, мин, с) друг в друга и выбирай правильный ответ из вариантов. 10 раундов на смекалку.',
  alternates: { canonical: '/trenazher/edinitsy-izmereniya-4klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
