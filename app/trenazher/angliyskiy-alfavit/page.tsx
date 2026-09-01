'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ENGLISH_ALPHABET } from '@/lib/english-alphabet';
import ListenButton from '@/components/ListenButton';
import TrainerGate from '@/components/TrainerGate';

export default function EnglishAlphabetTrainerPage() {
  const [caseMode, setCaseMode] = useState<'upper' | 'lower'>('upper');

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4 flex items-center justify-between flex-wrap gap-4">
        <div>
          <Link href="/trenazher" className="text-orange hover:underline text-sm">
            ← Все тренажеры
          </Link>
          <h1 className="text-2xl font-bold mt-2">🇬🇧 Английский алфавит</h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setCaseMode('upper')}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
              caseMode === 'upper' ? 'bg-orange text-white' : 'bg-black border border-[#2D2350] text-gray-400'
            }`}
          >
            ABC
          </button>
          <button
            onClick={() => setCaseMode('lower')}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
              caseMode === 'lower' ? 'bg-orange text-white' : 'bg-black border border-[#2D2350] text-gray-400'
            }`}
          >
            abc
          </button>
        </div>
      </div>

      <TrainerGate type="trainer:angliyskiy-alfavit">
        <div className="max-w-6xl mx-auto py-10 px-6">
          <p className="text-gray-400 mb-8">
            Нажми «🔊 Слушать», чтобы услышать, как называется буква и слово — с настоящим британским произношением.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {ENGLISH_ALPHABET.map((item) => {
              const displayLetter = caseMode === 'upper' ? item.letter : item.letter.toLowerCase();
              return (
                <div
                  key={item.letter}
                  className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-5 text-center hover:border-orange transition-colors"
                >
                  <div className="text-5xl font-black text-orange mb-2">{displayLetter}</div>
                  <div className="text-6xl mb-3">{item.emoji}</div>
                  <div className="font-bold text-lg">{item.word}</div>
                  <div className="text-gray-400 text-sm mb-1">{item.wordRu}</div>
                  <div className="text-violet text-sm mb-3">{item.transcription}</div>
                  <ListenButton text={`${item.letter}. ${item.word}.`} label="🔊 Слушать" />
                </div>
              );
            })}
          </div>
        </div>
      </TrainerGate>
    </div>
  );
}
