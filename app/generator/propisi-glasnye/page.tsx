'use client';

import PropisiLettersGenerator from '@/components/generators/PropisiLettersGenerator';

export default function Page() {
  return (
    <PropisiLettersGenerator
      h1="Прописи — гласные буквы"
      intro="Гласные уже выбраны — можно сразу генерировать, или добавить/убрать буквы вручную."
      defaultPreset="vowels"
      filenamePrefix="propisi-glasnye"
      aboutRoute="/generator/propisi-glasnye"
    />
  );
}
