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

function makeMultiply(range: MathRange): MathExample {
  // Множитель всегда небольшой (2-9), как в таблице умножения;
  // второй множитель подбирается так, чтобы произведение не превышало range.
  const maxB = Math.min(9, Math.floor(range / 2));
  const b = randInt(2, Math.max(2, maxB));
  const maxA = Math.floor(range / b);
  const a = randInt(2, Math.max(2, maxA));
  return { text: `${a} × ${b} = ___`, answer: a * b };
}

function makeDivide(range: MathRange): MathExample {
  // Делитель небольшой (2-9), частное подбирается так, чтобы делимое не превышало range.
  const maxDivisor = Math.min(9, Math.floor(range / 2));
  const divisor = randInt(2, Math.max(2, maxDivisor));
  const maxQuotient = Math.floor(range / divisor);
  const quotient = randInt(2, Math.max(2, maxQuotient));
  const dividend = divisor * quotient;
  return { text: `${dividend} ÷ ${divisor} = ___`, answer: quotient };
}

export function generateMathExamples(params: {
  range: MathRange;
  mode: MathMode;
  count: number;
}): MathExample[] {
  const { range, mode, count } = params;
  const examples: MathExample[] = [];

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
        examples.push(makeMultiply(range));
        break;
      case 'divide':
        examples.push(makeDivide(range));
        break;
      case 'multiply_divide':
        examples.push(Math.random() < 0.5 ? makeMultiply(range) : makeDivide(range));
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
