export function generateExamples(params: {
  min: number;
  max: number;
  count: number;
  operation: '+' | '-' | '*';
}) {
  const examples: string[] = [];

  for (let i = 0; i < params.count; i++) {
    const a =
      Math.floor(Math.random() * (params.max - params.min + 1)) + params.min;
    const b =
      Math.floor(Math.random() * (params.max - params.min + 1)) + params.min;

    examples.push(`${a} ${params.operation} ${b} = ___`);
  }

  return examples;
}

export function generatePrimes(params: {
  count: number;
  variant?: 'single' | 'double';
}) {
  const examples: string[] = [];

  for (let i = 0; i < params.count; i++) {
    if (params.variant === 'double') {
      examples.push(`______  ______`);
      examples.push(`______  ______`);
      examples.push(`______  ______`);
      examples.push('');
    } else {
      examples.push('_____');
    }
  }

  return examples;
}

export function generateCrossword(words: string[]) {
  return {
    words,
    grid: Array(10)
      .fill(null)
      .map(() => Array(10).fill('_')),
  };
}

export function toHTML(examples: string[]): string {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 2;">
      ${examples.map((ex) => `<div>${ex}</div>`).join('')}
    </div>
  `;
}
