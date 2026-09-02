export type MathRange = 10 | 100 | 1000;
export type MathMode = 'plus' | 'minus' | 'plus_minus' | 'multiply' | 'divide' | 'multiply_divide';

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface MathExample {
  text: string;
  answer: number;
}

// Единое правило для всех действий: «до X» — ни одно число в примере (операнды,
// сумма/произведение/делимое) не превышает X. Так «сложение до 100» — это ровно
// то, что в школе называют «сложение в пределах 100».

function minOperandFor(range: MathRange): number {
  if (range === 10) return 1;
  if (range === 100) return 10;
  return 100;
}

function makePlus(range: MathRange): MathExample {
  const minOp = minOperandFor(range);
  const a = randInt(minOp, range - minOp);
  const b = randInt(minOp, range - a);
  return { text: `${a} + ${b} = ___`, answer: a + b };
}

function makeMinus(range: MathRange): MathExample {
  const minOp = minOperandFor(range);
  let a = randInt(minOp, range);
  let b = randInt(minOp, range);
  if (b > a) [a, b] = [b, a]; // гарантируем неотрицательный результат
  return { text: `${a} − ${b} = ___`, answer: a - b };
}

// Полный список всех уникальных пар (a, b), которые может сгенерировать
// умножение/деление для данного range. При маленьком range
// (например, "До 10") этот пул очень мал (~8 примеров на умножение), и при
// count=20-100 случайная генерация неизбежно даёт повторы на распечатанном
// листе. Поэтому используем пул: сначала проходим по всем уникальным примерам
// в случайном порядке, и только когда пул исчерпан — начинаем заново
// (с новым перемешиванием), а не повторяемся раньше времени.
function buildMultiplyPool(range: MathRange): MathExample[] {
  const pool: MathExample[] = [];
  const maxB = Math.min(9, Math.floor(range / 2));
  for (let b = 2; b <= Math.max(2, maxB); b++) {
    const maxA = Math.floor(range / b);
    for (let a = 2; a <= Math.max(2, maxA); a++) {
      pool.push({ text: `${a} × ${b} = ___`, answer: a * b });
    }
  }
  return pool;
}

function buildDividePool(range: MathRange): MathExample[] {
  const pool: MathExample[] = [];
  const maxDivisor = Math.min(9, Math.floor(range / 2));
  for (let divisor = 2; divisor <= Math.max(2, maxDivisor); divisor++) {
    const maxQuotient = Math.floor(range / divisor);
    for (let quotient = 2; quotient <= Math.max(2, maxQuotient); quotient++) {
      const dividend = divisor * quotient;
      pool.push({ text: `${dividend} ÷ ${divisor} = ___`, answer: quotient });
    }
  }
  return pool;
}

// Тянет примеры из пула без повторов, пока пул не исчерпан; после этого
// перемешивает пул заново и продолжает — гарантирует, что дубли появляются
// только когда весь уникальный набор уже использован.
function createPoolDrawer(pool: MathExample[]): () => MathExample {
  let queue: MathExample[] = [];
  return function draw(): MathExample {
    if (queue.length === 0) {
      queue = shuffle(pool);
    }
    return queue.pop()!;
  };
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateMathExamples(params: {
  range: MathRange;
  mode: MathMode;
  count: number;
}): MathExample[] {
  const { range, mode, count } = params;
  const examples: MathExample[] = [];

  // Умножение/деление берут примеры из полного пула уникальных пар для
  // данного range (см. buildMultiplyPool/buildDividePool выше) — так при
  // маленьком range ("До 10") лист не печатает заведомые дубли раньше, чем
  // исчерпан весь доступный набор примеров.
  const drawMultiply = createPoolDrawer(buildMultiplyPool(range));
  const drawDivide = createPoolDrawer(buildDividePool(range));

  for (let i = 0; i < count; i++) {
    switch (mode) {
      case 'plus':
        examples.push(makePlus(range));
        break;
      case 'minus':
        examples.push(makeMinus(range));
        break;
      case 'plus_minus':
        examples.push(Math.random() < 0.5 ? makePlus(range) : makeMinus(range));
        break;
      case 'multiply':
        examples.push(drawMultiply());
        break;
      case 'divide':
        examples.push(drawDivide());
        break;
      case 'multiply_divide':
        examples.push(Math.random() < 0.5 ? drawMultiply() : drawDivide());
        break;
    }
  }

  return examples;
}

// Устаревшая простая версия — оставлена для обратной совместимости старого API-роута.
export function generateExamples(params: {
  min: number;
  max: number;
  count: number;
  operation: '+' | '-' | '*';
}) {
  const examples: string[] = [];

  for (let i = 0; i < params.count; i++) {
    let a = randInt(params.min, params.max);
    let b = randInt(params.min, params.max);
    if (params.operation === '-' && b > a) [a, b] = [b, a];
    examples.push(`${a} ${params.operation} ${b} = ___`);
  }

  return examples;
}

export function toHTML(examples: string[] | MathExample[]): string {
  const lines = examples.map((ex) => (typeof ex === 'string' ? ex : ex.text));
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 2;">
      ${lines.map((ex) => `<div>${ex}</div>`).join('')}
    </div>
  `;
}
