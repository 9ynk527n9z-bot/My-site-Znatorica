import type { MckoFigure, MckoPart, MckoTask } from './index';
export function imageFigure(name: string, alt: string): MckoFigure {
  return { kind: 'image', src: `/images/mcko-5/${name}.svg`, alt };
}
export const onePoint = '1 балл — ответ верен; иначе 0. Равнозначная формулировка допускается.';
export function part(label: string, text: string, answer: string, solution: string, points = 1, rubric = onePoint): MckoPart {
  return { label, text, answer, solution, points, rubric };
}
export function group(n: number, text: string, parts: MckoPart[], extra: Partial<MckoTask> = {}): MckoTask {
  return { n, text, points: parts.reduce((s, p) => s + p.points, 0), level: 'Б', parts,
    answer: parts.map(p => `${p.label}: ${p.answer}`).join('\n'), ...extra };
}
// Сдвиг берётся не напрямую из seed % длина (это давало цикличный период,
// равный длине списка вариантов, и позицию правильного ответа можно было
// угадать по номеру задания), а из заранее просчитанной несистемной
// последовательности — так же, как исправляли похожий баг в английском МЦКО.
const SHIFT_TABLE = [837,492,130,515,311,629,495,824,504,499,676,675,403,606,653,282,661,352,328,297,862,28,880,635,159,786,386,679,822,200];

/** Детерминированная перестановка: первый элемент исходного списка — верный ответ. */
export function choice(options: string[], seed: number) {
  const idx = ((seed % SHIFT_TABLE.length) + SHIFT_TABLE.length) % SHIFT_TABLE.length;
  const shift = SHIFT_TABLE[idx] % options.length;
  const ordered = options.map((text, index) => ({ text, correct: index === 0 }));
  const items = [...ordered.slice(shift), ...ordered.slice(0, shift)];
  return { text: items.map((p, i) => `${i + 1}) ${p.text}`).join('\n'), answer: String(items.findIndex(p => p.correct) + 1), correct: options[0] };
}
export function single(n: number, question: string, options: string[], solution: string, seed: number, extra: Partial<MckoTask> = {}): MckoTask {
  const c = choice(options, seed);
  return { n, text: `${question}\nВыберите один ответ и запишите его номер.\n${c.text}`, answer: `${c.answer} — ${c.correct}`, solution, points: 1, level: 'Б', rubric: onePoint, ...extra };
}
export const pairRubric = '2 балла — оба ответа верны; 1 — верен один; 0 — оба неверны. Каждый пропуск считается неверным ответом.';
export const sequenceRubric = '2 балла — вся последовательность верна; 1 — неверно указана ровно одна позиция (в том числе пропущена); 0 — неверны две позиции или более.';
