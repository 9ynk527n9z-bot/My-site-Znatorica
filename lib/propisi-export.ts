// Native canvas text keeps the handwriting font, baseline and outline together.
// html2canvas shifts this font's baseline; Word HTML also loses its font and CSS.
const WIDTH = 794;
const HEIGHT = 1123;
const MARGIN = 57;
const SCALE = 2;

export async function renderPropisiPages(node: HTMLElement): Promise<HTMLCanvasElement[]> {
  await document.fonts.ready;
  const family = getComputedStyle(node).fontFamily;
  const cursive = node.classList.contains('propisi-cursive');
  await document.fonts.load(`88px ${family}`, node.textContent || 'Аа');
  const pages: HTMLCanvasElement[] = [];
  let ctx: CanvasRenderingContext2D;
  let y = MARGIN;
  function newPage() {
    const canvas = document.createElement('canvas');
    canvas.width = WIDTH * SCALE;
    canvas.height = HEIGHT * SCALE;
    ctx = canvas.getContext('2d')!;
    ctx.scale(SCALE, SCALE);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    pages.push(canvas);
    y = MARGIN;
  }
  newPage();
  for (const block of Array.from(node.querySelectorAll('.propisi-letter-block'))) {
    const rows = Array.from(block.querySelectorAll('.propisi-line'));
    if (y + rows.length * 116 > HEIGHT - MARGIN) newPage();
    for (const row of rows) {
      for (const [offset, dashed] of [[20, false], [49, true], [80, false]] as const) {
        ctx!.beginPath();
        ctx!.strokeStyle = offset === 80 ? '#94a3b8' : '#d6dce5';
        ctx!.lineWidth = 1;
        ctx!.setLineDash(dashed ? [3, 3] : []);
        ctx!.moveTo(MARGIN, y + offset);
        ctx!.lineTo(WIDTH - MARGIN, y + offset);
        ctx!.stroke();
      }
      ctx!.setLineDash([]);
      const letter = row.querySelector('.propisi-model')?.textContent || '';
      const size = cursive ? 88 : row.classList.contains('propisi-lower') ? 56 : 72;
      ctx!.font = `400 ${size}px ${family}`;
      ctx!.textAlign = 'center';
      ctx!.textBaseline = 'alphabetic';
      for (let i = 0; i < 5; i++) {
        const x = MARGIN + (WIDTH - MARGIN * 2) * (i + 0.5) / 7;
        if (i === 0) {
          ctx!.fillStyle = '#222';
          ctx!.fillText(letter, x, y + 80);
        } else {
          ctx!.strokeStyle = '#999';
          ctx!.lineWidth = 1;
          ctx!.strokeText(letter, x, y + 80);
        }
      }
      y += 116;
    }
    y += 24;
  }
  return pages;
}

export function combinePropisiPages(pages: HTMLCanvasElement[]): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = pages[0].width;
  canvas.height = pages.reduce((height, page) => height + page.height, 0);
  const ctx = canvas.getContext('2d')!;
  let y = 0;
  for (const page of pages) { ctx.drawImage(page, 0, y); y += page.height; }
  return canvas;
}

// RTF embeds PNG bytes, so Word needs neither this website's CSS nor installed fonts.
export async function propisiWord(pages: HTMLCanvasElement[]): Promise<Blob> {
  const pictures = await Promise.all(pages.map(async (page) => {
    const blob = await new Promise<Blob>((resolve, reject) => page.toBlob(value => value ? resolve(value) : reject(new Error('Не удалось сохранить прописи')), 'image/png'));
    const bytes = new Uint8Array(await blob.arrayBuffer());
    const hex = Array.from(bytes, value => value.toString(16).padStart(2, '0')).join('');
    return `{\\pict\\pngblip\\picw${page.width}\\pich${page.height}\\picwgoal11900\\pichgoal16830\n${hex}}`;
  }));
  return new Blob([`{\\rtf1\\ansi\\deff0\\paperw11906\\paperh16838\\margl0\\margr0\\margt0\\margb0\\viewkind4\\pard\\sl0\\slmult0\n${pictures.join('\\page\n')}}`], { type: 'application/rtf' });
}
