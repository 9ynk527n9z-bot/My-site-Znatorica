'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';
import PageAbout from '@/components/PageAbout';

const DAYS = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'] as const;
const BASE_ROWS = 4;
const MAX_ROWS = 6;

type Cells = Record<string, string>;

function cellKey(day: string, row: number): string {
  return `${day}__${row}`;
}

export default function RaspisanieKruzhkovPage() {
  const [studentName, setStudentName] = useState('');
  const [rowsCount, setRowsCount] = useState(BASE_ROWS);
  const [cells, setCells] = useState<Cells>({});
  const printRef = useRef<HTMLDivElement>(null);
  const trackedRef = useRef(false);

  function setCell(day: string, row: number, value: string) {
    setCells((prev) => ({ ...prev, [cellKey(day, row)]: value }));
  }

  function handleClear() {
    if (!window.confirm('Очистить всё расписание кружков?')) return;
    setCells({});
    setStudentName('');
  }

  function handleFirstPrint() {
    if (!trackedRef.current) {
      trackUsage('generator:raspisanie-kruzhkov');
      trackedRef.current = true;
    }
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <Link href="/generator" className="text-orange hover:underline text-sm">
          ← Все генераторы
        </Link>
        <h1 className="text-3xl font-bold mt-2 mb-2">🎨 Расписание кружков и секций</h1>
        <p className="text-white/75 mb-8">
          Впиши название и время каждого занятия в нужный день недели — получится наглядное
          расписание всех кружков и секций ребёнка на неделю, включая выходные.
        </p>

        <div className="card mb-8 no-print">
          <label className="flex items-center gap-3 cursor-pointer w-fit">
            <input
              type="checkbox"
              checked={rowsCount === MAX_ROWS}
              onChange={(e) => setRowsCount(e.target.checked ? MAX_ROWS : BASE_ROWS)}
              className="w-5 h-5 accent-orange"
            />
            <span className="text-sm font-medium">Добавить ещё строки (для большего числа занятий в день)</span>
          </label>
        </div>

        <div ref={printRef} onClickCapture={handleFirstPrint} className="card print-page bg-white">
          <div className="no-print mb-4 flex justify-between items-center flex-wrap gap-3">
            <span className="text-sm text-gray-500">Заполни поля перед печатью</span>
            <div className="flex items-center gap-3">
              <button onClick={handleClear} className="btn-secondary text-sm px-4 py-2">
                🗑️ Очистить
              </button>
              <ExportToolbar targetRef={printRef} filename="raspisanie-kruzhkov" />
            </div>
          </div>

          <div className="no-print flex items-center gap-3 mb-6">
            <Image src="/logo.png" alt="Знаторика" width={48} height={48} className="no-print rounded-full flex-shrink-0" />
            <h2 className="text-xl font-bold text-black">Расписание кружков и секций</h2>
          </div>
          <h2 className="hidden print:block text-xl font-bold text-black mb-4">Расписание кружков и секций</h2>

          <div className="mb-6">
            <label className="block text-xs font-medium text-gray-500 mb-1">Ученик</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Имя и фамилия"
              className="w-full max-w-sm border-b-2 border-gray-300 focus:border-orange outline-none text-black text-lg py-1 bg-transparent"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-black">
              <thead>
                <tr>
                  {DAYS.map((day) => (
                    <th
                      key={day}
                      className="border-2 border-violet bg-violet text-white text-xs sm:text-sm font-bold py-2 px-2"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: rowsCount }, (_, i) => i + 1).map((row, i) => (
                  <tr key={row} className={i % 2 === 0 ? 'bg-white' : 'bg-orange/10'}>
                    {DAYS.map((day) => (
                      <td key={day} className="border-2 border-gray-300 p-0">
                        <input
                          type="text"
                          value={cells[cellKey(day, row)] ?? ''}
                          onChange={(e) => setCell(day, row, e.target.value)}
                          placeholder=""
                          className="w-full h-14 text-center text-black text-xs sm:text-sm outline-none bg-transparent focus:bg-orange/20 px-1"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <PageAbout route="/generator/raspisanie-kruzhkov" />
    </div>
  );
}
