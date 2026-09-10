'use client';

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import ExportToolbar from '@/components/ExportToolbar';
import { trackUsage } from '@/lib/track';

const WEEKDAYS = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'] as const;

interface DutyRow {
  date: string;
  day: string;
  pupils: string[];
}

function mondayIso(): string {
  const date = new Date();
  const day = date.getDay() || 7;
  date.setDate(date.getDate() - day + 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const number = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${number}`;
}

function parsePupils(value: string): string[] {
  return value
    .split(/\n|,|;/)
    .map((name) => name.trim().replace(/\s+/g, ' '))
    .filter(Boolean)
    .filter((name, index, names) => names.indexOf(name) === index);
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit' }).format(
    new Date(`${value}T12:00:00`),
  );
}

function buildRows(startDate: string, weeks: number, includeSaturday: boolean, perDay: number, pupils: string[]): DutyRow[] {
  if (!startDate || pupils.length === 0) return [];
  const date = new Date(`${startDate}T12:00:00`);
  const targetRows = weeks * (includeSaturday ? 6 : 5);
  const rows: DutyRow[] = [];
  let pupilIndex = 0;

  while (rows.length < targetRows) {
    const weekDay = date.getDay();
    const isStudyDay = weekDay >= 1 && weekDay <= (includeSaturday ? 6 : 5);
    if (isStudyDay) {
      const assigned = Array.from({ length: perDay }, () => {
        const pupil = pupils[pupilIndex % pupils.length];
        pupilIndex += 1;
        return pupil;
      });
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const number = String(date.getDate()).padStart(2, '0');
      rows.push({ date: `${year}-${month}-${number}`, day: WEEKDAYS[weekDay - 1], pupils: assigned });
    }
    date.setDate(date.getDate() + 1);
  }
  return rows;
}

export default function GrafikDezhurstvPage() {
  const [className, setClassName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [pupilText, setPupilText] = useState('');
  const [startDate, setStartDate] = useState(mondayIso);
  const [weeks, setWeeks] = useState(2);
  const [perDay, setPerDay] = useState(2);
  const [includeSaturday, setIncludeSaturday] = useState(false);
  const [rows, setRows] = useState<DutyRow[]>([]);
  const printRef = useRef<HTMLDivElement>(null);
  const trackedRef = useRef(false);
  const pupils = useMemo(() => parsePupils(pupilText), [pupilText]);

  function generate() {
    setRows(buildRows(startDate, weeks, includeSaturday, perDay, pupils));
    if (!trackedRef.current) {
      trackUsage('generator:grafik-dezhurstv');
      trackedRef.current = true;
    }
  }

  function updatePupil(rowIndex: number, pupilIndex: number, value: string) {
    setRows((current) => current.map((row, index) => (
      index === rowIndex
        ? { ...row, pupils: row.pupils.map((pupil, i) => (i === pupilIndex ? value : pupil)) }
        : row
    )));
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <Link href="/generator" className="text-orange hover:underline text-sm">
          ← Все генераторы
        </Link>
        <h1 className="text-3xl font-bold mt-2 mb-2">🧹 График дежурств по классу</h1>
        <p className="text-white/75 mb-8">
          Введи список учеников — генератор равномерно распределит дежурства по дням.
          Готовый график можно изменить и распечатать.
        </p>

        <section className="card mb-8 no-print">
          <div className="grid md:grid-cols-2 gap-5">
            <label className="block">
              <span className="block text-sm font-bold mb-2">Класс</span>
              <input value={className} onChange={(event) => setClassName(event.target.value)} placeholder="Например, 3 «А»" className="w-full rounded-lg border border-white/20 bg-black/25 px-4 py-3" />
            </label>
            <label className="block">
              <span className="block text-sm font-bold mb-2">Классный руководитель <span className="font-normal text-white/50">(необязательно)</span></span>
              <input value={teacherName} onChange={(event) => setTeacherName(event.target.value)} placeholder="Имя и отчество" className="w-full rounded-lg border border-white/20 bg-black/25 px-4 py-3" />
            </label>
          </div>

          <label className="block mt-5">
            <span className="block text-sm font-bold mb-2">Ученики — каждый с новой строки</span>
            <textarea value={pupilText} onChange={(event) => setPupilText(event.target.value)} rows={7} placeholder={'Анна Иванова\nМаксим Петров\nСофия Орлова'} className="w-full rounded-lg border border-white/20 bg-black/25 px-4 py-3 resize-y" />
            <span className="block text-xs text-white/55 mt-1">Уникальных имён: {pupils.length}</span>
          </label>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            <label className="block">
              <span className="block text-sm font-bold mb-2">Первый день</span>
              <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} className="w-full rounded-lg border border-white/20 bg-black/25 px-3 py-2.5" />
            </label>
            <label className="block">
              <span className="block text-sm font-bold mb-2">Недель</span>
              <select value={weeks} onChange={(event) => setWeeks(Number(event.target.value))} className="w-full rounded-lg border border-white/20 bg-[#28134f] px-3 py-2.5">
                {[1, 2, 3, 4].map((value) => <option key={value} value={value}>{value}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="block text-sm font-bold mb-2">Дежурных в день</span>
              <select value={perDay} onChange={(event) => setPerDay(Number(event.target.value))} className="w-full rounded-lg border border-white/20 bg-[#28134f] px-3 py-2.5">
                {[1, 2, 3].map((value) => <option key={value} value={value}>{value}</option>)}
              </select>
            </label>
            <label className="flex items-end gap-3 pb-2.5 cursor-pointer">
              <input type="checkbox" checked={includeSaturday} onChange={(event) => setIncludeSaturday(event.target.checked)} className="w-5 h-5 accent-orange" />
              <span className="text-sm font-bold">Учитывать субботу</span>
            </label>
          </div>

          <button onClick={generate} disabled={pupils.length === 0 || !startDate} className="btn-primary mt-6 px-6 py-3 disabled:opacity-50">
            🧹 Составить график
          </button>
        </section>

        {rows.length > 0 && (
          <section ref={printRef} className="card print-page bg-white text-black">
            <div className="no-print flex justify-end mb-5">
              <ExportToolbar targetRef={printRef} filename="grafik-dezhurstv" />
            </div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-[#3a1c6e]">График дежурств {className ? `· ${className} класс` : 'по классу'}</h2>
              {teacherName && <p className="text-sm text-gray-600 mt-1">Классный руководитель: {teacherName}</p>}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border-2 border-violet bg-violet text-white py-2 px-3 w-24">Дата</th>
                    <th className="border-2 border-violet bg-violet text-white py-2 px-3">День</th>
                    {Array.from({ length: perDay }, (_, index) => (
                      <th key={index} className="border-2 border-violet bg-violet text-white py-2 px-3">Дежурный {index + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr key={`${row.date}-${rowIndex}`} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-orange/10'}>
                      <td className="border-2 border-gray-300 text-center font-bold py-2 px-2">{formatDate(row.date)}</td>
                      <td className="border-2 border-gray-300 py-2 px-3 font-bold">{row.day}</td>
                      {row.pupils.map((pupil, pupilIndex) => (
                        <td key={pupilIndex} className="border-2 border-gray-300 p-0">
                          <input value={pupil} onChange={(event) => updatePupil(rowIndex, pupilIndex, event.target.value)} aria-label={`Дежурный ${pupilIndex + 1}, ${row.day}`} className="w-full min-w-32 bg-transparent px-3 py-2 text-center outline-none focus:bg-orange/20" />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
