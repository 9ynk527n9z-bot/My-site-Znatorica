'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import ShareButtons from '@/components/ShareButtons';
import { praiseFor, shareTextFor } from '@/lib/praise';

interface Word {
  word: string;
  correct: string;
  options: string[];
}

// Слова и части речи для 4 класса: набор шире, чем в тренажёре для 2 класса
// (/trenazher/chasti-rechi — только существительное/прилагательное/глагол).
// Здесь добавлены наречие, местоимение, предлог и числительное — слова
// подобраны так, чтобы не повторять ни /trenazher/chasti-rechi, ни банк
// CHASTI_RECHI_2 из lib/quiz/banks-2-klass.ts.
const WORDS: Word[] = [
  // существительное
  { word: 'ШКОЛА', correct: 'существительное', options: ['существительное', 'прилагательное', 'глагол', 'местоимение'] },
  { word: 'ТЕТРАДЬ', correct: 'существительное', options: ['существительное', 'глагол', 'наречие', 'прилагательное'] },
  { word: 'ОКНО', correct: 'существительное', options: ['существительное', 'прилагательное', 'местоимение', 'глагол'] },
  { word: 'ПОЕЗД', correct: 'существительное', options: ['существительное', 'глагол', 'прилагательное', 'числительное'] },
  { word: 'ГРИБ', correct: 'существительное', options: ['существительное', 'прилагательное', 'глагол', 'наречие'] },
  { word: 'ОЗЕРО', correct: 'существительное', options: ['существительное', 'глагол', 'местоимение', 'прилагательное'] },
  { word: 'ВРАЧ', correct: 'существительное', options: ['существительное', 'прилагательное', 'глагол', 'местоимение'] },
  { word: 'ЯБЛОКО', correct: 'существительное', options: ['существительное', 'глагол', 'прилагательное', 'наречие'] },
  // глагол
  { word: 'ПИШЕТ', correct: 'глагол', options: ['глагол', 'существительное', 'наречие', 'прилагательное'] },
  { word: 'ПОЁТ', correct: 'глагол', options: ['глагол', 'существительное', 'прилагательное', 'местоимение'] },
  { word: 'ПЛАВАЕТ', correct: 'глагол', options: ['глагол', 'наречие', 'существительное', 'прилагательное'] },
  { word: 'СТРОИТ', correct: 'глагол', options: ['глагол', 'существительное', 'наречие', 'числительное'] },
  { word: 'ГОТОВИТ', correct: 'глагол', options: ['глагол', 'прилагательное', 'существительное', 'наречие'] },
  { word: 'УЧИТСЯ', correct: 'глагол', options: ['глагол', 'существительное', 'местоимение', 'прилагательное'] },
  { word: 'РИСУЕТ', correct: 'глагол', options: ['глагол', 'наречие', 'прилагательное', 'существительное'] },
  { word: 'ПОМОГАЕТ', correct: 'глагол', options: ['глагол', 'существительное', 'наречие', 'прилагательное'] },
  // прилагательное
  { word: 'ДОБРЫЙ', correct: 'прилагательное', options: ['прилагательное', 'наречие', 'существительное', 'глагол'] },
  { word: 'УМНЫЙ', correct: 'прилагательное', options: ['прилагательное', 'существительное', 'наречие', 'глагол'] },
  { word: 'ТЁПЛЫЙ', correct: 'прилагательное', options: ['прилагательное', 'наречие', 'глагол', 'существительное'] },
  { word: 'ШИРОКИЙ', correct: 'прилагательное', options: ['прилагательное', 'существительное', 'глагол', 'наречие'] },
  { word: 'ЛЁГКИЙ', correct: 'прилагательное', options: ['прилагательное', 'наречие', 'существительное', 'глагол'] },
  { word: 'СТРОГИЙ', correct: 'прилагательное', options: ['прилагательное', 'глагол', 'наречие', 'существительное'] },
  // наречие
  { word: 'ГРОМКО', correct: 'наречие', options: ['наречие', 'прилагательное', 'глагол', 'существительное'] },
  { word: 'ТИХО', correct: 'наречие', options: ['наречие', 'прилагательное', 'существительное', 'местоимение'] },
  { word: 'ВЕЗДЕ', correct: 'наречие', options: ['наречие', 'местоимение', 'предлог', 'существительное'] },
  { word: 'ВЧЕРА', correct: 'наречие', options: ['наречие', 'существительное', 'числительное', 'прилагательное'] },
  { word: 'СНАЧАЛА', correct: 'наречие', options: ['наречие', 'предлог', 'глагол', 'существительное'] },
  { word: 'ВНИМАТЕЛЬНО', correct: 'наречие', options: ['наречие', 'прилагательное', 'глагол', 'существительное'] },
  // местоимение
  { word: 'ОН', correct: 'местоимение', options: ['местоимение', 'существительное', 'предлог', 'наречие'] },
  { word: 'ОНА', correct: 'местоимение', options: ['местоимение', 'существительное', 'прилагательное', 'предлог'] },
  { word: 'МЫ', correct: 'местоимение', options: ['местоимение', 'предлог', 'наречие', 'существительное'] },
  { word: 'ВЫ', correct: 'местоимение', options: ['местоимение', 'предлог', 'числительное', 'наречие'] },
  { word: 'ЭТОТ', correct: 'местоимение', options: ['местоимение', 'прилагательное', 'числительное', 'существительное'] },
  // предлог
  { word: 'НА', correct: 'предлог', options: ['предлог', 'местоимение', 'наречие', 'числительное'] },
  { word: 'ПОД', correct: 'предлог', options: ['предлог', 'наречие', 'местоимение', 'числительное'] },
  { word: 'ЗА', correct: 'предлог', options: ['предлог', 'местоимение', 'наречие', 'глагол'] },
  { word: 'ОКОЛО', correct: 'предлог', options: ['предлог', 'наречие', 'местоимение', 'существительное'] },
  { word: 'ЧЕРЕЗ', correct: 'предлог', options: ['предлог', 'наречие', 'числительное', 'местоимение'] },
  // числительное
  { word: 'ПЯТЬ', correct: 'числительное', options: ['числительное', 'существительное', 'прилагательное', 'предлог'] },
  { word: 'ДЕСЯТЬ', correct: 'числительное', options: ['числительное', 'существительное', 'наречие', 'предлог'] },
  { word: 'СЕМЬ', correct: 'числительное', options: ['числительное', 'существительное', 'прилагательное', 'местоимение'] },
  { word: 'ДВАДЦАТЬ', correct: 'числительное', options: ['числительное', 'прилагательное', 'существительное', 'наречие'] },
  { word: 'ТРИДЦАТЬ', correct: 'числительное', options: ['числительное', 'существительное', 'предлог', 'прилагательное'] },
];

const ROUNDS_PER_SESSION = 10;
const GAME_TITLE = 'Части речи (4 класс)';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface Round {
  word: Word;
  shuffledOptions: string[];
}

function makeSession(): Round[] {
  return shuffle(WORDS)
    .slice(0, ROUNDS_PER_SESSION)
    .map((word) => ({ word, shuffledOptions: shuffle(word.options) }));
}

export default function ChastiRechi4KlassTrainerPage() {
  const [started, setStarted] = useState(false);
  const [session, setSession] = useState<Round[]>([]);
  const [round, setRound] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [pickedOption, setPickedOption] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  const current = session[round - 1];

  function begin() {
    setStarted(true);
    setFinished(false);
    setSession(makeSession());
    setRound(1);
    setScore({ correct: 0, total: 0 });
    setFeedback(null);
    setPickedOption(null);
  }

  function nextRound() {
    if (round >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    setRound((r) => r + 1);
    setFeedback(null);
    setPickedOption(null);
  }

  function handlePick(option: string) {
    if (feedback || !current) return;
    setPickedOption(option);
    const correct = option === current.word.correct;
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(nextRound, correct ? 900 : 1600);
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">📝 Части речи (4 класс)</h1>
      </div>

      <TrainerGate type="trainer:chasti-rechi-4klass">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!started && (
            <div className="card bg-white text-center py-10">
              <p className="text-3xl font-black text-[#3a1c6e] mb-4">📝 Части речи</p>
              <p className="text-gray-600 mb-8 text-lg">
                Прочитай слово и выбери его часть речи: существительное, глагол, прилагательное,
                наречие, местоимение, предлог или числительное.
              </p>
              <button onClick={begin} className="btn-primary px-8 py-4 text-lg">
                ▶️ Начать
              </button>
            </div>
          )}

          {started && !finished && current && (
            <div className="card bg-white text-center">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 text-sm">
                  Раунд {round} из {ROUNDS_PER_SESSION}
                </span>
                <span className="text-gray-600 text-sm">
                  Верно: <span className="text-green-600 font-bold">{score.correct}</span> / {score.total}
                </span>
              </div>

              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-8">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(round / ROUNDS_PER_SESSION) * 100}%`,
                    background: 'linear-gradient(90deg, #F97316, #f72585)',
                  }}
                />
              </div>

              <p className="text-lg text-gray-500 mb-4">Какая это часть речи?</p>

              <div
                key={round}
                className={`text-5xl sm:text-6xl font-black text-[#3a1c6e] mb-10 pop-in ${
                  feedback === 'wrong' ? 'shake' : ''
                }`}
              >
                {current.word.word}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {current.shuffledOptions.map((option) => {
                  const isPicked = pickedOption === option;
                  const isCorrectAnswer = feedback && option === current.word.correct;
                  const showWrong = feedback && isPicked && option !== current.word.correct;
                  return (
                    <button
                      key={option}
                      onClick={() => handlePick(option)}
                      disabled={!!feedback}
                      className={`px-4 py-4 rounded-2xl border-4 font-black text-sm sm:text-base break-words transition-all ${
                        isCorrectAnswer
                          ? 'border-green-500 bg-green-50 text-green-700 pop-in'
                          : showWrong
                          ? 'border-red-400 bg-red-50 text-red-500 shake'
                          : 'border-gray-200 bg-gray-50 text-gray-700 hover:scale-105'
                      }`}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  );
                })}
              </div>

              <div className="h-8">
                {feedback === 'correct' && (
                  <p className="text-green-600 font-black text-xl pop-in">✅ Верно!</p>
                )}
                {feedback === 'wrong' && (
                  <p className="text-red-500 font-black text-xl">
                    Правильно: {current.word.correct} 👀
                  </p>
                )}
              </div>
            </div>
          )}

          {finished && (
            <div className="card bg-white text-center py-10">
              <p className="text-3xl font-black text-[#3a1c6e] mb-2">{praiseFor(score.correct, score.total).title}</p>
              <p className="text-gray-600 mb-1">Правильных ответов:</p>
              <p className="text-6xl font-black text-orange mb-6">{score.correct}</p>
              <p className="text-gray-500 mb-8">из {score.total}</p>
              <div className="flex justify-center gap-3 flex-wrap mb-6">
                <button onClick={begin} className="btn-primary px-6 py-3">
                  🔁 Играть ещё
                </button>
              </div>
              <div className="pt-6 border-t border-gray-100">
                <ShareButtons
                  text={shareTextFor(GAME_TITLE, score.correct, score.total)}
                  url="https://znatorica.ru/trenazher/chasti-rechi-4klass"
                  trackKey="chasti-rechi-4klass"
                />
              </div>
            </div>
          )}
        </div>
      </TrainerGate>
    </div>
  );
}
