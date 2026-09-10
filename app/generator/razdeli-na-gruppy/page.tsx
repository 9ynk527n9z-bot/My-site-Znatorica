'use client';

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import {
  generateSortGroups,
  generateSortGroupsFromItems,
  SORT_THEMES,
  type SortThemeKey,
  type SortResult,
  type SortItem,
} from '@/lib/sort-groups';
import { trackUsage } from '@/lib/track';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';
import GeneratorQuotaBanner from '@/components/GeneratorQuotaBanner';
import SortGroupsInteractive from '@/components/SortGroupsInteractive';
import { downloadBlob } from '@/lib/download-blob';

const THEME_LIST = Object.entries(SORT_THEMES) as [SortThemeKey, typeof SORT_THEMES[SortThemeKey]][];
const MIN_CUSTOM_ITEMS = 10;
const MAX_CUSTOM_ITEMS = 16;

interface CustomEntry {
  text: string;
  group: 'a' | 'b';
}

function emptyCustomEntry(): CustomEntry {
  return { text: '', group: 'a' };
}

export default function SortGroupsGeneratorPage() {
  const [mode, setMode] = useState<'theme' | 'custom'>('theme');
  const [theme, setTheme] = useState<SortThemeKey>('fruits-vegetables');
  const [itemCount, setItemCount] = useState(10);
  const [labelA, setLabelA] = useState('');
  const [labelB, setLabelB] = useState('');
  const [customItems, setCustomItems] = useState<CustomEntry[]>([
    emptyCustomEntry(), emptyCustomEntry(), emptyCustomEntry(), emptyCustomEntry(), emptyCustomEntry(),
    emptyCustomEntry(), emptyCustomEntry(), emptyCustomEntry(), emptyCustomEntry(), emptyCustomEntry(),
  ]);
  const [result, setResult] = useState<SortResult | null>(null);
  const [resultTitle, setResultTitle] = useState('');
  const printRef = useRef<HTMLDivElement>(null);
  const quota = useGeneratorQuota();

  const validCustomItems = customItems.filter((i) => i.text.trim());
  const customError = useMemo(() => {
    if (mode !== 'custom') return null;
    if (!labelA.trim() || !labelB.trim()) return 'Впиши название для обоих столбиков';
    if (validCustomItems.length < MIN_CUSTOM_ITEMS) return `Заполни минимум ${MIN_CUSTOM_ITEMS} карточек`;
    const hasA = validCustomItems.some((i) => i.group === 'a');
    const hasB = validCustomItems.some((i) => i.group === 'b');
    if (!hasA || !hasB) return 'Нужны карточки в обоих столбиках';
    const texts = validCustomItems.map((i) => i.text.trim().toUpperCase());
    if (new Set(texts).size !== texts.length) return 'Карточки не должны повторяться';
    return null;
  }, [mode, labelA, labelB, validCustomItems]);

  function updateCustomText(index: number, value: string) {
    setCustomItems((prev) => prev.map((entry, i) => (i === index ? { ...entry, text: value } : entry)));
  }

  function updateCustomGroup(index: number, group: 'a' | 'b') {
    setCustomItems((prev) => prev.map((entry, i) => (i === index ? { ...entry, group } : entry)));
  }

  function addCustomRow() {
    setCustomItems((prev) => (prev.length >= MAX_CUSTOM_ITEMS ? prev : [...prev, emptyCustomEntry()]));
  }

  function removeCustomRow(index: number) {
    setCustomItems((prev) => (prev.length <= MIN_CUSTOM_ITEMS ? prev : prev.filter((_, i) => i !== index)));
  }

  function handleGenerate() {
    if (!quota.guard()) return;
    if (mode === 'custom' && customError) return;

    if (mode === 'theme') {
      setResult(generateSortGroups(theme, itemCount));
      setResultTitle(`${SORT_THEMES[theme].icon} ${SORT_THEMES[theme].title}`);
    } else {
      const items: SortItem[] = validCustomItems.map((i) => ({ text: i.text.trim().toUpperCase(), group: i.group }));
      setResult(generateSortGroupsFromItems(labelA.trim(), labelB.trim(), items));
      setResultTitle('✏️ Своя сортировка');
    }
    trackUsage('generator:razdeli-na-gruppy');
    quota.consume();
  }

  async function handleDownloadHtml() {
    if (!result) return;
    const { buildStandaloneSortGroupsHtml } = await import('@/lib/standalone-export');
    const html = buildStandaloneSortGroupsHtml(result, resultTitle.replace(/^\S+\s/, ''));
    downloadBlob(new Blob([html], { type: 'text/html' }), 'razdeli-na-gruppy.html');
  }

  return (
    <div className="bg-[#28134f] min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/generator" className="text-orange hover:underline text-sm">
          ← Все генераторы
        </Link>
        <h1 className="text-3xl font-bold mt-2 mb-2">Раздели на группы</h1>
        <p className="text-gray-400 mb-8">
          Разложи карточки по двум столбикам — фрукты и овощи, дикие и домашние животные, свои
          категории под любую тему урока. Играй прямо на сайте или скачай как отдельное
          приложение — работает даже без интернета.
        </p>

        <div className="card mb-8 no-print">
          <div className="mb-6">
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => setMode('theme')}
                className={`px-4 py-2 rounded-lg font-bold transition-colors text-sm ${
                  mode === 'theme' ? 'bg-orange text-white' : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                }`}
              >
                По теме
              </button>
              <button
                onClick={() => setMode('custom')}
                className={`px-4 py-2 rounded-lg font-bold transition-colors text-sm ${
                  mode === 'custom' ? 'bg-orange text-white' : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                }`}
              >
                Свои категории
              </button>
            </div>

            {mode === 'theme' ? (
              <>
                <label className="block text-sm font-medium mb-3">Тема</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
                  {THEME_LIST.map(([key, t]) => (
                    <button
                      key={key}
                      onClick={() => setTheme(key)}
                      className={`px-4 py-3 rounded-lg font-bold transition-colors text-sm text-left ${
                        theme === key
                          ? 'bg-orange text-white'
                          : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                      }`}
                    >
                      <span className="text-lg mr-1">{t.icon}</span>
                      {t.title}
                      <div className="text-xs opacity-75 mt-1">{t.labelA} / {t.labelB}</div>
                    </button>
                  ))}
                </div>

                <label className="block text-sm font-medium mb-2">Количество карточек</label>
                <input
                  type="number"
                  min={6}
                  max={16}
                  value={itemCount}
                  onChange={(e) => setItemCount(Math.max(6, Math.min(16, parseInt(e.target.value) || 10)))}
                  className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] focus:border-orange transition-colors"
                />
              </>
            ) : (
              <div>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Название столбика А</label>
                    <input
                      type="text"
                      value={labelA}
                      onChange={(e) => setLabelA(e.target.value)}
                      placeholder="Например, О"
                      className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] focus:border-orange transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Название столбика Б</label>
                    <input
                      type="text"
                      value={labelB}
                      onChange={(e) => setLabelB(e.target.value)}
                      placeholder="Например, А"
                      className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] focus:border-orange transition-colors text-sm"
                    />
                  </div>
                </div>

                <label className="block text-sm font-medium mb-2">
                  Карточки ({validCustomItems.length}/{MAX_CUSTOM_ITEMS})
                </label>
                <div className="space-y-2">
                  {customItems.map((entry, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="text"
                        value={entry.text}
                        onChange={(e) => updateCustomText(i, e.target.value)}
                        placeholder="Слово или фраза"
                        className="flex-1 px-3 py-2 rounded-lg bg-black border border-[#2D2350] focus:border-orange transition-colors text-sm"
                      />
                      <div className="flex rounded-lg border border-[#2D2350] overflow-hidden flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => updateCustomGroup(i, 'a')}
                          className={`px-3 py-2 text-xs font-bold ${
                            entry.group === 'a' ? 'bg-orange text-white' : 'bg-black text-gray-500 hover:text-white'
                          }`}
                        >
                          {labelA.trim() || 'А'}
                        </button>
                        <button
                          type="button"
                          onClick={() => updateCustomGroup(i, 'b')}
                          className={`px-3 py-2 text-xs font-bold ${
                            entry.group === 'b' ? 'bg-orange text-white' : 'bg-black text-gray-500 hover:text-white'
                          }`}
                        >
                          {labelB.trim() || 'Б'}
                        </button>
                      </div>
                      <button
                        onClick={() => removeCustomRow(i)}
                        disabled={customItems.length <= MIN_CUSTOM_ITEMS}
                        className="text-gray-500 hover:text-white disabled:opacity-30 px-2"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addCustomRow}
                  disabled={customItems.length >= MAX_CUSTOM_ITEMS}
                  className="text-orange text-sm font-bold hover:underline mt-3 disabled:opacity-30"
                >
                  + Добавить карточку
                </button>
                {customError && <p className="text-red-400 text-sm mt-3">{customError}</p>}
              </div>
            )}
          </div>

          <GeneratorQuotaBanner quota={quota} />

          <button
            onClick={handleGenerate}
            disabled={!quota.guard() || (mode === 'custom' && !!customError)}
            className="btn-primary w-full disabled:opacity-50"
          >
            Создать
          </button>
        </div>

        {result && (
          <div ref={printRef} className="card print-page bg-white">
            <div className="flex items-center justify-between mb-6 no-print flex-wrap gap-3">
              <h2 className="text-xl font-bold text-black">
                {resultTitle} — {result.items.length} карточек
              </h2>
              <button onClick={handleDownloadHtml} className="btn-secondary text-sm px-4 py-2">
                💾 Скачать как приложение
              </button>
            </div>

            <SortGroupsInteractive result={result} />
          </div>
        )}
      </div>
    </div>
  );
}
