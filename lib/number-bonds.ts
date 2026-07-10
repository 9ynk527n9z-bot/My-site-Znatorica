// Состав числа — классическое упражнение для 1 класса: «домик», где число сверху
// раскладывается на два слагаемых снизу, одно из которых нужно найти.
export interface NumberBond {
  number: number;
  a: number;
  b: number;
  blank: 'a' | 'b';
}

export function generateNumberBonds(numbers: number[], count: number): NumberBond[] {
  const bonds: NumberBond[] = [];
  for (let i = 0; i < count; i++) {
    const number = numbers[Math.floor(Math.random() * numbers.length)];
    const a = 1 + Math.floor(Math.random() * (number - 1)); // 1..number-1
    const b = number - a;
    const blank: 'a' | 'b' = Math.random() < 0.5 ? 'a' : 'b';
    bonds.push({ number, a, b, blank });
  }
  return bonds;
}
