// Простые уравнения на одно действие для 3 класса.
// x всегда либо в начале, либо в конце выражения. Каждое уравнение
// перепроверено дважды (арифметика верна).

export interface Equation {
  expression: string; // "x + 8 = 15"
  answer: number; // чему равен x
  hint: string; // как решали, например "x = 15 − 8 = 7"
}

export const EQUATIONS_3: Equation[] = [
  { expression: 'x + 8 = 15', answer: 7, hint: 'x = 15 − 8 = 7' },
  { expression: 'x + 12 = 20', answer: 8, hint: 'x = 20 − 12 = 8' },
  { expression: '9 + x = 17', answer: 8, hint: 'x = 17 − 9 = 8' },
  { expression: '6 + x = 14', answer: 8, hint: 'x = 14 − 6 = 8' },
  { expression: 'x − 5 = 12', answer: 17, hint: 'x = 12 + 5 = 17' },
  { expression: 'x − 9 = 6', answer: 15, hint: 'x = 6 + 9 = 15' },
  { expression: '20 − x = 12', answer: 8, hint: 'x = 20 − 12 = 8' },
  { expression: '30 − x = 18', answer: 12, hint: 'x = 30 − 18 = 12' },
  { expression: 'x × 4 = 24', answer: 6, hint: 'x = 24 ÷ 4 = 6' },
  { expression: 'x × 6 = 42', answer: 7, hint: 'x = 42 ÷ 6 = 7' },
  { expression: '5 × x = 35', answer: 7, hint: 'x = 35 ÷ 5 = 7' },
  { expression: 'x ÷ 3 = 7', answer: 21, hint: 'x = 7 × 3 = 21' },
  { expression: 'x ÷ 5 = 6', answer: 30, hint: 'x = 6 × 5 = 30' },
  { expression: '18 ÷ x = 6', answer: 3, hint: 'x = 18 ÷ 6 = 3' },
  { expression: '24 ÷ x = 8', answer: 3, hint: 'x = 24 ÷ 8 = 3' },
];
