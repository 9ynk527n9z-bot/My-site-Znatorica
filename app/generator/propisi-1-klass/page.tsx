'use client';

import PropisiLettersGenerator from '@/components/generators/PropisiLettersGenerator';

export default function Page() {
  return (
    <PropisiLettersGenerator
      h1="Прописи для 1 класса"
      intro="Письменные буквы, заглавные и строчные — так буквы отрабатывают в первом классе."
      defaultLetterStyle="cursive"
      defaultCaseMode="both"
      defaultPreset="all"
      filenamePrefix="propisi-1klass"
      aboutRoute="/generator/propisi-1-klass"
      worksheetTitle="Прописи для 1 класса"
      showStudentFields
    />
  );
}
