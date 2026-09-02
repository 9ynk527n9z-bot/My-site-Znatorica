import type { QuizQuestion } from '@/lib/quiz/types';

// Общий формат конфига для «Готов ли ребёнок к N классу?» (app/gotovnost-k-*).
// Один общий компонент (components/ReadinessTest.tsx) рендерит любой такой конфиг —
// см. lib/readiness/grade1.ts..grade5.ts для примеров заполнения.
export interface ChildDomain {
  key: string;
  label: string;
  questions: QuizQuestion[]; // ровно 4 вопроса на направление — так устроена вёрстка результата
}

export interface ParentQuestion {
  id: string;
  prompt: string;
}

export interface ReadinessConfig {
  productSlug: string; // должен существовать в lib/products.ts
  pageSlug: string; // путь страницы без ведущего слэша, напр. "gotovnost-k-2-klassu"
  pendingKey: string; // ключ localStorage для сохранения результата на время регистрации/оплаты — должен быть уникальным на конфиг
  emoji: string;
  title: string; // напр. «Готов ли ребёнок к 2 классу?»
  introChildLine: string; // описание детской части, напр. «на закрепление базы 1 класса (математика, ...)»
  childDomains: ChildDomain[]; // ровно 4 направления
  parentDomainKey: string; // ключ направления, которое формируется из ответов родителя
  parentDomainLabel: string;
  parentQuestions: ParentQuestion[]; // ровно 8 вопросов, шкала Да=2/Иногда=1/Пока нет=0
  overallVerdict: (percent: number) => string;
  recommendationFor: (domainKey: string, percent: number) => string;
}
