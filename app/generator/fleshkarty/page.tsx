'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { RUSSIAN_ALPHABET } from '@/lib/russian-alphabet';
import { ENGLISH_ALPHABET } from '@/lib/english-alphabet';
import { RUSSIAN_NUMBERS } from '@/lib/russian-numbers';
import { ENGLISH_NUMBERS } from '@/lib/english-numbers';
import { pickVocabList, type VocabGrade } from '@/lib/vocab-words';
import { trackUsage } from '@/lib/track';
import ExportToolbar from '@/components/ExportToolbar';
import { useGeneratorQuota } from '@/lib/useGeneratorQuota';
import GeneratorQuotaBanner from '@/components/GeneratorQuotaBanner';

type SetKey = 'ru-alphabet' | 'en-alphabet' | 'ru-numbers' | 'en-numbers' | 'vocab';

interface FlashCard {
  key: string;
  emoji?: string;
  title: string;
  subtitle?: string;
  objects?: string;
  bigSubtitle?: boolean;
}

const SETS: { key: SetKey; title: string; emoji: string }[] = [
  { key: 'ru-alphabet', title: 'Русский алфавит', emoji: '🅰️' },
  { key: 'en-alphabet', title: 'Английский алфавит', emoji: '🔤' },
  { key: 'ru-numbers', title: 'Числа (русский)', emoji: '🔢' },
  { key: 'en-numbers', title: 'Числа (английский)', emoji: '🔢' },
  { key: 'vocab', title: 'Словарные слова', emoji: '📖' },
];

const GRADES: VocabGrade[] = [1, 2, 3, 4];
const VOCAB_COUNTS = [8, 16, 24] as const;
const PER_PAGE_OPTIONS = [6, 8] as const;

function buildCards(setKey: SetKey, vocabGrade: VocabGrade, vocabCount: number): FlashCard[] {
  switch (setKey) {
    case 'ru-alphabet':
      return RUSSIAN_ALPHABET.map((l) => ({
        key: l.letter,
        emoji: l.emoji,
        title: l.letter,
        subtitle: l.word,
      }));
    case 'en-alphabet':
      return ENGLISH_ALPHABET.map((l) => ({
        key: l.letter,
        emoji: l.emoji,
        title: l.letter,
        subtitle: `${l.word} · ${l.wordRu}`,
      }));
    case 'ru-numbers':
      return RUSSIAN_NUMBERS.map((n) => ({
        key: String(n.digit),
        emoji: n.emoji,
        title: n.word,
        subtitle: n.objects,
      }));
    case 'en-numbers':
      return ENGLISH_NUMBERS.map((n) => ({
        key: String(n.value),
        title: String(n.value),
        subtitle: `${n.word} ${n.transcription}`,
        objects: n.objects,
        bigSubtitle: true,
      }));
    case 'vocab':
      return pickVocabList(vocabGrade, vocabCount).map((word) => ({
        key: word,
        title: word,
      }));
  }
}

export default function FleshkartyPage() {
  const [setKey, setSetKey] = useState<SetKey>('ru-alphabet');
  const [vocabGrade, setVocabGrade] = useState<VocabGrade>(1);
  const [vocabCount, setVocabCount] = useState<number>(16);
  const [perPage, setPerPage] = useState<number>(6);
  const [cards, setCards] = useState<FlashCard[] | null>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const quota = useGeneratorQuota();

  function handleGenerate() {
    if (!quota.guard()) return;
    setCards(buildCards(setKey, vocabGrade, vocabCount));
    trackUsage('generator:fleshkarty');
    quota.consume();
  }

  const pages: FlashCard[][] = [];
  if (cards) {
    for (let i = 0; i < cards.length; i += perPage) {
      pages.push(cards.slice(i, i + perPage));
    }
  }

  const filename = `fleshkarty-${setKey}${setKey === 'vocab' ? `-${vocabGrade}klass` : ''}`;

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/generator" className="text-orange hover:underline text-sm">
          ← Все генераторы
        </Link>
        <h1 className="text-3xl font-bold mt-2 mb-2">🃏 Флеш-карточки</h1>
        <p className="text-white/75 mb-8">
          Карточки для печати и вырезания: алфавит, числа и словарные слова. Разрежьте лист по
          пунктирным линиям — получатся карточки для запоминания, игр на память и повторения.
        </p>

        <div className="card mb-8 no-print">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Набор карточек</label>
            <div className="flex gap-3 flex-wrap">
              {SETS.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setSetKey(s.key)}
                  className={`px-5 py-2 rounded-lg font-bold transition-colors text-sm ${
                    setKey === s.key
                      ? 'bg-orange text-white'
                      : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                  }`}
                >
                  {s.emoji} {s.title}
                </button>
              ))}
            </div>
          </div>

          {setKey === 'vocab' && (
            <>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Класс</label>
                <div className="flex gap-3 flex-wrap">
                  {GRADES.map((g) => (
                    <button
                      key={g}
                      onClick={() => setVocabGrade(g)}
                      className={`px-5 py-2 rounded-lg font-bold transition-colors text-sm ${
                        vocabGrade === g
                          ? 'bg-orange text-white'
                          : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                      }`}
                    >
                      {g} класс
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Количество слов</label>
                <div className="flex gap-3 flex-wrap">
                  {VOCAB_COUNTS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setVocabCount(c)}
                      className={`px-5 py-2 rounded-lg font-bold transition-colors text-sm ${
                        vocabCount === c
                          ? 'bg-orange text-white'
                          : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Карточек на листе</label>
            <div className="flex gap-3 flex-wrap">
              {PER_PAGE_OPTIONS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPerPage(p)}
                  className={`px-5 py-2 rounded-lg font-bold transition-colors text-sm ${
                    perPage === p
                      ? 'bg-orange text-white'
                      : 'bg-black border border-[#2D2350] text-gray-400 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <GeneratorQuotaBanner quota={quota} />

          <button onClick={handleGenerate} disabled={!quota.guard()} className="btn-primary w-full disabled:opacity-50">
            Сгенерировать
          </button>
        </div>

        {cards && (
          <div ref={printRef} className="print-page bg-white p-4 rounded-xl">
            <div className="no-print mb-4 flex justify-between items-center flex-wrap gap-3">
              <span className="text-sm text-gray-500">{cards.length} карточек</span>
              <ExportToolbar targetRef={printRef} filename={filename} />
            </div>

            {pages.map((pageCards, pageIndex) => (
              <div
                key={pageIndex}
                className={`grid grid-cols-2 gap-4 ${
                  pageIndex < pages.length - 1 ? 'print:break-after-page mb-6' : ''
                }`}
              >
                {pageCards.map((card) => (
                  <div
                    key={card.key}
                    className="aspect-square border-4 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center text-center p-3"
                  >
                    {card.emoji && <div className="text-8xl mb-2">{card.emoji}</div>}
                    <div className="text-6xl font-extrabold text-black leading-tight">{card.title}</div>
                    {card.objects && (
                      <div className="text-2xl leading-snug mt-1 max-w-full break-words">{card.objects}</div>
                    )}
                    {card.subtitle && (
                      <div
                        className={
                          card.bigSubtitle
                            ? 'text-lg font-bold text-gray-700 mt-1 leading-snug'
                            : 'text-xs text-gray-500 mt-1 leading-snug'
                        }
                      >
                        {card.subtitle}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
