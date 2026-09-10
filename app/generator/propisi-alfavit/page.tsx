'use client';

import PropisiLettersGenerator from '@/components/generators/PropisiLettersGenerator';

export default function Page() {
  return (
    <PropisiLettersGenerator
      h1="Прописи — весь алфавит"
      intro="Все буквы русского алфавита по порядку уже выбраны — печатные буквы, заглавные и строчные."
      defaultLetterStyle="printed"
      defaultCaseMode="both"
      defaultPreset="all"
      filenamePrefix="propisi-alfavit"
      aboutRoute="/generator/propisi-alfavit"
    />
  );
}
