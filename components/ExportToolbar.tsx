'use client';

import { useState, type RefObject } from 'react';

interface ExportToolbarProps {
  targetRef: RefObject<HTMLElement>;
  filename: string;
}

import { worksheetPages } from '@/lib/worksheet-export';

// Единая панель экспорта для всех генераторов сайта: печать + PDF + Word + PNG.
// Формат листа — А4 (решение пользователя). Работает с любым содержимым внутри
// targetRef (кроссворды, примеры, диктанты и т.д.) без индивидуальной настройки —
// снимок делается через html2canvas, поэтому новый генератор просто переиспользует
// этот компонент, ничего специфично не дописывая.

export default function ExportToolbar({ targetRef, filename }: ExportToolbarProps) {
  const [busy, setBusy] = useState<'pdf' | 'word' | 'png' | null>(null);
  async function captureCanvas(): Promise<HTMLCanvasElement | null> {
    const node = targetRef.current;
    if (!node) return null;
    if (node instanceof HTMLCanvasElement) return node;
    if (node.classList.contains('propisi-lines')) {
      const { renderPropisiPages, combinePropisiPages } = await import('@/lib/propisi-export');
      return combinePropisiPages(await renderPropisiPages(node));
    }
    await document.fonts.ready;
    const html2canvas = (await import('html2canvas')).default;
    // .no-print (кнопки экспорта, заголовки только для экрана и т.д.) не должны
    // попадать в снимок — html2canvas не понимает @media print, поэтому нужно
    // явно исключать их через ignoreElements, иначе они видны на PDF/PNG.
    return await html2canvas(node, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true,
      ignoreElements: (el) => el.classList.contains('no-print'),
    });
  }

  function downloadBlob(blob: Blob, name: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    // Даём браузеру начать чтение файла до освобождения blob URL.
    window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
  }

  async function handlePdf() {
    setBusy('pdf');
    try {
      if (targetRef.current instanceof HTMLCanvasElement) {
        const { jsPDF } = await import('jspdf');
        const pdf = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
        pdf.addImage(targetRef.current.toDataURL('image/png'), 'PNG', 0, 0, 210, 297, undefined, 'FAST');
        downloadBlob(pdf.output('blob'), `${filename}.pdf`);
        return;
      }
      if (targetRef.current?.classList.contains('propisi-lines')) {
        const { renderPropisiPages } = await import('@/lib/propisi-export');
        const { jsPDF } = await import('jspdf');
        const pages = await renderPropisiPages(targetRef.current);
        const pdf = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
        pages.forEach((page, index) => {
          if (index) pdf.addPage();
          pdf.addImage(page.toDataURL('image/png'), 'PNG', 0, 0, 210, 297, undefined, 'FAST');
        });
        downloadBlob(pdf.output('blob'), `${filename}.pdf`);
        return;
      }
      const canvas = await captureCanvas();
      if (!canvas) return;
      const { jsPDF } = await import('jspdf');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      worksheetPages(canvas).forEach((page, index) => {
        if (index) pdf.addPage();
        pdf.addImage(page.toDataURL('image/png'), 'PNG', 0, 0, 210, 297, undefined, 'FAST');
      });

      downloadBlob(pdf.output('blob'), `${filename}.pdf`);
    } finally {
      setBusy(null);
    }
  }

  async function handlePng() {
    setBusy('png');
    try {
      const canvas = await captureCanvas();
      if (!canvas) return;
      canvas.toBlob((blob) => {
        if (blob) downloadBlob(blob, `${filename}.png`);
      }, 'image/png');
    } finally {
      setBusy(null);
    }
  }

  async function handleWord() {
    setBusy('word');
    const node = targetRef.current;
    if (!node) {
      setBusy(null);
      return;
    }
    try {
      if (node instanceof HTMLCanvasElement) {
        const { propisiWord } = await import('@/lib/propisi-export');
        downloadBlob(await propisiWord([node]), `${filename}.rtf`);
        return;
      }
      if (node.classList.contains('propisi-lines')) {
        const { renderPropisiPages, propisiWord } = await import('@/lib/propisi-export');
        downloadBlob(await propisiWord(await renderPropisiPages(node)), `${filename}.rtf`);
        return;
      }
      // Embed the rendered worksheet: Word cannot reproduce Tailwind grids,
      // SVGs or editable HTML inputs from a bare HTML document.
      const canvas = await captureCanvas();
      if (!canvas) return;
      const { propisiWord } = await import('@/lib/propisi-export');
      downloadBlob(await propisiWord(worksheetPages(canvas)), `${filename}.rtf`);
    } finally {
      setBusy(null);
    }
  }

  async function handlePrint() {
    if (!targetRef.current) return;
    // Не печатаем подменный шрифт, пока письменный алфавит загружается.
    await document.fonts.ready;
    window.print();
  }

  return (
    <div className="no-print flex gap-2 flex-wrap">
      <button onClick={handlePrint} className="btn-secondary text-sm px-4 py-2">
        🖨️ Печать
      </button>
      <button onClick={handlePdf} disabled={busy !== null} className="btn-secondary text-sm px-4 py-2 disabled:opacity-50">
        {busy === 'pdf' ? '...' : '📄 PDF'}
      </button>
      <button title="Файл RTF для Word: готовые листы как изображения" onClick={handleWord} disabled={busy !== null} className="btn-secondary text-sm px-4 py-2 disabled:opacity-50">
        {busy === 'word' ? '...' : '📝 Word'}
      </button>
      <button onClick={handlePng} disabled={busy !== null} className="btn-secondary text-sm px-4 py-2 disabled:opacity-50">
        {busy === 'png' ? '...' : '🖼️ PNG'}
      </button>
    </div>
  );
}
