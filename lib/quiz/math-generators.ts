import type { QuizQuestion } from './types';

function rand(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Варианты ответов: правильный + близкие неправильные, без дублей.
function numberOptions(answer: number, spread = 3): { options: string[]; correct: number } {
  const wrong = new Set<number>();
  while (wrong.size < 3) {
    const delta = rand(1, spread) * (Math.random() < 0.5 ? -1 : 1);
    const w = answer + delta;
    if (w !== answer && w >= 0) wrong.add(w);
  }
  const options = shuffle([answer, ...wrong]);
  return { options: options.map(String), correct: options.indexOf(answer) };
}

function makeBatch(make: () => QuizQuestion, count = 30): QuizQuestion[] {
  const seen = new Set<string>();
  const out: QuizQuestion[] = [];
  let guard = 0;
  while (out.length < count && guard < count * 20) {
    guard++;
    const q = make();
    if (seen.has(q.prompt)) continue;
    seen.add(q.prompt);
    out.push(q);
  }
  return out;
}

const COUNT_EMOJI = ['🍎', '⭐', '🎈', '🐟', '🌸', '🚗', '🍄', '🐞'];

// Счёт предметов: «Сколько яблок?» + ряд эмодзи
export function genCounting(max: number): QuizQuestion[] {
  return makeBatch(() => {
    const n = rand(1, max);
    const emoji = COUNT_EMOJI[rand(0, COUNT_EMOJI.length - 1)];
    const { options, correct } = numberOptions(n, Math.min(3, max - 1));
    return { prompt: `Посчитай: ${emoji.repeat(n)}`, options, correct };
  });
}

export function genAddition(min: number, max: number): QuizQuestion[] {
  return makeBatch(() => {
    const a = rand(Math.max(1, Math.floor(min / 2)), max - 1);
    const b = rand(1, max - a);
    const sum = a + b;
    const { options, correct } = numberOptions(sum);
    return { prompt: `${a} + ${b} = ?`, options, correct };
  });
}

export function genSubtraction(min: number, max: number): QuizQuestion[] {
  return makeBatch(() => {
    const a = rand(Math.max(2, min), max);
    const b = rand(1, a - 1);
    const diff = a - b;
    const { options, correct } = numberOptions(diff);
    return { prompt: `${a} − ${b} = ?`, options, correct };
  });
}

export function genAddSub(min: number, max: number): QuizQuestion[] {
  return shuffle([...genAddition(min, max), ...genSubtraction(min, max)]);
}

// Состав числа: «7 = 3 + ?»
export function genNumberBonds(maxNumber: number): QuizQuestion[] {
  return makeBatch(() => {
    const n = rand(3, maxNumber);
    const a = rand(1, n - 1);
    const b = n - a;
    const { options, correct } = numberOptions(b, 2);
    return { prompt: `${n} = ${a} + ?`, options, correct, hint: `${a} + ${b} = ${n}` };
  });
}

// Сравнение чисел: выбрать знак
export function genComparison(max: number): QuizQuestion[] {
  return makeBatch(() => {
    const a = rand(0, max);
    const b = rand(0, max);
    const answer = a < b ? '<' : a > b ? '>' : '=';
    const options = ['<', '=', '>'];
    return {
      prompt: `Какой знак поставить: ${a} … ${b}?`,
      options,
      correct: options.indexOf(answer),
    };
  });
}

export function genMultiplication(): QuizQuestion[] {
  return makeBatch(() => {
    const a = rand(2, 9);
    const b = rand(2, 9);
    const prod = a * b;
    const { options, correct } = numberOptions(prod, Math.max(2, a));
    return { prompt: `${a} × ${b} = ?`, options, correct };
  });
}

export function genDivision(): QuizQuestion[] {
  return makeBatch(() => {
    const b = rand(2, 9);
    const q = rand(2, 9);
    const a = b * q;
    const { options, correct } = numberOptions(q, 2);
    return { prompt: `${a} ÷ ${b} = ?`, options, correct, hint: `${b} × ${q} = ${a}` };
  });
}

// Двузначные: сложение/вычитание в пределах 100
export function genTwoDigit(): QuizQuestion[] {
  return makeBatch(() => {
    if (Math.random() < 0.5) {
      const a = rand(11, 88);
      const b = rand(11, 99 - a);
      const { options, correct } = numberOptions(a + b, 10);
      return { prompt: `${a} + ${b} = ?`, options, correct };
    }
    const a = rand(30, 99);
    const b = rand(11, a - 10);
    const { options, correct } = numberOptions(a - b, 10);
    return { prompt: `${a} − ${b} = ?`, options, correct };
  });
}

// Простые текстовые задачи для 1 класса (в пределах 10)
export function genWordProblems1(): QuizQuestion[] {
  const templates: ((a: number, b: number) => { prompt: string; answer: number })[] = [
    (a, b) => ({
      prompt: `У Маши было ${a} ${plural(a, 'яблоко', 'яблока', 'яблок')}. Ей дали ещё ${b}. Сколько яблок стало у Маши?`,
      answer: a + b,
    }),
    (a, b) => ({
      prompt: `На ветке сидело ${a} ${plural(a, 'птица', 'птицы', 'птиц')}. ${b} ${b === 1 ? 'улетела' : 'улетели'}. Сколько птиц осталось?`,
      answer: a - b,
    }),
    (a, b) => ({
      prompt: `В вазе ${a} ${plural(a, 'конфета', 'конфеты', 'конфет')}, а в коробке — ${b}. Сколько конфет всего?`,
      answer: a + b,
    }),
    (a, b) => ({
      prompt: `У Пети ${a} ${plural(a, 'карандаш', 'карандаша', 'карандашей')}. Он подарил другу ${b}. Сколько карандашей осталось у Пети?`,
      answer: a - b,
    }),
    (a, b) => ({
      prompt: `В гараже стояло ${a} ${plural(a, 'машина', 'машины', 'машин')}. Приехали ещё ${b}. Сколько машин стало в гараже?`,
      answer: a + b,
    }),
  ];
  return makeBatch(() => {
    const t = templates[rand(0, templates.length - 1)];
    const a = rand(3, 8);
    const b = rand(1, Math.min(a - 1, 10 - a) < 1 ? 2 : Math.min(a - 1, 10 - a));
    const { prompt, answer } = t(a, b);
    const { options, correct } = numberOptions(answer, 2);
    return { prompt, options, correct };
  }, 25);
}

function plural(n: number, one: string, few: string, many: string): string {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
}
