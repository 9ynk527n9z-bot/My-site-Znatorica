import fs from 'node:fs';

const sourcePath = new URL('../lib/mcko/literaturnoe-chtenie-4.json', import.meta.url);
const outputPath = new URL('../lib/vpr/literaturnoe-chtenie-4.json', import.meta.url);

const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

const pointsByNumber = new Map([
  [1, 1], [2, 1], [3, 2], [4, 1], [5, 2], [6, 3], [7, 1],
  [8, 1], [9, 1], [10, 2], [11, 2], [12, 1], [13, 2], [14, 2],
]);

function combineAuthorTasks(first, second) {
  return {
    n: 6,
    text: `6.1. ${first.text}\n\n6.2. ${second.text}`,
    answer: `6.1. ${first.answer}\n6.2. ${second.answer}`,
    solution: [first.solution, second.solution].filter(Boolean).join('\n'),
    points: pointsByNumber.get(6),
  };
}

const variants = source.variants.map((variant) => {
  const tasks = variant.tasks;
  const transformed = [
    tasks[0],
    tasks[1],
    tasks[2],
    tasks[3],
    tasks[4],
    combineAuthorTasks(tasks[5], tasks[6]),
    ...tasks.slice(7).map((task) => ({ ...task, n: task.n - 1 })),
  ].map((task) => ({
    ...task,
    points: pointsByNumber.get(task.n),
  }));

  return { id: variant.id, tasks: transformed };
});

const output = {
  grade: 4,
  subject: 'literaturnoe-chtenie',
  subjectTitle: 'Литературное чтение',
  variants,
};

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);

