import type { CrosswordResult } from './crossword';

/** A single portrait A4 shared by preview, print and exports. */
export function drawCrosswordSheet(canvas: HTMLCanvasElement, result: CrosswordResult, answers: boolean) {
  const width = 794, height = 1123, margin = 57;
  canvas.width = width * 2;
  canvas.height = height * 2;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.scale(2, 2);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, width, height);

  const columnWidth = (width - margin * 2 - 32) / 2;
  ctx.font = '17px Arial, sans-serif';
  const wrap = (text: string) => {
    const lines: string[] = [];
    let line = '';
    for (const word of text.split(' ')) {
      const next = line ? `${line} ${word}` : word;
      if (line && ctx.measureText(next).width > columnWidth) {
        lines.push(line);
        line = word;
      } else line = next;
    }
    if (line) lines.push(line);
    return lines;
  };
  const groups = (['across', 'down'] as const).map(direction =>
    result.words.filter(w => w.direction === direction).sort((a, b) => a.number - b.number)
      .map(w => wrap(`${w.number}. ${w.clue}`)));
  const clueHeight = 36 + Math.max(...groups.map(group => group.reduce((sum, lines) => sum + lines.length * 28 + 16, 0)));
  const cell = Math.min(38, (width - margin * 2) / result.cols, (height - margin * 2 - clueHeight - 32) / result.rows);
  const left = (width - result.cols * cell) / 2;
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1.2;
  ctx.fillStyle = '#222';
  result.grid.forEach((row, r) => row.forEach((letter, c) => {
    if (!letter) return;
    const x = left + c * cell, y = margin + r * cell;
    ctx.strokeRect(x, y, cell, cell);
    const number = result.numbers[r][c];
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    if (number) {
      ctx.font = `${Math.min(11, cell * .3)}px Arial, sans-serif`;
      ctx.fillText(String(number), x + 2, y + 2);
    }
    if (answers) {
      ctx.font = `bold ${cell * .52}px Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(letter, x + cell / 2, y + cell * .62);
    }
  }));
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  groups.forEach((group, column) => {
    const x = margin + column * (columnWidth + 32);
    let y = margin + result.rows * cell + 32;
    ctx.font = 'bold 18px Arial, sans-serif';
    ctx.fillText(column === 0 ? 'По горизонтали' : 'По вертикали', x, y);
    y += 36;
    ctx.font = '17px Arial, sans-serif';
    group.forEach(lines => {
      lines.forEach(line => { ctx.fillText(line, x, y); y += 28; });
      y += 16;
    });
  });
}
