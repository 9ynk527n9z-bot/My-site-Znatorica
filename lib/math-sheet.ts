export function drawMathSheet(canvas: HTMLCanvasElement, examples: { text: string; answer: number }[], answers: boolean) {
  const width = 794, height = 1123, margin = 57;
  canvas.width = width * 2;
  canvas.height = height * 2;
  const context = canvas.getContext('2d');
  if (!context) return;
  context.scale(2, 2);
  context.fillStyle = '#fff';
  context.fillRect(0, 0, width, height);
  const columns = examples.length > 40 ? 3 : 2;
  const rows = Math.ceil(examples.length / columns);
  const columnWidth = (width - margin * 2) / columns;
  const rowHeight = Math.min(52, (height - margin * 2) / Math.max(1, rows));
  let size = examples.length > 60 ? 18 : examples.length > 30 ? 22 : 28;
  const texts = examples.map(example => answers ? example.text.replace('___', String(example.answer)) : example.text);
  context.font = `${size}px Arial, sans-serif`;
  const widest = Math.max(...texts.map(text => context.measureText(text).width), 1);
  size = Math.min(size, size * (columnWidth - 24) / widest);
  context.font = `${size}px Arial, sans-serif`;
  context.textBaseline = 'middle';
  context.fillStyle = '#222';
  texts.forEach((text, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    context.fillText(text, margin + column * columnWidth + 8, margin + row * rowHeight + rowHeight / 2);
  });
}
