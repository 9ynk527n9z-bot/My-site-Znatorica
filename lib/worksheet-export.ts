// Pad each image to A4 rather than stretching a short worksheet to page height.
// Prefer a blank horizontal band when a long worksheet needs another page.
export function worksheetPages(source: HTMLCanvasElement): HTMLCanvasElement[] {
  const width = source.width;
  const height = Math.round(width * 297 / 210);
  const sourceContext = source.getContext('2d');
  if (!sourceContext || !width || !source.height) throw new Error('Пустой рабочий лист');
  const pages: HTMLCanvasElement[] = [];
  let top = 0;
  while (top < source.height) {
    let end = Math.min(top + height, source.height);
    if (end < source.height) {
      const start = top + Math.floor(height * 0.8);
      const pixels = sourceContext.getImageData(0, start, width, end - start).data;
      let blankRows = 0;
      for (let row = end - start - 1; row >= 0; row--) {
        let blank = true;
        for (let x = 0; x < width; x++) {
          const offset = (row * width + x) * 4;
          if (pixels[offset + 3] > 0 && Math.min(pixels[offset], pixels[offset + 1], pixels[offset + 2]) < 245) {
            blank = false;
            break;
          }
        }
        blankRows = blank ? blankRows + 1 : 0;
        if (blankRows >= 4) {
          end = start + row + 2;
          break;
        }
      }
    }
    const page = document.createElement('canvas');
    page.width = width;
    page.height = height;
    const context = page.getContext('2d')!;
    context.fillStyle = '#fff';
    context.fillRect(0, 0, width, height);
    context.drawImage(source, 0, top, width, end - top, 0, 0, width, end - top);
    pages.push(page);
    top = end;
  }
  return pages;
}
