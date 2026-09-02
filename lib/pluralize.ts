// Склонение существительного после числительного (1 домик, 2 домика, 5 домиков).
// forms: [именительный ед.ч. (1), родительный ед.ч. (2-4), родительный мн.ч. (5+)]
export function pluralize(n: number, forms: [string, string, string]): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return forms[2];
  if (mod10 === 1) return forms[0];
  if (mod10 >= 2 && mod10 <= 4) return forms[1];
  return forms[2];
}

export function pluralizeCount(n: number, forms: [string, string, string]): string {
  return `${n} ${pluralize(n, forms)}`;
}
