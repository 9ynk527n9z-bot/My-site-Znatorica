// Данные для тренажёра «Живая и неживая природа» (1 класс).
// Проще, чем lib/priroda-2klass.ts: только самые очевидные бытовые предметы
// и знакомые малышам живые существа — без пограничных случаев вроде облака,
// снежинки или гриба. См. тему
// app/1-klass/okruzhayushchiy/zhivaya-i-nezhivaya-priroda/page.tsx.

export type PrirodaKind = 'zhivaya' | 'nezhivaya';

export interface PrirodaItem {
  id: string;
  emoji: string;
  name: string;
  kind: PrirodaKind;
}

export const PRIRODA_ITEMS: PrirodaItem[] = [
  { id: 'koshka', emoji: '🐱', name: 'Кошка', kind: 'zhivaya' },
  { id: 'luna', emoji: '🌙', name: 'Луна', kind: 'nezhivaya' },
  { id: 'sobaka', emoji: '🐶', name: 'Собака', kind: 'zhivaya' },
  { id: 'zvezda', emoji: '⭐', name: 'Звезда', kind: 'nezhivaya' },
  { id: 'cvetok', emoji: '🌷', name: 'Цветок', kind: 'zhivaya' },
  { id: 'dom', emoji: '🏠', name: 'Дом', kind: 'nezhivaya' },
  { id: 'babochka', emoji: '🦋', name: 'Бабочка', kind: 'zhivaya' },
  { id: 'mashina', emoji: '🚗', name: 'Машина', kind: 'nezhivaya' },
  { id: 'rybka', emoji: '🐠', name: 'Рыбка', kind: 'zhivaya' },
  { id: 'kniga', emoji: '📖', name: 'Книга', kind: 'nezhivaya' },
  { id: 'derevo', emoji: '🌲', name: 'Дерево', kind: 'zhivaya' },
  { id: 'myach', emoji: '⚽', name: 'Мяч', kind: 'nezhivaya' },
  { id: 'lyagushka', emoji: '🐸', name: 'Лягушка', kind: 'zhivaya' },
  { id: 'stul', emoji: '🪑', name: 'Стул', kind: 'nezhivaya' },
];

export function shufflePriroda<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
