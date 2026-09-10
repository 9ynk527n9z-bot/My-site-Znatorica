'use client';

import PropisiLettersGenerator from '@/components/generators/PropisiLettersGenerator';

export default function PropisiRuPage() {
  return (
    <PropisiLettersGenerator
      h1="Генератор прописей"
      intro="Выбери буквы русского алфавита — получится страница для обводки и самостоятельного письма."
      filenamePrefix="propisi-ru"
      aboutRoute="/generator/propisi-ru"
    />
  );
}
