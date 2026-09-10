interface MathSheetOptions {
  title: string;
  subtitle: string;
  symbol: string;
  centerTitle?: boolean;
}

function roundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
}

export function drawMathSheet(
  canvas: HTMLCanvasElement,
  examples: { text: string; answer: number }[],
  answers: boolean,
  options?: MathSheetOptions,
) {
  const width = 794, height = 1123, margin = 57;
  canvas.width = width * 2;
  canvas.height = height * 2;
  const context = canvas.getContext('2d');
  if (!context) return;
  context.scale(2, 2);
  context.fillStyle = '#fff';
  context.fillRect(0, 0, width, height);

  if (options) {
    const frameX = 30;
    const frameY = 30;
    const frameWidth = width - frameX * 2;
    const frameHeight = height - frameY * 2;

    roundedRect(context, frameX, frameY, frameWidth, frameHeight, 20);
    context.strokeStyle = '#A78BFA';
    context.lineWidth = 3;
    context.stroke();

    context.fillStyle = '#6D28D9';
    context.font = '700 13px Arial, sans-serif';
    context.textBaseline = 'alphabetic';
    context.fillText('МАТЕМАТИКА', 62, 76);

    context.fillStyle = '#32145F';
    context.font = '700 31px Arial, sans-serif';
    context.textAlign = options.centerTitle ? 'center' : 'left';
    context.fillText(options.title, options.centerTitle ? width / 2 : 62, 113);
    context.textAlign = 'left';

    context.fillStyle = '#64748B';
    context.font = '16px Arial, sans-serif';
    context.fillText(options.subtitle, 62, 141);

    roundedRect(context, 666, 59, 68, 68, 16);
    context.fillStyle = '#F3E8FF';
    context.fill();
    context.fillStyle = '#6D28D9';
    context.font = '700 38px Arial, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(options.symbol, 700, 94);

    context.textAlign = 'left';
    context.textBaseline = 'alphabetic';
    context.fillStyle = '#475569';
    context.font = '15px Arial, sans-serif';
    context.fillText('Имя', 62, 181);
    context.fillText('Дата', 450, 181);
    context.strokeStyle = '#CBD5E1';
    context.lineWidth = 1.5;
    context.beginPath();
    context.moveTo(104, 180);
    context.lineTo(400, 180);
    context.moveTo(490, 180);
    context.lineTo(702, 180);
    context.stroke();

    context.strokeStyle = '#E9D5FF';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(62, 207);
    context.lineTo(732, 207);
    context.stroke();

    const columns = examples.length > 60 ? 4 : examples.length > 40 ? 3 : 2;
    const rows = Math.ceil(examples.length / columns);
    const gap = columns === 4 ? 8 : 12;
    const contentX = 62;
    const contentY = 230;
    const contentWidth = 670;
    const contentHeight = 825;
    const columnWidth = (contentWidth - gap * (columns - 1)) / columns;
    const rowGap = rows > 20 ? 5 : 8;
    const rowHeight = Math.min(64, (contentHeight - rowGap * Math.max(0, rows - 1)) / Math.max(1, rows));
    const fontSize = examples.length > 80 ? 16 : examples.length > 60 ? 18 : examples.length > 40 ? 20 : examples.length > 20 ? 23 : 27;
    const texts = examples.map((example) => answers ? example.text.replace('___', String(example.answer)) : example.text);

    texts.forEach((text, index) => {
      const column = Math.floor(index / rows);
      const row = index % rows;
      const x = contentX + column * (columnWidth + gap);
      const y = contentY + row * (rowHeight + rowGap);

      roundedRect(context, x, y, columnWidth, rowHeight, 10);
      context.strokeStyle = '#E2E8F0';
      context.lineWidth = 1.5;
      context.stroke();

      context.fillStyle = '#64748B';
      context.font = '900 24px Arial, sans-serif';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(String(index + 1), x + 27, y + rowHeight / 2);

      context.strokeStyle = '#E2E8F0';
      context.beginPath();
      context.moveTo(x + 55, y + 8);
      context.lineTo(x + 55, y + rowHeight - 8);
      context.stroke();

      context.fillStyle = '#111827';
      context.font = `700 ${fontSize}px Arial, sans-serif`;
      context.textAlign = 'left';
      const availableTextWidth = columnWidth - 74;
      const measured = context.measureText(text).width;
      const adjustedSize = measured > availableTextWidth ? fontSize * availableTextWidth / measured : fontSize;
      context.font = `700 ${adjustedSize}px Arial, sans-serif`;
      context.fillText(text, x + 68, y + rowHeight / 2 + 1);
    });

    context.fillStyle = '#94A3B8';
    context.font = '13px Arial, sans-serif';
    context.textAlign = 'left';
    context.textBaseline = 'alphabetic';
    context.fillText(`${examples.length} примеров`, 62, 1080);
    context.textAlign = 'right';
    context.fillStyle = '#7C3AED';
    context.font = '700 13px Arial, sans-serif';
    context.fillText(answers ? 'С ответами' : 'Для самостоятельной работы', 732, 1080);
    return;
  }

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
