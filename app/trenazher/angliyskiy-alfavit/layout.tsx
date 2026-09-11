import type { Metadata } from 'next';
import PageJsonLd from '@/components/PageJsonLd';

export const metadata: Metadata = {
  title: 'Английский алфавит — тренажёр с картинками и озвучкой',
  description:
    'Интерактивный тренажёр английского алфавита: буква, транскрипция, слово с картинкой и английская озвучка для каждой буквы от A до Z.',
  alternates: { canonical: '/trenazher/angliyskiy-alfavit' },
};

export default function EnglishAlphabetLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageJsonLd metadata={metadata} section="trenazher" />
      {children}
    </>
  );
}
