export interface QuizQuestion {
  prompt: string;
  options: string[];
  correct: number; // индекс правильного ответа в options
  hint?: string; // короткое пояснение, показывается после ответа
}

// Источник вопросов: возвращает пул (банк — целиком, генератор — свежую партию).
// Компонент викторины сам выбирает из пула 10 случайных на раунд.
export type QuestionSource = () => QuizQuestion[];
