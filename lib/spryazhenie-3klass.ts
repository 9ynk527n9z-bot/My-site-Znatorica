// Тренажёр «Спряжение глаголов» (3 класс).
// Спряжение определяется по неопределённой форме глагола (что делать?):
//  - II спряжение: глаголы на -ить (кроме брить, стелить) + 11 глаголов-исключений
//    (гнать, держать, дышать, слышать — на -ать/-ять; видеть, обидеть, терпеть,
//    вертеть, зависеть, ненавидеть, смотреть — на -еть).
//  - I спряжение: все остальные глаголы (на -ать, -ять, -еть, -оть, -уть, -ыть, -ти, -чь и т.д.)
//
// Каждый глагол в списке ниже дважды перепроверен по реальному спряжению
// (3-е лицо мн. числа: -ут/-ют → I, -ат/-ят → II).

export type Spryazhenie = 1 | 2;

export interface VerbEntry {
  verb: string;
  spryazhenie: Spryazhenie;
  isException?: boolean; // входит в список из 11 глаголов-исключений
}

export const VERBS: VerbEntry[] = [
  // I спряжение (проверено: 3 л. мн.ч. оканчивается на -ут/-ют)
  { verb: 'читать', spryazhenie: 1 }, // читают
  { verb: 'писать', spryazhenie: 1 }, // пишут
  { verb: 'играть', spryazhenie: 1 }, // играют
  { verb: 'рисовать', spryazhenie: 1 }, // рисуют
  { verb: 'петь', spryazhenie: 1 }, // поют
  { verb: 'идти', spryazhenie: 1 }, // идут
  { verb: 'нести', spryazhenie: 1 }, // несут
  { verb: 'плавать', spryazhenie: 1 }, // плавают
  { verb: 'прыгать', spryazhenie: 1 }, // прыгают
  { verb: 'плыть', spryazhenie: 1 }, // плывут
  { verb: 'везти', spryazhenie: 1 }, // везут
  { verb: 'искать', spryazhenie: 1 }, // ищут

  // II спряжение — обычные глаголы на -ить (3 л. мн.ч. оканчивается на -ат/-ят)
  { verb: 'говорить', spryazhenie: 2 }, // говорят
  { verb: 'строить', spryazhenie: 2 }, // строят
  { verb: 'учить', spryazhenie: 2 }, // учат
  { verb: 'любить', spryazhenie: 2 }, // любят

  // II спряжение — глаголы-исключения (все 11 классических исключений)
  { verb: 'смотреть', spryazhenie: 2, isException: true }, // смотрят
  { verb: 'видеть', spryazhenie: 2, isException: true }, // видят
  { verb: 'обидеть', spryazhenie: 2, isException: true }, // обидят
  { verb: 'терпеть', spryazhenie: 2, isException: true }, // терпят
  { verb: 'вертеть', spryazhenie: 2, isException: true }, // вертят
  { verb: 'зависеть', spryazhenie: 2, isException: true }, // зависят
  { verb: 'ненавидеть', spryazhenie: 2, isException: true }, // ненавидят
  { verb: 'гнать', spryazhenie: 2, isException: true }, // гонят
  { verb: 'держать', spryazhenie: 2, isException: true }, // держат
  { verb: 'дышать', spryazhenie: 2, isException: true }, // дышат
  { verb: 'слышать', spryazhenie: 2, isException: true }, // слышат
];
