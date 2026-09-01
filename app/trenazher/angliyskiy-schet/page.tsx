'use client';

import Link from 'next/link';
import { ENGLISH_NUMBERS } from '@/lib/english-numbers';
import ListenButton from '@/components/ListenButton';
import TrainerGate from '@/components/TrainerGate';

function CountDots({ value }: { value: number }) {
  if (value <= 10) {
    return (
      <div className="flex flex-wrap justify-center gap-0.5 mb-3 max-w-[110px] mx-auto">
        {Array.from({ length: value }).map((_, i) => (
          <span key={i} className="text-sm">⭐</span>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1 mb-3">
      <span className="text-xs bg-orange/20 text-orange font-bold px-2 py-0.5 rounded">10</span>
      <div className="flex flex-wrap justify-center gap-0.5 max-w-[110px]">
        {Array.from({ length: value - 10 }).map((_, i) => (
          <span key={i} className="text-sm">⭐</span>
        ))}
      </div>
    </div>
  );
}

export default function EnglishNumbersTrainerPage() {
  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🇬🇧 Счёт по-английски до 20</h1>
      </div>

      <TrainerGate type="trainer:angliyskiy-schet">
        <div className="max-w-6xl mx-auto py-10 px-6">
          <p className="text-gray-400 mb-8">
            Нажми «🔊 Слушать», чтобы услышать число по-английски с британским произношением.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {ENGLISH_NUMBERS.map((item) => (
              <div
                key={item.value}
                className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-5 text-center hover:border-orange transition-colors"
              >
                <div className="text-5xl font-black text-orange mb-2">{item.value}</div>
                <CountDots value={item.value} />
                <div className="font-bold text-lg">{item.word}</div>
                <div className="text-violet text-sm mb-3">{item.transcription}</div>
                <ListenButton text={item.word} label="🔊 Слушать" />
              </div>
            ))}
          </div>
        </div>
      </TrainerGate>
    </div>
  );
}
