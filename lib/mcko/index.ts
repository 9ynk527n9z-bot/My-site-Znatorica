import matematika4 from './matematika-4.json';
import russkiy4 from './russkiy-4.json';
import angliyskiy4 from './angliyskiy-4.json';
import okruzhayushchiyMir4 from './okruzhayushchiy-mir-4.json';
import literaturnoeChtenie4 from './literaturnoe-chtenie-4.json';
import matematika5 from './matematika-5';
import russkiy5 from './russkiy-5';
import geografiya5 from './geografiya-5';
import biologiya5 from './biologiya-5';

export type MckoFigure =
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'bars'; labels: string[]; values: number[]; unit: string }
  | { kind: 'grid'; width: number; height: number; cutWidth: number; cutHeight: number }
  | { kind: 'ray'; step: number; point: number; ticks: number }
  | { kind: 'box'; length: number; width: number; height: number; unit: string };

export interface MckoPart {
  label: string;
  text: string;
  answer: string;
  solution: string;
  points: number;
  reading?: string;
  rubric: string;
}

export interface MckoTask {
  n: number;
  text: string;
  answer: string;
  solution?: string;
  reading?: string;
  /** Текст для прослушивания (английский язык, аудирование) — озвучивается кнопкой */
  audio?: string;
  points?: number;
  level?: 'Б' | 'П';
  parts?: MckoPart[];
  figure?: MckoFigure;
  table?: { headers: string[]; rows: string[][] };
  rubric?: string;
}

export interface MckoVariant {
  id: number;
  tasks: MckoTask[];
  title?: string;
}

export interface MckoSubjectData {
  grade: number;
  subject: string;
  subjectTitle: string;
  variants: MckoVariant[];
  year?: number;
  durationMinutes?: number;
  breakMinutes?: number;
  maxScore?: number;
  instructions?: string;
}

// Реестр всех наборов МЦКО. Новые предметы/классы добавляются сюда же после написания данных.
const DATASETS: Record<string, MckoSubjectData> = {
  '4-klass/matematika': matematika4 as MckoSubjectData,
  '4-klass/russkiy': russkiy4 as MckoSubjectData,
  '4-klass/angliyskiy': angliyskiy4 as MckoSubjectData,
  '4-klass/okruzhayushchiy-mir': okruzhayushchiyMir4 as MckoSubjectData,
  '4-klass/literaturnoe-chtenie': literaturnoeChtenie4 as MckoSubjectData,
  '5-klass/matematika': matematika5,
  '5-klass/russkiy': russkiy5,
  '5-klass/geografiya': geografiya5,
  '5-klass/biologiya': biologiya5,
};

export const MCKO_KLASSES = [{ slug: '4-klass', title: '4 класс' }, { slug: '5-klass', title: '5 класс' }] as const;

export function getMckoData(klass: string, subject: string): MckoSubjectData | null {
  return DATASETS[`${klass}/${subject}`] ?? null;
}

export function getMckoVariant(klass: string, subject: string, variantId: number): MckoVariant | null {
  const data = getMckoData(klass, subject);
  return data?.variants.find((v) => v.id === variantId) ?? null;
}

export function getAllMckoParams() {
  return Object.keys(DATASETS).flatMap((key) => {
    const [klass, subject] = key.split('/');
    return DATASETS[key].variants.map((v) => ({
      klass,
      subject,
      variant: `variant-${v.id}`,
    }));
  });
}

export function getAllMckoSubjectParams() {
  return Object.keys(DATASETS).map((key) => {
    const [klass, subject] = key.split('/');
    return { klass, subject };
  });
}
