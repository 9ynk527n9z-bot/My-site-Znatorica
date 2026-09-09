'use client';

import Link from 'next/link';
import { Fragment, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';
import PageAbout from '@/components/PageAbout';

function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return 0;
  return h * 60 + m;
}

function toTime(minutes: number): string {
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

interface Row {
  lesson: number;
  start: string;
  end: string;
  breakAfter?: number;
}

type Overrides = Record<number, { start?: string; end?: string }>;

export default function RaspisanieZvonkovPage() {
  const [label, setLabel] = useState('');
  const [startTime, setStartTime] = useState('08:30');
  const [lessonMinutes, setLessonMinutes] = useState(40);
  const [breakMinutes, setBreakMinutes] = useState(10);
  const [longBreakMinutes, setLongBreakMinutes] = useState(20);
  const [longBreakAfter, setLongBreakAfter] = useState(3);
  const [lessonsCount, setLessonsCount] = useState(7);
  const [overrides, setOverrides] = useState<Overrides>({});
  const printRef = useRef<HTMLDivElement>(null);
  const trackedRef = useRef(false);

  function handleFirstPrint() {
    if (!trackedRef.current) {
      trackUsage('generator:raspisanie-zvonkov');
      trackedRef.current = true;
    }
  }

  function setOverride(lesson: number, field: 'start' | 'end', value: string) {
    setOverrides((prev) => ({ ...prev, [lesson]: { ...prev[lesson], [field]: value } }));
  }

  function handleResetOverrides() {
    setOverrides({});
  }

  // Каждый урок по умолчанию считается от предыдущего (время + длительность + перемена),
  // но если урок отредактирован вручную (например, сдвинут из-за линейки), дальнейшее
  // расписание считается уже от его фактического времени — а не от расчётного.
  const rows: Row[] = useMemo(() => {
    const list: Row[] = [];
    let cursor = toMinutes(startTime);
    for (let lesson = 1; lesson <= lessonsCount; lesson++) {
      const ov = overrides[lesson];
      const start = ov?.start ?? toTime(cursor);
      const end = ov?.end ?? toTime(toMinutes(start) + lessonMinutes);
      list.push({ lesson, start, end });
      cursor = toMinutes(end) + (lesson === longBreakAfter ? longBreakMinutes : breakMinutes);
    }
    return list;
  }, [startTime, lessonMinutes, breakMinutes, longBreakMinutes, longBreakAfter, lessonsCount, overrides]);

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/generator" className="text-orange hover:underline text-sm">
          ← Все генераторы
        </Link>
        <h1 className="text-3xl font-bold mt-2 mb-2">🔔 Расписание звонков</h1>
        <p className="text-white/75 mb-8">
          Задай время начала уроков, длительность урока и перемен — и получишь готовое расписание
          звонков, а любую строку потом можно поправить вручную. Можно распечатать и повесить на
          стенд.
        </p>

        <div className="card mb-8 no-print space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Класс / школа (необязательно)</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Например, 3 «А» класс"
              className="w-full sm:max-w-sm px-4 py-2 rounded-lg bg-black border border-[#2D2350] text-white placeholder-gray-500 focus:border-orange outline-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Начало уроков</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] text-white focus:border-orange outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Количество уроков</label>
              <input
                type="number"
                min={1}
                max={10}
                value={lessonsCount}
                onChange={(e) => setLessonsCount(Math.max(1, Math.min(10, Number(e.target.value) || 1)))}
                className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] text-white focus:border-orange outline-none"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Длительность урока, мин</label>
              <input
                type="number"
                min={20}
                max={60}
                value={lessonMinutes}
                onChange={(e) => setLessonMinutes(Math.max(20, Math.min(60, Number(e.target.value) || 40)))}
                className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] text-white focus:border-orange outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Обычная перемена, мин</label>
              <input
                type="number"
                min={5}
                max={30}
                value={breakMinutes}
                onChange={(e) => setBreakMinutes(Math.max(5, Math.min(30, Number(e.target.value) || 10)))}
                className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] text-white focus:border-orange outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Большая перемена, мин</label>
              <input
                type="number"
                min={10}
                max={45}
                value={longBreakMinutes}
                onChange={(e) => setLongBreakMinutes(Math.max(10, Math.min(45, Number(e.target.value) || 20)))}
                className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] text-white focus:border-orange outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Большая перемена — после какого урока</label>
            <select
              value={longBreakAfter}
              onChange={(e) => setLongBreakAfter(Number(e.target.value))}
              className="w-full sm:max-w-xs px-4 py-2 rounded-lg bg-black border border-[#2D2350] text-white focus:border-orange outline-none"
            >
              {Array.from({ length: lessonsCount }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  После {n}-го урока
                </option>
              ))}
            </select>
          </div>
        </div>

        <div ref={printRef} onClickCapture={handleFirstPrint} className="card print-page bg-white">
          <div className="no-print mb-4 flex justify-between items-center flex-wrap gap-3">
            <span className="text-sm text-gray-500">Начало и конец урока можно поправить вручную прямо в таблице</span>
            <div className="flex items-center gap-3">
              <button onClick={handleResetOverrides} className="btn-secondary text-sm px-4 py-2">
                🗑️ Сбросить правки
              </button>
              <ExportToolbar targetRef={printRef} filename="raspisanie-zvonkov" />
            </div>
          </div>

          <div className="no-print flex items-center gap-3 mb-6">
            <Image src="/logo.png" alt="Знаторика" width={48} height={48} className="no-print rounded-full flex-shrink-0" />
            <h2 className="text-xl font-bold text-black">Расписание звонков{label ? ` — ${label}` : ''}</h2>
          </div>
          <h2 className="hidden print:block text-xl font-bold text-black mb-4">
            Расписание звонков{label ? ` — ${label}` : ''}
          </h2>

          <table className="w-full border-collapse text-black">
            <thead>
              <tr>
                <th className="border-2 border-violet bg-violet text-white text-sm font-bold py-2 px-2 w-16">Урок</th>
                <th className="border-2 border-violet bg-violet text-white text-sm font-bold py-2 px-2">Начало</th>
                <th className="border-2 border-violet bg-violet text-white text-sm font-bold py-2 px-2">Окончание</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <Fragment key={row.lesson}>
                  <tr className={i % 2 === 0 ? 'bg-white' : 'bg-orange/10'}>
                    <td className="border-2 border-gray-300 text-center font-bold py-2">{row.lesson}</td>
                    <td className="border-2 border-gray-300 p-0">
                      <input
                        type="text"
                        value={row.start}
                        onChange={(e) => setOverride(row.lesson, 'start', e.target.value)}
                        className="w-full h-10 text-center text-black text-sm outline-none bg-transparent focus:bg-orange/20"
                      />
                    </td>
                    <td className="border-2 border-gray-300 p-0">
                      <input
                        type="text"
                        value={row.end}
                        onChange={(e) => setOverride(row.lesson, 'end', e.target.value)}
                        className="w-full h-10 text-center text-black text-sm outline-none bg-transparent focus:bg-orange/20"
                      />
                    </td>
                  </tr>
                  {i < rows.length - 1 && (
                    <tr className="bg-gray-100">
                      <td colSpan={3} className="border-2 border-gray-300 text-center text-xs text-gray-500 py-1">
                        Перемена {row.lesson === longBreakAfter ? longBreakMinutes : breakMinutes} мин
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <PageAbout route="/generator/raspisanie-zvonkov" />
    </div>
  );
}
