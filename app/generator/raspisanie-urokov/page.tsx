'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';

const DAYS_BASE = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'] as const;
const DAY_SATURDAY = 'Суббота';
const LESSON_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

type Cells = Record<string, string>;

function cellKey(day: string, lesson: number): string {
  return `${day}__${lesson}`;
}

function emptyCells(): Cells {
  return {};
}

export default function RaspisanieUrokovPage() {
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [showSaturday, setShowSaturday] = useState(false);
  const [cells, setCells] = useState<Cells>(emptyCells());
  const printRef = useRef<HTMLDivElement>(null);
  const trackedRef = useRef(false);

  const days = showSaturday ? [...DAYS_BASE, DAY_SATURDAY] : [...DAYS_BASE];

  function setCell(day: string, lesson: number, value: string) {
    setCells((prev) => ({ ...prev, [cellKey(day, lesson)]: value }));
  }

  function handleClear() {
    if (!window.confirm('Очистить все поля расписания?')) return;
    setCells(emptyCells());
    setStudentName('');
    setStudentClass('');
  }

  function handleFirstPrint() {
    if (!trackedRef.current) {
      trackUsage('generator:raspisanie-urokov');
      trackedRef.current = true;
    }
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/generator" className="text-orange hover:underline text-sm">
          ← Все генераторы
        </Link>
        <h1 className="text-3xl font-bold mt-2 mb-2">🗓️ Расписание уроков</h1>
        <p className="text-white/75 mb-8">
          Заполни расписание сам и распечатай — красивый шаблон на неделю для школьника. Впиши
          имя, класс и названия предметов в клетки таблицы.
        </p>

        <div className="card mb-8 no-print">
          <label className="flex items-center gap-3 cursor-pointer w-fit">
            <input
              type="checkbox"
              checked={showSaturday}
              onChange={(e) => setShowSaturday(e.target.checked)}
              className="w-5 h-5 accent-orange"
            />
            <span className="text-sm font-medium">Добавить субботу</span>
          </label>
        </div>

        <div ref={printRef} onClickCapture={handleFirstPrint} className="card print-page bg-white">
          <div className="no-print mb-4 flex justify-between items-center flex-wrap gap-3">
            <span className="text-sm text-gray-500">Заполни поля перед печатью</span>
            <div className="flex items-center gap-3">
              <button onClick={handleClear} className="btn-secondary text-sm px-4 py-2">
                🗑️ Очистить
              </button>
              <ExportToolbar targetRef={printRef} filename="raspisanie-urokov" />
            </div>
          </div>

          <div className="no-print flex items-center gap-3 mb-6">
            <Image src="/logo.png" alt="Знаторика" width={48} height={48} className="no-print rounded-full flex-shrink-0" />
            <h2 className="text-xl font-bold text-black">Расписание уроков</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Ученик</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Имя и фамилия"
                className="w-full border-b-2 border-gray-300 focus:border-orange outline-none text-black text-lg py-1 bg-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Класс</label>
              <input
                type="text"
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                placeholder="Например, 3 «А»"
                className="w-full border-b-2 border-gray-300 focus:border-orange outline-none text-black text-lg py-1 bg-transparent"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-black">
              <thead>
                <tr>
                  <th className="border-2 border-violet bg-violet text-white text-sm font-bold py-2 px-2 w-12">
                    Урок
                  </th>
                  {days.map((day) => (
                    <th
                      key={day}
                      className="border-2 border-violet bg-violet text-white text-sm font-bold py-2 px-2"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LESSON_NUMBERS.map((lesson, i) => (
                  <tr key={lesson} className={i % 2 === 0 ? 'bg-white' : 'bg-orange/10'}>
                    <td className="border-2 border-gray-300 text-center font-bold text-gray-500 py-1">
                      {lesson}
                    </td>
                    {days.map((day) => (
                      <td key={day} className="border-2 border-gray-300 p-0">
                        <input
                          type="text"
                          value={cells[cellKey(day, lesson)] ?? ''}
                          onChange={(e) => setCell(day, lesson, e.target.value)}
                          placeholder=""
                          className="w-full h-11 text-center text-black text-sm outline-none bg-transparent focus:bg-orange/20 px-1"
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
    </div>
  );
}
