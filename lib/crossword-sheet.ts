import type { CrosswordResult } from './crossword';

/** A single portrait A4 shared by preview, print and exports. */
export function drawCrosswordSheet(
  canvas: HTMLCanvasElement,
  result: CrosswordResult,
  answers: boolean,
  title = 'Кроссворд',
) {
  const width = 794, height = 1123, margin = 57;
  canvas.width = width * 2;
  canvas.height = height * 2;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.scale(2, 2);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = '#A78BFA';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(25, 25, width - 50, height - 50, 18);
  ctx.stroke();

  ctx.fillStyle = '#A78BFA';
  ctx.font = 'bold 30px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillText('Кроссворд', width / 2, 48);
  ctx.fillStyle = '#1f2937';
  ctx.font = 'bold 26px Arial, sans-serif';
  ctx.fillText(title, width / 2, 90);

  const columnWidth = (width - margin * 2 - 32) / 2;
  ctx.font = '21px Arial, sans-serif';
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
  const clueHeight = 36 + Math.max(...groups.map(group => group.reduce((sum, lines) => sum + lines.length * 32 + 16, 0)));
  const gridTop = 134;
  const cell = Math.min(44, (width - margin * 2) / result.cols, (height - gridTop - margin - clueHeight - 32) / result.rows);
  const left = (width - result.cols * cell) / 2;
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1.2;
  ctx.fillStyle = '#222';
  result.grid.forEach((row, r) => row.forEach((letter, c) => {
    if (!letter) return;
    const x = left + c * cell, y = gridTop + r * cell;
    ctx.strokeRect(x, y, cell, cell);
    const number = result.numbers[r][c];
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    if (number) {
      ctx.font = `bold ${Math.min(20, cell * .46)}px Arial, sans-serif`;
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
    let y = gridTop + result.rows * cell + 32;
    ctx.font = 'bold 18px Arial, sans-serif';
    ctx.fillText(column === 0 ? 'По горизонтали' : 'По вертикали', x, y);
    y += 36;
    ctx.font = '21px Arial, sans-serif';
    group.forEach(lines => {
      lines.forEach(line => { ctx.fillText(line, x, y); y += 32; });
      y += 16;
    });
  });
}
