'use client';

import { useState } from 'react';
import type { SortResult } from '@/lib/sort-groups';

interface SortGroupsInteractiveProps {
  result: SortResult;
}

type Placement = Record<string, 'a' | 'b' | null>;

export default function SortGroupsInteractive({ result }: SortGroupsInteractiveProps) {
  const [placement, setPlacement] = useState<Placement>(() =>
    Object.fromEntries(result.items.map((i) => [i.text, null]))
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  function selectItem(text: string) {
    setChecked(false);
    setSelected((prev) => (prev === text ? null : text));
  }

  function placeInto(group: 'a' | 'b') {
    if (!selected) return;
    setPlacement((prev) => ({ ...prev, [selected]: group }));
    setSelected(null);
  }

  function returnToPool(text: string) {
    setChecked(false);
    setPlacement((prev) => ({ ...prev, [text]: null }));
  }

  function handleReset() {
    setPlacement(Object.fromEntries(result.items.map((i) => [i.text, null])));
    setSelected(null);
    setChecked(false);
  }

  const pool = result.items.filter((i) => placement[i.text] === null);
  const inA = result.items.filter((i) => placement[i.text] === 'a');
  const inB = result.items.filter((i) => placement[i.text] === 'b');
  const allPlaced = pool.length === 0;

  function chipClass(item: { text: string; group: 'a' | 'b' }, placedGroup: 'a' | 'b') {
    if (!checked) return 'bg-white border-gray-300 text-black';
    return item.group === placedGroup
      ? 'bg-green-100 border-green-400 text-black'
      : 'bg-red-100 border-red-400 text-black';
  }

  return (
    <div>
      <p className="text-sm text-gray-600 mb-3 no-print">
        Кликни по карточке в общем списке, потом по нужному столбику. Чтобы вернуть карточку назад — кликни по ней в столбике.
      </p>

      {pool.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6 p-3 rounded-lg bg-gray-50 border border-gray-200">
          {pool.map((item) => (
            <button
              key={item.text}
              onClick={() => selectItem(item.text)}
              className={`px-3 py-1.5 rounded-lg border text-sm font-bold ${
                selected === item.text ? 'bg-orange text-white border-orange' : 'bg-white border-gray-300 text-black hover:border-orange'
              }`}
            >
              {item.text}
            </button>
          ))}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => placeInto('a')}
          disabled={!selected}
          className="text-left p-4 rounded-lg border-2 border-dashed border-violet/40 hover:border-violet disabled:hover:border-violet/40 disabled:cursor-default min-h-[100px]"
        >
          <div className="font-bold text-violet mb-2">{result.labelA}</div>
          <div className="flex flex-wrap gap-2">
            {inA.map((item) => (
              <span
                key={item.text}
                onClick={(e) => { e.stopPropagation(); returnToPool(item.text); }}
                className={`px-2.5 py-1 rounded-lg border text-xs font-bold cursor-pointer ${chipClass(item, 'a')}`}
              >
                {item.text}
              </span>
            ))}
          </div>
        </button>

        <button
          onClick={() => placeInto('b')}
          disabled={!selected}
          className="text-left p-4 rounded-lg border-2 border-dashed border-orange/40 hover:border-orange disabled:hover:border-orange/40 disabled:cursor-default min-h-[100px]"
        >
          <div className="font-bold text-orange mb-2">{result.labelB}</div>
          <div className="flex flex-wrap gap-2">
            {inB.map((item) => (
              <span
                key={item.text}
                onClick={(e) => { e.stopPropagation(); returnToPool(item.text); }}
                className={`px-2.5 py-1 rounded-lg border text-xs font-bold cursor-pointer ${chipClass(item, 'b')}`}
              >
                {item.text}
              </span>
            ))}
          </div>
        </button>
      </div>

      <div className="flex gap-3 no-print">
        <button onClick={() => setChecked(true)} disabled={!allPlaced} className="btn-primary text-sm px-4 py-2 disabled:opacity-50">
          Проверить
        </button>
        <button onClick={handleReset} className="btn-secondary text-sm px-4 py-2">
          🗑️ Начать заново
        </button>
      </div>
    </div>
  );
}
