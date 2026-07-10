'use client';

import { useEffect, useState, type RefObject } from 'react';

interface ExportToolbarProps {
  targetRef: RefObject<HTMLElement>;
  filename: string;
}

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

// Единая панель экспорта для всех генераторов сайта: печать + PDF + Word + PNG.
// Формат листа — А4 (решение пользователя). Работает с любым содержимым внутри
// targetRef (кроссворды, примеры, диктанты и т.д.) без индивидуальной настройки —
// снимок делается через html2canvas, поэтому новый генератор просто переиспользует
// этот компонент, ничего специфично не дописывая.
//
// Защита материалов от копирования конкурентами: на каждый экспортируемый/
// печатаемый лист временно добавляется подпись (убирается сразу после захвата).
// Для бесплатных/анонимных пользователей — полная подпись с явным указанием
// на авторское право (сдерживает случайное распространение). Для активных
// подписчиков — только доменное имя, мельче и без «юридической» формулировки:
// платный материал должен выглядеть чисто, но источник всё равно остаётся
// виден, если файл всё же попадёт третьим лицам (в т.ч. если подписчик сам
// решит поделиться материалом с конкурентом — риск не устраняется полностью,
// только смягчается по сравнению с анонимным/бесплатным скачиванием).
const WATERMARK_FULL = '© Знаторика · znatorica.ru — материал защищён авторским правом';
const WATERMARK_SUBTLE = 'znatorica.ru';

function addWatermark(node: HTMLElement, isSubscriber: boolean): HTMLElement {
  const el = document.createElement('div');
  el.textContent = isSubscriber ? WATERMARK_SUBTLE : WATERMARK_FULL;
  el.setAttribute('data-export-watermark', 'true');
  Object.assign(el.style, {
    marginTop: '16px',
    paddingTop: '8px',
    borderTop: '1px solid #ddd',
    fontSize: isSubscriber ? '9px' : '10px',
    color: isSubscriber ? '#ccc' : '#999',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  });
  node.appendChild(el);
  return el;
}

export default function ExportToolbar({ targetRef, filename }: ExportToolbarProps) {
  const [busy, setBusy] = useState<'pdf' | 'word' | 'png' | null>(null);
  const [isSubscriber, setIsSubscriber] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    fetch('/api/user/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setIsSubscriber(!!data?.subscription?.isActive))
      .catch(() => {});
  }, []);

  async function captureCanvas(): Promise<HTMLCanvasElement | null> {
    const node = targetRef.current;
    if (!node) return null;
    const watermark = addWatermark(node, isSubscriber);
    try {
      const html2canvas = (await import('html2canvas')).default;
      return await html2canvas(node, { scale: 2, backgroundColor: '#ffffff', useCORS: true });
    } finally {
      watermark.remove();
    }
  }

  function downloadBlob(blob: Blob, name: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function handlePdf() {
    setBusy('pdf');
    try {
      const canvas = await captureCanvas();
      if (!canvas) return;
      const { jsPDF } = await import('jspdf');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      const imgWidth = A4_WIDTH_MM;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL('image/png');

      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= A4_HEIGHT_MM;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= A4_HEIGHT_MM;
      }

      pdf.save(`${filename}.pdf`);
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

  function handleWord() {
    setBusy('word');
    const node = targetRef.current;
    if (!node) {
      setBusy(null);
      return;
    }
    const watermark = addWatermark(node, isSubscriber);
    try {
      // Word открывает HTML, сохранённый с расширением .doc, как обычный документ —
      // не нужна тяжёлая библиотека генерации настоящего .docx для простых рабочих листов.
      const html = `<!DOCTYPE html><html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
        <head><meta charset="utf-8"><title>${filename}</title>
        <style>
          @page { size: 21cm 29.7cm; margin: 1.5cm; }
          body { font-family: Arial, sans-serif; color: #000; }
          * { background: transparent !important; color: #000 !important; border-color: #999 !important; }
        </style></head>
        <body>${node.outerHTML}</body></html>`;
      const blob = new Blob(['﻿', html], { type: 'application/msword' });
      downloadBlob(blob, `${filename}.doc`);
    } finally {
      watermark.remove();
      setBusy(null);
    }
  }

  function handlePrint() {
    const node = targetRef.current;
    if (!node) {
      window.print();
      return;
    }
    const watermark = addWatermark(node, isSubscriber);
    window.addEventListener('afterprint', () => watermark.remove(), { once: true });
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
      <button onClick={handleWord} disabled={busy !== null} className="btn-secondary text-sm px-4 py-2 disabled:opacity-50">
        {busy === 'word' ? '...' : '📝 Word'}
      </button>
      <button onClick={handlePng} disabled={busy !== null} className="btn-secondary text-sm px-4 py-2 disabled:opacity-50">
        {busy === 'png' ? '...' : '🖼️ PNG'}
      </button>
    </div>
  );
}
