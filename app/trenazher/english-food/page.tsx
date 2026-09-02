'use client';

import Link from 'next/link';
import { ENGLISH_FOOD } from '@/lib/english-food';
import ListenButton from '@/components/ListenButton';
import TrainerGate from '@/components/TrainerGate';

export default function EnglishFoodTrainerPage() {
  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🇬🇧 Еда по-английски</h1>
      </div>

      <TrainerGate type="trainer:english-food">
        <div className="max-w-6xl mx-auto py-10 px-6">
          <p className="text-gray-400 mb-8">
            Нажми «🔊 Слушать», чтобы услышать слово по-английски с британским произношением.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {ENGLISH_FOOD.map((item) => (
              <div
                key={item.word}
                className="bg-[#2A1B4D] border border-[#2D2350] rounded-lg p-5 text-center hover:border-orange transition-colors"
              >
                <div className="text-5xl mb-3">{item.emoji}</div>
                <div className="font-bold text-lg">{item.word}</div>
                <div className="text-white/60 text-sm">{item.transcription}</div>
                <div className="text-white/80 text-sm mb-3">{item.translation}</div>
                <ListenButton text={item.word} label="🔊 Слушать" />
              </div>
            ))}
          </div>
        </div>
      </TrainerGate>
    </div>
  );
}
