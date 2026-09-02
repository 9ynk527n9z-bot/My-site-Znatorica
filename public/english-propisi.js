/* One rendered A4 sheet is used for preview, printing and all downloads. */
let englishPages = [];
const EN_WIDTH = 794, EN_HEIGHT = 1123, EN_MARGIN = 57, EN_SCALE = 2;

async function buildEnglishPages(text, size, mode, writeLines, hints) {
  await document.fonts.load(`${size}px "English School"`, 'Aa Bb Gg Pp Yy');
  const measure = document.createElement('canvas').getContext('2d');
  measure.font = `${size}px "English School"`;
  const upper = measure.measureText('H').actualBoundingBoxAscent;
  const lower = measure.measureText('x').actualBoundingBoxAscent;
  const descent = Math.max(measure.measureText('gyjpq').actualBoundingBoxDescent, size * .2);
  const rowHeight = Math.ceil(upper + descent + 28);
  const width = EN_WIDTH - EN_MARGIN * 2;
  const pages = [];
  let context, y;
  function page() {
    const canvas = document.createElement('canvas');
    canvas.width = EN_WIDTH * EN_SCALE; canvas.height = EN_HEIGHT * EN_SCALE;
    context = canvas.getContext('2d'); context.scale(EN_SCALE, EN_SCALE);
    context.fillStyle = '#fff'; context.fillRect(0, 0, EN_WIDTH, EN_HEIGHT);
    context.font = `${size}px "English School"`; context.textBaseline = 'alphabetic';
    canvas.className = 'english-sheet';
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', '');
    pages.push(canvas); y = EN_MARGIN;
  }
  function wrap(line) {
    const lines = []; let part = '';
    for (const word of line.trim().split(/\s+/)) {
      const candidate = part ? part + ' ' + word : word;
      if (measure.measureText(candidate).width <= width - 8) { part = candidate; continue; }
      if (part) { lines.push(part); part = ''; }
      for (const char of Array.from(word)) {
        if (part && measure.measureText(part + char).width > width - 8) { lines.push(part); part = ''; }
        part += char;
      }
    }
    if (part) lines.push(part);
    return lines;
  }
  function row(value, style) {
    if (y + rowHeight > EN_HEIGHT - EN_MARGIN) throw new Error('Строки не помещаются на один лист. Уменьшите размер букв или сократите текст.');
    const baseline = y + 12 + upper;
    for (const [lineY, dashed] of [[baseline - upper, false], [baseline - lower, true], [baseline, false]]) {
      context.beginPath(); context.lineWidth = 1;
      context.strokeStyle = lineY === baseline ? '#94a3b8' : '#d6dce5';
      context.setLineDash(dashed ? [3, 4] : []);
      context.moveTo(EN_MARGIN, lineY); context.lineTo(EN_WIDTH - EN_MARGIN, lineY); context.stroke();
    }
    context.setLineDash([]);
    if (value) {
      const x = EN_MARGIN + 4;
      if (style === 'outline' || style === 'dotted') {
        context.strokeStyle = '#929dab'; context.lineWidth = 1.1;
        context.setLineDash(style === 'dotted' ? [1, 3] : []);
        context.strokeText(value, x, baseline); context.setLineDash([]);
      } else {
        context.fillStyle = style === 'hint' ? '#b9c1cc' : '#a5aebb';
        context.fillText(value, x, baseline);
      }
      const canvas = pages[pages.length - 1];
      canvas.setAttribute('aria-label', (canvas.getAttribute('aria-label') + ' ' + value).trim());
    }
    y += rowHeight;
  }
  const lines = text.split('\n').filter(line => line.trim()).slice(0, 10).flatMap(wrap);
  const available = EN_HEIGHT - EN_MARGIN * 2 - Math.max(0, lines.length - 1) * 18;
  const rowsPerGroup = Math.floor(available / (Math.max(1, lines.length) * rowHeight));
  const maximumPractice = rowsPerGroup - (mode === 'none' ? 0 : 1);
  if (maximumPractice < 1) {
    throw new Error('Текст не помещается на один лист А4. Уменьшите размер букв или сократите текст.');
  }
  const actualPractice = Math.min(Math.max(1, writeLines), maximumPractice);
  page();
  for (const line of lines) {
    if (mode !== 'none') row(line, mode);
    for (let i = 0; i < actualPractice; i++) row(hints && mode !== 'none' ? line : '', 'hint');
    y += 18;
  }
  const status = document.getElementById('sheetStatus');
  if (status) status.textContent = actualPractice < writeLines
    ? `Один лист А4: под каждым образцом помещается ${actualPractice} стр. для тренировки из выбранных ${writeLines}. Для большего числа строк уменьшите буквы или сократите текст.`
    : 'Один лист А4';
  return pages;
}

function downloadEnglishBlob(blob, name) {
  const url = URL.createObjectURL(blob), link = document.createElement('a');
  link.href = url; link.download = name; document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
async function englishExport(action) {
  if (!englishPages.length) return;
  document.querySelectorAll('.dl-toolbar button').forEach(button => button.disabled = true);
  try { await action(); }
  catch (error) { alert('Не удалось сохранить прописи. Попробуйте ещё раз.'); }
  finally { document.querySelectorAll('.dl-toolbar button').forEach(button => button.disabled = false); }
}
function downloadPDF() {
  return englishExport(async () => {
    const pdf = new window.jspdf.jsPDF({ unit: 'mm', format: 'a4', compress: true });
    englishPages.forEach((canvas, index) => {
      if (index) pdf.addPage();
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297, undefined, 'FAST');
    });
    downloadEnglishBlob(pdf.output('blob'), 'english-propisi.pdf');
  });
}
function downloadPNG() {
  return englishExport(async () => {
    // Separate full-size pages avoid browser limits on very tall canvases.
    for (let index = 0; index < englishPages.length; index++) {
      const blob = await new Promise((resolve, reject) => englishPages[index].toBlob(blob => blob ? resolve(blob) : reject(new Error('PNG')), 'image/png'));
      downloadEnglishBlob(blob, `english-propisi-${index + 1}.png`);
    }
  });
}
function downloadWord() {
  return englishExport(async () => {
    const pictures = await Promise.all(englishPages.map(async canvas => {
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      const bytes = new Uint8Array(await blob.arrayBuffer());
      const hex = Array.from(bytes, value => value.toString(16).padStart(2, '0')).join('');
      return `{\\pict\\pngblip\\picw${canvas.width}\\pich${canvas.height}\\picwgoal11900\\pichgoal16830\n${hex}}`;
    }));
    const rtf = `{\\rtf1\\ansi\\deff0\\paperw11906\\paperh16838\\margl0\\margr0\\margt0\\margb0\\viewkind4\\pard\\sl0\\slmult0\n${pictures.join('\\page\n')}}`;
    downloadEnglishBlob(new Blob([rtf], { type: 'application/rtf' }), 'english-propisi.rtf');
  });
}
