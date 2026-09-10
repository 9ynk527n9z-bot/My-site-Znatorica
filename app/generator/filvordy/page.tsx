'use client';

import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import { generateWordSearch, generateWordSearchFromWords, type WordSearchResult } from '@/lib/wordsearch';
import { CROSSWORD_THEMES, type CrosswordTheme, type WordClue } from '@/lib/crossword';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';
import GeneratorQuotaBanner from '@/components/GeneratorQuotaBanner';
import WordSearchInteractiveGrid from '@/components/WordSearchInteractiveGrid';
import { downloadBlob } from '@/lib/download-blob';

const THEME_LIST = Object.entries(CROSSWORD_THEMES) as [CrosswordTheme, typeof CROSSWORD_THEMES[CrosswordTheme]][];
const MIN_CUSTOM_WORDS = 10;
const MAX_CUSTOM_WORDS = 12;

function emptyCustomEntry(): WordClue {
  return { word: '', clue: '' };
}

function sanitizeWord(raw: string): string {
  return raw.toUpperCase().replace(/[^А-ЯЁ]/g, '');
}

export default function WordSearchGeneratorPage() {
  const [mode, setMode] = useState<'theme' | 'custom'>('theme');
  const [theme, setTheme] = useState<CrosswordTheme>('animals');
  const [wordCount, setWordCount] = useState(8);
  const [customWords, setCustomWords] = useState<WordClue[]>([
    emptyCustomEntry(), emptyCustomEntry(), emptyCustomEntry(), emptyCustomEntry(), emptyCustomEntry(),
    emptyCustomEntry(), emptyCustomEntry(), emptyCustomEntry(), emptyCustomEntry(), emptyCustomEntry(),
  ]);
  const [result, setResult] = useState<WordSearchResult | null>(null);
  const [resultTitle, setResultTitle] = useState('');
  const [showAnswers, setShowAnswers] = useState(false);
  const [view, setView] = useState<'sheet' | 'play'>('sheet');
  const printRef = useRef<HTMLDivElement>(null);
  const quota = useGeneratorQuota();

  const validCustomWords = customWords.filter((w) => w.word && w.clue);
  const customError = useMemo(() => {
    if (mode !== 'custom') return null;
    if (validCustomWords.length < MIN_CUSTOM_WORDS) return `Заполни минимум ${MIN_CUSTOM_WORDS} слов с подсказками`;
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
      setResult(generateWordSearch(theme, wordCount));
      setResultTitle(`${CROSSWORD_THEMES[theme].icon} ${CROSSWORD_THEMES[theme].title}`);
    } else {
      setResult(generateWordSearchFromWords(validCustomWords, validCustomWords.length));
      setResultTitle('✏️ Свой филворд');
    }
    setShowAnswers(false);
    setView('sheet');
    trackUsage('generator:filvordy');
    quota.consume();
  }

  async function handleDownloadHtml() {
    if (!result) return;
    const { buildStandaloneWordSearchHtml } = await import('@/lib/standalone-export');
    const html = buildStandaloneWordSearchHtml(result, resultTitle.replace(/^\S+\s/, ''));
    downloadBlob(new Blob([html], { type: 'text/html' }), 'filvordy.html');
  }

  const highlightedCells = new Set<string>();
  if (result && showAnswers) {
    for (const w of result.words) {
      for (const [r, c] of w.cells) {
        highlightedCells.add(`${r},${c}`);
      }
    }
  }

  return (
    <div className="bg-[#28134f] min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/generator" className="text-orange hover:underline text-sm">
          ← Все генераторы
        </Link>
        <h1 className="text-3xl font-bold mt-2 mb-2">Генератор филвордов</h1>
        <p className="text-gray-400 mb-8">
          Слова спрятаны в сетке букв по горизонтали, вертикали и диагонали. Выбери готовую тему
          или впиши свои слова, реши прямо на сайте или скачай как отдельное приложение — работает
          даже без интернета.
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

                <label className="block text-sm font-medium mb-2">Количество слов</label>
                <input
                  type="number"
                  min={5}
                  max={12}
                  value={wordCount}
                  onChange={(e) => setWordCount(Math.max(5, Math.min(12, parseInt(e.target.value) || 8)))}
                  className="w-full px-4 py-2 rounded-lg bg-black border border-[#2D2350] focus:border-orange transition-colors"
                />
              </>
            ) : (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Слова и подсказки ({validCustomWords.length}/{MAX_CUSTOM_WORDS})
                </label>
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
            Создать филворд
          </button>
        </div>

        {result && (
          <div ref={printRef} className="card print-page bg-white">
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
              <div className="rounded-2xl border-[3px] border-[#A78BFA] p-5 md:p-7">
                <h2 className="mb-6 text-center text-xl font-black text-slate-800">
                  {resultTitle} — {result.words.length} слов
                </h2>
                <div className="overflow-x-auto mb-8 text-center">
                  <div className="inline-block overflow-hidden rounded-lg border-[3px] border-[#A78BFA]">
                    <table className="border-collapse mx-auto">
                    <tbody>
                      {result.grid.map((row, r) => (
                        <tr key={r}>
                          {row.map((letter, c) => {
                            const isHighlighted = highlightedCells.has(`${r},${c}`);
                            return (
                              <td
                                key={c}
                                className={`w-8 h-8 text-center align-middle border font-mono font-bold ${
                                  isHighlighted
                                    ? 'bg-orange text-white border-orange'
                                    : 'border-gray-300 text-black'
                                }`}
                              >
                                {letter}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-orange mb-3">Найди слова:</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {result.words.map((w) => (
                      <div key={w.word} className="text-sm text-black">
                        {showAnswers ? <span className="font-bold">{w.word}</span> : '•'} — {w.clue}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <WordSearchInteractiveGrid result={result} />
            )}

            <div className="mt-8 no-print flex items-center gap-3 flex-wrap">
              {view === 'sheet' && <ExportToolbar targetRef={printRef} filename="filvordy" />}
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
