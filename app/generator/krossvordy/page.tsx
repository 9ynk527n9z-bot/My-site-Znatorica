'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  generateCrossword,
  generateCrosswordFromWords,
  CROSSWORD_THEMES,
  type CrosswordTheme,
  type CrosswordResult,
  type WordClue,
} from '@/lib/crossword';
import { drawCrosswordSheet } from '@/lib/crossword-sheet';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';
import GeneratorQuotaBanner from '@/components/GeneratorQuotaBanner';
import CrosswordInteractiveGrid from '@/components/CrosswordInteractiveGrid';
import { downloadBlob } from '@/lib/download-blob';

const THEME_LIST = Object.entries(CROSSWORD_THEMES) as [CrosswordTheme, typeof CROSSWORD_THEMES[CrosswordTheme]][];
const MIN_CUSTOM_WORDS = 4;
const MAX_CUSTOM_WORDS = 6;

function emptyCustomEntry(): WordClue {
  return { word: '', clue: '', direction: 'across' };
}

function sanitizeWord(raw: string): string {
  return raw.toUpperCase().replace(/[^А-ЯЁ]/g, '');
}

export default function CrosswordGeneratorPage() {
  const [mode, setMode] = useState<'theme' | 'custom'>('theme');
  const [theme, setTheme] = useState<CrosswordTheme>('animals');
  const [wordCount, setWordCount] = useState(6);
  const [customWords, setCustomWords] = useState<WordClue[]>([
    emptyCustomEntry(), emptyCustomEntry(), emptyCustomEntry(), emptyCustomEntry(),
  ]);
  const [result, setResult] = useState<CrosswordResult | null>(null);
  const [resultTitle, setResultTitle] = useState('');
  const [showAnswers, setShowAnswers] = useState(false);
  const [view, setView] = useState<'sheet' | 'play'>('sheet');
  const printRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (result && view === 'sheet' && printRef.current) {
      drawCrosswordSheet(
        printRef.current,
        result,
        showAnswers,
        `${resultTitle} — ${result.words.length} слов`,
      );
    }
  }, [result, resultTitle, showAnswers, view]);
  const quota = useGeneratorQuota();

  const validCustomWords = customWords.filter((w) => w.word && w.clue);
  const customError = useMemo(() => {
    if (mode !== 'custom') return null;
    if (validCustomWords.length < MIN_CUSTOM_WORDS) return `Заполни минимум ${MIN_CUSTOM_WORDS} слова с подсказками`;
    const withoutClue = customWords.some((w) => w.word && !w.clue);
    if (withoutClue) return 'У каждого слова должна быть подсказка';
    const tooShort = validCustomWords.some((w) => w.word.length < 3);
    if (tooShort) return 'Каждое слово — минимум 3 буквы';
    const words = validCustomWords.map((w) => w.word);
    if (new Set(words).size !== words.length) return 'Слова не должны повторяться';
    return null;
  }, [mode, customWords, validCustomWords]);

  function updateCustomWord(index: number, field: 'word' | 'clue', value: string) {
    setCustomWords((prev) =>
      prev.map((entry, i) => (i === index ? { ...entry, [field]: field === 'word' ? sanitizeWord(value) : value } : entry))
    );
  }

  function setCustomDirection(index: number, direction: 'across' | 'down') {
    setCustomWords((prev) => prev.map((entry, i) => (i === index ? { ...entry, direction } : entry)));
  }

  function addCustomRow() {
    setCustomWords((prev) => (prev.length >= MAX_CUSTOM_WORDS ? prev : [...prev, emptyCustomEntry()]));
  }

  function removeCustomRow(index: number) {
    setCustomWords((prev) => (prev.length <= MIN_CUSTOM_WORDS ? prev : prev.filter((_, i) => i !== index)));
  }

  function handleGenerate() {
    if (!quota.guard()) return;
    if (mode === 'custom' && customError) return;

    if (mode === 'theme') {
      setResult(generateCrossword(theme, wordCount));
      setResultTitle(`${CROSSWORD_THEMES[theme].icon} ${CROSSWORD_THEMES[theme].title}`);
    } else {
      setResult(generateCrosswordFromWords(validCustomWords, validCustomWords.length));
      setResultTitle('✏️ Свой кроссворд');
    }
    setShowAnswers(false);
    setView('sheet');
    trackUsage('generator:krossvordy');
    quota.consume();
  }

  async function handleDownloadHtml() {
    if (!result) return;
    const { buildStandaloneCrosswordHtml } = await import('@/lib/standalone-export');
    const html = buildStandaloneCrosswordHtml(result, resultTitle.replace(/^\S+\s/, ''));
    downloadBlob(new Blob([html], { type: 'text/html' }), 'krossvordy.html');
  }

  const across = result?.words.filter((w) => w.direction === 'across').sort((a, b) => a.number - b.number) ?? [];
  const down = result?.words.filter((w) => w.direction === 'down').sort((a, b) => a.number - b.number) ?? [];

  return (
    <div className="bg-[#28134f] min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/generator" className="text-orange hover:underline text-sm">
          ← Все генераторы
        </Link>
        <h1 className="text-3xl font-bold mt-2 mb-2">Генератор кроссвордов</h1>
        <p className="text-gray-400 mb-8">
          Выбери готовую тему или впиши свои слова под конкретный урок — кроссворд и подсказки
          соберутся автоматически. Можно распечатать, решить прямо на сайте или скачать как
          отдельное приложение — оно работает даже без интернета.
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
                Свои слова
              </button>
            </div>

            {mode === 'theme' ? (
              <>
                <label className="block text-sm font-medium mb-3">Тема</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                  {THEME_LIST.map(([key, t]) => (
                    <button
                      key={key}
                      aria-pressed={theme === key}
                      onClick={() => setTheme(key)}
                      className={`px-4 py-3 rounded-lg font-bold transition-colors text-sm ${
                        theme === key
                          ? 'bg-orange text-white'
                          : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                      }`}
                    >
                      <span className="text-lg mr-1">{t.icon}</span>
                      {t.title}
                    </button>
                  ))}
                </div>

                <label className="block text-sm font-medium mb-2">
                  Количество слов (примерно, зависит от того, как они пересекутся)
                </label>
                <input
                  type="number"
                  min={4}
                  max={8}
                  value={wordCount}
                  onChange={(e) => setWordCount(Math.max(4, Math.min(8, parseInt(e.target.value) || 6)))}
                  className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] focus:border-orange transition-colors"
                />
              </>
            ) : (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Слова, подсказки и направление ({validCustomWords.length}/{MAX_CUSTOM_WORDS})
                </label>
                <p className="text-gray-500 text-xs mb-2">
                  → по горизонтали, ↓ по вертикали. Если слова плохо пересекаются друг с другом, часть
                  может не поместиться — это нормально.
                </p>
                <div className="space-y-2">
                  {customWords.map((entry, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="text"
                        value={entry.word}
                        onChange={(e) => updateCustomWord(i, 'word', e.target.value)}
                        placeholder="СЛОВО"
                        className="w-32 px-3 py-2 rounded-lg bg-black border border-[#2D2350] focus:border-orange transition-colors text-sm uppercase"
                      />
                      <input
                        type="text"
                        value={entry.clue}
                        onChange={(e) => updateCustomWord(i, 'clue', e.target.value)}
                        placeholder="Подсказка"
                        className="flex-1 px-3 py-2 rounded-lg bg-black border border-[#2D2350] focus:border-orange transition-colors text-sm"
                      />
                      <div className="flex rounded-lg border border-[#2D2350] overflow-hidden flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => setCustomDirection(i, 'across')}
                          title="По горизонтали"
                          className={`px-2.5 py-2 text-xs font-bold ${
                            (entry.direction ?? 'across') === 'across' ? 'bg-orange text-white' : 'bg-black text-gray-500 hover:text-white'
                          }`}
                        >
                          →
                        </button>
                        <button
                          type="button"
                          onClick={() => setCustomDirection(i, 'down')}
                          title="По вертикали"
                          className={`px-2.5 py-2 text-xs font-bold ${
                            entry.direction === 'down' ? 'bg-orange text-white' : 'bg-black text-gray-500 hover:text-white'
                          }`}
                        >
                          ↓
                        </button>
                      </div>
                      <button
                        onClick={() => removeCustomRow(i)}
                        disabled={customWords.length <= MIN_CUSTOM_WORDS}
                        className="text-gray-500 hover:text-white disabled:opacity-30 px-2"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addCustomRow}
                  disabled={customWords.length >= MAX_CUSTOM_WORDS}
                  className="text-orange text-sm font-bold hover:underline mt-3 disabled:opacity-30"
                >
                  + Добавить слово
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
            Создать кроссворд
          </button>
        </div>

        {result && (
          <div className="crossword-result card print-page bg-white">
            <div className={`flex items-center mb-6 no-print flex-wrap gap-3 ${view === 'play' ? 'justify-between' : 'justify-end'}`}>
              {view === 'play' && (
                <h2 className="text-xl font-bold text-black">
                  {resultTitle} — {result.words.length} слов
                </h2>
              )}
              <div className="flex items-center gap-4">
                {view === 'sheet' && (
                  <button
                    onClick={() => setShowAnswers((v) => !v)}
                    className="text-orange text-sm font-bold hover:underline"
                  >
                    {showAnswers ? 'Скрыть ответы' : 'Показать ответы'}
                  </button>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => setView('sheet')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      view === 'sheet' ? 'bg-orange text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    Печатный лист
                  </button>
                  <button
                    onClick={() => setView('play')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      view === 'play' ? 'bg-orange text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    Играть онлайн
                  </button>
                </div>
              </div>
            </div>

            {view === 'sheet' ? (
              <canvas ref={printRef} className="crossword-print-sheet" data-sheet-style="lilac" role="img"
                aria-label={`Кроссворд. По горизонтали: ${across.map(w => `${w.number}. ${w.clue}${showAnswers ? ` — ${w.word}` : ''}`).join('; ')}. По вертикали: ${down.map(w => `${w.number}. ${w.clue}${showAnswers ? ` — ${w.word}` : ''}`).join('; ')}`} />
            ) : (
              <CrosswordInteractiveGrid result={result} />
            )}

            <div className="mt-8 no-print flex items-center gap-3 flex-wrap">
              {view === 'sheet' && <ExportToolbar targetRef={printRef} filename="krossvordy" />}
              <button onClick={handleDownloadHtml} className="btn-secondary text-sm px-4 py-2">
                💾 Скачать как приложение
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
