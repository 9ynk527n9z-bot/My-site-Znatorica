const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => {
  const result = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } });
  module._compile(result.outputText, filename);
};
const base = path.resolve(__dirname, '../lib/mcko');
const math = require(path.join(base, 'matematika-5.ts')).default;
const russian = require(path.join(base, 'russkiy-5.ts')).default;
const { passages } = require(path.join(base, 'russkiy-5-passages.ts'));
const { stressSets, punctuation, phonetics, syllables } = require(path.join(base, 'russkiy-5-language.ts'));
const diagnostics = process.argv.includes('--diagnostics');
const words = text => text.match(/[А-Яа-яЁё]+(?:-[А-Яа-яЁё]+)*/g) || [];
for (const data of [math, russian]) {
  assert.equal(data.variants.length, 20);
  assert.equal(new Set(data.variants.map(v => v.title)).size, 20);
  for (const [i, variant] of data.variants.entries()) {
    assert.equal(variant.id, i + 1);
    assert.equal(variant.tasks.length, data === math ? 11 : 5);
    assert.equal(variant.tasks.reduce((sum, t) => sum + t.points, 0), data.maxScore);
    for (const [j, task] of variant.tasks.entries()) {
      assert.equal(task.n, j + 1);
      assert.ok(task.text && task.answer);
      if (task.parts) {
        assert.equal(task.parts.reduce((sum, p) => sum + p.points, 0), task.points);
        for (const p of task.parts) assert.ok(p.text && p.answer && p.solution && p.rubric);
      } else assert.ok(task.solution && task.rubric);
    }
  }
}
for (const [i, p] of passages.entries()) {
  const clean = p.ortho.replace(/\{([^|{}]+)\|([^{}]+)\}/g, '$1');
  const count = words(clean).length;
  const slots = [...p.ortho.matchAll(/\{([^|{}]+)\|([^{}]+)\}/g)];
  if (diagnostics) console.log(`${i + 1}: ${count} words; ${slots.length} spelling slots`);
  else assert.ok(count >= 90 && count <= 100, `Russian ${i + 1}: ${count} words, expected 90–100`);
  assert.equal(slots.length, 8, `Russian ${i + 1} slots`);
  for (const [, right, wrong] of slots) {
    assert.notEqual(right, wrong);
    assert.match(right, /^[А-Яа-яЁё -]+$/u);
    if (!diagnostics) assert.match(wrong, /^[А-Яа-яЁё -]+$/u);
  }
  assert.ok(p.reading.toLowerCase().includes(p.lex[1].toLowerCase()), `Russian ${i + 1}: lexical answer missing`);
  const sentences = p.reading.split(/[.!?]+/).map(x => x.trim()).filter(Boolean);
  const sentenceIndex = p.lex[0].includes('предпоследнего') ? sentences.length - 2
    : p.lex[0].includes('последнего') ? sentences.length - 1
    : p.lex[0].includes('первого') ? 0 : p.lex[0].includes('второго') ? 1
    : p.lex[0].includes('третьего') ? 2 : p.lex[0].includes('четвёртого') ? 3
    : p.lex[0].includes('шестого') ? 5 : -1;
  assert.ok(sentenceIndex >= 0 && sentences[sentenceIndex].toLowerCase().includes(p.lex[1].toLowerCase()), `Russian ${i + 1}: wrong lexical sentence reference`);
  assert.ok(p.reading.toLowerCase().includes(p.antonym[0].toLowerCase()), `Russian ${i + 1}: antonym target missing`);
  assert.equal((punctuation[i].match(/,/g) || []).length, 3);
  assert.equal(stressSets[i].split(', ').length, 4);
  assert.ok(!/[?\u0530-\u058f]/.test(stressSets[i]));
  for (const word of stressSets[i].split(', ')) assert.equal((word.match(/[ё\u0301]/g) || []).length, 1, word);
  assert.equal(phonetics[i][0].length, Number(phonetics[i][2]));
  assert.equal(phonetics[i][1].slice(1, -1).split(' ').length, Number(phonetics[i][3]));
  assert.equal((phonetics[i][0].match(/[аеёиоуыэюя]/g) || []).length, Number(syllables[i].match(/(\d) слог/)[1]));
  const variant = russian.variants[i];
  assert.equal(variant.tasks.flatMap(t => t.parts || [t]).length, 10);
  assert.equal(variant.tasks[2].answer.split(', ').length, 2);
}
assert.equal(new Set(passages.map(p => p.ortho)).size, 20);
assert.equal(new Set(passages.map(p => p.reading)).size, 20);
const number = text => Number(text.replace(',', '.'));
const expectedHigh = ['280 рублей','60 км','В магазине А на 108 рублей','60 пакетов','360 м; 3960 м','19 500 рублей','5 книг; 100 рублей','13:18','2 пакета','5 часов','5 открыток; 20 рублей','12 км; 90 минут','900 рублей','4 мотка; 8 м','12 минут; на 8 минут быстрее','Хватит; останется 14 л','480 рублей; 15 м','Трёх реек недостаточно. Четырёх хватит: из каждой вырезать 80 + 35 + 35 см.','108 книг','60 км; 4 км/ч'];
for (const [i, variant] of math.variants.entries()) {
  const t = variant.tasks;
  if (t[0].text.includes('/')) {
    const [, a, b, op, c, d] = t[0].text.match(/(\d+)\/(\d+) ([+−]) (\d+)\/(\d+)/);
    const [an, ad] = t[0].answer.split('/').map(Number);
    assert.equal(an * Number(b) * Number(d), ad * (Number(a) * Number(d) + (op === '+' ? 1 : -1) * Number(c) * Number(b)));
  } else {
    const expression = t[0].text.match(/([\d,]+) ([+−]) ([\d,]+)/);
    const lhs = Math.round(number(expression[1]) * 100), rhs = Math.round(number(expression[3]) * 100);
    assert.equal(Math.round(number(t[0].answer) * 100), expression[2] === '+' ? lhs + rhs : lhs - rhs);
  }
  const fractionNumbers = t[1].text.match(/\d+/g).map(Number);
  assert.equal(Number(t[1].answer), t[1].text.includes('что составляет')
    ? fractionNumbers[0] * fractionNumbers[2] / fractionNumbers[1]
    : fractionNumbers[0] * (fractionNumbers[2] - fractionNumbers[1]) / fractionNumbers[2]);
  const equation = t[2].text.match(/\d+/g).map(Number);
  assert.equal(Number(t[2].answer), t[2].text.includes('x :') ? equation[0] * equation[1] : equation[1] / equation[0]);
  const f = t[4].figure;
  const bar = t[3].figure;
  const ranked = bar.values.map((n, k) => ({ n, k })).sort((a, b) => b.n - a.n);
  assert.equal(t[3].answer, `4.1. ${bar.labels[ranked[1].k]}. 4.2. ${ranked[0].n - ranked[3].n}.`);
  let squares = 0;
  for (let y = 0; y < f.height; y++) for (let x = 0; x < f.width; x++) if (!(x >= f.width - f.cutWidth && y < f.cutHeight)) squares++;
  assert.equal(Number(t[4].answer), squares);
  assert.equal(Number(t[5].answer), t[5].figure.point * t[5].figure.step);
  const workers = { 'Два': 2, 'Две': 2, 'Три': 3, 'Четыре': 4 }[t[6].text.split(' ')[0]];
  const rateNumbers = t[6].text.match(/\d+/g).map(Number);
  assert.equal(Number(t[6].answer), rateNumbers[1] / rateNumbers[0] / workers);
  const box = t[7].figure;
  assert.equal(Number(t[7].answer), box.length * box.width * box.height / 1000);
  const pattern = t[8].text.match(/число (\d\d□\d)/)[1];
  const good = Array.from({ length: 10 }, (_, n) => n).filter(n => Number(pattern.replace('□', String(n))) % 9 === 0);
  assert.deepEqual(t[8].answer.split('; ').map(Number), good);
  const estimates = t[9].text.match(/\d+,\d+/g).map(number);
  assert.deepEqual(t[9].answer.split('; ').map(Number), estimates.map(n => Math.floor(n + 0.5)));
  assert.equal(t[10].answer, expectedHigh[i]);
  assert.equal(t[10].level, 'П');
  assert.ok(t.slice(0, 10).every(t => t.level === 'Б'));
}
const registry = require(path.join(base, 'index.ts'));
const routes = registry.getAllMckoParams().filter(p => p.klass === '5-klass');
assert.equal(routes.length, 40);
assert.equal(new Set(routes.map(p => `${p.klass}/${p.subject}/${p.variant}`)).size, 40);
for (const route of routes) assert.ok(registry.getMckoVariant(route.klass, route.subject, Number(route.variant.slice(8))));
console.log('PASS: 40 variants; 320 main tasks / 420 scored items; scores 24 and 13; answers, diagrams and 40 unique routes.');
