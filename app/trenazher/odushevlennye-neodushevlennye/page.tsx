'use client';

import Link from 'next/link';
import { useState } from 'react';
import TrainerGate from '@/components/TrainerGate';
import ShareButtons from '@/components/ShareButtons';

interface WordItem {
  word: string;
  animate: boolean;
}

// Банк слов. Специально включены «ловушки» — растения (БЕРЁЗА, РОМАШКА,
// ДЕРЕВО, ГРИБ), которые в русской грамматике НЕОДУШЕВЛЁННЫЕ, хотя формально
// живые — частая ошибка у детей 1-2 класса.
const WORD_BANK: WordItem[] = [
  { word: 'МАЛЬЧИК', animate: true },
  { word: 'ДЕВОЧКА', animate: true },
  { word: 'УЧИТЕЛЬ', animate: true },
  { word: 'ВРАЧ', animate: true },
  { word: 'МАМА', animate: true },
  { word: 'СОБАКА', animate: true },
  { word: 'КОШКА', animate: true },
  { word: 'ВОРОБЕЙ', animate: true },
  { word: 'БАБОЧКА', animate: true },
  { word: 'МЕДВЕДЬ', animate: true },
  { word: 'ЛИСА', animate: true },
  { word: 'РЫБА', animate: true },
  { word: 'ЛЯГУШКА', animate: true },
  { word: 'ПЧЕЛА', animate: true },
  { word: 'ЁЖИК', animate: true },
  { word: 'СТОЛ', animate: false },
  { word: 'КНИГА', animate: false },
  { word: 'СТУЛ', animate: false },
  { word: 'ПОРТФЕЛЬ', animate: false },
  { word: 'КАРАНДАШ', animate: false },
  { word: 'ОКНО', animate: false },
  { word: 'ДОЖДЬ', animate: false },
  { word: 'ВЕТЕР', animate: false },
  { word: 'СНЕГ', animate: false },
  { word: 'СОЛНЦЕ', animate: false },
  { word: 'ОБЛАКО', animate: false },
  { word: 'БЕРЁЗА', animate: false },
  { word: 'РОМАШКА', animate: false },
  { word: 'ДЕРЕВО', animate: false },
  { word: 'ГРИБ', animate: false },
];

const ROUND_SIZE = 10;

const HINT_ANIMATE = 'Одушевлённое — отвечает на вопрос КТО?';
const HINT_INANIMATE = 'Неодушевлённое — отвечает на вопрос ЧТО?';

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildRound(): WordItem[] {
  return shuffle(WORD_BANK).slice(0, ROUND_SIZE);
}

type Feedback = 'correct' | 'wrong' | null;

export default function OdushevlennyeNeodushevlennyeTrainerPage() {
  const [round, setRound] = useState<WordItem[]>(() => buildRound());
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [finished, setFinished] = useState(false);

  const current = round[index];

  function handleAnswer(choseAnimate: boolean) {
    if (feedback) return; // не даём кликать дважды, пока показан результат

    const isCorrect = choseAnimate === current.animate;
    setFeedback(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      setFeedback(null);
      if (index + 1 >= round.length) {
        setFinished(true);
      } else {
        setIndex((i) => i + 1);
      }
    }, 1200);
  }

  function playAgain() {
    setRound(buildRound());
    setIndex(0);
    setScore(0);
    setFeedback(null);
    setFinished(false);
  }

  function praise(): string {
    if (score === ROUND_SIZE) return '🏆 Все слова верно! Ты настоящий знаток!';
    if (score >= ROUND_SIZE - 2) return '🌟 Отличный результат!';
    if (score >= ROUND_SIZE / 2) return '👍 Хорошо, но можно ещё лучше!';
    return '💪 Потренируйся ещё немного — и всё получится!';
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/15 px-6 py-4">
        <Link href="/trenazher" className="text-orange hover:underline text-sm">
          ← Все тренажеры
        </Link>
        <h1 className="text-2xl font-bold mt-2">🧍 Одушевлённые и неодушевлённые предметы</h1>
      </div>

      <TrainerGate type="trainer:odushevlennye-neodushevlennye">
        <div className="max-w-2xl mx-auto py-8 px-6">
          {!finished && current && (
            <div className="card bg-white text-center">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-500 text-sm">
                  Слово {index + 1} из {round.length}
                </span>
                <span className="text-gray-600 text-sm">
                  Верно: <span className="font-bold text-orange">{score}</span>
                </span>
              </div>

              <p className="text-5xl font-black text-[#3a1c6e] mb-8 break-words">{current.word}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => handleAnswer(true)}
                  disabled={feedback !== null}
                  className={`px-6 py-5 rounded-xl font-bold text-lg text-white transition-all disabled:opacity-60 ${
                    feedback && current.animate ? 'ring-4 ring-green-400' : ''
                  }`}
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #f72585)' }}
                >
                  Одушевлённое
                  <span className="block text-sm font-normal opacity-80 mt-1">Кто?</span>
                </button>

                <button
                  onClick={() => handleAnswer(false)}
                  disabled={feedback !== null}
                  className={`px-6 py-5 rounded-xl font-bold text-lg text-white transition-all disabled:opacity-60 ${
                    feedback && !current.animate ? 'ring-4 ring-green-400' : ''
                  }`}
                  style={{ background: 'linear-gradient(135deg, #2563EB, #06B6D4)' }}
                >
                  Неодушевлённое
                  <span className="block text-sm font-normal opacity-80 mt-1">Что?</span>
                </button>
              </div>

              <div className="h-14">
                {feedback === 'correct' && (
                  <p className="text-green-600 font-black text-xl">✅ Верно!</p>
                )}
                {feedback === 'wrong' && (
                  <div>
                    <p className="text-red-500 font-black text-xl mb-1">❌ Не совсем</p>
                    <p className="text-gray-600 text-sm">
                      {current.animate ? HINT_ANIMATE : HINT_INANIMATE}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {finished && (
            <div className="card bg-white text-center py-10">
              <p className="text-3xl font-black text-[#3a1c6e] mb-2">{praise()}</p>
              <p className="text-gray-600 mb-1">Твой результат</p>
              <p className="text-6xl font-black text-orange mb-8">
                {score} / {round.length}
              </p>
              <div className="flex justify-center gap-3 flex-wrap mb-6">
                <button onClick={playAgain} className="btn-primary px-6 py-3">
                  🔁 Играть ещё
                </button>
              </div>
              <div className="pt-6 border-t border-gray-100">
                <ShareButtons
                  text={`Угадали ${score} из ${round.length} слов в тренажёре «Одушевлённые и неодушевлённые» на Знаторике — попробуйте тоже:`}
                  url="https://znatorica.ru/trenazher/odushevlennye-neodushevlennye"
                  trackKey="odushevlennye-neodushevlennye"
                />
              </div>
            </div>
          )}
        </div>
      </TrainerGate>
    </div>
  );
}
