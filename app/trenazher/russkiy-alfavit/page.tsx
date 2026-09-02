'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import ListenButtonRu from '@/components/ListenButtonRu';
import { RUSSIAN_ALPHABET, type RussianAlphabetLetter } from '@/lib/russian-alphabet';
import { praiseFor } from '@/lib/praise';

type Tab = 'study' | 'quiz';

const QUIZ_LETTERS = RUSSIAN_ALPHABET.filter((item) => item.hasWord);
const ROUNDS_PER_SESSION = 10;

function randItem<T>(arr: T[], exclude?: T): T {
  let item = arr[Math.floor(Math.random() * arr.length)];
  if (exclude !== undefined) {
    while (item === exclude) {
      item = arr[Math.floor(Math.random() * arr.length)];
    }
  }
  return item;
}

interface QuizRound {
  answer: RussianAlphabetLetter;
  options: RussianAlphabetLetter[];
}

function makeRound(): QuizRound {
  const answer = randItem(QUIZ_LETTERS);
  const options = [answer];
  while (options.length < 4) {
    const candidate = randItem(QUIZ_LETTERS);
    if (!options.includes(candidate)) options.push(candidate);
  }
  // Перемешиваем позиции вариантов ответа
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return { answer, options };
}

export default function RusskiyAlfavitTrainerPage() {
  const [tab, setTab] = useState<Tab>('study');
  const [index, setIndex] = useState(0);

  // Мини-игра «Угадай букву»
  const [quizStarted, setQuizStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [quizRound, setQuizRound] = useState<QuizRound | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [pickedLetter, setPickedLetter] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  const current = RUSSIAN_ALPHABET[index];

  function goPrev() {
    setIndex((i) => (i - 1 + RUSSIAN_ALPHABET.length) % RUSSIAN_ALPHABET.length);
  }

  function goNext() {
    setIndex((i) => (i + 1) % RUSSIAN_ALPHABET.length);
  }

  function beginQuiz() {
    setQuizStarted(true);
    setFinished(false);
    setRound(1);
    setScore({ correct: 0, total: 0 });
    setQuizRound(makeRound());
    setFeedback(null);
    setPickedLetter(null);
  }

  function nextQuizRound() {
    if (round >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    setRound((r) => r + 1);
    setQuizRound(makeRound());
    setFeedback(null);
    setPickedLetter(null);
  }

  function handlePick(option: RussianAlphabetLetter) {
    if (feedback || !quizRound) return;
    setPickedLetter(option.letter);
    const correct = option.letter === quizRound.answer.letter;
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(nextQuizRound, correct ? 900 : 1400);
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4 flex items-center justify-between flex-wrap gap-4">
        <div>
          <Link href="/trenazher" className="text-orange hover:underline text-sm">
            ← Все тренажеры
          </Link>
          <h1 className="text-2xl font-bold mt-2">🔤 Русский алфавит</h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setTab('study')}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
              tab === 'study' ? 'bg-orange text-white' : 'bg-black border border-[#2D2350] text-gray-400'
            }`}
          >
            📖 Изучение
          </button>
          <button
            onClick={() => setTab('quiz')}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
              tab === 'quiz' ? 'bg-orange text-white' : 'bg-black border border-[#2D2350] text-gray-400'
            }`}
          >
            🎮 Угадай букву
          </button>
        </div>
      </div>

      <TrainerGate type="trainer:russkiy-alfavit">
        {tab === 'study' && (
          <div className="max-w-2xl mx-auto py-10 px-6">
            <p className="text-gray-400 mb-8 text-center">
              Листай буквы стрелками и нажимай «Прослушать», чтобы услышать букву и слово-пример.
            </p>

            <div className="card bg-white text-center py-10 px-6">
              <p className="text-gray-500 text-sm mb-4">
                Буква {index + 1} из {RUSSIAN_ALPHABET.length}
              </p>
              <div className="text-8xl font-black text-[#3a1c6e] mb-4">{current.letter}</div>
              <div className="text-7xl mb-4">{current.emoji}</div>
              <div className="font-bold text-2xl text-[#3a1c6e] mb-6">{current.word}</div>
              <ListenButtonRu text={`${current.letter}. ${current.word}.`} label="🔊 Слушать" />
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={goPrev} className="btn-primary px-6 py-3">
                ← Предыдущая
              </button>
              <button onClick={goNext} className="btn-primary px-6 py-3">
                Следующая →
              </button>
            </div>

            <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 mt-10">
              {RUSSIAN_ALPHABET.map((item, i) => (
                <button
                  key={item.letter}
                  onClick={() => setIndex(i)}
                  className={`aspect-square rounded-lg font-bold text-lg transition-colors ${
                    i === index
                      ? 'bg-orange text-white'
                      : 'bg-white/10 border border-white/25 text-white/80 hover:bg-white/15'
                  }`}
                >
                  {item.letter}
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === 'quiz' && (
          <div className="max-w-2xl mx-auto py-8 px-6">
            {!quizStarted && (
              <div className="card text-center py-10">
                <p className="text-xl font-bold mb-6">Услышь слово и выбери, с какой буквы оно начинается!</p>
                <button onClick={beginQuiz} className="btn-primary px-8 py-4 text-lg">
                  ▶️ Начать игру
                </button>
              </div>
            )}

            {quizStarted && !finished && quizRound && (
              <div className="card bg-white text-center">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-500 text-sm">
                    Раунд {round} из {ROUNDS_PER_SESSION}
                  </span>
                  <span className="text-gray-600 text-sm">
                    Верно: <span className="text-green-600 font-bold">{score.correct}</span> / {score.total}
                  </span>
                </div>

                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(round / ROUNDS_PER_SESSION) * 100}%`,
                      background: 'linear-gradient(90deg, #F97316, #f72585)',
                    }}
                  />
                </div>

                <p className="text-xl font-bold text-[#3a1c6e] mb-2">С какой буквы начинается это слово?</p>
                <div className="text-7xl mb-2">{quizRound.answer.emoji}</div>
                <div className="font-bold text-2xl text-[#3a1c6e] mb-2">{quizRound.answer.word}</div>
                <div className="mb-6">
                  <ListenButtonRu text={quizRound.answer.word} label="🔊 Слушать слово" />
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  {quizRound.options.map((option) => {
                    const isPicked = pickedLetter === option.letter;
                    const isAnswer = option.letter === quizRound.answer.letter;
                    const showState = feedback && (isPicked || isAnswer);
                    return (
                      <button
                        key={option.letter}
                        onClick={() => handlePick(option)}
                        disabled={!!feedback}
                        className={`flex items-center justify-center aspect-square rounded-2xl border-4 text-4xl font-black transition-all ${
                          showState
                            ? isAnswer
                              ? 'border-green-500 bg-green-50 text-[#3a1c6e] pop-in'
                              : 'border-red-400 bg-red-50 text-[#3a1c6e] shake'
                            : 'border-gray-200 bg-gray-50 text-[#3a1c6e] hover:border-orange hover:scale-105'
                        }`}
                      >
                        {option.letter}
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
                      Правильно: «{quizRound.answer.letter}» 👀
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
                <div className="flex justify-center gap-3 flex-wrap">
                  <button onClick={beginQuiz} className="btn-primary px-6 py-3">
                    🔁 Играть ещё
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </TrainerGate>
    </div>
  );
}
