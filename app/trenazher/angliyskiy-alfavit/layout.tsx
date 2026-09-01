import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Английский алфавит — тренажёр с картинками и озвучкой',
  description:
    'Интерактивный тренажёр английского алфавита: буква, транскрипция, слово-картинка и озвучка британским произношением для каждой буквы от A до Z.',
  alternates: { canonical: '/trenazher/angliyskiy-alfavit' },
};

export default function EnglishAlphabetLayout({ children }: { children: React.ReactNode }) {
  return children;
}
