'use client';

import PropisiLettersGenerator from '@/components/generators/PropisiLettersGenerator';

export default function Page() {
  return (
    <PropisiLettersGenerator
      h1="Прописи — согласные буквы"
      intro="Согласные уже выбраны — можно сразу генерировать, или добавить/убрать буквы вручную."
      defaultPreset="consonants"
      filenamePrefix="propisi-soglasnye"
      aboutRoute="/generator/propisi-soglasnye"
    />
  );
}
