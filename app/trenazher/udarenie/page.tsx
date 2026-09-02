'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import ListenButtonRu from '@/components/ListenButtonRu';
import { speakRu } from '@/lib/speak-ru';
import { praiseFor } from '@/lib/praise';

type Tab = 'study' | 'quiz';

const ROUNDS_PER_SESSION = 10;

// Слова 1 класса с однозначным (не омографным) ударением.
// stress — номер гласной по счёту в слове, на которую падает ударение (считая с 1).
interface WordItem {
  word: string;
  stress: number;
}

const WORDS: WordItem[] = [
  { word: 'мама', stress: 1 },
  { word: 'папа', stress: 1 },
  { word: 'школа', stress: 1 },
  { word: 'книга', stress: 1 },
  { word: 'ручка', stress: 1 },
  { word: 'яблоко', stress: 1 },
  { word: 'девочка', stress: 1 },
  { word: 'мальчик', stress: 1 },
  { word: 'зима', stress: 2 },
  { word: 'весна', stress: 2 },
  { word: 'окно', stress: 2 },
  { word: 'трава', stress: 2 },
  { word: 'пенал', stress: 2 },
  { word: 'корова', stress: 2 },
  { word: 'собака', stress: 2 },
  { word: 'учитель', stress: 2 },
  { word: 'молоко', stress: 3 },
  { word: 'карандаш', stress: 3 },
];

const VOWELS = 'аеёиоуыэюя';

function getVowelIndices(word: string): number[] {
  const indices: number[] = [];
  for (let i = 0; i < word.length; i++) {
    if (VOWELS.includes(word[i].toLowerCase())) indices.push(i);
  }
  return indices;
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

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
  item: WordItem;
  display: string;
  vowelIndices: number[];
}

function makeRound(exclude?: WordItem): QuizRound {
  const item = randItem(WORDS, exclude);
  const display = capitalize(item.word);
  return { item, display, vowelIndices: getVowelIndices(display) };
}

export default function UdarenieTrainerPage() {
  const [tab, setTab] = useState<Tab>('study');
  const [index, setIndex] = useState(0);

  const [quizStarted, setQuizStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [quizRound, setQuizRound] = useState<QuizRound | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [pickedOccurrence, setPickedOccurrence] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  const current = WORDS[index];
  const currentDisplay = capitalize(current.word);
  const currentVowelIndices = getVowelIndices(currentDisplay);
  const currentStressCharIndex = currentVowelIndices[current.stress - 1];

  function goPrev() {
    setIndex((i) => (i - 1 + WORDS.length) % WORDS.length);
  }

  function goNext() {
    setIndex((i) => (i + 1) % WORDS.length);
  }

  function beginQuiz() {
    setQuizStarted(true);
    setFinished(false);
    setRound(1);
    setScore({ correct: 0, total: 0 });
    setQuizRound(makeRound());
    setFeedback(null);
    setPickedOccurrence(null);
  }

  function nextQuizRound() {
    if (round >= ROUNDS_PER_SESSION) {
      setFinished(true);
      return;
    }
    setRound((r) => r + 1);
    setQuizRound((prev) => makeRound(prev?.item));
    setFeedback(null);
    setPickedOccurrence(null);
  }

  // Озвучиваем слово, как только начинается новый раунд.
  useEffect(() => {
    if (quizStarted && quizRound && !finished) {
      speakRu(quizRound.item.word);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizRound]);

  function handlePick(occurrence: number) {
    if (feedback || !quizRound) return;
    setPickedOccurrence(occurrence);
    const correct = occurrence === quizRound.item.stress;
    setFeedback(correct ? 'correct' : 'wrong');
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setTimeout(nextQuizRound, correct ? 900 : 1600);
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#1E1035] border-b border-[#2D2350] px-6 py-4 flex items-center justify-between flex-wrap gap-4">
        <div>
          <Link href="/trenazher" className="text-orange hover:underline text-sm">
            ← Все тренажеры
          </Link>
          <h1 className="text-2xl font-bold mt-2">🔤 Ударение в слове</h1>
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
            🎮 Найди ударение
          </button>
        </div>
      </div>

      <TrainerGate type="trainer:udarenie">
        {tab === 'study' && (
          <div className="max-w-2xl mx-auto py-10 px-6">
            <p className="text-gray-400 mb-8 text-center">
              Листай слова стрелками. Ударная гласная выделена оранжевым — нажми «Слушать», чтобы услышать слово.
            </p>

            <div className="card bg-white text-center py-12 px-6">
              <p className="text-gray-500 text-sm mb-6">
                Слово {index + 1} из {WORDS.length}
              </p>
              <div className="text-6xl sm:text-7xl font-black text-[#3a1c6e] mb-8 tracking-wide select-none">
                {currentDisplay.split('').map((ch, i) => (
                  <span key={i} className={i === currentStressCharIndex ? 'text-orange underline decoration-4' : undefined}>
                    {ch}
                  </span>
                ))}
              </div>
              <ListenButtonRu text={current.word} label="🔊 Слушать" />
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={goPrev} className="btn-primary px-6 py-3">
                ← Предыдущее
              </button>
              <button onClick={goNext} className="btn-primary px-6 py-3">
                Следующее →
              </button>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-10">
              {WORDS.map((item, i) => (
                <button
                  key={item.word}
                  onClick={() => setIndex(i)}
                  className={`rounded-lg font-bold text-sm py-3 px-2 transition-colors ${
                    i === index
                      ? 'bg-orange text-white'
                      : 'bg-white/10 border border-white/25 text-white/80 hover:bg-white/15'
                  }`}
                >
                  {item.word}
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === 'quiz' && (
          <div className="max-w-2xl mx-auto py-8 px-6">
            {!quizStarted && (
              <div className="card text-center py-10">
                <p className="text-xl font-bold mb-6">Послушай слово и нажми на гласную, куда падает ударение!</p>
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

                <p className="text-xl font-bold text-[#3a1c6e] mb-6">На какую гласную падает ударение?</p>

                <div className="text-6xl sm:text-7xl font-black text-[#3a1c6e] mb-4 tracking-wide select-none">
                  {quizRound.display.split('').map((ch, i) => {
                    const vowelPos = quizRound.vowelIndices.indexOf(i);
                    if (vowelPos === -1) {
                      return <span key={i}>{ch}</span>;
                    }
                    const occurrence = vowelPos + 1;
                    const isPicked = pickedOccurrence === occurrence;
                    const isAnswer = occurrence === quizRound.item.stress;
                    const showState = feedback && (isPicked || isAnswer);
                    return (
                      <button
                        key={i}
                        onClick={() => handlePick(occurrence)}
                        disabled={!!feedback}
                        className={`inline-block rounded-xl px-1 transition-all ${
                          showState
                            ? isAnswer
                              ? 'bg-green-200 text-green-700 pop-in'
                              : 'bg-red-200 text-red-600 shake'
                            : 'text-orange hover:bg-orange/20 hover:scale-110'
                        }`}
                      >
                        {ch}
                      </button>
                    );
                  })}
                </div>

                <div className="mb-6">
                  <ListenButtonRu text={quizRound.item.word} label="🔊 Слушать ещё раз" />
                </div>

                <div className="h-8">
                  {feedback === 'correct' && (
                    <p className="text-green-600 font-black text-xl pop-in">✅ Верно!</p>
                  )}
                  {feedback === 'wrong' && (
                    <p className="text-red-500 font-black text-xl">Правильная гласная выделена зелёным 👀</p>
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
