'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';
import PageAbout from '@/components/PageAbout';

type Band = '1-2' | '3-5';

const ENTRY_COUNTS = [10, 20, 30] as const;
const GENRES = ['Сказка', 'Рассказ', 'Повесть', 'Стихи', 'Другое'];

function BlankLine({ className = '' }: { className?: string }) {
  return <div className={`border-b-2 border-gray-300 h-6 ${className}`} />;
}

function Stars() {
  return <div className="text-5xl tracking-wider text-gray-400 leading-none">☆ ☆ ☆ ☆ ☆</div>;
}

function GenreRow() {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2 text-lg text-gray-700">
      {GENRES.map((g) => (
        <span key={g} className="whitespace-nowrap">
          <span className="text-2xl align-middle mr-1">☐</span>
          {g}
        </span>
      ))}
    </div>
  );
}

function CoverPage({ band }: { band: Band }) {
  return (
    <div className="border-4 border-violet rounded-2xl h-[277mm] flex flex-col items-center justify-between p-10 text-center">
      <div className="flex flex-col items-center gap-4 mt-6">
        <Image src="/logo.png" alt="Знаторика" width={72} height={72} className="rounded-full" />
        <div className="text-5xl">📚✨</div>
        <div className="text-4xl font-bold text-black">Читательский дневник</div>
        <p className="text-gray-500">{band === '1-2' ? 'для 1–2 класса' : 'для 3–5 класса'}</p>
      </div>

      <div className="w-full max-w-sm space-y-8 text-left">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Ученика / ученицы</p>
          <BlankLine />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Класс</p>
          <BlankLine />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Школа</p>
          <BlankLine />
        </div>
      </div>

      <p className="text-gray-400 text-sm italic mb-4">
        «Кто много читает, тот много знает»
      </p>
    </div>
  );
}

function EntryPage1_2({ index }: { index: number }) {
  return (
    <div className="h-[277mm] p-6 flex flex-col">
      <div className="bg-violet text-white text-center font-bold rounded-lg py-2 mb-5">
        Книга №{index}
      </div>
      <div className="space-y-5 text-black">
        <div className="flex gap-6">
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">Дата</p>
            <BlankLine />
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Автор</p>
          <BlankLine />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Название книги</p>
          <BlankLine />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Жанр</p>
          <GenreRow />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Главные герои</p>
          <BlankLine />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Что понравилось больше всего?</p>
          <BlankLine />
          <BlankLine className="mt-2" />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-2">Моя оценка</p>
          <Stars />
        </div>
        <div className="flex-1 flex flex-col">
          <p className="text-sm text-gray-500 mb-1">Нарисуй свой любимый момент из книги</p>
          <div className="flex-1 min-h-[70mm] border-2 border-dashed border-gray-300 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

function EntryPage3_5({ index }: { index: number }) {
  return (
    <div className="h-[277mm] p-6 flex flex-col">
      <div className="bg-violet text-white text-center font-bold rounded-lg py-2 mb-5">
        Книга №{index}
      </div>
      <div className="space-y-4 text-black">
        <div className="flex gap-6">
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">Дата начала чтения</p>
            <BlankLine />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">Дата окончания</p>
            <BlankLine />
          </div>
        </div>
        <div className="flex gap-6">
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">Автор</p>
            <BlankLine />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">Название книги</p>
            <BlankLine />
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Жанр</p>
          <GenreRow />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">О чём эта книга?</p>
          <BlankLine />
          <BlankLine className="mt-2" />
          <BlankLine className="mt-2" />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Главные герои и какие они</p>
          <BlankLine />
          <BlankLine className="mt-2" />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Что понравилось или не понравилось</p>
          <BlankLine />
          <BlankLine className="mt-2" />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Понравившаяся цитата или момент</p>
          <BlankLine />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-2">Моя оценка</p>
            <Stars />
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <p className="text-sm text-gray-500 mb-1">Рисунок к книге (по желанию)</p>
          <div className="flex-1 min-h-[35mm] border-2 border-dashed border-gray-300 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

function SummaryPage({ count }: { count: number }) {
  const rows = Array.from({ length: count });
  return (
    <div className="h-[277mm] p-6 flex flex-col">
      <h2 className="text-2xl font-bold text-black text-center mb-6">📖 Мои прочитанные книги</h2>
      <table className="w-full border-collapse text-black text-sm">
        <thead>
          <tr>
            <th className="border-2 border-violet bg-violet text-white py-2 w-10">№</th>
            <th className="border-2 border-violet bg-violet text-white py-2">Автор</th>
            <th className="border-2 border-violet bg-violet text-white py-2">Название</th>
            <th className="border-2 border-violet bg-violet text-white py-2 w-28">Оценка</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((_, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-orange/10'}>
              <td className="border-2 border-gray-300 text-center py-2">{i + 1}</td>
              <td className="border-2 border-gray-300 py-2">&nbsp;</td>
              <td className="border-2 border-gray-300 py-2">&nbsp;</td>
              <td className="border-2 border-gray-300 py-2">&nbsp;</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ChitatelskiyDnevnikPage() {
  const [band, setBand] = useState<Band>('1-2');
  const [count, setCount] = useState<number>(10);
  const printRef = useRef<HTMLDivElement>(null);
  const trackedRef = useRef(false);

  function handleFirstPrint() {
    if (!trackedRef.current) {
      trackUsage('generator:chitatelskiy-dnevnik');
      trackedRef.current = true;
    }
  }

  const entries = Array.from({ length: count }, (_, i) => i + 1);

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/generator" className="text-orange hover:underline text-sm">
          ← Все генераторы
        </Link>
        <h1 className="text-3xl font-bold mt-2 mb-2">📖 Читательский дневник</h1>
        <p className="text-white/75 mb-8">
          Красивый читательский дневник для распечатки: обложка, страницы для каждой
          прочитанной книги и сводная таблица в конце — как настоящий сборник. Заполняется от
          руки после печати.
        </p>

        <div className="card mb-8 no-print space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3">Класс</label>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setBand('1-2')}
                className={`px-5 py-2 rounded-lg font-bold transition-colors text-sm ${
                  band === '1-2' ? 'bg-orange text-white' : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                }`}
              >
                1–2 класс
              </button>
              <button
                onClick={() => setBand('3-5')}
                className={`px-5 py-2 rounded-lg font-bold transition-colors text-sm ${
                  band === '3-5' ? 'bg-orange text-white' : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                }`}
              >
                3–5 класс
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Сколько книг (страниц)</label>
            <div className="flex gap-3 flex-wrap">
              {ENTRY_COUNTS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCount(c)}
                  className={`px-5 py-2 rounded-lg font-bold transition-colors text-sm ${
                    count === c ? 'bg-orange text-white' : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div ref={printRef} onClickCapture={handleFirstPrint} className="print-page bg-white rounded-xl overflow-hidden">
          <div className="no-print p-4 flex justify-between items-center flex-wrap gap-3 bg-gray-50">
            <span className="text-sm text-gray-500">
              Обложка + {count} страниц книг + сводная таблица = {count + 2} стр.
            </span>
            <ExportToolbar targetRef={printRef} filename={`chitatelskiy-dnevnik-${band}klass`} />
          </div>

          <div className="print:break-after-page">
            <CoverPage band={band} />
          </div>

          {entries.map((n) => (
            <div key={n} className="print:break-after-page">
              {band === '1-2' ? <EntryPage1_2 index={n} /> : <EntryPage3_5 index={n} />}
            </div>
          ))}

          <SummaryPage count={count} />
        </div>
      </div>

      <PageAbout route="/generator/chitatelskiy-dnevnik" />
    </div>
  );
}
