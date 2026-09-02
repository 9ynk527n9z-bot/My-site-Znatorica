import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Ребусы — тренажёр для 2 класса',
  description:
    'Разгадай 10 ребусов из букв и цифр, выбирая правильное слово из четырёх вариантов. Тренирует внимание, чтение и словарный запас второклассника.',
  alternates: { canonical: '/trenazher/rebusy-2klass' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
