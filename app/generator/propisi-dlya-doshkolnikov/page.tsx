'use client';

import PropisiLettersGenerator from '@/components/generators/PropisiLettersGenerator';

export default function Page() {
  return (
    <PropisiLettersGenerator
      h1="Прописи для дошкольников"
      intro="Печатные буквы, заглавные — самый простой формат для первого знакомства с буквами в 4–6 лет."
      defaultLetterStyle="printed"
      defaultCaseMode="upper"
      defaultPreset="all"
      filenamePrefix="propisi-doshkolniki"
      aboutRoute="/generator/propisi-dlya-doshkolnikov"
    />
  );
}
