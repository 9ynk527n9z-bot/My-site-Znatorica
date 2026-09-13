'use client';

import PropisiDigitsGenerator from '@/components/generators/PropisiDigitsGenerator';

export default function Page() {
  return (
    <PropisiDigitsGenerator
      h1="Прописи цифр до 20"
      intro="Числа от 0 до 20 с направляющими линиями — обвести по контуру, затем написать самостоятельно."
      filenamePrefix="propisi-cifr"
      aboutRoute="/generator/propisi-cifr"
      worksheetTitle="Прописи цифр до 20"
      showStudentFields
    />
  );
}
