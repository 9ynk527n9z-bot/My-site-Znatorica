import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Счёт по-английски до 20 — тренажёр с транскрипцией и озвучкой',
  description:
    'Интерактивный тренажёр английских числительных от 1 до 20: число, транскрипция и озвучка британским произношением для каждого числа.',
  alternates: { canonical: '/trenazher/angliyskiy-schet' },
};

export default function EnglishNumbersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
