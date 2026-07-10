import math3 from './math-3.json';
import math4 from './math-4.json';
import russkiy3 from './russkiy-3.json';
import russkiy4 from './russkiy-4.json';
import okrMir3 from './okruzhayushchiy-mir-3.json';
import okrMir4 from './okruzhayushchiy-mir-4.json';
import angliyskiy3 from './angliyskiy-3.json';
import angliyskiy4 from './angliyskiy-4.json';

export interface VprTask {
  n: number;
  text: string;
  answer: string;
  solution?: string;
  /** 2 — задание повышенной сложности (как в оценивании настоящей ВПР) */
  points?: number;
  /** Текст для чтения, к которому относится задание (русский язык, часть 2) */
  reading?: string;
  /** Текст для прослушивания (английский язык, аудирование) — озвучивается кнопкой */
  audio?: string;
}

export interface VprVariant {
  id: number;
  tasks: VprTask[];
  /** Текст диктанта — читает взрослый, ребёнок записывает (русский язык) */
  dictation?: string;
}

export interface VprSubjectData {
  grade: number;
  subject: string;
  subjectTitle: string;
  variants: VprVariant[];
}

// Реестр всех наборов ВПР. Новые предметы добавляются сюда же после написания данных.
const DATASETS: Record<string, VprSubjectData> = {
  '3-klass/matematika': math3 as VprSubjectData,
  '4-klass/matematika': math4 as VprSubjectData,
  '3-klass/russkiy': russkiy3 as VprSubjectData,
  '4-klass/russkiy': russkiy4 as VprSubjectData,
  '3-klass/okruzhayushchiy-mir': okrMir3 as VprSubjectData,
  '4-klass/okruzhayushchiy-mir': okrMir4 as VprSubjectData,
  '3-klass/angliyskiy': angliyskiy3 as VprSubjectData,
  '4-klass/angliyskiy': angliyskiy4 as VprSubjectData,
};

export const VPR_KLASSES = [
  { slug: '3-klass', title: '3 класс', note: 'подготовительные варианты' },
  { slug: '4-klass', title: '4 класс', note: 'формат настоящей ВПР' },
] as const;

export function getVprData(klass: string, subject: string): VprSubjectData | null {
  return DATASETS[`${klass}/${subject}`] ?? null;
}

export function getVprVariant(klass: string, subject: string, variantId: number): VprVariant | null {
  const data = getVprData(klass, subject);
  return data?.variants.find((v) => v.id === variantId) ?? null;
}

export function getAllVprParams() {
  return Object.keys(DATASETS).flatMap((key) => {
    const [klass, subject] = key.split('/');
    return DATASETS[key].variants.map((v) => ({
      klass,
      subject,
      variant: `variant-${v.id}`,
    }));
  });
}

export function getAllVprSubjectParams() {
  return Object.keys(DATASETS).map((key) => {
    const [klass, subject] = key.split('/');
    return { klass, subject };
  });
}
