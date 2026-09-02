// Данные для тренажёра «Живая и неживая природа» (2 класс).
// Каждый объект — бесспорный пример живой или неживой природы, без пограничных
// случаев (не берём людей, технику и т.п.), см. тему
// app/2-klass/okruzhayushchiy/priroda/page.tsx.

export type PrirodaKind = 'zhivaya' | 'nezhivaya';

export interface PrirodaItem {
  id: string;
  emoji: string;
  name: string;
  kind: PrirodaKind;
}

export const PRIRODA_ITEMS: PrirodaItem[] = [
  { id: 'kamen', emoji: '🪨', name: 'Камень', kind: 'nezhivaya' },
  { id: 'derevo', emoji: '🌳', name: 'Дерево', kind: 'zhivaya' },
  { id: 'voda', emoji: '💧', name: 'Капля воды', kind: 'nezhivaya' },
  { id: 'ptica', emoji: '🐦', name: 'Птица', kind: 'zhivaya' },
  { id: 'solnce', emoji: '☀️', name: 'Солнце', kind: 'nezhivaya' },
  { id: 'babochka', emoji: '🦋', name: 'Бабочка', kind: 'zhivaya' },
  { id: 'oblako', emoji: '☁️', name: 'Облако', kind: 'nezhivaya' },
  { id: 'grib', emoji: '🍄', name: 'Гриб', kind: 'zhivaya' },
  { id: 'zvezda', emoji: '⭐', name: 'Звезда', kind: 'nezhivaya' },
  { id: 'volk', emoji: '🐺', name: 'Волк', kind: 'zhivaya' },
  { id: 'gora', emoji: '⛰️', name: 'Гора', kind: 'nezhivaya' },
  { id: 'cvetok', emoji: '🌸', name: 'Цветок', kind: 'zhivaya' },
  { id: 'snezhinka', emoji: '❄️', name: 'Снежинка', kind: 'nezhivaya' },
  { id: 'ryba', emoji: '🐟', name: 'Рыба', kind: 'zhivaya' },
  { id: 'pesok', emoji: '⏳', name: 'Песок', kind: 'nezhivaya' },
  { id: 'medved', emoji: '🐻', name: 'Медведь', kind: 'zhivaya' },
];

export function shufflePriroda<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
